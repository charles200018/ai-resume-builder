import Link from "next/link";
import { Download, Eye, Plus, Calendar, ArrowRight, Shield } from "lucide-react";
import { getAllResumes } from "@/actions/getResumes";
import { getUser } from "@/lib/supabase/serverClient";
import { redirect } from "next/navigation";
import PageShell from "@/components/layout/PageShell";
import { calculateATSScore } from "@/lib/ats/scoring";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
    const user = await getUser();
    
    if (!user) {
        redirect("/");
    }

    const { resumes, error } = await getAllResumes();
    const userResumes = resumes;

    return (
        <PageShell>
        <main className="min-h-screen" style={{ background: "#0a0a0a" }}>
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] opacity-[0.03]"
                    style={{ background: "radial-gradient(ellipse, #c9a96e, transparent 70%)" }} />
            </div>

            <div className="relative z-10 max-w-6xl mx-auto px-8 pt-20 pb-8">
                {/* Header */}
                <header className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-14 pt-8">
                    <div>
                        <p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: "var(--color-primary)" }}>Collection</p>
                        <h1 className="font-display text-4xl md:text-5xl" style={{ fontFamily: "var(--font-display)", color: "var(--color-text)" }}>
                            My Resumes
                        </h1>
                        <p className="text-sm mt-3" style={{ color: "var(--color-text-muted)" }}>
                            {userResumes.length} resume{userResumes.length !== 1 ? "s" : ""} in your collection
                        </p>
                    </div>
                    <Link href="/builder">
                        <button className="btn-primary">
                            <Plus size={14} />
                            New Resume
                        </button>
                    </Link>
                </header>

                <div className="luxury-divider mb-12" />

                {error && (
                    <div className="mb-8 p-5" style={{ background: "rgba(196, 94, 94, 0.08)", border: "1px solid rgba(196, 94, 94, 0.2)", color: "#c45e5e", borderRadius: "2px" }}>
                        {error}
                    </div>
                )}

                {userResumes.length === 0 ? (
                    <div className="text-center py-24">
                        <div className="gold-line mx-auto mb-10" />
                        <h2 className="font-display text-2xl mb-4" style={{ fontFamily: "var(--font-display)", color: "var(--color-text)" }}>
                            Your collection awaits
                        </h2>
                        <p className="text-sm mb-10 max-w-sm mx-auto" style={{ color: "var(--color-text-muted)" }}>
                            Begin crafting your first AI-powered resume. Choose from 10 refined templates.
                        </p>
                        <Link href="/builder">
                            <button className="btn-primary" style={{ padding: "16px 48px" }}>
                                Create First Resume
                                <ArrowRight size={14} />
                            </button>
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background: "rgba(201, 169, 110, 0.06)" }}>
                        {userResumes.map((resume) => {
                            const atsScore = calculateATSScore(resume.form_data, resume.generated_text);
                            const scoreColor = atsScore.overall >= 80 ? "#7ab87a" : atsScore.overall >= 60 ? "#c9a96e" : atsScore.overall >= 40 ? "#b89a5a" : "#c45e5e";
                            const template = resume.form_data?.template || "modern";

                            return (
                                <div key={resume.id} className="group p-8 transition-all duration-500 hover:bg-[#111]" style={{ background: "#0a0a0a" }}>
                                    {/* Top row: ATS score */}
                                    <div className="flex items-start justify-between mb-6">
                                        <div>
                                            <span className="text-xs tracking-[0.2em] uppercase" style={{ color: "var(--color-text-muted)" }}>
                                                ATS Score
                                            </span>
                                            <div className="text-3xl font-light mt-1" style={{ color: scoreColor }}>
                                                {atsScore.overall}
                                            </div>
                                        </div>
                                        <div className="relative w-12 h-12 mt-1">
                                            <svg className="w-12 h-12 -rotate-90" viewBox="0 0 48 48">
                                                <circle cx="24" cy="24" r="20" fill="none" stroke="rgba(201,169,110,0.08)" strokeWidth="1.5" />
                                                <circle cx="24" cy="24" r="20" fill="none" stroke={scoreColor} strokeWidth="1.5" strokeLinecap="round"
                                                    strokeDasharray={`${125.7 * atsScore.overall / 100} 125.7`}
                                                    style={{ transition: "stroke-dasharray 1s ease" }} />
                                            </svg>
                                        </div>
                                    </div>

                                    {/* Name + Job */}
                                    <h3 className="font-display text-lg mb-1" style={{ fontFamily: "var(--font-display)", color: "var(--color-text)" }}>
                                        {resume.full_name}
                                    </h3>
                                    <p className="text-sm truncate mb-4" style={{ color: "var(--color-text-muted)" }}>
                                        {resume.job_title || "Professional Resume"}
                                    </p>

                                    {/* Meta */}
                                    <div className="flex items-center gap-4 text-xs mb-8" style={{ color: "rgba(138, 133, 120, 0.6)" }}>
                                        <span className="flex items-center gap-1.5">
                                            <Calendar size={10} />
                                            {new Date(resume.created_at).toLocaleDateString()}
                                        </span>
                                        <span className="capitalize tracking-wide">{template}</span>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex items-center gap-3">
                                        <Link href={`/resume/${resume.id}`} className="flex-1">
                                            <button className="w-full btn-ghost text-xs py-2.5 flex items-center justify-center gap-2">
                                                <Eye size={13} />
                                                View
                                            </button>
                                        </Link>
                                        <Link href={`/resume/${resume.id}`} className="flex-1">
                                            <button className="w-full btn-primary text-xs py-2.5 flex items-center justify-center gap-2">
                                                <Download size={13} />
                                                Export
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* Stats */}
                {userResumes.length > 0 && (
                    <>
                        <div className="luxury-divider mt-16 mb-12" />
                        <div className="grid grid-cols-3 gap-12 text-center pb-8">
                            <div>
                                <div className="text-2xl font-light" style={{ color: "var(--color-text)" }}>{userResumes.length}</div>
                                <div className="text-xs tracking-[0.15em] uppercase mt-2" style={{ color: "var(--color-text-muted)" }}>Total</div>
                            </div>
                            <div>
                                <div className="text-2xl font-light" style={{ color: "var(--color-primary)" }}>
                                    {Math.round(userResumes.reduce((sum, r) => sum + calculateATSScore(r.form_data, r.generated_text).overall, 0) / userResumes.length)}
                                </div>
                                <div className="text-xs tracking-[0.15em] uppercase mt-2" style={{ color: "var(--color-text-muted)" }}>Avg. ATS</div>
                            </div>
                            <div>
                                <div className="text-2xl font-light flex items-center justify-center gap-2" style={{ color: "var(--color-text)" }}>
                                    <Shield size={16} style={{ color: "var(--color-primary)" }} /> Secure
                                </div>
                                <div className="text-xs tracking-[0.15em] uppercase mt-2" style={{ color: "var(--color-text-muted)" }}>Protected</div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </main>
        </PageShell>
    );
}
