import type { ResumeFormData } from "@/lib/validators/resumeSchema";

// TypeScript types for the resume stored in Supabase
export interface Resume {
    id: string;
    user_id: string | null;
    created_at: string;
    updated_at: string;
    form_data: ResumeFormData;
    generated_text: string;
    ai_model_used: string;
    full_name: string;
    job_title: string | null;
    status: "draft" | "generated" | "error";
}

// Action return types
export interface GenerateResumeResult {
    id?: string;
    generatedText?: string;
    error?: string;
}
