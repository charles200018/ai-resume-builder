"use client";

import { useRef, useState, useMemo } from "react";
import ResumeTemplate from "@/components/resume/ResumeTemplate";
import DownloadButtonClient from "./DownloadButtonClient";
import TemplateSelector from "@/components/resume/TemplateSelector";
import { calculateATSScore } from "@/lib/ats/scoring";

import type { Resume } from "@/types/resume";

export default function ResumeTemplateWrapper({ resume, fileName }: { resume: Resume, fileName: string }) {
    const componentRef = useRef<HTMLDivElement>(null);
    const savedTemplate = resume.form_data?.template || "modern";
    const [templateId, setTemplateId] = useState(savedTemplate);
    const [showATS, setShowATS] = useState(false);

    // Compute ATS score from actual resume data
    const atsScore = useMemo(() => {
        return calculateATSScore(resume.form_data, resume.generated_text);
    }, [resume.form_data, resume.generated_text]);

    const scoreColor = atsScore.overall >= 80 ? "#7ab87a" : atsScore.overall >= 60 ? "#c9a96e" : atsScore.overall >= 40 ? "#b89a5a" : "#c45e5e";
    const scoreLabel = atsScore.overall >= 80 ? "Excellent" : atsScore.overall >= 60 ? "Good" : atsScore.overall >= 40 ? "Fair" : "Needs Work";

    return (
        <div className="w-full flex flex-col items-center">
            <TemplateSelector currentTemplate={templateId} onSelect={setTemplateId} />
            
            {/* ATS Score Toggle - Fixed right side */}
            <div className="fixed right-4 top-1/2 -translate-y-1/2 z-50 print:hidden">
                <div className="overflow-hidden" style={{
                    width: showATS ? "300px" : "auto",
                    background: "rgba(10,10,10,0.95)",
                    backdropFilter: "blur(20px)",
                    border: "1px solid rgba(201, 169, 110, 0.08)",
                    borderRadius: "2px",
                }}>
                    {/* Score Button */}
                    <button
                        onClick={() => setShowATS(!showATS)}
                        className="w-full p-4 flex items-center gap-3 transition-colors"
                        style={{ borderBottom: showATS ? "1px solid rgba(201, 169, 110, 0.06)" : "none" }}
                    >
                        <div className="relative w-12 h-12 flex-shrink-0">
                            <svg className="w-12 h-12 -rotate-90" viewBox="0 0 48 48">
                                <circle cx="24" cy="24" r="20" fill="none" stroke="rgba(201,169,110,0.08)" strokeWidth="1.5" />
                                <circle cx="24" cy="24" r="20" fill="none" stroke={scoreColor} strokeWidth="1.5" strokeLinecap="round"
                                    strokeDasharray={`${125.6 * atsScore.overall / 100} 125.6`} />
                            </svg>
                            <span className="absolute inset-0 flex items-center justify-center text-sm font-light" style={{ color: scoreColor }}>{atsScore.overall}</span>
                        </div>
                        <div className="text-left">
                            <div className="text-[9px] tracking-[0.2em] uppercase" style={{ color: "var(--color-text-muted)" }}>ATS Score</div>
                            <div className="text-xs font-medium mt-0.5" style={{ color: scoreColor }}>{scoreLabel}</div>
                        </div>
                    </button>

                    {/* Expanded Panel */}
                    {showATS && (
                        <div className="p-4 space-y-5 max-h-[60vh] overflow-y-auto">
                            {/* Breakdown */}
                            <div className="space-y-3">
                                <h4 className="text-[9px] uppercase tracking-[0.2em] font-medium" style={{ color: "var(--color-primary)" }}>Breakdown</h4>
                                {Object.entries(atsScore.breakdown).map(([key, value]) => {
                                    const barColor = value >= 80 ? "#7ab87a" : value >= 60 ? "#c9a96e" : value >= 40 ? "#b89a5a" : "#c45e5e";
                                    return (
                                        <div key={key}>
                                            <div className="flex justify-between text-xs mb-1.5">
                                                <span className="capitalize tracking-wide" style={{ color: "var(--color-text-muted)" }}>{key}</span>
                                                <span className="font-light" style={{ color: barColor }}>{value}</span>
                                            </div>
                                            <div className="h-px overflow-hidden" style={{ background: "rgba(201,169,110,0.08)" }}>
                                                <div className="h-full transition-all duration-700" style={{ width: `${value}%`, backgroundColor: barColor }} />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Suggestions */}
                            {atsScore.suggestions.length > 0 && (
                                <div className="space-y-2">
                                    <h4 className="text-[9px] uppercase tracking-[0.2em] font-medium" style={{ color: "var(--color-primary)" }}>Suggestions</h4>
                                    {atsScore.suggestions.slice(0, 5).map((s, i) => {
                                        return (
                                            <div key={i} className="p-3" style={{ background: "rgba(201,169,110,0.03)", border: "1px solid rgba(201,169,110,0.06)", borderRadius: "2px" }}>
                                                <div className="flex items-center gap-2 mb-1.5">
                                                    <span className="text-[9px] tracking-[0.1em] uppercase" style={{ color: s.impact === "critical" ? "#c45e5e" : "var(--color-primary)" }}>
                                                        {s.impact}
                                                    </span>
                                                </div>
                                                <p className="text-xs leading-relaxed" style={{ color: "var(--color-text-muted)" }}>{s.issue}</p>
                                                <p className="text-[11px] mt-1.5" style={{ color: "rgba(138,133,120,0.5)" }}>{s.fix}</p>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            <DownloadButtonClient contentRef={componentRef} fileName={fileName} />
            <ResumeTemplate ref={componentRef} resume={resume} templateId={templateId} />
        </div>
    );
}
