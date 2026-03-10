"use client";

import { forwardRef } from "react";
import { Phone, Mail, Linkedin, MapPin, Globe } from "lucide-react";
import type { Resume } from "@/types/resume";
import ResumePreview from "./ResumePreview";

interface ResumeTemplateProps {
    resume: Resume;
    templateId?: string;
}

// Shared contact row helper
function ContactRow({ form_data, style }: { form_data: Resume["form_data"]; style: React.CSSProperties }) {
    return (
        <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-[10pt]" style={style}>
            <span className="flex items-center gap-1.5"><Phone size={13} /> {form_data.phone}</span>
            <span className="flex items-center gap-1.5"><Mail size={13} /> {form_data.email}</span>
            <span className="flex items-center gap-1.5"><MapPin size={13} /> {form_data.location}</span>
            {form_data.linkedinUrl && (
                <span className="flex items-center gap-1.5"><Linkedin size={13} /> LinkedIn</span>
            )}
            {form_data.portfolioUrl && (
                <span className="flex items-center gap-1.5"><Globe size={13} /> Portfolio</span>
            )}
        </div>
    );
}

// Page wrapper used by all templates
function PageShell({ children, ref: innerRef }: { children: React.ReactNode; ref: React.Ref<HTMLDivElement> }) {
    return (
        <div className="w-full bg-gray-100 flex justify-center py-8 print:py-0 print:bg-white overflow-auto" style={{ minHeight: "calc(100vh - 80px)" }}>
            <div ref={innerRef} className="bg-white text-black shadow-2xl print:shadow-none w-[8.5in] min-h-[11in] print:w-auto print:min-h-0 print:p-0 print:m-0 overflow-hidden">
                {children}
            </div>
        </div>
    );
}

const ResumeTemplate = forwardRef<HTMLDivElement, ResumeTemplateProps>(
    ({ resume, templateId = "modern" }, ref) => {
        const { form_data } = resume;

        // ───── 1. MODERN (Centered, clean, Inter) ─────
        if (templateId === "modern") {
            return (
                <PageShell ref={ref}>
                    <div className="px-[0.75in] py-[0.5in]" style={{ fontFamily: "'Inter', sans-serif" }}>
                        <div className="flex flex-col items-center mb-6 text-center">
                            <h1 className="text-[28pt] font-bold uppercase tracking-tight text-gray-900">{resume.full_name}</h1>
                            <p className="text-[13pt] text-gray-600 font-medium mt-1">{resume.job_title}</p>
                            <div className="mt-3">
                                <ContactRow form_data={form_data} style={{ color: "#555", justifyContent: "center" }} />
                            </div>
                            <div className="w-full h-[2px] bg-gray-800 mt-5" />
                        </div>
                        <ResumePreview content={resume.generated_text} />
                    </div>
                </PageShell>
            );
        }

        // ───── 2. CLASSIC (Serif, left-aligned, traditional) ─────
        if (templateId === "classic") {
            return (
                <PageShell ref={ref}>
                    <div className="px-[0.75in] py-[0.5in]" style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}>
                        <div className="mb-6">
                            <h1 className="text-[26pt] font-bold text-gray-900 border-b-2 border-gray-900 pb-1">{resume.full_name}</h1>
                            <p className="text-[13pt] text-gray-700 italic mt-1">{resume.job_title}</p>
                            <div className="mt-2">
                                <ContactRow form_data={form_data} style={{ color: "#666" }} />
                            </div>
                        </div>
                        <ResumePreview content={resume.generated_text} />
                    </div>
                </PageShell>
            );
        }

        // ───── 3. EXECUTIVE (Navy header banner, gold accent) ─────
        if (templateId === "executive") {
            return (
                <PageShell ref={ref}>
                    <div style={{ fontFamily: "'Georgia', serif" }}>
                        {/* Navy banner */}
                        <div className="px-[0.75in] py-8" style={{ backgroundColor: "#1e293b", color: "white" }}>
                            <h1 className="text-[28pt] font-bold tracking-wide">{resume.full_name}</h1>
                            <p className="text-[13pt] mt-1" style={{ color: "#d4a843" }}>{resume.job_title}</p>
                            <div className="mt-3">
                                <ContactRow form_data={form_data} style={{ color: "#94a3b8" }} />
                            </div>
                        </div>
                        <div className="h-1" style={{ backgroundColor: "#d4a843" }} />
                        <div className="px-[0.75in] py-6">
                            <ResumePreview content={resume.generated_text} />
                        </div>
                    </div>
                </PageShell>
            );
        }

        // ───── 4. MINIMAL (Ultra-clean, lots of whitespace) ─────
        if (templateId === "minimal") {
            return (
                <PageShell ref={ref}>
                    <div className="px-[1in] py-[0.75in]" style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif" }}>
                        <div className="mb-8">
                            <h1 className="text-[24pt] font-light tracking-[0.15em] uppercase text-gray-900">{resume.full_name}</h1>
                            <p className="text-[11pt] text-gray-500 tracking-widest uppercase mt-1">{resume.job_title}</p>
                            <div className="mt-3">
                                <ContactRow form_data={form_data} style={{ color: "#999" }} />
                            </div>
                            <div className="w-12 h-[1px] bg-gray-400 mt-5" />
                        </div>
                        <ResumePreview content={resume.generated_text} />
                    </div>
                </PageShell>
            );
        }

        // ───── 5. CREATIVE (Left color sidebar) ─────
        if (templateId === "creative") {
            return (
                <PageShell ref={ref}>
                    <div className="grid grid-cols-[2.2in_1fr] min-h-[11in]" style={{ fontFamily: "'Inter', sans-serif" }}>
                        {/* Sidebar */}
                        <div className="px-5 py-8" style={{ backgroundColor: "#312e81", color: "white" }}>
                            <div className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl font-bold" style={{ backgroundColor: "rgba(255,255,255,0.15)" }}>
                                {resume.full_name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                            </div>
                            <h2 className="text-center text-lg font-bold mb-1">{resume.full_name}</h2>
                            <p className="text-center text-xs mb-6" style={{ color: "#a5b4fc" }}>{resume.job_title}</p>
                            <div className="space-y-3 text-xs" style={{ color: "#c7d2fe" }}>
                                <div className="flex items-center gap-2"><Phone size={12} /> {form_data.phone}</div>
                                <div className="flex items-center gap-2"><Mail size={12} /> {form_data.email}</div>
                                <div className="flex items-center gap-2"><MapPin size={12} /> {form_data.location}</div>
                                {form_data.linkedinUrl && <div className="flex items-center gap-2"><Linkedin size={12} /> LinkedIn</div>}
                            </div>
                            {/* Skills section in sidebar */}
                            {form_data.technicalSkills?.length > 0 && (
                                <div className="mt-8">
                                    <h3 className="text-xs uppercase tracking-widest font-bold mb-3" style={{ color: "#a5b4fc" }}>Skills</h3>
                                    <div className="flex flex-wrap gap-1.5">
                                        {form_data.technicalSkills.map((skill, i) => (
                                            <span key={i} className="px-2 py-1 text-[9pt] rounded" style={{ backgroundColor: "rgba(255,255,255,0.12)" }}>{skill}</span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                        {/* Main content */}
                        <div className="px-8 py-8">
                            <ResumePreview content={resume.generated_text} />
                        </div>
                    </div>
                </PageShell>
            );
        }

        // ───── 6. TECH (Dark header, monospace accents) ─────
        if (templateId === "tech") {
            return (
                <PageShell ref={ref}>
                    <div style={{ fontFamily: "'Inter', sans-serif" }}>
                        <div className="px-[0.75in] py-6" style={{ backgroundColor: "#0f172a", color: "white" }}>
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 rounded-xl flex items-center justify-center text-xl font-bold" style={{ backgroundColor: "#3b82f6" }}>
                                    {resume.full_name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                                </div>
                                <div>
                                    <h1 className="text-[22pt] font-bold">{resume.full_name}</h1>
                                    <p className="text-sm" style={{ color: "#60a5fa", fontFamily: "'Courier New', monospace" }}>&gt; {resume.job_title}</p>
                                </div>
                            </div>
                            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs" style={{ color: "#94a3b8" }}>
                                <span>{form_data.phone}</span>
                                <span>|</span>
                                <span>{form_data.email}</span>
                                <span>|</span>
                                <span>{form_data.location}</span>
                                {form_data.linkedinUrl && <><span>|</span><span>LinkedIn</span></>}
                            </div>
                        </div>
                        <div className="h-1" style={{ background: "linear-gradient(90deg, #3b82f6, #8b5cf6, #ec4899)" }} />
                        <div className="px-[0.75in] py-6">
                            <ResumePreview content={resume.generated_text} />
                        </div>
                    </div>
                </PageShell>
            );
        }

        // ───── 7. ELEGANT (Thin border frame, centered heading) ─────
        if (templateId === "elegant") {
            return (
                <PageShell ref={ref}>
                    <div className="m-6 border border-gray-300 min-h-[calc(11in-48px)]" style={{ fontFamily: "'Georgia', serif" }}>
                        <div className="px-[0.75in] py-8 text-center border-b border-gray-300">
                            <h1 className="text-[26pt] font-normal tracking-[0.2em] uppercase text-gray-800">{resume.full_name}</h1>
                            <p className="text-[12pt] text-gray-500 italic mt-2">{resume.job_title}</p>
                            <div className="mt-3 flex justify-center">
                                <ContactRow form_data={form_data} style={{ color: "#888", justifyContent: "center" }} />
                            </div>
                        </div>
                        <div className="px-[0.75in] py-6">
                            <ResumePreview content={resume.generated_text} />
                        </div>
                    </div>
                </PageShell>
            );
        }

        // ───── 8. BOLD (Large name, colored section headers) ─────
        if (templateId === "bold") {
            return (
                <PageShell ref={ref}>
                    <div className="px-[0.75in] py-[0.5in]" style={{ fontFamily: "'Inter', sans-serif" }}>
                        <div className="mb-6">
                            <h1 className="text-[36pt] font-black text-gray-900 leading-none">{resume.full_name}</h1>
                            <p className="text-[14pt] font-semibold mt-2" style={{ color: "#2563eb" }}>{resume.job_title}</p>
                            <div className="mt-3">
                                <ContactRow form_data={form_data} style={{ color: "#666" }} />
                            </div>
                            <div className="w-full h-1 mt-5" style={{ backgroundColor: "#2563eb" }} />
                        </div>
                        <ResumePreview content={resume.generated_text} accentColor="#2563eb" />
                    </div>
                </PageShell>
            );
        }

        // ───── 9. PROFESSIONAL (Two-tone header, right-aligned contact) ─────
        if (templateId === "professional") {
            return (
                <PageShell ref={ref}>
                    <div style={{ fontFamily: "'Inter', sans-serif" }}>
                        <div className="px-[0.75in] py-6 flex justify-between items-end" style={{ backgroundColor: "#f8fafc", borderBottom: "3px solid #1e40af" }}>
                            <div>
                                <h1 className="text-[26pt] font-bold text-gray-900">{resume.full_name}</h1>
                                <p className="text-[12pt] font-medium" style={{ color: "#1e40af" }}>{resume.job_title}</p>
                            </div>
                            <div className="text-right text-[9pt] text-gray-600 space-y-1">
                                <div>{form_data.phone}</div>
                                <div>{form_data.email}</div>
                                <div>{form_data.location}</div>
                            </div>
                        </div>
                        <div className="px-[0.75in] py-6">
                            <ResumePreview content={resume.generated_text} />
                        </div>
                    </div>
                </PageShell>
            );
        }

        // ───── 10. ACADEMIC (Formal, serif, dense) ─────
        if (templateId === "academic") {
            return (
                <PageShell ref={ref}>
                    <div className="px-[0.65in] py-[0.5in]" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
                        <div className="text-center mb-4">
                            <h1 className="text-[22pt] font-bold text-gray-900">{resume.full_name}</h1>
                            <p className="text-[11pt] text-gray-700 mt-1">{resume.job_title}</p>
                            <div className="mt-2 text-[9pt] text-gray-600">
                                {form_data.phone} &bull; {form_data.email} &bull; {form_data.location}
                                {form_data.linkedinUrl && <> &bull; LinkedIn</>}
                            </div>
                            <div className="w-full border-b-2 border-gray-900 mt-3" />
                            <div className="w-full border-b border-gray-900 mt-[2px]" />
                        </div>
                        <ResumePreview content={resume.generated_text} />
                    </div>
                </PageShell>
            );
        }

        // ───── FALLBACK → modern ─────
        return (
            <PageShell ref={ref}>
                <div className="px-[0.75in] py-[0.5in]" style={{ fontFamily: "'Inter', sans-serif" }}>
                    <div className="flex flex-col items-center mb-6 text-center">
                        <h1 className="text-[28pt] font-bold uppercase tracking-tight text-gray-900">{resume.full_name}</h1>
                        <p className="text-[13pt] text-gray-600 font-medium mt-1">{resume.job_title}</p>
                        <div className="mt-3">
                            <ContactRow form_data={form_data} style={{ color: "#555", justifyContent: "center" }} />
                        </div>
                        <div className="w-full h-[2px] bg-gray-800 mt-5" />
                    </div>
                    <ResumePreview content={resume.generated_text} />
                </div>
            </PageShell>
        );
    }
);

ResumeTemplate.displayName = "ResumeTemplate";

export default ResumeTemplate;
