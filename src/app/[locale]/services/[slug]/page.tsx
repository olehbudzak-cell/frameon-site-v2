import Image from "next/image";
import { notFound, permanentRedirect } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { serviceLocales, type Locale } from "@/i18n/routing";
import { getContent, hasFullPages, gbp } from "@/lib/content";
import { pageMeta, urlFor } from "@/lib/seo";
import { services, serviceBySlug, CONTACT } from "@/content/services";
import ServiceCalc from "@/components/ServiceCalc";
import ServiceCard from "@/components/ServiceCard";
import Faq, { faqJsonLd } from "@/components/Faq";
import JsonLd from "@/components/JsonLd";
import WorkGallery from "@/components/WorkGallery";
import { mailHref, MAIL_LABEL } from "@/lib/mail";
import { portfolio, caption } from "@/content/portfolio";
import { BOROUGHS, AREAS_TEXT } from "@/content/areas";
import MailButton from "@/components/MailButton";

type P = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return serviceLocales.flatMap((locale) => services.map((s) => ({ locale, slug: s.slug })));
}

export async function generateMetadata({ params }: P) {
  const { locale, slug } = await params;
  const page = getContent(locale).servicesText[slug]?.page;
  const meta = serviceBySlug(slug);
  if (!page || !meta || !hasFullPages(locale)) return {};
  return pageMeta({ locale, path: `/services/${slug}`, title: page.metaTitle, description: page.metaDescription, available: serviceLocales, image: meta.image });
}

export default async function ServicePage({ params }: P) {
  const { locale, slug } = await params;
  // Languages without full service pages get the English page instead of a 404.
  if (!hasFullPages(locale)) { if (serviceBySlug(slug)) permanentRedirect(`/services/${slug}`); notFound(); }
  setRequestLocale(locale);
  const t = getContent(locale);
  const meta = serviceBySlug(slug);
  const text = t.servicesText[slug];
  const page = text?.page;
  if (!meta || !page) notFound();

  const idx = services.findIndex((s) => s.slug === slug);
  const prev = services[(idx + services.length - 1) % services.length];
  const next = services[(idx + 1) % services.length];
  const u = meta.unit === "m" ? t.calc.metres : t.calc.area;
  const photos = portfolio[meta.slug] ?? [];

  const crumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: t.servicePage.breadcrumbHome, item: urlFor(locale, "/") },
      { "@type": "ListItem", position: 2, name: t.servicePage.breadcrumbServices, item: urlFor(locale, "/services") },
      { "@type": "ListItem", position: 3, name: text.title, item: urlFor(locale, `/services/${slug}`) },
    ],
  };
  const pageUrl = urlFor(locale, `/services/${slug}`);
  const areas = AREAS_TEXT[locale] ?? AREAS_TEXT.en;
  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${pageUrl}#service`,
    url: pageUrl,
    name: page.h1,
    description: page.metaDescription,
    serviceType: text.title,
    category: "Drylining",
    inLanguage: locale,
    image: photos.map((p) => `${CONTACT.site}${p.src}`),
    areaServed: [{ "@type": "City", name: "London" }, ...BOROUGHS.map((b) => ({ "@type": "AdministrativeArea", name: `London Borough of ${b}`.replace("London Borough of City of London", "City of London") }))],
    provider: { "@id": `${CONTACT.site}/#business` },
    hasOfferCatalog: { "@type": "OfferCatalog", name: page.optionsTitle, itemListElement: page.options.map((o) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: `${text.title} — ${o.name}`, description: o.text } })) },
    ...(meta.rate ? { offers: { "@type": "Offer", priceCurrency: "GBP", priceSpecification: { "@type": "UnitPriceSpecification", price: meta.rate, priceCurrency: "GBP", unitText: meta.unit === "m" ? "linear metre" : "square metre", valueAddedTaxIncluded: false } } } : {}),
  };

  const galleryLd = photos.length ? {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: `${text.title} — ${t.work.eyebrow}`,
    url: `${pageUrl}#work`,
    about: { "@id": `${pageUrl}#service` },
    image: photos.map((p) => ({ "@type": "ImageObject", contentUrl: `${CONTACT.site}${p.src}`, caption: caption(p, locale), width: p.w, height: p.h, creator: { "@id": `${CONTACT.site}/#business` } })),
  } : null;
  const webPageLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${pageUrl}#webpage`,
    url: pageUrl,
    name: page.metaTitle,
    description: page.metaDescription,
    inLanguage: locale,
    isPartOf: { "@id": `${CONTACT.site}/#website` },
    about: { "@id": `${pageUrl}#service` },
    primaryImageOfPage: { "@type": "ImageObject", contentUrl: `${CONTACT.site}${meta.image}` },
  };

  return (
    <article>
      <JsonLd data={webPageLd} />
      <JsonLd data={crumbs} />
      <JsonLd data={serviceLd} />
      {galleryLd && <JsonLd data={galleryLd} />}
      <JsonLd data={faqJsonLd(page.faq)} />

      <section className="wrap page-top" style={{ paddingBottom: 96 }}>
        <div className="svc-hero">
          <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
            <nav className="crumbs" aria-label="Breadcrumb">
              <Link href="/">{t.servicePage.breadcrumbHome}</Link><span>/</span>
              <Link href="/services">{t.servicePage.breadcrumbServices}</Link><span>/</span>
              <span style={{ color: "var(--color-brass)" }} aria-current="page">{text.title}</span>
            </nav>
            <span className="ghost-n" aria-hidden="true">{meta.n}</span>
            <h1 className="display" style={{ margin: 0, fontSize: "clamp(36px, 4.6vw, 64px)" }}>{page.h1}</h1>
            <p className="lead muted" style={{ margin: 0, maxWidth: 580 }}>{page.lead}</p>
            {meta.rate && <p className="mono" style={{ margin: 0, color: "var(--color-brass-light)" }}>{t.calc.from} {gbp(meta.rate)}/{u} · {t.calc.labourOnly}</p>}
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <a className="btn btn-primary" href="#estimate">{t.servicePage.calcTitle}</a>
              <a className="btn btn-ghost" href={CONTACT.whatsapp} target="_blank" rel="noopener">WhatsApp</a>
              <MailButton locale={locale} opts={{ service: text.title }} className="btn btn-ghost">{MAIL_LABEL[locale] ?? MAIL_LABEL.en}</MailButton>
            </div>
          </div>
          <div className="media">
            <span style={{ position: "absolute", inset: "0 0 auto 0", height: 4, background: meta.board, zIndex: 1 }} />
            <Image src={meta.image} alt={meta.real && photos[0] ? caption(photos[0], locale) : text.title} width={1200} height={1500} priority sizes="(max-width: 1000px) 100vw, 50vw" />
            <span className="mono photo-tag">{meta.real ? <><i aria-hidden="true" />{t.work.sitePhoto}</> : t.work.illustration}</span>
          </div>
        </div>
      </section>

      <section style={{ background: "var(--color-graphite)", borderBlock: "1px solid var(--color-smoke)" }}>
        <div className="wrap section" style={{ display: "grid", gap: 64 }}>
          <div className="prose" data-reveal>{page.intro.map((p) => <p key={p.slice(0, 24)}>{p}</p>)}</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
            <h2 className="h2" style={{ fontSize: "clamp(28px, 3vw, 44px)" }}>{page.includesTitle}</h2>
            <ul className="list">{page.includes.map((i) => <li key={i}>{i}</li>)}</ul>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
            <h2 className="h2" style={{ fontSize: "clamp(28px, 3vw, 44px)" }}>{page.optionsTitle}</h2>
            <div className="options">{page.options.map((o) => <div className="option" key={o.name}><h3 className="h3" style={{ fontSize: 19 }}>{o.name}</h3><p className="muted" style={{ margin: 0 }}>{o.text}</p></div>)}</div>
          </div>
        </div>
      </section>

      {photos.length > 0 && (
        <section id="work" className="wrap section" aria-labelledby="work-title">
          <div className="svc-work-head">
            <span className="eyebrow">{t.work.eyebrow} · {photos.length}</span>
            <h2 id="work-title" className="h2" style={{ fontSize: "clamp(28px, 3vw, 44px)" }}>{text.title}</h2>
            <p className="lead muted" style={{ margin: 0 }}>{t.work.real}</p>
          </div>
          <WorkGallery items={photos.map((p) => ({ src: p.src, w: p.w, h: p.h, caption: caption(p, locale) }))} labels={{ close: t.work.close, prev: t.work.prev, next: t.work.next }} />
        </section>
      )}

      <section id="estimate" className="wrap section svc-calc">
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <span className="eyebrow">{t.servicePage.processTitle}</span>
          <div className="proc" style={{ gridTemplateColumns: "repeat(2, minmax(0, 1fr))" }}>
            {page.process.map((p, i) => <div key={p.title}><span className="eyebrow">0{i + 1}</span><h3 className="h3" style={{ fontSize: 19 }}>{p.title}</h3><p className="muted" style={{ margin: 0 }}>{p.text}</p></div>)}
          </div>
        </div>
        {meta.rate && meta.unit ? (
          <ServiceCalc
            t={t.calc} title={t.servicePage.calcTitle} service={text.title} rate={meta.rate} unit={meta.unit} stripe={meta.board}
            options={page.options.map((o) => o.name)} optionsLabel={page.optionsTitle}
            locale={locale}
          />
        ) : (
          <div className="calc-card">
            <div className="stripe" style={{ background: meta.board }} />
            <div className="in">
              <h2 className="h3">{t.servicePage.priceOnSurvey}</h2>
              <p className="muted" style={{ margin: 0 }}>{t.servicePage.priceOnSurveyText}</p>
              <a className="btn btn-primary" href={`${CONTACT.whatsapp}?text=${encodeURIComponent(`${t.calc.whatsappIntro}\n${text.title}`)}`} target="_blank" rel="noopener">{t.calc.send}</a>
              <MailButton locale={locale} opts={{ service: text.title }} className="btn btn-ghost">{MAIL_LABEL[locale] ?? MAIL_LABEL.en}</MailButton>
              <Link className="btn btn-ghost" href="/quote">{t.nav.getPrice}</Link>
            </div>
          </div>
        )}
      </section>

      <section className="wrap section areas" aria-labelledby="areas-title">
        <h2 id="areas-title" className="h3">{areas.title}</h2>
        <p className="muted" style={{ margin: 0, maxWidth: 760 }}>{areas.lead(text.title)}</p>
        <ul className="areas-list">{BOROUGHS.map((b) => <li key={b}>{b}</li>)}</ul>
      </section>

      <section className="light">
        <div className="wrap section two-col">
          <h2 className="h2" style={{ fontSize: "clamp(28px, 3.2vw, 44px)" }}>{t.servicePage.faqTitle} {text.title.toLowerCase()}</h2>
          <Faq items={page.faq} />
        </div>
      </section>

      <section className="wrap section">
        <h2 className="h3" style={{ marginBottom: 32 }}>{t.servicePage.related}</h2>
        <div className="related">
          {meta.related.map((r) => {
            const m = serviceBySlug(r)!;
            return <ServiceCard key={r} s={m} text={t.servicesText[r]} locale={locale as Locale} priceLabel={m.rate ? `${t.calc.from} ${gbp(m.rate)}/${m.unit === "m" ? t.calc.metres : t.calc.area}` : t.calc.noRate} sizes="(max-width: 1000px) 100vw, 33vw" />;
          })}
        </div>
        <nav className="pager" aria-label="Services">
          <Link href={`/services/${prev.slug}`}><span className="mono muted">← {t.servicePage.prev}</span><strong>{t.servicesText[prev.slug].title}</strong></Link>
          <Link href={`/services/${next.slug}`} style={{ textAlign: "right" }}><span className="mono muted">{t.servicePage.next} →</span><strong>{t.servicesText[next.slug].title}</strong></Link>
        </nav>
      </section>
    </article>
  );
}
