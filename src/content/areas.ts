/** London boroughs we cover — shown on service pages and used as areaServed in structured data. */
export const BOROUGHS = [
  "Barking and Dagenham", "Barnet", "Bexley", "Brent", "Bromley", "Camden", "City of London", "Croydon", "Ealing", "Enfield",
  "Greenwich", "Hackney", "Hammersmith and Fulham", "Haringey", "Harrow", "Havering", "Hillingdon", "Hounslow", "Islington",
  "Kensington and Chelsea", "Kingston upon Thames", "Lambeth", "Lewisham", "Merton", "Newham", "Redbridge", "Richmond upon Thames",
  "Southwark", "Sutton", "Tower Hamlets", "Waltham Forest", "Wandsworth", "Westminster",
];

export const AREAS_TEXT: Record<string, { title: string; lead: (service: string) => string }> = {
  en: { title: "Areas we cover", lead: (s) => `${s} across all 32 London boroughs and the City of London — the same labour-only prices everywhere, same-day reply.` },
  uk: { title: "Де ми працюємо", lead: (s) => `${s}: усі 32 райони Лондона та City of London — однакові ціни за роботу всюди, відповідь у той самий день.` },
};
