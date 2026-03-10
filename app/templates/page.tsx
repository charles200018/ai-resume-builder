import PageShell from "@/components/layout/PageShell";
import { templates, TEMPLATE_CATEGORIES } from "@/lib/templates/templateData";
import Link from "next/link";
import MiniResumePreview from "@/components/templates/MiniResumePreview";

export default async function TemplatesPage() {
    return (
        <PageShell>
            <div className="min-h-screen" style={{ background: "var(--color-background)" }}>
                {/* Header */}
                <div className="max-w-6xl mx-auto px-6 pt-24 pb-12 text-center">
                    <p
                        className="text-xs tracking-[0.25em] uppercase mb-4"
                        style={{ color: "var(--color-primary)" }}
                    >
                        Template Gallery
                    </p>
                    <h1
                        className="text-4xl md:text-5xl mb-4"
                        style={{ fontFamily: "var(--font-display)", color: "var(--color-text)" }}
                    >
                        Professional Resume Templates
                    </h1>
                    <p className="text-base max-w-xl mx-auto" style={{ color: "var(--color-text-muted)" }}>
                        Browse {templates.length} expertly crafted templates across {TEMPLATE_CATEGORIES.length} categories.
                        Each preview shows real example content so you know exactly how it will look.
                    </p>
                    <Link
                        href="/builder"
                        className="inline-block mt-8 px-8 py-3 text-xs tracking-[0.15em] uppercase font-medium transition-opacity hover:opacity-80"
                        style={{
                            background: "var(--color-primary)",
                            color: "#0a0a0a",
                            borderRadius: "2px",
                        }}
                    >
                        Start Building Your Resume
                    </Link>
                </div>

                {/* Category Sections */}
                {TEMPLATE_CATEGORIES.map((category) => {
                    const categoryTemplates = templates.filter(t => t.category === category.id);
                    return (
                        <section key={category.id} className="max-w-6xl mx-auto px-6 py-12">
                            {/* Category Header */}
                            <div className="flex items-center gap-4 mb-8">
                                <div className="h-px flex-1" style={{ background: "rgba(201,169,110,0.12)" }} />
                                <h2
                                    className="text-xs tracking-[0.25em] uppercase whitespace-nowrap"
                                    style={{ color: "var(--color-primary)" }}
                                >
                                    {category.name} · {categoryTemplates.length} Templates
                                </h2>
                                <div className="h-px flex-1" style={{ background: "rgba(201,169,110,0.12)" }} />
                            </div>

                            {/* Template Grid */}
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                                {categoryTemplates.map((template) => (
                                    <div
                                        key={template.id}
                                        className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-black/30"
                                        style={{
                                            border: "1px solid rgba(201,169,110,0.08)",
                                            borderRadius: "2px",
                                        }}
                                    >
                                        {/* Real Example Preview */}
                                        <div className="relative">
                                            <MiniResumePreview template={template} />

                                            {/* Premium Badge */}
                                            {template.premium && (
                                                <div
                                                    className="absolute top-1 left-1 px-1 py-[1px] text-[7px] font-bold tracking-[0.1em] uppercase"
                                                    style={{ background: "var(--color-primary)", color: "#0a0a0a", borderRadius: "2px" }}
                                                >
                                                    PRO
                                                </div>
                                            )}

                                            {/* Hover */}
                                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                                                <Link
                                                    href="/builder"
                                                    className="px-3 py-1 text-[9px] tracking-[0.1em] uppercase font-medium"
                                                    style={{ background: "var(--color-primary)", color: "#0a0a0a", borderRadius: "2px" }}
                                                >
                                                    Use Template
                                                </Link>
                                            </div>
                                        </div>

                                        {/* Footer */}
                                        <div className="p-2.5" style={{ background: "rgba(20,20,20,0.9)" }}>
                                            <p className="text-[11px] font-medium truncate" style={{ color: "var(--color-text)" }}>
                                                {template.name}
                                            </p>
                                            <p className="text-[9px] mt-0.5 capitalize tracking-wide" style={{ color: "var(--color-text-muted)" }}>
                                                {template.layout} layout
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    );
                })}

                {/* Bottom CTA */}
                <div className="max-w-6xl mx-auto px-6 py-16 text-center">
                    <div className="h-px mb-16" style={{ background: "linear-gradient(to right, transparent, rgba(201,169,110,0.3), transparent)" }} />
                    <p className="text-sm mb-6" style={{ color: "var(--color-text-muted)" }}>
                        Ready to create your professional resume?
                    </p>
                    <Link
                        href="/builder"
                        className="inline-block px-10 py-3 text-xs tracking-[0.15em] uppercase font-medium transition-opacity hover:opacity-80"
                        style={{
                            background: "var(--color-primary)",
                            color: "#0a0a0a",
                            borderRadius: "2px",
                        }}
                    >
                        Get Started Now
                    </Link>
                </div>
            </div>
        </PageShell>
    );
}
