import Image from "next/image";
import SectionTitle from "@/components/SectionTitle";

export default function OurStory({
    idSuffix = "",
    id = `about${idSuffix}`,
    label = "ABOUT US",
    title = "Let's Talk About",
    highlight = "Company",
    description = "Founded by visionaries from the Ethiopian diaspora, Bedebo is committed to transforming Ethiopian agriculture into a sustainable, productive, and profitable sector. Our integrated approach brings modern technology and renewable energy solutions to the heart of Ethiopia's farming communities.",
    quote = "To leverage digital innovation and sustainable energy to improve market access, productivity",
    image = "/assets/about-image.webp",
    imageAlt = "Combine harvester working in a sunlit field",
    chamferedImage = false,
    reverse = false,
    embedded = false,
}) {
    const Wrapper = embedded ? "div" : "section";

    return (
        <Wrapper id={id} aria-labelledby={embedded ? undefined : `our-story-title${idSuffix}`} className={embedded ? "pb-16 md:pb-24" : "scroll-mt-20 pt-24 pb-12 md:pt-32 md:pb-8"}>
            <div className={`bedebo-site-container grid grid-cols-1 gap-14 md:grid-cols-2 lg:gap-20 ${chamferedImage ? "md:items-start" : "items-center"}`}>
                <div className={`relative mx-auto w-full ${reverse ? "md:order-last" : ""} ${chamferedImage ? "aspect-[7/4] max-w-[600px] md:mt-9 transition-transform duration-500 ease-out hover:scale-[1.03]" : "aspect-square max-w-[420px]"}`}>
                    <div className="absolute bottom-0 left-0 z-0 h-[36%] w-[44%] opacity-60" style={{ backgroundImage: "radial-gradient(#3DB268 1.5px, transparent 1.5px)", backgroundSize: "16px 16px" }} />
                    <div className={`absolute inset-0 z-10 overflow-hidden shadow-[0_24px_60px_rgba(15,23,42,0.16)] ${chamferedImage ? "" : "border-[3px] border-white dark:border-slate-950 rounded-full"}`} style={chamferedImage ? { borderRadius: "0 48px 0 48px" } : undefined}>
                        <Image fill sizes="(max-width: 768px) 100vw, 600px" className="object-cover" src={image} alt={imageAlt} />
                    </div>
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
