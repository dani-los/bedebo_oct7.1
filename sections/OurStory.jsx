import Image from "next/image";
import { ArrowUpRight, Leaf } from "lucide-react";
import SectionTitle from "@/components/SectionTitle";

export default function OurStory({
    idSuffix = "",
    id = `about${idSuffix}`,
    label = "ABOUT US",
    title = "Let's Talk About",
    highlight = "Company",
    description = "Founded by visionaries from the Ethiopian diaspora, Bedebo is committed to transforming Ethiopian agriculture into a sustainable, productive, and profitable sector. Our integrated approach brings modern technology and renewable energy solutions to the heart of Ethiopia's farming communities.",
    quote = "To leverage digital innovation and sustainable energy to improve market access, productivity",
    image = "https://cdn.builder.io/api/v1/image/assets%2F58a1aba6d1a74d7587bcdc0052ba9d95%2F02d70bc09ad54b5a88892625107eb43e?format=webp&width=800&height=1200",
    imageAlt = "BEDEBO refrigerated truck and produce crates in a farm landscape with a farmer using a tablet",
    chamferedImage = false,
    reverse = false,
    embedded = false,
}) {
    const Wrapper = embedded ? "div" : "section";

    return (
        <Wrapper id={id} aria-labelledby={embedded ? undefined : `our-story-title${idSuffix}`} className={embedded ? "pb-16 md:pb-24" : "scroll-mt-20 pt-16 pb-12 md:pt-20 md:pb-8"}>
            <div className={`bedebo-site-container grid grid-cols-1 gap-14 md:grid-cols-2 lg:gap-20 ${chamferedImage ? "md:items-start" : "items-center"}`}>
                <div className={`relative mx-auto w-full ${reverse ? "md:order-last" : ""} ${chamferedImage ? "aspect-[7/4] max-w-[600px] md:mt-9 transition-transform duration-500 ease-out hover:scale-[1.03]" : "aspect-square max-w-[420px]"}`}>
                    <div className="absolute bottom-0 left-0 z-0 h-[36%] w-[44%] opacity-60" style={{ backgroundImage: "radial-gradient(#3DB268 1.5px, transparent 1.5px)", backgroundSize: "16px 16px" }} />
                    {!chamferedImage && (
                        <div className="absolute -inset-3 rounded-[84px] border border-[#3DB268]/20 bg-[#3DB268]/[0.06]" />
                    )}
                    <div className={`absolute inset-0 z-10 overflow-hidden shadow-[0_24px_60px_rgba(15,23,42,0.16)] ${chamferedImage ? "" : "rounded-[72px]"}`} style={chamferedImage ? { borderRadius: "0 48px 0 48px" } : undefined}>
                        <Image fill sizes="(max-width: 768px) 100vw, 600px" className={chamferedImage ? "object-cover" : "object-cover object-[35%_center]"} src={image} alt={imageAlt} />
                    </div>
                    {!chamferedImage && (
                        <a href="#impact" className="absolute -left-2 top-1/2 z-20 flex -translate-y-1/2 items-center gap-3 rounded-2xl border border-white/60 bg-white/75 px-4 py-3 shadow-lg shadow-slate-950/10 backdrop-blur-xl transition-transform hover:-translate-y-[55%] dark:border-white/10 dark:bg-slate-900/70 sm:-left-8 sm:px-5">
                            <span className="flex size-10 items-center justify-center rounded-full bg-[#3DB268]/15 text-[#267A47] dark:text-[#75D59A]">
                                <Leaf size={19} />
                            </span>
                            <span className="text-sm font-semibold text-[#267A47] dark:text-[#75D59A]">Our Impact</span>
                            <ArrowUpRight size={17} className="text-[#267A47] dark:text-[#75D59A]" />
                        </a>
                    )}
                </div>

                <div className={`max-w-xl ${reverse ? "md:order-first" : ""}`}>
                    <SectionTitle
                        label={label}
                        title={title}
                        highlight={highlight}
                        alignment="left"
                        className="section-header--flush"
                        headingId={`our-story-title${idSuffix}`}
                        description={(
                            <p className="about-description">
                                {description}
                            </p>
                        )}
                    />
                    <blockquote className="about-quote">
                        <span className="about-quote-mark about-quote-mark--open" aria-hidden="true">“</span>
                        <p>
                            {quote}<span className="about-quote-mark about-quote-mark--close" aria-hidden="true">”</span>
                        </p>
                    </blockquote>
                </div>
            </div>
        </Wrapper>
    );
}
