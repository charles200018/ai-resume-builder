"use client";

import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";

interface FormNavigationProps {
    currentStep: number;
    totalSteps: number;
    onNext: () => void;
    onPrev: () => void;
    onSubmit: () => void;
    isGenerating: boolean;
}

export default function FormNavigation({
    currentStep,
    totalSteps,
    onNext,
    onPrev,
    onSubmit,
    isGenerating,
}: FormNavigationProps) {
    const isLastStep = currentStep === totalSteps - 1;
    const isFirstStep = currentStep === 0;

    return (
        <div className="flex items-center justify-between mt-10 pt-8" style={{ borderTop: "1px solid rgba(201, 169, 110, 0.06)" }}>
            <button
                type="button"
                onClick={onPrev}
                disabled={isFirstStep}
                className="btn-ghost"
            >
                <ArrowLeft size={14} />
                Previous
            </button>

            {isLastStep ? (
                <button
                    type="button"
                    onClick={onSubmit}
                    disabled={isGenerating}
                    className="btn-primary"
                    style={{ padding: "14px 36px" }}
                >
                    {isGenerating ? (
                        <>
                            <span className="spinner" />
                            Generating…
                        </>
                    ) : (
                        <>
                            Generate Resume
                            <Sparkles size={14} />
                        </>
                    )}
                </button>
            ) : (
                <button
                    type="button"
                    onClick={onNext}
                    className="btn-primary"
                >
                    Continue
                    <ArrowRight size={14} />
                </button>
            )}
        </div>
    );
}
