"use client";

import type { ResumeTemplate } from "@/lib/templates/templateData";

/**
 * MiniResumePreview renders a tiny but realistic resume preview
 * using actual example text (names, titles, descriptions) instead of
 * abstract gray bars, so users immediately understand what the
 * template will look like with real content.
 */
export default function MiniResumePreview({ template }: { template: ResumeTemplate }) {
    const isDouble = template.layout === "double" || template.layout === "sidebar-left";
    const isRightSidebar = template.layout === "sidebar-right";
    const isCentered = template.headerStyle === "centered";

    const textMain = "#333";
    const textSub = "#666";
    const textLight = "#999";

    return (
        <div
            className="aspect-[3/4] relative"
            style={{ backgroundColor: template.colors.background }}
        >
            <div className="absolute inset-[5px] overflow-hidden bg-white shadow-sm">
                <div
                    className={`h-full ${isDouble || isRightSidebar ? "grid grid-cols-[1fr_2fr]" : ""}`}
                    style={{ fontFamily: template.fontFamily }}
                >
                    {/* Left Sidebar (for double / sidebar-left layouts) */}
                    {isDouble && (
                        <SidebarPanel template={template} textLight={textLight} />
                    )}

                    {/* Main content */}
                    <div className={`p-2 overflow-hidden ${isRightSidebar ? "order-first" : ""}`}>
                        {/* Header / Name */}
                        <div className={`mb-1.5 ${isCentered ? "text-center" : ""}`}>
                            <p
                                className="font-bold leading-none"
                                style={{ fontSize: "6px", color: template.colors.primary }}
                            >
                                SARAH JOHNSON
                            </p>
                            <p style={{ fontSize: "3.5px", color: textSub, marginTop: "1px" }}>
                                Senior Software Engineer
                            </p>
                            <p style={{ fontSize: "2.5px", color: textLight, marginTop: "1px" }}>
                                san.francisco@email.com · (555) 123-4567
                            </p>
                        </div>

                        {/* Divider */}
                        <div className="h-[0.5px] my-1" style={{ backgroundColor: template.colors.secondary + "40" }} />

                        {/* Experience */}
                        <SectionHeading text="EXPERIENCE" color={template.colors.secondary} />
                        <div className="mb-1">
                            <p style={{ fontSize: "3px", fontWeight: 600, color: textMain }}>
                                Lead Developer — Google
                            </p>
                            <p style={{ fontSize: "2.5px", color: textLight }}>
                                2020 – Present
                            </p>
                            <p style={{ fontSize: "2.5px", color: textSub, marginTop: "0.5px", lineHeight: 1.3 }}>
                                Led a team of 8 engineers building cloud-native microservices. Reduced API latency by 40%.
                            </p>
                        </div>
                        <div className="mb-1">
                            <p style={{ fontSize: "3px", fontWeight: 600, color: textMain }}>
                                Software Engineer — Meta
                            </p>
                            <p style={{ fontSize: "2.5px", color: textLight }}>
                                2017 – 2020
                            </p>
                            <p style={{ fontSize: "2.5px", color: textSub, marginTop: "0.5px", lineHeight: 1.3 }}>
                                Developed React components for News Feed reaching 2B+ users.
                            </p>
                        </div>

                        {/* Education */}
                        <SectionHeading text="EDUCATION" color={template.colors.secondary} />
                        <div className="mb-1">
                            <p style={{ fontSize: "3px", fontWeight: 600, color: textMain }}>
                                B.S. Computer Science
                            </p>
                            <p style={{ fontSize: "2.5px", color: textLight }}>
                                Stanford University · 2017
                            </p>
                        </div>

                        {/* Skills (only in single layout — sidebar layout shows skills in sidebar) */}
                        {!isDouble && !isRightSidebar && (
                            <>
                                <SectionHeading text="SKILLS" color={template.colors.secondary} />
                                <div className="flex flex-wrap gap-[1.5px]">
                                    {["React", "TypeScript", "Node.js", "AWS", "Python", "Docker"].map((s) => (
                                        <span
                                            key={s}
                                            style={{
                                                fontSize: "2.5px",
                                                padding: "0.5px 2px",
                                                background: template.colors.primary + "12",
                                                color: textSub,
                                                borderRadius: "1px",
                                            }}
                                        >
                                            {s}
                                        </span>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>

                    {/* Right Sidebar */}
                    {isRightSidebar && (
                        <SidebarPanel template={template} textLight={textLight} />
                    )}
                </div>
            </div>
        </div>
    );
}

function SectionHeading({ text, color }: { text: string; color: string }) {
    return (
        <p
            className="mb-0.5"
            style={{
                fontSize: "3px",
                fontWeight: 700,
                color: color,
                letterSpacing: "0.1em",
                borderBottom: `0.5px solid ${color}30`,
                paddingBottom: "0.5px",
            }}
        >
            {text}
        </p>
    );
}

function SidebarPanel({
    template,
    textLight,
}: {
    template: ResumeTemplate;
    textLight: string;
}) {
    return (
        <div
            className="p-1.5 space-y-1.5 overflow-hidden"
            style={{ backgroundColor: template.colors.primary + "0D" }}
        >
            {/* Mini avatar placeholder */}
            <div
                className="w-5 h-5 rounded-full mx-auto"
                style={{ backgroundColor: template.colors.primary + "25" }}
            />

            {/* Contact */}
            <div>
                <p style={{ fontSize: "2.5px", fontWeight: 700, color: template.colors.primary, letterSpacing: "0.08em" }}>
                    CONTACT
                </p>
                <p style={{ fontSize: "2px", color: textLight, marginTop: "1px", lineHeight: 1.4 }}>
                    San Francisco, CA{"\n"}(555) 123-4567{"\n"}sarah@email.com
                </p>
            </div>

            {/* Skills */}
            <div>
                <p style={{ fontSize: "2.5px", fontWeight: 700, color: template.colors.primary, letterSpacing: "0.08em" }}>
                    SKILLS
                </p>
                <div className="space-y-[1px] mt-[1px]">
                    {["React", "TypeScript", "Node.js", "AWS"].map((s) => (
                        <p key={s} style={{ fontSize: "2px", color: textLight }}>{s}</p>
                    ))}
                </div>
            </div>

            {/* Languages */}
            <div>
                <p style={{ fontSize: "2.5px", fontWeight: 700, color: template.colors.primary, letterSpacing: "0.08em" }}>
                    LANGUAGES
                </p>
                <div className="space-y-[1px] mt-[1px]">
                    <p style={{ fontSize: "2px", color: textLight }}>English · Native</p>
                    <p style={{ fontSize: "2px", color: textLight }}>Spanish · Fluent</p>
                </div>
            </div>
        </div>
    );
}
