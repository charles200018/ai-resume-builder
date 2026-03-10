"use client";

import { useState, useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { templates, getTemplatesByCategory, type ResumeTemplate, type TemplateCategory } from "@/lib/templates/templateData";

const categoryLabels: Record<TemplateCategory | "all", string> = {
    all: "All",
    professional: "Professional",
    creative: "Creative",
    minimal: "Minimal",
    executive: "Executive",
    tech: "Tech",
    academic: "Academic",
};

export default function TemplateSelectionStep() {
    const { setValue, watch } = useFormContext();
    const [activeCategory, setActiveCategory] = useState<TemplateCategory | "all">("all");
    const selectedTemplate = watch("template") || "modern-professional";

    const filteredTemplates = useMemo(() => {
        return activeCategory === "all" 
            ? templates 
            : getTemplatesByCategory(activeCategory);
    }, [activeCategory]);

    const categories: (TemplateCategory | "all")[] = ["all", "professional", "creative", "minimal", "executive", "tech", "academic"];

    return (
        <div className="space-y-6">
            <div>
                <h2 className="font-display text-xl mb-2" style={{ fontFamily: "var(--font-display)", color: "var(--color-text)" }}>
                    Choose Your Template
                </h2>
                <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
                    Select a professional template that matches your industry and style
                </p>
            </div>

            {/* Category Tabs */}
            <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                    <button
                        key={category}
                        type="button"
                        onClick={() => setActiveCategory(category)}
                        className="px-3 py-2 text-xs transition-all duration-200"
                        style={{
                            background: activeCategory === category ? "var(--color-primary)" : "transparent",
                            color: activeCategory === category ? "#0a0a0a" : "var(--color-text-muted)",
                            border: activeCategory === category ? "1px solid var(--color-primary)" : "1px solid rgba(201,169,110,0.1)",
                            borderRadius: "2px",
                            letterSpacing: "0.08em",
                            textTransform: "uppercase",
                            fontWeight: activeCategory === category ? 600 : 400,
                        }}
                    >
                        {categoryLabels[category]}
                    </button>
                ))}
            </div>

            {/* Templates Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-h-[500px] overflow-y-auto pr-2">
                {filteredTemplates.map((template) => (
                    <TemplateCard
                        key={template.id}
                        template={template}
                        isSelected={selectedTemplate === template.id}
                        onSelect={() => setValue("template", template.id)}
                    />
                ))}
            </div>

            {/* Selected Template Info */}
            {selectedTemplate && (
                <div 
                    className="mt-4 p-4"
                    style={{ 
                        background: "rgba(201,169,110,0.04)", 
                        border: "1px solid rgba(201,169,110,0.12)",
                        borderRadius: "2px",
                    }}
                >
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 flex items-center justify-center" style={{ background: "var(--color-primary)", color: "#0a0a0a", borderRadius: "2px", fontSize: "0.75rem", fontWeight: 700 }}>
                            ✓
                        </div>
                        <div>
                            <p className="font-medium text-sm" style={{ color: "var(--color-text)" }}>
                                {templates.find(t => t.id === selectedTemplate)?.name || "Template Selected"}
                            </p>
                            <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>
                                {templates.find(t => t.id === selectedTemplate)?.description}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

function TemplateCard({
    template,
    isSelected,
    onSelect,
}: {
    template: ResumeTemplate;
    isSelected: boolean;
    onSelect: () => void;
}) {
    return (
        <button
            type="button"
            onClick={onSelect}
            className="relative group overflow-hidden transition-all duration-300 text-left"
            style={{
                border: isSelected ? "1px solid var(--color-primary)" : "1px solid rgba(201,169,110,0.08)",
                borderRadius: "2px",
            }}
        >
            {/* Example Resume Preview */}
            <div 
                className="aspect-[3/4] relative"
                style={{ backgroundColor: template.colors.background }}
            >
                <div className="absolute inset-2 overflow-hidden bg-white shadow-sm">
                    <div 
                        className={`h-full ${template.layout === "double" ? "grid grid-cols-3" : ""}`}
                        style={{ fontFamily: template.fontFamily }}
                    >
                        {/* Sidebar for double layout */}
                        {template.layout === "double" && (
                            <div className="p-2 space-y-2" style={{ backgroundColor: template.colors.primary + "12" }}>
                                <div className="w-8 h-8 rounded-full mx-auto mb-2" style={{ backgroundColor: template.colors.primary + "30" }} />
                                <div className="h-1 w-full" style={{ backgroundColor: template.colors.primary + "20" }} />
                                <div className="space-y-1 mt-2">
                                    <div className="h-0.5 bg-gray-200 w-[90%]" />
                                    <div className="h-0.5 bg-gray-200 w-[70%]" />
                                    <div className="h-0.5 bg-gray-200 w-[80%]" />
                                </div>
                                <div className="h-1 w-full mt-3" style={{ backgroundColor: template.colors.primary + "20" }} />
                                <div className="space-y-1">
                                    <div className="h-0.5 bg-gray-200 w-[85%]" />
                                    <div className="h-0.5 bg-gray-200 w-[60%]" />
                                </div>
                            </div>
                        )}

                        {/* Main content */}
                        <div className={`p-2.5 ${template.layout === "double" ? "col-span-2" : ""}`}>
                            {/* Header */}
                            <div className={`mb-2 ${template.headerStyle === "centered" ? "text-center" : ""}`}>
                                <div className="h-1.5 mb-0.5" style={{ backgroundColor: template.colors.primary, width: template.headerStyle === "centered" ? "60%" : "55%", margin: template.headerStyle === "centered" ? "0 auto" : undefined }} />
                                <div className="h-0.5 bg-gray-300" style={{ width: template.headerStyle === "centered" ? "40%" : "35%", margin: template.headerStyle === "centered" ? "2px auto" : "2px 0" }} />
                            </div>

                            {/* Example content lines mimicking resume sections */}
                            <div className="h-px my-1.5" style={{ backgroundColor: template.colors.secondary + "30" }} />

                            {/* "Experience" section */}
                            <div className="mb-1.5">
                                <div className="h-0.5 mb-1" style={{ backgroundColor: template.colors.secondary, width: "30%" }} />
                                <div className="h-0.5 bg-gray-300 w-[80%] mb-0.5" />
                                <div className="h-0.5 bg-gray-200 w-[65%] mb-0.5" />
                                <div className="h-0.5 bg-gray-200 w-[70%]" />
                            </div>

                            {/* "Education" section */}
                            <div className="mb-1.5">
                                <div className="h-0.5 mb-1" style={{ backgroundColor: template.colors.secondary, width: "25%" }} />
                                <div className="h-0.5 bg-gray-300 w-[60%] mb-0.5" />
                                <div className="h-0.5 bg-gray-200 w-[50%]" />
                            </div>

                            {/* "Skills" section */}
                            <div>
                                <div className="h-0.5 mb-1" style={{ backgroundColor: template.colors.secondary, width: "20%" }} />
                                <div className="flex gap-0.5 flex-wrap">
                                    {[...Array(4)].map((_, i) => (
                                        <div key={i} className="h-1.5 rounded-sm px-1" style={{ backgroundColor: template.colors.primary + "15", width: `${18 + i * 4}%` }} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Selected Indicator */}
                {isSelected && (
                    <div className="absolute top-1.5 right-1.5 w-5 h-5 flex items-center justify-center" style={{ background: "var(--color-primary)", borderRadius: "2px" }}>
                        <svg className="w-3 h-3" fill="none" stroke="#0a0a0a" viewBox="0 0 24 24" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                )}

                {/* Premium Badge */}
                {template.premium && (
                    <div className="absolute top-1.5 left-1.5 px-1.5 py-0.5 text-[8px] font-bold tracking-[0.1em] uppercase"
                        style={{ background: "var(--color-primary)", color: "#0a0a0a", borderRadius: "2px" }}>
                        PRO
                    </div>
                )}

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 
                              flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <span className="px-3 py-1 text-[10px] tracking-[0.1em] uppercase" style={{ background: "var(--color-primary)", color: "#0a0a0a", borderRadius: "2px" }}>
                        {isSelected ? "Selected" : "Select"}
                    </span>
                </div>
            </div>

            {/* Card Footer */}
            <div className="p-3" style={{ background: "rgba(20,20,20,0.9)" }}>
                <p className="text-xs font-medium truncate" style={{ color: "var(--color-text)" }}>
                    {template.name}
                </p>
                <p className="text-[10px] mt-0.5 capitalize tracking-wide" style={{ color: "var(--color-text-muted)" }}>
                    {template.category} · {template.layout}
                </p>
            </div>
        </button>
    );
}
