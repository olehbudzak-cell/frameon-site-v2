// Real photos from Frameon's own London sites (no renders). First item = cover.
import type { ServiceSlug } from "./types";

export type Photo = { src: string; w: number; h: number; en: string; uk: string };

export const portfolio: Partial<Record<ServiceSlug, Photo[]>> = {
  "stud-partitions": [
    { src: "/portfolio/stud-partitions/01-b43.webp", w: 960, h: 1280, en: "New stud partition boarded in fire-rated plasterboard", uk: "Нова перегородка на металокаркасі, обшита вогнестійким гіпсокартоном" },
    { src: "/portfolio/stud-partitions/02-a100.webp", w: 960, h: 1280, en: "Room boarded out, door openings framed", uk: "Кімната обшита, дверні прорізи обрамлені" },
    { src: "/portfolio/stud-partitions/03-a95.webp", w: 960, h: 1280, en: "Partition with a framed doorway", uk: "Перегородка з обрамленим дверним прорізом" },
    { src: "/portfolio/stud-partitions/04-a94.webp", w: 960, h: 1280, en: "Partition with a door opening, cables left for the electrician", uk: "Перегородка з дверним прорізом, кабелі виведені для електрика" },
    { src: "/portfolio/stud-partitions/05-b42.webp", w: 960, h: 1280, en: "Long partition boarded up to the ceiling", uk: "Довга перегородка, обшита до самої стелі" },
    { src: "/portfolio/stud-partitions/06-b67.webp", w: 960, h: 1280, en: "Stud frame on one side, boarded wall with a wide opening on the other", uk: "Каркас з одного боку, обшита стіна з широким прорізом з іншого" },
    { src: "/portfolio/stud-partitions/07-a77.webp", w: 1280, h: 960, en: "Metal stud frame with a door head, before boarding", uk: "Металевий каркас із перемичкою над дверима, до обшивки" },
    { src: "/portfolio/stud-partitions/08-b15.webp", w: 960, h: 1280, en: "Corridor partitions with door openings, boarded both sides", uk: "Перегородки коридору з дверними прорізами, обшиті з обох боків" },
    { src: "/portfolio/stud-partitions/09-b69.webp", w: 960, h: 1280, en: "New partition with a doorway into the next room", uk: "Нова перегородка з прорізом у сусідню кімнату" },
    { src: "/portfolio/stud-partitions/10-b75.webp", w: 960, h: 1280, en: "New room layout built with stud partitions", uk: "Нове планування кімнат на каркасних перегородках" },
  ],
  "sfs-framing": [
    { src: "/portfolio/sfs-framing/01-b48.webp", w: 960, h: 1280, en: "SFS framing on both sides, ceiling already boarded", uk: "SFS-каркас з обох боків, стеля вже обшита" },
    { src: "/portfolio/sfs-framing/02-b50.webp", w: 960, h: 1280, en: "Light-gauge steel frame with diagonal bracing", uk: "Легкий сталевий каркас із діагональними зв'язками" },
    { src: "/portfolio/sfs-framing/03-b49.webp", w: 960, h: 1280, en: "Steel-framed walls going up under a boarded ceiling", uk: "Сталеві каркасні стіни під обшитою стелею" },
    { src: "/portfolio/sfs-framing/04-b62.webp", w: 960, h: 1280, en: "SFS framing with service holes for cables and pipes", uk: "SFS-каркас з отворами під кабелі й труби" },
    { src: "/portfolio/sfs-framing/05-b61.webp", w: 960, h: 1280, en: "SFS frame with plywood pattresses for fixings", uk: "SFS-каркас із фанерними закладними під кріплення" },
    { src: "/portfolio/sfs-framing/06-b73.webp", w: 960, h: 1280, en: "Steel frame with sheathing boards at the fa\u00e7ade", uk: "Сталевий каркас з обшивкою плитами біля фасаду" },
    { src: "/portfolio/sfs-framing/07-b70.webp", w: 960, h: 1280, en: "Full-height steel framing in a double-height space", uk: "Сталевий каркас на всю висоту в приміщенні з подвійною висотою" },
    { src: "/portfolio/sfs-framing/08-b68.webp", w: 960, h: 1280, en: "Steel frame next to a boarded wall", uk: "Сталевий каркас поруч з уже обшитою стіною" },
    { src: "/portfolio/sfs-framing/09-b81.webp", w: 960, h: 1280, en: "Steel studs alongside boarded acoustic walls", uk: "Сталеві стійки поруч з обшитими акустичними стінами" },
    { src: "/portfolio/sfs-framing/10-b82.webp", w: 960, h: 1280, en: "Steel frame and acoustic board under a sloped ceiling", uk: "Сталевий каркас і акустична плита під похилою стелею" },
  ],
  "wall-linings": [
    { src: "/portfolio/wall-linings/01-a10.webp", w: 960, h: 1280, en: "Wall lining and boxed column next to the window", uk: "Обшивка стіни й обшита колона біля вікна" },
    { src: "/portfolio/wall-linings/02-a12.webp", w: 960, h: 1280, en: "Wall linings with a boxed corner, flat and straight", uk: "Обшивка стін з обшитим кутом — рівно й прямо" },
    { src: "/portfolio/wall-linings/03-a9.webp", w: 960, h: 1280, en: "Lining with a boxed-in service run at floor level", uk: "Обшивка стіни з коробом для комунікацій унизу" },
    { src: "/portfolio/wall-linings/04-a16.webp", w: 960, h: 1280, en: "Lined walls with a casing around the column", uk: "Обшиті стіни з коробом навколо колони" },
    { src: "/portfolio/wall-linings/05-a35.webp", w: 960, h: 1280, en: "Fire-rated wall lining from floor to ceiling", uk: "Вогнестійка обшивка стіни від підлоги до стелі" },
    { src: "/portfolio/wall-linings/06-a39.webp", w: 960, h: 1280, en: "Lined room with the MF ceiling frame above", uk: "Обшита кімната з каркасом стелі MF зверху" },
    { src: "/portfolio/wall-linings/07-a24.webp", w: 960, h: 1280, en: "Fire-board lining along a long wall", uk: "Обшивка довгої стіни вогнестійкою плитою" },
    { src: "/portfolio/wall-linings/08-a5.webp", w: 960, h: 1280, en: "Lining finished neatly up to the window", uk: "Обшивка акуратно заведена до вікна" },
    { src: "/portfolio/wall-linings/09-a34.webp", w: 960, h: 1280, en: "Lined wall and window return", uk: "Обшита стіна й відкіс вікна" },
    { src: "/portfolio/wall-linings/10-b72.webp", w: 960, h: 1280, en: "Acoustic board lining under a sloped ceiling", uk: "Акустична обшивка стіни під похилою стелею" },
  ],
  "mf-ceilings": [
    { src: "/portfolio/mf-ceilings/01-b31.webp", w: 960, h: 1280, en: "MF ceiling grid under a vaulted roof, skylight trimmed", uk: "Каркас стелі MF під склепінчастим дахом, світловий люк обрамлений" },
    { src: "/portfolio/mf-ceilings/02-b25.webp", w: 960, h: 1280, en: "MF grid with the skylight opening framed", uk: "Каркас MF з обрамленим отвором під світловий люк" },
    { src: "/portfolio/mf-ceilings/03-a86.webp", w: 960, h: 1280, en: "Sloped ceiling in MF furring channel", uk: "Похила стеля на профілі MF" },
    { src: "/portfolio/mf-ceilings/04-a97.webp", w: 960, h: 1280, en: "MF ceiling grid over a long open-plan room", uk: "Каркас стелі MF над довгою кімнатою-студією" },
    { src: "/portfolio/mf-ceilings/05-b26.webp", w: 960, h: 1280, en: "MF grid with a boarded bulkhead below", uk: "Каркас MF з обшитим бульхедом нижче" },
    { src: "/portfolio/mf-ceilings/06-a2.webp", w: 960, h: 1280, en: "MF ceiling frame in a fire-boarded room", uk: "Каркас стелі MF у кімнаті з вогнестійкою обшивкою" },
    { src: "/portfolio/mf-ceilings/07-b52.webp", w: 960, h: 1280, en: "MF ceiling with a skylight, looking to the window", uk: "Стеля MF зі світловим люком" },
    { src: "/portfolio/mf-ceilings/08-a87.webp", w: 960, h: 1280, en: "MF grid across sloped and flat ceiling sections", uk: "Каркас MF на похилій і рівній частинах стелі" },
    { src: "/portfolio/mf-ceilings/09-b20.webp", w: 960, h: 1280, en: "Corridor MF ceiling with fire board above", uk: "Стеля MF у коридорі, вогнестійка плита вище" },
    { src: "/portfolio/mf-ceilings/10-b33.webp", w: 960, h: 1280, en: "MF grid installed from a mobile tower", uk: "Монтаж каркаса MF з пересувної вишки" },
  ],
  "boxing-bulkheads-reveals": [
    { src: "/portfolio/boxing-bulkheads-reveals/01-a28.webp", w: 960, h: 1280, en: "Riser frame around the soil pipe, before boarding", uk: "Каркас короба навколо каналізаційного стояка, до обшивки" },
    { src: "/portfolio/boxing-bulkheads-reveals/02-a25.webp", w: 960, h: 1280, en: "Full-height riser frame next to the window", uk: "Каркас короба на всю висоту біля вікна" },
    { src: "/portfolio/boxing-bulkheads-reveals/03-a21.webp", w: 960, h: 1280, en: "Pipe boxing frame on a lined wall", uk: "Каркас короба для труби на обшитій стіні" },
    { src: "/portfolio/boxing-bulkheads-reveals/04-a37.webp", w: 960, h: 1280, en: "Boxing frame for a riser beside the glazing", uk: "Каркас короба для стояка біля скління" },
    { src: "/portfolio/boxing-bulkheads-reveals/05-a46.webp", w: 960, h: 1280, en: "Riser frame ready for boarding", uk: "Каркас стояка, готовий до обшивки" },
    { src: "/portfolio/boxing-bulkheads-reveals/06-a59.webp", w: 960, h: 1280, en: "Pipe boxing frame in a finished room", uk: "Каркас короба для труби в готовій кімнаті" },
    { src: "/portfolio/boxing-bulkheads-reveals/07-a27.webp", w: 960, h: 1280, en: "Riser and low-level boxing frame for pipes", uk: "Каркас стояка й низького короба для труб" },
    { src: "/portfolio/boxing-bulkheads-reveals/08-a23.webp", w: 960, h: 1280, en: "Fire-rated shaft lined in board", uk: "Вогнестійка шахта, обшита плитою" },
    { src: "/portfolio/boxing-bulkheads-reveals/09-b74.webp", w: 960, h: 1280, en: "Window reveals boarded in fire board", uk: "Віконні відкоси, обшиті вогнестійкою плитою" },
    { src: "/portfolio/boxing-bulkheads-reveals/10-b30.webp", w: 960, h: 1280, en: "Bulkhead over two door openings", uk: "Бульхед над двома дверними прорізами" },
  ],
  "insulation": [
    { src: "/portfolio/insulation/01-b46.webp", w: 960, h: 1280, en: "Foil-faced PIR boards cut tight between timber studs", uk: "Фольговані плити PIR щільно між дерев'яними стійками" },
    { src: "/portfolio/insulation/02-b45.webp", w: 960, h: 1280, en: "PIR insulation across a full wall, joints taped", uk: "Утеплення PIR на всю стіну з проклеєними швами" },
    { src: "/portfolio/insulation/03-b47.webp", w: 960, h: 1280, en: "Insulated wall before boarding, ceiling already boarded", uk: "Утеплена стіна перед обшивкою, стеля вже обшита" },
    { src: "/portfolio/insulation/04-b79.webp", w: 960, h: 1280, en: "Mineral wool laid over the ceiling grid", uk: "Мінвата над каркасом стелі" },
    { src: "/portfolio/insulation/05-b80.webp", w: 960, h: 1280, en: "Wool above the ceiling frame, acoustic wall boarded", uk: "Мінвата над каркасом стелі, акустична стіна обшита" },
    { src: "/portfolio/insulation/06-b76.webp", w: 960, h: 1280, en: "Insulated ceiling grid next to an acoustic wall", uk: "Утеплений каркас стелі поруч з акустичною стіною" },
    { src: "/portfolio/insulation/07-a78.webp", w: 1280, h: 960, en: "Mineral wool behind the sloped ceiling frame", uk: "Мінвата за каркасом похилої стелі" },
    { src: "/portfolio/insulation/08-a92.webp", w: 960, h: 1280, en: "Roof insulation above the new partitions", uk: "Утеплення даху над новими перегородками" },
    { src: "/portfolio/insulation/09-b60.webp", w: 960, h: 1280, en: "Acoustic insulation rolls ready for the stud walls", uk: "Рулони акустичної мінвати для каркасних стін" },
    { src: "/portfolio/insulation/10-a72.webp", w: 1280, h: 960, en: "Wool above the ceiling frame before boarding", uk: "Мінвата над каркасом стелі перед обшивкою" },
  ],
};

export const caption = (p: Photo, locale: string) => (locale === "uk" ? p.uk : p.en);
export const coverOf = (slug: ServiceSlug) => portfolio[slug]?.[0];
