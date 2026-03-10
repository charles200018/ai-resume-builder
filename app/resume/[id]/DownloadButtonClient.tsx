"use client";

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
        <div className="flex flex-col sm:flex-row items-center justify-between w-full max-w-5xl mx-auto mb-8 px-4 no-print">
            <Link href="/dashboard">
                <button className="btn-ghost text-xs py-2.5 px-5">
                    <ArrowLeft size={12} />
                    Back
                </button>
            </Link>

            <div className="flex items-center gap-3 mt-4 sm:mt-0">
                <button
                    onClick={handleShare}
                    className="btn-ghost text-xs py-2.5 px-4"
                >
                    <Share2 size={12} />
                    Share
                </button>
                <button
                    onClick={() => handlePrint()}
                    className="btn-ghost text-xs py-2.5 px-4"
                >
                    Print
                </button>
                <button
                    onClick={handleDownload}
                    className="btn-primary text-xs py-2.5 px-6"
                >
                    <Download size={12} />
                    Download PDF
                </button>
            </div>
        </div>
    );
}
