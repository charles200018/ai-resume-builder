"use client";

import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { Download, Share2, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface DownloadButtonProps {
    contentRef: React.RefObject<HTMLDivElement | null>;
    fileName: string;
}

export default function DownloadButton({
    contentRef,
    fileName,
}: DownloadButtonProps) {
    const handlePrint = useReactToPrint({
        contentRef: contentRef,
        documentTitle: fileName,
        onAfterPrint: () => console.log("Print/Save successful"),
    });

    const handleShare = async () => {
        try {
            if (navigator.share) {
                await navigator.share({
                    title: "My AI Resume",
                    text: "Check out my new AI-generated resume from ResumeAI!",
                    url: window.location.href,
                });
            } else {
                await navigator.clipboard.writeText(window.location.href);
                alert("Link copied to clipboard!");
            }
        } catch (err) {
            console.log("Error sharing:", err);
        }
    };

    return (
        <div className="flex flex-col sm:flex-row items-center justify-between w-full max-w-5xl mx-auto mb-6 px-4">
            <Link href="/builder">
                <button className="btn-ghost !text-white !border-white/20 hover:!bg-white/10 no-print">
                    <ArrowLeft size={16} />
                    Back to Editor
                </button>
            </Link>

            <div className="flex gap-3 mt-4 sm:mt-0 no-print">
                <button onClick={handleShare} className="btn-ghost !text-white !border-white/20 hover:!bg-white/10">
                    <Share2 size={16} />
                    Share Link
                </button>
                <button onClick={() => handlePrint()} className="btn-primary">
                    <Download size={18} />
                    Download PDF
                </button>
            </div>
        </div>
    );
}
