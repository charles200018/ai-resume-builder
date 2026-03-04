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
        <div className="flex items-center justify-between mt-8 pt-6" style={{ borderTop: "1px solid var(--color-border)" }}>
            <button
                type="button"
                onClick={onPrev}
                disabled={isFirstStep}
                className="btn-ghost"
            >
                <ArrowLeft size={16} />
                Previous
            </button>

            {isLastStep ? (
                <button
                    type="button"
                    onClick={onSubmit}
                    disabled={isGenerating}
                    className="btn-primary"
                    style={{ padding: "12px 28px", fontSize: "0.9375rem" }}
                >
                    {isGenerating ? (
                        <>
                            <span className="spinner" />
                            Generating Resume…
                        </>
                    ) : (
                        <>
                            <Sparkles size={18} />
                            Generate My Resume
                        </>
                    )}
                </button>
            ) : (
                <button
                    type="button"
                    onClick={onNext}
                    className="btn-primary"
                >
                    Next Step
                    <ArrowRight size={16} />
                </button>
            )}
        </div>
    );
}
