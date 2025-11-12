"use client";
import { useEffect, useState } from "react";

/**
 * Barre de progression de scroll fine et dorée
 * Affichée en haut de la page lors du scroll
 */
export default function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateScrollProgress = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollableHeight = documentHeight - windowHeight;
      const progress = scrollableHeight > 0 ? (scrollTop / scrollableHeight) * 100 : 0;
      setScrollProgress(Math.min(100, Math.max(0, progress)));
    };

    window.addEventListener("scroll", updateScrollProgress, { passive: true });
    updateScrollProgress(); // Initial update

    return () => {
      window.removeEventListener("scroll", updateScrollProgress);
    };
  }, []);

  if (scrollProgress === 0) return null;

  return (
    <div
      className="fixed top-0 left-0 right-0 h-[2px] z-[100] pointer-events-none"
      aria-hidden="true"
    >
      <div
        className="h-full bg-gradient-to-r from-[#C7A451] via-[#D4B975] to-[#C7A451] transition-all duration-150 ease-out shadow-[0_0_10px_rgba(199,164,81,0.5)]"
        style={{
          width: `${scrollProgress}%`,
          willChange: "width",
        }}
      />
    </div>
  );
}

