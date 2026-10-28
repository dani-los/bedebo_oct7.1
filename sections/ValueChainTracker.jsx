"use client"
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

const chainStages = [
    { name: "Production", title: "Planned growing", description: "Produce is planted to the volumes and weeks the market has requested.", records: ["Farmer and plot", "Planting date", "Produce Variety"] },
    { name: "Harvest", title: "Harvest timing", description: "Produce is picked at the stage that suits its shelf life and grade.", records: ["Harvest date", "Picker crew", "Field lot code"] },
    { name: "Aggregation", title: "Crate collection", description: "Produce from several growers is collected and checked at one point.", records: ["Crate count", "Weight per lot", "Intake check"] },
    { name: "Pre-cooling", title: "Pre-cooling", description: "Field heat removed soon after harvest.", records: ["Pre-cooling start and end", "Core temperature", "Facility"] },
    { name: "Transport", title: "Cold transport", description: "Produce moves in temperature-controlled vehicles on a coordinated schedule.", records: ["Vehicle and driver", "Departure time", "Temperature log"] },
    { name: "Grading", title: "Grading", description: "Classification against the specification.", records: ["Grade assigned", "Market standard", "Rejects"] },
    { name: "Cold storage", title: "Cold storage", description: "Graded lots are held at the right temperature until they are ordered.", records: ["Storage temperature", "Entry and exit time", "Lot location"] },
    { name: "Market delivery", title: "Market delivery", description: "Lots are delivered to the buyer against the confirmed order.", records: ["Delivery time", "Order reference", "Receiving check"] },
    { name: "Customer", title: "Customer receipt", description: "The buyer confirms receipt and quality.", records: ["Buyer confirmation", "Quality feedback", "Payment status"] },
];

export default function ValueChainTracker() {
    const [activeIndex, setActiveIndex] = useState(3);
    const active = chainStages[activeIndex];

    return (
        <section aria-labelledby="value-chain-heading" className="pb-16 md:pb-24">
            <div className="bedebo-site-container">
                <div className="rounded-2xl border border-[#1E2841]/10 bg-white p-6 shadow-sm md:p-10 dark:border-white/10 dark:bg-white/5">
                    <h2 id="value-chain-heading" className="text-2xl font-bold text-[#1E2841] md:text-3xl dark:text-slate-50">
                        Follow a lot from production to customer
                    </h2>
                    <p className="mt-3 text-base text-slate-500 dark:text-slate-300">
                        Select a stage to see the records BEDEBO intends to keep. These records will be captured by the digital system as it is introduced.
                    </p>

                    <div role="tablist" aria-label="Value chain stages" className="mt-8 flex flex-wrap items-center gap-2">
                        {chainStages.map((stage, index) => {
                            const isActive = index === activeIndex;
                            return (
                                <div key={stage.name} className="flex items-center gap-2">
                                    <button
                                        type="button"
                                        role="tab"
                                        id={`chain-tab-${index}`}
                                        aria-selected={isActive}
                                        aria-controls="chain-panel"
                                        onClick={() => setActiveIndex(index)}
                                        className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${isActive ? "border-[#267A47] bg-[#267A47] text-white" : "border-[#1E2841]/15 bg-white text-[#1E2841] hover:border-[#3DB268] dark:border-white/15 dark:bg-transparent dark:text-slate-100"}`}
                                    >
                                        {stage.name}
                                    </button>
                                    {index < chainStages.length - 1 && <ArrowRight aria-hidden="true" size={14} className="text-slate-400" />}
                                </div>
                            );
                        })}
                    </div>

                    <div id="chain-panel" role="tabpanel" aria-labelledby={`chain-tab-${activeIndex}`} className="mt-10 grid grid-cols-1 gap-8 border-t border-[#1E2841]/10 pt-8 md:grid-cols-2 dark:border-white/10">
                        <div>
                            <p className="font-mono text-xs tracking-[0.2em] text-[#267A47] dark:text-[#3DB268]">
                                STAGE {activeIndex + 1} OF {chainStages.length}
                            </p>
                            <h3 className="mt-3 text-2xl font-bold text-[#1E2841] dark:text-slate-50">{active.title}</h3>
                            <p className="mt-2 text-base text-slate-500 dark:text-slate-300">{active.description}</p>
                        </div>
                        <div>
                            <p className="font-mono text-xs tracking-[0.2em] text-[#267A47] dark:text-[#3DB268]">RECORDS KEPT</p>
                            <ul className="mt-3 space-y-2">
                                {active.records.map((record) => (
                                    <li key={record} className="flex items-center gap-3 text-[#1E2841] dark:text-slate-100">
                                        <span className="h-2 w-2 shrink-0 rounded-full bg-[#3DB268]" aria-hidden="true" />
                                        {record}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                <figure className="mt-6 grid overflow-hidden rounded-2xl border border-[#1E2841]/10 bg-white shadow-sm md:grid-cols-2 dark:border-white/10 dark:bg-white/5">
                    <div className="relative min-h-[260px] md:min-h-[360px]">
                        <Image
                            src="https://cdn.builder.io/api/v1/image/assets%2F58a1aba6d1a74d7587bcdc0052ba9d95%2Fb4f8b23dc6eb4bb4965ba20b81f6a0c8?format=webp&width=800&height=1200"
                            alt="BEDEBO Ethiopia mobile app showing a login screen and a dashboard with active orders"
                            fill
                            sizes="(min-width: 768px) 50vw, 100vw"
                            className="object-cover"
                        />
                    </div>
                    <figcaption className="flex flex-col justify-center p-8 md:p-12">
                        <p className="font-mono text-xs tracking-[0.2em] text-[#267A47] dark:text-[#3DB268]">THE CONNECTION</p>
                        <h3 className="mt-4 text-2xl font-bold leading-tight text-[#1E2841] md:text-3xl dark:text-slate-50">
                            Behind better markets.
                        </h3>
                        <p className="mt-4 text-base leading-relaxed text-slate-500 dark:text-slate-300">
                            BDP is the common digital coordination layer across Bedebo’s horticultural value chain and agricultural mechanization services, connecting people, produce movement and service needs.
                        </p>
                    </figcaption>
                </figure>
            </div>
        </section>
    );
}
