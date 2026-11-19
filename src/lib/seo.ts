import type { Metadata } from "next";
import { locales, routing, type Locale } from "@/i18n/routing";
import { CONTACT, services } from "@/content/services";
import { BOROUGHS } from "@/content/areas";
import { getContent, serviceLocaleFor } from "@/lib/content";

const prefix = (locale: string) => (locale === routing.defaultLocale ? "" : `/${locale}`);

export const urlFor = (locale: string, path: string) => {
  const p = path === "/" ? "" : path;
  return `${CONTACT.site}${prefix(locale)}${p}` || CONTACT.site;
};

/** Canonical + hreflang alternates for a page available in the given locales. */
export function pageMeta(opts: {
  locale: string;
  path: string;
  title: string;
  description: string;
  available?: readonly Locale[];
  image?: string;
}): Metadata {
  const available = opts.available ?? locales;
  const languages: Record<string, string> = {};
  for (const l of available) languages[l === "uk" ? "uk-UA" : l === "en" ? "en-GB" : l] = urlFor(l, opts.path);
  languages["x-default"] = urlFor("en", opts.path);
  const canonical = urlFor(opts.locale, opts.path);
  const image = opts.image ?? "/images/finished-loft-conversion.jpg";
  return {
    title: opts.title,
    description: opts.description,
    alternates: { canonical, languages },
    openGraph: {
      title: opts.title,
      description: opts.description,
      url: canonical,
      siteName: "Frameon Drylining",
      locale: ({ en: "en_GB", uk: "uk_UA", ru: "ru_RU", pl: "pl_PL", ro: "ro_RO", es: "es_ES", pt: "pt_PT", it: "it_IT", bn: "bn_BD", gu: "gu_IN", pa: "pa_IN", ar: "ar_AR" } as Record<string, string>)[opts.locale] ?? opts.locale,
      type: "website",
      images: [{ url: image, width: 1920, height: 1086 }],
    },
    twitter: { card: "summary_large_image", title: opts.title, description: opts.description, images: [image] },
  };
}

export const businessJsonLd = (locale: string) => ({
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  "@id": `${CONTACT.site}/#business`,
  name: "Frameon Drylining",
  alternateName: "Frameon",
  description: "Labour-only drylining contractors in London: stud partitions, SFS framing, wall linings, MF suspended ceilings, pipe boxing, bulkheads and insulation.",
  slogan: "Frame. Board. Done.",
  url: urlFor(locale, "/"),
  logo: `${CONTACT.site}/favicon.svg`,
  image: [`${CONTACT.site}/portfolio/mf-ceilings/01-b31.webp`, `${CONTACT.site}/portfolio/stud-partitions/01-b43.webp`, `${CONTACT.site}/portfolio/sfs-framing/01-b48.webp`],
  telephone: "+447771119552",
  email: CONTACT.email,
  priceRange: "££",
  currenciesAccepted: "GBP",
  address: { "@type": "PostalAddress", addressLocality: "London", addressRegion: "Greater London", addressCountry: "GB" },
  areaServed: [{ "@type": "City", name: "London" }, ...BOROUGHS.map((b) => ({ "@type": "AdministrativeArea", name: b }))],
  knowsAbout: ["Drylining", "Stud partitions", "Metal stud framing", "Timber stud walls", "SFS infill framing", "Plasterboard wall linings", "MF suspended ceilings", "Pipe boxing", "Bulkheads", "Acoustic partitions", "Fire-rated partitions", "Celotex insulation", "Mineral wool insulation", "Vapour control layers"],
  contactPoint: { "@type": "ContactPoint", telephone: "+447771119552", email: CONTACT.email, contactType: "sales", areaServed: "GB", availableLanguage: ["English", "Ukrainian", "Russian", "Polish"] },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Drylining services",
    itemListElement: services.map((s) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", "@id": `${urlFor(serviceLocaleFor(locale), `/services/${s.slug}`)}#service`, name: getContent(serviceLocaleFor(locale)).servicesText[s.slug].title, url: urlFor(serviceLocaleFor(locale), `/services/${s.slug}`) },
      ...(s.rate ? { priceSpecification: { "@type": "UnitPriceSpecification", price: s.rate, priceCurrency: "GBP", unitText: s.unit === "m" ? "linear metre" : "square metre", valueAddedTaxIncluded: false } } : {}),
    })),
  },
  sameAs: [CONTACT.facebook],
});

export const websiteJsonLd = (locale: string) => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${CONTACT.site}/#website`,
  url: CONTACT.site,
  name: "Frameon Drylining",
  inLanguage: locale,
  publisher: { "@id": `${CONTACT.site}/#business` },
});
