"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
    Menu,
    X,
    Home,
    PenTool,
    LayoutGrid,
    FileText,
    Info,
    LogIn,
    LogOut,
    User,
} from "lucide-react";
import { createClient } from "@/lib/supabase/browser";
import type { User as SupabaseUser } from "@supabase/supabase-js";

interface SidebarProps {
    user: SupabaseUser | null;
}

const NAV_ITEMS = [
    { href: "/", label: "Home", icon: Home },
    { href: "/builder", label: "Builder", icon: PenTool },
    { href: "/dashboard", label: "My Resumes", icon: LayoutGrid, auth: true },
    { href: "/templates", label: "Templates", icon: FileText },
    { href: "/about", label: "About", icon: Info },
];

export default function Sidebar({ user }: SidebarProps) {
    const [open, setOpen] = useState(false);
    const pathname = usePathname();
    const supabase = createClient();

    const handleSignIn = async () => {
        await supabase.auth.signInWithOAuth({
            provider: "google",
            options: { redirectTo: `${window.location.origin}/auth/callback` },
        });
    };

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        window.location.href = "/";
    };

    return (
        <>
            {/* Toggle button */}
            <button
                onClick={() => setOpen(true)}
                className="fixed top-6 left-6 z-[60] p-2 transition-colors print:hidden"
                style={{ color: "var(--color-text-muted)", border: "1px solid rgba(201,169,110,0.1)", borderRadius: "2px", background: "rgba(10,10,10,0.8)", backdropFilter: "blur(10px)" }}
                aria-label="Open menu"
            >
                <Menu size={18} />
            </button>

            {/* Overlay */}
            {open && (
                <div
                    className="fixed inset-0 z-[70] print:hidden"
                    style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}
                    onClick={() => setOpen(false)}
                />
            )}

            {/* Sidebar panel */}
            <aside
                className="fixed top-0 left-0 h-full z-[80] flex flex-col transition-transform duration-300 print:hidden"
                style={{
                    width: "280px",
                    background: "#0d0d0d",
                    borderRight: "1px solid rgba(201,169,110,0.06)",
                    transform: open ? "translateX(0)" : "translateX(-100%)",
                }}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-6" style={{ borderBottom: "1px solid rgba(201,169,110,0.06)" }}>
                    <Link href="/" onClick={() => setOpen(false)} className="flex items-center gap-3">
                        <span style={{ fontFamily: "var(--font-display)", color: "var(--color-primary)", fontSize: "1.25rem", letterSpacing: "0.05em" }}>
                            RESUME
                        </span>
                        <span style={{ color: "var(--color-text-muted)", fontSize: "0.65rem", letterSpacing: "0.3em", marginTop: "2px" }}>AI</span>
                    </Link>
                    <button onClick={() => setOpen(false)} style={{ color: "var(--color-text-muted)" }} aria-label="Close menu">
                        <X size={18} />
                    </button>
                </div>

                {/* User section */}
                {user && (
                    <div className="px-6 py-5" style={{ borderBottom: "1px solid rgba(201,169,110,0.06)" }}>
                        <div className="flex items-center gap-3">
                            {user.user_metadata?.avatar_url ? (
                                <Image
                                    src={user.user_metadata.avatar_url}
                                    alt=""
                                    width={32}
                                    height={32}
                                    className="rounded-full"
                                />
                            ) : (
                                <div className="w-8 h-8 flex items-center justify-center" style={{ border: "1px solid rgba(201,169,110,0.15)", borderRadius: "50%" }}>
                                    <User size={14} style={{ color: "var(--color-primary)" }} />
                                </div>
                            )}
                            <div>
                                <p className="text-sm font-medium" style={{ color: "var(--color-text)" }}>
                                    {user.user_metadata?.full_name || user.email?.split("@")[0]}
                                </p>
                                <p className="text-[11px]" style={{ color: "var(--color-text-muted)" }}>
                                    {user.email}
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Navigation */}
                <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
                    <p className="px-3 mb-3 text-[9px] tracking-[0.25em] uppercase" style={{ color: "var(--color-primary)" }}>Navigation</p>
                    {NAV_ITEMS.map((item) => {
                        if (item.auth && !user) return null;
                        const isActive = pathname === item.href;
                        const Icon = item.icon;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setOpen(false)}
                                className="flex items-center gap-3 px-3 py-2.5 transition-colors duration-200"
                                style={{
                                    color: isActive ? "var(--color-primary)" : "var(--color-text-muted)",
                                    background: isActive ? "rgba(201,169,110,0.06)" : "transparent",
                                    borderLeft: isActive ? "1px solid var(--color-primary)" : "1px solid transparent",
                                    borderRadius: "2px",
                                    fontSize: "0.8125rem",
                                    letterSpacing: "0.03em",
                                }}
                            >
                                <Icon size={15} />
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                {/* Footer */}
                <div className="px-4 py-5" style={{ borderTop: "1px solid rgba(201,169,110,0.06)" }}>
                    {user ? (
                        <button
                            onClick={handleSignOut}
                            className="w-full flex items-center gap-3 px-3 py-2.5 transition-colors"
                            style={{ color: "var(--color-text-muted)", fontSize: "0.8125rem", borderRadius: "2px" }}
                        >
                            <LogOut size={15} />
                            Sign Out
                        </button>
                    ) : (
                        <button
                            onClick={handleSignIn}
                            className="w-full btn-primary text-xs py-2.5"
                        >
                            <LogIn size={14} />
                            Sign in with Google
                        </button>
                    )}
                </div>
            </aside>
        </>
    );
}
