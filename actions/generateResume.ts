"use server";

import { resumeFormSchema, type ResumeFormData } from "@/lib/validators/resumeSchema";
import { callOpenRouter } from "@/lib/openrouter";
import { supabaseServer } from "@/lib/supabase/server";
import { getUser } from "@/lib/supabase/serverClient";
import type { GenerateResumeResult } from "@/types/resume";

// Simple in-memory rate limiting (use Redis in production)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 5; // Max requests per window
const RATE_WINDOW = 60 * 60 * 1000; // 1 hour in ms

function checkRateLimit(identifier: string): boolean {
    const now = Date.now();
    const record = rateLimitMap.get(identifier);

    if (!record || now > record.resetTime) {
        rateLimitMap.set(identifier, { count: 1, resetTime: now + RATE_WINDOW });
        return true;
    }

    if (record.count >= RATE_LIMIT) {
        return false;
    }

    record.count++;
    return true;
}

function buildSystemPrompt(): string {
    return `You are an expert resume writer and career coach with 15 years of experience. 
Your task is to create a polished, ATS-optimized professional resume in clean Markdown format.

Follow these rules strictly:
- Output ONLY the resume content in Markdown.
- **IMPORTANT**: Do NOT include the candidate's Name, Email, Phone, LinkedIn, or Location.
- Structure: Start directly with "## PROFESSIONAL SUMMARY".
- **Rule**: Every section title MUST start with "## " (double hash mark). Sections: "## PROFESSIONAL SUMMARY", "## SKILLS", "## WORK EXPERIENCE", "## EDUCATION", "## CERTIFICATIONS".
- Use strong action verbs and quantify achievements.
- No preamble or commentary.`;
}

function buildUserPrompt(data: ResumeFormData): string {
    const workSection = data.experiences
        .map(
            (exp) =>
                `- ${exp.jobTitle} at ${exp.company} (${exp.startDate} – ${exp.isCurrent ? "Present" : exp.endDate || "Present"})\n  ${exp.description}`
        )
        .join("\n");

    const educationSection = data.education
        .map(
            (edu) =>
                `- ${edu.degree}${edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ""} from ${edu.institution} (${edu.graduationYear})${edu.gpa ? `, GPA: ${edu.gpa}` : ""}`
        )
        .join("\n");

    return `Please create a professional resume for the following candidate targeting the role of "${data.targetJobTitle}".

## Candidate Information
- **Name:** ${data.fullName}
- **Email:** ${data.email}
- **Phone:** ${data.phone}
- **Location:** ${data.location}
${data.linkedinUrl ? `- **LinkedIn:** ${data.linkedinUrl}` : ""}
${data.portfolioUrl ? `- **Portfolio:** ${data.portfolioUrl}` : ""}
${data.summary ? `- **Personal Summary:** ${data.summary}` : ""}

## Work Experience
${workSection}

## Education
${educationSection}

## Skills
- **Technical Skills:** ${data.technicalSkills.join(", ")}
${data.softSkills?.length ? `- **Soft Skills:** ${data.softSkills.join(", ")}` : ""}
${data.languages?.length ? `- **Languages:** ${data.languages.join(", ")}` : ""}

Generate an impressive, complete resume now.`;
}

export async function generateResume(
    formData: ResumeFormData
): Promise<GenerateResumeResult> {
    // 1. Validate the incoming data server-side
    const validation = resumeFormSchema.safeParse(formData);
    if (!validation.success) {
        return {
            error: validation.error.issues.map((e) => e.message).join(", "),
        };
    }

    const data = validation.data;

    // 2. Get user and apply rate limiting
    const user = await getUser();
    const rateLimitKey = user?.id || data.email; // Use user ID or email as identifier
    
    if (!checkRateLimit(rateLimitKey)) {
        return {
            error: "Rate limit exceeded. You can generate up to 5 resumes per hour. Please try again later.",
        };
    }

    // 3. Call OpenRouter AI
    let generatedText: string;
    const modelUsed = "openrouter/free";

    try {
        generatedText = await callOpenRouter(
            [
                { role: "system", content: buildSystemPrompt() },
                { role: "user", content: buildUserPrompt(data) },
            ],
            modelUsed
        );
    } catch (err) {
        console.error("OpenRouter error:", err);
        return {
            error:
                err instanceof Error
                    ? err.message
                    : "AI generation failed. Please try again.",
        };
    }

    // 4. Save to Supabase
    const { data: inserted, error: dbError } = await supabaseServer
        .from("resumes")
        .insert({
            form_data: data,
            generated_text: generatedText,
            ai_model_used: modelUsed,
            full_name: data.fullName,
            job_title: data.targetJobTitle,
            status: "generated",
            user_id: user?.id || null, // Use authenticated user ID or null for anonymous
        })
        .select("id")
        .single();

    if (dbError) {
        console.error("Supabase insert error:", dbError);
        return {
            error: "Failed to save your resume. Please try again.",
        };
    }

    return {
        id: inserted.id,
        generatedText,
    };
}
