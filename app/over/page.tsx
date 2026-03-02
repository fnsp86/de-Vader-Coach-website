import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Heart, Brain, BookOpen, Shield, Target, Smartphone,
  ArrowRight, Download, Calendar, Zap, Users,
} from 'lucide-react';
import EmailGate from '@/components/EmailGate';

export const metadata: Metadata = {
  title: 'Over Ons - Persoonlijke Ontwikkeling voor Vaders',
  description:
    'De Vadercoach biedt trainingen persoonlijke ontwikkeling voor vaders. Wetenschappelijk onderbouwde opvoedcursussen en tools gebaseerd op Gottman, Bowlby en Fonagy. Door vaders, voor vaders.',
  openGraph: {
    title: 'Over Ons - Persoonlijke Ontwikkeling voor Vaders',
    description:
      'De Vadercoach biedt trainingen persoonlijke ontwikkeling voor vaders. Wetenschappelijk onderbouwde opvoedcursussen en tools.',
    url: 'https://devadercoach.nl/over',
  },
  alternates: {
    canonical: 'https://devadercoach.nl/over',
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://devadercoach.nl' },
    { '@type': 'ListItem', position: 2, name: 'Over ons', item: 'https://devadercoach.nl/over' },
  ],
};

const orgSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'De Vadercoach',
  url: 'https://devadercoach.nl',
  logo: 'https://devadercoach.nl/logo.png',
  description:
    'Praktische opvoedcursussen, een 22-daagse Vader Experience en een app voor vaders. Wetenschappelijk onderbouwd door Gottman, Bowlby en Fonagy.',
  foundingDate: '2026',
  sameAs: ['https://instagram.com/devadercoach.nl'],
};

export default function OverPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-6">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl" style={{ backgroundColor: '#F59E0B' }}>
                <Heart className="h-4.5 w-4.5 text-black" strokeWidth={2.5} />
              </div>
              <span className="text-sm font-bold" style={{ color: 'var(--amber-text)' }}>
                Over ons
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-[1.1] tracking-tight mb-6" style={{ color: 'var(--text)' }}>
              Vaders helpen vaders.{' '}
              <span style={{ color: 'var(--amber-text)' }}>Dat is het.</span>
            </h1>

            <p className="text-lg leading-relaxed mb-4" style={{ color: 'var(--text2)' }}>
              Het begon op een doordeweekse avond. Mijn zoon van 4 huilde, ik werd boos, en achteraf zat ik op de bank met het gevoel dat ik had gefaald. Ik zocht naar hulp, maar alles wat ik vond was geschreven voor moeders, of zo theoretisch dat ik halverwege afhaakte.
            </p>
            <p className="text-lg leading-relaxed mb-4" style={{ color: 'var(--text2)' }}>
              Dus ging ik zelf zoeken. In de wetenschap van Gottman, Bowlby en Fonagy vond ik antwoorden die echt werkten. Niet als theorie, maar vertaald naar mijn keukentafel. Naar dat moment dat je kind &ldquo;nee&rdquo; schreeuwt en jij moet kiezen hoe je reageert.
            </p>
            <p className="text-base leading-relaxed" style={{ color: 'var(--text2)' }}>
              De Vader Coach is wat ik toen had willen vinden: betaalbare, praktische tools voor vaders die het beter willen doen. Geen perfectie. Elke dag een beetje.
            </p>
          </div>
        </div>

        <div className="absolute top-0 right-0 -z-10 h-full w-1/2 opacity-15 blur-3xl" style={{ background: 'radial-gradient(circle at 70% 30%, #F59E0B, transparent 60%)' }} />
      </section>

      {/* Wat we geloven */}
      <section style={{ backgroundColor: 'var(--surface)' }}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-10" style={{ color: 'var(--text)' }}>
            Wat we geloven
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              {
                icon: Heart,
                title: 'Perfectie bestaat niet',
                desc: 'Je hoeft geen superpapa te zijn. Het gaat om bewustzijn, niet om perfectie. Elke dag een beetje beter is genoeg.',
              },
              {
                icon: Brain,
                title: 'Wetenschap in gewone taal',
                desc: 'Gottman, Bowlby, Fonagy - briljante onderzoekers. Maar niemand leest papers aan de keukentafel. Wij vertalen het.',
              },
              {
                icon: Shield,
                title: 'Geen oordeel, alleen tools',
                desc: 'We wijzen geen vinger. We geven je de handvatten om het zelf anders te doen. Jij bent de expert van je eigen gezin.',
              },
              {
                icon: Target,
                title: 'Direct doen, niet alleen lezen',
                desc: 'Alles wat we maken bevat oefeningen die je vandaag nog kunt toepassen. Kennis zonder actie verandert niks.',
              },
              {
                icon: Users,
                title: 'Door vaders, voor vaders',
                desc: 'Geschreven vanuit het vaderperspectief. Met de situaties die je als vader herkent, niet de theorie die je als student leest.',
              },
              {
                icon: Zap,
                title: 'Past in een druk leven',
                desc: 'Korte oefeningen, hapklare trainingen, een app die in 2 minuten klaar is. Want vaders hebben geen uren vrij.',
              },
            ].map((v) => (
              <div
                key={v.title}
                className="rounded-xl px-5 py-5"
                style={{ backgroundColor: 'var(--bg)' }}
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-lg mb-3 bg-amber-500/10">
                  <v.icon className="h-4.5 w-4.5 text-amber-400" />
                </div>
                <h3 className="text-sm font-bold mb-1.5" style={{ color: 'var(--text)' }}>
                  {v.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text3)' }}>
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Wat we aanbieden */}
      <section className="border-t" style={{ borderColor: 'var(--border)' }}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <div className="max-w-lg mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold mb-3" style={{ color: 'var(--text)' }}>
              Wat we aanbieden
            </h2>
            <p className="text-base leading-relaxed" style={{ color: 'var(--text2)' }}>
              Drie manieren om te groeien. Gebruik ze los of combineer ze voor het meeste resultaat.
            </p>
          </div>

          <div className="space-y-3">
            {/* App */}
            <div className="rounded-xl border p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-4" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
              <div className="flex items-center gap-4 flex-1">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl" style={{ backgroundColor: '#F59E0B15' }}>
                  <Smartphone className="h-5 w-5" style={{ color: 'var(--amber-text)' }} />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold mb-0.5" style={{ color: 'var(--text)' }}>De App</h3>
                  <p className="text-sm" style={{ color: 'var(--text3)' }}>
                    Dagelijkse micro-oefeningen, streaks, badges en een community. 2-10 min per dag.
                  </p>
                </div>
              </div>
              <Link href="/app-download" className="shrink-0 inline-flex items-center gap-1 text-sm font-bold hover:gap-2 transition-all" style={{ color: 'var(--amber-text)' }}>
                Meer info <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            {/* Experience */}
            <div className="rounded-xl border p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-4" style={{ backgroundColor: 'var(--surface)', borderColor: '#F59E0B40' }}>
              <div className="flex items-center gap-4 flex-1">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl" style={{ backgroundColor: '#F59E0B15' }}>
                  <Calendar className="h-5 w-5" style={{ color: 'var(--amber-text)' }} />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <h3 className="text-sm font-extrabold" style={{ color: 'var(--text)' }}>De Experience</h3>
                    <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded" style={{ backgroundColor: '#F59E0B20', color: 'var(--amber-text)' }}>NIEUW</span>
                  </div>
                  <p className="text-sm" style={{ color: 'var(--text3)' }}>
                    22 scenario-dagen door alle 8 vaardigheden. Herkenbare situaties en concrete acties.
                  </p>
                </div>
              </div>
              <Link href="/experience" className="shrink-0 inline-flex items-center gap-1 text-sm font-bold hover:gap-2 transition-all" style={{ color: 'var(--amber-text)' }}>
                Bekijk Experience <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            {/* Cursussen */}
            <div className="rounded-xl border p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-4" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
              <div className="flex items-center gap-4 flex-1">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl" style={{ backgroundColor: '#F59E0B15' }}>
                  <BookOpen className="h-5 w-5" style={{ color: 'var(--amber-text)' }} />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold mb-0.5" style={{ color: 'var(--text)' }}>De Cursussen</h3>
                  <p className="text-sm" style={{ color: 'var(--text3)' }}>
                    8 verdiepende PDF-werkboeken. Wetenschap, werkbladen en oefeningen per vaardigheid.
                  </p>
                </div>
              </div>
              <Link href="/cursussen" className="shrink-0 inline-flex items-center gap-1 text-sm font-bold hover:gap-2 transition-all" style={{ color: 'var(--amber-text)' }}>
                Bekijk cursussen <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            {/* Snelgids */}
            <div className="rounded-xl border p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-4" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
              <div className="flex items-center gap-4 flex-1">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl" style={{ backgroundColor: '#F59E0B15' }}>
                  <Download className="h-5 w-5" style={{ color: 'var(--amber-text)' }} />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <h3 className="text-sm font-extrabold" style={{ color: 'var(--text)' }}>De Snelgids</h3>
                    <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded" style={{ backgroundColor: '#34D39920', color: '#34D399' }}>GRATIS</span>
                  </div>
                  <p className="text-sm" style={{ color: 'var(--text3)' }}>
                    De kern van alle 8 vaardigheden in een PDF. Herkenbare situaties en 8 tips die je vandaag kunt toepassen.
                  </p>
                </div>
              </div>
              <EmailGate
                downloadUrl="/api/free-download"
                buttonText="Download PDF"
                className="shrink-0 inline-flex items-center gap-1 text-sm font-bold hover:gap-2 transition-all cursor-pointer"
                style={{ color: 'var(--amber-text)' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Eerlijk is eerlijk */}
      <section style={{ backgroundColor: 'var(--surface)' }}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12 sm:py-14">
          <div className="flex items-start gap-4 max-w-2xl mx-auto">
            <Heart className="h-5 w-5 shrink-0 mt-0.5 text-amber-400" />
            <div>
              <h3 className="text-base font-bold mb-1" style={{ color: 'var(--text)' }}>
                Eerlijk is eerlijk
              </h3>
              <p className="text-base leading-relaxed" style={{ color: 'var(--text3)' }}>
                We zijn net begonnen. Er zijn nog geen honderden reviews of een groot team. Maar de wetenschap achter
                ons materiaal is bewezen door decennia onderzoek. We zijn geen therapeuten en geen vervanging voor
                professionele hulp. Wat we wel zijn: vaders die de beste beschikbare kennis vertalen naar iets dat je
                morgenochtend al kunt gebruiken.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t" style={{ borderColor: 'var(--border)' }}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-14 sm:py-16 text-center">
          <h2 className="text-xl sm:text-2xl font-extrabold mb-3" style={{ color: 'var(--text)' }}>
            Begin vandaag
          </h2>
          <p className="text-base mb-6 max-w-md mx-auto" style={{ color: 'var(--text2)' }}>
            Download de gratis snelgids en ontdek welke vaardigheid bij jou past.
          </p>
          <EmailGate
            downloadUrl="/api/free-download"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-base font-bold text-black transition-transform hover:scale-[0.97] cursor-pointer"
            style={{ backgroundColor: '#F59E0B' }}
          />
        </div>
      </section>
    </>
  );
}
