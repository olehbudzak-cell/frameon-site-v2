import type { QA } from "@/content/types";

export default function Faq({ items }: { items: QA[] }) {
  return (
    <div>
      {items.map((it) => (
        <details key={it.q} className="faq-item">
          <summary>{it.q}<i aria-hidden="true">+</i></summary>
          <p>{it.a}</p>
        </details>
      ))}
    </div>
  );
}

export const faqJsonLd = (items: QA[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: items.map((i) => ({ "@type": "Question", name: i.q, acceptedAnswer: { "@type": "Answer", text: i.a } })),
});
