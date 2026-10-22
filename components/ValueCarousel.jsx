"use client";

import { useEffect, useState } from "react";

export default function ValueCarousel({ slides }) {
    const [active, setActive] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setActive((index) => (index + 1) % slides.length);
        }, 5000);

        return () => clearInterval(timer);
    }, [slides.length]);

    return (
        <div className="about-carousel">
            <div className="about-carousel-track">
                {slides.map((slide, index) => (
                    <div
                        key={slide.quote}
                        className={`about-carousel-slide ${index === active ? "is-active" : ""}`}
                        aria-hidden={index !== active}
                    >
                        <p className="about-description">{slide.description}</p>
                        <blockquote className="about-quote">
                            <span className="about-quote-mark about-quote-mark--open" aria-hidden="true">“</span>
                            <p>
                                {slide.quote}<span className="about-quote-mark about-quote-mark--close" aria-hidden="true">”</span>
                            </p>
                        </blockquote>
                    </div>
                ))}
            </div>

            <div className="about-carousel-dots">
                {slides.map((slide, index) => (
                    <button
                        key={slide.quote}
                        type="button"
                        aria-label={`Show value proposition ${index + 1}`}
                        aria-current={index === active}
                        onClick={() => setActive(index)}
                        className={`about-carousel-dot ${index === active ? "is-active" : ""}`}
                    />
                ))}
            </div>
        </div>
    );
}
