"use client";

import { useState } from "react";

const buyerSegments = [
    {
        id: "premium-supermarkets",
        name: "Premium supermarkets",
        tags: "Appearance, grading, shelf life, replenishment",
        priority: "Fresh produce selected for the standards of premium retail.",
        provides: [
            "Graded lots with written specifications",
            "Replenishment planned around shelf demand",
            "Clean crates and visible lot labels on every delivery",
        ],
    },
    {
        id: "hotels-restaurants",
        name: "Hotels and restaurants",
        tags: "Culinary quality, delivery, food safety",
        priority: "Produce that performs in the kitchen, delivered on the day it is needed.",
        provides: [
            "Culinary-grade selection by variety and ripeness",
            "Scheduled deliveries matched to service times",
            "Traceable lots with food safety documentation",
        ],
    },
    {
        id: "premium-caterers",
        name: "Premium caterers",
        tags: "Quantity planning, event delivery",
        priority: "Reliable volumes planned around every event.",
        provides: [
            "Quantity planning from your event schedule",
            "Coordinated delivery to event venues",
            "Substitution advice before the order is packed",
        ],
    },
    {
        id: "premium-vendors",
        name: "Premium vendors",
        tags: "Inventory, margins, differentiated quality",
        priority: "Stock that protects your margins and sets your stall apart.",
        provides: [
            "Inventory planning with predictable weekly supply",
            "Differentiated grades for premium shoppers",
            "Clear pricing so you can plan your margins",
        ],
    },
    {
        id: "institutional-buyers",
        name: "Institutional buyers",
        tags: "Volume, documentation, procurement reliability",
        priority: "Dependable supply that meets tender and audit requirements.",
        provides: [
            "Volume commitments under agreed terms",
            "Complete delivery and quality documentation",
            "A named contact who answers when something goes wrong",
        ],
    },
];

const buyerProcess = [
    { label: "START", title: "Premium buyer requirements" },
    { label: "THEN", title: "Agreed quality standards" },
    { label: "THEN", title: "Controlled supply and handling" },
    { label: "THEN", title: "Verified delivery performance" },
    { label: "RESULT", title: "Quality-linked price realization", highlight: true },
];

export default function PremiumBuyers() {
    const [activeId, setActiveId] = useState(buyerSegments[0].id);
    const active = buyerSegments.find((segment) => segment.id === activeId);

    return (
        <div id="value-proposition-3" className="pb-16 md:pb-24">
            <div className="bedebo-site-container">
                <p className="font-mono text-xs tracking-[0.2em] text-[#267A47] dark:text-[#3DB268]">FOR PREMIUM BUYERS</p>
                <h2 id="premium-buyers-heading" className="mt-4 text-3xl font-bold leading-tight text-[#1E2841] md:text-4xl dark:text-slate-50">
                    Premium Fresh Produce<br />for Businesses That<br />Demand Quality.
                </h2>
                <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-500 dark:text-slate-300">
                    A procurement manager needs consistent specifications, enough volume, predictable deliveries, clear terms and a supplier who answers when something goes wrong. Choose your business type to see what we offer.
                </p>

                <div className="mt-10 grid grid-cols-1 overflow-hidden rounded-2xl border border-[#1E2841]/10 bg-slate-50 shadow-sm md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] dark:border-white/10 dark:bg-white/5">
                    <div role="tablist" aria-label="Business types" aria-orientation="vertical" className="divide-y divide-[#1E2841]/10 dark:divide-white/10">
                        {buyerSegments.map((segment) => {
                            const isActive = segment.id === activeId;
                            return (
                                <button
                                    key={segment.id}
                                    type="button"
                                    role="tab"
                                    id={`buyer-tab-${segment.id}`}
                                    aria-selected={isActive}
                                    aria-controls="buyer-panel"
                                    onClick={() => setActiveId(segment.id)}
                                    className={`block w-full px-5 py-4 text-left transition-colors ${
                                        isActive
                                            ? "border-l-4 border-[#3DB268] bg-[#3DB268]/10"
                                            : "border-l-4 border-transparent hover:bg-[#1E2841]/5 dark:hover:bg-white/5"
                                    }`}
                                >
                                    <span className="block font-semibold text-[#1E2841] dark:text-slate-50">{segment.name}</span>
                                    <span className="mt-1 block text-sm leading-relaxed text-slate-500 dark:text-slate-300">{segment.tags}</span>
                                </button>
                            );
                        })}
                    </div>

                    <div id="buyer-panel" role="tabpanel" aria-labelledby={`buyer-tab-${active.id}`} className="bg-white p-6 md:p-8 dark:bg-[#0F1A14]">
                        <p className="font-mono text-[11px] tracking-[0.2em] text-slate-500 dark:text-slate-400">MAIN PURCHASING PRIORITY</p>
                        <h3 className="mt-3 text-2xl font-bold text-[#1E2841] dark:text-slate-50">{active.name}</h3>
                        <p className="mt-3 text-lg font-semibold leading-snug text-[#267A47] dark:text-[#3DB268]">{active.priority}</p>

                        <p className="mt-8 font-mono text-[11px] tracking-[0.2em] text-slate-500 dark:text-slate-400">WHAT BEDEBO PROVIDES</p>
                        <ul className="mt-3 space-y-3">
                            {active.provides.map((item) => (
                                <li key={item} className="flex gap-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                                    <span className="mt-2 h-px w-3 shrink-0 bg-[#3DB268]" aria-hidden="true" />
                                    {item}
                                </li>
                            ))}
                        </ul>

                        <button type="button" className="mt-8 rounded-full bg-[#267A47] px-6 py-3 font-semibold text-white transition-colors hover:bg-[#1E663A]">
                            Request supply for {active.name.toLowerCase()}
                        </button>
                    </div>
                </div>

                <ol className="mt-6 grid grid-cols-1 overflow-hidden rounded-2xl border border-[#1E2841]/10 md:grid-cols-5 dark:border-white/10">
                    {buyerProcess.map((step) => (
                        <li
                            key={step.title}
                            className={`p-5 ${step.highlight ? "bg-[#267A47] text-white" : "bg-slate-50 text-[#1E2841] dark:bg-white/5 dark:text-slate-50"}`}
                        >
                            <p className={`font-mono text-[11px] tracking-[0.2em] ${step.highlight ? "text-white/80" : "text-slate-500 dark:text-slate-400"}`}>{step.label}</p>
                            <p className="mt-2 font-semibold leading-snug">{step.title}</p>
                        </li>
                    ))}
                </ol>
            </div>
        </div>
    );
}
