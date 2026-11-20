import { CONTACT } from "@/content/services";

/** Ready-made email templates: the client's mail app opens with subject + fields to fill in. */
const TPL: Record<string, { subject: string; hello: string; fields: string[]; photos: string; serviceLabel: string }> = {
  en: {
    subject: "Quote request",
    hello: "Hello Frameon,\n\nI'd like a quote for:",
    serviceLabel: "Service",
    fields: ["Postcode", "Rough sizes (length × height)", "Build-up (standard / acoustic / fire / moisture)", "Who supplies materials", "Preferred start date", "Name and phone"],
    photos: "I'm attaching photos of the area.",
  },
  uk: {
    subject: "Запит на розрахунок",
    hello: "Добрий день, Frameon!\n\nХочу отримати розрахунок на:",
    serviceLabel: "Послуга",
    fields: ["Поштовий індекс", "Приблизні розміри (довжина × висота)", "Тип (звичайна / акустична / вогнестійка / вологостійка)", "Хто постачає матеріали", "Бажана дата початку", "Ім'я та телефон"],
    photos: "Додаю фото місця робіт.",
  },
};

export const MAIL_LABEL: Record<string, string> = {
  en: "Email us", uk: "Написати на email", ru: "Написать на email", pl: "Napisz e-mail", ro: "Scrie-ne pe e-mail", es: "Escríbenos un email",
  pt: "Envie-nos um email", it: "Scrivici un'email", ar: "راسلنا بالبريد", bn: "ইমেইল করুন", gu: "ઇમેઇલ કરો", pa: "ਈਮੇਲ ਕਰੋ",
};
export const MAIL_ESTIMATE: Record<string, string> = { en: "Send this estimate by email", uk: "Надіслати розрахунок на email" };

export type MailOpts = { service?: string; details?: string };

export function mailParts(locale: string, opts: MailOpts = {}) {
  const t = TPL[locale] ?? TPL.en;
  const subject = `${t.subject}${opts.service ? ` — ${opts.service}` : ""} | Frameon Drylining`;
  const lines = [
    `${t.hello} ${opts.service ?? ""}`.trim(),
    ...(opts.details ? ["", opts.details] : []),
    "",
    ...t.fields.map((f) => `${f}: `),
    "",
    t.photos,
  ];
  return { to: CONTACT.email, subject, body: lines.join("\n") };
}

export function mailHref(locale: string, opts: MailOpts = {}) {
  const m = mailParts(locale, opts);
  return `mailto:${m.to}?subject=${encodeURIComponent(m.subject)}&body=${encodeURIComponent(m.body)}`;
}

/** Web-mail compose links: work on computers with no mail app set up (mailto does nothing there). */
export function gmailHref(locale: string, opts: MailOpts = {}) {
  const m = mailParts(locale, opts);
  return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(m.to)}&su=${encodeURIComponent(m.subject)}&body=${encodeURIComponent(m.body)}`;
}
export function outlookHref(locale: string, opts: MailOpts = {}) {
  const m = mailParts(locale, opts);
  return `https://outlook.live.com/mail/0/deeplink/compose?to=${encodeURIComponent(m.to)}&subject=${encodeURIComponent(m.subject)}&body=${encodeURIComponent(m.body)}`;
}

export const MAIL_MENU: Record<string, { gmail: string; outlook: string; app: string; copy: string; copied: string }> = {
  en: { gmail: "Open in Gmail", outlook: "Open in Outlook", app: "Mail app on this computer", copy: "Copy email address", copied: "Copied" },
  uk: { gmail: "Відкрити в Gmail", outlook: "Відкрити в Outlook", app: "Поштова програма на комп’ютері", copy: "Скопіювати адресу", copied: "Скопійовано" },
  ru: { gmail: "Открыть в Gmail", outlook: "Открыть в Outlook", app: "Почтовая программа", copy: "Скопировать адрес", copied: "Скопировано" },
  pl: { gmail: "Otwórz w Gmail", outlook: "Otwórz w Outlook", app: "Program pocztowy", copy: "Kopiuj adres", copied: "Skopiowano" },
  ro: { gmail: "Deschide în Gmail", outlook: "Deschide în Outlook", app: "Aplicația de e-mail", copy: "Copiază adresa", copied: "Copiat" },
  es: { gmail: "Abrir en Gmail", outlook: "Abrir en Outlook", app: "Aplicación de correo", copy: "Copiar dirección", copied: "Copiado" },
  pt: { gmail: "Abrir no Gmail", outlook: "Abrir no Outlook", app: "Aplicação de e-mail", copy: "Copiar endereço", copied: "Copiado" },
  it: { gmail: "Apri in Gmail", outlook: "Apri in Outlook", app: "App di posta", copy: "Copia indirizzo", copied: "Copiato" },
};
