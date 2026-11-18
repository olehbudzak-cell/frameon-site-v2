import type { ServiceSlug } from "./types";

export type ServiceMeta = {
  slug: ServiceSlug;
  n: string;
  image: string;
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
  { slug: "stud-partitions", n: "01", image: "/images/stud-partition-cutaway.jpg", board: BOARD.fire, rate: 30, unit: "m2", related: ["insulation", "taping-plastering-painting", "mf-ceilings"] },
  { slug: "sfs-framing", n: "02", image: "/images/sfs-framing-osb.jpg", board: BOARD.standard, rate: null, unit: null, related: ["insulation", "wall-linings", "stud-partitions"] },
  { slug: "wall-linings", n: "03", image: "/images/wall-lining-dot-dab.jpg", board: BOARD.standard, rate: 19, unit: "m2", related: ["insulation", "taping-plastering-painting", "boxing-bulkheads-reveals"] },
  { slug: "mf-ceilings", n: "04", image: "/images/mf-suspended-ceiling.jpg", board: BOARD.acoustic, rate: 28, unit: "m2", related: ["boxing-bulkheads-reveals", "stud-partitions", "taping-plastering-painting"] },
  { slug: "boxing-bulkheads-reveals", n: "05", image: "/images/boxing-bulkhead-reveals.jpg", board: BOARD.moisture, rate: 32, unit: "m", related: ["mf-ceilings", "wall-linings", "taping-plastering-painting"] },
  { slug: "insulation", n: "06", image: "/images/celotex-insulation.jpg", board: BOARD.celotex, rate: null, unit: null, related: ["stud-partitions", "wall-linings", "sfs-framing"] },
  { slug: "taping-plastering-painting", n: "07", image: "/images/taping-plastering-painting.jpg", board: BOARD.standard, rate: null, unit: null, related: ["flooring", "turnkey-refurbishment", "wall-linings"] },
  { slug: "flooring", n: "08", image: "/images/engineered-oak-flooring.jpg", board: BOARD.standard, rate: null, unit: null, related: ["tiling", "taping-plastering-painting", "turnkey-refurbishment"] },
  { slug: "tiling", n: "09", image: "/images/bathroom-tiling.jpg", board: BOARD.moisture, rate: null, unit: null, related: ["flooring", "boxing-bulkheads-reveals", "turnkey-refurbishment"] },
  { slug: "turnkey-refurbishment", n: "10", image: "/images/turnkey-loft-refurbishment.jpg", board: BOARD.brass, rate: null, unit: null, related: ["stud-partitions", "taping-plastering-painting", "flooring"] },
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

