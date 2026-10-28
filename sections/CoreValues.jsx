"use client";

import { useEffect, useRef, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Check, Target, FileText } from "lucide-react";
import SectionTitle from "@/components/SectionTitle";

const phraseParts = ["Freshness Protected.", "Quality Assured.", "Markets Connected.", "Value Shared."];
const phraseColors = ["#27965a", "#6b4fd8", "#2f6fed", "#c27a14"];

const values = [
    { title: "Quality at Every Stage", quote: "Quality starts at the farm and must be protected until delivery.", detail: "BEDEBO's first core value is to build quality into the entire horticultural journey rather than inspect quality only when products reach the market.", color: "#27965a" },
    { title: "Farm to Market Traceability", quote: "Know the product. Know the source. Know the journey.", detail: "BEDEBO seeks to make the horticultural value chain visible and accountable from production through final market delivery.", color: "#27965a" },
    { title: "Freshness & Postharvest Loss", quote: "Protect more of what farmers produce.", detail: "The project model targets a reduction in overall farm-to-consumer losses from approximately 46% to approximately 23%, with its illustrative case showing 77 kg rather than 54 kg reaching consumers from the same 100 kg.", color: "#27965a", metrics: true },
    { title: "Digital Market Connection", quote: "Connecting the right product to the right buyer at the right time.", detail: "BEDEBO's defining capability is the integration of physical horticultural supply with digital market coordination.", color: "#27965a" },
    { title: "Fair & Transparent Value", quote: "Quality determines value—and value should be visible across the chain.", detail: "This allows BEDEBO to pursue two objectives simultaneously: premium value for premium quality and appropriate, affordable market channels for other commercially acceptable grades.", color: "#27965a" },
    { title: "Reliable & Shared Growth", quote: "A stronger value chain must create value for every critical actor.", detail: "The existing model explicitly combines CAMS-led physical service infrastructure and standards with BEDEBO-led digital coordination and market linkage. When farmers produce better, service providers operate efficiently, logistics protect quality, BEDEBO coordinates transparently and buyers receive reliable products, the entire horticulture ecosystem grows together.", color: "#27965a" },
];

const qualitySteps = [
    { title: "Vendor order", text: "Crate ID scanned out and assigned to the order." },
    { title: "Warehouse", text: "Crate count and quality verified on arrival." },
    { title: "Cold transit", text: "Custody transferred and conditions logged." },
    { title: "Union check-in", text: "Packed in a standard 20 to 25 kg crate, linked to the farmer." },
    { title: "Farm", text: "Certified harvest, graded at collection, with farmer ID and location on record." },
];

const protectionChecks = [
    { title: "Certified farm (Organic, GlobalGAP)", step: 4 },
    { title: "Graded at collection", step: 3 },
    { title: "Weight verified", step: 3 },
    { title: "Cold chain kept in range", step: 2 },
    { title: "Arrival quality check", step: 1 },
];

const coldChainSteps = [
    { title: "Crate-based handling", detail: "Standard crates cut physical damage from field to buyer." },
    { title: "Solar pre-cooling", detail: "Removes field heat soon after harvest to hold freshness." },
    { title: "Cold rooms and storage", detail: "Temperature-controlled holding at aggregation points and warehouses." },
    { title: "Coordinated transport", detail: "Pick-up and delivery slots planned against harvest and order timing." },
    { title: "Digital scheduling", detail: "Agro-Link Agents and the platform keep every actor on the same plan." },
];

function CrateQr() {
    return <QRCodeSVG value="BEDEBO-BATCH:BD-ETH-2026-004218|FARMER:BF-2048|CROP:TOMATO" size={144} marginSize={4} level="M" title="Crate trace QR code" className="size-36 max-w-full rounded-lg bg-white p-2" />;
}

function QualityTrace() {
    const [traceStep, setTraceStep] = useState(-1);
    const [traceRunning, setTraceRunning] = useState(true);

    useEffect(() => {
        if (!traceRunning) return undefined;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            setTraceStep(qualitySteps.length - 1);
            setTraceRunning(false);
            return undefined;
        }
        if (traceStep >= qualitySteps.length - 1) {
            setTraceRunning(false);
            return undefined;
        }
        const timer = window.setTimeout(() => setTraceStep((current) => current + 1), 2000);
        return () => window.clearTimeout(timer);
    }, [traceRunning, traceStep]);
    const restartTrace = () => {
        setTraceStep(-1);
        setTraceRunning(true);
    };
    const completedChecks = protectionChecks.filter(({ step }) => traceStep >= step).length;

    return (
        <article className="w-full overflow-hidden rounded-2xl border border-slate-200 border-t-4 border-t-[#3DB268] bg-white p-5 shadow-sm dark:border-slate-800 dark:border-t-[#3DB268] dark:bg-slate-900 sm:p-7">
            <div className="grid gap-7 lg:grid-cols-[270px_minmax(0,1fr)]">
                <div>
                    <button type="button" onClick={restartTrace} className="relative flex w-full cursor-pointer flex-col items-center rounded-2xl border-[1.5px] border-dashed border-[#3DB268]/50 bg-[#3DB268]/[0.04] p-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3DB268] dark:border-[#3DB268]/40 dark:bg-[#27965a]/10">
                        <div className="relative overflow-hidden rounded-lg p-2">
                            <CrateQr />
                            <span aria-hidden="true" className={`pointer-events-none absolute inset-x-2 top-0 h-0.5 bg-[#3DB268] shadow-[0_0_12px_3px_rgba(61,178,104,0.45)] ${traceRunning ? "qr-scan-line" : "opacity-0"}`} />
                        </div>
                        <span aria-live="polite" className="mt-3 text-center text-sm font-medium text-slate-600 dark:text-slate-300">{traceRunning ? "Auto-scanning crate ID BD-ETH-2026-004218" : "Crate ID BD-ETH-2026-004218 scanned"}</span>
                    </button>
                    <div className="mt-7">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                            <h3 className="text-lg font-semibold">Quality checks</h3>
                            <span className="rounded-full bg-[#27965a]/10 px-3 py-1.5 text-xs font-semibold text-[#267A47] dark:bg-[#27965a]/20 dark:text-[#8de0ae]">{completedChecks} of 5 passed</span>
                        </div>
                        <ul className="mt-4 space-y-3" aria-live="polite">
                            {protectionChecks.map(({ title, step }) => {
                                const passed = traceStep >= step;
                                return <li key={title} className="flex items-center gap-3"><span className={`flex size-6 shrink-0 items-center justify-center rounded-full transition-colors ${passed ? "bg-[#27965a] text-white" : "bg-[#27965a]/10 text-transparent dark:bg-[#27965a]/20"}`}><Check size={14} /></span><span className={`text-sm leading-5 ${passed ? "text-slate-800 dark:text-slate-100" : "text-slate-500 dark:text-slate-400"}`}>{title}</span></li>;
                            })}
                        </ul>
                    </div>
                </div>
                <div>
                    <h3 className="text-xl font-semibold">Trace back to the farmer</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">One scan follows the crate backwards through every step.</p>
                    <ol className="mt-6 space-y-0" aria-live="polite">
                        {qualitySteps.map(({ title, text }, index) => {
                            const passed = index <= traceStep;
                            return <li key={title} className="relative flex min-h-[78px] gap-3 pb-4 last:pb-0">
                                {index < qualitySteps.length - 1 && <span aria-hidden="true" className={`absolute left-3 top-7 h-[calc(100%-8px)] w-px ${index < traceStep ? "bg-[#3DB268]" : "bg-slate-200 dark:bg-slate-700"}`} />}
                                <span className={`relative z-10 flex size-6 shrink-0 items-center justify-center rounded-full transition-colors ${passed ? "bg-[#27965a] text-white" : "bg-[#27965a]/10 text-transparent dark:bg-[#27965a]/20"}`}><Check size={14} /></span>
                                <div className={`min-w-0 flex-1 rounded-xl px-3 py-2 transition-colors ${passed ? "bg-[#3DB268]/10 dark:bg-[#27965a]/20" : "bg-slate-50 dark:bg-slate-800/50"}`}>
                                    <h4 className={`text-sm font-semibold ${passed ? "text-slate-900 dark:text-white" : "text-slate-500 dark:text-slate-400"}`}>{title}</h4>
                                    <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">{text}</p>
                                </div>
                            </li>;
                        })}
                        <li className={`flex gap-3 rounded-xl bg-[#3DB268]/10 p-3 transition-opacity dark:bg-[#27965a]/20 ${traceStep >= qualitySteps.length - 1 ? "opacity-100" : "opacity-0"}`}>
                            <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-[#27965a] text-white"><Check size={14} /></span>
                            <p className="text-xs font-medium leading-5 text-[#267A47] dark:text-[#8de0ae]">Traced end to end: from the vendor shipment back to the individual farmer&apos;s harvest.</p>
                        </li>
                    </ol>
                </div>
            </div>
        </article>
    );
}

function ExecutiveSummary() {
    const summaryRef = useRef(null);
    const [brandPhrase, setBrandPhrase] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting), { rootMargin: "100px" });
        if (summaryRef.current) observer.observe(summaryRef.current);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!isVisible || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
        const timer = window.setInterval(() => setBrandPhrase((current) => (current + 1) % phraseParts.length), 5000);
        return () => window.clearInterval(timer);
    }, [isVisible]);

    return (
        <article ref={summaryRef} className="flex min-h-[220px] flex-col rounded-[20px] border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 sm:p-6">
            <span className="mb-3 flex size-10 items-center justify-center rounded-xl bg-blue-600/10 text-blue-600 dark:text-blue-400"><FileText size={21} aria-hidden="true" /></span>
            <h3 className="text-lg font-semibold">Executive Summary</h3>
            <div className="mt-2 rounded-r-xl border-l-4 px-4 py-1.5 transition-colors duration-500" role="group" aria-label="Freshness Protected. Quality Assured. Markets Connected. Value Shared." style={{ borderLeftColor: phraseColors[brandPhrase], backgroundColor: `${phraseColors[brandPhrase]}14` }}>
                {phraseParts.map((phrase, index) => <button key={phrase} type="button" aria-pressed={brandPhrase === index} onClick={() => setBrandPhrase(index)} className={`block text-left text-[13px] font-semibold leading-5 transition-opacity duration-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#27965a] ${brandPhrase === index ? "opacity-100" : "opacity-45"}`} style={{ color: phraseColors[index] }}>{phrase}</button>)}
            </div>
            <p className="mt-2 text-[13px] leading-5 text-slate-600 dark:text-slate-300">BEDEBO Ethiopia Share Company builds a digitally integrated, market-driven horticulture value chain connecting farmers, Agricultural Service Providers (ASPs), logistics and cold-chain operators, market partners, and end customers.</p>
        </article>
    );
}

export default function CoreValues() {
    const [slidePosition, setSlidePosition] = useState(1);
    const [carouselTransition, setCarouselTransition] = useState(true);
    const [cardHeight, setCardHeight] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const [isCarouselFocused, setIsCarouselFocused] = useState(false);
    const [reducedMotion, setReducedMotion] = useState(true);
    const [isCarouselVisible, setIsCarouselVisible] = useState(false);
    const [isScrolling, setIsScrolling] = useState(false);
    const carouselRef = useRef(null);
    const scrollTimer = useRef(null);
    const scrollingRef = useRef(false);
    const touchStart = useRef(null);
    const activeCardRef = useRef(null);
    const activeValue = (slidePosition - 1 + values.length) % values.length;

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => setIsCarouselVisible(entry.isIntersecting), { rootMargin: "100px" });
        if (carouselRef.current) observer.observe(carouselRef.current);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (!scrollingRef.current) {
                scrollingRef.current = true;
                setIsScrolling(true);
            }
            window.clearTimeout(scrollTimer.current);
            scrollTimer.current = window.setTimeout(() => {
                scrollingRef.current = false;
                setIsScrolling(false);
            }, 140);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.clearTimeout(scrollTimer.current);
        };
    }, []);

    useEffect(() => {
        const media = window.matchMedia("(prefers-reduced-motion: reduce)");
        const updateMotionPreference = () => setReducedMotion(media.matches);
        updateMotionPreference();
        media.addEventListener("change", updateMotionPreference);
        return () => media.removeEventListener("change", updateMotionPreference);
    }, []);

    useEffect(() => {
        const card = activeCardRef.current;
        if (!card) return undefined;
        const updateHeight = () => setCardHeight(card.getBoundingClientRect().height);
        updateHeight();
        const observer = new ResizeObserver(updateHeight);
        observer.observe(card);
        return () => observer.disconnect();
    }, [slidePosition]);

    const moveValue = (direction) => setSlidePosition((current) => {
        const next = current + direction;
        if (reducedMotion) {
            if (next <= 0) return values.length;
            if (next >= values.length + 1) return 1;
        }
        return Math.max(0, Math.min(next, values.length + 1));
    });

    const handleTrackTransitionEnd = (event) => {
        if (event.target !== event.currentTarget || event.propertyName !== "transform") return;
        if (slidePosition === 0) {
            setCarouselTransition(false);
            setSlidePosition(values.length);
            requestAnimationFrame(() => requestAnimationFrame(() => setCarouselTransition(true)));
        }
        if (slidePosition === values.length + 1) {
            setCarouselTransition(false);
            setSlidePosition(1);
            requestAnimationFrame(() => requestAnimationFrame(() => setCarouselTransition(true)));
        }
    };

    const handleValueProgressEnd = (event) => {
        if (event.target.classList.contains("core-value-progress") && isCarouselVisible && !isScrolling && !reducedMotion && !isHovered && !isCarouselFocused) moveValue(1);
    };

    const handleCarouselKeyDown = (event) => {
        if (event.key === "ArrowRight") {
            event.preventDefault();
            moveValue(1);
        } else if (event.key === "ArrowLeft") {
            event.preventDefault();
            moveValue(-1);
        }
    };

    const handleValueTouchEnd = (event) => {
        if (touchStart.current === null) return;
        const delta = event.changedTouches[0].clientX - touchStart.current;
        if (Math.abs(delta) > 45) moveValue(delta < 0 ? 1 : -1);
        touchStart.current = null;
    };

    return (
        <section id="core-values" aria-labelledby="core-values-title" className="bedebo-site-container scroll-mt-24 pb-20">
            <SectionTitle label="CORE VALUES" title="Our Core" highlight="Values" headingId="core-values-title" />
            <div className="mt-7 w-full">
                <div className="grid items-stretch gap-4 md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
                    <article className="relative flex min-h-[220px] flex-col justify-center overflow-hidden rounded-[20px] bg-gradient-to-br from-[#23a062] to-[#17613f] p-5 text-white sm:p-6">
                        <span aria-hidden="true" className="pointer-events-none absolute -right-20 -top-20 size-52 rounded-full border border-white/20" />
                        <span aria-hidden="true" className="pointer-events-none absolute -right-7 -top-7 size-32 rounded-full border border-white/20" />
                        <span className="relative mb-3 flex size-10 items-center justify-center rounded-xl bg-white/15"><Target size={21} aria-hidden="true" /></span>
                        <h3 className="relative text-lg font-semibold">Objective</h3>
                        <p className="relative mt-2 text-sm leading-6 text-white/95">To build a <strong className="border-b-2 border-white/40">digitally integrated</strong>, <strong className="border-b-2 border-white/40">quality-driven</strong> and <strong className="border-b-2 border-white/40">market-connected</strong> horticulture supply system that delivers the right product, at the right quality, to the right customer, at the right time and at a fair and transparent price.</p>
                    </article>
                    <ExecutiveSummary />
                </div>
            </div>

            <div className="mt-8 w-full">
                <div className="mb-5 text-center">
                    <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">Six values that guide us</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">Our values guide every step from farm to market.</p>
                </div>
                <div ref={carouselRef} className={`core-values-carousel ${isCarouselVisible && !isScrolling ? "is-in-view" : ""}`} role="region" aria-roledescription="carousel" aria-label="BEDEBO core values" tabIndex={0} onAnimationEnd={handleValueProgressEnd} onKeyDown={handleCarouselKeyDown} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} onFocus={() => setIsCarouselFocused(true)} onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setIsCarouselFocused(false); }} onTouchStart={(event) => { touchStart.current = event.touches[0].clientX; }} onTouchEnd={handleValueTouchEnd}>
                    <div className="core-values-viewport overflow-hidden rounded-[26px] transition-[height] duration-500 motion-reduce:transition-none" style={{ height: cardHeight ? `${cardHeight}px` : undefined }}>
                        <div className="core-values-track flex items-start" onTransitionEnd={handleTrackTransitionEnd} style={{ transform: `translateX(-${slidePosition * 100}%)`, transitionDuration: reducedMotion || !carouselTransition ? "0ms" : "700ms" }}>
                            {[{ item: values[values.length - 1], index: values.length - 1, clone: "last" }, ...values.map((item, index) => ({ item, index, clone: null })), { item: values[0], index: 0, clone: "first" }].map(({ item, index, clone }, position) => {
                                const selected = position === slidePosition;
                                return <div key={clone ?? item.title} className="basis-full shrink-0 px-1" role="group" aria-roledescription="slide" aria-label={`${index + 1} of ${values.length}`} aria-hidden={!selected}>
                                    <article ref={selected ? activeCardRef : null} className="relative overflow-hidden rounded-[22px] border border-slate-200 bg-white p-5 shadow-sm after:pointer-events-none after:absolute after:-bottom-16 after:-right-16 after:size-52 after:rounded-full after:bg-[var(--value-soft)] dark:border-slate-800 dark:bg-slate-900 sm:p-6" style={{ borderTop: `5px solid ${item.color}`, "--value-color": item.color, "--value-soft": `${item.color}1a` }}>
                                        <div className="relative z-10">
                                            <div>
                                                <div className="mb-3 flex items-center gap-3">
                                                    <span className="flex size-11 items-center justify-center rounded-xl text-base font-semibold text-white" style={{ backgroundColor: item.color }}>{index + 1}</span>
                                                    <span className="text-xs text-slate-500 dark:text-slate-400">Core value {index + 1} of 6</span>
                                                </div>
                                                <h4 className="text-xl font-semibold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-2xl">{item.title}</h4>
                                                <blockquote className="mt-2 text-base font-medium italic leading-6" style={{ color: item.color }}>“{item.quote}”</blockquote>
                                                <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-500 dark:text-slate-400">{item.detail}</p>
                                                {item.metrics && <div className="mt-4 flex flex-wrap gap-3 text-xs text-slate-700 dark:text-slate-200"><span className="min-w-36 rounded-xl px-4 py-2.5" style={{ backgroundColor: `${item.color}1a` }}><strong className="block text-lg" style={{ color: item.color }}>46% → 23%</strong><span className="text-slate-500 dark:text-slate-400">farm-to-consumer losses</span></span><span className="min-w-36 rounded-xl px-4 py-2.5" style={{ backgroundColor: `${item.color}1a` }}><strong className="block text-lg" style={{ color: item.color }}>54 kg → 77 kg</strong><span className="text-slate-500 dark:text-slate-400">reaching consumers per 100 kg</span></span><span className="basis-full text-[11px] text-slate-500 dark:text-slate-400">Project target based on an illustrative case.</span></div>}
                                            </div>
                                        </div>
                                    </article>
                                </div>;
                            })}
                        </div>
                    </div>
                    <div className="mt-5 flex items-center justify-center gap-2" role="group" aria-label="Choose a core value">
                        {values.map((item, index) => <button key={item.title} type="button" aria-label={`Show core value ${index + 1}: ${item.title}`} aria-current={activeValue === index ? "true" : undefined} onClick={() => setSlidePosition(index + 1)} className={`core-value-dot relative size-2.5 overflow-hidden rounded-full transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#27965a] ${activeValue === index ? "w-11" : "bg-slate-300 dark:bg-slate-700"}`} style={activeValue === index ? { backgroundColor: `${item.color}33` } : undefined}><span className="sr-only">{item.title}</span>{activeValue === index && <span className="core-value-progress absolute inset-0 origin-left" style={{ backgroundColor: item.color }} />}</button>)}
                    </div>
                </div>
            </div>

        </section>
    );
}

const partnerLayers = [
    { label: "PHYSICAL LAYER", title: "CAMS-led infrastructure and standards", description: "Engineering, mechanization, ASP development and the technical systems that raise productivity and standardize handling." },
    { label: "DIGITAL LAYER", title: "BEDEBO-led coordination and linkage", description: "Market linkage, transactions, logistics coordination, payment tracking and traceability across the chain." },
];

const partnerRows = [
    { actor: "Farmers / producer organizations", role: "Produce to planned demand and quality requirements", value: "Reliable production base and product origin" },
    { actor: "CAMS Engineering", role: "Standards, mechanization, ASP development, technical systems", value: "Productivity, standardization, physical service capability" },
    { actor: "ASPs", role: "Mechanization, aggregation, first-mile logistics, cold-chain services", value: "Efficient movement, freshness, reduced loss" },
    { actor: "ALAs", role: "Farmer coordination, demand aggregation, data capture, market support", value: "Last-mile digital and commercial connectivity" },
    { actor: "BEDEBO", role: "Digital coordination, market linkage, transactions, logistics coordination, traceability", value: "Integrates the entire commercial value chain" },
    { actor: "Logistics / cold-chain partners", role: "Transport, pre-cooling, cold storage, delivery", value: "Quality preservation and delivery reliability" },
    { actor: "Market buyers", role: "Demand, specifications, purchasing, feedback", value: "Market pull and commercial sustainability" },
    { actor: "Final customers", role: "Purchase and consume the products", value: "Demand for freshness, quality, safety and value" },
];

export function BedeboPartnersSection() {
    return (
        <section aria-labelledby="bedebo-partners-title" className="bedebo-site-container pb-20">
            <div className="max-w-4xl">
                <p className="font-mono text-xs tracking-[0.2em] text-[#267A47] dark:text-[#3DB268]">ABOUT BEDEBO & PARTNERS</p>
                <h2 id="bedebo-partners-title" className="mt-4 text-3xl font-bold leading-tight text-[#1E2841] sm:text-4xl dark:text-slate-50">
                    One coordinated system,<br />
                    <span className="text-[#3DB268]">many capable partners.</span>
                </h2>
                <p className="mt-5 text-base leading-relaxed text-slate-500 dark:text-slate-300">BEDEBO does not perform every function alone. Physical service infrastructure and standards come from CAMS. Digital coordination and market linkage come from BEDEBO.</p>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-2">
                {partnerLayers.map((layer) => (
                    <article key={layer.label} className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
                        <p className="font-mono text-[10px] tracking-[0.18em] text-[#267A47] dark:text-[#3DB268]">{layer.label}</p>
                        <h3 className="mt-3 text-lg font-semibold text-[#1E2841] dark:text-slate-50">{layer.title}</h3>
                        <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-300">{layer.description}</p>
                    </article>
                ))}
            </div>
            <div className="mt-8 overflow-x-auto rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
                <table className="w-full min-w-[640px] border-collapse text-left text-sm">
                    <thead>
                        <tr className="border-b border-slate-200 dark:border-slate-800">
                            <th scope="col" className="px-5 py-3 font-mono text-[10px] font-medium tracking-[0.18em] text-[#267A47] dark:text-[#3DB268]">ACTOR</th>
                            <th scope="col" className="px-5 py-3 font-mono text-[10px] font-medium tracking-[0.18em] text-[#267A47] dark:text-[#3DB268]">CORE ROLE</th>
                            <th scope="col" className="px-5 py-3 font-mono text-[10px] font-medium tracking-[0.18em] text-[#267A47] dark:text-[#3DB268]">VALUE CREATED</th>
                        </tr>
                    </thead>
                    <tbody>
                        {partnerRows.map((row) => (
                            <tr key={row.actor} className="border-b border-slate-200 last:border-b-0 dark:border-slate-800">
                                <th scope="row" className="px-5 py-3.5 font-semibold text-[#1E2841] dark:text-slate-50">{row.actor}</th>
                                <td className="px-5 py-3.5 leading-6 text-slate-500 dark:text-slate-300">{row.role}</td>
                                <td className="px-5 py-3.5 leading-6 text-slate-500 dark:text-slate-300">{row.value}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <p className="mt-4 text-xs leading-5 text-slate-500 dark:text-slate-400">ASP: Agricultural Service Provider. ALA: Agro-Link Agent. CAMS: as named in the BEDEBO project documents.</p>
            <div className="mt-10 flex w-full items-center justify-center rounded-2xl bg-[#27965a] px-5 py-4 text-center text-sm font-semibold leading-5 text-white sm:px-8 sm:py-5 sm:text-base">Coordinating the journey from production to market</div>
        </section>
    );
}

const agriculturalServices = [
    { title: "Threshing", description: "Harvest and post-harvest processing services." },
    { title: "Mechanization", description: "Agricultural Service Providers (ASPs) supply machinery and operators." },
    { title: "Aggregation services", description: "First-mile collection and handling for producers." },
    { title: "Technical standards", description: "Engineering standards and service development with CAMS." },
];

export function AgriculturalServicesSection() {
    return (
        <section aria-labelledby="agricultural-services-title" className="bg-[#1A3327] py-20 text-white">
            <div className="bedebo-site-container">
                <div className="max-w-4xl">
                    <p className="font-mono text-xs tracking-[0.2em] text-[#3DB268]">AGRICULTURAL SERVICES</p>
                    <h2 id="agricultural-services-title" className="mt-4 text-3xl font-bold leading-tight sm:text-4xl">
                        Supporting services, delivered with partners.
                    </h2>
                    <p className="mt-5 text-base leading-relaxed text-slate-300">
                        Threshing, mechanization and related services remain part of BEDEBO&apos;s work. They support the production base behind the premium offer.
                    </p>
                </div>
                <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {agriculturalServices.map((service) => (
                        <article key={service.title} className="rounded-lg border border-white/10 bg-[#132A1F] p-5">
                            <h3 className="text-base font-semibold text-white">{service.title}</h3>
                            <p className="mt-2 text-sm leading-relaxed text-slate-300">{service.description}</p>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}

export function ColdChainSection() {
    return (
        <section aria-labelledby="cold-chain-title" className="bedebo-site-container pb-20">
            <div className="max-w-4xl">
                <p className="font-mono text-xs tracking-[0.2em] text-[#267A47] dark:text-[#3DB268]">COLD CHAIN & LOGISTICS</p>
                <h2 id="cold-chain-title" className="mt-4 text-3xl font-bold leading-tight text-[#1E2841] sm:text-4xl dark:text-slate-50">
                    Freshness protected from<br />
                    <span className="text-[#3DB268]">Farm gate to delivery</span>
                </h2>
                <p className="mt-5 text-base leading-relaxed text-slate-500 dark:text-slate-300">Fresh horticultural products lose value quickly when harvesting, handling, transport, storage and market access are poorly coordinated. BEDEBO treats loss reduction as value creation, not merely as an operational issue.</p>
            </div>
            <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:items-stretch">
                <ul className="divide-y divide-slate-200 border-y border-slate-200 dark:divide-slate-800 dark:border-slate-800">
                    {coldChainSteps.map((step) => (
                        <li key={step.title} className="grid gap-2 py-4 sm:grid-cols-[8rem_minmax(0,1fr)] sm:gap-6">
                            <h3 className="text-sm font-semibold text-[#1E2841] dark:text-slate-50">{step.title}</h3>
                            <p className="text-sm leading-6 text-slate-500 dark:text-slate-300">{step.detail}</p>
                        </li>
                    ))}
                </ul>
                <figure className="min-h-[360px]">
                    <div className="flex h-full min-h-[360px] items-end rounded-2xl border border-dashed border-[#3DB268]/60 bg-[repeating-linear-gradient(135deg,rgba(61,178,104,0.08)_0_12px,transparent_12px_24px)] p-5 dark:bg-[repeating-linear-gradient(135deg,rgba(61,178,104,0.12)_0_12px,transparent_12px_24px)]">
                        <figcaption className="max-w-md rounded-xl bg-white p-4 shadow-sm dark:bg-slate-900">
                            <p className="font-mono text-[10px] tracking-[0.18em] text-[#267A47] dark:text-[#3DB268]">PHOTO SLOT - COLD CHAIN</p>
                            <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-300">Pre-cooled crates being loaded into a temperature-controlled vehicle at a BEDEBO cold room.</p>
                        </figcaption>
                    </div>
                </figure>
            </div>
        </section>
    );
}

export function QualityTraceabilitySection() {
    return (
        <section aria-labelledby="quality-traceability-title" className="bedebo-site-container pb-20">
            <div className="max-w-4xl">
                <p className="font-mono text-xs tracking-[0.2em] text-[#267A47] dark:text-[#3DB268]">QUALITY & TRACEABILITY</p>
                <h2 id="quality-traceability-title" className="mt-4 text-3xl font-bold leading-tight text-[#1E2841] sm:text-4xl dark:text-slate-50">
                    Know the product. <span className="text-[#3DB268]">Know the</span><br />
                    <span className="text-[#3DB268]">source.</span> Know the journey.
                </h2>
                <div className="mt-6 max-w-2xl border-l-4 border-[#3DB268] pl-5">
                    <h3 className="text-lg font-semibold text-[#1E2841] dark:text-slate-50">The trust layer, farm to table</h3>
                    <p className="mt-1 text-base leading-relaxed text-slate-500 dark:text-slate-300">Customers can trust what they eat and verify where it came from.</p>
                </div>
            </div>
            <div className="mt-10">
                <QualityTrace />
            </div>
        </section>
    );
}
