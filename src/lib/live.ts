/**
 * The site is indexed by search engines only when SITE_LIVE=1 is set in the Vercel
 * project (do that when frameondrylining.co.uk points at this project). Until then the
 * preview on *.vercel.app stays out of Google so it never competes with the live site.
 */
export const SITE_LIVE = process.env.SITE_LIVE === "1";
