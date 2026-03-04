"use client";

import { useFormContext } from "react-hook-form";
import type { ResumeFormData } from "@/lib/validators/resumeSchema";
import { User, Mail, Phone, MapPin, Linkedin, Globe, FileText } from "lucide-react";

interface FieldProps {
    label: string;
    name: keyof ResumeFormData;
    placeholder?: string;
    type?: string;
    icon?: React.ReactNode;
    textarea?: boolean;
}

function Field({ label, name, placeholder, type = "text", icon, textarea }: FieldProps) {
    const {
        register,
        formState: { errors },
    } = useFormContext<ResumeFormData>();

    const error = errors[name]?.message as string | undefined;

    return (
        <div>
            <label className="form-label">
                {icon && <span className="inline-flex mr-1 opacity-60">{icon}</span>}
                {label}
            </label>
            {textarea ? (
                <textarea
                    {...register(name)}
                    placeholder={placeholder}
                    className="input-base"
                    rows={4}
                />
            ) : (
                <input
                    {...register(name)}
                    type={type}
                    placeholder={placeholder}
                    className="input-base"
                />
            )}
            {error && <p className="form-error">{error}</p>}
        </div>
    );
}

export default function PersonalInfoStep() {
    return (
        <div className="animate-fade-in">
            <h2 className="text-xl font-semibold mb-1" style={{ color: "var(--color-text)" }}>
                Personal Information
            </h2>
            <p className="text-sm mb-6" style={{ color: "var(--color-text-muted)" }}>
                Let&apos;s start with your basic contact details.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field
                    label="Full Name"
                    name="fullName"
                    placeholder="Jane Smith"
                    icon={<User size={13} />}
                />
                <Field
                    label="Email Address"
                    name="email"
                    type="email"
                    placeholder="jane@example.com"
                    icon={<Mail size={13} />}
                />
                <Field
                    label="Phone Number"
                    name="phone"
                    placeholder="+1 (555) 000-0000"
                    icon={<Phone size={13} />}
                />
                <Field
                    label="Location"
                    name="location"
                    placeholder="San Francisco, CA"
                    icon={<MapPin size={13} />}
                />
                <Field
                    label="LinkedIn URL (optional)"
                    name="linkedinUrl"
                    placeholder="https://linkedin.com/in/jane"
                    icon={<Linkedin size={13} />}
                />
                <Field
                    label="Portfolio / Website (optional)"
                    name="portfolioUrl"
                    placeholder="https://janesmith.dev"
                    icon={<Globe size={13} />}
                />
            </div>

            <div className="mt-4">
                <Field
                    label="Professional Summary (optional)"
                    name="summary"
                    placeholder="Write a brief 2–3 sentence summary about your background and goals..."
                    textarea
                    icon={<FileText size={13} />}
                />
                <p className="text-xs mt-1" style={{ color: "var(--color-text-muted)" }}>
                    The AI will enhance this or craft one from scratch if left blank.
                </p>
            </div>
        </div>
    );
}
