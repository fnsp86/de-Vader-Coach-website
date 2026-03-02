'use client';

import { useState, useEffect } from 'react';
import { Heart, Eye, Waves, Shield, Sprout, RefreshCw, Handshake, Brain } from 'lucide-react';

const ICON_MAP: Record<string, typeof Heart> = {
  Aanwezigheid: Eye,
  Emotiecoaching: Heart,
  Zelfregulatie: Waves,
  Grenzen: Shield,
  Autonomie: Sprout,
  Herstel: RefreshCw,
  Verbinding: Handshake,
  Reflectie: Brain,
};

const SKILL_COLORS: Record<string, string> = {
  Aanwezigheid: '#667eea',
  Emotiecoaching: '#EF4444',
  Zelfregulatie: '#34D399',
  Grenzen: '#FBBF24',
  Autonomie: '#A78BFA',
  Herstel: '#FB923C',
  Verbinding: '#60A5FA',
  Reflectie: '#C084FC',
};

interface DailyQuoteData {
  text: string;
  skill: string;
}

const DAILY_QUOTES: DailyQuoteData[] = [
  // Reflectievragen uit de Experience
  { text: 'Wat is het eerste dat je doet als je thuiskomt -en wat zou je kind willen dat je deed?', skill: 'Aanwezigheid' },
  { text: 'Wanneer heb jij voor het laatst iets gevoeld dat je niet goed kon uitleggen?', skill: 'Emotiecoaching' },
  { text: 'Wat is het laatste moment waarop je voelde dat je ontplofte -en wat had je het liefst anders gedaan?', skill: 'Zelfregulatie' },
  { text: 'Bij welk moment zeg jij het vaakst "nog één keer" -en wat zou er gebeuren als je dat niet meer deed?', skill: 'Grenzen' },
  { text: 'Bij welke dagelijkse handeling neem jij standaard over, terwijl je kind het eigenlijk zelf zou kunnen?', skill: 'Autonomie' },
  { text: 'Wanneer heb jij voor het laatst iets kapotgemaakt in het contact met je kind dat je niet hebt gerepareerd?', skill: 'Herstel' },
  { text: 'Hoe vaak neem je de stress van buiten mee naar binnen -en merkt je kind dat?', skill: 'Zelfregulatie' },
  { text: 'Hoe klinkt jouw stem als je een grens stelt -en zou je kind dat omschrijven als veilig?', skill: 'Grenzen' },
  { text: 'Kun jij er zijn voor de emoties van je kind zonder ze te willen repareren?', skill: 'Emotiecoaching' },
  { text: 'Hoe voelde het om toe te kijken zonder in te grijpen? Wat zag je bij je kind?', skill: 'Autonomie' },
  // Inspirerende vader-uitspraken
  { text: 'Je kind onthoudt niet wat je zei. Het onthoudt hoe het zich voelde als jij erbij was.', skill: 'Aanwezigheid' },
  { text: 'De beste vaders zijn niet degenen die nooit fouten maken. Het zijn degenen die het herstellen.', skill: 'Herstel' },
  { text: 'Kalm blijven is geen zwakte. Het is de moeilijkste vorm van kracht die een vader kan tonen.', skill: 'Zelfregulatie' },
  { text: 'Een grens stellen met liefde is een cadeautje voor later.', skill: 'Grenzen' },
  { text: 'Je hoeft je kind niet te repareren. Soms is er zijn al genoeg.', skill: 'Emotiecoaching' },
  { text: 'Loslaten is niet opgeven. Het is vertrouwen dat je kind meer kan dan je denkt.', skill: 'Autonomie' },
  { text: 'De mooiste gesprekken met je tiener beginnen als jij stopt met praten.', skill: 'Verbinding' },
  { text: 'Jezelf begrijpen is de eerste stap naar je kind begrijpen.', skill: 'Reflectie' },
  { text: 'Vijf minuten echt aandacht is meer waard dan een uur op de bank met je telefoon.', skill: 'Aanwezigheid' },
  { text: 'Het is oké om te zeggen: "Ik weet het even niet. Geef me een minuut."', skill: 'Zelfregulatie' },
  { text: 'Je kind leert niet van wat je zegt over emoties. Het leert van hoe jij met de jouwe omgaat.', skill: 'Emotiecoaching' },
  { text: '"Nee" zeggen tegen je kind is soms "ja" zeggen tegen zijn toekomst.', skill: 'Grenzen' },
  { text: 'De moed om sorry te zeggen tegen je kind is de grootste les die je kunt geven.', skill: 'Herstel' },
  { text: 'Als je kind zegt "ik kan het zelf" -laat het. Dat moment is goud.', skill: 'Autonomie' },
  { text: 'Verbinding is geen activiteit. Het is een houding.', skill: 'Verbinding' },
  { text: 'De vader die je wilt zijn zit al in je. Hij heeft alleen oefening nodig.', skill: 'Reflectie' },
  { text: 'Thuiskomen is elke dag een nieuwe kans om te laten zien: jij bent het belangrijkste.', skill: 'Aanwezigheid' },
  { text: 'Schreeuwen stopt gedrag. Verbinding verandert het.', skill: 'Verbinding' },
  { text: 'Je kind hoeft niet te begrijpen waarom de grens er is. Het moet voelen dat jij erin gelooft.', skill: 'Grenzen' },
  { text: 'Elke dag is een nieuw begin. Gisteren telt niet meer. Vandaag wel.', skill: 'Herstel' },
];

function getDayOfYear(): number {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now.getTime() - start.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

export default function DailyQuote() {
  const [quote, setQuote] = useState<DailyQuoteData | null>(null);

  useEffect(() => {
    const dayIndex = getDayOfYear() % DAILY_QUOTES.length;
    setQuote(DAILY_QUOTES[dayIndex]);
  }, []);

  if (!quote) return null;

  const color = SKILL_COLORS[quote.skill] || '#F59E0B';
  const Icon = ICON_MAP[quote.skill] || Heart;

  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="relative mx-auto max-w-2xl text-center">
          {/* Label */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <div
              className="flex h-7 w-7 items-center justify-center rounded-lg"
              style={{ backgroundColor: color + '18' }}
            >
              <Icon className="h-3.5 w-3.5" style={{ color }} />
            </div>
            <span className="text-xs font-bold tracking-wider uppercase" style={{ color }}>
              {quote.skill}
            </span>
          </div>

          {/* Quote */}
          <blockquote>
            <p
              className="text-xl sm:text-2xl font-semibold leading-relaxed"
              style={{ color: 'var(--text)' }}
            >
              <span className="font-serif text-3xl sm:text-4xl" style={{ color: color + '60' }}>&ldquo;</span>
              {quote.text}
              <span className="font-serif text-3xl sm:text-4xl" style={{ color: color + '60' }}>&rdquo;</span>
            </p>
          </blockquote>

          {/* Subtle label */}
          <p className="mt-5 text-[11px] font-semibold tracking-wider uppercase" style={{ color: 'var(--text3)' }}>
            Quote van de dag
          </p>
        </div>
      </div>
    </section>
  );
}
