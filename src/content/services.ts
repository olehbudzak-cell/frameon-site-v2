import type { ServiceSlug } from "./types";

export type ServiceMeta = {
  slug: ServiceSlug;
  n: string;
  image: string;
  /** true when image is a real site photo (portfolio cover), false for an illustration. */
  real?: boolean;
  board: string; // board-type colour stripe
  /** Labour-only rate from the current Frameon price list; null = priced after survey. */
  rate: number | null;
  unit: "m2" | "m" | null;
  related: ServiceSlug[];
};

export const BOARD = {
  fire: "#E9A3B4",
  acoustic: "#6F8FC7",
  moisture: "#7FA98A",
  standard: "#C9C5BE",
  celotex: "#C8B27A",
  brass: "#C9A66B",
};

export const services: ServiceMeta[] = [
  { slug: "stud-partitions", real: true, n: "01", image: "/portfolio/stud-partitions/01-b43.webp", board: BOARD.fire, rate: 30, unit: "m2", related: ["insulation", "mf-ceilings", "wall-linings"] },
  { slug: "sfs-framing", real: true, n: "02", image: "/portfolio/sfs-framing/01-b48.webp", board: BOARD.standard, rate: null, unit: null, related: ["insulation", "wall-linings", "stud-partitions"] },
  { slug: "wall-linings", real: true, n: "03", image: "/portfolio/wall-linings/01-a10.webp", board: BOARD.standard, rate: 19, unit: "m2", related: ["insulation", "boxing-bulkheads-reveals", "stud-partitions"] },
  { slug: "mf-ceilings", real: true, n: "04", image: "/portfolio/mf-ceilings/01-b31.webp", board: BOARD.acoustic, rate: 28, unit: "m2", related: ["boxing-bulkheads-reveals", "stud-partitions", "insulation"] },
  { slug: "boxing-bulkheads-reveals", real: true, n: "05", image: "/portfolio/boxing-bulkheads-reveals/01-a28.webp", board: BOARD.moisture, rate: 32, unit: "m", related: ["mf-ceilings", "wall-linings", "insulation"] },
  { slug: "insulation", real: true, n: "06", image: "/portfolio/insulation/01-b46.webp", board: BOARD.celotex, rate: null, unit: null, related: ["stud-partitions", "wall-linings", "sfs-framing"] },
];

export const serviceBySlug = (slug: string) => services.find((s) => s.slug === slug);

export const CONTACT = {
  phoneDisplay: "07771 119552",
  phoneHref: "tel:+447771119552",
  whatsapp: "https://wa.me/447771119552",
  email: "frameondrylining@gmail.com",
  site: "https://www.frameondrylining.co.uk",
  facebook: "https://www.facebook.com/frameondrylining",
};

export const SCENE = { desktopFrames: 96, mobileFrames: 72 };
