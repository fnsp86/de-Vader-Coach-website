import type { Metadata } from 'next';
import {
  Smartphone,
  Target,
  BookOpen,
  Brain,
  BarChart3,
  Zap,
  Users,
  Heart,
  Eye,
  Shield,
  Waves,
  Sprout,
  RefreshCw,
  Handshake,
  Trophy,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'De App',
  description: 'De Vadercoach app: dagelijkse oefeningen, trainingen over 8 vaardigheden en een community van vaders.',
};

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
  { name: 'Aanwezigheid', icon: Eye, color: SKILL_COLORS.aanwezigheid, desc: 'Leer écht aanwezig te zijn' },
  { name: 'Emotiecoaching', icon: Heart, color: SKILL_COLORS.emotiecoaching, desc: 'Help je kind met emoties' },
  { name: 'Zelfregulatie', icon: Waves, color: SKILL_COLORS.zelfregulatie, desc: 'Blijf kalm in moeilijke momenten' },
  { name: 'Grenzen', icon: Shield, color: SKILL_COLORS.grenzen, desc: 'Stel grenzen met liefde' },
  { name: 'Autonomie', icon: Sprout, color: SKILL_COLORS.autonomie, desc: 'Stimuleer zelfstandigheid' },
  { name: 'Herstel', icon: RefreshCw, color: SKILL_COLORS.herstel, desc: 'Herstel na fouten' },
  { name: 'Verbinding', icon: Handshake, color: SKILL_COLORS.verbinding, desc: 'Versterk de band' },
  { name: 'Reflectie', icon: Brain, color: SKILL_COLORS.reflectie, desc: 'Leer van je ervaringen' },
];

const APP_FEATURES = [
  { icon: Target, title: 'Dagelijkse oefeningen', description: 'Elke dag een nieuwe opdracht afgestemd op jouw situatie en de leeftijd van je kind' },
  { icon: BookOpen, title: 'Korte trainingen', description: 'Interactieve leermodules over alle 8 vaardigheden, in hapklare stukken' },
  { icon: Brain, title: 'Pulse Check-in', description: 'Dagelijkse reflectie om bewust stil te staan bij je vaderschap' },
  { icon: BarChart3, title: 'Voortgang bijhouden', description: 'Zie je streak, XP en level groeien naarmate je vordert' },
  { icon: Trophy, title: 'Badges & beloningen', description: 'Verdien badges voor je inzet, streaks en voltooide trainingen' },
  { icon: Zap, title: '2-10 minuten per dag', description: 'Past in elk druk schema. Korte, krachtige oefeningen' },
  { icon: Users, title: 'Community', description: 'Deel ervaringen en tips met andere vaders in de buurt' },
  { icon: Smartphone, title: 'Offline beschikbaar', description: 'Oefeningen en trainingen werken ook zonder internet' },
];

export default function AppDownloadPage() {
  return (
    <>
      {/* Hero */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold mb-4" style={{ color: 'var(--text)' }}>
              De Vadercoach App
            </h1>
            <p className="text-lg leading-relaxed mb-4" style={{ color: 'var(--text2)' }}>
              Alle 8 opvoedvaardigheden in je broekzak. Dagelijkse oefeningen, interactieve
              trainingen, voortgang bijhouden en een community van vaders die hetzelfde doel hebben.
            </p>
            <p className="text-base leading-relaxed mb-6" style={{ color: 'var(--text2)' }}>
              De app bevat korte trainingen over elk onderwerp, van emotiecoaching tot grenzen stellen.
              Eenmalige aankoop, geen abonnement. Koop eenmaal en krijg toegang tot alles.
            </p>

            <div className="rounded-xl border p-4 mb-6 flex items-center gap-4" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
              <div className="text-2xl font-extrabold" style={{ color: '#F59E0B' }}>
                Eenmalig
              </div>
              <div>
                <p className="text-sm font-semibold" style={{ color: 'var(--text)' }}>Geen abonnement</p>
                <p className="text-xs" style={{ color: 'var(--text3)' }}>Koop eenmaal, krijg alle trainingen en updates</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <div
                className="px-6 py-3 rounded-xl text-center text-sm font-bold"
                style={{ backgroundColor: 'var(--surface2)', color: 'var(--text3)' }}
              >
                App Store · Binnenkort
              </div>
              <div
                className="px-6 py-3 rounded-xl text-center text-sm font-bold"
                style={{ backgroundColor: 'var(--surface2)', color: 'var(--text3)' }}
              >
                Google Play · Binnenkort
              </div>
            </div>
          </div>

          {/* App preview placeholder */}
          <div className="flex justify-center">
            <div
              className="w-64 h-[520px] rounded-[36px] border-4 flex flex-col items-center justify-center gap-4 overflow-hidden"
              style={{ borderColor: 'var(--border)', backgroundColor: '#111318' }}
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl" style={{ backgroundColor: '#F59E0B' }}>
                <Heart className="h-8 w-8 text-black" strokeWidth={2.5} />
              </div>
              <span className="text-base font-extrabold text-white">De Vadercoach</span>
              <div className="grid grid-cols-4 gap-1.5 px-4 mt-2">
                {SKILLS.map((s) => (
                  <div key={s.name} className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ backgroundColor: s.color + '20' }}>
                    <s.icon className="h-3.5 w-3.5" style={{ color: s.color }} />
                  </div>
                ))}
              </div>
              <span className="text-xs text-gray-500 mt-2">App preview</span>
            </div>
          </div>
        </div>
      </section>

      {/* 8 Vaardigheden */}
      <section className="border-t" style={{ borderColor: 'var(--border)' }}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <h2 className="text-2xl font-extrabold mb-3 text-center" style={{ color: 'var(--text)' }}>
            8 vaardigheden, elk met eigen trainingen
          </h2>
          <p className="text-base text-center mb-10 max-w-lg mx-auto" style={{ color: 'var(--text2)' }}>
            De app bevat korte, interactieve trainingen per vaardigheid. Van theorie tot praktijk in 2-10 minuten.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {SKILLS.map((skill) => (
              <div
                key={skill.name}
                className="rounded-2xl border p-5"
                style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}
              >
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-xl mb-3"
                  style={{ backgroundColor: skill.color + '18' }}
                >
                  <skill.icon className="h-5 w-5" style={{ color: skill.color }} />
                </div>
                <h3 className="text-sm font-bold mb-1" style={{ color: skill.color }}>{skill.name}</h3>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--text2)' }}>{skill.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features grid */}
      <section className="border-t" style={{ borderColor: 'var(--border)' }}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <h2 className="text-2xl font-extrabold mb-8 text-center" style={{ color: 'var(--text)' }}>
            Wat zit er in de app?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {APP_FEATURES.map((f) => (
              <div
                key={f.title}
                className="rounded-2xl border p-5"
                style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl mb-3 bg-amber-500/10">
                  <f.icon className="h-5 w-5 text-amber-400" />
                </div>
                <h3 className="text-sm font-bold mb-1" style={{ color: 'var(--text)' }}>{f.title}</h3>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--text2)' }}>{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
