"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface ResumePreviewProps {
    content: string;
}

export default function ResumePreview({ content }: ResumePreviewProps) {
    return (
        <div className="prose prose-sm sm:prose-base max-w-none text-gray-900">
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                    h1: ({ ...props }) => (
                        <h1 className="text-xl font-bold border-b-2 border-gray-800 pb-1 mb-4 mt-0 uppercase tracking-wide" {...props} />
                    ),
                    h2: ({ ...props }) => (
                        <div className="mt-8 mb-4">
                            <h2 className="text-[14pt] font-bold uppercase text-gray-900 tracking-wider mb-1" {...props} />
                            <div className="w-full h-[1.5px] bg-gray-800" />
                        </div>
                    ),
                    h3: ({ ...props }) => (
                        <h3 className="text-[12pt] font-bold text-gray-900 mt-5 mb-1" {...props} />
                    ),
                    p: ({ ...props }) => (
                        <p className="text-[10.5pt] text-gray-800 leading-snug my-2" {...props} />
                    ),
                    ul: ({ ...props }) => (
                        <ul className="list-disc pl-5 my-2 space-y-1 marker:text-gray-500" {...props} />
                    ),
                    li: ({ ...props }) => (
                        <li className="text-[10.5pt] text-gray-800 leading-snug" {...props} />
                    ),
                    strong: ({ ...props }) => (
                        <strong className="font-bold text-gray-900" {...props} />
                    ),
                    em: ({ ...props }) => (
                        <em className="text-gray-700 font-normal italic" {...props} />
                    ),
                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
}
