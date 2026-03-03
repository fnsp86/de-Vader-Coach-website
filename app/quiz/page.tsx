'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowLeft, CheckCircle, Download, Loader2, RotateCcw } from 'lucide-react';
import { SKILL_COLORS } from '@/lib/courses';
import { getAllCourses } from '@/lib/courses';

/* ── Quiz data ── */

interface QuizOption {
  text: string;
  skills: string[]; // skills that get +1 point
}

interface QuizQuestion {
  question: string;
  options: QuizOption[];
}

const QUESTIONS: QuizQuestion[] = [
  {
    question: 'Je kind is boos en gooit speelgoed door de kamer. Wat doe je eerst?',
    options: [
      { text: 'Ik ga op ooghoogte zitten en benoem wat ik zie: "Ik zie dat je boos bent"', skills: ['Emotiecoaching'] },
      { text: 'Ik zeg duidelijk dat gooien niet mag en geef een alternatief', skills: ['Grenzen'] },
      { text: 'Ik haal even diep adem om zelf kalm te blijven voordat ik reageer', skills: ['Zelfregulatie'] },
      { text: 'Ik leg mijn telefoon weg en ga er helemaal voor zitten', skills: ['Aanwezigheid'] },
    ],
  },
  {
    question: 'Na een lange werkdag wil je kind dat je meespeelt. Hoe reageer je?',
    options: [
      { text: 'Ik zet alles opzij en speel 15 minuten met volle aandacht mee', skills: ['Aanwezigheid'] },
      { text: 'Ik vraag: "Wat wil je spelen?" en volg het kind in zijn spel', skills: ['Verbinding'] },
      { text: 'Ik merk mijn vermoeidheid op en communiceer eerlijk: "Ik heb 10 minuten nodig"', skills: ['Zelfregulatie'] },
      { text: 'Ik laat mijn kind even zelf kiezen hoe we de avond invullen', skills: ['Autonomie'] },
    ],
  },
  {
    question: 'Je hebt per ongeluk te hard gereageerd op je kind. Wat doe je?',
    options: [
      { text: 'Ik zeg later: "Sorry, dat had ik anders moeten doen" en leg uit wat er gebeurde', skills: ['Herstel'] },
      { text: 'Ik vraag hoe mijn kind zich voelde en luister zonder excuses', skills: ['Emotiecoaching'] },
      { text: 'Ik neem me voor om mijn triggers beter te herkennen', skills: ['Reflectie'] },
      { text: 'Ik zoek fysiek contact: een knuffel of hand op de schouder', skills: ['Verbinding'] },
    ],
  },
  {
    question: 'Je kind wil zelf zijn brood smeren maar maakt een rommel. Hoe ga je ermee om?',
    options: [
      { text: 'Ik laat het proberen, ook al duurt het langer en wordt het rommelig', skills: ['Autonomie'] },
      { text: 'Ik help een beetje mee en zeg: "Knap dat je het zelf probeert!"', skills: ['Verbinding'] },
      { text: 'Ik maak er een leuk moment van en geniet van het samen doen', skills: ['Aanwezigheid'] },
      { text: 'Ik spreek af: "Jij smeert, ik ruim op" - duidelijke afspraak', skills: ['Grenzen'] },
    ],
  },
  {
    question: 'Je merkt dat je steeds vaker ongeduldig wordt. Wat doe je?',
    options: [
      { text: 'Ik onderzoek waar mijn ongeduld vandaan komt en schrijf het op', skills: ['Reflectie'] },
      { text: 'Ik oefen dagelijks even met ademhaling of een kort moment stilte', skills: ['Zelfregulatie'] },
      { text: 'Ik praat erover met mijn partner of een vriend', skills: ['Herstel'] },
      { text: 'Ik plan bewust momenten van kwaliteitstijd in mijn agenda', skills: ['Aanwezigheid'] },
    ],
  },
  {
    question: 'Je puber trekt zich steeds meer terug op zijn kamer. Wat is je eerste stap?',
    options: [
      { text: 'Ik respecteer de ruimte maar maak duidelijk: "Ik ben er als je me nodig hebt"', skills: ['Autonomie'] },
      { text: 'Ik zoek laagdrempelige momenten: autorit, wandeling, samen koken', skills: ['Verbinding'] },
      { text: 'Ik stel grenzen aan schermtijd en maak afspraken over gezamenlijke maaltijden', skills: ['Grenzen'] },
      { text: 'Ik denk na over hoe ik zelf was als tiener en wat ik toen nodig had', skills: ['Reflectie'] },
    ],
  },
  {
    question: 'Je kind huilt omdat een vriendje niet meer met hem wil spelen. Wat doe je?',
    options: [
      { text: 'Ik zeg: "Dat doet pijn he, als iemand niet meer met je wil spelen"', skills: ['Emotiecoaching'] },
      { text: 'Ik ga naast hem zitten en laat merken dat ik er ben, zonder meteen oplossingen', skills: ['Aanwezigheid'] },
      { text: 'Ik help hem nadenken over wat hij zelf kan doen', skills: ['Autonomie'] },
      { text: 'Ik deel een eigen ervaring: "Dat had ik vroeger ook weleens"', skills: ['Verbinding'] },
    ],
  },
  {
    question: 'Je voelt je schuldig dat je te weinig tijd hebt voor je kinderen. Hoe ga je daarmee om?',
    options: [
      { text: 'Ik accepteer het gevoel en kijk eerlijk naar wat ik wel kan veranderen', skills: ['Reflectie'] },
      { text: 'Ik focus op kwaliteit: 10 minuten echt aanwezig zijn telt meer dan uren halfom', skills: ['Aanwezigheid'] },
      { text: 'Ik bespreek het met mijn gezin en maak nieuwe afspraken', skills: ['Herstel'] },
      { text: 'Ik reguleer mijn schuldgevoel zodat het me niet verlamt maar motiveert', skills: ['Zelfregulatie'] },
    ],
  },
];

const SKILL_DESCRIPTIONS: Record<string, string> = {
  Emotiecoaching: 'Je hebt een natuurlijk talent om emoties te herkennen en te begeleiden. Je kind voelt zich gezien en begrepen bij jou.',
  Grenzen: 'Je biedt structuur en duidelijkheid. Je kind weet waar het aan toe is, en dat geeft veiligheid.',
  Zelfregulatie: 'Je kunt je eigen emoties goed reguleren. Dat maakt je een stabiele, voorspelbare ouder.',
  Aanwezigheid: 'Je bent er echt als het ertoe doet. Je kind voelt je aandacht en dat versterkt jullie band.',
  Verbinding: 'Je zoekt actief contact en bouwt aan een sterke relatie. Je kind vertrouwt je.',
  Herstel: 'Je durft fouten toe te geven en te herstellen. Dat leert je kind dat relaties tegen een stootje kunnen.',
  Autonomie: 'Je geeft je kind ruimte om te groeien en te ontdekken. Dat bouwt zelfvertrouwen.',
  Reflectie: 'Je denkt bewust na over je rol als vader. Die zelfreflectie maakt je elke dag een beetje beter.',
};

const GROWTH_DESCRIPTIONS: Record<string, string> = {
  Emotiecoaching: 'Leer de emoties van je kind beter herkennen en begeleiden met de Gottman-methode.',
  Grenzen: 'Ontdek hoe je duidelijke grenzen stelt zonder de verbinding te verliezen.',
  Zelfregulatie: 'Leer technieken om kalm te blijven in stressvolle opvoedsituaties.',
  Aanwezigheid: 'Ontdek hoe je in een druk leven toch echt aanwezig kunt zijn voor je kind.',
  Verbinding: 'Versterk de band met je kind door bewuste verbindingsmomenten.',
  Herstel: 'Leer hoe je na een conflict de relatie herstelt en versterkt.',
  Autonomie: 'Vind de balans tussen beschermen en loslaten.',
  Reflectie: 'Ontwikkel een reflectiepraktijk die je helpt groeien als vader.',
};

/* ── Component ── */

export default function QuizPage() {
  const [currentQ, setCurrentQ] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [finished, setFinished] = useState(false);
  const [email, setEmail] = useState('');
  const [sending, setSending] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  function handleAnswer(skills: string[]) {
    const newScores = { ...scores };
    for (const skill of skills) {
      newScores[skill] = (newScores[skill] || 0) + 1;
    }
    setScores(newScores);

    if (currentQ < QUESTIONS.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      setFinished(true);
      // Track quiz completion
      fetch('/api/analytics/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path: '/event/quiz-complete', referrer: '/quiz' }),
      }).catch(() => {});
      (window as any).gtag?.('event', 'quiz_complete', { event_category: 'engagement' });
      (window as any).fbq?.('trackCustom', 'QuizComplete');
    }
  }

  function getTopSkill(): string {
    const entries = Object.entries(scores);
    if (entries.length === 0) return 'Aanwezigheid';
    entries.sort((a, b) => b[1] - a[1]);
    return entries[0][0];
  }

  function getGrowthSkill(): string {
    const allSkills = ['Emotiecoaching', 'Grenzen', 'Zelfregulatie', 'Aanwezigheid', 'Verbinding', 'Herstel', 'Autonomie', 'Reflectie'];
    const withScores = allSkills.map((s) => ({ skill: s, score: scores[s] || 0 }));
    withScores.sort((a, b) => a.score - b.score);
    // Pick lowest that isn't same as top
    const top = getTopSkill();
    return withScores.find((s) => s.skill !== top)?.skill || withScores[0].skill;
  }

  function getRecommendedCourse(skill: string) {
    return getAllCourses().find((c) => c.category === skill);
  }

  async function handleSubscribe(e: FormEvent) {
    e.preventDefault();
    setSending(true);
    try {
      await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
    } catch {}
    localStorage.setItem('vader-coach-email', email);
    setSubscribed(true);
    setSending(false);

    (window as any).gtag?.('event', 'sign_up', { method: 'quiz' });
    (window as any).fbq?.('track', 'Lead', { content_name: 'quiz' });

    fetch('/api/analytics/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ path: '/event/email-signup-quiz', referrer: '/quiz' }),
    }).catch(() => {});
  }

  function restart() {
    setCurrentQ(0);
    setScores({});
    setFinished(false);
  }

  const topSkill = getTopSkill();
  const growthSkill = getGrowthSkill();
  const topColor = SKILL_COLORS[topSkill] || '#F59E0B';
  const growthColor = SKILL_COLORS[growthSkill] || '#F59E0B';
  const course = getRecommendedCourse(growthSkill);

  // ── Result screen ──
  if (finished) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: 'var(--bg)' }}>
        <div className="max-w-2xl mx-auto px-4 py-16 sm:py-24">
          <div className="text-center mb-10">
            <div
              className="inline-flex h-16 w-16 items-center justify-center rounded-full mb-4"
              style={{ backgroundColor: topColor + '20' }}
            >
              <CheckCircle className="h-8 w-8" style={{ color: topColor }} />
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold mb-2" style={{ color: 'var(--text)' }}>
              Je resultaat
            </h1>
            <p className="text-[15px]" style={{ color: 'var(--text2)' }}>
              Op basis van je antwoorden is dit jouw profiel
            </p>
          </div>

          {/* Top skill */}
          <div
            className="rounded-2xl p-6 mb-4 border"
            style={{ backgroundColor: topColor + '08', borderColor: topColor + '25' }}
          >
            <p className="text-sm font-bold mb-1" style={{ color: topColor }}>
              Jouw sterkste vaardigheid
            </p>
            <h2 className="text-xl font-extrabold mb-2" style={{ color: 'var(--text)' }}>
              {topSkill}
            </h2>
            <p className="text-[14px] leading-relaxed" style={{ color: 'var(--text2)' }}>
              {SKILL_DESCRIPTIONS[topSkill]}
            </p>
          </div>

          {/* Growth skill */}
          <div
            className="rounded-2xl p-6 mb-8 border"
            style={{ backgroundColor: growthColor + '08', borderColor: growthColor + '25' }}
          >
            <p className="text-sm font-bold mb-1" style={{ color: growthColor }}>
              Hier kun je groeien
            </p>
            <h2 className="text-xl font-extrabold mb-2" style={{ color: 'var(--text)' }}>
              {growthSkill}
            </h2>
            <p className="text-[14px] leading-relaxed" style={{ color: 'var(--text2)' }}>
              {GROWTH_DESCRIPTIONS[growthSkill]}
            </p>
          </div>

          {/* Course recommendation */}
          {course && (
            <div
              className="rounded-2xl p-6 mb-8 border"
              style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}
            >
              <p className="text-sm font-bold mb-1" style={{ color: 'var(--text3)' }}>
                Aanbevolen cursus
              </p>
              <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--text)' }}>
                {course.title}
              </h3>
              <p className="text-[14px] mb-4" style={{ color: 'var(--text2)' }}>
                {course.description}
              </p>
              <Link
                href={`/cursussen/${course.slug}`}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold text-black transition-transform hover:scale-[0.98]"
                style={{ backgroundColor: course.color }}
              >
                Bekijk cursus <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          )}

          {/* Email capture */}
          {!subscribed ? (
            <div
              className="rounded-2xl p-6 mb-6 border"
              style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}
            >
              <h3 className="text-lg font-bold mb-1" style={{ color: 'var(--text)' }}>
                Gratis vaderschapsgids
              </h3>
              <p className="text-[13px] mb-4" style={{ color: 'var(--text3)' }}>
                Ontvang de gratis snelgids met praktische tips, passend bij jouw profiel.
              </p>
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="je@email.nl"
                  className="flex-1 px-4 py-3 rounded-xl border text-sm outline-none transition-colors focus:border-amber-500"
                  style={{ backgroundColor: 'var(--bg)', borderColor: 'var(--border)', color: 'var(--text)' }}
                />
                <button
                  type="submit"
                  disabled={sending}
                  className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold text-black transition-transform hover:scale-[0.98] disabled:opacity-70"
                  style={{ backgroundColor: '#F59E0B' }}
                >
                  {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
                </button>
              </form>
            </div>
          ) : (
            <div className="rounded-2xl p-6 mb-6 border text-center" style={{ backgroundColor: '#34D39910', borderColor: '#34D39930' }}>
              <CheckCircle className="h-6 w-6 mx-auto mb-2" style={{ color: '#34D399' }} />
              <p className="text-sm font-bold" style={{ color: '#34D399' }}>Check je inbox voor de gids!</p>
            </div>
          )}

          <div className="flex items-center justify-center gap-4">
            <button
              onClick={restart}
              className="flex items-center gap-2 text-sm font-medium transition-opacity hover:opacity-80"
              style={{ color: 'var(--text3)' }}
            >
              <RotateCcw className="h-4 w-4" /> Opnieuw
            </button>
            <Link
              href="/"
              className="flex items-center gap-2 text-sm font-medium transition-opacity hover:opacity-80"
              style={{ color: 'var(--text3)' }}
            >
              Terug naar home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ── Question screen ──
  const q = QUESTIONS[currentQ];
  const progress = ((currentQ) / QUESTIONS.length) * 100;

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg)' }}>
      <div className="max-w-2xl mx-auto px-4 py-16 sm:py-24">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-bold" style={{ color: 'var(--text3)' }}>
              Vraag {currentQ + 1} van {QUESTIONS.length}
            </p>
            {currentQ > 0 && (
              <button
                onClick={() => setCurrentQ(currentQ - 1)}
                className="flex items-center gap-1 text-sm transition-opacity hover:opacity-80"
                style={{ color: 'var(--text3)' }}
              >
                <ArrowLeft className="h-4 w-4" /> Vorige
              </button>
            )}
          </div>
          {/* Progress bar */}
          <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--border)' }}>
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: `${progress}%`, backgroundColor: '#F59E0B' }}
            />
          </div>
        </div>

        {/* Question */}
        <h2 className="text-xl sm:text-2xl font-extrabold mb-8 leading-tight" style={{ color: 'var(--text)' }}>
          {q.question}
        </h2>

        {/* Options */}
        <div className="space-y-3">
          {q.options.map((option, i) => (
            <button
              key={i}
              onClick={() => handleAnswer(option.skills)}
              className="w-full text-left p-5 rounded-2xl border transition-all hover:scale-[0.99] cursor-pointer"
              style={{
                backgroundColor: 'var(--surface)',
                borderColor: 'var(--border)',
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.borderColor = '#F59E0B50';
                (e.target as HTMLElement).style.backgroundColor = 'var(--surface2)';
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.borderColor = 'var(--border)';
                (e.target as HTMLElement).style.backgroundColor = 'var(--surface)';
              }}
            >
              <span className="text-[14px] sm:text-[15px] leading-relaxed font-medium" style={{ color: 'var(--text)' }}>
                {option.text}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
