"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { scrollToTarget } from "./SmoothScroll";

type Stage = { tag: string; title: string; text: string; spec: string };

export const HERO_VIDEO = {
  desktop: "/video/build-desktop.mp4",
  mobile: "/video/build-mobile.mp4",
  poster: "/video/poster-desktop.jpg",
  posterMobile: "/video/poster-mobile.jpg",
};

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));

/**
 * First screen = pinned build video. The video is scrubbed by scroll from the very
 * first pixel: the hero copy fades out while the room starts building, then the
 * stage cards take over. Reduced motion → static poster + copy, no pin.
 */
export default function HeroBuild({
  stages, label, skip, cue, extra, children,
}: {
  stages: Stage[]; label: string; skip: string; cue: string; extra?: React.ReactNode; children: React.ReactNode;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
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
    const video = videoRef.current!;
    const mobile = window.matchMedia("(max-width: 760px), (orientation: portrait) and (max-width: 1024px)").matches;
    const src = mobile ? HERO_VIDEO.mobile : HERO_VIDEO.desktop;
    let objectUrl = "";
    let cancelled = false;

    // Download the whole file first so every scrub position is already buffered.
    fetch(src)
      .then((r) => (r.ok ? r.blob() : Promise.reject()))
      .then((b) => { if (cancelled) return; objectUrl = URL.createObjectURL(b); video.src = objectUrl; video.load(); })
      .catch(() => { if (!cancelled) { video.src = src; video.load(); } });

    const onReady = () => { setReady(true); video.pause(); };
    video.addEventListener("loadeddata", onReady, { once: true });

    let target = 0, cur = 0, raf = 0;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      const d = video.duration;
      if (!d || !isFinite(d) || video.readyState < 1) return;
      cur += (target - cur) * 0.12;
      if (Math.abs(target - cur) < 0.0005) cur = target;
      const t = clamp(cur, 0, 0.999) * d;
      if (!video.seeking && Math.abs(video.currentTime - t) > 1 / 60) video.currentTime = t;
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
      end: () => "+=" + window.innerHeight * (stages.length + 1) * 0.9,
      pin: pinRef.current,
      onUpdate: (self) => apply(self.progress),
    });
    stRef.current = st;
    apply(st.progress);

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      st.kill();
      if (objectUrl) URL.revokeObjectURL(objectUrl);
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
      <source media="(max-width: 760px)" srcSet={HERO_VIDEO.posterMobile} />
      <img src={HERO_VIDEO.poster} alt="" className="hb-media" fetchPriority="high" decoding="async" />
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
        <video
          ref={videoRef}
          className={`hb-media hb-video${ready ? " is-ready" : ""}`}
          muted
          playsInline
          preload="auto"
          disablePictureInPicture
          aria-hidden="true"
        />
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
