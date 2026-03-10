"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { ATSScore, ATSSuggestion } from "@/lib/ats/scoring";

interface ATSScoreCardProps {
    score: ATSScore | null;
    isLoading?: boolean;
    onOptimize?: () => void;
}

export default function ATSScoreCard({ score, isLoading, onOptimize }: ATSScoreCardProps) {
    const [expandedSection, setExpandedSection] = useState<string | null>(null);
    const [showAllSuggestions, setShowAllSuggestions] = useState(false);

    if (isLoading) {
        return (
            <div className="bg-slate-800/50 rounded-2xl border border-white/10 p-6 backdrop-blur-sm">
                <div className="flex items-center gap-4">
                    <div className="w-20 h-20 rounded-full bg-slate-700 animate-pulse" />
                    <div className="flex-1">
                        <div className="h-6 bg-slate-700 rounded-lg w-48 animate-pulse mb-2" />
                        <div className="h-4 bg-slate-700 rounded-lg w-32 animate-pulse" />
                    </div>
                </div>
                <div className="mt-6 grid grid-cols-3 gap-4">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="h-16 bg-slate-700 rounded-xl animate-pulse" />
                    ))}
                </div>
            </div>
        );
    }

    if (!score) {
        return (
            <div className="bg-slate-800/50 rounded-2xl border border-white/10 p-8 backdrop-blur-sm text-center">
                <div className="w-16 h-16 rounded-full bg-slate-700/50 flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">No ATS Score Available</h3>
                <p className="text-slate-400 text-sm">Generate or update your resume to see ATS compatibility score</p>
            </div>
        );
    }

    const getScoreColor = (value: number) => {
        if (value >= 80) return { bg: "from-emerald-500 to-green-500", text: "text-emerald-400", label: "Excellent" };
        if (value >= 60) return { bg: "from-blue-500 to-cyan-500", text: "text-blue-400", label: "Good" };
        if (value >= 40) return { bg: "from-yellow-500 to-orange-500", text: "text-yellow-400", label: "Fair" };
        return { bg: "from-red-500 to-rose-500", text: "text-red-400", label: "Needs Work" };
    };

    const scoreStyle = getScoreColor(score.overall);

    const breakdownItems = [
        { key: "keywords", label: "Keywords", icon: "🔑", value: score.breakdown.keywords, description: "Relevant industry keywords" },
        { key: "formatting", label: "Formatting", icon: "📐", value: score.breakdown.formatting, description: "ATS-friendly structure" },
        { key: "content", label: "Content", icon: "📝", value: score.breakdown.content, description: "Quality & achievements" },
        { key: "length", label: "Length", icon: "📏", value: score.breakdown.length, description: "Optimal resume length" },
        { key: "contact", label: "Contact", icon: "📧", value: score.breakdown.contact, description: "Contact information" },
        { key: "skills", label: "Skills", icon: "⚡", value: score.breakdown.skills, description: "Skills presentation" },
    ];

    const impactColors = {
        critical: { bg: "bg-red-500/20", border: "border-red-500/50", text: "text-red-400", icon: "🔴" },
        major: { bg: "bg-yellow-500/20", border: "border-yellow-500/50", text: "text-yellow-400", icon: "🟡" },
        minor: { bg: "bg-blue-500/20", border: "border-blue-500/50", text: "text-blue-400", icon: "🔵" },
    };

    const displayedSuggestions = showAllSuggestions ? score.suggestions : score.suggestions.slice(0, 3);

    return (
        <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 rounded-3xl border border-white/10 overflow-hidden backdrop-blur-xl shadow-2xl">
            {/* Header with Main Score */}
            <div className="relative p-6 pb-8 bg-gradient-to-r from-slate-800/50 to-slate-700/50">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                    <svg className="w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5"/>
                            </pattern>
                        </defs>
                        <rect width="100" height="100" fill="url(#grid)" />
                    </svg>
                </div>

                <div className="relative flex items-start gap-6">
                    {/* Score Circle */}
                    <div className="relative">
                        <svg className="w-28 h-28 -rotate-90" viewBox="0 0 100 100">
                            {/* Background Circle */}
                            <circle
                                cx="50" cy="50" r="42"
                                fill="none"
                                stroke="rgba(255,255,255,0.1)"
                                strokeWidth="8"
                            />
                            {/* Progress Circle */}
                            <motion.circle
                                cx="50" cy="50" r="42"
                                fill="none"
                                stroke={`url(#scoreGradient)`}
                                strokeWidth="8"
                                strokeLinecap="round"
                                strokeDasharray={264}
                                initial={{ strokeDashoffset: 264 }}
                                animate={{ strokeDashoffset: 264 - (264 * score.overall / 100) }}
                                transition={{ duration: 1.5, ease: "easeOut" }}
                            />
                            <defs>
                                <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                    {score.overall >= 80 ? (
                                        <>
                                            <stop offset="0%" stopColor="#10b981" />
                                            <stop offset="100%" stopColor="#22c55e" />
                                        </>
                                    ) : score.overall >= 60 ? (
                                        <>
                                            <stop offset="0%" stopColor="#3b82f6" />
                                            <stop offset="100%" stopColor="#06b6d4" />
                                        </>
                                    ) : score.overall >= 40 ? (
                                        <>
                                            <stop offset="0%" stopColor="#eab308" />
                                            <stop offset="100%" stopColor="#f97316" />
                                        </>
                                    ) : (
                                        <>
                                            <stop offset="0%" stopColor="#ef4444" />
                                            <stop offset="100%" stopColor="#f43f5e" />
                                        </>
                                    )}
                                </linearGradient>
                            </defs>
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <motion.span 
                                className="text-3xl font-bold text-white"
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.3 }}
                            >
                                {score.overall}
                            </motion.span>
                            <span className="text-xs text-slate-400">/ 100</span>
                        </div>
                    </div>

                    {/* Score Info */}
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-xl font-bold text-white">ATS Compatibility</h3>
                            <span className={`px-2.5 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${scoreStyle.bg} text-white`}>
                                {scoreStyle.label}
                            </span>
                        </div>
                        <p className="text-slate-400 text-sm mb-4">
                            Your resume's compatibility with Applicant Tracking Systems
                        </p>
                        
                        {/* Quick Stats */}
                        <div className="flex gap-4">
                            <div className="flex items-center gap-2">
                                <span className={`text-lg ${score.suggestions.filter(s => s.impact === "critical").length > 0 ? "text-red-400" : "text-emerald-400"}`}>
                                    {score.suggestions.filter(s => s.impact === "critical").length}
                                </span>
                                <span className="text-slate-500 text-sm">Critical Issues</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-lg text-yellow-400">
                                    {score.suggestions.filter(s => s.impact === "major").length}
                                </span>
                                <span className="text-slate-500 text-sm">Improvements</span>
                            </div>
                        </div>
                    </div>

                    {/* Optimize Button */}
                    {onOptimize && (
                        <motion.button
                            onClick={onOptimize}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl font-semibold 
                                     text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-shadow"
                        >
                            ✨ Auto-Optimize
                        </motion.button>
                    )}
                </div>
            </div>

            {/* Score Breakdown */}
            <div className="p-6 border-t border-white/5">
                <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">
                    Score Breakdown
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                    {breakdownItems.map((item, index) => (
                        <motion.button
                            key={item.key}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            onClick={() => setExpandedSection(expandedSection === item.key ? null : item.key)}
                            className={`relative p-4 rounded-xl border transition-all ${
                                expandedSection === item.key
                                    ? "bg-slate-700/50 border-white/20"
                                    : "bg-slate-800/30 border-white/5 hover:bg-slate-700/30 hover:border-white/10"
                            }`}
                        >
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-lg">{item.icon}</span>
                                <span className="text-sm font-medium text-slate-300">{item.label}</span>
                            </div>
                            <div className="flex items-end gap-2">
                                <span className={`text-2xl font-bold ${getScoreColor(item.value).text}`}>
                                    {item.value}
                                </span>
                                <span className="text-slate-500 text-xs mb-1">/ 100</span>
                            </div>
                            {/* Mini Progress Bar */}
                            <div className="mt-2 h-1.5 rounded-full bg-slate-700 overflow-hidden">
                                <motion.div
                                    className={`h-full rounded-full bg-gradient-to-r ${getScoreColor(item.value).bg}`}
                                    initial={{ width: 0 }}
                                    animate={{ width: `${item.value}%` }}
                                    transition={{ duration: 0.8, delay: 0.2 + index * 0.05 }}
                                />
                            </div>
                        </motion.button>
                    ))}
                </div>

                {/* Expanded Section Details */}
                <AnimatePresence>
                    {expandedSection && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-4 overflow-hidden"
                        >
                            <div className="p-4 bg-slate-700/30 rounded-xl border border-white/5">
                                {breakdownItems.find(i => i.key === expandedSection) && (
                                    <div>
                                        <h5 className="font-semibold text-white mb-2">
                                            {breakdownItems.find(i => i.key === expandedSection)!.icon}{" "}
                                            {breakdownItems.find(i => i.key === expandedSection)!.label} Analysis
                                        </h5>
                                        <p className="text-slate-400 text-sm">
                                            {breakdownItems.find(i => i.key === expandedSection)!.description}
                                        </p>
                                        {/* Specific suggestions for this category */}
                                        <div className="mt-3 space-y-2">
                                            {score.suggestions
                                                .filter(s => s.category === expandedSection)
                                                .slice(0, 3)
                                                .map((suggestion, idx) => (
                                                    <div key={idx} className="flex items-start gap-2 text-sm">
                                                        <span>{impactColors[suggestion.impact].icon}</span>
                                                        <span className="text-slate-300">{suggestion.issue}</span>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Suggestions */}
            <div className="p-6 border-t border-white/5">
                <div className="flex items-center justify-between mb-4">
                    <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">
                        Optimization Suggestions
                    </h4>
                    <span className="px-2 py-1 rounded-full bg-slate-700 text-slate-400 text-xs">
                        {score.suggestions.length} suggestions
                    </span>
                </div>

                <div className="space-y-3">
                    {displayedSuggestions
                        .sort((a, b) => {
                            const order = { critical: 0, major: 1, minor: 2 };
                            return order[a.impact] - order[b.impact];
                        })
                        .map((suggestion, index) => (
                            <SuggestionItem key={index} suggestion={suggestion} index={index} />
                        ))
                    }
                </div>

                {score.suggestions.length > 3 && (
                    <button
                        onClick={() => setShowAllSuggestions(!showAllSuggestions)}
                        className="w-full mt-4 py-3 rounded-xl border border-white/10 text-slate-400 
                                 hover:text-white hover:bg-slate-700/30 transition-all text-sm font-medium"
                    >
                        {showAllSuggestions 
                            ? "Show Less" 
                            : `Show ${score.suggestions.length - 3} More Suggestions`
                        }
                    </button>
                )}
            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-slate-800/50 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-500 text-sm">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Higher scores increase interview chances by up to 60%</span>
                </div>
                <a href="#" className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors">
                    Learn More →
                </a>
            </div>
        </div>
    );
}

function SuggestionItem({ suggestion, index }: { suggestion: ATSSuggestion; index: number }) {
    const impactStyles = {
        critical: {
            bg: "bg-red-500/10",
            border: "border-red-500/20",
            iconBg: "bg-red-500/20",
            iconText: "text-red-400",
            badge: "bg-red-500/20 text-red-400",
        },
        major: {
            bg: "bg-yellow-500/10",
            border: "border-yellow-500/20",
            iconBg: "bg-yellow-500/20",
            iconText: "text-yellow-400",
            badge: "bg-yellow-500/20 text-yellow-400",
        },
        minor: {
            bg: "bg-blue-500/10",
            border: "border-blue-500/20",
            iconBg: "bg-blue-500/20",
            iconText: "text-blue-400",
            badge: "bg-blue-500/20 text-blue-400",
        },
    };

    const style = impactStyles[suggestion.impact];

    const categoryIcons: Record<string, string> = {
        keywords: "🔑",
        formatting: "📐",
        content: "📝",
        length: "📏",
        contact: "📧",
        skills: "⚡",
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className={`p-4 rounded-xl border ${style.bg} ${style.border}`}
        >
            <div className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-lg ${style.iconBg} flex items-center justify-center flex-shrink-0`}>
                    <span className="text-sm">{categoryIcons[suggestion.category] || "💡"}</span>
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${style.badge}`}>
                            {suggestion.impact.charAt(0).toUpperCase() + suggestion.impact.slice(1)}
                        </span>
                        <span className="text-slate-500 text-xs capitalize">{suggestion.category}</span>
                    </div>
                    <p className="text-slate-200 text-sm">{suggestion.issue}</p>
                </div>
            </div>
        </motion.div>
    );
}
