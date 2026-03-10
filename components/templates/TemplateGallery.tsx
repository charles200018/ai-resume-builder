"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { templates, getTemplatesByCategory, type ResumeTemplate, type TemplateCategory } from "@/lib/templates/templateData";

interface TemplateGalleryProps {
    selectedTemplate: string;
    onSelectTemplate: (templateId: string) => void;
    isPremiumUser?: boolean;
}

const categoryLabels: Record<TemplateCategory, { label: string; icon: string; description: string }> = {
    professional: {
        label: "Professional",
        icon: "💼",
        description: "Classic designs for corporate environments"
    },
    creative: {
        label: "Creative",
        icon: "🎨",
        description: "Bold designs for creative industries"
    },
    minimal: {
        label: "Minimal",
        icon: "✨",
        description: "Clean, distraction-free layouts"
    },
    executive: {
        label: "Executive",
        icon: "👔",
        description: "Sophisticated designs for senior roles"
    },
    tech: {
        label: "Tech",
        icon: "💻",
        description: "Modern designs for tech professionals"
    },
    academic: {
        label: "Academic",
        icon: "🎓",
        description: "Formal layouts for academia & research"
    },
};

export default function TemplateGallery({
    selectedTemplate,
    onSelectTemplate,
    isPremiumUser = false,
}: TemplateGalleryProps) {
    const [activeCategory, setActiveCategory] = useState<TemplateCategory | "all">("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

    const filteredTemplates = useMemo(() => {
        let filtered = activeCategory === "all" 
            ? templates 
            : getTemplatesByCategory(activeCategory);
        
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(
                t => t.name.toLowerCase().includes(query) || 
                     t.description.toLowerCase().includes(query)
            );
        }
        
        return filtered;
    }, [activeCategory, searchQuery]);

    const categories: (TemplateCategory | "all")[] = ["all", "professional", "creative", "minimal", "executive", "tech", "academic"];

    return (
        <div className="w-full min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
            {/* Header Section */}
            <div className="sticky top-0 z-50 backdrop-blur-xl bg-slate-900/80 border-b border-white/10">
                <div className="max-w-7xl mx-auto px-4 py-6">
                    <div className="flex flex-col gap-6">
                        {/* Title and Search */}
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div>
                                <h2 className="text-3xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
                                    Resume Templates
                                </h2>
                                <p className="text-slate-400 mt-1">
                                    {filteredTemplates.length} premium templates available
                                </p>
                            </div>
                            
                            <div className="flex items-center gap-3">
                                {/* Search */}
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Search templates..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-64 px-4 py-2.5 pl-10 bg-slate-800/50 border border-white/10 rounded-xl 
                                                 text-white placeholder-slate-500 focus:outline-none focus:ring-2 
                                                 focus:ring-blue-500/50 focus:border-transparent transition-all"
                                    />
                                    <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" 
                                         fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
                                
                                {/* View Toggle */}
                                <div className="flex bg-slate-800/50 rounded-lg p-1 border border-white/10">
                                    <button
                                        onClick={() => setViewMode("grid")}
                                        className={`p-2 rounded-md transition-all ${
                                            viewMode === "grid" 
                                                ? "bg-blue-500 text-white" 
                                                : "text-slate-400 hover:text-white"
                                        }`}
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                                  d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                                        </svg>
                                    </button>
                                    <button
                                        onClick={() => setViewMode("list")}
                                        className={`p-2 rounded-md transition-all ${
                                            viewMode === "list" 
                                                ? "bg-blue-500 text-white" 
                                                : "text-slate-400 hover:text-white"
                                        }`}
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                                  d="M4 6h16M4 12h16M4 18h16" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                        
                        {/* Category Tabs */}
                        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => setActiveCategory(category)}
                                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium 
                                              whitespace-nowrap transition-all duration-300 ${
                                        activeCategory === category
                                            ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/25"
                                            : "bg-slate-800/50 text-slate-400 hover:text-white hover:bg-slate-700/50 border border-white/5"
                                    }`}
                                >
                                    {category === "all" ? (
                                        <>
                                            <span>🌟</span>
                                            <span>All Templates</span>
                                        </>
                                    ) : (
                                        <>
                                            <span>{categoryLabels[category].icon}</span>
                                            <span>{categoryLabels[category].label}</span>
                                        </>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Templates Grid */}
            <div className="max-w-7xl mx-auto px-4 py-8">
                <AnimatePresence mode="wait">
                    {viewMode === "grid" ? (
                        <motion.div
                            key="grid"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                        >
                            {filteredTemplates.map((template, index) => (
                                <TemplateCard
                                    key={template.id}
                                    template={template}
                                    isSelected={selectedTemplate === template.id}
                                    onSelect={() => onSelectTemplate(template.id)}
                                    isPremiumUser={isPremiumUser}
                                    index={index}
                                />
                            ))}
                        </motion.div>
                    ) : (
                        <motion.div
                            key="list"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="flex flex-col gap-4"
                        >
                            {filteredTemplates.map((template, index) => (
                                <TemplateListItem
                                    key={template.id}
                                    template={template}
                                    isSelected={selectedTemplate === template.id}
                                    onSelect={() => onSelectTemplate(template.id)}
                                    isPremiumUser={isPremiumUser}
                                    index={index}
                                />
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>

                {filteredTemplates.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-20">
                        <div className="text-6xl mb-4">🔍</div>
                        <h3 className="text-xl font-semibold text-white mb-2">No templates found</h3>
                        <p className="text-slate-400">Try adjusting your search or filter criteria</p>
                    </div>
                )}
            </div>
        </div>
    );
}

// Template Card Component
function TemplateCard({
    template,
    isSelected,
    onSelect,
    isPremiumUser,
    index,
}: {
    template: ResumeTemplate;
    isSelected: boolean;
    onSelect: () => void;
    isPremiumUser: boolean;
    index: number;
}) {
    const [isHovered, setIsHovered] = useState(false);
    const isLocked = template.premium && !isPremiumUser;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => !isLocked && onSelect()}
            className={`relative group cursor-pointer ${isLocked ? "cursor-not-allowed" : ""}`}
        >
            {/* Card Container */}
            <div className={`relative overflow-hidden rounded-2xl border-2 transition-all duration-500 ${
                isSelected
                    ? "border-blue-500 shadow-2xl shadow-blue-500/30"
                    : "border-white/10 hover:border-white/30"
            }`}>
                {/* Template Preview */}
                <div 
                    className="aspect-[3/4] relative overflow-hidden"
                    style={{ backgroundColor: template.colors.background }}
                >
                    {/* Mini Resume Preview */}
                    <div className="absolute inset-4 rounded-lg shadow-2xl overflow-hidden bg-white transform transition-transform duration-500 group-hover:scale-105">
                        <div 
                            className={`h-full ${template.layout === "double" ? "grid grid-cols-3" : ""}`}
                            style={{ fontFamily: template.fontFamily }}
                        >
                            {template.layout === "double" && (
                                <div 
                                    className="p-3"
                                    style={{ backgroundColor: template.colors.primary + "15" }}
                                >
                                    <div className="w-10 h-10 rounded-full mx-auto mb-2" 
                                         style={{ backgroundColor: template.colors.primary }} />
                                    <div className="space-y-1">
                                        {[...Array(4)].map((_, i) => (
                                            <div key={i} className="h-1.5 rounded-full bg-gray-300" />
                                        ))}
                                    </div>
                                </div>
                            )}
                            <div className={`p-3 ${template.layout === "double" ? "col-span-2" : ""}`}>
                                {/* Header */}
                                <div className={`mb-3 ${template.headerStyle === "centered" ? "text-center" : ""}`}>
                                    <div 
                                        className="h-3 rounded-full mb-1 max-w-[80%]"
                                        style={{ backgroundColor: template.colors.primary }}
                                    />
                                    <div className="h-1.5 rounded-full bg-gray-300 max-w-[60%]" />
                                </div>
                                {/* Content Lines */}
                                <div className="space-y-2">
                                    {[...Array(6)].map((_, i) => (
                                        <div key={i} className="space-y-1">
                                            <div 
                                                className="h-2 rounded-full max-w-[40%]"
                                                style={{ backgroundColor: template.colors.secondary }}
                                            />
                                            <div className="h-1 rounded-full bg-gray-200 max-w-[90%]" />
                                            <div className="h-1 rounded-full bg-gray-200 max-w-[75%]" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Hover Overlay */}
                    <motion.div
                        initial={false}
                        animate={{ opacity: isHovered ? 1 : 0 }}
                        className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end justify-center p-4"
                    >
                        <button className="px-6 py-2.5 bg-white text-slate-900 rounded-full font-semibold 
                                         transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
                            {isSelected ? "✓ Selected" : "Select Template"}
                        </button>
                    </motion.div>

                    {/* Premium Badge */}
                    {template.premium && (
                        <div className="absolute top-3 right-3 px-2.5 py-1 bg-gradient-to-r from-amber-400 to-orange-500 
                                      rounded-full text-xs font-bold text-white shadow-lg">
                            PRO
                        </div>
                    )}

                    {/* Lock Overlay */}
                    {isLocked && (
                        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
                            <div className="text-center">
                                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-2">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </div>
                                <span className="text-white text-sm font-medium">Premium Only</span>
                            </div>
                        </div>
                    )}

                    {/* Selected Indicator */}
                    {isSelected && (
                        <div className="absolute top-3 left-3 w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center shadow-lg">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                    )}
                </div>

                {/* Card Footer */}
                <div className="p-4 bg-slate-800/80 backdrop-blur-sm">
                    <h3 className="font-semibold text-white truncate">{template.name}</h3>
                    <p className="text-sm text-slate-400 mt-1 truncate">{template.description}</p>
                    <div className="flex items-center gap-2 mt-3">
                        <span className="px-2 py-1 text-xs rounded-full bg-slate-700 text-slate-300">
                            {categoryLabels[template.category].icon} {categoryLabels[template.category].label}
                        </span>
                        <span className="px-2 py-1 text-xs rounded-full bg-slate-700 text-slate-300 capitalize">
                            {template.layout}
                        </span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

// Template List Item Component
function TemplateListItem({
    template,
    isSelected,
    onSelect,
    isPremiumUser,
    index,
}: {
    template: ResumeTemplate;
    isSelected: boolean;
    onSelect: () => void;
    isPremiumUser: boolean;
    index: number;
}) {
    const isLocked = template.premium && !isPremiumUser;

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.03 }}
            onClick={() => !isLocked && onSelect()}
            className={`flex items-center gap-6 p-4 rounded-2xl border-2 transition-all duration-300 cursor-pointer ${
                isSelected
                    ? "bg-blue-500/10 border-blue-500"
                    : "bg-slate-800/30 border-white/10 hover:bg-slate-800/50 hover:border-white/20"
            } ${isLocked ? "opacity-50 cursor-not-allowed" : ""}`}
        >
            {/* Mini Preview */}
            <div 
                className="w-20 h-28 rounded-lg overflow-hidden shadow-lg flex-shrink-0"
                style={{ backgroundColor: template.colors.background }}
            >
                <div 
                    className="w-full h-full p-1.5"
                    style={{ backgroundColor: template.colors.background }}
                >
                    <div className="w-full h-full bg-white rounded shadow-sm p-1">
                        <div 
                            className="h-1.5 rounded-full mb-1"
                            style={{ backgroundColor: template.colors.primary }}
                        />
                        <div className="h-1 rounded-full bg-gray-300 w-3/4 mb-2" />
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="h-0.5 rounded-full bg-gray-200 mb-0.5" />
                        ))}
                    </div>
                </div>
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3">
                    <h3 className="font-semibold text-white">{template.name}</h3>
                    {template.premium && (
                        <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-white">
                            PRO
                        </span>
                    )}
                </div>
                <p className="text-sm text-slate-400 mt-1">{template.description}</p>
                <div className="flex items-center gap-2 mt-2">
                    <span className="px-2 py-1 text-xs rounded-full bg-slate-700 text-slate-300">
                        {categoryLabels[template.category].icon} {categoryLabels[template.category].label}
                    </span>
                    <span className="px-2 py-1 text-xs rounded-full bg-slate-700 text-slate-300">
                        {template.layout}
                    </span>
                    <span className="px-2 py-1 text-xs rounded-full bg-slate-700 text-slate-300">
                        {template.colors.primary}
                    </span>
                </div>
            </div>

            {/* Select Button */}
            <button
                className={`px-6 py-2.5 rounded-xl font-semibold transition-all duration-300 ${
                    isSelected
                        ? "bg-blue-500 text-white"
                        : "bg-slate-700 text-white hover:bg-slate-600"
                }`}
                disabled={isLocked}
            >
                {isSelected ? "✓ Selected" : "Select"}
            </button>
        </motion.div>
    );
}
