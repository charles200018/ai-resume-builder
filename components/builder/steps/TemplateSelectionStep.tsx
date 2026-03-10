"use client";

import { useState, useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { templates, getTemplatesByCategory, type ResumeTemplate, type TemplateCategory } from "@/lib/templates/templateData";
import MiniResumePreview from "@/components/templates/MiniResumePreview";

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
                border: isSelected ? "2px solid var(--color-primary)" : "1px solid rgba(201,169,110,0.08)",
                borderRadius: "2px",
            }}
        >
            {/* Real Example Resume Preview */}
            <MiniResumePreview template={template} />

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
