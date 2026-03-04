"use client";

import { forwardRef } from "react";
import ResumePreview from "./ResumePreview";

interface ResumeTemplateProps {
    content: string;
}

const ResumeTemplate = forwardRef<HTMLDivElement, ResumeTemplateProps>(
    ({ content }, ref) => {
        return (
            <div
                className="w-full bg-gray-100 flex justify-center py-8 print:py-0 print:bg-white overflow-auto"
                style={{ minHeight: "calc(100vh - 80px)" }} // Minus header height
            >
                {/* The "Paper" container */}
                <div
                    ref={ref}
                    className="bg-white text-black shadow-2xl print:shadow-none w-[8.5in] min-h-[11in] px-[0.75in] py-[0.75in] print:w-auto print:min-h-0 print:p-0 print:m-0"
                    style={{
                        fontFamily: "'Inter', sans-serif", // Clean ATS-friendly font
                    }}
                >
                    <ResumePreview content={content} />
                </div>
            </div>
        );
    }
);

ResumeTemplate.displayName = "ResumeTemplate";

export default ResumeTemplate;
