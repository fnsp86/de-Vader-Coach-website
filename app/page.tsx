import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Heart, Brain, BookOpen, Target, Shield, Smartphone, ArrowRight, Download,
  Eye, Waves, Sprout, RefreshCw, Handshake, Check, X as XIcon, Calendar, Zap,
  Quote, HelpCircle,
} from 'lucide-react';
import CourseCard from '@/components/CourseCard';
import EmailGate from '@/components/EmailGate';
import DailyQuote from '@/components/DailyQuote';
import { getAllCourses, BUNDLE } from '@/lib/courses';
import { TESTIMONIALS } from '@/lib/testimonials';

export const metadata: Metadata = {
  title: 'De Vadercoach | Persoonlijke Ontwikkeling & Opvoedcursussen voor Vaders',
  description:
    'Hoe word ik een goede vader? Persoonlijke ontwikkeling training speciaal voor vaders. Leer 8 opvoedvaardigheden met onze app, de 22-daagse Vader Experience of verdiepende cursussen. Grenzen stellen, emotiecoaching en meer.',
  openGraph: {
    title: 'De Vadercoach | Persoonlijke Ontwikkeling & Opvoedcursussen voor Vaders',
    description:
      'Persoonlijke ontwikkeling training voor vaders. Leer 8 opvoedvaardigheden met de Vader Experience, cursussen of onze app. Door vaders, voor vaders.',
  },
};

const SKILLS = [
  { name: 'Aanwezigheid', icon: Eye, color: '#667eea', desc: 'Echt er zijn voor je kind' },
  { name: 'Emotiecoaching', icon: Heart, color: '#EF4444', desc: 'Emoties begeleiden' },
  { name: 'Zelfregulatie', icon: Waves, color: '#34D399', desc: 'Kalm blijven onder druk' },
  { name: 'Grenzen', icon: Shield, color: '#FBBF24', desc: 'Structuur met warmte' },
  { name: 'Autonomie', icon: Sprout, color: '#A78BFA', desc: 'Loslaten en vertrouwen' },
  { name: 'Herstel', icon: RefreshCw, color: '#FB923C', desc: 'Herstellen na fouten' },
  { name: 'Verbinding', icon: Handshake, color: '#60A5FA', desc: 'Band met je tiener' },
  { name: 'Reflectie', icon: Brain, color: '#C084FC', desc: 'Jezelf begrijpen' },
];

const RECOGNIZABLE = [
  {
    text: 'Je hebt geschreeuwd. Weer. Je wist niet wat je anders moest doen.',
    skill: 'Zelfregulatie',
    color: '#34D399',
    icon: Waves,
  },
  {
    text: 'Je tiener trekt zich terug. Je krijgt alleen "goed" en "niks" als antwoord.',
    skill: 'Verbinding',
    color: '#60A5FA',
    icon: Handshake,
  },
  {
    text: 'Je wilt er zijn, maar je telefoon trekt altijd aan je aandacht.',
    skill: 'Aanwezigheid',
    color: '#667eea',
    icon: Eye,
  },
  {
    text: 'Je stelt een grens, maar vijf minuten later geef je toe.',
    skill: 'Grenzen',
    color: '#FBBF24',
    icon: Shield,
  },
];

const COMPARE_ROWS = [
  { label: 'Specifiek voor vaders', book: false, coach: false, vc: true },
  { label: 'Wetenschappelijk onderbouwd', book: '~', coach: '~', vc: true },
  { label: 'Direct toepasbaar', book: false, coach: true, vc: true },
  { label: 'Betaalbaar', book: true, coach: false, vc: true },
  { label: 'Op je eigen tempo', book: true, coach: false, vc: true },
  { label: 'Werkbladen & oefeningen', book: false, coach: '~', vc: true },
];

function CompareCell({ value }: { value: boolean | string }) {
  if (value === true) return <div className="flex justify-center"><Check className="h-4 w-4 text-emerald-400" /></div>;
  if (value === false) return <div className="flex justify-center"><XIcon className="h-3.5 w-3.5" style={{ color: 'var(--text3)', opacity: 0.4 }} /></div>;
  return <div className="text-xs text-center font-medium" style={{ color: 'var(--text3)' }}>soms</div>;
}

export default function HomePage() {
  const courses = getAllCourses();

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-6">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl" style={{ backgroundColor: '#F59E0B' }}>
                <Heart className="h-4.5 w-4.5 text-black" strokeWidth={2.5} />
              </div>
              <span className="text-sm font-bold" style={{ color: 'var(--amber-text)' }}>
                De Vader Coach
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.1] tracking-tight mb-6" style={{ color: 'var(--text)' }}>
              Elke vader wil het{' '}
              <span style={{ color: 'var(--amber-text)' }}>goed doen.</span>{' '}
              <br className="hidden sm:block" />
              Wij helpen je op weg.
            </h1>

            <p className="text-lg sm:text-xl leading-relaxed mb-8 max-w-xl" style={{ color: 'var(--text2)' }}>
              Je hoeft geen perfecte vader te zijn. Je hoeft alleen te willen groeien.
              Persoonlijke ontwikkeling in 8 wetenschappelijk onderbouwde vaardigheden, vertaald naar herkenbare keukentafelsituaties.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <EmailGate
                downloadUrl="/api/free-download"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-base font-bold text-black transition-transform hover:scale-[0.97] cursor-pointer"
                style={{ backgroundColor: '#F59E0B' }}
              />
              <Link
                href="/experience"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-base font-semibold border transition-colors hover:bg-[var(--surface2)]"
                style={{ color: 'var(--text)', borderColor: 'var(--border)' }}
              >
                Start de Experience
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>

            {/* Secondary links */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                href="/cursussen"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-colors hover:bg-[var(--surface2)]"
                style={{ backgroundColor: 'var(--surface)', color: 'var(--text2)' }}
              >
                <BookOpen className="h-4 w-4" style={{ color: 'var(--amber-text)' }} />
                Bekijk cursussen
              </Link>
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-xl" style={{ backgroundColor: 'var(--surface)' }}>
                <Smartphone className="h-4 w-4" style={{ color: 'var(--amber-text)' }} />
                <span className="text-sm" style={{ color: 'var(--text2)' }}>
                  Ook als{' '}
                  <Link href="/app-download" className="font-semibold text-amber-400 hover:underline">
                    iOS &amp; Android app
                  </Link>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative gradient */}
        <div className="absolute top-0 right-0 -z-10 h-full w-1/2 opacity-15 blur-3xl" style={{ background: 'radial-gradient(circle at 70% 30%, #F59E0B, transparent 60%)' }} />
      </section>

      {/* ── Quote van de dag ──────────────────────────────── */}
      <DailyQuote />

      {/* ── Herken je dit? ─────────────────────────────────── */}
      <section style={{ backgroundColor: 'var(--surface)' }}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-4" style={{ color: 'var(--text)' }}>
              Herken je dit?
            </h2>
            <p className="text-base sm:text-lg max-w-xl mx-auto leading-relaxed" style={{ color: 'var(--text2)' }}>
              Je bent niet de enige. En je bent geen slechte vader.{' '}
              <span className="font-semibold" style={{ color: 'var(--amber-text)' }}>Je mist alleen de juiste tools.</span>
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {RECOGNIZABLE.map((item) => (
              <div
                key={item.skill}
                className="relative rounded-2xl px-6 py-5 border"
                style={{ backgroundColor: item.color + '0A', borderColor: item.color + '25' }}
              >
                <div className="flex items-center gap-2.5 mb-3">
                  <div
                    className="flex h-8 w-8 items-center justify-center rounded-lg"
                    style={{ backgroundColor: item.color + '20' }}
                  >
                    <item.icon className="h-4 w-4" style={{ color: item.color }} />
                  </div>
                  <span className="text-sm font-bold tracking-wide" style={{ color: item.color }}>
                    {item.skill}
                  </span>
                </div>
                <p className="text-[15px] leading-relaxed" style={{ color: 'var(--text)' }}>
                  <span className="text-lg font-serif" style={{ color: item.color }}>&ldquo;</span>
                  {item.text}
                  <span className="text-lg font-serif" style={{ color: item.color }}>&rdquo;</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Quiz CTA ─────────────────────────────── */}
      <section className="border-t" style={{ borderColor: 'var(--border)' }}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <a
            href="/quiz"
            className="block rounded-2xl p-6 sm:p-8 border transition-all hover:scale-[0.995]"
            style={{ backgroundColor: '#F59E0B08', borderColor: '#F59E0B25' }}
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
              <div
                className="flex h-14 w-14 items-center justify-center rounded-2xl flex-shrink-0"
                style={{ backgroundColor: '#F59E0B18' }}
              >
                <HelpCircle className="h-7 w-7" style={{ color: '#F59E0B' }} />
              </div>
              <div className="flex-1">
                <h3 className="text-lg sm:text-xl font-extrabold mb-1" style={{ color: 'var(--text)' }}>
                  Welke vader ben jij?
                </h3>
                <p className="text-[14px]" style={{ color: 'var(--text2)' }}>
                  Doe de gratis quiz en ontdek je sterkste opvoedvaardigheid in 2 minuten. Plus een persoonlijk groeiadvies.
                </p>
              </div>
              <div
                className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold text-black flex-shrink-0"
                style={{ backgroundColor: '#F59E0B' }}
              >
                Start de quiz →
              </div>
            </div>
          </a>
        </div>
      </section>

      {/* ── Kies jouw route ─────────────────────────────── */}
      <section className="border-t" style={{ borderColor: 'var(--border)' }}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <div className="max-w-lg mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold mb-3" style={{ color: 'var(--text)' }}>
              Kies jouw route
            </h2>
            <p className="text-base leading-relaxed" style={{ color: 'var(--text2)' }}>
              Drie manieren om te groeien als vader. Elk op zijn eigen manier, elk in zijn eigen tempo.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* App */}
            <div className="rounded-2xl border overflow-hidden flex flex-col" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
              <div className="h-1" style={{ backgroundColor: '#F59E0B' }} />
              <div className="p-5 sm:p-6 flex flex-col flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ backgroundColor: '#F59E0B15' }}>
                    <Smartphone className="h-5 w-5" style={{ color: 'var(--amber-text)' }} />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold" style={{ color: 'var(--text)' }}>De App</h3>
                    <p className="text-xs font-semibold" style={{ color: 'var(--amber-text)' }}>Dagelijks oefenen</p>
                  </div>
                </div>
                <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--text2)' }}>
                  Dagelijkse micro-oefeningen, streaks, badges en een community van vaders. 2 tot 10 minuten per dag.
                </p>
                <p className="text-[13px] font-semibold mb-4 px-3 py-1.5 rounded-lg self-start" style={{ backgroundColor: '#F59E0B08', color: 'var(--amber-text)' }}>
                  Ideaal als je elke dag een klein moment wilt pakken
                </p>
                <ul className="space-y-2 mb-5 flex-1">
                  {['2-10 min per dag', 'Streaks & badges', 'Community van vaders', 'Interactieve oefeningen'].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-[13px]" style={{ color: 'var(--text2)' }}>
                      <Check className="h-3.5 w-3.5 shrink-0" style={{ color: 'var(--amber-text)' }} />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="flex items-center justify-between pt-4 border-t" style={{ borderColor: 'var(--border)' }}>
                  <span className="text-[13px] font-bold" style={{ color: 'var(--amber-text)' }}>Gratis</span>
                  <Link href="/app-download" className="inline-flex items-center gap-1 text-sm font-bold hover:gap-2 transition-all" style={{ color: 'var(--amber-text)' }}>
                    Download app <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Experience */}
            <div className="rounded-2xl border overflow-hidden relative flex flex-col" style={{ backgroundColor: 'var(--surface)', borderColor: '#F59E0B40' }}>
              <div className="h-1" style={{ background: 'linear-gradient(to right, #667eea, #EF4444, #34D399, #FBBF24, #A78BFA, #FB923C, #60A5FA, #C084FC)' }} />
              <div className="absolute top-3 right-3">
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md" style={{ backgroundColor: '#F59E0B20', color: 'var(--amber-text)' }}>
                  NIEUW
                </span>
              </div>
              <div className="p-5 sm:p-6 flex flex-col flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ backgroundColor: '#F59E0B15' }}>
                    <Calendar className="h-5 w-5" style={{ color: 'var(--amber-text)' }} />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold" style={{ color: 'var(--text)' }}>De Experience</h3>
                    <p className="text-xs font-semibold" style={{ color: 'var(--amber-text)' }}>De 22-dagen reis</p>
                  </div>
                </div>
                <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--text2)' }}>
                  22 scenario-dagen door alle 8 vaardigheden. Herkenbare situaties, concrete acties en dagelijkse reflectie.
                </p>
                <p className="text-[13px] font-semibold mb-4 px-3 py-1.5 rounded-lg self-start" style={{ backgroundColor: '#F59E0B08', color: 'var(--amber-text)' }}>
                  Ideaal als je een duidelijk stappenplan wilt volgen
                </p>
                <ul className="space-y-2 mb-5 flex-1">
                  {['22 vaste dagen', 'Alle 8 vaardigheden', 'Audio-intro per dag', 'Herkenbare scenario\'s'].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-[13px]" style={{ color: 'var(--text2)' }}>
                      <Check className="h-3.5 w-3.5 shrink-0" style={{ color: 'var(--amber-text)' }} />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="flex items-center justify-between pt-4 border-t" style={{ borderColor: 'var(--border)' }}>
                  <span className="text-[13px] font-bold" style={{ color: 'var(--amber-text)' }}>&euro;19,99 eenmalig</span>
                  <Link href="/experience" className="inline-flex items-center gap-1 text-sm font-bold hover:gap-2 transition-all" style={{ color: 'var(--amber-text)' }}>
                    Bekijk Experience <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Cursussen */}
            <div className="rounded-2xl border overflow-hidden flex flex-col" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
              <div className="h-1" style={{ backgroundColor: '#F59E0B' }} />
              <div className="p-5 sm:p-6 flex flex-col flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ backgroundColor: '#F59E0B15' }}>
                    <BookOpen className="h-5 w-5" style={{ color: 'var(--amber-text)' }} />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold" style={{ color: 'var(--text)' }}>De Cursussen</h3>
                    <p className="text-xs font-semibold" style={{ color: 'var(--amber-text)' }}>Diepgang per vaardigheid</p>
                  </div>
                </div>
                <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--text2)' }}>
                  10 verdiepende PDF-werkboeken met wetenschap, werkbladen en oefeningen. Per vaardigheid of als bundel.
                </p>
                <p className="text-[13px] font-semibold mb-4 px-3 py-1.5 rounded-lg self-start" style={{ backgroundColor: '#F59E0B08', color: 'var(--amber-text)' }}>
                  Ideaal als je alles wilt weten over één vaardigheid
                </p>
                <ul className="space-y-2 mb-5 flex-1">
                  {['10 PDF-werkboeken', '40-80 pagina\'s per stuk', 'Werkbladen & oefeningen', 'Wetenschappelijk onderbouwd'].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-[13px]" style={{ color: 'var(--text2)' }}>
                      <Check className="h-3.5 w-3.5 shrink-0" style={{ color: 'var(--amber-text)' }} />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="flex items-center justify-between pt-4 border-t" style={{ borderColor: 'var(--border)' }}>
                  <span className="text-[13px]" style={{ color: 'var(--text3)' }}>Per stuk of bundel</span>
                  <Link href="/cursussen" className="inline-flex items-center gap-1 text-sm font-bold hover:gap-2 transition-all" style={{ color: 'var(--amber-text)' }}>
                    Bekijk cursussen <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Combineer hint */}
          <div className="mt-5 rounded-xl border p-4 sm:p-5" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
            <div className="flex items-center gap-2 mb-3">
              <Zap className="h-4 w-4 text-amber-400" />
              <span className="text-sm font-bold" style={{ color: 'var(--text)' }}>Combineer voor het meeste resultaat</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="flex items-start gap-2">
                <span className="text-xs font-extrabold shrink-0 mt-0.5 px-1.5 py-0.5 rounded" style={{ backgroundColor: '#F59E0B15', color: 'var(--amber-text)' }}>1</span>
                <p className="text-[13px] leading-relaxed" style={{ color: 'var(--text2)' }}>
                  <span className="font-semibold" style={{ color: 'var(--text)' }}>App + Experience</span> ·dagelijks oefenen en een gestructureerd pad
                </p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-xs font-extrabold shrink-0 mt-0.5 px-1.5 py-0.5 rounded" style={{ backgroundColor: '#F59E0B15', color: 'var(--amber-text)' }}>2</span>
                <p className="text-[13px] leading-relaxed" style={{ color: 'var(--text2)' }}>
                  <span className="font-semibold" style={{ color: 'var(--text)' }}>App + Cursussen</span> ·dagelijks oefenen en verdieping per vaardigheid
                </p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-xs font-extrabold shrink-0 mt-0.5 px-1.5 py-0.5 rounded" style={{ backgroundColor: '#F59E0B15', color: 'var(--amber-text)' }}>3</span>
                <p className="text-[13px] leading-relaxed" style={{ color: 'var(--text2)' }}>
                  <span className="font-semibold" style={{ color: 'var(--text)' }}>Alle drie</span> ·het complete pakket voor maximaal resultaat
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 8 vaardigheden strip ────────────────────────── */}
      <section className="border-t" style={{ borderColor: 'var(--border)' }}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            {SKILLS.map((skill) => (
              <div
                key={skill.name}
                className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 rounded-xl"
                style={{ backgroundColor: skill.color + '0a' }}
              >
                <div
                  className="flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-lg"
                  style={{ backgroundColor: skill.color + '18' }}
                >
                  <skill.icon className="h-3 w-3 sm:h-3.5 sm:w-3.5" style={{ color: skill.color }} />
                </div>
                <span className="text-xs sm:text-[13px] font-bold" style={{ color: skill.color }}>{skill.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Waarom De Vader Coach? ──────────────────────── */}
      <section className="border-t" style={{ borderColor: 'var(--border)' }}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            {/* Left: USP list + science badges */}
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold mb-2" style={{ color: 'var(--text)' }}>
                Waarom De Vader Coach?
              </h2>
              <p className="text-base mb-6" style={{ color: 'var(--text2)' }}>
                Er zijn opvoedboeken. Er zijn coaches. Wij doen het anders.
              </p>

              <div className="space-y-3 mb-8">
                {[
                  { icon: Heart, title: 'Door vaders, voor vaders', desc: 'Geschreven vanuit het vaderperspectief, met situaties die je herkent.' },
                  { icon: Brain, title: 'Wetenschap in gewone taal', desc: 'Gottman, Bowlby, Fonagy - vertaald naar je keukentafel.' },
                  { icon: Target, title: 'Direct toepasbaar', desc: 'Vol oefeningen die je vandaag nog kunt doen.' },
                  { icon: Shield, title: 'Geen oordeel', desc: 'Geen vinger wijzen. Wel tools om het anders te doen.' },
                ].map((f) => (
                  <div key={f.title} className="flex items-start gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-500/10">
                      <f.icon className="h-4 w-4 text-amber-400" />
                    </div>
                    <div>
                      <div className="text-base font-bold" style={{ color: 'var(--text)' }}>{f.title}</div>
                      <div className="text-sm" style={{ color: 'var(--text3)' }}>{f.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Comparison table + stats */}
            <div className="space-y-4">
              <div className="rounded-xl border overflow-hidden" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
                <table className="w-full text-[13px] sm:text-sm">
                  <thead>
                    <tr style={{ backgroundColor: 'var(--surface2)' }}>
                      <th className="text-left px-2 sm:px-4 py-2.5 font-semibold" style={{ color: 'var(--text3)' }}></th>
                      <th className="px-1.5 sm:px-3 py-2.5 text-center font-medium" style={{ color: 'var(--text3)' }}>Boek</th>
                      <th className="px-1.5 sm:px-3 py-2.5 text-center font-medium" style={{ color: 'var(--text3)' }}>Coach</th>
                      <th className="px-1.5 sm:px-3 py-2.5 text-center font-bold" style={{ color: 'var(--amber-text)' }}>Ons</th>
                    </tr>
                  </thead>
                  <tbody>
                    {COMPARE_ROWS.map((row, i) => (
                      <tr
                        key={row.label}
                        className={i < COMPARE_ROWS.length - 1 ? 'border-b' : ''}
                        style={{ borderColor: 'var(--border)' }}
                      >
                        <td className="px-2 sm:px-4 py-2.5 font-medium" style={{ color: 'var(--text2)' }}>{row.label}</td>
                        <td className="px-1.5 sm:px-3 py-2.5"><CompareCell value={row.book} /></td>
                        <td className="px-1.5 sm:px-3 py-2.5"><CompareCell value={row.coach} /></td>
                        <td className="px-1.5 sm:px-3 py-2.5" style={{ backgroundColor: '#F59E0B06' }}><CompareCell value={row.vc} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { value: '100+', label: 'Oefeningen', color: '#34D399' },
                  { value: '8', label: 'Vaardigheden', color: '#EF4444' },
                  { value: '22', label: 'Dagen Experience', color: '#FBBF24' },
                  { value: '5 min', label: 'Per dag', color: '#667eea' },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-xl p-3 text-center"
                    style={{ backgroundColor: stat.color + '0a' }}
                  >
                    <div className="text-lg font-extrabold mb-0.5" style={{ color: stat.color }}>{stat.value}</div>
                    <div className="text-xs font-semibold" style={{ color: 'var(--text3)' }}>{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Gebouwd op wetenschap ·full width row */}
          <div className="mt-10 pt-8 border-t" style={{ borderColor: 'var(--border)' }}>
            <p className="text-xs font-semibold mb-4 uppercase tracking-wider text-center" style={{ color: 'var(--text3)' }}>
              Gebouwd op wetenschap
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {[
                { text: 'Hechtingstheorie (Bowlby)', color: '#667eea' },
                { text: 'Emotiecoaching (Gottman)', color: '#EF4444' },
                { text: 'Zelfdeterminatie (Deci & Ryan)', color: '#A78BFA' },
                { text: 'Reflectief functioneren (Fonagy)', color: '#C084FC' },
                { text: 'Polyvagaaltheorie (Porges)', color: '#34D399' },
              ].map((item) => (
                <span
                  key={item.text}
                  className="text-xs font-semibold px-3 py-1.5 rounded-lg"
                  style={{ backgroundColor: item.color + '12', color: item.color }}
                >
                  {item.text}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Cursussen ────────────────────────────────────── */}
      <section style={{ backgroundColor: 'var(--surface)' }}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold mb-2" style={{ color: 'var(--text)' }}>
                De cursussen
              </h2>
              <p className="text-base" style={{ color: 'var(--text2)' }}>
                10 verdiepende PDF-cursussen. Wetenschappelijk onderbouwd, direct toepasbaar.
              </p>
            </div>
            <Link
              href="/cursussen"
              className="hidden sm:flex items-center gap-1 text-sm font-semibold text-amber-400 hover:gap-2 transition-all"
            >
              Alle cursussen <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {courses.map((course) => (
              <CourseCard key={course.slug} {...course} />
            ))}
          </div>

          {/* Bundle */}
          <div
            className="mt-4 rounded-xl border p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            style={{ backgroundColor: 'var(--bg)', borderColor: '#F59E0B30' }}
          >
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl" style={{ backgroundColor: '#F59E0B15' }}>
                <BookOpen className="h-5 w-5" style={{ color: 'var(--amber-text)' }} />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-sm font-bold" style={{ color: 'var(--text)' }}>{BUNDLE.title}</span>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-md" style={{ backgroundColor: 'var(--surface2)', color: 'var(--text3)' }}>
                    Binnenkort
                  </span>
                </div>
                <p className="text-[13px]" style={{ color: 'var(--text3)' }}>
                  Alle 10 cursussen &middot; {Math.round((1 - BUNDLE.price / BUNDLE.originalPrice) * 100)}% korting
                </p>
              </div>
            </div>
            <div className="flex items-baseline gap-2 shrink-0">
              <span className="text-sm line-through" style={{ color: 'var(--text3)' }}>
                &euro;{BUNDLE.originalPrice.toFixed(2).replace('.', ',')}
              </span>
              <span className="text-2xl font-extrabold" style={{ color: 'var(--amber-text)' }}>
                &euro;{BUNDLE.price.toFixed(2).replace('.', ',')}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Wat vaders zeggen ─────────────────────────────── */}
      <section style={{ backgroundColor: 'var(--surface)' }}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <div className="max-w-lg mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold mb-2" style={{ color: 'var(--text)' }}>
              Wat vaders zeggen
            </h2>
            <p className="text-base" style={{ color: 'var(--text2)' }}>
              Echte ervaringen van vaders die de stap hebben gezet.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {TESTIMONIALS.slice(0, 3).map((t) => (
              <div
                key={t.name}
                className="rounded-xl border p-5 relative"
                style={{ backgroundColor: 'var(--bg)', borderColor: 'var(--border)' }}
              >
                <Quote className="h-5 w-5 mb-3 opacity-20" style={{ color: t.color }} />
                <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text2)' }}>
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-extrabold text-black"
                    style={{ backgroundColor: t.color }}
                  >
                    {t.name[0]}
                  </div>
                  <div>
                    <div className="text-sm font-bold" style={{ color: 'var(--text)' }}>{t.name}</div>
                    <div className="text-xs" style={{ color: 'var(--text3)' }}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Samen App promotie ─────────────────────────────── */}
      <section style={{ backgroundColor: 'var(--bg)' }}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <div
            className="rounded-2xl border p-6 sm:p-10 flex flex-col sm:flex-row items-start gap-6 sm:gap-10"
            style={{ borderColor: '#C4704B30', backgroundColor: '#C4704B08' }}
          >
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl" style={{ backgroundColor: '#C4704B15' }}>
              <Heart className="h-7 w-7" style={{ color: '#C4704B' }} />
            </div>
            <div className="flex-1">
              <h2 className="text-xl sm:text-2xl font-extrabold mb-3" style={{ color: 'var(--text)' }}>
                Een goede vader begint bij een sterke relatie
              </h2>
              <p className="text-base leading-relaxed mb-5" style={{ color: 'var(--text2)' }}>
                Jullie relatie is het fundament van jullie gezin. Met Samen - onze app voor koppels - investeer je dagelijks in jullie band. Vijf minuten per dag voor een sterkere relatie en een gelukkiger gezin.
              </p>
              <a
                href="https://samenapp.nl"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white transition-transform hover:scale-[0.97]"
                style={{ backgroundColor: '#C4704B' }}
              >
                Ontdek Samen <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Populaire Gidsen ─────────────────────────────── */}
      <section>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold" style={{ color: 'var(--text)' }}>
                Gratis opvoedgidsen
              </h2>
              <p className="text-sm mt-1" style={{ color: 'var(--text2)' }}>
                Praktische gidsen voor veelvoorkomende opvoedsituaties
              </p>
            </div>
            <Link
              href="/gids"
              className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold hover:underline"
              style={{ color: 'var(--amber-text)' }}
            >
              Alle gidsen <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { slug: 'driftbuien-kind', title: 'Driftbuien bij Kinderen', desc: 'Hoe je kalm blijft en wat echt werkt' },
              { slug: 'kind-luistert-niet', title: 'Kind Luistert Niet?', desc: 'Waarom herhalen niet helpt en wat wel' },
              { slug: 'grenzen-stellen-kind', title: 'Grenzen Stellen', desc: 'Duidelijk zijn zonder te schreeuwen' },
              { slug: 'overprikkeld-kind', title: 'Overprikkeld Kind', desc: 'Herkennen en kalmeren in het moment' },
              { slug: 'straffen-kind-alternatief', title: 'Alternatieven voor Straffen', desc: 'Wat werkt beter dan straf' },
              { slug: 'druk-kind-tot-rust-brengen', title: 'Druk Kind tot Rust Brengen', desc: 'Wat werkt (en wat niet)' },
            ].map((g) => (
              <Link
                key={g.slug}
                href={`/gids/${g.slug}`}
                className="flex items-start gap-3 rounded-xl border p-5 transition-colors hover:border-amber-500/30"
                style={{ borderColor: 'var(--border)' }}
              >
                <div className="shrink-0 w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#F59E0B15' }}>
                  <BookOpen className="h-4 w-4" style={{ color: 'var(--amber-text)' }} />
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-bold mb-0.5" style={{ color: 'var(--text)' }}>{g.title}</h3>
                  <p className="text-xs" style={{ color: 'var(--text3)' }}>{g.desc}</p>
                </div>
              </Link>
            ))}
          </div>
          <Link
            href="/gids"
            className="sm:hidden mt-4 inline-flex items-center gap-1.5 text-sm font-semibold hover:underline"
            style={{ color: 'var(--amber-text)' }}
          >
            Bekijk alle gidsen <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* ── Laatste CTA ──────────────────────────────────── */}
      <section style={{ backgroundColor: 'var(--surface)' }}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-14 sm:py-16 text-center">
          <h2 className="text-xl sm:text-2xl font-extrabold mb-3" style={{ color: 'var(--text)' }}>
            Word vandaag een betere vader
          </h2>
          <p className="text-base mb-6 max-w-md mx-auto" style={{ color: 'var(--text2)' }}>
            Download de gratis snelgids met opvoedtips en ontdek welke vaardigheid bij jou past.
          </p>
          <EmailGate
            downloadUrl="/api/free-download"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-base font-bold text-black transition-transform hover:scale-[0.97] cursor-pointer"
            style={{ backgroundColor: '#F59E0B' }}
          />
        </div>
      </section>

      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'Wat is De Vadercoach?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'De Vadercoach biedt persoonlijke ontwikkeling voor vaders, met 8 wetenschappelijk onderbouwde opvoedvaardigheden. Via cursussen, een 22-daagse Experience en een app leer je vaardigheden als emotiecoaching, zelfregulatie en grenzen stellen.',
                },
              },
              {
                '@type': 'Question',
                name: 'Voor welke leeftijd zijn de cursussen geschikt?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'De cursussen zijn geschikt voor vaders met kinderen van 0 tot 18 jaar. Elke cursus bevat leeftijdsspecifieke oefeningen en voorbeelden voor peuters, kleuters, basisschoolkinderen en tieners.',
                },
              },
              {
                '@type': 'Question',
                name: 'Zijn de cursussen wetenschappelijk onderbouwd?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Ja. Alle cursussen zijn gebaseerd op bewezen theorieën zoals de hechtingstheorie (Bowlby), emotiecoaching (Gottman), zelfdeterminatietheorie (Deci & Ryan), reflectief functioneren (Fonagy) en de polyvagaaltheorie (Porges). De wetenschap wordt vertaald naar herkenbare dagelijkse situaties.',
                },
              },
              {
                '@type': 'Question',
                name: 'Wat is de Vader Experience?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'De Vader Experience is een 22-daagse reis door alle 8 opvoedvaardigheden. Elke dag bevat een herkenbaar scenario, concrete acties en een reflectiemoment. Je werkt op je eigen tempo en krijgt dagelijks een nieuwe uitdaging.',
                },
              },
              {
                '@type': 'Question',
                name: 'Heb ik een abonnement nodig?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Nee. De Vadercoach app is helemaal gratis. De cursussen en Experience zijn eenmalige aankopen zonder abonnement.',
                },
              },
            ],
          }),
        }}
      />

      {/* WebSite Schema for sitelinks search */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'De Vadercoach',
            url: 'https://devadercoach.nl',
            description: 'Trainingen persoonlijke ontwikkeling voor vaders. Opvoedcursussen, een 22-daagse Vader Experience en een app. Wetenschappelijk onderbouwd.',
            inLanguage: 'nl',
            publisher: {
              '@type': 'Organization',
              name: 'De Vadercoach',
              url: 'https://devadercoach.nl',
            },
          }),
        }}
      />

      {/* Review Schema for testimonials */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'De Vadercoach',
            url: 'https://devadercoach.nl',
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '4.8',
              reviewCount: String(TESTIMONIALS.length),
              bestRating: '5',
            },
            review: TESTIMONIALS.map((t) => ({
              '@type': 'Review',
              author: { '@type': 'Person', name: t.name },
              reviewBody: t.text,
              reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
            })),
          }),
        }}
      />
    </>
  );
}
