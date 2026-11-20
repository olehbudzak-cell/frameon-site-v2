"use client";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { CONTACT } from "@/content/services";
import { gmailHref, mailHref, outlookHref, MAIL_MENU, type MailOpts } from "@/lib/mail";

/**
 * Email button. Phones: plain mailto (opens the mail app).
 * Computers: mailto often does nothing (no mail app set up), so a small menu offers
 * Gmail / Outlook web, the local mail app, or copying the address.
 */
export default function MailButton({ locale, opts, className, children, onOpen }: { locale: string; opts?: MailOpts; className?: string; children: ReactNode; onOpen?: () => void }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const wrap = useRef<HTMLSpanElement>(null);
  const t = MAIL_MENU[locale] ?? MAIL_MENU.en;

  useEffect(() => {
    if (!open) return;
    const away = (e: Event) => { if (wrap.current && !wrap.current.contains(e.target as Node)) setOpen(false); };
    const esc = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("pointerdown", away);
    document.addEventListener("keydown", esc);
    return () => { document.removeEventListener("pointerdown", away); document.removeEventListener("keydown", esc); };
  }, [open]);

  const click = (e: React.MouseEvent<HTMLAnchorElement>) => {
    onOpen?.();
    const desktop = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!desktop) return; // phone/tablet: let mailto open the mail app
    e.preventDefault();
    setCopied(false);
    setOpen((v) => !v);
  };

  const copy = async () => {
    try { await navigator.clipboard.writeText(CONTACT.email); setCopied(true); } catch { setCopied(false); }
  };

  return (
    <span className="mail-wrap" ref={wrap}>
      <a className={className} href={mailHref(locale, opts)} onClick={click} aria-haspopup="menu" aria-expanded={open}>{children}</a>
      {open && (
        <span className="mail-menu" role="menu">
          <a role="menuitem" href={gmailHref(locale, opts)} target="_blank" rel="noopener" onClick={() => setOpen(false)}>{t.gmail}</a>
          <a role="menuitem" href={outlookHref(locale, opts)} target="_blank" rel="noopener" onClick={() => setOpen(false)}>{t.outlook}</a>
          <a role="menuitem" href={mailHref(locale, opts)} onClick={() => setOpen(false)}>{t.app}</a>
          <button type="button" role="menuitem" onClick={copy}>{copied ? `${t.copied} ✓` : `${t.copy}: ${CONTACT.email}`}</button>
        </span>
      )}
    </span>
  );
}
