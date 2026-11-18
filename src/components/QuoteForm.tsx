"use client";
import { useState } from "react";
import type { SiteText } from "@/content/types";
import { CONTACT } from "@/content/services";

/** No backend: composes the request into WhatsApp or an email the client sends themselves. */
export default function QuoteForm({ t, services }: { t: SiteText["quote"]; services: { slug: string; title: string }[] }) {
  const [f, setF] = useState({ name: "", contact: "", postcode: "", service: services[0]?.title ?? "", message: "" });
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setF({ ...f, [k]: e.target.value });
  const body = `${t.service}: ${f.service}\n${t.postcode}: ${f.postcode}\n${t.message}: ${f.message}\n\n${f.name}\n${f.contact}`;
  const ok = f.name.trim() && f.contact.trim() && f.postcode.trim();
  const send = (via: "wa" | "mail") => (e: React.MouseEvent) => {
    e.preventDefault();
    if (!ok) { (document.querySelector("#q-name") as HTMLInputElement)?.reportValidity(); return; }
    const url = via === "wa"
      ? `${CONTACT.whatsapp}?text=${encodeURIComponent(body)}`
      : `mailto:${CONTACT.email}?subject=${encodeURIComponent("Quote request — " + f.service + " — " + f.postcode)}&body=${encodeURIComponent(body)}`;
    window.open(url, via === "wa" ? "_blank" : "_self");
  };
  return (
    <form className="form" onSubmit={(e) => e.preventDefault()}>
      <label>{t.name} *<input id="q-name" required autoComplete="name" value={f.name} onChange={set("name")} /></label>
      <label>{t.contact} *<input required autoComplete="tel" value={f.contact} onChange={set("contact")} /></label>
      <label>{t.postcode} *<input required autoComplete="postal-code" value={f.postcode} onChange={set("postcode")} /></label>
      <label>{t.service}
        <select value={f.service} onChange={set("service")}>{services.map((s) => <option key={s.slug}>{s.title}</option>)}</select>
      </label>
      <label className="full">{t.message}<textarea placeholder={t.messagePlaceholder} value={f.message} onChange={set("message")} /></label>
      <p className="full muted" style={{ margin: 0, fontSize: 14 }}>{t.photosHint}</p>
      <div className="full" style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <button type="submit" className="btn btn-primary" onClick={send("wa")}>{t.sendWhatsapp}</button>
        <button type="button" className="btn btn-ghost" onClick={send("mail")}>{t.sendEmail}</button>
      </div>
    </form>
  );
}
