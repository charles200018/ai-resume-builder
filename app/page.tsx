import Link from "next/link";
import {
    FileText,
    Sparkles,
    Download,
    Shield,
    ArrowRight,
    Zap,
    Star,
} from "lucide-react";

export default function HomePage() {
    return (
        <main className="min-h-screen overflow-hidden" style={{ background: "var(--color-surface)" }}>
            {/* Animated background */}
            <div className="fixed inset-0 pointer-events-none">
                <div
                    className="absolute top-0 left-1/4 w-96 h-96 rounded-full opacity-20 blur-3xl"
                    style={{ background: "radial-gradient(circle, #6366f1, transparent)" }}
                />
                <div
                    className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-15 blur-3xl"
                    style={{ background: "radial-gradient(circle, #a855f7, transparent)" }}
                />
            </div>

            {/* Nav */}
            <nav className="relative z-10 flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
                <div className="flex items-center gap-2">
                    <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center"
                        style={{ background: "linear-gradient(135deg, #6366f1, #a855f7)" }}
                    >
                        <FileText size={16} color="white" />
                    </div>
                    <span className="font-bold text-lg" style={{ color: "var(--color-text)" }}>
                        ResumeAI
                    </span>
                </div>
                <Link href="/builder">
                    <button className="btn-primary">
                        Get Started Free
                        <ArrowRight size={16} />
                    </button>
                </Link>
            </nav>

            {/* Hero */}
            <section className="relative z-10 text-center px-6 pt-20 pb-32 max-w-4xl mx-auto animate-fade-in">
                <div
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-8"
                    style={{
                        background: "rgba(99, 102, 241, 0.1)",
                        border: "1px solid rgba(99, 102, 241, 0.25)",
                        color: "var(--color-primary-light)",
                    }}
                >
                    <Sparkles size={14} />
                    Powered by Gemini 2.0 AI
                </div>

                <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
                    Build Your{" "}
                    <span className="gradient-text">Perfect Resume</span>{" "}
                    in Minutes
                </h1>

                <p className="text-xl mb-10" style={{ color: "var(--color-text-muted)", maxWidth: "580px", margin: "0 auto 2.5rem" }}>
                    Fill in your details, and our AI crafts a professional,
                    ATS-optimized resume tailored to your target role — no designer needed.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link href="/builder">
                        <button className="btn-primary" style={{ padding: "14px 32px", fontSize: "1rem" }}>
                            <Sparkles size={18} />
                            Create My Resume
                        </button>
                    </Link>
                </div>

                {/* Social proof */}
                <div className="mt-12 flex items-center justify-center gap-1" style={{ color: "#f59e0b" }}>
                    {[...Array(5)].map((_, i) => (
                        <Star key={i} size={16} fill="currentColor" />
                    ))}
                    <span className="ml-2 text-sm" style={{ color: "var(--color-text-muted)" }}>
                        Trusted by thousands of job seekers
                    </span>
                </div>
            </section>

            {/* Features */}
            <section className="relative z-10 max-w-6xl mx-auto px-6 pb-24">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        {
                            icon: <Sparkles size={24} />,
                            title: "AI-Powered Writing",
                            desc: "Gemini 2.0 crafts compelling bullet points and summaries tailored to your target role.",
                        },
                        {
                            icon: <Shield size={24} />,
                            title: "ATS Optimized",
                            desc: "Formatted to pass Applicant Tracking Systems at Fortune 500 companies.",
                        },
                        {
                            icon: <Download size={24} />,
                            title: "Instant PDF Export",
                            desc: "Download a print-ready PDF resume with one click. No watermarks, no subscriptions.",
                        },
                        {
                            icon: <Zap size={24} />,
                            title: "5-Minute Process",
                            desc: "Our guided multi-step form makes resume building fast and stress-free.",
                        },
                        {
                            icon: <FileText size={24} />,
                            title: "Saved to Cloud",
                            desc: "Your resumes are securely stored — access and re-download anytime.",
                        },
                        {
                            icon: <Star size={24} />,
                            title: "Professional Templates",
                            desc: "Clean, modern design that makes a great first impression on hiring managers.",
                        },
                    ].map((feat) => (
                        <div key={feat.title} className="glass-card p-6 hover:border-indigo-500/40 transition-all duration-300" style={{ borderColor: "var(--color-border)" }}>
                            <div
                                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                                style={{ background: "rgba(99, 102, 241, 0.15)", color: "var(--color-primary-light)" }}
                            >
                                {feat.icon}
                            </div>
                            <h3 className="font-semibold text-lg mb-2" style={{ color: "var(--color-text)" }}>
                                {feat.title}
                            </h3>
                            <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
                                {feat.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="relative z-10 text-center px-6 pb-24">
                <div
                    className="max-w-2xl mx-auto glass-card p-12"
                    style={{ background: "linear-gradient(135deg, rgba(99,102,241,0.15), rgba(168,85,247,0.1))" }}
                >
                    <h2 className="text-3xl font-bold mb-4">
                        Ready to land your <span className="gradient-text">dream job?</span>
                    </h2>
                    <p className="mb-8" style={{ color: "var(--color-text-muted)" }}>
                        Create your AI-powered resume in under 5 minutes.
                    </p>
                    <Link href="/builder">
                        <button className="btn-primary" style={{ padding: "14px 32px", fontSize: "1rem" }}>
                            <Sparkles size={18} />
                            Start Building Now — It&apos;s Free
                            <ArrowRight size={18} />
                        </button>
                    </Link>
                </div>
            </section>
        </main>
    );
}
