import type { Metadata } from 'next';
import BlogCard from '@/components/BlogCard';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Verhalen, inzichten en herkenbare momenten voor vaders.',
};

const POSTS_LIST = [
  {
    title: 'De Twee Minuten Die Alles Veranderden',
    description: 'Een vader legt zijn telefoon neer. Zijn dochter kijkt op. En er gebeurt iets dat hij niet had verwacht.',
    slug: 'aanwezig-zijn-voor-kind',
    date: '2026-02-20',
    readTime: 3,
    category: 'Aanwezigheid',
  },
  {
    title: 'Afgelopen Zaterdag in de Albert Heijn',
    description: 'Mijn zoon lag krijsend op de grond bij de kassa. Iedereen keek. Dit is wat ik leerde.',
    slug: 'driftbuien-begrijpen',
    date: '2026-02-15',
    readTime: 3,
    category: 'Emotiecoaching',
  },
  {
    title: 'Ik Heb Het Al Drie Keer Gezegd',
    description: 'Waarom je kind niet luistert als je het voor de vierde keer zegt. (Hint: het ligt niet aan je kind.)',
    slug: 'grenzen-zonder-schreeuwen',
    date: '2026-02-10',
    readTime: 3,
    category: 'Grenzen',
  },
  {
    title: 'Vanmorgen Was Ik Die Vader',
    description: 'Ik schreeuwde om een beker melk. Mijn dochter keek me aan. En ik zag het.',
    slug: 'herstellen-na-fout',
    date: '2026-02-05',
    readTime: 3,
    category: 'Herstel',
  },
  {
    title: 'De Omgegooid Beker',
    description: 'Je overleeft een werkdag van acht uur zonder je stem te verheffen. Maar een beker melk? Dat is de druppel.',
    slug: 'waarom-je-kind-je-triggers',
    date: '2026-01-28',
    readTime: 3,
    category: 'Zelfregulatie',
  },
  {
    title: 'De Jas Met De Rits',
    description: 'Mijn dochter wil haar jas zelf dichtritsen. Het duurt. Het duurt lang. Mijn handen jeuken.',
    slug: 'loslaten-zonder-angst',
    date: '2026-01-20',
    readTime: 3,
    category: 'Autonomie',
  },
  {
    title: 'Het Gesprek Dat Niet Aan Tafel Gebeurde',
    description: 'Mijn zoon praat niet met mij. Behalve in de auto. Om kwart over tien. In het donker.',
    slug: 'praten-met-je-tiener',
    date: '2026-01-12',
    readTime: 3,
    category: 'Verbinding',
  },
  {
    title: 'Ik Lijk Mijn Vader Wel',
    description: 'Je hoort jezelf schreeuwen en denkt: dit is niet wie ik wil zijn. Maar het is wie je bent op de automatische piloot.',
    slug: 'reflecteren-als-vader',
    date: '2026-01-05',
    readTime: 3,
    category: 'Reflectie',
  },
  {
    title: 'Hij Keek Me Recht Aan En Deed Het Toch',
    description: 'Je kind hoort je wel, maar luistert niet. Dat verschil veranderde alles voor mij als vader.',
    slug: 'kind-luistert-niet',
    date: '2026-02-25',
    readTime: 3,
    category: 'Grenzen',
  },
  {
    title: 'Drie Jaar Oud En De Baas Van Het Hele Huis',
    description: 'Mijn peuter krijste alsof de wereld verging. Over een banaan. Dit is wat ik leerde over dat kleine brein.',
    slug: 'peuter-driftbui-wat-doen',
    date: '2026-02-22',
    readTime: 3,
    category: 'Emotiecoaching',
  },
  {
    title: 'De Stem Die Zegt Dat Je Het Niet Goed Genoeg Doet',
    description: 'Schuldgevoel als vader. Het zit er altijd. Na het schreeuwen. Na het werken. Na alles. Maar klopt het wel?',
    slug: 'schuldgevoel-als-vader',
    date: '2026-02-18',
    readTime: 3,
    category: 'Herstel',
  },
  {
    title: 'Ik Had Niks Meer Over',
    description: 'Opvoeden op een leeg reservoir. Als vader alles geven tot er niks meer is. Herkenbaar?',
    slug: 'vader-burn-out-opvoeding',
    date: '2026-02-14',
    readTime: 3,
    category: 'Zelfregulatie',
  },
  {
    title: 'Het Moment Dat Ik Mijn Telefoon In De Lade Legde',
    description: 'Quality time hoeft geen uitje te zijn. Soms is het vijf minuten op de grond met je volle aandacht.',
    slug: 'quality-time-kind',
    date: '2026-02-11',
    readTime: 3,
    category: 'Aanwezigheid',
  },
  {
    title: 'Er Zit Een Monster Onder Mijn Bed',
    description: 'Mijn zoon is bang in het donker. Elke avond weer. Ik zei dat er niks was. Dat hielp niet.',
    slug: 'kind-bang-in-donker',
    date: '2026-02-08',
    readTime: 3,
    category: 'Emotiecoaching',
  },
  {
    title: 'De Zondag Dat Ik Hem Terugbracht',
    description: 'Vader zijn na een scheiding. De autodeur die dichtslaat. Het stille huis. En toch een goede vader zijn.',
    slug: 'scheiden-en-vader-zijn',
    date: '2026-02-04',
    readTime: 3,
    category: 'Verbinding',
  },
  {
    title: 'De Telefoon Die Nooit Uitgaat',
    description: 'Mijn puber zit de hele dag op zijn telefoon. Ik zei: leg neer. Het werd ruzie. Er is een betere manier.',
    slug: 'puber-telefoon-verslaving',
    date: '2026-01-30',
    readTime: 3,
    category: 'Grenzen',
  },
  {
    title: 'De Eerste Nacht Met Drie',
    description: 'Vader worden. Iedereen feliciteert je. Niemand vertelt je dat je je soms verloren voelt. Dit is wat mij hielp.',
    slug: 'nieuwe-baby-als-vader',
    date: '2026-01-25',
    readTime: 3,
    category: 'Aanwezigheid',
  },
  {
    title: 'Het Telefoontje Van School',
    description: 'Je kind slaat op school. Je schrikt. Je schaamt je. Maar er zit iets achter dat gedrag. Dit is mijn verhaal.',
    slug: 'kind-slaat-andere-kinderen',
    date: '2026-01-22',
    readTime: 3,
    category: 'Emotiecoaching',
  },
  {
    title: 'Ik Was Niet Boos Om De Lego',
    description: 'Je schreeuwt tegen je kind en weet: dit gaat niet over wat er net gebeurde. Waar komt die boosheid vandaan?',
    slug: 'vader-eigen-emoties',
    date: '2026-01-17',
    readTime: 3,
    category: 'Zelfregulatie',
  },
  {
    title: 'Iedere Avond Hetzelfde Gevecht',
    description: 'Huiswerk. Elke avond strijd. Elke avond ruzie. Ik ontdekte dat het niet over het huiswerk ging.',
    slug: 'huiswerk-strijd',
    date: '2026-01-14',
    readTime: 3,
    category: 'Grenzen',
  },
  {
    title: 'Mama, Mijn Buik Doet Zeer',
    description: 'Je kind wil niet naar school. Elke ochtend strijd. Is het aanstellen? Of is er iets anders aan de hand?',
    slug: 'kind-wil-niet-naar-school',
    date: '2026-01-10',
    readTime: 3,
    category: 'Autonomie',
  },
  {
    title: 'Jij Bent Mijn Vader Niet',
    description: 'Stiefvader worden. Die ene zin die alles samenvat. En wat ik leerde over de rol die niemand je uitlegt.',
    slug: 'stiefvader-tips',
    date: '2026-01-07',
    readTime: 3,
    category: 'Verbinding',
  },
  {
    title: 'Elke Zondag Hetzelfde Afscheid',
    description: 'Weekendvader. Twee dagen per week. De uitdaging om in beperkte tijd een echte band te bouwen.',
    slug: 'vader-kind-weekendvader',
    date: '2026-01-03',
    readTime: 3,
    category: 'Verbinding',
  },
];

export default function BlogPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
      <div className="max-w-2xl mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-3" style={{ color: 'var(--text)' }}>
          Blog
        </h1>
        <p className="text-lg leading-relaxed" style={{ color: 'var(--text2)' }}>
          Verhalen, inzichten en herkenbare momenten voor vaders.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {POSTS_LIST.map((post) => (
          <BlogCard key={post.slug} {...post} />
        ))}
      </div>
    </div>
  );
}
