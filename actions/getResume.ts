"use server";

import { supabaseServer } from "@/lib/supabase/server";
import type { Resume } from "@/types/resume";

export async function getResumeById(
    id: string
): Promise<{ resume?: Resume; error?: string }> {
    const { data, error } = await supabaseServer
        .from("resumes")
        .select("*")
        .eq("id", id)
        .single();

    if (error) {
        return { error: "Resume not found." };
    }

    return { resume: data as Resume };
}
