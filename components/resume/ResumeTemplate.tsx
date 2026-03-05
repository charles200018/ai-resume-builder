"use client";

import { forwardRef } from "react";
import { Phone, Mail, Linkedin, MapPin } from "lucide-react";
import type { Resume } from "@/types/resume";
import ResumePreview from "./ResumePreview";

interface ResumeTemplateProps {
    resume: Resume;
}

const ResumeTemplate = forwardRef<HTMLDivElement, ResumeTemplateProps>(
    ({ resume }, ref) => {
        const { form_data } = resume;

        return (
            <div
                className="w-full bg-gray-100 flex justify-center py-8 print:py-0 print:bg-white overflow-auto"
                style={{ minHeight: "calc(100vh - 80px)" }}
            >
                {/* The "Paper" container */}
                <div
                    ref={ref}
                    className="bg-white text-black shadow-2xl print:shadow-none w-[8.5in] min-h-[11in] px-[0.75in] py-[0.5in] print:w-auto print:min-h-0 print:p-0 print:m-0"
                    style={{
                        fontFamily: "'Inter', sans-serif",
                    }}
                >
                    {/* Centered Header */}
                    <div className="flex flex-col items-center mb-6 text-center">
                        <h1 className="text-[32pt] font-bold leading-tight uppercase tracking-tight text-gray-900">
                            {resume.full_name}
                        </h1>
                        <p className="text-[14pt] text-gray-700 font-medium mt-1">
                            {resume.job_title}
                        </p>

                        {/* Contact Info Row */}
                        <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 mt-4 text-[10pt] text-gray-600">
                            <div className="flex items-center gap-1.5">
                                <Phone size={14} className="text-gray-900" />
                                <span>{form_data.phone}</span>
                            </div>
                            {form_data.linkedinUrl && (
                                <div className="flex items-center gap-1.5">
                                    <Linkedin size={14} className="text-gray-900" />
                                    <a href={form_data.linkedinUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">
                                        Linkedin
                                    </a>
                                </div>
                            )}
                            <div className="flex items-center gap-1.5">
                                <Mail size={14} className="text-gray-900" />
                                <span>{form_data.email}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <MapPin size={14} className="text-gray-900" />
                                <span>{form_data.location}</span>
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="w-full h-[1.5px] bg-gray-800 mt-6" />
                    </div>

                    <ResumePreview content={resume.generated_text} />
                </div>
            </div>
        );
    }
);

ResumeTemplate.displayName = "ResumeTemplate";

export default ResumeTemplate;
