"use client"
import SectionTitle from "@/components/SectionTitle";
import { useThemeContext } from "@/context/ThemeContext";
import { companiesLogo } from "@/data/companiesLogo";
import { featuresData } from "@/data/featuresData";
import OurImpact from "@/sections/OurImpact";
import GetInvolved from "@/sections/GetInvolved";
import CoreValues from "@/sections/CoreValues";
import OurStory from "@/sections/OurStory";
import PremiumBuyers from "@/sections/PremiumBuyers";
import OurBlogs from "@/sections/OurBlogs";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Marquee from "react-fast-marquee";
import { useEffect, useRef } from "react";

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

const farmerBenefits = [
    { title: "Production planning", description: "Grow what the market has asked for, in the volumes and weeks it needs." },
    { title: "Technical and service support", description: "Access to mechanization, aggregation and cold-chain services through partners." },
    { title: "Grading you can see", description: "Quality results are recorded and shared, so you understand how your produce is valued." },
    { title: "Transparent transactions", description: "Prices, volumes and payment status are visible to you." },
];

const vendorBenefits = [
    { title: "Graded produce", description: "Transparent grading so you know what you are buying before it arrives." },
    { title: "Supply visibility", description: "See expected volumes and availability to plan purchasing." },
    { title: "Quality-linked buying", description: "Buying arrangements that reward consistent quality." },
    { title: "Fewer rejections, better margins", description: "Predictable sourcing and clear specifications reduce returns and waste." },
];

const yieldComparison = [
    { label: "Typical fragmented chain", value: "54 kg", lost: "46%", width: "46%" },
    { label: "BEDEBO coordinated chain (target)", value: "77 kg", lost: "23%", width: "23%" },
];

export default function Page() {
    const { theme } = useThemeContext();
    const heroRef = useRef(null);

    useEffect(() => {
        const hero = heroRef.current;
        if (!hero || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

        const setSpotlight = (visible) => hero.style.setProperty("--spot-radius", visible ? "180px" : "0px");

        const handlePointerMove = (event) => {
            const rect = hero.getBoundingClientRect();
            const isInside = event.clientX >= rect.left && event.clientX <= rect.right && event.clientY >= rect.top && event.clientY <= rect.bottom;
            if (isInside) {
                hero.style.setProperty("--mouse-x", `${event.clientX - rect.left}px`);
                hero.style.setProperty("--mouse-y", `${event.clientY - rect.top}px`);
            }
            setSpotlight(isInside);
        };
        const handlePointerOut = (event) => {
            if (!event.relatedTarget) setSpotlight(false);
        };

        window.addEventListener("pointermove", handlePointerMove, { passive: true });
        document.addEventListener("pointerout", handlePointerOut);
        return () => {
            window.removeEventListener("pointermove", handlePointerMove);
            document.removeEventListener("pointerout", handlePointerOut);
        };
    }, []);

    return (
        <>
            <section
                ref={heroRef}
                className="bedebo-hero"
                aria-labelledby="hero-heading"
                style={{ backgroundImage: "url('https://cdn.builder.io/api/v1/image/assets%2F58a1aba6d1a74d7587bcdc0052ba9d95%2F6400563790c14afb90ddef24e75f9221?format=webp&width=800&height=1200')" }}
            >
                <div className="bedebo-hero-content bedebo-site-container">
                    <div className="bedebo-hero-text">
                        <h1 id="hero-heading" className="bedebo-hero-heading">
                            Premium Produce.<br className="bedebo-desktop-break" />{" "}
                            Trusted Quality.<br className="bedebo-desktop-break" />{" "}
                            <span>Connected Markets</span>
                        </h1>
                        <p className="bedebo-hero-subheadline">
                            Freshness protected from farm to market
                        </p>
                        <p className="bedebo-hero-copy">
                            Connecting Ethiopian growers and quality-assured fruits and vegetables with premium supermarkets, hotels, catering businesses and professional vendors through a digitally coordinated value chain
                        </p>
                        <button type="button" className="bedebo-hero-button">
                            Download Bedebo Apps
                            <ArrowRight aria-hidden="true" size={22} strokeWidth={2} />
                        </button>
                    </div>
                </div>
            </section>

            <section className="bedebo-logo-strip pt-8">
                <div className="bedebo-site-container">
                    <h3 className="pb-7 text-center text-base font-medium text-slate-400">
                        Trusting by leading brands, including —
                    </h3>
                    <div className="bedebo-logo-marquee">
                        <Marquee className="mx-auto max-w-5xl pb-12" gradient={true} speed={25} gradientColor={theme === "dark" ? "#0A120E" : "#fff"}>
                            <div className="flex items-center justify-center">
                                {[...companiesLogo, ...companiesLogo].map((company, index) => (
                                    <Image key={index} className="bedebo-logo mx-11" src={company.logo} alt={company.name} width={100} height={100} />
                                ))}
                            </div>
                        </Marquee>
                    </div>
                </div>
            </section>

            <section aria-labelledby="value-framework-heading" className="value-framework pt-16 pb-12 md:pt-20 md:pb-16">
                <div className="bedebo-site-container">
                    <SectionTitle
                        label="THE BEDEBO FARM-TO-MARKET VALUE FRAMEWORK"
                        title={<>We coordinate the whole<br />journey,</>}
                        highlight="not just the sale."
                        description="BEDEBO creates value by protecting quality, cutting post-harvest loss and linking each lot to the right customer. Eight steps carry produce from the farm to the buyer's door."
                        alignment="left"
                        headingId="value-framework-heading"
                    />
                    <ol className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {valueFrameworkSteps.map((step) => (
                            <li key={step.number} className="rounded-xl border border-[#1E2841]/10 bg-slate-50 p-4 shadow-sm dark:border-white/10 dark:bg-white/5">
                                <span className="inline-block rounded-full bg-[#267A47] px-2.5 py-0.5 font-mono text-[11px] tracking-widest text-white">{step.number}</span>
                                <h3 className="mt-2 mb-1 text-base font-bold text-[#1E2841] dark:text-slate-50">{step.title}</h3>
                                <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-300">{step.description}</p>
                            </li>
                        ))}
                    </ol>
                </div>
            </section>

            <section id="value-propositions" aria-label="Value propositions" className="scroll-mt-20 pt-16 pb-12 md:pt-20 md:pb-8">
            <div id="value-proposition-1" className="pb-16 md:pb-24">
                <div className="bedebo-site-container grid grid-cols-1 items-start gap-14 md:grid-cols-2 lg:gap-20">
                    <div>
                        <p className="font-mono text-xs tracking-[0.2em] text-[#267A47] dark:text-[#3DB268]">VALUE PROPOSITIONS</p>
                        <h2 className="mt-4 text-3xl font-bold leading-tight text-[#1E2841] md:text-4xl dark:text-slate-50">
                            Farm side — <span className="text-[#3DB268]">Grow for higher-value markets</span>
                        </h2>
                        <p className="mt-5 text-base leading-relaxed text-slate-500 dark:text-slate-300">
                            BEDEBO&apos;s first core value is to build quality into the entire horticultural journey rather than inspect quality only when products reach the market, It can connect production planning, technical support, grading, transparent transactions and suitable buyers
                        </p>
                        <ul className="mt-8 divide-y divide-[#1E2841]/10 border-y border-[#1E2841]/10 dark:divide-white/10 dark:border-white/10">
                            {farmerBenefits.map((benefit) => (
                                <li key={benefit.title} className="py-4">
                                    <p className="flex items-center gap-3 font-semibold text-[#1E2841] dark:text-slate-50">
                                        <span className="h-2 w-2 shrink-0 rounded-full bg-[#3DB268]" aria-hidden="true" />
                                        {benefit.title}
                                    </p>
                                    <p className="mt-1 pl-5 text-sm leading-relaxed text-slate-500 dark:text-slate-300">{benefit.description}</p>
                                </li>
                            ))}
                        </ul>
                        <blockquote className="mt-8 border-l-4 border-[#3DB268] pl-5 text-lg font-semibold text-[#1E2841] dark:text-slate-50">
                            Grow Quality. Access Better Markets. Earn More from Every Harvest.
                        </blockquote>
                        <p className="mt-8 rounded-lg border border-[#3DB268]/30 bg-[#3DB268]/10 px-4 py-3 text-sm text-[#1E2841] dark:text-slate-100">
                            Better quality-linked returns are an opportunity, not a guarantee of premium prices for every farmer.
                        </p>
                        <button type="button" className="mt-6 rounded-full bg-[#267A47] px-6 py-3 font-semibold text-white transition-colors hover:bg-[#1E663A]">
                            Register as a grower
                        </button>
                    </div>

                    <div>
                        <div className="relative aspect-[7/4] overflow-hidden shadow-[0_24px_60px_rgba(15,23,42,0.16)]" style={{ borderRadius: "0 48px 0 48px" }}>
                            <Image
                                src="https://cdn.builder.io/api/v1/image/assets%2F58a1aba6d1a74d7587bcdc0052ba9d95%2Fcc748ff1df7140e383d1591a5b5ad7ec?format=webp&width=800&height=1200"
                                alt="Workers harvesting tomatoes into green crates in a greenhouse field"
                                fill
                                sizes="(min-width: 768px) 50vw, 100vw"
                                className="object-cover"
                            />
                        </div>
                        <div className="mt-6 rounded-2xl border border-[#1E2841]/10 bg-slate-50 p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
                            <p className="font-semibold text-[#1E2841] dark:text-slate-50">From the same 100 kg, more reaches the consumer</p>
                            <div className="mt-5 space-y-5">
                                {yieldComparison.map((row) => (
                                    <div key={row.label}>
                                        <div className="flex justify-between text-sm text-slate-600 dark:text-slate-300">
                                            <span>{row.label}</span>
                                            <span className="font-semibold text-[#1E2841] dark:text-slate-50">≈ {row.value}</span>
                                        </div>
                                        <div className="mt-2 h-7 overflow-hidden rounded bg-[#1E2841]/10 dark:bg-white/10">
                                            <div className="flex h-full items-center rounded bg-[#3DB268] px-3 font-mono text-xs text-white" style={{ width: row.width }}>
                                                {row.lost} lost
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <p className="mt-5 text-xs text-slate-500 dark:text-slate-400">
                                Source: BEDEBO project model. Figures are a modelled target, not a measured result.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div id="value-proposition-2" className="pb-16 md:pb-24">
                <div className="bedebo-site-container grid grid-cols-1 items-start gap-14 md:grid-cols-2 lg:gap-20">
                    <div className="md:order-last">
                        <h2 className="text-3xl font-bold leading-tight text-[#1E2841] md:text-4xl dark:text-slate-50">
                            Vendor side — <span className="text-[#3DB268]">Better Source, sell with confidence</span>
                        </h2>
                        <p className="mt-5 text-base leading-relaxed text-slate-500 dark:text-slate-300">
                            BEDEBO&apos;s first core value is to build quality into the entire horticultural journey rather than inspect quality only when products reach the market, It can connect production planning, technical support, grading, transparent transactions and suitable buyers
                        </p>
                        <ul className="mt-8 divide-y divide-[#1E2841]/10 border-y border-[#1E2841]/10 dark:divide-white/10 dark:border-white/10">
                            {vendorBenefits.map((benefit) => (
                                <li key={benefit.title} className="py-4">
                                    <p className="flex items-center gap-3 font-semibold text-[#1E2841] dark:text-slate-50">
                                        <span className="h-2 w-2 shrink-0 rounded-full bg-[#3DB268]" aria-hidden="true" />
                                        {benefit.title}
                                    </p>
                                    <p className="mt-1 pl-5 text-sm leading-relaxed text-slate-500 dark:text-slate-300">{benefit.description}</p>
                                </li>
                            ))}
                        </ul>
                        <blockquote className="mt-8 border-l-4 border-[#3DB268] pl-5 text-lg font-semibold text-[#1E2841] dark:text-slate-50">
                            Consistent Quality. Dependable Supply. Stronger Market Opportunities.
                        </blockquote>
                        <button type="button" className="mt-6 rounded-full bg-[#267A47] px-6 py-3 font-semibold text-white transition-colors hover:bg-[#1E663A]">
                            Apply as a vendor
                        </button>
                    </div>

                    <div className="md:order-first">
                        <div className="relative aspect-[7/4] overflow-hidden shadow-[0_24px_60px_rgba(15,23,42,0.16)]" style={{ borderRadius: "0 48px 0 48px" }}>
                            <Image
                                src="https://cdn.builder.io/api/v1/image/assets%2F58a1aba6d1a74d7587bcdc0052ba9d95%2F5247a03fce49458999b38320a60a0908?format=webp&width=800&height=1200"
                                alt="Produce processing facility with a worker inspecting produce in green crates"
                                fill
                                sizes="(min-width: 768px) 50vw, 100vw"
                                className="object-cover"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <PremiumBuyers />
            </section>

            <CoreValues />

            <OurStory />

            <section id="solutions" className="scroll-mt-24">
                <div className="bedebo-site-container">
                    <SectionTitle label="OUR SOLUTIONS" title="Our" highlight="Solutions" description="We have a wide range of solutions that we have provided" headingId="solutions-title" />

                    <div className="mt-10 grid grid-cols-1 items-stretch gap-6 md:grid-cols-2 md:gap-4 lg:grid-cols-4">
                        {featuresData.map((feature) => (
                            <div key={feature.title} className="flex h-full min-h-[320px] flex-col items-center space-y-3 rounded-xl border border-slate-200 bg-white p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-[#3DB268]/50 hover:shadow-lg dark:border-slate-800 dark:bg-slate-800/20">
                                <feature.icon className="mt-4 size-10 text-[#3DB268]" strokeWidth={1.3} />
                                <h3 className="min-h-[2.6em] text-base font-medium leading-[1.3]">{feature.title}</h3>
                                <p className="text-[0.9rem] leading-[1.6] text-slate-400">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <OurImpact />

            <GetInvolved />

            <OurBlogs />


        </>
    );
}
