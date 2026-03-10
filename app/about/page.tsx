import PageShell from "@/components/layout/PageShell";

const features = [
    {
        title: "AI-Powered Generation",
        description: "Leveraging advanced AI models to transform your experience into compelling, professionally written resume content.",
    },
    {
        title: "ATS Optimization",
        description: "Every resume is analyzed and scored for Applicant Tracking System compatibility, ensuring your application gets past automated filters.",
    },
    {
        title: "10 Professional Templates",
        description: "Choose from carefully crafted templates spanning professional, creative, minimal, executive, tech, and academic styles.",
    },
    {
        title: "Instant PDF Export",
        description: "Download your polished resume as a high-quality PDF, ready to submit to any employer or job board.",
    },
];

export default async function AboutPage() {
    return (
        <PageShell>
            <div className="min-h-screen pl-16" style={{ background: "var(--color-background)" }}>
                {/* Hero Section */}
                <div className="max-w-4xl mx-auto px-6 pt-24 pb-16 text-center">
                    <p
                        className="text-xs tracking-[0.25em] uppercase mb-4"
                        style={{ color: "var(--color-primary)" }}
                    >
                        About Us
                    </p>
                    <h1
                        className="text-4xl md:text-5xl mb-6"
                        style={{ fontFamily: "var(--font-display)", color: "var(--color-text)" }}
                    >
                        Crafting Careers with<br />
                        <span style={{ color: "var(--color-primary)" }}>Precision & Intelligence</span>
                    </h1>
                    <p
                        className="text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
                        style={{ color: "var(--color-text-muted)" }}
                    >
                        AI Resume Builder combines cutting-edge artificial intelligence with elegant design 
                        to help professionals create resumes that stand out. We believe your resume should 
                        be as exceptional as your career.
                    </p>
                </div>

                {/* Divider */}
                <div className="max-w-4xl mx-auto px-6">
                    <div className="h-px" style={{ background: "linear-gradient(to right, transparent, rgba(201,169,110,0.3), transparent)" }} />
                </div>

                {/* Features Grid */}
                <div className="max-w-4xl mx-auto px-6 py-16">
                    <h2
                        className="text-xs tracking-[0.25em] uppercase text-center mb-12"
                        style={{ color: "var(--color-primary)" }}
                    >
                        What We Offer
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {features.map((feature, idx) => (
                            <div
                                key={idx}
                                className="p-6 transition-colors"
                                style={{
                                    background: "rgba(201,169,110,0.02)",
                                    border: "1px solid rgba(201,169,110,0.08)",
                                    borderRadius: "2px",
                                }}
                            >
                                <h3
                                    className="text-sm tracking-[0.08em] uppercase mb-3 font-medium"
                                    style={{ color: "var(--color-primary)" }}
                                >
                                    {feature.title}
                                </h3>
                                <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Divider */}
                <div className="max-w-4xl mx-auto px-6">
                    <div className="h-px" style={{ background: "linear-gradient(to right, transparent, rgba(201,169,110,0.3), transparent)" }} />
                </div>

                {/* How It Works */}
                <div className="max-w-4xl mx-auto px-6 py-16">
                    <h2
                        className="text-xs tracking-[0.25em] uppercase text-center mb-12"
                        style={{ color: "var(--color-primary)" }}
                    >
                        How It Works
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { step: "01", title: "Enter Your Details", desc: "Fill in your personal information, work experience, education, and skills." },
                            { step: "02", title: "Choose a Template", desc: "Select from 10 professionally designed templates that match your industry." },
                            { step: "03", title: "Generate & Download", desc: "AI enhances your content, optimizes for ATS, and delivers a polished PDF." },
                        ].map((item) => (
                            <div key={item.step} className="text-center">
                                <div
                                    className="text-3xl font-light mb-4"
                                    style={{ fontFamily: "var(--font-display)", color: "rgba(201,169,110,0.3)" }}
                                >
                                    {item.step}
                                </div>
                                <h3
                                    className="text-sm tracking-[0.08em] uppercase mb-2 font-medium"
                                    style={{ color: "var(--color-text)" }}
                                >
                                    {item.title}
                                </h3>
                                <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
                                    {item.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Tech Stack */}
                <div className="max-w-4xl mx-auto px-6 pb-24">
                    <div className="h-px mb-16" style={{ background: "linear-gradient(to right, transparent, rgba(201,169,110,0.3), transparent)" }} />
                    <h2
                        className="text-xs tracking-[0.25em] uppercase text-center mb-8"
                        style={{ color: "var(--color-primary)" }}
                    >
                        Built With
                    </h2>
                    <div className="flex flex-wrap justify-center gap-4">
                        {["Next.js 15", "Supabase", "OpenRouter AI", "Tailwind CSS", "TypeScript"].map((tech) => (
                            <span
                                key={tech}
                                className="px-4 py-2 text-xs tracking-[0.08em] uppercase"
                                style={{
                                    border: "1px solid rgba(201,169,110,0.12)",
                                    borderRadius: "2px",
                                    color: "var(--color-text-muted)",
                                }}
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </PageShell>
    );
}
