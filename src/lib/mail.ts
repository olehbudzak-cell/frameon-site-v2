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

export function mailHref(locale: string, opts: { service?: string; details?: string } = {}) {
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
  return `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
}
