"use client";

import { useRef } from "react";
import ResumeTemplate from "@/components/resume/ResumeTemplate";
import DownloadButtonClient from "./DownloadButtonClient";

export default function ResumeTemplateWrapper({ content, fileName }: { content: string, fileName: string }) {
    const componentRef = useRef<HTMLDivElement>(null);

    return (
        <div className="w-full flex flex-col items-center">
            <DownloadButtonClient contentRef={componentRef} fileName={fileName} />
            <ResumeTemplate ref={componentRef} content={content} />
        </div>
    );
}
