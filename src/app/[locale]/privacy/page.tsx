import { setRequestLocale } from "next-intl/server";
import { getContent } from "@/lib/content";
import { pageMeta } from "@/lib/seo";
import { consentText } from "@/lib/consent";
import { CookieSettingsButton } from "@/components/CookieConsent";

/** Privacy text: the cookie lines come from the consent module, the rest from the locale file. */
const bodyFor = (locale: string, body: string[]) => { const c = consentText(locale); return [c.intro, body[1], c.ga, ...body.slice(2)]; };

type P = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: P) {
  const { locale } = await params;
  const t = getContent(locale).privacy;
  return pageMeta({ locale, path: "/privacy", title: t.metaTitle, description: consentText(locale).intro });
}

export default async function Privacy({ params }: P) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = getContent(locale).privacy;
  return (
    <section className="wrap section prose" style={{ paddingTop: 170, minHeight: "70svh" }}>
      <h1 className="h2" style={{ marginBottom: 32 }}>{t.h1}</h1>
      {bodyFor(locale, t.body).map((p) => <p key={p}>{p}</p>)}
      <p><CookieSettingsButton label={consentText(locale).settings} className="btn btn-ghost" /></p>
    </section>
  );
}
