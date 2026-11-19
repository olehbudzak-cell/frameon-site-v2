"use client";
import { useState } from "react";
import type { SiteText } from "@/content/types";
import { CONTACT } from "@/content/services";
import { trackLead } from "./LeadEvents";
import { mailHref, MAIL_LABEL } from "@/lib/mail";

/**
 * Sends the request straight to the business email through FormSubmit (no backend needed),
 * with WhatsApp as the second option. If sending fails, the person is pointed to WhatsApp/email.
 */
const ENDPOINT = `https://formsubmit.co/ajax/${CONTACT.email}`;

export default function QuoteForm({ t, services, locale = "en" }: { t: SiteText["quote"]; services: { slug: string; title: string }[]; locale?: string }) {
  const [f, setF] = useState({ name: "", contact: "", postcode: "", service: services[0]?.title ?? "", message: "", website: "" });
  const [state, setState] = useState<"idle" | "sending" | "sent" | "fail">("idle");
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setF({ ...f, [k]: e.target.value });
  const body = `${t.service}: ${f.service}\n${t.postcode}: ${f.postcode}\n${t.message}: ${f.message}\n\n${f.name}\n${f.contact}`;

  const valid = (form: HTMLFormElement | null) => !!form && form.reportValidity();

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!valid(e.currentTarget) || state === "sending") return;
    if (f.website) { setState("sent"); return; } // honeypot: bots fill hidden fields
    setState("sending");
    try {
      const r = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: `Quote request — ${f.service} — ${f.postcode}`,
          _template: "table",
          _captcha: "false",
          Name: f.name, Contact: f.contact, Postcode: f.postcode, Service: f.service, Details: f.message,
          Page: typeof location !== "undefined" ? location.href : "",
        }),
      });
      const j = await r.json().catch(() => ({}));
      if (!r.ok || String(j.success) !== "true") throw new Error("send failed");
      setState("sent");
      trackLead("form");
    } catch {
      setState("fail");
    }
  };

  const viaWhatsapp = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!valid(e.currentTarget.form)) return;
    trackLead("whatsapp_form");
    window.open(`${CONTACT.whatsapp}?text=${encodeURIComponent(body)}`, "_blank", "noopener");
  };

  const viaEmail = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    trackLead("email_form");
    window.location.href = mailHref(locale, { service: f.service, details: body });
  };

  if (state === "sent") {
    return (
      <div className="form-done" role="status">
        <p className="h3" style={{ margin: 0 }}>{t.sent}</p>
        <p className="muted" style={{ margin: 0 }}>{t.photosHint}</p>
        <a className="btn btn-primary" href={CONTACT.whatsapp} target="_blank" rel="noopener">WhatsApp</a>
      </div>
    );
  }

  return (
    <form className="form" onSubmit={submit} noValidate={false}>
      <label>{t.name} *<input name="name" required autoComplete="name" value={f.name} onChange={set("name")} /></label>
      <label>{t.contact} *<input name="contact" required autoComplete="tel" value={f.contact} onChange={set("contact")} /></label>
      <label>{t.postcode} *<input name="postcode" required autoComplete="postal-code" value={f.postcode} onChange={set("postcode")} /></label>
      <label>{t.service}
        <select name="service" value={f.service} onChange={set("service")}>{services.map((s) => <option key={s.slug}>{s.title}</option>)}</select>
      </label>
      <label className="full">{t.message}<textarea name="message" placeholder={t.messagePlaceholder} value={f.message} onChange={set("message")} /></label>
      <label className="hp" aria-hidden="true">Website<input tabIndex={-1} autoComplete="off" value={f.website} onChange={set("website")} /></label>
      <p className="full muted" style={{ margin: 0, fontSize: 14 }}>{t.photosHint}</p>
      {state === "fail" && <p className="full form-error" role="alert">{t.sendFail}</p>}
      <div className="full" style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <button type="submit" className="btn btn-primary" disabled={state === "sending"} aria-busy={state === "sending"}>
          {state === "sending" ? t.sending : t.sendForm}
        </button>
        <button type="button" className="btn btn-ghost" onClick={viaWhatsapp}>{t.sendWhatsapp}</button>
        <button type="button" className="btn btn-ghost" onClick={viaEmail}>{MAIL_LABEL[locale] ?? MAIL_LABEL.en}</button>
      </div>
    </form>
  );
}
