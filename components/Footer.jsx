"use client";

import { ChevronDown, Mail, MapPin, Phone } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const roles = ["Premium buyer", "Vendor", "Farmer", "Partner"];
const produceOptions = ["Tomato", "Onion", "Cabbage", "Papaya", "Pepper", "Green bean", "Other"];
const volumeOptions = ["Not sure yet", "Less than 1 tonne", "1–5 tonnes", "5–20 tonnes", "20+ tonnes"];

const inputClassName = "h-11 w-full rounded-md border border-white/15 bg-[#0c1812] px-4 text-sm text-white placeholder:text-white/35 outline-none transition-colors focus-visible:border-[#3DB268]";

export default function Footer() {
    const sectionRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);
    const [selectedRole, setSelectedRole] = useState(roles[0]);
    const [selectedProduce, setSelectedProduce] = useState(["Tomato"]);

    useEffect(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            setIsVisible(true);
            return;
        }

        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
                observer.disconnect();
            }
        }, { threshold: 0.08 });

        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    const toggleProduce = (item) => {
        setSelectedProduce((current) => (current.includes(item) ? current.filter((value) => value !== item) : [...current, item]));
    };

    return (
        <footer
            id="contact"
            ref={sectionRef}
            aria-labelledby="contact-title"
            className={`relative isolate mt-12 scroll-mt-24 overflow-hidden bg-[#1A3327] text-white transition-all duration-700 ease-out motion-reduce:translate-y-0 motion-reduce:transition-none motion-reduce:opacity-100 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
        >
            <div className="bedebo-site-container relative z-10 flex flex-col pb-6 pt-20">
                <div className="grid grid-cols-1 items-start gap-14 lg:grid-cols-2 lg:gap-20">
                    <div>
                        <p className="font-mono text-xs tracking-[0.2em] text-[#3DB268]">CONTACT / BECOME A PARTNER</p>
                        <h2 id="contact-title" className="mt-4 text-4xl font-extrabold leading-[1.1] tracking-tight text-[#3DB268] md:text-5xl">
                            Tell us what you need,<br />
                            or what you can<br />
                            supply.
                        </h2>
                        <p className="mt-6 max-w-xl text-base leading-relaxed text-white/75">
                            We reply to qualified business enquiries from buyers, vendors, growers and partners. Choose the option that fits you and we will route your message to the right team.
                        </p>

                        <address className="mt-10 space-y-5 not-italic">
                            <div className="flex items-start gap-4">
                                <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-white/40 bg-white/10">
                                    <MapPin size={20} strokeWidth={1.7} aria-hidden="true" />
                                </span>
                                <p className="pt-2 text-sm leading-6 text-white/95">HQ: Legehar, ORDA Building, 15th Floor, Addis Ababa, Ethiopia</p>
                            </div>
                            <div className="flex items-start gap-4">
                                <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-white/40 bg-white/10">
                                    <Phone size={19} strokeWidth={1.7} aria-hidden="true" />
                                </span>
                                <p className="pt-1 text-sm leading-6 text-white/95">
                                    <a href="tel:+25199202640" className="transition-colors hover:text-[#75D59A]">+251-99-202-640</a>
                                    <br />
                                    <a href="tel:+251115580006" className="transition-colors hover:text-[#75D59A]">+251-11-558-0006</a>
                                    <span> / </span>
                                    <a href="tel:+2519115580010" className="transition-colors hover:text-[#75D59A]">+251-911-558-0010</a>
                                </p>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-white/40 bg-white/10">
                                    <Mail size={19} strokeWidth={1.7} aria-hidden="true" />
                                </span>
                                <a href="mailto:bedebethiopia@gmail.com" className="text-sm text-white/95 transition-colors hover:text-[#75D59A]">bedebethiopia@gmail.com</a>
                            </div>
                        </address>
                    </div>

                    <form className="space-y-5 rounded-2xl border border-white/10 bg-[#11201a] p-6 shadow-xl shadow-black/20 sm:p-8">
                        <fieldset>
                            <legend className="mb-2 text-xs font-semibold text-white">I am a</legend>
                            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                                {roles.map((role) => {
                                    const isSelected = role === selectedRole;
                                    return (
                                        <button
                                            key={role}
                                            type="button"
                                            aria-pressed={isSelected}
                                            onClick={() => setSelectedRole(role)}
                                            className={`h-11 rounded-md border px-3 text-sm font-medium transition-colors ${isSelected ? "border-[#267A47] bg-[#267A47] text-white" : "border-white/15 bg-[#0c1812] text-white/85 hover:border-white/30"}`}
                                        >
                                            {role}
                                        </button>
                                    );
                                })}
                            </div>
                        </fieldset>

                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                            <div>
                                <label htmlFor="contact-name" className="mb-2 block text-xs font-semibold text-white">Your name</label>
                                <input id="contact-name" name="name" type="text" className={inputClassName} />
                            </div>
                            <div>
                                <label htmlFor="contact-business" className="mb-2 block text-xs font-semibold text-white">Business or organization</label>
                                <input id="contact-business" name="business" type="text" className={inputClassName} />
                            </div>
                            <div>
                                <label htmlFor="contact-location" className="mb-2 block text-xs font-semibold text-white">Location</label>
                                <input id="contact-location" name="location" type="text" placeholder="City or woreda" className={inputClassName} />
                            </div>
                            <div>
                                <label htmlFor="contact-volume" className="mb-2 block text-xs font-semibold text-white">Volume per week</label>
                                <div className="relative">
                                    <select id="contact-volume" name="volume" defaultValue={volumeOptions[0]} className={`${inputClassName} cursor-pointer appearance-none pr-10`}>
                                        {volumeOptions.map((option) => (
                                            <option key={option} value={option} className="bg-[#0c1812]">{option}</option>
                                        ))}
                                    </select>
                                    <ChevronDown size={16} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-white" aria-hidden="true" />
                                </div>
                            </div>
                        </div>

                        <fieldset>
                            <legend className="mb-2 text-xs font-semibold text-white">Produce of interest</legend>
                            <div className="flex flex-wrap gap-3">
                                {produceOptions.map((item) => {
                                    const isChecked = selectedProduce.includes(item);
                                    return (
                                        <label key={item} className={`flex cursor-pointer items-center gap-2 rounded-md border px-3 py-2 text-sm transition-colors ${isChecked ? "border-[#3DB268]/60 text-white" : "border-white/15 text-white/80 hover:border-white/30"}`}>
                                            <input type="checkbox" checked={isChecked} onChange={() => toggleProduce(item)} className="size-3.5 accent-[#3DB268]" />
                                            {item}
                                        </label>
                                    );
                                })}
                            </div>
                        </fieldset>

                        <div>
                            <label htmlFor="contact-requirements" className="mb-2 block text-xs font-semibold text-white">Requirements or message</label>
                            <textarea id="contact-requirements" name="requirements" rows={4} placeholder="Specifications, delivery days, packaging, certifications you need" className="w-full resize-y rounded-md border border-white/15 bg-[#0c1812] p-4 text-sm text-white placeholder:text-white/35 outline-none transition-colors focus-visible:border-[#3DB268]" />
                        </div>

                        <button type="button" className="h-12 rounded-md bg-[#267A47] px-8 font-semibold text-white transition-colors hover:bg-[#1E663A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
                            Send enquiry
                        </button>
                    </form>
                </div>

            </div>
        </footer>
    );
}
