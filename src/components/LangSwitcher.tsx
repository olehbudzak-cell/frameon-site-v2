"use client";
import { useEffect, useRef, useState } from "react";
import { useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { locales, serviceLocales } from "@/i18n/routing";

const names: Record<string, string> = { en: "English", ro: "Română", es: "Español", pl: "Polski", bn: "বাংলা", pt: "Português", gu: "ગુજરાતી", it: "Italiano", pa: "ਪੰਜਾਬੀ", ar: "العربية", uk: "Українська", ru: "Русский" };
const short: Record<string, string> = { en: "EN", ro: "RO", es: "ES", pl: "PL", bn: "BN", pt: "PT", gu: "GU", it: "IT", pa: "PA", ar: "AR", uk: "UK", ru: "RU" };

export default function LangSwitcher({ label }: { label: string }) {
  const locale = useLocale();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const close = (e: MouseEvent) => { if (!ref.current?.contains(e.target as Node)) setOpen(false); };
    const esc = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("click", close);
    document.addEventListener("keydown", esc);
    return () => { document.removeEventListener("click", close); document.removeEventListener("keydown", esc); };
  }, []);
  const fullOnly = pathname.startsWith("/services/") || pathname.startsWith("/contractors");
  const target = (l: string) => (fullOnly && !(serviceLocales as string[]).includes(l) ? (pathname.startsWith("/services/") ? "/services" : "/") : pathname);
  return (
    <div className="lang" ref={ref}>
      <button type="button" className="lang-btn" aria-haspopup="true" aria-expanded={open} aria-label={label} onClick={() => setOpen((o) => !o)}>
        {short[locale]} ▾
      </button>
      {open && (
        <ul className="lang-menu" data-lenis-prevent style={{ maxHeight: "70vh", overflowY: "auto" }}>
          {locales.map((l) => (
            <li key={l}>
              <Link href={target(l)} locale={l} hrefLang={l} aria-current={l === locale ? "true" : undefined} onClick={() => setOpen(false)}>
                <span>{names[l]}</span><span className="muted mono">{short[l]}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
