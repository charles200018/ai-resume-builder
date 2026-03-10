"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/browser";
import { LogIn, LogOut, User } from "lucide-react";
import Image from "next/image";
import type { User as SupabaseUser } from "@supabase/supabase-js";

interface AuthButtonProps {
    user: SupabaseUser | null;
    variant?: "primary" | "ghost";
}

export default function AuthButton({ user, variant = "ghost" }: AuthButtonProps) {
    const [loading, setLoading] = useState(false);
    const supabase = createClient();

    const handleSignIn = async () => {
        setLoading(true);
        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: "google",
                options: {
                    redirectTo: `${window.location.origin}/auth/callback`,
                },
            });
            if (error) throw error;
        } catch (error) {
            console.error("Sign in error:", error);
            setLoading(false);
        }
    };

    const handleSignOut = async () => {
        setLoading(true);
        try {
            await supabase.auth.signOut();
            window.location.href = "/";
        } catch (error) {
            console.error("Sign out error:", error);
            setLoading(false);
        }
    };

    if (user) {
        return (
            <div className="flex items-center gap-3">
                <div className="flex items-center gap-2.5 px-3 py-2" style={{ border: "1px solid rgba(201, 169, 110, 0.1)", borderRadius: "2px" }}>
                    {user.user_metadata?.avatar_url ? (
                        <Image
                            src={user.user_metadata.avatar_url}
                            alt="Avatar"
                            width={20}
                            height={20}
                            className="rounded-full"
                        />
                    ) : (
                        <User size={14} style={{ color: "var(--color-text-muted)" }} />
                    )}
                    <span className="text-xs font-medium hidden sm:block" style={{ color: "var(--color-text-muted)" }}>
                        {user.user_metadata?.full_name || user.email?.split("@")[0]}
                    </span>
                </div>
                <button
                    onClick={handleSignOut}
                    disabled={loading}
                    className="flex items-center gap-2 px-3 py-2 text-xs transition-colors"
                    style={{ border: "1px solid rgba(201, 169, 110, 0.1)", borderRadius: "2px", color: "var(--color-text-muted)" }}
                >
                    {loading ? <span className="spinner" /> : <LogOut size={12} />}
                    <span className="hidden sm:inline tracking-[0.1em] uppercase">Sign Out</span>
                </button>
            </div>
        );
    }

    return (
        <button
            onClick={handleSignIn}
            disabled={loading}
            className={variant === "primary" ? "btn-primary" : "btn-ghost"}
        >
            {loading ? (
                <span className="spinner" />
            ) : (
                <>
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                        <path
                            fill="currentColor"
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                            fill="currentColor"
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                            fill="currentColor"
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        />
                        <path
                            fill="currentColor"
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        />
                    </svg>
                    Sign in with Google
                </>
            )}
        </button>
    );
}
