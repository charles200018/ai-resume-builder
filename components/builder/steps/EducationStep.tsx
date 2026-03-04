"use client";

import { useFormContext, useFieldArray } from "react-hook-form";
import type { ResumeFormData } from "@/lib/validators/resumeSchema";
import { Plus, Trash2, GraduationCap } from "lucide-react";

export default function EducationStep() {
    const {
        register,
        control,
        formState: { errors },
    } = useFormContext<ResumeFormData>();

    const { fields, append, remove } = useFieldArray({
        control,
        name: "education",
    });

    const eduErrors = errors.education;

    return (
        <div className="animate-fade-in">
            <h2 className="text-xl font-semibold mb-1" style={{ color: "var(--color-text)" }}>
                Education
            </h2>
            <p className="text-sm mb-6" style={{ color: "var(--color-text-muted)" }}>
                Add your academic qualifications.
            </p>

            <div className="space-y-6">
                {fields.map((field, index) => (
                    <div
                        key={field.id}
                        className="p-5 rounded-xl space-y-4"
                        style={{
                            background: "rgba(15,15,35,0.5)",
                            border: "1px solid var(--color-border)",
                        }}
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-sm font-medium" style={{ color: "var(--color-primary-light)" }}>
                                <GraduationCap size={16} />
                                <span>Degree {index + 1}</span>
                            </div>
                            {fields.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => remove(index)}
                                    className="flex items-center gap-1 text-xs px-2 py-1 rounded-lg transition-colors"
                                    style={{ color: "var(--color-error)", background: "rgba(239,68,68,0.08)" }}
                                >
                                    <Trash2 size={13} />
                                    Remove
                                </button>
                            )}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="sm:col-span-2">
                                <label className="form-label">Institution</label>
                                <input
                                    {...register(`education.${index}.institution`)}
                                    placeholder="Massachusetts Institute of Technology"
                                    className="input-base"
                                />
                                {eduErrors?.[index]?.institution && (
                                    <p className="form-error">{eduErrors[index].institution.message}</p>
                                )}
                            </div>
                            <div>
                                <label className="form-label">Degree</label>
                                <input
                                    {...register(`education.${index}.degree`)}
                                    placeholder="Bachelor of Science"
                                    className="input-base"
                                />
                                {eduErrors?.[index]?.degree && (
                                    <p className="form-error">{eduErrors[index].degree.message}</p>
                                )}
                            </div>
                            <div>
                                <label className="form-label">Field of Study (optional)</label>
                                <input
                                    {...register(`education.${index}.fieldOfStudy`)}
                                    placeholder="Computer Science"
                                    className="input-base"
                                />
                            </div>
                            <div>
                                <label className="form-label">Graduation Year</label>
                                <input
                                    {...register(`education.${index}.graduationYear`)}
                                    placeholder="2023"
                                    className="input-base"
                                    maxLength={4}
                                />
                                {eduErrors?.[index]?.graduationYear && (
                                    <p className="form-error">{eduErrors[index].graduationYear.message}</p>
                                )}
                            </div>
                            <div>
                                <label className="form-label">GPA (optional)</label>
                                <input
                                    {...register(`education.${index}.gpa`)}
                                    placeholder="3.8 / 4.0"
                                    className="input-base"
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <button
                type="button"
                onClick={() =>
                    append({
                        institution: "",
                        degree: "",
                        fieldOfStudy: "",
                        graduationYear: "",
                        gpa: "",
                    })
                }
                className="btn-ghost mt-4 w-full"
                style={{ justifyContent: "center" }}
            >
                <Plus size={16} />
                Add Another Degree
            </button>
        </div>
    );
}
