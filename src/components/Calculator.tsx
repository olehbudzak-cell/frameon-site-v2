"use client";
import { useState } from "react";
import type { SiteText } from "@/content/types";
import { CONTACT } from "@/content/services";
import Stepper from "./Stepper";

const gbp = (n: number) => "\u2066£" + n.toLocaleString("en-GB") + "\u2069";

/** Home-page quick estimate: four rated job types, labour only, £350 minimum. */
export default function Calculator({ t }: { t: SiteText["calc"] }) {
  const [kindId, setKind] = useState(t.kinds[0].id);
  const [len, setLen] = useState(5);
  const [h, setH] = useState(2.5);
  const k = t.kinds.find((x) => x.id === kindId)!;
  const qty = k.unit === "m" ? len : len * h;
  const price = qty > 0 ? Math.max(350, Math.round(qty * k.rate)) : 0;
  const unit = k.unit === "m" ? t.metres : t.area;
  const msg = `${t.whatsappIntro}\n${k.label}: ${k.unit === "m" ? `${len} ${t.metres}` : `${len} × ${h} = ${qty.toFixed(1)} ${t.area}`}\n${t.from} ${gbp(price)} (${t.labourOnly})`;
  return (
    <>
      <div className="calc">
        <div className="chips" role="radiogroup" aria-label={t.title}>
          {t.kinds.map((x) => (
            <button key={x.id} type="button" role="radio" aria-checked={x.id === kindId} className="chip" onClick={() => setKind(x.id)}>{x.label}</button>
          ))}
        </div>
        <div className="dims">
          <Stepper label={t.length} value={len} onChange={setLen} />
          {k.unit === "m2" && <Stepper label={k.dim2 === "width" ? t.width : t.height} value={h} onChange={setH} />}
        </div>
        <div className="calc-out">
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <span className="mono muted" style={{ fontSize: 11 }}>{qty.toFixed(1)} {unit} · {t.labourOnly} · {gbp(k.rate)}/{unit}</span>
            <output className="calc-price" aria-live="polite">{price ? `${t.from} ${gbp(price)}` : "—"}</output>
            {price > 0 && Math.max(350, Math.round(price * 0.85)) < price && <span className="muted" style={{ fontSize: 14 }}>{t.discount} {gbp(Math.max(350, Math.round(price * 0.85)))}</span>}
          </div>
          <a className="btn btn-primary" href={`${CONTACT.whatsapp}?text=${encodeURIComponent(msg)}`} target="_blank" rel="noopener">{t.send}</a>
        </div>
      </div>
      <p className="muted" style={{ marginTop: 18, fontSize: 14 }}>{t.note}</p>
    </>
  );
}
