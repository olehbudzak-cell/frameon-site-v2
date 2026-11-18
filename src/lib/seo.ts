import type { Metadata } from "next";
import { locales, routing, type Locale } from "@/i18n/routing";
import { CONTACT } from "@/content/services";

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
  url: urlFor(locale, "/"),
  image: `${CONTACT.site}/images/finished-loft-conversion.jpg`,
  telephone: "+447771119552",
  email: CONTACT.email,
  priceRange: "££",
  areaServed: { "@type": "City", name: "London" },
  address: { "@type": "PostalAddress", addressLocality: "London", addressCountry: "GB" },
  sameAs: [CONTACT.facebook],
});
