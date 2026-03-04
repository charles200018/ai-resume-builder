"use client";

import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { Download, Share2, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface DownloadButtonClientProps {
    contentRef: React.RefObject<HTMLDivElement | null>;
    fileName: string;
}

export default function DownloadButtonClient({
    contentRef,
    fileName,
}: DownloadButtonClientProps) {
    const handlePrint = useReactToPrint({
        contentRef: contentRef,
        documentTitle: fileName,
    });

    const handleDownload = async () => {
        const { toPng } = await import("html-to-image");
        const { jsPDF } = await import("jspdf");

        const element = contentRef.current;
        if (!element) return;

        try {
            // Convert HTML to high-quality PNG first
            const dataUrl = await toPng(element, {
                quality: 1,
                pixelRatio: 2,
                backgroundColor: "#ffffff", // Ensure white background for resume
            });

            const pdf = new jsPDF({
                orientation: "portrait",
                unit: "in",
                format: "letter",
            });

            // Calculate dimensions to fit US Letter
            const imgProps = pdf.getImageProperties(dataUrl);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

            pdf.addImage(dataUrl, "PNG", 0, 0, pdfWidth, pdfHeight);
            pdf.save(`${fileName}.pdf`);
        } catch (err) {
            console.error("PDF generation failed:", err);
            alert("Download failed. Please try the 'Print' button as a fallback.");
        }
    };

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
        <div className="flex flex-col sm:flex-row items-center justify-between w-full max-w-5xl mx-auto mb-6 px-4 no-print text-white">
            <Link href="/builder">
                <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-sm font-medium">
                    <ArrowLeft size={16} />
                    Back to Editor
                </button>
            </Link>

            <div className="flex items-center gap-3 mt-4 sm:mt-0">
                <button
                    onClick={handleShare}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-sm font-medium"
                >
                    <Share2 size={16} />
                    Share
                </button>
                <button
                    onClick={() => handlePrint()}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-sm font-medium"
                >
                    <Download size={16} className="rotate-180" />
                    Print
                </button>
                <button
                    onClick={handleDownload}
                    className="flex items-center gap-2 px-6 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white transition-colors text-sm font-semibold shadow-lg shadow-indigo-500/30"
                >
                    <Download size={18} />
                    Download PDF
                </button>
            </div>
        </div>
    );
}
