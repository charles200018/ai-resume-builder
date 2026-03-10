// app/resume/[id]/page.tsx
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

import { getResumeById } from "@/actions/getResume";
import ResumeTemplateWrapper from "./ResumeTemplateWrapper";
import PageShell from "@/components/layout/PageShell";

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function ResumeViewPage({ params }: PageProps) {
    const { id } = await params;
    const { resume, error } = await getResumeById(id);

    if (error || !resume) {
        notFound();
    }

    const fileName = `${resume.full_name.replace(/\s+/g, "_")}_Resume`;

    return (
        <PageShell>
            <main className="min-h-screen pb-12 pt-8 pl-16" style={{ background: "#0a0a0a" }}>
                <div className="fixed inset-0 pointer-events-none overflow-hidden no-print z-0">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] opacity-[0.03]"
                        style={{ background: "radial-gradient(ellipse, #c9a96e, transparent 70%)" }} />
                </div>

                <div className="relative z-10 w-full flex flex-col items-center print:block print:bg-white print:m-0 print:p-0">
                    <ResumeTemplateWrapper resume={resume} fileName={fileName} />
                </div>
            </main>
        </PageShell>
    );
}
