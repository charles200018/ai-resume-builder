"use server";

import { supabaseServer } from "@/lib/supabase/server";
import { getUser } from "@/lib/supabase/serverClient";
import type { Resume } from "@/types/resume";

// Validate UUID format to prevent injection
function isValidUUID(id: string): boolean {
    return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id);
}

export async function getResumeById(
    id: string
): Promise<{ resume?: Resume; error?: string }> {
    // Validate UUID format
    if (!isValidUUID(id)) {
        return { error: "Invalid resume ID." };
    }

    const user = await getUser();

    const { data, error } = await supabaseServer
        .from("resumes")
        .select("*")
        .eq("id", id)
        .single();

    if (error || !data) {
        return { error: "Resume not found." };
    }

    // Authorization: Only resume owner can view (allow anonymous resumes for backward compat)
    if (data.user_id && user?.id !== data.user_id) {
        return { error: "Resume not found." };
    }

    return { resume: data as Resume };
}
