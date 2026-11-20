"use client";
import { useEffect, useState } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import Logo from "./Logo";
import LangSwitcher from "./LangSwitcher";
import { CONTACT } from "@/content/services";
import type { SiteText } from "@/content/types";

export default function Header({ t, contractorsLocale }: { t: SiteText["nav"]; contractorsLocale?: string }) {
  const [solid, setSolid] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const lightTop = pathname === "/faq";
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setSolid(y > 40);
      setHidden(y > 400 && y > last + 4);
      if (y < last - 4) setHidden(false);
      last = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => { document.body.style.overflow = open ? "hidden" : ""; }, [open]);
  const links: { href: string; label: string; locale?: string }[] = [
    { href: "/services", label: t.services },
    { href: "/contractors", label: t.contractors, locale: contractorsLocale },
    { href: "/#how", label: t.how },
    { href: "/#areas", label: t.areas },
    { href: "/faq", label: t.faq },
  ];
  return (
    <>
      <header className={`header${solid || lightTop ? " is-solid" : ""}${hidden && !open ? " is-hidden" : ""}`}>
        <div className="wrap header-row">
          <Link href="/" className="logo" aria-label="Frameon Drylining — home"><Logo /><span>FRAMEON</span></Link>
          <nav className="nav" aria-label="Main">
            {links.map((l) => <Link key={l.href} href={l.href} locale={l.locale}>{l.label}</Link>)}
          </nav>
          <div className="header-actions">
            <LangSwitcher label={t.language} />
            <a className="header-phone" href={CONTACT.phoneHref}>{CONTACT.phoneDisplay}</a>
            <Link href="/quote" className="btn btn-primary">{t.getPrice}</Link>
            <button type="button" className="burger" aria-label={t.menu} aria-expanded={open} onClick={() => setOpen(true)}><span /><span /></button>
          </div>
        </div>
      </header>
      {open && (
        <div className="mobile-menu" role="dialog" aria-modal="true" aria-label={t.menu}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Link href="/" className="logo" onClick={() => setOpen(false)}><Logo /><span>FRAMEON</span></Link>
            <button type="button" className="burger" style={{ display: "flex" }} aria-label={t.close} onClick={() => setOpen(false)}>
              <span style={{ transform: "translateY(4px) rotate(45deg)" }} /><span style={{ transform: "translateY(-4px) rotate(-45deg)" }} />
            </button>
          </div>
          <nav aria-label="Mobile">
            {links.map((l) => <Link key={l.href} href={l.href} locale={l.locale} onClick={() => setOpen(false)}>{l.label}</Link>)}
          </nav>
          <Link href="/quote" className="btn btn-primary" onClick={() => setOpen(false)}>{t.getPrice}</Link>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16 }}>
            <a href={CONTACT.phoneHref} className="lead">{CONTACT.phoneDisplay}</a>
            <LangSwitcher label={t.language} />
          </div>
        </div>
      )}
    </>
  );
}
