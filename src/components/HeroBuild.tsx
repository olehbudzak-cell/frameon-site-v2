"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { scrollToTarget } from "./SmoothScroll";
import { SCENE } from "@/content/services";

type Stage = { tag: string; title: string; text: string; spec: string };

const POSTER = { desktop: "/scene/desktop/f001.webp", mobile: "/scene/mobile/f001.webp" };
const pad = (n: number) => String(n).padStart(3, "0");
const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));

/**
 * First screen = pinned build sequence (Higgsfield frames drawn on a canvas).
 * Scroll scrubs the frames from the very first pixel: the hero copy fades out while
 * the room starts building, then the stage cards take over.
 * Reduced motion → static first frame + copy, no pin.
 */
export default function HeroBuild({
  stages, label, skip, cue, extra, children,
}: {
  stages: Stage[]; label: string; skip: string; cue: string; extra?: React.ReactNode; children: React.ReactNode;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const uiRef = useRef<HTMLDivElement>(null);
  const shadeRef = useRef<HTMLDivElement>(null);
  const cueRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLElement>(null);
  const stRef = useRef<ScrollTrigger | null>(null);
  const [stage, setStage] = useState(0);
  const [shown, setShown] = useState(0);
  const [swap, setSwap] = useState(false);
  const [ready, setReady] = useState(false);
  const [reduced, setReduced] = useState(false);

  // share of the pinned scroll used by the hero copy before stage cards appear
  const heroShare = 1 / (stages.length + 1);

  useEffect(() => {
    if (stage === shown) return;
    setSwap(true);
    const t = setTimeout(() => { setShown(stage); setSwap(false); }, 200);
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
    let cancelled = false;
    let drawn = -1;

    const draw = (i: number) => {
      // nearest already-loaded frame at or before i
      let k = i;
      while (k > 0 && !(imgs[k]?.complete && imgs[k].naturalWidth)) k--;
      const img = imgs[k];
      if (!img?.naturalWidth) return;
      const w = canvas.clientWidth, h = canvas.clientHeight, dpr = Math.min(window.devicePixelRatio || 1, 2);
      if (canvas.width !== Math.round(w * dpr) || canvas.height !== Math.round(h * dpr)) { canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr); drawn = -1; }
      if (k === drawn) return;
      const s = Math.max(canvas.width / img.naturalWidth, canvas.height / img.naturalHeight);
      const dw = img.naturalWidth * s, dh = img.naturalHeight * s;
      ctx.drawImage(img, (canvas.width - dw) / 2, (canvas.height - dh) / 2, dw, dh);
      drawn = k;
    };

    const load = (i: number) =>
      new Promise<void>((res) => {
        const im = new Image();
        im.decoding = "async";
        im.onload = im.onerror = () => res();
        im.src = `/scene/${dir}/f${pad(i + 1)}.webp`;
        imgs[i] = im;
      });

    // First frame now, then the rest progressively (every 4th first for a coarse preview).
    // The first frame is the same file as the poster (already cached). The rest of the
    // sequence waits until the page has painted, so it never competes with the first screen;
    // the first scroll starts it immediately.
    let started = false;
    const loadRest = async () => {
      if (started || cancelled) return;
      started = true;
      window.removeEventListener("scroll", loadRest);
      const order = [...Array(count).keys()].sort((a, b) => (a % 4) - (b % 4) || a - b).filter((i) => i > 0);
      for (let j = 0; j < order.length && !cancelled; j += 6) await Promise.all(order.slice(j, j + 6).map(load));
    };
    window.addEventListener("scroll", loadRest, { passive: true });
    const idle = (cb: () => void) => ("requestIdleCallback" in window ? (window as any).requestIdleCallback(cb, { timeout: 2500 }) : setTimeout(cb, 1200));
    load(0).then(() => {
      if (cancelled) return;
      draw(0); setReady(true);
      if (document.readyState === "complete") idle(loadRest);
      else window.addEventListener("load", () => idle(loadRest), { once: true });
    });

    // Smoothly follow the scroll position.
    let target = 0, cur = 0, raf = 0;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      cur += (target - cur) * 0.18;
      if (Math.abs(target - cur) < 0.0005) cur = target;
      draw(Math.min(count - 1, Math.round(clamp(cur) * (count - 1))));
    };
    raf = requestAnimationFrame(tick);

    const apply = (p: number) => {
      target = p;
      const heroOut = clamp(p / (heroShare * 0.85));
      if (heroRef.current) {
        heroRef.current.style.opacity = String(1 - heroOut);
        heroRef.current.style.transform = `translate3d(0, ${-heroOut * 60}px, 0)`;
        heroRef.current.style.visibility = heroOut >= 1 ? "hidden" : "visible";
      }
      if (cueRef.current) cueRef.current.style.opacity = String(1 - clamp(p / 0.03));
      const uiIn = clamp((p - heroShare * 0.7) / (heroShare * 0.4));
      if (uiRef.current) {
        uiRef.current.style.opacity = String(uiIn);
        uiRef.current.style.visibility = uiIn <= 0 ? "hidden" : "visible";
      }
      if (shadeRef.current) shadeRef.current.style.opacity = String(uiIn);
      const sp = clamp((p - heroShare) / (1 - heroShare));
      setStage(Math.min(stages.length - 1, Math.floor(sp * stages.length)));
      if (barRef.current) barRef.current.style.transform = `scaleX(${p})`;
    };

    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: () => "+=" + window.innerHeight * (stages.length + 1) * 0.6,
      pin: pinRef.current,
      onUpdate: (self) => apply(self.progress),
    });
    stRef.current = st;
    apply(st.progress);

    const onResize = () => { drawn = -1; };
    window.addEventListener("resize", onResize);
    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", loadRest);
      st.kill();
    };
  }, [stages.length, heroShare]);

  const goTo = (i: number) => {
    const st = stRef.current;
    if (!st) return;
    const p = heroShare + (1 - heroShare) * ((i + 0.5) / stages.length);
    scrollToTarget(st.start + (st.end - st.start) * p);
  };
  const skipAll = () => { const st = stRef.current; if (st) scrollToTarget(st.end + 2); };

  const poster = (
    <picture>
      <source media="(max-width: 900px)" srcSet={POSTER.mobile} />
      <img src={POSTER.desktop} alt="" className="hb-media" fetchPriority="high" decoding="async" />
    </picture>
  );

  if (reduced) {
    return (
      <section className="hb hb-static" aria-label={label}>
        <div className="hb-pin">
          {poster}
          <div className="hero-shade" />
          <div className="hb-hero">{children}</div>
        </div>
      </section>
    );
  }

  const s = stages[shown];
  return (
    <section ref={sectionRef} className="hb" aria-label={label}>
      <div ref={pinRef} className="hb-pin">
        {poster}
        <canvas ref={canvasRef} className={`hb-media hb-video${ready ? " is-ready" : ""}`} aria-hidden="true" />
        <div className="hero-shade" />
        <div ref={shadeRef} className="build-shade" style={{ opacity: 0 }} />
        <div ref={heroRef} className="hb-hero">{children}</div>
        <div ref={uiRef} className="wrap build-ui" style={{ opacity: 0, visibility: "hidden" }}>
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
          <button type="button" className="btn btn-ghost build-skip" onClick={skipAll}>{skip} ↓</button>
        </div>
        <div ref={cueRef} className="scroll-cue" aria-hidden="true"><span className="mono" style={{ fontSize: 11 }}>{cue}</span><i /></div>
        <div className="build-progress"><i ref={barRef} /></div>
      </div>
    </section>
  );
}
