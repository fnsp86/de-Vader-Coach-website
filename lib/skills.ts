import { SKILL_COLORS } from './courses';

export interface Skill {
  slug: string;
  name: string;
  color: string;
  tagline: string;
  description: string;
  icon: string;
}

export const SKILLS: Skill[] = [
  {
    slug: 'aanwezigheid',
    name: 'Aanwezigheid',
    color: SKILL_COLORS.Aanwezigheid,
    tagline: 'Echt aanwezig zijn voor je kind',
    description:
      'Twee minuten echte aandacht doet meer dan een uur half aanwezig zijn. Aanwezigheid gaat niet over hoeveel tijd je hebt, maar over de kwaliteit van je aandacht. Leer hoe je in een druk leven toch de vader kunt zijn die er echt is.',
    icon: 'Eye',
  },
  {
    slug: 'emotiecoaching',
    name: 'Emotiecoaching',
    color: SKILL_COLORS.Emotiecoaching,
    tagline: 'De emoties van je kind begeleiden',
    description:
      'Wanneer je kind boos, bang of verdrietig is, heb je als vader een unieke kans. Niet om de emotie weg te nemen, maar om je kind te leren dat alle gevoelens welkom zijn. Emotiecoaching is de vaardigheid die de basis legt voor emotionele intelligentie.',
    icon: 'Heart',
  },
  {
    slug: 'zelfregulatie',
    name: 'Zelfregulatie',
    color: SKILL_COLORS.Zelfregulatie,
    tagline: 'Kalm blijven als het moeilijk wordt',
    description:
      'Je kunt je kind pas helpen reguleren als je jezelf kunt reguleren. Zelfregulatie gaat over het begrijpen van je eigen stressreacties, het herkennen van je triggers, en het bewust kiezen hoe je reageert in plaats van automatisch te exploderen.',
    icon: 'Waves',
  },
  {
    slug: 'grenzen',
    name: 'Grenzen',
    color: SKILL_COLORS.Grenzen,
    tagline: 'Grenzen stellen met warmte',
    description:
      'Grenzen zijn geen straf. Ze zijn de structuur waarbinnen je kind veilig kan groeien. De kunst is om duidelijk en consequent te zijn zonder de verbinding te verliezen. Grenzen stellen met liefde is een van de moeilijkste en belangrijkste vaardigheden van het vaderschap.',
    icon: 'Shield',
  },
  {
    slug: 'autonomie',
    name: 'Autonomie',
    color: SKILL_COLORS.Autonomie,
    tagline: 'Loslaten zodat je kind kan groeien',
    description:
      'Elke keer dat je iets voor je kind doet wat het zelf kan, ontneem je een leerkans. Autonomie gaat over het vinden van de balans tussen beschermen en loslaten, tussen helpen en vertrouwen dat je kind het zelf kan.',
    icon: 'Sprout',
  },
  {
    slug: 'herstel',
    name: 'Herstel',
    color: SKILL_COLORS.Herstel,
    tagline: 'Herstellen na fouten en conflicten',
    description:
      'Perfecte ouders bestaan niet. Wat wel bestaat zijn ouders die na een fout terugkomen, sorry zeggen, en de relatie herstellen. Onderzoek laat zien dat het niet de conflicten zijn die schade aanrichten, maar het ontbreken van herstel.',
    icon: 'RefreshCw',
  },
  {
    slug: 'verbinding',
    name: 'Verbinding',
    color: SKILL_COLORS.Verbinding,
    tagline: 'De band met je kind versterken',
    description:
      'Verbinding is het fundament van alles. Een kind dat zich verbonden voelt met zijn vader luistert beter, deelt meer, en durft meer. Verbinding is geen luxe, het is de basis waarop alle andere vaardigheden bouwen.',
    icon: 'Handshake',
  },
  {
    slug: 'reflectie',
    name: 'Reflectie',
    color: SKILL_COLORS.Reflectie,
    tagline: 'Leren van je eigen patronen',
    description:
      'De manier waarop jij bent opgevoed, beinvloedt hoe jij opvoedt. Reflectie is de vaardigheid om je eigen patronen te herkennen, te begrijpen waar ze vandaan komen, en bewust te kiezen welke je wilt doorgeven en welke je wilt doorbreken.',
    icon: 'Brain',
  },
];

export function getSkill(slug: string): Skill | undefined {
  return SKILLS.find((s) => s.slug === slug);
}

export function getAllSkills(): Skill[] {
  return SKILLS;
}
