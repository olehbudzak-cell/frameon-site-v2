"use client";
import { useRef } from "react";

/**
 * Real before/after from one of our sites: the riser frame (before) and the same corner
 * boarded (after), aligned so the slider compares the exact same spot.
 */
export default function XRay({ children, before, after, hint }: { children: React.ReactNode; before: string; after: string; hint: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const set = (v: string) => ref.current?.style.setProperty("--split", `${v}%`);
  return (
    <section className="xray" aria-label={hint}>
      <div className="wrap xray-grid">
        <div className="copy">{children}</div>
        <div className="stage" ref={ref}>
          <img src="/portfolio/before-after/riser-after.webp" alt={after} width={831} height={1104} loading="lazy" />
          <img src="/portfolio/before-after/riser-before.webp" alt={before} width={831} height={1104} loading="lazy" className="reveal-layer" />
          <span className="ba-line" aria-hidden="true"><i>‹ ›</i></span>
          <span className="ba-tag ba-before mono">{before}</span>
          <span className="ba-tag ba-after mono">{after}</span>
          <input className="ba-range" type="range" min={0} max={100} defaultValue={60} aria-label={hint} onInput={(e) => set((e.target as HTMLInputElement).value)} />
        </div>
      </div>
    </section>
  );
}
