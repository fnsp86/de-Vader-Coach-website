export interface Course {
  title: string;
  description: string;
  longDescription: string;
  price: number;
  pages: number;
  category: string;
  color: string;
  icon: string;
  status: 'available' | 'coming-soon';
  features: string[];
  learnPoints: string[];
  forWho: string[];
  pdfPath?: string;
}

export const SKILL_COLORS: Record<string, string> = {
  Emotiecoaching: '#EF4444',
  Grenzen: '#FBBF24',
  Aanwezigheid: '#667eea',
  Zelfregulatie: '#34D399',
  Verbinding: '#60A5FA',
  Herstel: '#FB923C',
  Autonomie: '#A78BFA',
  Reflectie: '#C084FC',
  Integratie: '#F59E0B',
  Gedrag: '#F97316',
  Scheiding: '#3B82F6',
};

export const COURSES: Record<string, Course> = {
  'aanwezig-vaderschap': {
    title: 'Aanwezig Vaderschap',
    description: 'Echt aanwezig zijn is belangrijker dan er veel zijn. Leer de kunst van kwaliteitstijd, ook in een druk leven.',
    longDescription:
      'Twee minuten echte aandacht doet meer dan een uur half aanwezig zijn. Deze cursus leert je de wetenschap achter aanwezigheid, hechting en hersenontwikkeling. Met 20+ micro-oefeningen die je vandaag nog kunt toepassen.',
    price: 14.95,
    pages: 63,
    category: 'Aanwezigheid',
    color: SKILL_COLORS.Aanwezigheid,
    icon: 'Eye',
    status: 'coming-soon',
    features: ["63 pagina's", '10 hoofdstukken', '20+ micro-oefeningen', 'Werkbladen & reflectieopdrachten'],
    learnPoints: [
      'De wetenschap achter aanwezigheid en hechting',
      'Jouw aanwezigheidsstijl herkennen',
      'Hoe je telefoon je aanwezigheid saboteert',
      'Micro-oefeningen voor elke dag',
      'Rituelen die verbinding creëren',
      'Aanwezig luisteren en spelen',
    ],
    forWho: [
      'Vaders die het gevoel hebben er niet echt te zijn',
      'Vaders met een druk schema die meer kwaliteit willen',
      'Vaders die merken dat hun telefoon een concurrent is',
    ],
  },
  'emotiecoaching-voor-vaders': {
    title: 'Emotiecoaching voor Vaders',
    description: 'Leer de emoties van je kind herkennen, benoemen en begeleiden. Gebaseerd op de Gottman-methode.',
    longDescription:
      'Wanneer je zegt "ik zie dat je verdrietig bent" gebeurt er iets in het brein van je kind: de amygdala kalmeert, de prefrontale cortex wordt actiever. Deze cursus leert je de 5 stappen van emotiecoaching, van driftbuien tot verdriet.',
    price: 11.95,
    pages: 51,
    category: 'Emotiecoaching',
    color: SKILL_COLORS.Emotiecoaching,
    icon: 'Heart',
    status: 'coming-soon',
    features: ["51 pagina's", '10 hoofdstukken', 'Gottman 5-stappen methode', 'Gevoelsthermometer & werkbladen'],
    learnPoints: [
      'Emoties herkennen en benoemen bij je kind',
      'De 5 stappen van emotiecoaching (Gottman)',
      'Omgaan met driftbuien, angst en verdriet',
      'Emotiecoaching per leeftijd (0-18)',
      'De emotionele band versterken',
    ],
    forWho: [
      'Vaders van kinderen 0-18 jaar',
      'Vaders die moeite hebben met driftbuien',
      'Vaders die hun kind beter willen begrijpen',
    ],
  },
  'zelfregulatie-als-vader': {
    title: 'Zelfregulatie als Vader',
    description: 'Hoe blijf je kalm als je kind je tot het uiterste drijft? Leer je eigen emoties reguleren.',
    longDescription:
      'Kalmte is trainbaar. Deze cursus leert je de wetenschap achter je stressreacties, geeft je ademhalingstechnieken, helpt je triggers herkennen en bouwt een noodplan voor moeilijke momenten. Want jouw kalmte is het krachtigste opvoedingsmiddel dat je hebt.',
    price: 14.95,
    pages: 83,
    category: 'Zelfregulatie',
    color: SKILL_COLORS.Zelfregulatie,
    icon: 'Waves',
    status: 'coming-soon',
    features: ["83 pagina's", '12 hoofdstukken', 'Ademhalingstechnieken', 'Triggeranalyse & noodplan'],
    learnPoints: [
      'Wat er in je brein gebeurt als je boos wordt',
      'Je persoonlijke triggers herkennen',
      'Ademhalingstechnieken die werken',
      'Een noodplan voor moeilijke momenten',
      'Herstellen na een moment van verlies van controle',
    ],
    forWho: [
      'Vaders die merken dat ze te snel boos worden',
      'Vaders die spijt hebben na het schreeuwen',
      'Vaders die kalmer willen reageren',
    ],
  },
  'grenzen-stellen-met-liefde': {
    title: 'Grenzen Stellen met Liefde',
    description: 'Duidelijke grenzen zonder de band te beschadigen. Met concrete scripts en de KWH-formule.',
    longDescription:
      'Goede grenzen zijn Kort, Warm en Helder. Deze cursus leert je de wetenschap achter grenzen, helpt je jouw grensstijl herkennen en geeft concrete scripts per leeftijd. Niet streng of lief, maar streng en lief.',
    price: 12.95,
    pages: 64,
    category: 'Grenzen',
    color: SKILL_COLORS.Grenzen,
    icon: 'Shield',
    status: 'coming-soon',
    features: ["64 pagina's", '10 hoofdstukken', 'KWH-formule & scripts', 'Leeftijdsspecifieke tips (2-18)'],
    learnPoints: [
      'De KWH-formule: Kort, Warm, Helder',
      'Grenzen stellen zonder schreeuwen',
      'Consequenties die echt werken',
      'Je eigen grensstijl herkennen',
      'Grenzen per leeftijd aanpassen',
    ],
    forWho: [
      'Vaders die worstelen met consequent zijn',
      'Vaders die merken dat ze te snel toegeven',
      'Vaders die de balans zoeken tussen streng en lief',
    ],
  },
  'autonomie-en-loslaten': {
    title: 'Autonomie en Loslaten',
    description: 'Leer je kind ruimte geven om zelfstandig te worden, zonder de verbinding te verliezen.',
    longDescription:
      'De paradox van het vaderschap: je instinct zegt beschermen, maar je kind heeft ruimte nodig. Deze cursus leert je de wetenschap achter autonomie, helpt je jouw loslaatstijl herkennen en geeft concrete handvatten per leeftijd.',
    price: 11.95,
    pages: 47,
    category: 'Autonomie',
    color: SKILL_COLORS.Autonomie,
    icon: 'Sprout',
    status: 'coming-soon',
    features: ["47 pagina's", '10 hoofdstukken', 'Zelfdeterminatietheorie', 'Loslaatstijl-analyse'],
    learnPoints: [
      'De wetenschap achter autonomie en motivatie',
      'Jouw loslaatstijl herkennen',
      'Verantwoordelijkheid gefaseerd overdragen',
      'Faalruimte creëren voor je kind',
      'Digitale autonomie begeleiden',
    ],
    forWho: [
      'Vaders die merken dat ze te snel ingrijpen',
      'Vaders die moeite hebben hun kind te laten falen',
      'Vaders die hun kind willen voorbereiden op zelfstandigheid',
    ],
  },
  'herstel-na-conflict': {
    title: 'Herstel na Conflict',
    description: 'Iedereen maakt fouten. Leer hoe je herstelt na een ruzie of een moment waar je spijt van hebt.',
    longDescription:
      'Het verschil tussen een veilige en onveilige hechting zit niet in het voorkomen van breuken, maar in het herstellen ervan. Deze cursus leert je de anatomie van een echte verontschuldiging, leeftijdsgerichte herstelgesprekken en hoe je patronen doorbreekt.',
    price: 12.95,
    pages: 72,
    category: 'Herstel',
    color: SKILL_COLORS.Herstel,
    icon: 'RefreshCw',
    status: 'coming-soon',
    features: ["72 pagina's", '11 hoofdstukken', '5-stappen verontschuldiging', 'Herstelgesprekken per leeftijd'],
    learnPoints: [
      'Waarom herstel belangrijker is dan perfectie',
      'De 5 stappen van een echte verontschuldiging',
      'Herstelgesprekken per leeftijdsfase',
      'Terugkerende conflicten voorkomen',
      'Vertrouwen herbouwen na een grote breuk',
    ],
    forWho: [
      'Vaders die spijt hebben na het schreeuwen',
      'Vaders die niet weten hoe ze sorry moeten zeggen',
      'Vaders die patronen willen doorbreken',
    ],
  },
  'verbinding-met-je-tiener': {
    title: 'Verbinding met je Tiener',
    description: 'De puberteit hoeft geen slagveld te zijn. Bouw een sterke band met je tiener.',
    longDescription:
      'Je tiener duwt je weg. Dat hoort erbij. Maar hij heeft je nog steeds nodig. Deze cursus leert je de wetenschap achter het tienerbrein, communicatietechnieken die wel werken, en hoe je verbinding houdt - ook als het moeilijk is.',
    price: 12.95,
    pages: 61,
    category: 'Verbinding',
    color: SKILL_COLORS.Verbinding,
    icon: 'Handshake',
    status: 'coming-soon',
    features: ["61 pagina's", '11 hoofdstukken', 'Zij-aan-zij gesprekstechniek', 'Tienerbrein-wetenschap'],
    learnPoints: [
      'Waarom je tiener je wegduwt (en dat het normaal is)',
      'Het zij-aan-zij gesprek: communicatie die werkt',
      'Vertrouwen verdienen, behouden en herstellen',
      'Omgaan met gaming, social media en schermtijd',
      'Moeilijke onderwerpen bespreekbaar maken',
    ],
    forWho: [
      'Vaders van tieners (12-18 jaar)',
      'Vaders die het contact voelen verliezen',
      'Vaders die beter willen communiceren met hun tiener',
    ],
  },
  'reflectief-vaderschap': {
    title: 'Reflectief Vaderschap',
    description: 'Begrijp waarom je doet wat je doet. De meest onderschatte vaardigheid van het vaderschap.',
    longDescription:
      'De vader die begrijpt waarom hij boos wordt, is al aan het veranderen. Deze cursus leert je reflectief functioneren: je eigen patronen herkennen, begrijpen waar ze vandaan komen, en bewust kiezen wie je als vader wilt zijn.',
    price: 9.95,
    pages: 40,
    category: 'Reflectie',
    color: SKILL_COLORS.Reflectie,
    icon: 'Brain',
    status: 'coming-soon',
    features: ["40 pagina's", '8 hoofdstukken', 'Reflectief functioneren (Fonagy)', 'Weekreflectie-systeem'],
    learnPoints: [
      'Reflectief functioneren: jezelf observeren als buitenstaander',
      'Intergenerationele patronen herkennen',
      'Waarden-gedreven opvoeden',
      'Wat je kind je leert over jezelf',
      'Reflectie als dagelijkse gewoonte',
    ],
    forWho: [
      'Vaders die willen begrijpen waarom ze doen wat ze doen',
      'Vaders die patronen van hun eigen vader herkennen',
      'Vaders die bewuster willen opvoeden',
    ],
  },
  'opvoeden-bij-gedragsproblemen': {
    title: 'Opvoeden bij Gedragsproblemen',
    description: 'Wanneer gedrag meer is dan een fase. Begrijp wat er achter zit en leer wat wél werkt.',
    longDescription:
      'Je kind luistert niet, escaleert, slaat erop los of weigert naar school te gaan. Is dit een fase, of is er meer aan de hand? Deze cursus helpt je gedragsproblemen herkennen, het brein erachter begrijpen, en geeft je bewezen strategieën om je kind te helpen zonder de relatie te verliezen.',
    price: 14.95,
    pages: 66,
    category: 'Gedrag',
    color: SKILL_COLORS.Gedrag,
    icon: 'Shield',
    status: 'coming-soon',
    features: ["66 pagina's", '10 hoofdstukken', 'Ross Greene CPS-methode', 'Gedragsplan & werkbladen'],
    learnPoints: [
      'Normaal gedrag onderscheiden van gedragsproblemen',
      'ADHD, ODD en gedragsstoornissen begrijpen als vader',
      'De functie achter probleemgedrag herkennen',
      'De-escaleren bij agressie en extreme uitdagingen',
      'Samenwerken met school en hulpverleners',
      'Een gedragsplan maken dat werkt',
    ],
    forWho: [
      'Vaders van kinderen met uitdagend of agressief gedrag',
      'Vaders die regelmatig gebeld worden door school',
      'Vaders die het gevoel hebben dat niets werkt',
      'Vaders van kinderen met (een vermoeden van) ADHD of ODD',
    ],
  },
  'vaderschap-na-scheiding': {
    title: 'Vaderschap na Scheiding',
    description: 'Gescheiden, maar nog steeds vader. Bouw een sterke band met je kind, ook vanuit twee huizen.',
    longDescription:
      'Een op de drie Nederlandse kinderen maakt een scheiding mee. Voor vaders verandert alles: je ziet je kind minder, moet samenwerken met je ex, en worstelt met schuldgevoel. Deze cursus helpt je een betrokken, stabiele vader te blijven, ongeacht de situatie met je ex.',
    price: 14.95,
    pages: 77,
    category: 'Scheiding',
    color: SKILL_COLORS.Scheiding,
    icon: 'Heart',
    status: 'coming-soon',
    features: ["77 pagina's", '10 hoofdstukken', 'Co-ouderschap communicatie', 'Twee-huizen werkbladen'],
    learnPoints: [
      'Je rol als vader herdefiniëren na de scheiding',
      'De scheiding uitleggen per leeftijdsfase',
      'Effectief co-ouderschap met je ex',
      'Twee huizen, één opvoeding: structuur en rituelen',
      'Loyaliteitsconflicten bij je kind herkennen en oplossen',
      'Betrokken blijven, ook op afstand',
    ],
    forWho: [
      'Vaders die gescheiden zijn of in scheiding liggen',
      'Vaders die hun kind minder zien dan ze willen',
      'Vaders die worstelen met co-ouderschap',
      'Vaders in samengestelde gezinnen',
    ],
  },
};

export const BUNDLE = {
  title: 'Het Complete Vaderpakket',
  description: 'Alle 10 cursussen in een pakket. 624 pagina\'s, 102 hoofdstukken, honderden oefeningen.',
  originalPrice: 131.60,
  price: 89.95,
  status: 'coming-soon' as const,
};

export const SNELGIDS = {
  title: 'De 8 Vadervaardigheden - Snelgids',
  description: 'De kern van elke vaardigheid, herkenbare situaties, praktische tips, plus een overzicht van de App, Experience en Cursussen.',
  pages: 15,
  pdfPath: '/cursussen/snelgids-8-vadervaardigheden.pdf',
};

export function getCourse(slug: string): Course | undefined {
  return COURSES[slug];
}

export function getAllCourses() {
  return Object.entries(COURSES).map(([slug, course]) => ({ slug, ...course }));
}
