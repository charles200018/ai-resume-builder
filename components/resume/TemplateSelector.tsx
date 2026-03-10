"use client";

const templates = [
    { id: "modern", name: "Modern" },
    { id: "classic", name: "Classic" },
    { id: "executive", name: "Executive" },
    { id: "minimal", name: "Minimal" },
    { id: "creative", name: "Creative" },
    { id: "tech", name: "Tech" },
    { id: "elegant", name: "Elegant" },
    { id: "bold", name: "Bold" },
    { id: "professional", name: "Professional" },
    { id: "academic", name: "Academic" },
];

export default function TemplateSelector({
    currentTemplate,
    onSelect
}: {
    currentTemplate: string,
    onSelect: (id: string) => void
}) {
    return (
        <div className="fixed left-4 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3 print:hidden">
            <div className="p-2 flex flex-col gap-0.5 max-h-[80vh] overflow-y-auto"
                style={{ background: "rgba(10,10,10,0.95)", backdropFilter: "blur(20px)", border: "1px solid rgba(201, 169, 110, 0.08)", borderRadius: "2px" }}>
                <div className="px-3 py-2.5 text-[9px] uppercase tracking-[0.2em] font-medium mb-1"
                    style={{ color: "var(--color-primary)", borderBottom: "1px solid rgba(201, 169, 110, 0.06)" }}>
                    Templates
                </div>
                {templates.map((tpl) => (
                    <button
                        key={tpl.id}
                        onClick={() => onSelect(tpl.id)}
                        className="px-3 py-2 flex items-center gap-2 transition-all duration-300"
                        style={{
                            background: currentTemplate === tpl.id ? "rgba(201, 169, 110, 0.1)" : "transparent",
                            color: currentTemplate === tpl.id ? "#c9a96e" : "rgba(138, 133, 120, 0.5)",
                            borderLeft: currentTemplate === tpl.id ? "1px solid #c9a96e" : "1px solid transparent",
                            borderRadius: "0",
                        }}
                        title={tpl.name}
                    >
                        <span className="text-[11px] tracking-[0.05em]">{tpl.name}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}
