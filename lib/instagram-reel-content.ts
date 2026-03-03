import type { Template, SlideConfig } from './instagram-captions';

export interface ReelSequence {
  id: string;
  title: string;
  category: string;
  skill: string;
  slides: SlideConfig[];
  caption: string;
}

// Helper to build a slide with defaults
function s(
  template: Template,
  text: string,
  skill: string,
  color: string,
  opts: Partial<SlideConfig> = {},
): SlideConfig {
  return { template, text, color, skill, subtitle: '', number: '', items: [], ...opts };
}

const C = {
  emotie: '#EF4444',
  grenzen: '#FBBF24',
  aanwezig: '#667eea',
  zelfreg: '#34D399',
  verbind: '#60A5FA',
  herstel: '#FB923C',
  autonomie: '#A78BFA',
  reflectie: '#C084FC',
} as const;

export const REEL_LIBRARY: ReelSequence[] = [
  // ════════════════════════════════════════════════════════════════════
  // 1. Emotiecoaching - 5 stappen bij een driftbui
  // ════════════════════════════════════════════════════════════════════
  {
    id: 'reel-emotie-driftbui',
    title: '5 stappen bij een driftbui',
    category: 'tips',
    skill: 'Emotiecoaching',
    slides: [
      s('quote', '5 stappen bij een driftbui van je kind', 'Emotiecoaching', C.emotie),
      s('tip', 'Blijf zelf kalm. Jouw rust is het anker.', 'Emotiecoaching', C.emotie, { number: '1' }),
      s('tip', 'Benoem wat je ziet: "Ik zie dat je boos bent."', 'Emotiecoaching', C.emotie, { number: '2' }),
      s('tip', 'Ga op ooghoogte zitten en bied nabijheid.', 'Emotiecoaching', C.emotie, { number: '3' }),
      s('tip', 'Wacht tot de storm voorbij is. Praat daarna.', 'Emotiecoaching', C.emotie, { number: '4' }),
      s('tip', 'Bespreek samen: "Wat had je nodig op dat moment?"', 'Emotiecoaching', C.emotie, { number: '5' }),
      s('cta', 'Meer opvoedtips?', 'Emotiecoaching', C.emotie, { subtitle: 'Volg @devadercoach voor dagelijkse inzichten' }),
    ],
    caption: `Een driftbui is geen aanval op jou. Het is een kind dat overspoeld wordt door emoties die het nog niet kan reguleren.

Deze 5 stappen helpen je om verbinding te houden, ook in het heftigste moment.

Sla op voor de volgende keer dat het nodig is.

#emotiecoaching #driftbui #opvoedtips #vaderschap #devadercoach`,
  },

  // ════════════════════════════════════════════════════════════════════
  // 2. Aanwezigheid - De kracht van 10 minuten
  // ════════════════════════════════════════════════════════════════════
  {
    id: 'reel-aanwezig-10min',
    title: 'De kracht van 10 minuten',
    category: 'tips',
    skill: 'Aanwezigheid',
    slides: [
      s('quote', 'De kracht van 10 minuten per dag', 'Aanwezigheid', C.aanwezig),
      s('stat', '10', 'Aanwezigheid', C.aanwezig, { subtitle: 'minuten onverdeelde aandacht per dag is genoeg om verschil te maken' }),
      s('tip', 'Telefoon weg. Geen multitasken. Alleen jij en je kind.', 'Aanwezigheid', C.aanwezig, { number: '1' }),
      s('tip', 'Laat je kind bepalen wat jullie doen. Volg het spel.', 'Aanwezigheid', C.aanwezig, { number: '2' }),
      s('tip', 'Reageer op wat je kind laat zien. "Wow, vertel eens meer!"', 'Aanwezigheid', C.aanwezig, { number: '3' }),
      s('cta', 'Start vandaag met 10 minuten', 'Aanwezigheid', C.aanwezig, { subtitle: 'Link in bio voor de gratis Vadercoach gids' }),
    ],
    caption: `Je hoeft geen hele dag vrij te nemen. 10 minuten echte aandacht is krachtiger dan een uur halfbakken aanwezigheid.

Probeer het vandaag. Je kind voelt het verschil direct.

#aanwezigheid #kwaliteitstijd #vaderschap #opvoeden #devadercoach`,
  },

  // ════════════════════════════════════════════════════════════════════
  // 3. Grenzen stellen - Vergelijking
  // ════════════════════════════════════════════════════════════════════
  {
    id: 'reel-grenzen-vergelijk',
    title: 'Grenzen stellen zonder schreeuwen',
    category: 'vergelijking',
    skill: 'Grenzen',
    slides: [
      s('quote', 'Grenzen stellen zonder te schreeuwen', 'Grenzen', C.grenzen),
      s('comparison', '"Als je niet luistert, dan..."', 'Grenzen', C.grenzen, { subtitle: '"Ik merk dat het lastig is. De regel is..."' }),
      s('comparison', '"Omdat ik het zeg!"', 'Grenzen', C.grenzen, { subtitle: '"De reden is... en ik snap dat dat vervelend is."' }),
      s('comparison', '"Ga naar je kamer!"', 'Grenzen', C.grenzen, { subtitle: '"We nemen even een pauze. Ik ben hier als je klaar bent."' }),
      s('comparison', '"Jij luistert nooit!"', 'Grenzen', C.grenzen, { subtitle: '"Het lukt nu niet om af te spreken. We proberen het straks."' }),
      s('cta', 'Wil je hier beter in worden?', 'Grenzen', C.grenzen, { subtitle: 'Bekijk de Grenzen-cursus via de link in bio' }),
    ],
    caption: `Grenzen stellen hoeft niet hard te zijn om duidelijk te zijn.

Links: wat de meeste ouders doen onder druk.
Rechts: wat beter werkt voor de lange termijn.

Herkenbaar? Sla op en deel met een vader die dit nodig heeft.

#grenzenstellen #opvoeden #bewustopvoeden #vaderschap #devadercoach`,
  },

  // ════════════════════════════════════════════════════════════════════
  // 4. Zelfregulatie - Wat te doen als JIJ boos wordt
  // ════════════════════════════════════════════════════════════════════
  {
    id: 'reel-zelfreg-boos',
    title: 'Wat te doen als jij boos wordt',
    category: 'tips',
    skill: 'Zelfregulatie',
    slides: [
      s('quote', 'Wat doe je als JIJ boos wordt op je kind?', 'Zelfregulatie', C.zelfreg),
      s('didyouknow', 'Je kind kopieert niet wat je zegt, maar wat je doet.', 'Zelfregulatie', C.zelfreg),
      s('tip', 'Herken het moment: spanning in je kaak, schouders, borst.', 'Zelfregulatie', C.zelfreg, { number: '1' }),
      s('tip', 'Zeg hardop: "Ik merk dat ik gefrustreerd raak."', 'Zelfregulatie', C.zelfreg, { number: '2' }),
      s('tip', 'Neem 3 diepe ademhalingen voor je reageert.', 'Zelfregulatie', C.zelfreg, { number: '3' }),
      s('tip', 'Het is oké om te zeggen: "Ik heb even een pauze nodig."', 'Zelfregulatie', C.zelfreg, { number: '4' }),
      s('cta', 'Zelfregulatie is een vaardigheid', 'Zelfregulatie', C.zelfreg, { subtitle: 'Leer meer via de link in bio' }),
    ],
    caption: `Je kind leert omgaan met emoties door jou te zien omgaan met emoties.

Dat betekent niet dat je nooit boos mag worden. Het betekent dat je laat zien hoe je ermee omgaat.

Dat is het krachtigste voorbeeld dat je kunt geven.

#zelfregulatie #boosheid #opvoeden #vaderschap #devadercoach`,
  },

  // ════════════════════════════════════════════════════════════════════
  // 5. Verbinding - 7 zinnen die je kind nodig heeft
  // ════════════════════════════════════════════════════════════════════
  {
    id: 'reel-verbind-zinnen',
    title: '7 zinnen die je kind nodig heeft',
    category: 'tips',
    skill: 'Verbinding',
    slides: [
      s('quote', '7 zinnen die elk kind nodig heeft van zijn vader', 'Verbinding', C.verbind),
      s('tip', '"Ik ben trots op je."', 'Verbinding', C.verbind, { number: '1' }),
      s('tip', '"Ik vind het leuk om bij je te zijn."', 'Verbinding', C.verbind, { number: '2' }),
      s('tip', '"Je mag fouten maken, daar leer je van."', 'Verbinding', C.verbind, { number: '3' }),
      s('tip', '"Vertel me er meer over."', 'Verbinding', C.verbind, { number: '4' }),
      s('tip', '"Ik hou van je, ook als je boos bent."', 'Verbinding', C.verbind, { number: '5' }),
      s('tip', '"Sorry, dat had ik anders moeten doen."', 'Verbinding', C.verbind, { number: '6' }),
      s('tip', '"Ik geloof in je."', 'Verbinding', C.verbind, { number: '7' }),
      s('cta', 'Welke zeg jij het vaakst?', 'Verbinding', C.verbind, { subtitle: 'Laat het weten in de comments' }),
    ],
    caption: `Kleine zinnen, groot effect.

Welke van deze zinnen zeg jij het vaakst tegen je kind? En welke zou je vaker willen zeggen?

Sla op en stuur door naar een vader die dit moet lezen.

#verbinding #vaderschap #opvoedtips #bewustopvoeden #devadercoach`,
  },

  // ════════════════════════════════════════════════════════════════════
  // 6. Herstel - Na een ruzie met je kind
  // ════════════════════════════════════════════════════════════════════
  {
    id: 'reel-herstel-ruzie',
    title: 'Na een ruzie met je kind',
    category: 'tips',
    skill: 'Herstel',
    slides: [
      s('quote', 'Je hebt geschreeuwd. En nu?', 'Herstel', C.herstel),
      s('didyouknow', 'Het gaat niet om perfectie. Het gaat om herstel.', 'Herstel', C.herstel),
      s('tip', 'Kalmeer eerst jezelf. Herstel begint bij jou.', 'Herstel', C.herstel, { number: '1' }),
      s('tip', 'Ga naar je kind toe en erken wat er gebeurde.', 'Herstel', C.herstel, { number: '2' }),
      s('tip', '"Het spijt me dat ik schreeuwde. Dat was niet oké."', 'Herstel', C.herstel, { number: '3' }),
      s('tip', 'Leg uit wat je anders had willen doen.', 'Herstel', C.herstel, { number: '4' }),
      s('tip', 'Vraag: "Hoe voelde dat voor jou?"', 'Herstel', C.herstel, { number: '5' }),
      s('cta', 'Herstel maakt de band sterker', 'Herstel', C.herstel, { subtitle: 'Lees meer via de link in bio' }),
    ],
    caption: `Je hebt geschreeuwd. Of je was te streng. Of je was er niet echt.

Het maakt je geen slechte vader. Het maakt je menselijk.

Wat je daarna doet, dat telt. Herstel is de krachtigste les die je je kind kunt geven.

#herstel #foutenmaken #vaderschap #opvoeden #devadercoach`,
  },

  // ════════════════════════════════════════════════════════════════════
  // 7. Autonomie - Loslaten per leeftijd
  // ════════════════════════════════════════════════════════════════════
  {
    id: 'reel-autonomie-leeftijd',
    title: 'Loslaten per leeftijd',
    category: 'tips',
    skill: 'Autonomie',
    slides: [
      s('quote', 'Wat kan je kind zelf per leeftijd?', 'Autonomie', C.autonomie),
      s('tip', '3 jaar: zelf schoenen kiezen en aankleden', 'Autonomie', C.autonomie, { number: '3+' }),
      s('tip', '5 jaar: kleine taakjes in huis, eigen boterham smeren', 'Autonomie', C.autonomie, { number: '5+' }),
      s('tip', '7 jaar: zelf naar school fietsen, huiswerk plannen', 'Autonomie', C.autonomie, { number: '7+' }),
      s('tip', '10 jaar: eigen keuzes in hobby en vrije tijd', 'Autonomie', C.autonomie, { number: '10+' }),
      s('tip', '13 jaar: eigen geld beheren, sociale afspraken', 'Autonomie', C.autonomie, { number: '13+' }),
      s('cta', 'Loslaten is liefde', 'Autonomie', C.autonomie, { subtitle: 'Meer over autonomie via de link in bio' }),
    ],
    caption: `Loslaten voelt onnatuurlijk. Maar elk stukje zelfstandigheid dat je kind krijgt, bouwt vertrouwen.

Vertrouwen in zichzelf. En vertrouwen in jou, omdat jij gelooft dat het kan.

Waar sta jij op deze lijst?

#autonomie #loslaten #zelfstandigheid #vaderschap #devadercoach`,
  },

  // ════════════════════════════════════════════════════════════════════
  // 8. Emotiecoaching - Vergelijking
  // ════════════════════════════════════════════════════════════════════
  {
    id: 'reel-emotie-vergelijk',
    title: 'Wat je zegt vs. wat werkt',
    category: 'vergelijking',
    skill: 'Emotiecoaching',
    slides: [
      s('quote', 'Wat je zegt vs. wat echt werkt', 'Emotiecoaching', C.emotie),
      s('comparison', '"Stel je niet zo aan"', 'Emotiecoaching', C.emotie, { subtitle: '"Ik zie dat dit moeilijk is voor je"' }),
      s('comparison', '"Grote jongens huilen niet"', 'Emotiecoaching', C.emotie, { subtitle: '"Het is oké om verdrietig te zijn"' }),
      s('comparison', '"Hou op met huilen"', 'Emotiecoaching', C.emotie, { subtitle: '"Ik ben hier. Huil maar even uit"' }),
      s('comparison', '"Er is toch niks aan de hand?"', 'Emotiecoaching', C.emotie, { subtitle: '"Wat is er gebeurd? Vertel maar"' }),
      s('cta', 'Woorden vormen je kind', 'Emotiecoaching', C.emotie, { subtitle: 'Volg @devadercoach voor meer' }),
    ],
    caption: `De woorden die je als vader kiest, vormen hoe je kind naar zichzelf kijkt.

Links: goedbedoeld, maar het sluit emoties af.
Rechts: het opent de deur naar verbinding.

Welke herken je? Tag een vader die dit moet zien.

#emotiecoaching #opvoeden #gevoelens #vaderschap #devadercoach`,
  },

  // ════════════════════════════════════════════════════════════════════
  // 9. Reflectie - 5 vragen voor elke avond
  // ════════════════════════════════════════════════════════════════════
  {
    id: 'reel-reflectie-avond',
    title: '5 vragen voor elke avond',
    category: 'tips',
    skill: 'Reflectie',
    slides: [
      s('quote', '5 vragen voor jezelf als vader, elke avond', 'Reflectie', C.reflectie),
      s('tip', 'Heb ik vandaag echt naar mijn kind geluisterd?', 'Reflectie', C.reflectie, { number: '1' }),
      s('tip', 'Was ik geduldig op het moment dat het moeilijk werd?', 'Reflectie', C.reflectie, { number: '2' }),
      s('tip', 'Heb ik mijn kind laten voelen dat het belangrijk is?', 'Reflectie', C.reflectie, { number: '3' }),
      s('tip', 'Waar kan ik morgen iets anders doen?', 'Reflectie', C.reflectie, { number: '4' }),
      s('tip', 'Waar ben ik trots op vandaag als vader?', 'Reflectie', C.reflectie, { number: '5' }),
      s('cta', 'Groei begint bij bewustzijn', 'Reflectie', C.reflectie, { subtitle: 'Start de 22-daagse Experience via de link in bio' }),
    ],
    caption: `5 minuten reflectie voor het slapengaan.

Geen oordeel, geen schuldgevoel. Alleen eerlijk kijken naar je dag als vader.

Dit kleine ritueel verandert alles. Probeer het een week lang.

#reflectie #vaderschap #bewustopvoeden #zelfontwikkeling #devadercoach`,
  },

  // ════════════════════════════════════════════════════════════════════
  // 10. Grenzen - Waarom kinderen grenzen testen
  // ════════════════════════════════════════════════════════════════════
  {
    id: 'reel-grenzen-testen',
    title: 'Waarom je kind grenzen test',
    category: 'uitleg',
    skill: 'Grenzen',
    slides: [
      s('quote', 'Waarom je kind steeds je grenzen test', 'Grenzen', C.grenzen),
      s('didyouknow', 'Grenzen testen is geen ongehoorzaamheid. Het is ontwikkeling.', 'Grenzen', C.grenzen),
      s('tip', 'Je kind checkt: "Is deze grens er nog? Ben jij er nog?"', 'Grenzen', C.grenzen, { number: '1' }),
      s('tip', 'Consistent zijn geeft veiligheid, ook als het verzet oproept.', 'Grenzen', C.grenzen, { number: '2' }),
      s('tip', 'Erken de frustratie: "Ik snap dat je het vervelend vindt."', 'Grenzen', C.grenzen, { number: '3' }),
      s('tip', 'Houd vast aan de grens, maar blijf warm in je toon.', 'Grenzen', C.grenzen, { number: '4' }),
      s('cta', 'Grenzen en liefde gaan samen', 'Grenzen', C.grenzen, { subtitle: 'Meer leren? Link in bio' }),
    ],
    caption: `Je kind is niet stout als het je grenzen test. Het is bezig met de belangrijkste vraag: "Is het hier veilig?"

Elke keer dat jij standvastig en warm blijft, is het antwoord: ja.

#grenzenstellen #opvoeden #vaderschap #bewustopvoeden #devadercoach`,
  },

  // ════════════════════════════════════════════════════════════════════
  // 11. Aanwezigheid - Vergelijking druk vs present
  // ════════════════════════════════════════════════════════════════════
  {
    id: 'reel-aanwezig-vergelijk',
    title: 'Druk zijn vs. er zijn',
    category: 'vergelijking',
    skill: 'Aanwezigheid',
    slides: [
      s('quote', 'Druk zijn vs. aanwezig zijn', 'Aanwezigheid', C.aanwezig),
      s('comparison', 'Telefoon checken bij het eten', 'Aanwezigheid', C.aanwezig, { subtitle: 'Vragen: "Wat was het grappigste vandaag?"' }),
      s('comparison', '"Zo meteen, ik ben even bezig"', 'Aanwezigheid', C.aanwezig, { subtitle: '"Ik maak dit af en dan ben ik er helemaal"' }),
      s('comparison', 'Moe op de bank, kind speelt alleen', 'Aanwezigheid', C.aanwezig, { subtitle: '10 minuten samen op de grond zitten' }),
      s('comparison', 'Weekend vol activiteiten plannen', 'Aanwezigheid', C.aanwezig, { subtitle: 'Een middag met niks gepland, gewoon samen' }),
      s('cta', 'Aanwezigheid is een keuze', 'Aanwezigheid', C.aanwezig, { subtitle: 'Meer tips via @devadercoach' }),
    ],
    caption: `Het gaat niet om hoeveel tijd je hebt. Het gaat om wat je doet met de tijd die er is.

Herkenbaar? Welke kant herken je het meest bij jezelf?

Deel met een vader die dit nodig heeft.

#aanwezigheid #kwaliteitstijd #vaderschap #bewustopvoeden #devadercoach`,
  },

  // ════════════════════════════════════════════════════════════════════
  // 12. Zelfregulatie - Ademhaling oefening
  // ════════════════════════════════════════════════════════════════════
  {
    id: 'reel-zelfreg-ademhaling',
    title: 'De 4-7-8 ademhaling voor vaders',
    category: 'tips',
    skill: 'Zelfregulatie',
    slides: [
      s('quote', 'De 4-7-8 ademhaling voor vaders', 'Zelfregulatie', C.zelfreg),
      s('didyouknow', 'Je zenuwstelsel kalmeert binnen 90 seconden met de juiste ademhaling.', 'Zelfregulatie', C.zelfreg),
      s('tip', 'Adem 4 seconden in door je neus.', 'Zelfregulatie', C.zelfreg, { number: '4' }),
      s('tip', 'Houd 7 seconden vast.', 'Zelfregulatie', C.zelfreg, { number: '7' }),
      s('tip', 'Adem 8 seconden uit door je mond.', 'Zelfregulatie', C.zelfreg, { number: '8' }),
      s('tip', 'Herhaal 3 keer. Je voelt het verschil direct.', 'Zelfregulatie', C.zelfreg, { number: '3x' }),
      s('cta', 'Bewaar voor de volgende keer', 'Zelfregulatie', C.zelfreg, { subtitle: 'Meer technieken via de link in bio' }),
    ],
    caption: `De snelste manier om kalm te worden als vader? Ademhalen.

Niet "even diep inademen en tellen tot tien". Maar deze specifieke techniek die je zenuwstelsel daadwerkelijk reset.

Probeer het nu. Serieus, leg je telefoon neer en doe het.

#zelfregulatie #ademhaling #kalmte #vaderschap #devadercoach`,
  },

  // ════════════════════════════════════════════════════════════════════
  // 13. Verbinding - Pubers en tieners
  // ════════════════════════════════════════════════════════════════════
  {
    id: 'reel-verbind-puber',
    title: 'Verbinding met je puber',
    category: 'tips',
    skill: 'Verbinding',
    slides: [
      s('quote', 'Je puber trekt zich terug. Wat nu?', 'Verbinding', C.verbind),
      s('didyouknow', 'Terugtrekken is normaal bij pubers. Het betekent niet dat ze je niet nodig hebben.', 'Verbinding', C.verbind),
      s('tip', 'Forceer geen gesprekken. Wees beschikbaar.', 'Verbinding', C.verbind, { number: '1' }),
      s('tip', 'Deel activiteiten: samen koken, autorit, wandelen.', 'Verbinding', C.verbind, { number: '2' }),
      s('tip', 'Praat naast elkaar, niet tegenover elkaar.', 'Verbinding', C.verbind, { number: '3' }),
      s('tip', 'Respecteer hun privacy. Vertrouwen is de basis.', 'Verbinding', C.verbind, { number: '4' }),
      s('tip', 'Laat merken dat je er bent, zonder te pushen.', 'Verbinding', C.verbind, { number: '5' }),
      s('cta', 'Verbinding begint bij vertrouwen', 'Verbinding', C.verbind, { subtitle: 'Meer lezen? Link in bio' }),
    ],
    caption: `Je puber sluit de kamerdeur. Geeft korte antwoorden. Wil niet meer knuffelen.

Herkenbaar? Het is geen afwijzing. Het is groei.

Jouw taak: er zijn zonder te pushen. Beschikbaar zijn zonder te claimen.

#puber #tiener #verbinding #vaderschap #devadercoach`,
  },

  // ════════════════════════════════════════════════════════════════════
  // 14. Herstel - Vergelijking schuldgevoel
  // ════════════════════════════════════════════════════════════════════
  {
    id: 'reel-herstel-vergelijk',
    title: 'Schuldgevoel vs. verantwoordelijkheid',
    category: 'vergelijking',
    skill: 'Herstel',
    slides: [
      s('quote', 'Schuldgevoel vs. verantwoordelijkheid', 'Herstel', C.herstel),
      s('comparison', '"Ik ben een slechte vader"', 'Herstel', C.herstel, { subtitle: '"Ik had dat anders kunnen aanpakken"' }),
      s('comparison', 'Piekeren over wat je fout deed', 'Herstel', C.herstel, { subtitle: 'Nadenken over wat je morgen anders doet' }),
      s('comparison', 'Compenseren met cadeaus of toegeven', 'Herstel', C.herstel, { subtitle: 'Een eerlijk gesprek en oprecht sorry zeggen' }),
      s('comparison', 'Vermijden en doen alsof het niet gebeurde', 'Herstel', C.herstel, { subtitle: 'Het benoemen en er samen van leren' }),
      s('cta', 'Fouten maken mag. Niet herstellen niet.', 'Herstel', C.herstel, { subtitle: 'Meer over herstel via de link in bio' }),
    ],
    caption: `Schuldgevoel houdt je vast in het verleden.
Verantwoordelijkheid brengt je naar actie.

Het verschil? Schuldgevoel gaat over jou. Verantwoordelijkheid gaat over je kind.

Kies elke dag opnieuw voor actie.

#herstel #schuldgevoel #opvoeden #vaderschap #devadercoach`,
  },

  // ════════════════════════════════════════════════════════════════════
  // 15. Emotiecoaching - Emoties benoemen
  // ════════════════════════════════════════════════════════════════════
  {
    id: 'reel-emotie-benoemen',
    title: 'Emoties benoemen met je kind',
    category: 'tips',
    skill: 'Emotiecoaching',
    slides: [
      s('quote', 'Help je kind emoties benoemen', 'Emotiecoaching', C.emotie),
      s('stat', '90%', 'Emotiecoaching', C.emotie, { subtitle: 'van kinderen kalmeert sneller als de emotie een naam krijgt' }),
      s('tip', '"Je bent niet stout. Je bent boos."', 'Emotiecoaching', C.emotie, { number: '1' }),
      s('tip', '"Je trilt helemaal. Ben je bang of opgewonden?"', 'Emotiecoaching', C.emotie, { number: '2' }),
      s('tip', '"Je huilt. Het voelt als verdriet, klopt dat?"', 'Emotiecoaching', C.emotie, { number: '3' }),
      s('tip', '"Je gezicht staat boos, maar misschien voel je je ook teleurgesteld?"', 'Emotiecoaching', C.emotie, { number: '4' }),
      s('cta', 'Woorden geven maakt emoties kleiner', 'Emotiecoaching', C.emotie, { subtitle: 'Leer emotiecoaching via de link in bio' }),
    ],
    caption: `"Name it to tame it" - als je een emotie benoemt, verliest het zijn overweldigende kracht.

Dit geldt voor je kind. En eerlijk gezegd ook voor jezelf.

Probeer het: benoem hardop wat je voelt. Merk het verschil.

#emotiecoaching #gevoelens #opvoedtips #vaderschap #devadercoach`,
  },

  // ════════════════════════════════════════════════════════════════════
  // 16. Aanwezigheid - Rituelen bouwen
  // ════════════════════════════════════════════════════════════════════
  {
    id: 'reel-aanwezig-rituelen',
    title: '5 rituelen die verbinden',
    category: 'tips',
    skill: 'Aanwezigheid',
    slides: [
      s('quote', '5 kleine rituelen die je band versterken', 'Aanwezigheid', C.aanwezig),
      s('tip', 'Een speciale begroeting als je thuiskomt van werk.', 'Aanwezigheid', C.aanwezig, { number: '1' }),
      s('tip', 'Elke avond dezelfde vraag: "Waar ben je blij mee vandaag?"', 'Aanwezigheid', C.aanwezig, { number: '2' }),
      s('tip', 'Zondagochtend pannenkoeken bakken, altijd samen.', 'Aanwezigheid', C.aanwezig, { number: '3' }),
      s('tip', 'Voor het slapen: "Waar kijk je naar uit morgen?"', 'Aanwezigheid', C.aanwezig, { number: '4' }),
      s('tip', 'Een geheim handgebaar dat alleen jullie kennen.', 'Aanwezigheid', C.aanwezig, { number: '5' }),
      s('cta', 'Rituelen worden herinneringen', 'Aanwezigheid', C.aanwezig, { subtitle: 'Start de Vader Experience via de link in bio' }),
    ],
    caption: `Je kind onthoudt geen dure uitjes. Het onthoudt rituelen.

Dat ene liedje bij het tandenpoetsen. Die high five bij het schoolhek. Die vraag elke avond.

Welk ritueel hebben jullie? Deel het in de comments.

#aanwezigheid #rituelen #vaderschap #herinneringen #devadercoach`,
  },

  // ════════════════════════════════════════════════════════════════════
  // 17. Grenzen - Nee zeggen
  // ════════════════════════════════════════════════════════════════════
  {
    id: 'reel-grenzen-nee',
    title: 'Nee zeggen zonder schuldgevoel',
    category: 'tips',
    skill: 'Grenzen',
    slides: [
      s('quote', '"Nee" is ook liefde', 'Grenzen', C.grenzen),
      s('didyouknow', 'Kinderen die nooit "nee" horen, leren niet omgaan met teleurstelling.', 'Grenzen', C.grenzen),
      s('tip', 'Zeg nee met uitleg: "Nu niet, want..."', 'Grenzen', C.grenzen, { number: '1' }),
      s('tip', 'Bied een alternatief: "Dit kan niet, maar dit wel."', 'Grenzen', C.grenzen, { number: '2' }),
      s('tip', 'Erken het gevoel: "Ik snap dat je teleurgesteld bent."', 'Grenzen', C.grenzen, { number: '3' }),
      s('tip', 'Wees consistent. Een nee die soms ja wordt, is verwarrend.', 'Grenzen', C.grenzen, { number: '4' }),
      s('cta', 'Grenzen geven veiligheid', 'Grenzen', C.grenzen, { subtitle: 'Meer in de Grenzen-cursus via de link in bio' }),
    ],
    caption: `De makkelijkste vader is niet de beste vader.

"Nee" zeggen voelt zwaar. Maar elk "nee" op het juiste moment leert je kind iets belangrijks: de wereld past zich niet aan jou aan, en dat is oké.

#grenzenstellen #nee #opvoeden #vaderschap #devadercoach`,
  },

  // ════════════════════════════════════════════════════════════════════
  // 18. Zelfregulatie - Triggers herkennen
  // ════════════════════════════════════════════════════════════════════
  {
    id: 'reel-zelfreg-triggers',
    title: 'Ken je triggers als vader',
    category: 'tips',
    skill: 'Zelfregulatie',
    slides: [
      s('quote', 'Ken je triggers als vader', 'Zelfregulatie', C.zelfreg),
      s('didyouknow', 'De meeste ouders schreeuwen niet vanwege het kind, maar vanwege eigen stress.', 'Zelfregulatie', C.zelfreg),
      s('tip', 'Slaaptekort: alles voelt groter als je moe bent.', 'Zelfregulatie', C.zelfreg, { number: '1' }),
      s('tip', 'Werkstress: frustratie van werk neem je mee naar huis.', 'Zelfregulatie', C.zelfreg, { number: '2' }),
      s('tip', 'Honger: lage bloedsuiker maakt prikkelbaar.', 'Zelfregulatie', C.zelfreg, { number: '3' }),
      s('tip', 'Herhaling: als je kind voor de 5e keer hetzelfde doet.', 'Zelfregulatie', C.zelfreg, { number: '4' }),
      s('tip', 'Ken je triggers en communiceer: "Ik ben moe, dus extra geduldig vandaag."', 'Zelfregulatie', C.zelfreg, { number: '!' }),
      s('cta', 'Bewustzijn is de eerste stap', 'Zelfregulatie', C.zelfreg, { subtitle: 'Meer over zelfregulatie via de link in bio' }),
    ],
    caption: `Je reageert niet op je kind. Je reageert op je eigen staat.

Als je moe bent, hongerig bent, of gestrest van werk - dan is het kind nooit het probleem. Het is de druppel.

Ken je triggers. Benoem ze. Voorkom de uitbarsting.

#zelfregulatie #triggers #opvoeden #vaderschap #devadercoach`,
  },

  // ════════════════════════════════════════════════════════════════════
  // 19. Verbinding - Vergelijking straffen vs begeleiden
  // ════════════════════════════════════════════════════════════════════
  {
    id: 'reel-verbind-straffen',
    title: 'Straffen vs. begeleiden',
    category: 'vergelijking',
    skill: 'Verbinding',
    slides: [
      s('quote', 'Straffen vs. begeleiden', 'Verbinding', C.verbind),
      s('comparison', 'Straf: "Geen tablet meer deze week"', 'Verbinding', C.verbind, { subtitle: 'Begeleiding: "Wat had je anders kunnen doen?"' }),
      s('comparison', 'Focus op fout gedrag', 'Verbinding', C.verbind, { subtitle: 'Focus op het gevoel achter het gedrag' }),
      s('comparison', 'Kind voelt: ik ben slecht', 'Verbinding', C.verbind, { subtitle: 'Kind voelt: ik maakte een fout, maar ik ben oké' }),
      s('comparison', 'Leert: niet betrapt worden', 'Verbinding', C.verbind, { subtitle: 'Leert: verantwoordelijkheid nemen' }),
      s('cta', 'Gedrag is communicatie', 'Verbinding', C.verbind, { subtitle: 'Leer het verschil via de link in bio' }),
    ],
    caption: `Straf stopt gedrag tijdelijk. Begeleiding verandert het voor altijd.

Het verschil zit niet in wat je doet, maar in wat je kind ervan leert.

Welke aanpak herken je bij jezelf?

#opvoeden #straffen #bewustopvoeden #vaderschap #devadercoach`,
  },

  // ════════════════════════════════════════════════════════════════════
  // 20. Reflectie - Wat voor vader wil je zijn?
  // ════════════════════════════════════════════════════════════════════
  {
    id: 'reel-reflectie-welke',
    title: 'Wat voor vader wil je zijn?',
    category: 'reflectie',
    skill: 'Reflectie',
    slides: [
      s('quote', 'Wat voor vader wil je zijn?', 'Reflectie', C.reflectie),
      s('tip', 'Niet de vader die alles weet, maar die blijft leren.', 'Reflectie', C.reflectie, { number: '1' }),
      s('tip', 'Niet de vader die nooit boos wordt, maar die laat zien hoe je kalmeert.', 'Reflectie', C.reflectie, { number: '2' }),
      s('tip', 'Niet de vader die alles oplost, maar die vraagt: "Hoe kan ik helpen?"', 'Reflectie', C.reflectie, { number: '3' }),
      s('tip', 'Niet de vader die perfect is, maar die sorry kan zeggen.', 'Reflectie', C.reflectie, { number: '4' }),
      s('tip', 'Niet de vader die zijn eigen jeugd herhaalt, maar die bewust kiest.', 'Reflectie', C.reflectie, { number: '5' }),
      s('cta', 'Elke dag is een nieuwe kans', 'Reflectie', C.reflectie, { subtitle: 'Start je reis via de link in bio' }),
    ],
    caption: `Je hoeft niet de vader te zijn die je vader was.
Je hoeft niet de vader te zijn die de maatschappij verwacht.

Je mag de vader zijn die jij kiest te zijn. Elke dag opnieuw.

Welke vader wil jij zijn? Laat het weten in de comments.

#reflectie #vaderschap #bewustopvoeden #groei #devadercoach`,
  },
];
