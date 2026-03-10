import PageShell from "@/components/layout/PageShell";
import { templates, TEMPLATE_CATEGORIES } from "@/lib/templates/templateData";
import Link from "next/link";

export default async function TemplatesPage() {
    return (
        <PageShell>
            <div className="min-h-screen pl-16" style={{ background: "var(--color-background)" }}>
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
                        Each template is ATS-optimized and ready to use.
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
                                        className="group relative overflow-hidden transition-all duration-300"
                                        style={{
                                            border: "1px solid rgba(201,169,110,0.08)",
                                            borderRadius: "2px",
                                        }}
                                    >
                                        {/* Preview */}
                                        <div
                                            className="aspect-[3/4] relative"
                                            style={{ backgroundColor: template.colors.background }}
                                        >
                                            <div className="absolute inset-2 overflow-hidden bg-white shadow-sm">
                                                <div
                                                    className={`h-full ${template.layout === "double" || template.layout === "sidebar-left" || template.layout === "sidebar-right" ? "grid grid-cols-3" : ""}`}
                                                    style={{ fontFamily: template.fontFamily }}
                                                >
                                                    {/* Sidebar for double/sidebar layouts */}
                                                    {(template.layout === "double" || template.layout === "sidebar-left") && (
                                                        <div className="p-1.5 space-y-1" style={{ backgroundColor: template.colors.primary + "10" }}>
                                                            <div className="w-5 h-5 rounded-full mx-auto mb-1" style={{ backgroundColor: template.colors.primary + "25" }} />
                                                            <div className="h-0.5" style={{ backgroundColor: template.colors.primary + "20" }} />
                                                            <div className="space-y-0.5">
                                                                <div className="h-[1px] bg-gray-200 w-[85%]" />
                                                                <div className="h-[1px] bg-gray-200 w-[65%]" />
                                                                <div className="h-[1px] bg-gray-200 w-[75%]" />
                                                            </div>
                                                            <div className="h-0.5 mt-1" style={{ backgroundColor: template.colors.primary + "20" }} />
                                                            <div className="space-y-0.5">
                                                                <div className="h-[1px] bg-gray-200 w-[80%]" />
                                                                <div className="h-[1px] bg-gray-200 w-[55%]" />
                                                            </div>
                                                        </div>
                                                    )}

                                                    {/* Main content */}
                                                    <div className={`p-1.5 ${template.layout !== "single" ? "col-span-2" : ""}`}>
                                                        {/* Header */}
                                                        <div className={`mb-1 ${template.headerStyle === "centered" ? "text-center" : ""}`}>
                                                            <div
                                                                className="h-1 mb-[2px]"
                                                                style={{
                                                                    backgroundColor: template.colors.primary,
                                                                    width: template.headerStyle === "centered" ? "55%" : "50%",
                                                                    margin: template.headerStyle === "centered" ? "0 auto" : undefined,
                                                                }}
                                                            />
                                                            <div
                                                                className="h-[1px] bg-gray-300"
                                                                style={{
                                                                    width: template.headerStyle === "centered" ? "35%" : "30%",
                                                                    margin: template.headerStyle === "centered" ? "1px auto" : "1px 0",
                                                                }}
                                                            />
                                                        </div>

                                                        <div className="h-[1px] my-1" style={{ backgroundColor: template.colors.secondary + "25" }} />

                                                        {/* Section */}
                                                        <div className="mb-1">
                                                            <div className="h-[1px] mb-0.5" style={{ backgroundColor: template.colors.secondary, width: "28%" }} />
                                                            <div className="h-[1px] bg-gray-300 w-[75%] mb-[1px]" />
                                                            <div className="h-[1px] bg-gray-200 w-[60%] mb-[1px]" />
                                                            <div className="h-[1px] bg-gray-200 w-[65%]" />
                                                        </div>

                                                        {/* Section 2 */}
                                                        <div className="mb-1">
                                                            <div className="h-[1px] mb-0.5" style={{ backgroundColor: template.colors.secondary, width: "22%" }} />
                                                            <div className="h-[1px] bg-gray-300 w-[55%] mb-[1px]" />
                                                            <div className="h-[1px] bg-gray-200 w-[45%]" />
                                                        </div>

                                                        {/* Skills */}
                                                        <div>
                                                            <div className="h-[1px] mb-0.5" style={{ backgroundColor: template.colors.secondary, width: "18%" }} />
                                                            <div className="flex gap-[2px] flex-wrap">
                                                                {[16, 20, 14, 22].map((w, i) => (
                                                                    <div key={i} className="h-1 rounded-sm" style={{ backgroundColor: template.colors.primary + "12", width: `${w}%` }} />
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Right sidebar layout */}
                                                    {template.layout === "sidebar-right" && (
                                                        <div className="p-1.5 space-y-1" style={{ backgroundColor: template.colors.primary + "10" }}>
                                                            <div className="h-0.5" style={{ backgroundColor: template.colors.primary + "20" }} />
                                                            <div className="space-y-0.5">
                                                                <div className="h-[1px] bg-gray-200 w-[80%]" />
                                                                <div className="h-[1px] bg-gray-200 w-[60%]" />
                                                            </div>
                                                            <div className="h-0.5 mt-1" style={{ backgroundColor: template.colors.primary + "20" }} />
                                                            <div className="space-y-0.5">
                                                                <div className="h-[1px] bg-gray-200 w-[70%]" />
                                                                <div className="h-[1px] bg-gray-200 w-[50%]" />
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

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
