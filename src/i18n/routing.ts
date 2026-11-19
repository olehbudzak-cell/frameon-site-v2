import { defineRouting } from "next-intl/routing";

export const locales = ["en", "ro", "es", "pl", "bn", "pt", "gu", "it", "pa", "ar", "uk", "ru"] as const;
export const rtlLocales: string[] = ["ar"];
export type Locale = (typeof locales)[number];

/** Locales that have full service-page content. Others link service pages to English. */
export const serviceLocales: Locale[] = ["en", "uk"];

export const routing = defineRouting({
  locales: [...locales],
  defaultLocale: "en",
  localePrefix: "as-needed",
  // Never switch language by browser settings or a remembered cookie: English stays the
  // default and people change language only from the menu. This also stops a returning
  // visitor being sent to a page that does not exist in their last language.
  localeDetection: false,
});
