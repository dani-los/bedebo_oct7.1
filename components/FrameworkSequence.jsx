"use client"
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import SectionTitle from "@/components/SectionTitle";

const valueFrameworkSteps = [
    { number: "01", title: "Farm", description: "Quality production and organized farmers" },
    { number: "02", title: "Harvest", description: "Standardized harvesting and handling" },
    { number: "03", title: "Aggregate", description: "Crate-based collection and quality control" },
    { number: "04", title: "Cool", description: "Pre-cooling and cold storage" },
    { number: "05", title: "Move", description: "Coordinated and traceable logistics" },
    { number: "06", title: "Grade", description: "Quality classification and market matching" },
    { number: "07", title: "Connect", description: "BEDEBO digital market linkage" },
    { number: "08", title: "Deliver", description: "Reliable supply to the right customer" },
];

const sequenceImages = [
    { src: "https://cdn.builder.io/api/v1/image/assets%2F46dd14c24f0848789ec888965e0928ea%2Ffc47594adc9d417cb6f52f035bec2be2?format=webp&width=800&height=1200", alt: "Rows of produce growing in a field under a cloudy sky" },
    { src: "https://cdn.builder.io/api/v1/image/assets%2F46dd14c24f0848789ec888965e0928ea%2F62df53d2e20d446698adee3e1995f9ea?format=webp&width=800&height=1200", alt: "Workers inspecting tomatoes in green crates" },
    { src: "https://cdn.builder.io/api/v1/image/assets%2F46dd14c24f0848789ec888965e0928ea%2Ffc823da9dd71405c954e144fa5a7de74?format=webp&width=800&height=1200", alt: "Tomato crates stacked in a cold storage room" },
    { src: "https://cdn.builder.io/api/v1/image/assets%2F46dd14c24f0848789ec888965e0928ea%2Fa599e37c06b041869dd3bcefa658dacb?format=webp&width=800&height=1200", alt: "Cabbage crates being loaded into a refrigerated truck" },
    { src: "https://cdn.builder.io/api/v1/image/assets%2F46dd14c24f0848789ec888965e0928ea%2F4f054748e2564e448d811735c5fe7cd6?format=webp&width=800&height=1200", alt: "Crates being checked at the back of a BEDEBO refrigerated truck" },
];

const sequence = [
    { cardIndexes: [0], imageIndex: 0 },
    { cardIndexes: [2], imageIndex: 2 },
    { cardIndexes: [3], imageIndex: 3 },
    { cardIndexes: [5], imageIndex: 1 },
    { cardIndexes: [4, 7], imageIndex: 4 },
];

const cardClassName = "rounded-xl border border-[#1E2841]/10 bg-slate-50 p-4 shadow-sm dark:border-white/10 dark:bg-white/5";
const overlayCardClassName = `${cardClassName} dark:bg-slate-900`;

// The first viewport of scrolling shows the complete section before the sequence starts; each step then takes half a viewport.
const LEAD_VH = 100;
const STEP_VH = 50;
const SEQUENCE_START = LEAD_VH / (sequence.length * STEP_VH);

function randomPlacement() {
    return {
        left: `calc((100% - 18rem) * ${Math.random()})`,
        top: `${5 + Math.random() * 45}%`,
    };
}

function randomTop() {
    return `${5 + Math.random() * 45}%`;
}

export default function FrameworkSequence() {
    const sectionRef = useRef(null);
    const [progress, setProgress] = useState(-1);
    const [placement, setPlacement] = useState(null);

    useEffect(() => {
        let frame = 0;

        const update = () => {
            frame = 0;
            const section = sectionRef.current;
            if (!section) return;
            const range = section.offsetHeight - window.innerHeight;
            const scrolled = -section.getBoundingClientRect().top;
            setProgress(scrolled / range);
        };

        const requestUpdate = () => {
            if (!frame) frame = requestAnimationFrame(update);
        };

        update();
        window.addEventListener("scroll", requestUpdate, { passive: true });
        window.addEventListener("resize", requestUpdate);

        return () => {
            window.removeEventListener("scroll", requestUpdate);
            window.removeEventListener("resize", requestUpdate);
            if (frame) cancelAnimationFrame(frame);
        };
    }, []);

    const inSequence = progress >= SEQUENCE_START && progress < 1;
    const localProgress = (progress - SEQUENCE_START) / (1 - SEQUENCE_START);
    const activeIndex = Math.min(sequence.length - 1, Math.max(0, Math.floor(localProgress * sequence.length)));
    const activeStep = sequence[activeIndex];

    useEffect(() => {
        if (!inSequence) return;
        setPlacement(sequence[activeIndex].cardIndexes.length > 1 ? { top: randomTop() } : randomPlacement());
    }, [activeIndex, inSequence]);

    return (
        <section
            ref={sectionRef}
            aria-labelledby="value-framework-heading"
            className="value-framework relative"
            style={{ height: `${LEAD_VH + sequence.length * STEP_VH}vh` }}
        >
            <div className="sticky top-0 flex h-screen flex-col justify-start overflow-hidden pt-8 md:pt-10">
                <div className={`absolute inset-0 overflow-hidden transition-opacity duration-500 ${inSequence ? "bg-slate-100 dark:bg-slate-900" : ""}`}>
                    {sequenceImages.map((image, index) => (
                        <Image
                            key={image.src}
                            src={image.src}
                            alt={image.alt}
                            fill
                            sizes="100vw"
                            className={`object-cover transition-opacity duration-500 ${inSequence && activeStep.imageIndex === index ? "opacity-100" : "opacity-0"}`}
                        />
                    ))}
                </div>

                <div className={`bedebo-site-container relative transition-opacity duration-500 ${inSequence ? "pointer-events-none opacity-0" : "opacity-100"}`}>
                    <SectionTitle
                        label="THE BEDEBO FARM-TO-MARKET VALUE FRAMEWORK"
                        title={<>We coordinate the whole<br />journey,</>}
                        highlight="not just the sale."
                        description="BEDEBO creates value by protecting quality, cutting post-harvest loss and linking each lot to the right customer. Eight steps carry produce from the farm to the buyer's door."
                        alignment="left"
                        headingId="value-framework-heading"
                    />

                    <ol className={`mt-10 grid grid-cols-1 gap-4 transition-opacity duration-500 sm:grid-cols-2 lg:grid-cols-4 ${inSequence ? "pointer-events-none opacity-0" : "opacity-100"}`}>
                        {valueFrameworkSteps.map((step) => (
                            <li key={step.number} className={cardClassName}>
                                <span className="inline-block rounded-full bg-[#267A47] px-2.5 py-0.5 font-mono text-[11px] tracking-widest text-white">{step.number}</span>
                                <h3 className="mt-2 mb-1 text-base font-bold text-[#1E2841] dark:text-slate-50">{step.title}</h3>
                                <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-300">{step.description}</p>
                            </li>
                        ))}
                    </ol>
                </div>

                {inSequence && activeStep.cardIndexes.length > 1 && (
                    <div
                        className="absolute inset-x-0 flex flex-col gap-4 px-4 sm:flex-row sm:justify-between sm:px-[6%]"
                        style={{ top: placement?.top ?? "30%" }}
                    >
                        {activeStep.cardIndexes.map((cardIndex) => {
                            const step = valueFrameworkSteps[cardIndex];
                            return (
                                <div key={step.number} className={`${overlayCardClassName} w-full sm:w-72`}>
                                    <h3 className="mt-2 mb-1 text-base font-bold text-[#1E2841] dark:text-slate-50">{step.title}</h3>
                                    <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-300">{step.description}</p>
                                </div>
                            );
                        })}
                    </div>
                )}

                {inSequence && activeStep.cardIndexes.length === 1 && (
                    <div
                        className="absolute w-72 max-w-[calc(100%-2rem)]"
                        style={placement ?? { left: "50%", top: "30%" }}
                    >
                        <div className={overlayCardClassName}>
                            <h3 className="mt-2 mb-1 text-base font-bold text-[#1E2841] dark:text-slate-50">{valueFrameworkSteps[activeStep.cardIndexes[0]].title}</h3>
                            <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-300">{valueFrameworkSteps[activeStep.cardIndexes[0]].description}</p>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
