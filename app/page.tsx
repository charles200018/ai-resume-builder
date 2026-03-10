import Link from "next/link";
import {
    ArrowRight,
    CheckCircle,
} from "lucide-react";
import PageShell from "@/components/layout/PageShell";

export default async function HomePage() {
    return (
        <PageShell>
        <main className="min-h-screen overflow-hidden" style={{ background: "#0a0a0a" }}>
            {/* Subtle warm glow */}
            <div className="fixed inset-0 pointer-events-none">
                <div
                    className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[600px] opacity-[0.04]"
                    style={{ background: "radial-gradient(ellipse, #c9a96e, transparent 70%)" }}
                />
            </div>

            {/* Hero */}
            <section className="relative z-10 text-center px-6 pt-24 pb-32 max-w-4xl mx-auto">
                {/* Thin gold line */}
                <div className="gold-line mx-auto mb-12" />

                <p className="text-xs tracking-[0.3em] uppercase mb-8" style={{ color: "var(--color-primary)" }}>
                    Artificial Intelligence &middot; Resume Crafting
                </p>

                <h1 className="font-display text-5xl md:text-7xl font-normal mb-8 leading-[1.1]" style={{ fontFamily: "var(--font-display)", color: "var(--color-text)" }}>
                    The Art of the
                    <br />
                    <span className="gradient-text italic">Perfect Resume</span>
                </h1>

                <p className="text-base leading-relaxed mb-14 max-w-lg mx-auto" style={{ color: "var(--color-text-muted)" }}>
                    Crafted by AI, designed for distinction. Your professional narrative,
                    elevated to its finest expression.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link href="/builder">
                        <button className="btn-primary" style={{ padding: "16px 48px" }}>
                            Begin Crafting
                            <ArrowRight size={16} />
                        </button>
                    </Link>
                    <Link href="/dashboard">
                        <button className="btn-ghost" style={{ padding: "16px 36px" }}>
                            View Collection
                        </button>
                    </Link>
                </div>

                {/* Divider */}
                <div className="luxury-divider mt-24 mb-20 max-w-xs mx-auto" />
            </section>

            {/* Features */}
            <section className="relative z-10 max-w-5xl mx-auto px-8 pb-32">
                <p className="text-xs tracking-[0.3em] uppercase text-center mb-16" style={{ color: "var(--color-primary)" }}>
                    The Experience
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ background: "rgba(201, 169, 110, 0.08)" }}>
                    {[
                        {
                            num: "01",
                            title: "AI Intelligence",
                            desc: "Gemini 2.0 interprets your career and articulates it with precision and elegance.",
                        },
                        {
                            num: "02",
                            title: "ATS Mastery",
                            desc: "Engineered to navigate Applicant Tracking Systems at the world's leading firms.",
                        },
                        {
                            num: "03",
                            title: "Instant Export",
                            desc: "One touch. A flawless PDF, ready for the opportunity that awaits.",
                        },
                    ].map((feat) => (
                        <div key={feat.num} className="p-10" style={{ background: "#0a0a0a" }}>
                            <span className="text-xs tracking-[0.2em]" style={{ color: "var(--color-primary)" }}>{feat.num}</span>
                            <h3 className="font-display text-xl mt-4 mb-3" style={{ fontFamily: "var(--font-display)", color: "var(--color-text)" }}>
                                {feat.title}
                            </h3>
                            <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
                                {feat.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Promises */}
            <section className="relative z-10 max-w-3xl mx-auto px-8 pb-32">
                <div className="luxury-divider mb-16" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-12">
                    {[
                        "10 curated professional templates",
                        "Real-time ATS score analysis",
                        "Secure cloud storage",
                        "No watermarks, ever",
                        "Guided step-by-step process",
                        "Completely free to use",
                    ].map((item) => (
                        <div key={item} className="flex items-center gap-3">
                            <CheckCircle size={14} style={{ color: "var(--color-primary)", flexShrink: 0 }} />
                            <span className="text-sm" style={{ color: "var(--color-text-muted)" }}>{item}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="relative z-10 text-center px-8 pb-32">
                <div className="max-w-2xl mx-auto">
                    <div className="gold-line mx-auto mb-10" />
                    <h2 className="font-display text-3xl md:text-4xl mb-4" style={{ fontFamily: "var(--font-display)", color: "var(--color-text)" }}>
                        Your next chapter begins here
                    </h2>
                    <p className="text-sm mb-10" style={{ color: "var(--color-text-muted)" }}>
                        Every great career move starts with a great resume.
                    </p>
                    <Link href="/builder">
                        <button className="btn-primary" style={{ padding: "16px 48px" }}>
                            Create Your Resume
                        </button>
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="relative z-10 py-8 text-center">
                <div className="luxury-divider max-w-xs mx-auto mb-8" />
                <p className="text-xs tracking-[0.15em]" style={{ color: "rgba(138, 133, 120, 0.5)" }}>
                    &copy; {new Date().getFullYear()} RESUME AI
                </p>
            </footer>
        </main>
        </PageShell>
    );
}
