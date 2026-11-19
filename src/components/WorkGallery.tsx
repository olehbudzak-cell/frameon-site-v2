"use client";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type Lenis = { stop: () => void; start: () => void };
export type GalleryItem = { src: string; w: number; h: number; caption: string; cat?: string };
type L = { close: string; prev: string; next: string; all?: string };

/**
 * Portfolio grid + full-screen viewer.
 * - optional category chips (homepage), uniform 3:4 tiles, lazy images
 * - viewer: keyboard arrows, swipe on touch, counter, page scroll locked while open
 */
export default function WorkGallery({ items, labels, cats, initial }: { items: GalleryItem[]; labels: L; cats?: { id: string; label: string }[]; initial?: number }) {
  const [cat, setCat] = useState<string>("all");
  const [open, setOpen] = useState<number | null>(null);
  const [expanded, setExpanded] = useState(false);
  const dlg = useRef<HTMLDialogElement>(null);
  const touch = useRef<{ x: number; y: number } | null>(null);

  const list = useMemo(() => {
    if (!cats) return items;
    if (cat !== "all") return items.filter((it) => it.cat === cat);
    // "All": interleave categories (1st of each, then 2nd of each…) so the first screen shows every service.
    const groups = cats.map((c) => items.filter((it) => it.cat === c.id));
    const out: GalleryItem[] = [];
    for (let i = 0; out.length < items.length; i++) groups.forEach((g) => g[i] && out.push(g[i]));
    return out;
  }, [items, cats, cat]);
  const limit = initial && !expanded ? initial : list.length;
  const shown = list.slice(0, limit);

  const go = useCallback((d: number) => setOpen((i) => (i === null ? i : (i + d + list.length) % list.length)), [list.length]);

  useEffect(() => {
    const el = dlg.current;
    if (!el) return;
    const lenis = (window as unknown as { __lenis?: Lenis }).__lenis;
    if (open !== null && !el.open) { el.showModal(); lenis?.stop(); document.documentElement.style.overflow = "hidden"; }
    if (open === null && el.open) el.close();
    if (open === null) { lenis?.start(); document.documentElement.style.overflow = ""; }
  }, [open]);

  useEffect(() => {
    if (open === null) return;
    const k = (e: KeyboardEvent) => { if (e.key === "ArrowRight") go(1); if (e.key === "ArrowLeft") go(-1); };
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [open, go]);

  const cur = open !== null ? list[open] : null;

  return (
    <>
      {cats && (
        <div className="work-chips" role="tablist">
          {[{ id: "all", label: labels.all ?? "All" }, ...cats].map((c) => (
            <button key={c.id} type="button" role="tab" aria-selected={cat === c.id} className={cat === c.id ? "on" : ""} onClick={() => { setCat(c.id); setExpanded(false); }}>{c.label}</button>
          ))}
        </div>
      )}
      <ul className="work-grid">
        {shown.map((it, i) => (
          <li key={it.src}>
            <button type="button" className="work-tile" onClick={() => setOpen(i)} aria-label={it.caption}>
              <Image src={it.src} alt={it.caption} fill sizes="(max-width: 700px) 50vw, (max-width: 1100px) 33vw, 20vw" />
              <span className="work-cap">{it.caption}</span>
            </button>
          </li>
        ))}
      </ul>
      {limit < list.length && (
        <button type="button" className="btn btn-ghost work-more" onClick={() => setExpanded(true)}>+{list.length - limit}</button>
      )}
      <dialog
        ref={dlg}
        className="work-lightbox"
        data-lenis-prevent
        onClose={() => setOpen(null)}
        onClick={(e) => { if (e.target === dlg.current || (e.target as HTMLElement).tagName === "FIGURE") setOpen(null); }}
        onTouchStart={(e) => { touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }; }}
        onTouchEnd={(e) => {
          const s = touch.current; touch.current = null; if (!s) return;
          const dx = e.changedTouches[0].clientX - s.x, dy = e.changedTouches[0].clientY - s.y;
          if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) go(dx < 0 ? 1 : -1);
          else if (dy > 90 && Math.abs(dy) > Math.abs(dx)) setOpen(null);
        }}
      >
        {cur && (
          <figure>
            <Image key={cur.src} src={cur.src} alt={cur.caption} width={cur.w} height={cur.h} sizes="(max-width: 700px) 100vw, 80vw" />
            <figcaption>{cur.caption} <span className="mono muted">{(open ?? 0) + 1}/{list.length}</span></figcaption>
          </figure>
        )}
        <button type="button" className="lb-btn lb-close" onClick={() => setOpen(null)} aria-label={labels.close}>×</button>
        <button type="button" className="lb-btn lb-prev" onClick={() => go(-1)} aria-label={labels.prev}>‹</button>
        <button type="button" className="lb-btn lb-next" onClick={() => go(1)} aria-label={labels.next}>›</button>
      </dialog>
    </>
  );
}
