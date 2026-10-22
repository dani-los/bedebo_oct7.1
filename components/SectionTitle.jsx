"use client";

import { useEffect, useRef, useState } from "react";

export default function SectionTitle({ label, title, highlight, description, alignment = "center", headingId, className = "" }) {
    const headerRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);
    const isCentered = alignment === "center";

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
        }, { threshold: 0.12 });

        if (headerRef.current) observer.observe(headerRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <header ref={headerRef} className={`section-header ${isCentered ? "section-header--centered" : ""} ${isVisible ? "section-header--visible" : ""} ${className}`.trim()}>
            {label && (
                <div className="section-header-label">
                    {isCentered && <span className="section-header-line" aria-hidden="true" />}
                    <p>{label}</p>
                    <span className="section-header-line" aria-hidden="true" />
                </div>
            )}
            <h2 id={headingId} className="section-header-title">
                {title} <span>{highlight}</span>
            </h2>
            {description && <div className="section-header-description">{description}</div>}
        </header>
    );
}
