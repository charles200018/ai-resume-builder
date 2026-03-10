"use client";

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
                                className="w-8 h-8 flex items-center justify-center text-xs font-medium transition-all duration-500"
                                style={{
                                    background: isCompleted
                                        ? "var(--color-primary)"
                                        : isActive
                                            ? "transparent"
                                            : "transparent",
                                    color: isCompleted
                                        ? "#0a0a0a"
                                        : isActive
                                            ? "var(--color-primary)"
                                            : "rgba(138, 133, 120, 0.4)",
                                    border: isActive
                                        ? "1px solid var(--color-primary)"
                                        : isCompleted
                                            ? "1px solid var(--color-primary)"
                                            : "1px solid rgba(201, 169, 110, 0.1)",
                                    borderRadius: "2px",
                                }}
                            >
                                {isCompleted ? "\u2713" : index + 1}
                            </div>

                            {/* Label */}
                            <span
                                className="text-[10px] mt-2 text-center hidden sm:block tracking-[0.1em] uppercase"
                                style={{
                                    color: isActive
                                        ? "var(--color-primary)"
                                        : isCompleted
                                            ? "var(--color-primary)"
                                            : "rgba(138, 133, 120, 0.4)",
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
                                        ? "rgba(201, 169, 110, 0.3)"
                                        : "rgba(201, 169, 110, 0.06)",
                                    marginBottom: "24px",
                                }}
                            />
                        )}
                    </div>
                );
            })}
        </div>
    );
}
