"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import {
    ArrowLeft,
    Home,
    PenTool,
    LayoutGrid,
    FileText,
    Info,
    LogIn,
    LogOut,
    User,
    ChevronDown,
} from "lucide-react";
import { createClient } from "@/lib/supabase/browser";
import type { User as SupabaseUser } from "@supabase/supabase-js";

interface TopNavProps {
    user: SupabaseUser | null;
}

const NAV_ITEMS = [
    { href: "/", label: "Home", icon: Home },
    { href: "/builder", label: "Builder", icon: PenTool },
    { href: "/dashboard", label: "My Resumes", icon: LayoutGrid, auth: true },
    { href: "/templates", label: "Templates", icon: FileText },
    { href: "/about", label: "About", icon: Info },
];

const PAGE_TITLES: Record<string, string> = {
    "/": "Home",
    "/builder": "Resume Builder",
    "/dashboard": "My Resumes",
    "/templates": "Templates",
    "/about": "About",
};

export default function TopNav({ user }: TopNavProps) {
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const pathname = usePathname();
    const router = useRouter();
    const supabase = createClient();

    const currentTitle = PAGE_TITLES[pathname] || "Resume AI";
    const isHome = pathname === "/";

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClick(e: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setMenuOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, []);

    const handleSignIn = async () => {
        setMenuOpen(false);
        await supabase.auth.signInWithOAuth({
            provider: "google",
            options: { redirectTo: `${window.location.origin}/auth/callback` },
        });
    };

    const handleSignOut = async () => {
        setMenuOpen(false);
        await supabase.auth.signOut();
        window.location.href = "/";
    };

    return (
        <nav
            className="fixed top-0 left-0 right-0 z-50 print:hidden"
            style={{
                background: "rgba(10,10,10,0.85)",
                backdropFilter: "blur(12px)",
                borderBottom: "1px solid rgba(201,169,110,0.06)",
            }}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
                {/* Left: Back button + Logo */}
                <div className="flex items-center gap-3">
                    {!isHome && (
                        <button
                            onClick={() => router.back()}
                            className="flex items-center gap-1.5 mr-2 transition-colors"
                            style={{ color: "var(--color-text-muted)", fontSize: "0.75rem" }}
                            aria-label="Go back"
                        >
                            <ArrowLeft size={14} />
                            <span className="hidden sm:inline">Back</span>
                        </button>
                    )}
                    <Link href="/" className="flex items-center gap-2">
                        <span
                            style={{
                                fontFamily: "var(--font-display)",
                                color: "var(--color-primary)",
                                fontSize: "1.1rem",
                                letterSpacing: "0.06em",
                                fontWeight: 500,
                            }}
                        >
                            RESUME
                        </span>
                        <span
                            style={{
                                color: "var(--color-text-muted)",
                                fontSize: "0.6rem",
                                letterSpacing: "0.25em",
                                marginTop: "1px",
                            }}
                        >
                            AI
                        </span>
                    </Link>
                </div>

                {/* Center: Page links */}
                <div className="hidden md:flex items-center gap-1">
                    {NAV_ITEMS.map((item) => {
                        if (item.auth && !user) return null;
                        const isActive = pathname === item.href;
                        const Icon = item.icon;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="flex items-center gap-1.5 px-3 py-1.5 transition-colors duration-200"
                                style={{
                                    color: isActive ? "var(--color-primary)" : "var(--color-text-muted)",
                                    fontSize: "0.75rem",
                                    letterSpacing: "0.05em",
                                    borderBottom: isActive ? "1px solid var(--color-primary)" : "1px solid transparent",
                                }}
                            >
                                <Icon size={13} />
                                {item.label}
                            </Link>
                        );
                    })}
                </div>

                {/* Right: Account */}
                <div className="relative" ref={menuRef}>
                    <button
                        onClick={() => setMenuOpen((v) => !v)}
                        className="flex items-center gap-2 px-2 py-1.5 transition-colors"
                        style={{
                            border: "1px solid rgba(201,169,110,0.1)",
                            borderRadius: "2px",
                            background: "rgba(201,169,110,0.03)",
                        }}
                    >
                        {user?.user_metadata?.avatar_url ? (
                            <Image
                                src={user.user_metadata.avatar_url}
                                alt=""
                                width={24}
                                height={24}
                                className="rounded-full"
                            />
                        ) : (
                            <div
                                className="w-6 h-6 flex items-center justify-center"
                                style={{ border: "1px solid rgba(201,169,110,0.2)", borderRadius: "50%" }}
                            >
                                <User size={12} style={{ color: "var(--color-primary)" }} />
                            </div>
                        )}
                        <span
                            className="hidden sm:inline text-xs max-w-[100px] truncate"
                            style={{ color: "var(--color-text)" }}
                        >
                            {user ? user.user_metadata?.full_name || user.email?.split("@")[0] : "Account"}
                        </span>
                        <ChevronDown
                            size={12}
                            style={{
                                color: "var(--color-text-muted)",
                                transform: menuOpen ? "rotate(180deg)" : "rotate(0)",
                                transition: "transform 0.2s",
                            }}
                        />
                    </button>

                    {/* Dropdown */}
                    {menuOpen && (
                        <div
                            className="absolute right-0 top-full mt-2 w-56 py-2"
                            style={{
                                background: "#111",
                                border: "1px solid rgba(201,169,110,0.1)",
                                borderRadius: "2px",
                                boxShadow: "0 8px 30px rgba(0,0,0,0.5)",
                            }}
                        >
                            {user && (
                                <div
                                    className="px-4 py-3 mb-1"
                                    style={{ borderBottom: "1px solid rgba(201,169,110,0.06)" }}
                                >
                                    <p
                                        className="text-sm font-medium truncate"
                                        style={{ color: "var(--color-text)" }}
                                    >
                                        {user.user_metadata?.full_name || user.email?.split("@")[0]}
                                    </p>
                                    <p
                                        className="text-[11px] truncate"
                                        style={{ color: "var(--color-text-muted)" }}
                                    >
                                        {user.email}
                                    </p>
                                </div>
                            )}

                            {/* Mobile nav links */}
                            <div className="md:hidden">
                                {NAV_ITEMS.map((item) => {
                                    if (item.auth && !user) return null;
                                    const Icon = item.icon;
                                    const isActive = pathname === item.href;
                                    return (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            onClick={() => setMenuOpen(false)}
                                            className="flex items-center gap-2.5 px-4 py-2 transition-colors"
                                            style={{
                                                color: isActive
                                                    ? "var(--color-primary)"
                                                    : "var(--color-text-muted)",
                                                fontSize: "0.8125rem",
                                            }}
                                        >
                                            <Icon size={14} />
                                            {item.label}
                                        </Link>
                                    );
                                })}
                                <div
                                    className="my-1"
                                    style={{ borderTop: "1px solid rgba(201,169,110,0.06)" }}
                                />
                            </div>

                            {user ? (
                                <button
                                    onClick={handleSignOut}
                                    className="w-full flex items-center gap-2.5 px-4 py-2 transition-colors text-left"
                                    style={{ color: "var(--color-text-muted)", fontSize: "0.8125rem" }}
                                >
                                    <LogOut size={14} />
                                    Sign Out
                                </button>
                            ) : (
                                <button
                                    onClick={handleSignIn}
                                    className="w-full flex items-center gap-2.5 px-4 py-2 transition-colors text-left"
                                    style={{ color: "var(--color-primary)", fontSize: "0.8125rem" }}
                                >
                                    <LogIn size={14} />
                                    Sign in with Google
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}
