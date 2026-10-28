import Image from "next/image";

const footerColumns = [
    {
        title: "PRODUCE",
        links: [
            { name: "Fruits & vegetables", href: "#value-propositions" },
            { name: "Quality & traceability", href: "#quality-traceability-title" },
            { name: "Cold chain & logistics", href: "#cold-chain" },
        ],
    },
    {
        title: "WHO WE SERVE",
        links: [
            { name: "Premium buyers", href: "#value-propositions" },
            { name: "Vendors & aggregators", href: "#value-proposition-2" },
            { name: "Farmers & producers", href: "#value-proposition-1" },
        ],
    },
    {
        title: "BEDEBO",
        links: [
            { name: "Digital marketplace", href: "#digital-marketplace" },
            { name: "Agricultural services", href: "#agricultural-services-title" },
            { name: "About & partners", href: "#bedebo-partners" },
            { name: "Contact", href: "#contact" },
        ],
    },
];

export default function SiteFooter() {
    return (
        <footer aria-label="Site footer" className="bg-[#030d07] text-white">
            <div className="bedebo-site-container grid grid-cols-1 gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:gap-10">
                <div className="max-w-sm">
                    <Image src="/assets/bedebo-ethiopia.webp" alt="Bedebo Ethiopia" width={140} height={140} className="mx-auto block h-16 w-auto" />
                    <p className="mt-6 text-xl font-bold leading-snug text-white md:text-2xl">
                        Freshness Protected. Quality Assured. Markets Connected. Value Shared.
                    </p>
                </div>

                {footerColumns.map((column) => (
                    <nav key={column.title} aria-label={column.title}>
                        <h2 className="font-mono text-[11px] tracking-[0.2em] text-[#8FB5A0]">{column.title}</h2>
                        <ul className="mt-5 space-y-3">
                            {column.links.map((link) => (
                                <li key={link.name}>
                                    <a href={link.href} className="text-sm text-[#A9BDB1] transition-colors hover:text-[#75D59A]">
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>
                ))}
            </div>
            <div className="border-t border-white/15 py-5 text-center text-xs text-white/85">
                Copyright © {new Date().getFullYear()}, Powered by{" "}
                <a href="#contact" className="text-[#3DB268] underline-offset-4 transition hover:underline">Bedebo Ethiopia</a>
            </div>
        </footer>
    );
}
