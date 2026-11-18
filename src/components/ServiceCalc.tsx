"use client";
import { useState } from "react";
import type { SiteText } from "@/content/types";
import { CONTACT } from "@/content/services";
import Stepper from "./Stepper";

const gbp = (n: number) => "\u2066£" + n.toLocaleString("en-GB") + "\u2069";

/** Service-page estimate: one rate, optional build-up chips recorded in the WhatsApp message. */
export default function ServiceCalc(props: {
  t: SiteText["calc"];
  title: string;
  service: string;
  rate: number;
  unit: "m2" | "m";
  stripe: string;
  options?: string[];
  optionsLabel: string;
}) {
  const { t, rate, unit } = props;
  const [len, setLen] = useState(5);
  const [h, setH] = useState(2.5);
  const [opt, setOpt] = useState(0);
  const qty = unit === "m" ? len : len * h;
  const price = qty > 0 ? Math.max(350, Math.round(qty * rate)) : 0;
  const u = unit === "m" ? t.metres : t.area;
  const chosen = props.options?.[opt];
  const msg = `${t.whatsappIntro}\n${props.service}${chosen ? ` — ${chosen}` : ""}\n${unit === "m" ? `${len} ${t.metres}` : `${len} × ${h} = ${qty.toFixed(1)} ${t.area}`}\n${t.from} ${gbp(price)} (${t.labourOnly})`;
  return (
    <div className="calc-card">
      <div className="stripe" style={{ background: props.stripe }} />
      <div className="in">
        <h2 className="h3">{props.title}</h2>
        {props.options && props.options.length > 1 && (
          <div className="field">
            <span>{props.optionsLabel}</span>
            <div className="chips" role="radiogroup" aria-label={props.optionsLabel}>
              {props.options.map((o, i) => (
                <button key={o} type="button" role="radio" aria-checked={i === opt} className="chip" onClick={() => setOpt(i)}>{o}</button>
              ))}
            </div>
          </div>
        )}
        <div className="dims">
          <Stepper label={t.length} value={len} onChange={setLen} />
          {unit === "m2" && <Stepper label={t.height} value={h} onChange={setH} />}
        </div>
        <div style={{ borderBlock: "1px solid var(--color-smoke)", paddingBlock: 18, display: "flex", flexDirection: "column", gap: 6 }}>
          <span className="mono muted" style={{ fontSize: 11 }}>{qty.toFixed(1)} {u} · {t.labourOnly} · {t.from} {gbp(rate)}/{u}</span>
          <output className="calc-price" aria-live="polite">{price ? `${t.from} ${gbp(price)}` : "—"}</output>
          {price > 0 && Math.max(350, Math.round(price * 0.85)) < price && <span className="muted" style={{ fontSize: 14 }}>{t.discount} {gbp(Math.max(350, Math.round(price * 0.85)))}</span>}
        </div>
        <a className="btn btn-primary" href={`${CONTACT.whatsapp}?text=${encodeURIComponent(msg)}`} target="_blank" rel="noopener">{t.send}</a>
        <p className="muted" style={{ margin: 0, fontSize: 13 }}>{t.note}</p>
      </div>
    </div>
  );
}
