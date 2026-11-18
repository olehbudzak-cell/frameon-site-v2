"use client";

export default function Stepper({ label, value, onChange, step = 0.5 }: { label: string; value: number; onChange: (v: number) => void; step?: number }) {
  const clamp = (v: number) => Math.min(100, Math.max(0, Math.round(v * 10) / 10));
  return (
    <label className="field">
      <span>{label}</span>
      <span className="stepper">
        <button type="button" aria-label={`${label} −`} onClick={() => onChange(clamp(value - step))}>−</button>
        <input type="number" inputMode="decimal" min={0} step={0.1} value={value} onChange={(e) => onChange(clamp(parseFloat(e.target.value) || 0))} />
        <button type="button" aria-label={`${label} +`} onClick={() => onChange(clamp(value + step))}>+</button>
      </span>
    </label>
  );
}
