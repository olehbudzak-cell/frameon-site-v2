"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SCENE } from "@/content/services";
import { scrollToTarget } from "./SmoothScroll";

type Stage = { tag: string; title: string; text: string; spec: string };

const pad = (n: number) => String(n).padStart(3, "0");

/**
 * Scroll-scrubbed build sequence: a pinned canvas plays the Higgsfield loft video
 * as an image sequence, stage cards change over it. Reduced motion → static frames.
 */
export default function BuildScene({ stages, label, skip, extra }: { stages: Stage[]; label: string; skip: string; extra?: React.ReactNode }) {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const barRef = useRef<HTMLElement>(null);
  const stRef = useRef<ScrollTrigger | null>(null);
  const [stage, setStage] = useState(0);
  const [shown, setShown] = useState(0);
  const [swap, setSwap] = useState(false);
  const [reduced, setReduced] = useState(false);

  // Fade the stage text out and back in when the stage changes.
  useEffect(() => {
    if (stage === shown) return;
    setSwap(true);
    const t = setTimeout(() => { setShown(stage); setSwap(false); }, 220);
    return () => clearTimeout(t);
  }, [stage, shown]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setReduced(true); return; }
    gsap.registerPlugin(ScrollTrigger);
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const mobile = window.matchMedia("(max-width: 900px)").matches;
    const count = mobile ? SCENE.mobileFrames : SCENE.desktopFrames;
    const dir = mobile ? "mobile" : "desktop";
    const imgs: HTMLImageElement[] = new Array(count);
    let current = 0;

    const draw = (i: number) => {
      // nearest already-loaded frame at or before i
      let k = i;
      while (k > 0 && !(imgs[k]?.complete && imgs[k].naturalWidth)) k--;
      const img = imgs[k];
      if (!img?.naturalWidth) return;
      const w = canvas.clientWidth, h = canvas.clientHeight, dpr = Math.min(window.devicePixelRatio || 1, 2);
      if (canvas.width !== Math.round(w * dpr)) { canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr); }
      const s = Math.max(canvas.width / img.naturalWidth, canvas.height / img.naturalHeight);
      const dw = img.naturalWidth * s, dh = img.naturalHeight * s;
      ctx.drawImage(img, (canvas.width - dw) / 2, (canvas.height - dh) / 2, dw, dh);
    };

    const load = (i: number) =>
      new Promise<void>((res) => {
        const im = new Image();
        im.decoding = "async";
        im.onload = im.onerror = () => { res(); if (i === current) draw(current); };
        im.src = `/scene/${dir}/f${pad(i + 1)}.webp`;
        imgs[i] = im;
      });

    // First frame now, the rest progressively (every 4th first for a coarse preview).
    let cancelled = false;
    load(0).then(async () => {
      draw(0);
      const order = [...Array(count).keys()].sort((a, b) => (a % 4) - (b % 4) || a - b).filter((i) => i > 0);
      for (let j = 0; j < order.length && !cancelled; j += 6) await Promise.all(order.slice(j, j + 6).map(load));
    });

    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: () => "+=" + window.innerHeight * (stages.length - 0.5),
      pin: pinRef.current,
      scrub: 0.4,
      onUpdate: (self) => {
        const f = Math.min(count - 1, Math.round(self.progress * (count - 1)));
        if (f !== current) { current = f; draw(f); }
        setStage(Math.min(stages.length - 1, Math.floor(self.progress * stages.length)));
        if (barRef.current) barRef.current.style.transform = `scaleX(${self.progress})`;
      },
    });
    stRef.current = st;
    const onResize = () => draw(current);
    window.addEventListener("resize", onResize);
    return () => { cancelled = true; window.removeEventListener("resize", onResize); st.kill(); };
  }, [stages.length]);

  const goTo = (i: number) => {
    const st = stRef.current;
    if (!st) return;
    scrollToTarget(st.start + ((st.end - st.start) * (i + 0.5)) / stages.length);
  };
  const skipAll = () => {
    const st = stRef.current;
    if (st) scrollToTarget(st.end + 2);
  };

  if (reduced) {
    const stills = ["/images/stud-frame-loft.jpg", "/images/plasterboard-boarding-loft.jpg", "/images/finished-loft-conversion.jpg"];
    return (
      <section aria-label={label} className="build-static">
        {stages.slice(1, 4).map((s, i) => (
          <figure key={s.tag}>
            <img src={stills[i]} alt={s.title} loading="lazy" />
            <figcaption className="wrap" style={{ paddingBlock: 24 }}>
              <p className="eyebrow">{s.tag}</p>
              <h3 className="h3">{s.title}</h3>
              <p className="muted">{s.text}</p>
            </figcaption>
          </figure>
        ))}
      </section>
    );
  }

  const s = stages[shown];
  return (
    <section ref={sectionRef} className="build" aria-label={label}>
      <div ref={pinRef} className="build-pin">
        <canvas ref={canvasRef} className="build-canvas" role="img" aria-label={label} />
        <div className="build-shade" />
        <div className="wrap build-ui">
          <div className="stage-card" aria-live="polite">
            <div className={`stage-text${swap ? " swap" : ""}`} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <span className="eyebrow">{s.tag}</span>
              <h2 className="h3" style={{ fontSize: "clamp(22px, 2.2vw, 30px)" }}>{s.title}</h2>
              <p className="muted" style={{ margin: 0 }}>{s.text}</p>
              <span className="spec">{s.spec}</span>
            </div>
            {extra}
          </div>
          <ol className="rail" aria-label={label}>
            {stages.map((st, i) => (
              <li key={st.tag}>
                <button type="button" aria-current={i === stage ? "step" : undefined} onClick={() => goTo(i)}>
                  <i /><span>{st.tag}</span>
                </button>
              </li>
            ))}
          </ol>
        </div>
        <button type="button" className="btn btn-ghost build-skip" onClick={skipAll}>{skip} ↓</button>
        <div className="build-progress"><i ref={barRef} /></div>
      </div>
    </section>
  );
}
