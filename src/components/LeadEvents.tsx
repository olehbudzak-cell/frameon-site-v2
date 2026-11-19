"use client";
import { useEffect } from "react";
import { track } from "@vercel/analytics";

/** Records a lead action (anonymous, cookie-free) in Vercel Web Analytics. */
export function trackLead(type: string) {
  try { track("lead", { type, path: location.pathname }); } catch { /* analytics off */ }
}

/** Counts clicks on phone, WhatsApp and email links anywhere on the site. */
export default function LeadEvents() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement)?.closest?.("a");
      const href = a?.getAttribute("href") || "";
      if (href.startsWith("tel:")) trackLead("call");
      else if (href.includes("wa.me")) trackLead("whatsapp");
      else if (href.startsWith("mailto:")) trackLead("email");
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);
  return null;
}
