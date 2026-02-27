import type { BlogPostFull } from './blog-posts';

/** Client-safe type for dynamic blog posts */
export interface DynamicBlogPost extends BlogPostFull {
  slug: string;
  createdAt: string;
  updatedAt: string;
  published: boolean;
}

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 60);
}

export function estimateReadTime(content: string): number {
  const words = content.split(/\s+/).length;
  return Math.max(2, Math.ceil(words / 200));
}

export const BLOG_TEMPLATES: Record<string, { intro: string; structure: string }> = {
  Aanwezigheid: {
    intro: 'Een moment van volledige aandacht kan alles veranderen.',
    structure: `## [Persoonlijk moment]

[Beschrijf een herkenbaar moment als vader - kort en krachtig]

## De ontdekking

[Wat realiseerde je je? Wat leerde je?]

## Het inzicht

[Wetenschappelijke of psychologische achtergrond - kort en begrijpelijk]

---

*Meer lezen over aanwezigheid? In de cursus Aanwezig Vaderschap duiken we dieper in wat er gebeurt als je kind merkt dat je er echt bent.*`,
  },
  Emotiecoaching: {
    intro: 'Achter elk gedrag zit een emotie die begrepen wil worden.',
    structure: `## [De situatie]

[Beschrijf een situatie met je kind - emotioneel, herkenbaar]

## Wat je eerst deed

[De instinctieve reactie die de meeste vaders herkennen]

## Wat er echt aan de hand was

[De emotie achter het gedrag]

---

*In de cursus Emotiecoaching voor Vaders leer je precies wat er in het brein van je kind gebeurt - en hoe je het kunt kalmeren in plaats van escaleren.*`,
  },
  Zelfregulatie: {
    intro: 'De controle verliezen is menselijk. Leren het op te vangen is een vaardigheid.',
    structure: `## [Het moment]

[Beschrijf het moment dat je de controle verloor]

## De analyse

[Waarom reageerde je zo? Wat zat er achter?]

## De wetenschap

[Window of tolerance, triggers, zenuwstelsel - begrijpelijk uitgelegd]

---

*In de cursus Zelfregulatie als Vader leer je je eigen triggers herkennen en hoe je die cruciale seconden gebruikt om anders te reageren.*`,
  },
  Grenzen: {
    intro: 'Grenzen stellen gaat niet over hard zijn. Het gaat over duidelijk zijn.',
    structure: `## [De dagelijkse strijd]

[Een herkenbare situatie rond grenzen stellen]

## Het patroon

[Wat doe je steeds opnieuw dat niet werkt?]

## Het verschil

[Streng vs hard, grenzen vs controle]

---

*In de cursus Grenzen Stellen met Liefde leer je grenzen stellen die je kind serieus neemt - zonder te schreeuwen of dreigen.*`,
  },
  Autonomie: {
    intro: 'Loslaten is de moeilijkste verschuiving in het vaderschap.',
    structure: `## [Het moment van twijfel]

[Een situatie waarin je kind iets zelf wil doen]

## De beschermingsreflex

[Je instinct om in te grijpen]

## Wat je kind nodig heeft

[Frustratie als brandstof voor groei]

---

*De cursus Autonomie en Loslaten helpt je om de balans te vinden tussen beschermen en loslaten - voor elke leeftijd.*`,
  },
  Herstel: {
    intro: 'Het gaat niet om nooit fouten maken. Het gaat om wat je erna doet.',
    structure: `## [De fout]

[Beschrijf een moment waarop je te ver ging als vader]

## De stilte erna

[Het gevoel van schuld en spijt]

## Terugkomen

[Hoe je herstelt op een manier die de band sterker maakt]

---

*In de cursus Herstel na Conflict leer je hoe je terugkomt na een breuk - op een manier die de band sterker maakt dan daarvoor.*`,
  },
  Verbinding: {
    intro: 'Echte verbinding ontstaat niet door grote gebaren, maar door kleine momenten.',
    structure: `## [Het moment]

[Een onverwacht verbindingsmoment met je kind]

## Wat je verwachtte

[Hoe je dacht dat verbinding eruitzag]

## Wat werkelijk werkt

[De kracht van nabijheid, beschikbaarheid, kleine momenten]

---

*In de cursus Verbinding met je Tiener ontdek je waarom bepaalde settings werken en andere niet.*`,
  },
  Reflectie: {
    intro: 'De automatische piloot uitschakelen begint met bewustwording.',
    structure: `## [De herkenning]

[Het moment dat je jezelf hoort klinken als je eigen vader]

## De automatische piloot

[Hoe patronen uit je eigen jeugd je opvoeding bepalen]

## Bewust kiezen

[Hoe je kiest wat je wel en niet doorgeeft]

---

*In de cursus Reflectief Vaderschap leer je de patronen uit je eigen opvoeding herkennen en bewust kiezen wat je doorgeeft.*`,
  },
};
