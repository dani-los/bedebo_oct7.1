"use client"
import { useEffect, useState } from "react";

export default function useSectionProgress(sectionRef) {
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
    }, [sectionRef]);

    return progress;
}
