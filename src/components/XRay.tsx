"use client";
import { useRef } from "react";

/** Finished wall with a lens (desktop) or split slider (touch) revealing the frame behind it. */
export default function XRay({ children, before, after, hint }: { children: React.ReactNode; before: string; after: string; hint: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const move = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    const r = ref.current!.getBoundingClientRect();
    ref.current!.style.setProperty("--x", `${e.clientX - r.left}px`);
    ref.current!.style.setProperty("--y", `${e.clientY - r.top}px`);
  };
  return (
    <section className="xray" ref={ref} onPointerMove={move} aria-label={hint}>
      <div className="stage">
        <img src="/images/finished-loft-conversion.jpg" alt={after} loading="lazy" />
        <img src="/images/stud-frame-loft.jpg" alt={before} loading="lazy" className="reveal-layer" />
        <div className="ring" aria-hidden="true" />
        <label className="slider">
          <span className="sr-only">{hint}</span>
          <input
            type="range" min={5} max={95} defaultValue={50} style={{ width: "100%", accentColor: "#C9A66B" }}
            onInput={(e) => ref.current!.style.setProperty("--split", `${(e.target as HTMLInputElement).value}%`)}
          />
          <span className="mono" style={{ display: "flex", justifyContent: "space-between", fontSize: 11 }}><span>{after}</span><span>{before}</span></span>
        </label>
      </div>
      <div className="shade" />
      <div className="wrap copy">{children}</div>
    </section>
  );
}
