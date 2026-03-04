"use client";

import ReactMarkdown from "react-markdown";

interface ResumePreviewProps {
    content: string;
}

export default function ResumePreview({ content }: ResumePreviewProps) {
    return (
        <div className="prose prose-sm sm:prose-base max-w-none text-gray-900">
            <ReactMarkdown
                components={{
                    h1: ({ ...props }) => (
                        <h1 className="text-2xl font-bold border-b-2 border-gray-800 pb-2 mb-4 mt-0 text-center uppercase tracking-wide" {...props} />
                    ),
                    h2: ({ ...props }) => (
                        <h2 className="text-lg font-bold border-b border-gray-300 pb-1 mb-3 mt-6 uppercase text-gray-800 tracking-wider" {...props} />
                    ),
                    h3: ({ ...props }) => (
                        <h3 className="text-base font-bold text-gray-900 mt-4 mb-1" {...props} />
                    ),
                    p: ({ ...props }) => (
                        <p className="my-2 leading-snug" {...props} />
                    ),
                    ul: ({ ...props }) => (
                        <ul className="list-disc pl-5 my-2 space-y-1 marker:text-gray-500" {...props} />
                    ),
                    li: ({ ...props }) => (
                        <li className="leading-snug" {...props} />
                    ),
                    strong: ({ ...props }) => (
                        <strong className="font-semibold text-gray-900" {...props} />
                    ),
                    em: ({ ...props }) => (
                        <em className="text-gray-600 font-normal italic" {...props} />
                    ),
                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
}
