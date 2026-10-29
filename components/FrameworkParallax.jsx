"use client"
import Image from "next/image";
import { useEffect, useRef } from "react";

const sequenceImages = [
    { src: "https://cdn.builder.io/api/v1/image/assets%2F46dd14c24f0848789ec888965e0928ea%2Ffc47594adc9d417cb6f52f035bec2be2?format=webp&width=800&height=1200", alt: "Rows of produce growing in a field under a cloudy sky" },
    { src: "https://cdn.builder.io/api/v1/image/assets%2F46dd14c24f0848789ec888965e0928ea%2F62df53d2e20d446698adee3e1995f9ea?format=webp&width=800&height=1200", alt: "Workers inspecting tomatoes in green crates" },
    { src: "https://cdn.builder.io/api/v1/image/assets%2F46dd14c24f0848789ec888965e0928ea%2Ffc823da9dd71405c954e144fa5a7de74?format=webp&width=800&height=1200", alt: "Tomato crates stacked in a cold storage room" },
    { src: "https://cdn.builder.io/api/v1/image/assets%2F46dd14c24f0848789ec888965e0928ea%2Fa599e37c06b041869dd3bcefa658dacb?format=webp&width=800&height=1200", alt: "Cabbage crates being loaded into a refrigerated truck" },
    { src: "https://cdn.builder.io/api/v1/image/assets%2F46dd14c24f0848789ec888965e0928ea%2F4f054748e2564e448d811735c5fe7cd6?format=webp&width=800&height=1200", alt: "Crates being checked at the back of a BEDEBO refrigerated truck" },
];

const MAX_SHIFT_RATIO = 0.1;

export default function FrameworkParallax() {
    const layerRefs = useRef([]);

    useEffect(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        let frame = 0;

        const update = () => {
            frame = 0;
            const viewportCenter = window.innerHeight / 2;

            layerRefs.current.forEach((layer, index) => {
                if (!layer) return;
                const tile = layer.parentElement.getBoundingClientRect();
                const tileCenter = tile.top + tile.height / 2;
                const progress = Math.max(-1, Math.min(1, (tileCenter - viewportCenter) / (viewportCenter + tile.height / 2)));
                const speed = 0.4 + index * 0.15;
                const shift = -progress * speed * MAX_SHIFT_RATIO * tile.height;
                layer.style.transform = `translate3d(0, ${shift}px, 0)`;
            });
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

    return (
        <div className="mt-14 flex flex-col gap-4 md:flex-row">
            {sequenceImages.map((image, index) => (
                <div key={image.src} className="relative h-72 min-w-0 flex-1 overflow-hidden rounded-2xl shadow-sm md:h-96">
                    <div ref={(node) => (layerRefs.current[index] = node)} className="absolute inset-x-0 -top-[10%] h-[120%] will-change-transform">
                        <Image src={image.src} alt={image.alt} fill sizes="(min-width: 768px) 20vw, 100vw" className="object-cover" />
                    </div>
                </div>
            ))}
        </div>
    );
}
