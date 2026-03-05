// app/resume/[id]/page.tsx
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

import { getResumeById } from "@/actions/getResume";
import ResumeTemplateWrapper from "./ResumeTemplateWrapper";

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
        <main className="min-h-screen bg-slate-900 pb-12 pt-8">
            <div className="fixed inset-0 pointer-events-none overflow-hidden no-print z-0">
                <div className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full opacity-10 blur-[100px] bg-indigo-500" />
                <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] rounded-full opacity-10 blur-[100px] bg-purple-500" />
            </div>

            <div className="relative z-10 w-full flex flex-col items-center print:block print:bg-white print:m-0 print:p-0">
                <ResumeTemplateWrapper resume={resume} fileName={fileName} />
            </div>
        </main>
    );
}
