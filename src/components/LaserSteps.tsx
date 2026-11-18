"use client";
import { useEffect, useRef } from "react";

/** Draws the laser line across the steps as the section scrolls through the viewport. */
export default function LaserSteps({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current!;
    const on = () => {
      const r = el.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, (window.innerHeight * 0.85 - r.top) / (r.height + window.innerHeight * 0.3)));
      el.style.setProperty("--p", p.toFixed(3));
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <div className="steps" ref={ref}>
      <div className="laser" aria-hidden="true"><i /></div>
      {children}
    </div>
  );
}
