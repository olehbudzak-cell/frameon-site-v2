import { Link } from "@/i18n/navigation";
import { CONTACT, services } from "@/content/services";
import type { SiteText } from "@/content/types";
import type { Locale } from "@/i18n/routing";
import { locales } from "@/i18n/routing";

const names: Record<string, string> = { en: "English", ro: "Română", es: "Español", pl: "Polski", bn: "বাংলা", pt: "Português", gu: "ગુજરાતી", it: "Italiano", pa: "ਪੰਜਾਬੀ", ar: "العربية", uk: "Українська", ru: "Русский" };

export default function Footer({ t, svcLocale, locale }: { t: SiteText; svcLocale: Locale; locale: Locale }) {
  const svcText = t.servicesText;
  const first = services.slice(0, 5), second = services.slice(5);
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-cols">
          <div><span className="mono muted">{t.footer.services}</span>{first.map((s) => <Link key={s.slug} href={`/services/${s.slug}`} locale={svcLocale}>{svcText[s.slug].title}</Link>)}</div>
          <div><span className="mono muted">{t.footer.finishing}</span>{second.map((s) => <Link key={s.slug} href={`/services/${s.slug}`} locale={svcLocale}>{svcText[s.slug].title}</Link>)}</div>
          <div><span className="mono muted">{t.footer.company}</span>
            <Link href="/services">{t.nav.services}</Link>
            <Link href="/contractors" locale={svcLocale}>{t.nav.contractors}</Link>
            <Link href="/faq">{t.nav.faq}</Link>
            <Link href="/quote">{t.nav.getPrice}</Link>
            <Link href="/privacy">{t.footer.privacy}</Link>
          </div>
          <div><span className="mono muted">{t.footer.contact}</span>
            <a href={CONTACT.phoneHref}>{CONTACT.phoneDisplay}</a>
            <a href={CONTACT.whatsapp} target="_blank" rel="noopener">WhatsApp</a>
            <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
            <a href={CONTACT.facebook} target="_blank" rel="noopener">Facebook</a>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2px 16px", alignContent: "start" }}><span className="mono muted" style={{ gridColumn: "1 / -1" }}>{t.footer.language}</span>
            {locales.map((l) => <Link key={l} href="/" locale={l} hrefLang={l} className="native" style={l === locale ? { color: "var(--color-brass)" } : undefined}>{names[l]}</Link>)}
          </div>
        </div>
        <div className="wordmark" aria-hidden="true">FRAMEON</div>
        <div className="footer-bottom"><span>{t.footer.rights} · {t.footer.noCookies}</span><a href="#top">{t.footer.top} ↑</a></div>
      </div>
    </footer>
  );
}
