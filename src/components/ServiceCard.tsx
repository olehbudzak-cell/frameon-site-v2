import Image from "next/image";
import { Link } from "@/i18n/navigation";
import type { ServiceMeta } from "@/content/services";
import type { ServiceText } from "@/content/types";
import type { Locale } from "@/i18n/routing";

export default function ServiceCard({ s, text, locale, priceLabel, sizes = "(max-width: 760px) 50vw, (max-width: 1200px) 33vw, 20vw" }: { s: ServiceMeta; text: ServiceText; locale: Locale; priceLabel: string; sizes?: string }) {
  return (
    <Link href={`/services/${s.slug}`} locale={locale} className="svc">
      <span className="stripe" style={{ background: s.board }} />
      <span className="img"><Image src={s.image} alt={text.title} fill sizes={sizes} /></span>
      <span className="body">
        <span className="eyebrow">{s.n}</span>
        <span className="t">{text.title}</span>
        <span className="d">{text.short}</span>
        <span className="price">{priceLabel}</span>
      </span>
    </Link>
  );
}
