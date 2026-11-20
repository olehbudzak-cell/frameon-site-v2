"use client";
import { useEffect, useState } from "react";
import { Link } from "@/i18n/navigation";
import { CONSENT_KEY, GA_HOST, GA_ID, OPEN_SETTINGS_EVENT, type ConsentText } from "@/lib/consent";

type Gtag = (...args: unknown[]) => void;
declare global {
  interface Window { dataLayer?: unknown[]; gtag?: Gtag }
}

const readChoice = (): string | null => {
  try { return localStorage.getItem(CONSENT_KEY); } catch { return null; }
};
const saveChoice = (v: "granted" | "denied") => {
  try { localStorage.setItem(CONSENT_KEY, v); } catch { /* storage blocked: banner shows again next visit */ }
};

/** Loads Google Analytics once, only after consent and only on the live domain. */
function loadGA() {
  if (location.hostname !== GA_HOST || window.gtag) return;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() { window.dataLayer!.push(arguments); } as Gtag;
  window.gtag("consent", "default", { analytics_storage: "granted", ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied" });
  window.gtag("js", new Date());
  window.gtag("config", GA_ID);
  const s = document.createElement("script");
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(s);
}

/** Withdraws consent: stops GA and removes its cookies. */
function stopGA() {
  window.gtag?.("consent", "update", { analytics_storage: "denied" });
  const host = location.hostname;
  const domains = ["", host, "." + host.replace(/^www\./, "")];
  document.cookie.split(";").map((c) => c.split("=")[0].trim()).filter((n) => n === "_ga" || n.startsWith("_ga_")).forEach((name) => {
    domains.forEach((d) => { document.cookie = `${name}=; Max-Age=0; path=/${d ? "; domain=" + d : ""}`; });
  });
}

export default function CookieConsent({ t, privacyLabel }: { t: ConsentText; privacyLabel: string }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const choice = readChoice();
    if (choice === "granted") loadGA();
    else if (choice !== "denied") setOpen(true);
    const reopen = () => setOpen(true);
    window.addEventListener(OPEN_SETTINGS_EVENT, reopen);
    return () => window.removeEventListener(OPEN_SETTINGS_EVENT, reopen);
  }, []);

  if (!open) return null;
  const decide = (v: "granted" | "denied") => {
    saveChoice(v);
    if (v === "granted") loadGA(); else stopGA();
    setOpen(false);
  };

  return (
    <div className="cookie-bar" role="region" aria-label={t.settings}>
      <p>{t.text} <Link href="/privacy">{privacyLabel}</Link></p>
      <div className="cookie-actions">
        <button type="button" className="btn btn-ghost" onClick={() => decide("denied")}>{t.reject}</button>
        <button type="button" className="btn btn-primary" onClick={() => decide("granted")}>{t.accept}</button>
      </div>
    </div>
  );
}

/** Footer / privacy-page button that reopens the cookie banner. */
export function CookieSettingsButton({ label, className }: { label: string; className?: string }) {
  return (
    <button type="button" className={className ?? "cookie-link"} onClick={() => window.dispatchEvent(new Event(OPEN_SETTINGS_EVENT))}>{label}</button>
  );
}
