"use client";

import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { resumeFormSchema, type ResumeFormData } from "@/lib/validators/resumeSchema";
import { generateResume } from "@/actions/generateResume";
import StepIndicator from "./StepIndicator";
import PersonalInfoStep from "./steps/PersonalInfoStep";
import WorkExperienceStep from "./steps/WorkExperienceStep";
import EducationStep from "./steps/EducationStep";
import SkillsStep from "./steps/SkillsStep";
import ReviewStep from "./steps/ReviewStep";
import FormNavigation from "./FormNavigation";

const STEPS = [
    { id: 1, label: "Personal Info" },
    { id: 2, label: "Experience" },
    { id: 3, label: "Education" },
    { id: 4, label: "Skills" },
    { id: 5, label: "Review" },
];

const STEP_COMPONENTS = [
    PersonalInfoStep,
    WorkExperienceStep,
    EducationStep,
    SkillsStep,
    ReviewStep,
];

export default function StepController() {
    const [currentStep, setCurrentStep] = useState(0);
    const [isGenerating, setIsGenerating] = useState(false);
    const [serverError, setServerError] = useState<string | null>(null);
    const router = useRouter();

    const methods = useForm({
        resolver: zodResolver(resumeFormSchema),
        defaultValues: {
            fullName: "",
            email: "",
            phone: "",
            location: "",
            linkedinUrl: "",
            portfolioUrl: "",
            summary: "",
            experiences: [
                {
                    company: "",
                    jobTitle: "",
                    startDate: "",
                    endDate: "",
                    isCurrent: false,
                    description: "",
                },
            ],
            education: [
                {
                    institution: "",
                    degree: "",
                    fieldOfStudy: "",
                    graduationYear: "",
                    gpa: "",
                },
            ],
            technicalSkills: [],
            softSkills: [],
            languages: [],
            targetJobTitle: "",
        },
        mode: "onBlur",
    });

    const StepComponent = STEP_COMPONENTS[currentStep];

    const STEP_FIELDS: (keyof ResumeFormData)[][] = [
        ["fullName", "email", "phone", "location", "linkedinUrl", "portfolioUrl", "summary"],
        ["experiences"],
        ["education"],
        ["targetJobTitle", "technicalSkills", "softSkills", "languages"],
        [] // Review step
    ];

    const handleNext = async () => {
        const fields = STEP_FIELDS[currentStep];
        const isStepValid = await methods.trigger(fields);

        if (isStepValid) {
            setCurrentStep((s) => Math.min(s + 1, STEPS.length - 1));
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    const handlePrev = () => {
        setCurrentStep((s) => Math.max(s - 1, 0));
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleSubmit = async (data: ResumeFormData) => {
        setIsGenerating(true);
        setServerError(null);

        try {
            const result = await generateResume(data);
            if (result.error) {
                setServerError(result.error);
            } else if (result.id) {
                router.push(`/resume/${result.id}`);
            }
        } catch {
            setServerError("An unexpected error occurred. Please try again.");
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <FormProvider {...methods}>
            <div className="min-h-screen" style={{ background: "var(--color-surface)" }}>
                {/* Fixed background blobs */}
                <div className="fixed inset-0 pointer-events-none overflow-hidden">
                    <div
                        className="absolute -top-40 -right-40 w-96 h-96 rounded-full opacity-10 blur-3xl"
                        style={{ background: "radial-gradient(circle, #6366f1, transparent)" }}
                    />
                    <div
                        className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full opacity-10 blur-3xl"
                        style={{ background: "radial-gradient(circle, #a855f7, transparent)" }}
                    />
                </div>

                <div className="relative z-10 max-w-3xl mx-auto px-4 py-12">
                    {/* Header */}
                    <div className="text-center mb-10 animate-fade-in">
                        <h1 className="text-3xl font-bold mb-2">
                            Build Your <span className="gradient-text">AI Resume</span>
                        </h1>
                        <p style={{ color: "var(--color-text-muted)", fontSize: "0.9375rem" }}>
                            Step {currentStep + 1} of {STEPS.length} — {STEPS[currentStep].label}
                        </p>
                    </div>

                    {/* Step indicator */}
                    <StepIndicator steps={STEPS} currentStep={currentStep} />

                    {/* Form card */}
                    <div className="glass-card p-8 mt-8 animate-fade-in">
                        {serverError && (
                            <div
                                className="mb-6 p-4 rounded-xl text-sm"
                                style={{
                                    background: "rgba(239,68,68,0.1)",
                                    border: "1px solid rgba(239,68,68,0.3)",
                                    color: "#fca5a5",
                                }}
                            >
                                ⚠️ {serverError}
                            </div>
                        )}

                        <StepComponent />

                        <FormNavigation
                            currentStep={currentStep}
                            totalSteps={STEPS.length}
                            onNext={handleNext}
                            onPrev={handlePrev}
                            onSubmit={methods.handleSubmit(handleSubmit)}
                            isGenerating={isGenerating}
                        />
                    </div>
                </div>
            </div>
        </FormProvider>
    );
}
