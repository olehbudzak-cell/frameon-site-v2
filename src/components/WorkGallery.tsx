"use client";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

type Item = { src: string; caption: string };
type L = { close: string; prev: string; next: string };

export default function WorkGallery({ items, labels }: { items: Item[]; labels: L }) {
  const [open, setOpen] = useState<number | null>(null);
  const [all, setAll] = useState(false);
  const dlg = useRef<HTMLDialogElement>(null);
  const shown = all ? items : items.slice(0, 8);

  const go = useCallback((d: number) => setOpen((i) => (i === null ? i : (i + d + items.length) % items.length)), [items.length]);

  useEffect(() => {
    const el = dlg.current;
    if (!el) return;
    if (open !== null && !el.open) el.showModal();
    if (open === null && el.open) el.close();
  }, [open]);

  useEffect(() => {
    if (open === null) return;
    const k = (e: KeyboardEvent) => { if (e.key === "ArrowRight") go(1); if (e.key === "ArrowLeft") go(-1); };
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [open, go]);

  return (
    <>
      <ul className="work-grid">
        {shown.map((it, i) => (
          <li key={it.src}>
            <button type="button" className="work-tile" onClick={() => setOpen(i)} aria-label={it.caption}>
              <Image src={it.src} alt={it.caption} fill sizes="(max-width: 700px) 50vw, (max-width: 1100px) 33vw, 25vw" />
              <span className="work-cap">{it.caption}</span>
            </button>
          </li>
        ))}
      </ul>
      {!all && items.length > 8 && (
        <button type="button" className="btn btn-ghost work-more" onClick={() => setAll(true)}>+{items.length - 8}</button>
      )}
      <dialog ref={dlg} className="work-lightbox" onClose={() => setOpen(null)} onClick={(e) => { if (e.target === dlg.current) setOpen(null); }}>
        {open !== null && (
          <figure>
            <Image src={items[open].src} alt={items[open].caption} width={960} height={1280} sizes="(max-width: 700px) 100vw, 60vh" />
            <figcaption>{items[open].caption} <span className="mono muted">{open + 1}/{items.length}</span></figcaption>
          </figure>
        )}
        <button type="button" className="lb-btn lb-close" onClick={() => setOpen(null)} aria-label={labels.close}>×</button>
        <button type="button" className="lb-btn lb-prev" onClick={() => go(-1)} aria-label={labels.prev}>‹</button>
        <button type="button" className="lb-btn lb-next" onClick={() => go(1)} aria-label={labels.next}>›</button>
      </dialog>
    </>
  );
}
