"use client";

import { useRef } from "react";
import ResumeTemplate from "@/components/resume/ResumeTemplate";
import DownloadButtonClient from "./DownloadButtonClient";

import type { Resume } from "@/types/resume";

export default function ResumeTemplateWrapper({ resume, fileName }: { resume: Resume, fileName: string }) {
    const componentRef = useRef<HTMLDivElement>(null);

    return (
        <div className="w-full flex flex-col items-center">
            <DownloadButtonClient contentRef={componentRef} fileName={fileName} />
            <ResumeTemplate ref={componentRef} resume={resume} />
        </div>
    );
}
