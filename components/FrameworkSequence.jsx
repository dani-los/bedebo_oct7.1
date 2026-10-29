"use client"
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import SectionTitle from "@/components/SectionTitle";

const valueFrameworkSteps = [
    { title: "Farm", description: "Quality production and organized farmers" },
    { title: "Harvest", description: "Standardized harvesting and handling" },
    { title: "Aggregate", description: "Crate-based collection and quality control" },
    { title: "Cool", description: "Pre-cooling and cold storage" },
    { title: "Move", description: "Coordinated and traceable logistics" },
    { title: "Grade", description: "Quality classification and market matching" },
    { title: "Connect", description: "BEDEBO digital market linkage" },
    { title: "Deliver", description: "Reliable supply to the right customer" },
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

export default function FrameworkSequence() {
    const sectionRef = useRef(null);
    const [progress, setProgress] = useState(-1);

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

    const inSequence = progress >= 0 && progress < 1;
    const activeIndex = Math.min(sequence.length - 1, Math.max(0, Math.floor(progress * sequence.length)));
    const activeStep = sequence[activeIndex];

    return (
        <section
            ref={sectionRef}
            aria-labelledby="value-framework-heading"
            className="value-framework relative"
            style={{ height: `${(sequence.length + 1) * 100}vh` }}
        >
            <div className="sticky top-0 h-screen overflow-hidden">
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

                <div className="bedebo-site-container relative flex h-full flex-col gap-4 py-6">
                    <div className={`transition-opacity duration-500 ${inSequence ? "pointer-events-none opacity-0" : "opacity-100"}`}>
                        <SectionTitle
                            label="THE BEDEBO FARM-TO-MARKET VALUE FRAMEWORK"
                            title={<>We coordinate the whole<br />journey,</>}
                            highlight="not just the sale."
                            description="BEDEBO creates value by protecting quality, cutting post-harvest loss and linking each lot to the right customer. Eight steps carry produce from the farm to the buyer's door."
                            alignment="left"
                            headingId="value-framework-heading"
                        />
                    </div>

                    <div className="flex min-h-0 flex-1 items-center justify-center">
                        {inSequence && (
                            <ul className="grid w-full max-w-sm gap-3">
                                {activeStep.cardIndexes.map((cardIndex) => {
                                    const step = valueFrameworkSteps[cardIndex];
                                    return (
                                        <li key={step.title} className="rounded-xl border border-[#1E2841]/10 bg-slate-50 p-4 shadow-lg dark:border-white/10 dark:bg-slate-900/90">
                                            <h3 className="mb-1 text-base font-bold text-[#1E2841] dark:text-slate-50">{step.title}</h3>
                                            <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-300">{step.description}</p>
                                        </li>
                                    );
                                })}
                            </ul>
                        )}
                    </div>

                    <ol className={`grid shrink-0 grid-cols-2 gap-3 transition-opacity duration-500 md:grid-cols-4 ${inSequence ? "pointer-events-none opacity-0" : "opacity-100"}`}>
                        {valueFrameworkSteps.map((step) => (
                            <li key={step.title} className="rounded-xl border border-[#1E2841]/10 bg-slate-50 p-3 shadow-sm dark:border-white/10 dark:bg-white/5">
                                <h3 className="mb-1 text-base font-bold text-[#1E2841] dark:text-slate-50">{step.title}</h3>
                                <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-300">{step.description}</p>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        </section>
    );
}
