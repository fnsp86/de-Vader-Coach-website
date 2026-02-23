import type { Metadata } from 'next';
import { Heart, Brain, BookOpen, Shield, Users, Sprout } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Over De Vadercoach',
  description: 'Onze missie: de drempel verlagen voor hulp aan vaders. Gebaseerd op wetenschap, niet op meningen.',
};

const VALUES = [
  {
    icon: Brain,
    title: 'Wetenschap als basis',
    description: 'Alles wat we maken is gebaseerd op bewezen methoden uit de psychologie, hechtingstheorie en ontwikkelingswetenschap.',
  },
  {
    icon: BookOpen,
    title: 'Praktisch & direct toepasbaar',
    description: 'Geen vage theorieën, maar concrete stappen die je vandaag nog kunt toepassen in je gezin.',
  },
  {
    icon: Shield,
    title: 'Laagdrempelig',
    description: 'Geen dure coaching sessies of lange wachtlijsten. Betaalbaar materiaal waarmee je zelfstandig aan de slag kunt.',
  },
  {
    icon: Users,
    title: 'Voor alle vaders',
    description: 'Of je nu een ervaren vader bent of net begint — onze cursussen passen zich aan op jouw situatie.',
  },
  {
    icon: Sprout,
    title: 'Groei op je eigen tempo',
    description: 'Geen verplichtingen, geen deadlines. Leer wanneer het jou uitkomt, in je eigen tempo.',
  },
  {
    icon: Heart,
    title: 'Vanuit het hart',
    description: 'De Vadercoach is gemaakt door vaders, voor vaders. We begrijpen de uitdagingen omdat we ze zelf kennen.',
  },
];

export default function OverPage() {
  return (
    <>
      {/* Hero */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="max-w-2xl">
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-4" style={{ color: 'var(--text)' }}>
            Over De Vadercoach
          </h1>
          <p className="text-lg leading-relaxed" style={{ color: 'var(--text2)' }}>
            De Vadercoach is er om de drempel naar hulp voor vaders te verlagen.
            Wij geloven dat elke vader beter kan worden — niet door perfectie na te streven,
            maar door elke dag een klein stapje te zetten.
          </p>
        </div>
      </section>

      {/* Missie */}
      <section className="border-t" style={{ borderColor: 'var(--border)' }}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-extrabold mb-4" style={{ color: 'var(--text)' }}>
                Onze missie
              </h2>
              <div className="space-y-4 text-base leading-relaxed" style={{ color: 'var(--text2)' }}>
                <p>
                  Veel vaders willen een betere vader zijn, maar weten niet waar ze moeten beginnen.
                  Coaching is duur, boeken zijn tijdrovend, en de drempel om hulp te vragen is hoog.
                </p>
                <p>
                  De Vadercoach biedt een alternatief: praktische, betaalbare cursussen
                  die je op je eigen tempo kunt volgen. Gebaseerd op wetenschap en psychologie,
                  maar geschreven in gewone taal met concrete voorbeelden.
                </p>
                <p>
                  We bieden geen coaching sessies aan en fungeren niet als therapeut.
                  Wat we wél doen: je voorzien van het beste materiaal om zelf aan de slag te gaan.
                  Jij bent de expert van je eigen gezin — wij geven je de tools.
                </p>
              </div>
            </div>

            <div className="rounded-2xl border p-8" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
              <h3 className="text-lg font-bold mb-4" style={{ color: 'var(--text)' }}>Wat De Vadercoach wél is</h3>
              <ul className="space-y-3 mb-6">
                {[
                  'Praktische PDF-cursussen',
                  'Gebaseerd op wetenschappelijk onderzoek',
                  'Betaalbaar en laagdrempelig',
                  'Op je eigen tempo te volgen',
                  'Een gratis app met dagelijkse oefeningen',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm font-medium" style={{ color: 'var(--text)' }}>
                    <span className="h-1.5 w-1.5 rounded-full shrink-0" style={{ backgroundColor: '#F59E0B' }} />
                    {item}
                  </li>
                ))}
              </ul>

              <h3 className="text-lg font-bold mb-4" style={{ color: 'var(--text)' }}>Wat het niet is</h3>
              <ul className="space-y-3">
                {[
                  'Geen persoonlijke coaching of therapie',
                  'Geen vervanging voor professionele hulp',
                  'Geen oordeel — alleen ondersteuning',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm font-medium" style={{ color: 'var(--text3)' }}>
                    <span className="h-1.5 w-1.5 rounded-full bg-gray-500 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Waarden */}
      <section className="border-t" style={{ borderColor: 'var(--border)' }}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <h2 className="text-2xl font-extrabold mb-8 text-center" style={{ color: 'var(--text)' }}>
            Onze waarden
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {VALUES.map((v) => (
              <div
                key={v.title}
                className="rounded-2xl border p-6"
                style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl mb-3 bg-amber-500/10">
                  <v.icon className="h-5 w-5 text-amber-400" />
                </div>
                <h3 className="text-base font-bold mb-1.5" style={{ color: 'var(--text)' }}>
                  {v.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text2)' }}>
                  {v.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
