"use client";
import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/** Lenis smooth scroll synced with GSAP + reveal-on-scroll for [data-reveal] and .img-reveal. */
export default function SmoothScroll() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let lenis: Lenis | null = null;
    const tick = (t: number) => lenis?.raf(t * 1000);
    if (!reduce) {
      lenis = new Lenis({ duration: 1.1, smoothWheel: true });
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      (window as unknown as { __lenis?: Lenis }).__lenis = lenis;
    }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }),
      { rootMargin: "0px 0px -10% 0px" },
    );
    // Observe reveal targets now and whenever new ones appear (client-side page changes swap <main>),
    // otherwise elements on pages opened via links stay at opacity 0.
    const seen = new WeakSet<Element>();
    const watch = () => document.querySelectorAll("[data-reveal]:not(.in), .img-reveal:not(.in)").forEach((el) => { if (!seen.has(el)) { seen.add(el); io.observe(el); } });
    watch();
    const mo = new MutationObserver(() => watch());
    mo.observe(document.body, { childList: true, subtree: true });
    return () => { mo.disconnect(); io.disconnect(); if (lenis) { gsap.ticker.remove(tick); lenis.destroy(); } };
  }, []);
  return null;
}

/** Scroll to an element or y-position through Lenis when available. */
export function scrollToTarget(target: string | number | HTMLElement) {
  const lenis = (window as unknown as { __lenis?: Lenis }).__lenis;
  if (lenis) lenis.scrollTo(target as never, { duration: 1.2 });
  else if (typeof target === "number") window.scrollTo({ top: target, behavior: "smooth" });
  else if (typeof target === "string") document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
  else target.scrollIntoView({ behavior: "smooth" });
}
