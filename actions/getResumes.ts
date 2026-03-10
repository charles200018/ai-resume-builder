"use server";

import { supabaseServer } from "@/lib/supabase/server";
import { getUser } from "@/lib/supabase/serverClient";
import type { Resume } from "@/types/resume";

export async function getAllResumes(): Promise<{ resumes: Resume[]; error?: string }> {
    // Require authentication - don't fetch anything for anonymous users
    const user = await getUser();
    if (!user) {
        return { resumes: [], error: "Authentication required." };
    }

    // Only fetch THIS user's resumes - not the entire database
    const { data, error } = await supabaseServer
        .from("resumes")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Error fetching resumes:", error);
        return { resumes: [], error: "Failed to load resumes." };
    }

    return { resumes: data as Resume[] || [] };
}
