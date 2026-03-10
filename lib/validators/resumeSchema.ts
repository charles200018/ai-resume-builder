import { z } from "zod";

// ── Step 1: Personal Information ───────────────────────────────────────────
export const personalInfoSchema = z.object({
    fullName: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(7, "Enter a valid phone number"),
    location: z.string().min(2, "Location is required"),
    linkedinUrl: z
        .string()
        .url("Must be a valid URL")
        .optional()
        .or(z.literal("")),
    portfolioUrl: z
        .string()
        .url("Must be a valid URL")
        .optional()
        .or(z.literal("")),
    summary: z
        .string()
        .max(600, "Summary must be under 600 characters")
        .optional(),
});

// ── Step 2: Work Experience ────────────────────────────────────────────────
export const workExperienceItemSchema = z.object({
    company: z.string().min(1, "Company name required"),
    jobTitle: z.string().min(1, "Job title required"),
    startDate: z.string().min(1, "Start date required"),
    endDate: z.string().optional(),
    isCurrent: z.boolean().default(false),
    description: z
        .string()
        .min(10, "Add a brief description of your role"),
});

export const workExperienceSchema = z.object({
    experiences: z
        .array(workExperienceItemSchema)
        .min(1, "Add at least one role"),
});

// ── Step 3: Education ─────────────────────────────────────────────────────
export const educationItemSchema = z.object({
    institution: z.string().min(1, "Institution name required"),
    degree: z.string().min(1, "Degree required"),
    fieldOfStudy: z.string().optional(),
    graduationYear: z
        .string()
        .regex(/^\d{4}$/, "Enter a 4-digit year"),
    gpa: z.string().optional(),
});

export const educationSchema = z.object({
    education: z
        .array(educationItemSchema)
        .min(1, "Add at least one education entry"),
});

// ── Step 4: Skills ────────────────────────────────────────────────────────
export const skillsSchema = z.object({
    technicalSkills: z
        .array(z.string().min(1))
        .min(1, "Add at least one skill"),
    softSkills: z.array(z.string().min(1)).optional(),
    languages: z.array(z.string().min(1)).optional(),
    targetJobTitle: z
        .string()
        .min(2, "Tell the AI what role you're targeting"),
});

// ── Step 5: Template Selection ────────────────────────────────────────────
export const templateSchema = z.object({
    template: z.string().default("modern-professional"),
});

// ── Combined Master Schema ────────────────────────────────────────────────
export const resumeFormSchema = personalInfoSchema
    .merge(workExperienceSchema)
    .merge(educationSchema)
    .merge(skillsSchema)
    .merge(templateSchema);

export type ResumeFormData = z.infer<typeof resumeFormSchema>;
export type WorkExperienceItem = z.infer<typeof workExperienceItemSchema>;
export type EducationItem = z.infer<typeof educationItemSchema>;
