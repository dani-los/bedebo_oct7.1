"use client"
import SectionTitle from "@/components/SectionTitle";
import { useThemeContext } from "@/context/ThemeContext";
import { companiesLogo } from "@/data/companiesLogo";
import { featuresData } from "@/data/featuresData";
import OurImpact from "@/sections/OurImpact";
import GetInvolved from "@/sections/GetInvolved";
import CoreValues from "@/sections/CoreValues";
import OurStory from "@/sections/OurStory";
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

            <OurStory />

            <section id="value-propositions" aria-label="Value propositions" className="scroll-mt-20 pt-16 pb-12 md:pt-20 md:pb-8">
            <OurStory
                embedded
                id="value-proposition-1"
                idSuffix="-copy"
                label="VALUE PROPOSITIONS"
                title="Farm side —"
                highlight="Grow for higher-value markets"
                description="BEDEBO's first core value is to build quality into the entire horticultural journey rather than inspect quality only when products reach the market, It can connect production planning, technical support, grading, transparent transactions and suitable buyers"
                quote="Grow Quality. Access Better Markets. Earn More from Every Harvest."
                image="https://cdn.builder.io/api/v1/image/assets%2F58a1aba6d1a74d7587bcdc0052ba9d95%2Fcc748ff1df7140e383d1591a5b5ad7ec?format=webp&width=800&height=1200"
                imageAlt="Workers harvesting tomatoes into green crates in a greenhouse field"
                chamferedImage
            />

            <OurStory
                embedded
                id="value-proposition-2"
                idSuffix="-copy-2"
                label=""
                title="Vendor side —"
                highlight="Source better, sell with confidence"
                description="BEDEBO's first core value is to build quality into the entire horticultural journey rather than inspect quality only when products reach the market, It can connect production planning, technical support, grading, transparent transactions and suitable buyers"
                quote="Consistent Quality. Dependable Supply. Stronger Market Opportunities."
                image="https://cdn.builder.io/api/v1/image/assets%2F58a1aba6d1a74d7587bcdc0052ba9d95%2F5247a03fce49458999b38320a60a0908?format=webp&width=800&height=1200"
                imageAlt="Produce processing facility with a worker inspecting produce in green crates"
                chamferedImage
                reverse
            />

            <OurStory
                embedded
                id="value-proposition-3"
                idSuffix="-copy-3"
                label=""
                title="Farm side —"
                highlight="Grow for higher-value markets"
                description="BEDEBO's first core value is to build quality into the entire horticultural journey rather than inspect quality only when products reach the market, It can connect production planning, technical support, grading, transparent transactions and suitable buyers"
                quote="Grow Quality. Access Better Markets. Earn More from Every Harvest."
                image="https://cdn.builder.io/api/v1/image/assets%2F58a1aba6d1a74d7587bcdc0052ba9d95%2Fcc748ff1df7140e383d1591a5b5ad7ec?format=webp&width=800&height=1200"
                imageAlt="Workers harvesting tomatoes into green crates in a greenhouse field"
                chamferedImage
            />
            </section>

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

            <CoreValues />

            <OurBlogs />


        </>
    );
}
