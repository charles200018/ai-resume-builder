"use client";

import { useState, KeyboardEvent } from "react";
import { useFormContext } from "react-hook-form";
import type { ResumeFormData } from "@/lib/validators/resumeSchema";
import { Plus, X, Target } from "lucide-react";

function TagInput({
    name,
    label,
    placeholder,
}: {
    name: "technicalSkills" | "softSkills" | "languages";
    label: string;
    placeholder: string;
}) {
    const { watch, setValue, formState: { errors } } = useFormContext<ResumeFormData>();
    const [inputVal, setInputVal] = useState("");
    const tags: string[] = watch(name) || [];

    const addTag = () => {
        const trimmed = inputVal.trim();
        if (trimmed && !tags.includes(trimmed)) {
            setValue(name, [...tags, trimmed], { shouldValidate: true });
        }
        setInputVal("");
    };

    const removeTag = (tag: string) => {
        setValue(name, tags.filter((t) => t !== tag), { shouldValidate: true });
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" || e.key === ",") {
            e.preventDefault();
            addTag();
        }
    };

    const error = errors[name]?.message as string | undefined;

    return (
        <div>
            <label className="form-label">{label}</label>
            <div
                className="p-3 rounded-xl min-h-[56px] flex flex-wrap gap-2 mb-2"
                style={{
                    background: "rgba(15,15,35,0.8)",
                    border: "1px solid var(--color-border)",
                }}
            >
                {tags.map((tag) => (
                    <span key={tag} className="tag-chip">
                        {tag}
                        <button type="button" onClick={() => removeTag(tag)}>
                            <X size={12} />
                        </button>
                    </span>
                ))}
            </div>
            <div className="flex gap-2">
                <input
                    type="text"
                    value={inputVal}
                    onChange={(e) => setInputVal(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={placeholder}
                    className="input-base flex-1"
                />
                <button type="button" onClick={addTag} className="btn-ghost" style={{ padding: "10px 16px" }}>
                    <Plus size={16} />
                    Add
                </button>
            </div>
            <p className="text-xs mt-1" style={{ color: "var(--color-text-muted)" }}>
                Press Enter or comma to add a tag
            </p>
            {error && <p className="form-error">{error}</p>}
        </div>
    );
}

export default function SkillsStep() {
    const {
        register,
        formState: { errors },
    } = useFormContext<ResumeFormData>();

    return (
        <div className="animate-fade-in">
            <h2 className="text-xl font-semibold mb-1" style={{ color: "var(--color-text)" }}>
                Skills &amp; Target Role
            </h2>
            <p className="text-sm mb-6" style={{ color: "var(--color-text-muted)" }}>
                Tell us your skills and the role you&apos;re targeting so the AI can tailor your resume.
            </p>

            <div className="space-y-6">
                <div>
                    <label className="form-label">
                        <Target size={13} className="inline mr-1 opacity-60" />
                        Target Job Title
                    </label>
                    <input
                        {...register("targetJobTitle")}
                        placeholder="e.g. Senior Full Stack Engineer"
                        className="input-base"
                    />
                    {errors.targetJobTitle && (
                        <p className="form-error">{errors.targetJobTitle.message}</p>
                    )}
                    <p className="text-xs mt-1" style={{ color: "var(--color-text-muted)" }}>
                        The AI will optimize your entire resume for this role.
                    </p>
                </div>

                <TagInput
                    name="technicalSkills"
                    label="Technical Skills *"
                    placeholder="React, TypeScript, Node.js..."
                />
                <TagInput
                    name="softSkills"
                    label="Soft Skills (optional)"
                    placeholder="Leadership, Communication..."
                />
                <TagInput
                    name="languages"
                    label="Languages (optional)"
                    placeholder="English (Native), Spanish (B2)..."
                />
            </div>
        </div>
    );
}
