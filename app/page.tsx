import Link from 'next/link';
import {
  Heart,
  Brain,
  BookOpen,
  Target,
  Shield,
  Zap,
  Smartphone,
  ArrowRight,
  Eye,
  Waves,
  Sprout,
  RefreshCw,
  Handshake,
} from 'lucide-react';
import CourseCard from '@/components/CourseCard';

// Skill colors matching the app
const SKILL_COLORS = {
  aanwezigheid: '#667eea',
  emotiecoaching: '#EF4444',
  zelfregulatie: '#34D399',
  grenzen: '#FBBF24',
  autonomie: '#A78BFA',
  herstel: '#FB923C',
  verbinding: '#60A5FA',
  reflectie: '#C084FC',
};

const SKILLS = [
  { name: 'Aanwezigheid', icon: Eye, color: SKILL_COLORS.aanwezigheid },
  { name: 'Emotiecoaching', icon: Heart, color: SKILL_COLORS.emotiecoaching },
  { name: 'Zelfregulatie', icon: Waves, color: SKILL_COLORS.zelfregulatie },
  { name: 'Grenzen', icon: Shield, color: SKILL_COLORS.grenzen },
  { name: 'Autonomie', icon: Sprout, color: SKILL_COLORS.autonomie },
  { name: 'Herstel', icon: RefreshCw, color: SKILL_COLORS.herstel },
  { name: 'Verbinding', icon: Handshake, color: SKILL_COLORS.verbinding },
  { name: 'Reflectie', icon: Brain, color: SKILL_COLORS.reflectie },
];

const FEATURES = [
  {
    icon: Brain,
    title: 'Wetenschappelijk onderbouwd',
    description: 'Alle cursussen en trainingen zijn gebaseerd op psychologie, gedragswetenschap en bewezen opvoedmethoden.',
  },
  {
    icon: Target,
    title: 'Direct toepasbaar',
    description: 'Praktische oefeningen die je dezelfde dag nog kunt toepassen in je gezin.',
  },
  {
    icon: BookOpen,
    title: 'Op je eigen tempo',
    description: 'PDF-cursussen om te lezen en herlezen. De app met dagelijkse hapklare oefeningen.',
  },
  {
    icon: Shield,
    title: 'Geen coach nodig',
    description: 'Zelfstandig aan de slag met duidelijke stappen. Jij bent de expert van je eigen gezin.',
  },
];

const PLACEHOLDER_COURSES = [
  {
    title: 'Emotiecoaching voor Vaders',
    description: 'Leer hoe je je kind helpt omgaan met emoties. Van driftbuien tot verdriet — praktische handvatten.',
    price: 14.95,
    slug: 'emotiecoaching-vaders',
    category: 'Emotiecoaching',
    color: SKILL_COLORS.emotiecoaching,
    status: 'coming-soon' as const,
    features: ['40+ pagina\'s praktische oefeningen', 'Gebaseerd op wetenschappelijk onderzoek', 'Direct toepasbaar'],
  },
  {
    title: 'Grenzen Stellen met Liefde',
    description: 'Hoe stel je gezonde grenzen zonder de band met je kind te beschadigen? Een stap-voor-stap gids.',
    price: 12.95,
    slug: 'grenzen-stellen',
    category: 'Grenzen',
    color: SKILL_COLORS.grenzen,
    status: 'coming-soon' as const,
    features: ['Concrete scripts en zinnen', 'Voor alle leeftijden', 'Inclusief werkbladen'],
  },
  {
    title: 'Aanwezig Vaderschap',
    description: 'Kwaliteitstijd in een druk leven. Leer hoe je echt aanwezig bent voor je kind, ook in korte momenten.',
    price: 9.95,
    slug: 'aanwezig-vaderschap',
    category: 'Aanwezigheid',
    color: SKILL_COLORS.aanwezigheid,
    status: 'coming-soon' as const,
    features: ['Dagelijkse micro-oefeningen', '20+ bewezen technieken', 'Reflectie-opdrachten'],
  },
];

export default function HomePage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ backgroundColor: '#F59E0B' }}>
                <Heart className="h-5 w-5 text-black" strokeWidth={2.5} />
              </div>
              <span className="text-sm font-bold" style={{ color: '#F59E0B' }}>
                De Vadercoach
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.1] tracking-tight mb-6" style={{ color: 'var(--text)' }}>
              Word elke dag een{' '}
              <span style={{ color: '#F59E0B' }}>iets betere</span>{' '}
              vader
            </h1>

            <p className="text-lg sm:text-xl leading-relaxed mb-8 max-w-xl" style={{ color: 'var(--text2)' }}>
              Praktische cursussen en een trainingsapp voor vaders die willen groeien.
              Gebaseerd op wetenschap, psychologie en echte ervaringen.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/cursussen"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-base font-bold text-black transition-transform hover:scale-[0.97]"
                style={{ backgroundColor: '#F59E0B' }}
              >
                Bekijk cursussen
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="/app-download"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-base font-semibold border transition-colors hover:bg-[var(--surface2)]"
                style={{ color: 'var(--text)', borderColor: 'var(--border)' }}
              >
                <Smartphone className="h-5 w-5" />
                Bekijk de app
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative gradient */}
        <div className="absolute top-0 right-0 -z-10 h-full w-1/2 opacity-20 blur-3xl" style={{ background: 'radial-gradient(circle at 70% 30%, #F59E0B, transparent 60%)' }} />
      </section>

      {/* ── 8 Vaardigheden ───────────────────────────────── */}
      <section className="border-t" style={{ borderColor: 'var(--border)' }}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold mb-3" style={{ color: 'var(--text)' }}>
              8 opvoedvaardigheden
            </h2>
            <p className="text-base max-w-lg mx-auto" style={{ color: 'var(--text2)' }}>
              De app en cursussen bestrijken 8 kernvaardigheden voor vaders, elk met hun eigen kleur en trainingen.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {SKILLS.map((skill) => (
              <div
                key={skill.name}
                className="rounded-2xl border p-4 text-center"
                style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}
              >
                <div
                  className="flex h-11 w-11 mx-auto items-center justify-center rounded-xl mb-3"
                  style={{ backgroundColor: skill.color + '18' }}
                >
                  <skill.icon className="h-5 w-5" style={{ color: skill.color }} />
                </div>
                <span className="text-sm font-bold" style={{ color: 'var(--text)' }}>{skill.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ─────────────────────────────────────── */}
      <section className="border-t" style={{ borderColor: 'var(--border)' }}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold mb-3" style={{ color: 'var(--text)' }}>
              Waarom De Vadercoach?
            </h2>
            <p className="text-base max-w-lg mx-auto" style={{ color: 'var(--text2)' }}>
              We verlagen de drempel voor hulp. Geen wachtlijsten, geen dure sessies — gewoon goed materiaal.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="rounded-2xl border p-6"
                style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl mb-4 bg-amber-500/10">
                  <f.icon className="h-5 w-5 text-amber-400" />
                </div>
                <h3 className="text-base font-bold mb-2" style={{ color: 'var(--text)' }}>
                  {f.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text2)' }}>
                  {f.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Cursussen ────────────────────────────────────── */}
      <section className="border-t" style={{ borderColor: 'var(--border)' }}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold mb-2" style={{ color: 'var(--text)' }}>
                Cursussen
              </h2>
              <p className="text-base" style={{ color: 'var(--text2)' }}>
                Verdiepende PDF-cursussen per onderwerp
              </p>
            </div>
            <Link
              href="/cursussen"
              className="hidden sm:flex items-center gap-1 text-sm font-semibold text-amber-400 hover:gap-2 transition-all"
            >
              Alle cursussen <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {PLACEHOLDER_COURSES.map((course) => (
              <CourseCard key={course.slug} {...course} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Wetenschap ───────────────────────────────────── */}
      <section className="border-t" style={{ borderColor: 'var(--border)' }}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold mb-4" style={{ color: 'var(--text)' }}>
                Gebouwd op wetenschap, niet op meningen
              </h2>
              <p className="text-base leading-relaxed mb-6" style={{ color: 'var(--text2)' }}>
                Elke cursus en oefening is gebaseerd op bewezen methoden uit de
                ontwikkelingspsychologie, hechtingstheorie en positieve opvoedkunde.
                We vertalen wetenschappelijk onderzoek naar praktische stappen
                die je als vader direct kunt toepassen.
              </p>
              <ul className="space-y-3">
                {[
                  { text: 'Ontwikkelingspsychologie & hechtingstheorie', color: SKILL_COLORS.verbinding },
                  { text: 'Emotiecoaching (Gottman methode)', color: SKILL_COLORS.emotiecoaching },
                  { text: 'Positieve discipline & grenzen', color: SKILL_COLORS.grenzen },
                  { text: 'Mindful ouderschap', color: SKILL_COLORS.reflectie },
                ].map((item) => (
                  <li key={item.text} className="flex items-center gap-3">
                    <Zap className="h-4 w-4 shrink-0" style={{ color: item.color }} />
                    <span className="text-sm font-medium" style={{ color: 'var(--text)' }}>{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border p-8" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
              <div className="grid grid-cols-2 gap-6 text-center">
                {[
                  { value: '100+', label: 'Oefeningen', color: SKILL_COLORS.aanwezigheid },
                  { value: '8', label: 'Vaardigheden', color: SKILL_COLORS.emotiecoaching },
                  { value: '0-18', label: 'Leeftijden', color: SKILL_COLORS.grenzen },
                  { value: '2-10', label: 'Min per dag', color: SKILL_COLORS.zelfregulatie },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div className="text-3xl font-extrabold mb-1" style={{ color: stat.color }}>{stat.value}</div>
                    <div className="text-xs font-semibold" style={{ color: 'var(--text3)' }}>{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── App Promo ────────────────────────────────────── */}
      <section className="border-t" style={{ borderColor: 'var(--border)' }}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="rounded-2xl border p-8 sm:p-12" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl mb-4" style={{ backgroundColor: '#F59E0B' }}>
                  <Smartphone className="h-6 w-6 text-black" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold mb-3" style={{ color: 'var(--text)' }}>
                  De Vadercoach App
                </h2>
                <p className="text-base leading-relaxed mb-4" style={{ color: 'var(--text2)' }}>
                  Alle 8 vaardigheden in je broekzak. Dagelijkse oefeningen, interactieve trainingen,
                  voortgang bijhouden en een community van vaders.
                </p>
                <p className="text-sm mb-6" style={{ color: 'var(--text3)' }}>
                  Eenmalige aankoop — geen abonnement nodig.
                </p>
                <Link
                  href="/app-download"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-base font-bold text-black transition-transform hover:scale-[0.97]"
                  style={{ backgroundColor: '#F59E0B' }}
                >
                  Meer over de app
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </div>

              {/* Mini skill grid */}
              <div className="grid grid-cols-4 gap-2">
                {SKILLS.map((skill) => (
                  <div
                    key={skill.name}
                    className="rounded-xl p-3 flex flex-col items-center gap-1.5"
                    style={{ backgroundColor: skill.color + '10' }}
                  >
                    <skill.icon className="h-5 w-5" style={{ color: skill.color }} />
                    <span className="text-[10px] font-bold text-center leading-tight" style={{ color: skill.color }}>
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
