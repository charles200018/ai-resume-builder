// ATS (Applicant Tracking System) Scoring Engine
// Analyzes resume content for ATS compatibility and optimization

import type { ResumeFormData } from "@/lib/validators/resumeSchema";

export interface ATSScore {
    overall: number; // 0-100
    breakdown: {
        keywords: number;
        formatting: number;
        content: number;
        length: number;
        contact: number;
        skills: number;
    };
    suggestions: ATSSuggestion[];
    passRate: "high" | "medium" | "low";
}

export interface ATSSuggestion {
    category: string;
    issue: string;
    fix: string;
    impact: "critical" | "major" | "minor";
    points: number;
}

// Common ATS keywords by industry
const ATS_KEYWORDS = {
    general: [
        "managed", "led", "developed", "created", "implemented", "improved",
        "increased", "decreased", "reduced", "achieved", "delivered", "launched",
        "coordinated", "analyzed", "designed", "built", "established", "executed",
        "optimized", "streamlined", "collaborated", "mentored", "trained",
    ],
    tech: [
        "agile", "scrum", "ci/cd", "devops", "cloud", "aws", "azure", "gcp",
        "kubernetes", "docker", "microservices", "api", "rest", "graphql",
        "database", "sql", "nosql", "machine learning", "ai", "automation",
        "scalable", "performance", "security", "testing", "deployment",
    ],
    business: [
        "strategy", "revenue", "growth", "stakeholder", "budget", "roi",
        "kpi", "metrics", "analytics", "reporting", "forecasting", "planning",
        "operations", "process", "efficiency", "cost reduction", "profit",
        "client", "customer", "relationship", "partnership", "negotiation",
    ],
    leadership: [
        "leadership", "team", "cross-functional", "initiative", "vision",
        "strategic", "executive", "management", "director", "head", "lead",
        "supervised", "oversaw", "guided", "drove", "spearheaded", "championed",
    ],
};

// Scoring weights
const WEIGHTS = {
    keywords: 25,
    formatting: 20,
    content: 25,
    length: 10,
    contact: 10,
    skills: 10,
};

export function calculateATSScore(formData: ResumeFormData, generatedText: string): ATSScore {
    const suggestions: ATSSuggestion[] = [];
    
    // 1. Keyword Analysis (25 points)
    const keywordScore = analyzeKeywords(formData, generatedText, suggestions);
    
    // 2. Formatting Analysis (20 points)
    const formattingScore = analyzeFormatting(generatedText, suggestions);
    
    // 3. Content Quality (25 points)
    const contentScore = analyzeContent(formData, generatedText, suggestions);
    
    // 4. Length Analysis (10 points)
    const lengthScore = analyzeLength(generatedText, formData, suggestions);
    
    // 5. Contact Information (10 points)
    const contactScore = analyzeContact(formData, suggestions);
    
    // 6. Skills Analysis (10 points)
    const skillsScore = analyzeSkills(formData, suggestions);

    const overall = Math.round(
        (keywordScore * WEIGHTS.keywords / 100) +
        (formattingScore * WEIGHTS.formatting / 100) +
        (contentScore * WEIGHTS.content / 100) +
        (lengthScore * WEIGHTS.length / 100) +
        (contactScore * WEIGHTS.contact / 100) +
        (skillsScore * WEIGHTS.skills / 100)
    );

    const passRate = overall >= 80 ? "high" : overall >= 60 ? "medium" : "low";

    return {
        overall,
        breakdown: {
            keywords: keywordScore,
            formatting: formattingScore,
            content: contentScore,
            length: lengthScore,
            contact: contactScore,
            skills: skillsScore,
        },
        suggestions: suggestions.sort((a, b) => {
            const priority = { critical: 0, major: 1, minor: 2 };
            return priority[a.impact] - priority[b.impact];
        }),
        passRate,
    };
}

function analyzeKeywords(
    formData: ResumeFormData,
    text: string,
    suggestions: ATSSuggestion[]
): number {
    const textLower = text.toLowerCase();
    let score = 100;
    let foundKeywords = 0;

    // Check for action verbs
    const allKeywords = [
        ...ATS_KEYWORDS.general,
        ...ATS_KEYWORDS.tech,
        ...ATS_KEYWORDS.business,
        ...ATS_KEYWORDS.leadership,
    ];

    const uniqueKeywords = [...new Set(allKeywords)];
    
    for (const keyword of uniqueKeywords) {
        if (textLower.includes(keyword.toLowerCase())) {
            foundKeywords++;
        }
    }

    const keywordDensity = foundKeywords / uniqueKeywords.length;

    if (keywordDensity < 0.1) {
        score -= 40;
        suggestions.push({
            category: "Keywords",
            issue: "Very few action verbs and industry keywords found",
            fix: "Use more action verbs like 'led', 'developed', 'achieved', 'implemented'",
            impact: "critical",
            points: 15,
        });
    } else if (keywordDensity < 0.2) {
        score -= 20;
        suggestions.push({
            category: "Keywords",
            issue: "Low keyword density",
            fix: "Add more industry-specific keywords and quantifiable achievements",
            impact: "major",
            points: 10,
        });
    }

    // Check for job title keywords
    const targetJob = formData.targetJobTitle.toLowerCase();
    if (!textLower.includes(targetJob)) {
        score -= 15;
        suggestions.push({
            category: "Keywords",
            issue: `Target job title "${formData.targetJobTitle}" not prominent in resume`,
            fix: "Ensure your target role keywords appear in your summary and experience sections",
            impact: "major",
            points: 8,
        });
    }

    return Math.max(0, score);
}

function analyzeFormatting(text: string, suggestions: ATSSuggestion[]): number {
    let score = 100;

    // Check for proper section headers
    const requiredSections = ["summary", "experience", "education", "skills"];
    const textLower = text.toLowerCase();

    for (const section of requiredSections) {
        if (!textLower.includes(section)) {
            score -= 10;
            suggestions.push({
                category: "Formatting",
                issue: `Missing "${section}" section header`,
                fix: `Add a clear "${section.charAt(0).toUpperCase() + section.slice(1)}" section`,
                impact: "major",
                points: 5,
            });
        }
    }

    // Check for bullet points
    const bulletCount = (text.match(/•|-|\*/g) || []).length;
    if (bulletCount < 5) {
        score -= 15;
        suggestions.push({
            category: "Formatting",
            issue: "Insufficient use of bullet points",
            fix: "Use bullet points to list achievements and responsibilities for better ATS parsing",
            impact: "major",
            points: 8,
        });
    }

    // Check for consistent formatting
    const inconsistentDates = checkDateConsistency(text);
    if (!inconsistentDates) {
        score -= 10;
        suggestions.push({
            category: "Formatting",
            issue: "Date format inconsistency detected",
            fix: "Use consistent date format throughout (e.g., 'Jan 2020 - Present')",
            impact: "minor",
            points: 5,
        });
    }

    return Math.max(0, score);
}

function checkDateConsistency(text: string): boolean {
    // Simple check for date patterns
    const datePatterns = [
        /\d{1,2}\/\d{4}/g,      // MM/YYYY
        /\d{4}/g,               // YYYY
        /[A-Z][a-z]{2}\s\d{4}/g // Mon YYYY
    ];
    
    let foundPatterns = 0;
    for (const pattern of datePatterns) {
        if (pattern.test(text)) foundPatterns++;
    }
    
    return foundPatterns <= 2; // Allow max 2 different date formats
}

function analyzeContent(
    formData: ResumeFormData,
    text: string,
    suggestions: ATSSuggestion[]
): number {
    let score = 100;

    // Check for quantifiable achievements
    const numberPattern = /\d+%|\$\d+|\d+\+|\d+ (million|billion|thousand)/gi;
    const numbers = text.match(numberPattern) || [];

    if (numbers.length < 3) {
        score -= 25;
        suggestions.push({
            category: "Content",
            issue: "Lack of quantifiable achievements",
            fix: "Add specific numbers and metrics (e.g., 'increased sales by 30%', 'managed $2M budget')",
            impact: "critical",
            points: 15,
        });
    } else if (numbers.length < 6) {
        score -= 10;
        suggestions.push({
            category: "Content",
            issue: "Could use more quantifiable results",
            fix: "Add more specific metrics and numbers to demonstrate impact",
            impact: "minor",
            points: 5,
        });
    }

    // Check experience descriptions
    for (const exp of formData.experiences) {
        if (exp.description.length < 50) {
            score -= 10;
            suggestions.push({
                category: "Content",
                issue: `Brief description for ${exp.jobTitle} at ${exp.company}`,
                fix: "Expand each role description to include key achievements, responsibilities, and impact",
                impact: "major",
                points: 8,
            });
            break;
        }
    }

    return Math.max(0, score);
}

function analyzeLength(
    text: string,
    formData: ResumeFormData,
    suggestions: ATSSuggestion[]
): number {
    let score = 100;
    const wordCount = text.split(/\s+/).length;
    const experienceYears = formData.experiences.length;

    // Ideal: 400-700 words for 1-page, 700-1000 for 2-page
    if (wordCount < 300) {
        score -= 40;
        suggestions.push({
            category: "Length",
            issue: "Resume is too short",
            fix: "Add more details about your experience, skills, and achievements",
            impact: "critical",
            points: 15,
        });
    } else if (wordCount < 400) {
        score -= 20;
        suggestions.push({
            category: "Length",
            issue: "Resume could use more content",
            fix: "Consider expanding on key achievements and adding relevant projects",
            impact: "major",
            points: 8,
        });
    } else if (wordCount > 1200 && experienceYears < 10) {
        score -= 15;
        suggestions.push({
            category: "Length",
            issue: "Resume may be too long for your experience level",
            fix: "Focus on most relevant and recent experience; keep to 1-2 pages",
            impact: "minor",
            points: 5,
        });
    }

    return Math.max(0, score);
}

function analyzeContact(formData: ResumeFormData, suggestions: ATSSuggestion[]): number {
    let score = 100;

    // Email validation
    if (!formData.email.includes("@")) {
        score -= 30;
        suggestions.push({
            category: "Contact",
            issue: "Invalid email format",
            fix: "Use a professional email address",
            impact: "critical",
            points: 15,
        });
    }

    // Check for professional email
    const unprofessionalDomains = ["yahoo", "hotmail", "aol"];
    if (unprofessionalDomains.some(d => formData.email.toLowerCase().includes(d))) {
        score -= 10;
        suggestions.push({
            category: "Contact",
            issue: "Consider using a more professional email domain",
            fix: "Use Gmail or a custom domain for a more professional appearance",
            impact: "minor",
            points: 3,
        });
    }

    // LinkedIn presence
    if (!formData.linkedinUrl) {
        score -= 15;
        suggestions.push({
            category: "Contact",
            issue: "No LinkedIn profile provided",
            fix: "Add your LinkedIn URL to increase credibility with recruiters",
            impact: "major",
            points: 8,
        });
    }

    // Phone number format
    const phoneDigits = formData.phone.replace(/\D/g, "");
    if (phoneDigits.length < 10) {
        score -= 20;
        suggestions.push({
            category: "Contact",
            issue: "Phone number appears incomplete",
            fix: "Ensure your phone number is complete and includes area code",
            impact: "major",
            points: 10,
        });
    }

    return Math.max(0, score);
}

function analyzeSkills(formData: ResumeFormData, suggestions: ATSSuggestion[]): number {
    let score = 100;

    // Check technical skills count
    if (formData.technicalSkills.length < 5) {
        score -= 25;
        suggestions.push({
            category: "Skills",
            issue: "Too few technical skills listed",
            fix: "List 8-15 relevant technical skills that match your target job",
            impact: "major",
            points: 10,
        });
    } else if (formData.technicalSkills.length > 20) {
        score -= 10;
        suggestions.push({
            category: "Skills",
            issue: "Too many skills listed",
            fix: "Focus on 10-15 most relevant skills for your target role",
            impact: "minor",
            points: 3,
        });
    }

    // Check for soft skills
    if (!formData.softSkills || formData.softSkills.length < 3) {
        score -= 15;
        suggestions.push({
            category: "Skills",
            issue: "Few or no soft skills listed",
            fix: "Add 3-5 soft skills like 'Leadership', 'Communication', 'Problem Solving'",
            impact: "minor",
            points: 5,
        });
    }

    return Math.max(0, score);
}

// Get ATS optimization tips
export function getATSOptimizationTips(score: ATSScore): string[] {
    const tips: string[] = [];

    if (score.breakdown.keywords < 70) {
        tips.push("🔑 Add more industry keywords and action verbs");
    }
    if (score.breakdown.formatting < 70) {
        tips.push("📝 Improve section organization and use bullet points");
    }
    if (score.breakdown.content < 70) {
        tips.push("📊 Add quantifiable achievements with numbers and percentages");
    }
    if (score.breakdown.skills < 70) {
        tips.push("💡 List more relevant technical and soft skills");
    }
    if (score.breakdown.contact < 70) {
        tips.push("📧 Complete your contact information including LinkedIn");
    }

    return tips;
}
