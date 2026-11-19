export type ServiceSlug =
  | "stud-partitions"
  | "sfs-framing"
  | "wall-linings"
  | "mf-ceilings"
  | "boxing-bulkheads-reveals"
  | "insulation"
  | "taping-plastering-painting"
  | "flooring"
  | "tiling"
  | "turnkey-refurbishment";

export type QA = { q: string; a: string };

/** Per-locale text for one service. Full pages exist only where `page` is present. */
export type ServiceText = {
  title: string;
  short: string;
  page?: {
    metaTitle: string;
    metaDescription: string;
    h1: string;
    lead: string;
    intro: string[];
    includesTitle: string;
    includes: string[];
    optionsTitle: string;
    options: { name: string; text: string }[];
    process: { title: string; text: string }[];
    faq: QA[];
  };
};

export type CalcKind = { id: string; label: string; unit: "m2" | "m"; rate: number; dim2?: string };

export type SiteText = {
  langName: string;
  meta: { homeTitle: string; homeDescription: string };
  nav: { services: string; contractors: string; how: string; areas: string; faq: string; getPrice: string; menu: string; close: string; language: string };
  hero: {
    eyebrow: string;
    h1: string;
    slogan: [string, string, string];
    lead: string;
    ctaWhatsapp: string;
    ctaPrice: string;
    badge: string;
    scroll: string;
  };
  build: {
    label: string;
    skip: string;
    stages: { tag: string; title: string; text: string; spec: string }[];
    serviceLink: string;
  };
  done: { title: string; stats: { value: string; label: string }[] };
  services: { eyebrow: string; title: string; more: string; all: string };
  work: { eyebrow: string; title: string; text: string; close: string; prev: string; next: string };
  xray: { eyebrow: string; title: string; text: string; cta: string; hint: string; before: string; after: string };
  contractors: {
    eyebrow: string;
    title: string;
    text: string;
    points: { title: string; text: string }[];
    cta: string;
    ctaSecondary: string;
    page: { metaTitle: string; metaDescription: string; h1: string; lead: string; sections: { title: string; text: string }[]; steps: { title: string; text: string }[] };
  };
  how: { eyebrow: string; title: string; steps: { title: string; text: string }[] };
  calc: {
    eyebrow: string;
    title: string;
    kinds: CalcKind[];
    length: string;
    height: string;
    width: string;
    area: string;
    metres: string;
    labourOnly: string;
    from: string;
    discount: string;
    send: string;
    note: string;
    whatsappIntro: string;
    noRate: string;
  };
  areas: { eyebrow: string; title: string; text: string; boroughs: string[] };
  faq: { eyebrow: string; title: string; items: QA[]; pageTitle: string; pageDescription: string };
  final: { title: string; cta: string };
  quote: {
    metaTitle: string;
    metaDescription: string;
    h1: string;
    lead: string;
    name: string;
    contact: string;
    postcode: string;
    service: string;
    message: string;
    messagePlaceholder: string;
    sendWhatsapp: string;
    sendEmail: string;
    sendForm: string;
    sending: string;
    sent: string;
    sendFail: string;
    photosHint: string;
    or: string;
    required: string;
  };
  servicePage: {
    breadcrumbHome: string;
    breadcrumbServices: string;
    calcTitle: string;
    priceOnSurvey: string;
    priceOnSurveyText: string;
    related: string;
    prev: string;
    next: string;
    faqTitle: string;
    processTitle: string;
    rotateHint: string;
    optionsChosen: string;
  };
  servicesHub: { metaTitle: string; metaDescription: string; h1: string; lead: string; groups: { title: string; slugs: string[] }[] };
  footer: { services: string; finishing: string; company: string; contact: string; language: string; rights: string; privacy: string; top: string; noCookies: string };
  privacy: { metaTitle: string; h1: string; body: string[] };
  notFound: { title: string; text: string; cta: string };
  servicesText: Record<string, ServiceText>;
};
