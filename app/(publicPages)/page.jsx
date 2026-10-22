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

            <OurStory />

            <OurStory idSuffix="-copy" />

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
