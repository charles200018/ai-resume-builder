"use client";

import { useFormContext, useFieldArray } from "react-hook-form";
import type { ResumeFormData } from "@/lib/validators/resumeSchema";
import { Plus, Trash2, Briefcase } from "lucide-react";

export default function WorkExperienceStep() {
    const {
        register,
        control,
        watch,
        formState: { errors },
    } = useFormContext<ResumeFormData>();

    const { fields, append, remove } = useFieldArray({
        control,
        name: "experiences",
    });

    const expErrors = errors.experiences;

    return (
        <div className="animate-fade-in">
            <h2 className="text-xl font-semibold mb-1" style={{ color: "var(--color-text)" }}>
                Work Experience
            </h2>
            <p className="text-sm mb-6" style={{ color: "var(--color-text-muted)" }}>
                Add your roles, starting with the most recent.
            </p>

            <div className="space-y-6">
                {fields.map((field, index) => {
                    const isCurrent = watch(`experiences.${index}.isCurrent`);

                    return (
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
                                    <Briefcase size={16} />
                                    <span>Role {index + 1}</span>
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
                                <div>
                                    <label className="form-label">Job Title</label>
                                    <input
                                        {...register(`experiences.${index}.jobTitle`)}
                                        placeholder="Senior Software Engineer"
                                        className="input-base"
                                    />
                                    {expErrors?.[index]?.jobTitle && (
                                        <p className="form-error">{expErrors[index].jobTitle.message}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="form-label">Company</label>
                                    <input
                                        {...register(`experiences.${index}.company`)}
                                        placeholder="Acme Corp"
                                        className="input-base"
                                    />
                                    {expErrors?.[index]?.company && (
                                        <p className="form-error">{expErrors[index].company.message}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="form-label">Start Date</label>
                                    <input
                                        {...register(`experiences.${index}.startDate`)}
                                        placeholder="01/2022"
                                        className="input-base"
                                    />
                                    {expErrors?.[index]?.startDate && (
                                        <p className="form-error">{expErrors[index].startDate.message}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="form-label">End Date</label>
                                    <input
                                        {...register(`experiences.${index}.endDate`)}
                                        placeholder="12/2024"
                                        className="input-base"
                                        disabled={isCurrent}
                                        style={{ opacity: isCurrent ? 0.4 : 1 }}
                                    />
                                    <div className="flex items-center gap-2 mt-2">
                                        <input
                                            type="checkbox"
                                            id={`current-${index}`}
                                            {...register(`experiences.${index}.isCurrent`)}
                                            className="w-4 h-4 cursor-pointer"
                                            style={{ accentColor: "var(--color-primary)" }}
                                        />
                                        <label
                                            htmlFor={`current-${index}`}
                                            className="text-xs cursor-pointer"
                                            style={{ color: "var(--color-text-muted)" }}
                                        >
                                            I currently work here
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="form-label">Role Description</label>
                                <textarea
                                    {...register(`experiences.${index}.description`)}
                                    placeholder="Describe your responsibilities, achievements, and impact. The AI will expand and polish this..."
                                    className="input-base"
                                    rows={3}
                                />
                                {expErrors?.[index]?.description && (
                                    <p className="form-error">{expErrors[index].description.message}</p>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            <button
                type="button"
                onClick={() =>
                    append({
                        company: "",
                        jobTitle: "",
                        startDate: "",
                        endDate: "",
                        isCurrent: false,
                        description: "",
                    })
                }
                className="btn-ghost mt-4 w-full"
                style={{ justifyContent: "center" }}
            >
                <Plus size={16} />
                Add Another Role
            </button>
        </div>
    );
}
