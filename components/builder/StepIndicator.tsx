"use client";

import { CheckCircle } from "lucide-react";

interface Step {
    id: number;
    label: string;
}

interface StepIndicatorProps {
    steps: Step[];
    currentStep: number;
}

export default function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
    return (
        <div className="flex items-center justify-between gap-2">
            {steps.map((step, index) => {
                const isCompleted = index < currentStep;
                const isActive = index === currentStep;

                return (
                    <div key={step.id} className="flex items-center gap-2 flex-1">
                        <div className="flex flex-col items-center flex-1">
                            {/* Circle */}
                            <div
                                className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300"
                                style={{
                                    background: isCompleted
                                        ? "var(--color-success)"
                                        : isActive
                                            ? "linear-gradient(135deg, #6366f1, #a855f7)"
                                            : "rgba(255,255,255,0.06)",
                                    color: isCompleted || isActive ? "white" : "var(--color-text-muted)",
                                    border: isActive ? "none" : isCompleted ? "none" : "1px solid var(--color-border)",
                                    boxShadow: isActive ? "0 0 20px rgba(99,102,241,0.4)" : "none",
                                    transform: isActive ? "scale(1.1)" : "scale(1)",
                                }}
                            >
                                {isCompleted ? <CheckCircle size={18} /> : index + 1}
                            </div>

                            {/* Label */}
                            <span
                                className="text-xs mt-1 text-center hidden sm:block"
                                style={{
                                    color: isActive
                                        ? "var(--color-primary-light)"
                                        : isCompleted
                                            ? "var(--color-success)"
                                            : "var(--color-text-muted)",
                                    fontWeight: isActive ? 600 : 400,
                                    transition: "color 0.3s",
                                }}
                            >
                                {step.label}
                            </span>
                        </div>

                        {/* Connector line */}
                        {index < steps.length - 1 && (
                            <div
                                className="h-px flex-1 transition-all duration-500"
                                style={{
                                    background: isCompleted
                                        ? "var(--color-success)"
                                        : "var(--color-border)",
                                    marginBottom: "18px",
                                }}
                            />
                        )}
                    </div>
                );
            })}
        </div>
    );
}
