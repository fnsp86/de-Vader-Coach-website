import { getAllCourses, SKILL_COLORS } from './courses';

export interface AffiliateProduct {
  slug: string;
  title: string;
  description: string;
  category: 'boek' | 'tool' | 'speelgoed' | 'cursus';
  skill: string; // Maps to existing 8 skill categories
  affiliateUrl: string;
  price?: string;
  badge?: string;
  isOwnProduct?: boolean;
}

// ── External affiliate products ──────────────────────────────────────────────

const EXTERNAL_PRODUCTS: AffiliateProduct[] = [
  // Emotiecoaching
  {
    slug: 'hele-kind-bryson',
    title: 'Het Hele Kind',
    description:
      'Tina Payne Bryson & Daniel Siegel laten zien hoe je het brein van je kind helpt ontwikkelen. Praktisch en wetenschappelijk.',
    category: 'boek',
    skill: 'Emotiecoaching',
    affiliateUrl: 'https://www.bol.com/nl/nl/p/het-hele-kind/9300000006803462/',
    price: '€22,99',
    badge: 'Bestseller',
  },
  {
    slug: 'emotiecoaching-gottman',
    title: 'Raising an Emotionally Intelligent Child',
    description:
      'John Gottman\'s baanbrekende boek over emotiecoaching. De basis van onze cursus Emotiecoaching.',
    category: 'boek',
    skill: 'Emotiecoaching',
    affiliateUrl: 'https://www.bol.com/nl/nl/p/raising-an-emotionally-intelligent-child/1001004001964503/',
    price: '€16,99',
    badge: 'Aanrader',
  },

  // Zelfregulatie
  {
    slug: 'mindful-opvoeden-snel',
    title: 'Mindful Opvoeden',
    description:
      'Eline Snel leert je hoe je als ouder meer rust en bewustzijn brengt in je opvoeding. Inclusief meditatie-oefeningen.',
    category: 'boek',
    skill: 'Zelfregulatie',
    affiliateUrl: 'https://www.bol.com/nl/nl/p/mindful-opvoeden/9200000033518454/',
    price: '€20,99',
  },
  {
    slug: 'stilzitten-als-kikker',
    title: 'Stilzitten als een Kikker',
    description:
      'Mindfulness voor kinderen van 5-12 jaar. Inclusief CD met oefeningen. Ideaal om samen te doen.',
    category: 'boek',
    skill: 'Zelfregulatie',
    affiliateUrl: 'https://www.bol.com/nl/nl/p/stilzitten-als-een-kikker/1001004011891498/',
    price: '€17,99',
    badge: 'Bestseller',
  },

  // Grenzen
  {
    slug: 'positief-opvoeden-bez',
    title: 'Positief Opvoeden',
    description:
      'Grenzen stellen zonder straffen. Praktische aanpak voor ouders die consequent maar warm willen opvoeden.',
    category: 'boek',
    skill: 'Grenzen',
    affiliateUrl: 'https://www.bol.com/nl/nl/p/positief-opvoeden/9200000091437027/',
    price: '€19,99',
  },

  // Verbinding / Tieners
  {
    slug: 'puberteit-crone',
    title: 'Het Puberende Brein',
    description:
      'Eveline Crone legt uit wat er in het tienerbrein gebeurt. Onmisbaar voor vaders van pubers.',
    category: 'boek',
    skill: 'Verbinding',
    affiliateUrl: 'https://www.bol.com/nl/nl/p/het-puberende-brein/9200000009tried/',
    price: '€18,99',
    badge: 'Aanrader',
  },

  // Aanwezigheid
  {
    slug: 'telefoonvrij-opvoeden',
    title: 'How to Break Up with Your Phone',
    description:
      'Catherine Price helpt je een gezondere relatie met je telefoon op te bouwen. Meer aanwezig zijn begint hier.',
    category: 'boek',
    skill: 'Aanwezigheid',
    affiliateUrl: 'https://www.bol.com/nl/nl/p/how-to-break-up-with-your-phone/9200000082831802/',
    price: '€14,99',
  },

  // Herstel
  {
    slug: 'connected-parenting-neufeld',
    title: 'Hold On to Your Kids',
    description:
      'Gordon Neufeld over hechting en verbinding herstellen. Waarom ouders er meer toe doen dan leeftijdsgenoten.',
    category: 'boek',
    skill: 'Herstel',
    affiliateUrl: 'https://www.bol.com/nl/nl/p/hold-on-to-your-kids/1001004002010881/',
    price: '€15,99',
  },

  // Reflectie
  {
    slug: 'parenting-inside-out-siegel',
    title: 'Parenting from the Inside Out',
    description:
      'Daniel Siegel over hoe je eigen opvoeding je vaderschap beïnvloedt. Diepgaand en transformerend.',
    category: 'boek',
    skill: 'Reflectie',
    affiliateUrl: 'https://www.bol.com/nl/nl/p/parenting-from-the-inside-out/1001004001963815/',
    price: '€16,99',
    badge: 'Aanrader',
  },

  // Autonomie
  {
    slug: 'free-range-kids-skenazy',
    title: 'Free-Range Kids',
    description:
      'Lenore Skenazy over hoe je kinderen leert zelfstandig te zijn in een wereld die te beschermend is geworden.',
    category: 'boek',
    skill: 'Autonomie',
    affiliateUrl: 'https://www.bol.com/nl/nl/p/free-range-kids/9200000032789014/',
    price: '€14,99',
  },

  // Tools
  {
    slug: 'emotiekaarten-kinderen',
    title: 'Emotiekaarten voor Kinderen',
    description:
      'Set van 48 emotiekaarten met illustraties. Helpt kinderen hun gevoelens herkennen en benoemen.',
    category: 'tool',
    skill: 'Emotiecoaching',
    affiliateUrl: 'https://www.bol.com/nl/nl/p/emotiekaarten/',
    price: '€12,95',
  },
  {
    slug: 'zandloper-time-out',
    title: 'Zandloper Set (1-3-5 min)',
    description:
      'Visuele timer voor kinderen. Handig bij grenzen stellen, ademhalingsoefeningen of rustige momenten.',
    category: 'tool',
    skill: 'Grenzen',
    affiliateUrl: 'https://www.bol.com/nl/nl/p/zandloper-set/',
    price: '€9,95',
  },
];

// ── Own courses as products ──────────────────────────────────────────────────

function getOwnCourseProducts(): AffiliateProduct[] {
  return getAllCourses().map((course) => ({
    slug: `cursus-${course.slug}`,
    title: course.title,
    description: course.description,
    category: 'cursus' as const,
    skill: course.category,
    affiliateUrl: `/cursussen/${course.slug}`,
    price: `€${course.price.toFixed(2).replace('.', ',')}`,
    badge: 'Onze cursus',
    isOwnProduct: true,
  }));
}

// ── Helper functions ─────────────────────────────────────────────────────────

export function getAllProducts(): AffiliateProduct[] {
  return [...EXTERNAL_PRODUCTS, ...getOwnCourseProducts()];
}

export function getExternalProducts(): AffiliateProduct[] {
  return EXTERNAL_PRODUCTS;
}

export function getProductsBySkill(skill: string): AffiliateProduct[] {
  return getAllProducts().filter((p) => p.skill === skill);
}

export function getProductsByCategory(category: AffiliateProduct['category']): AffiliateProduct[] {
  return getAllProducts().filter((p) => p.category === category);
}

export function getRecommendationsForBlog(skill: string, limit = 3): AffiliateProduct[] {
  const products = getProductsBySkill(skill);
  // Prioritize: 1 own course + external products
  const own = products.filter((p) => p.isOwnProduct).slice(0, 1);
  const external = products.filter((p) => !p.isOwnProduct).slice(0, limit - own.length);
  return [...own, ...external].slice(0, limit);
}

export const PRODUCT_CATEGORIES = [
  { value: 'boek', label: 'Boeken' },
  { value: 'tool', label: 'Tools' },
  { value: 'speelgoed', label: 'Speelgoed' },
  { value: 'cursus', label: 'Onze Cursussen' },
] as const;

export { SKILL_COLORS };
