import type { SiteText } from "@/content/types";
import type { Locale } from "@/i18n/routing";
import { serviceLocales } from "@/i18n/routing";
import en from "@/content/en";
import uk from "@/content/uk";
import ru from "@/content/ru";
import pl from "@/content/pl";
import ro from "@/content/ro";
import es from "@/content/es";
import pt from "@/content/pt";
import it from "@/content/it";
import bn from "@/content/bn";
import gu from "@/content/gu";
import pa from "@/content/pa";
import ar from "@/content/ar";

const all: Record<Locale, SiteText> = { en, uk, ru, pl, ro, es, pt, it, bn, gu, pa, ar };

export const getContent = (locale: string): SiteText => all[(locale as Locale)] ?? en;

/** Service pages exist only in serviceLocales; other locales link to the English page. */
export const serviceLocaleFor = (locale: string): Locale =>
  (serviceLocales as string[]).includes(locale) ? (locale as Locale) : "en";

export const hasFullPages = (locale: string) => (serviceLocales as string[]).includes(locale);

export const gbp = (n: number) => "\u2066£" + n.toLocaleString("en-GB") + "\u2069";
