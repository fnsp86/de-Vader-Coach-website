import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Clock, User } from 'lucide-react';
import { SKILL_COLORS } from '@/lib/courses';

const POSTS: Record<string, {
  title: string;
  description: string;
  date: string;
  readTime: number;
  category: string;
  content: string;
}> = {
  'aanwezig-zijn-voor-kind': {
    title: '5 Manieren om Echt Aanwezig te Zijn voor je Kind',
    description: 'Kwaliteitstijd hoeft niet uren te duren. Ontdek vijf bewezen technieken om in korte momenten een sterke band op te bouwen.',
    date: '2026-02-20',
    readTime: 5,
    category: 'Aanwezigheid',
    content: `
## Kwaliteitstijd is niet hetzelfde als kwantiteitstijd

Veel vaders denken dat ze uren vrij moeten maken om een goede vader te zijn. Maar onderzoek laat zien dat het niet gaat om hoeveel tijd je doorbrengt, maar om de kwaliteit van die tijd.

## 1. De 5-minuten regel

Neem elke dag 5 minuten waarin je je volledige aandacht geeft aan je kind. Geen telefoon, geen afleiding. Alleen jij en je kind.

## 2. Benoem wat je ziet

"Ik zie dat je een toren aan het bouwen bent." Deze simpele techniek laat je kind voelen dat je echt kijkt.

## 3. Volg hun lead

Laat je kind bepalen wat jullie doen. Jouw enige taak is aanwezig zijn en meedoen.

## 4. Maak oogcontact

Ga op hun niveau zitten. Oogcontact is een van de krachtigste manieren om verbinding te maken.

## 5. Rituals maken

Maak vaste momenten: een voorleesritueel, een wandeling na het eten, of een speciaal geheim handgebaar.

---

*Deze tips zijn gebaseerd op onderzoek naar ouder-kind hechting en de Circle of Security methode.*
    `,
  },
  'driftbuien-begrijpen': {
    title: 'Waarom Driftbuien Geen Gedragsprobleem Zijn',
    description: 'Wat er echt gebeurt in het brein van je kind tijdens een driftbui, en hoe je er het beste mee omgaat.',
    date: '2026-02-15',
    readTime: 7,
    category: 'Emotiecoaching',
    content: `
## Het brein van je kind is nog in aanbouw

Stel je voor: je kind ligt krijsend op de grond in de supermarkt omdat het geen koekje mag. Iedereen kijkt. Je voelt je bloeddruk stijgen. Je eerste impuls is misschien om streng te zijn, om het gedrag te stoppen. Maar wat als dat schreeuwende kind op dat moment simpelweg niet anders kan?

Het brein van een kind is pas rond het 25e levensjaar volledig ontwikkeld. De prefrontale cortex, het deel dat verantwoordelijk is voor zelfbeheersing, planning en het reguleren van emoties, is bij jonge kinderen nog nauwelijks functioneel. Wat wel al volop werkt, is de amygdala: het alarmsysteem van het brein. Dit betekent dat je kind emoties intens ervaart, maar nog niet de hersenstructuur heeft om die emoties te beheersen.

Een driftbui is dus geen bewuste keuze. Het is een noodsignaal van een brein dat overbelast is.

## Wat er werkelijk gebeurt tijdens een driftbui

Wanneer je kind overspoeld raakt door frustratie, verdriet of woede, neemt de amygdala het over. Wetenschappers noemen dit een "amygdala-kaping": het emotionele brein drukt het denkende brein opzij. Op dat moment kan je kind letterlijk niet nadenken, niet luisteren en niet rationeel reageren.

Dit is precies waarom straffen tijdens een driftbui niet werkt. Je kunt niet praten met een brein dat in overlevingsstand staat. Het is alsof je een handleiding probeert voor te lezen aan iemand die in een brandend gebouw staat. Eerst moet het vuur geblust worden.

## Waarom straffen het erger maakt

Als je straft tijdens een driftbui, voeg je stress toe aan een systeem dat al overbelast is. Onderzoek laat zien dat herhaaldelijke straf bij emotionele uitbarstingen leidt tot meer angst, meer agressie op de lange termijn, en een zwakkere band tussen ouder en kind. Het kind leert niet om met emoties om te gaan, het leert ze te onderdrukken. En onderdrukte emoties komen altijd ergens anders weer naar boven.

## De aanpak van Gottman: emotiecoaching

John Gottman, een van de meest invloedrijke onderzoekers op het gebied van relaties en gezinnen, ontwikkelde het concept van "emotiecoaching." Zijn onderzoek toont aan dat kinderen van ouders die emoties benoemen en begeleiden, beter presteren op school, gezondere vriendschappen hebben en beter in staat zijn om hun eigen emoties te reguleren.

Emotiecoaching werkt in vijf stappen:

## Stap 1: Merk de emotie op

Wees alert op signalen voordat het escaleert. Zie je dat je kind gefrustreerd raakt? Dat is het moment om in actie te komen.

## Stap 2: Zie het als een kans

Een driftbui is geen probleem dat je moet oplossen, maar een moment waarop je kind je het hardst nodig heeft. Dit is jouw kans om te laten zien dat alle gevoelens welkom zijn.

## Stap 3: Luister en erken

Ga op ooghoogte zitten. Zeg: "Ik zie dat je heel boos bent." Of: "Je bent gefrustreerd omdat het niet lukt." Je hoeft het niet op te lossen. Je hoeft er alleen maar te zijn.

## Stap 4: Help de emotie benoemen

Kinderen kunnen nog niet altijd woorden geven aan wat ze voelen. Help ze daarbij: "Dat voelt als teleurstelling, he?" Door emoties te benoemen wordt de prefrontale cortex geactiveerd, en dat helpt het emotionele brein om te kalmeren.

## Stap 5: Begrens het gedrag, niet het gevoel

"Je mag boos zijn. Maar slaan mag niet." Dit onderscheid is cruciaal. Het gevoel is altijd oke. Het gedrag mag je begrenzen. Zo leert je kind dat emoties er mogen zijn en dat er gezonde manieren zijn om ermee om te gaan.

## Wat je als vader concreet kunt doen

In het moment zelf: blijf rustig (of doe alsof). Adem drie keer diep in. Herinner jezelf eraan dat je kind het moeilijk heeft, niet moeilijk doet. Ga op hun niveau zitten. Bied nabijheid aan, ook als ze je wegduwen. Wacht tot de storm voorbij is voordat je over het gedrag praat.

Na de driftbui: bespreek samen wat er gebeurde. "Je was heel boos in de winkel. Dat snap ik. Volgende keer, wat zouden we dan kunnen doen?" Dit gesprek achteraf is waar het echte leren plaatsvindt.

---

*Dit artikel is gebaseerd op het emotiecoaching-model van Gottman, en op onderzoek naar de ontwikkeling van de prefrontale cortex bij kinderen (Siegel & Bryson, The Whole-Brain Child).*
    `,
  },
  'grenzen-zonder-schreeuwen': {
    title: 'Grenzen Stellen Zonder Schreeuwen',
    description: 'Praktische scripts en technieken voor het stellen van duidelijke grenzen met empathie.',
    date: '2026-02-10',
    readTime: 6,
    category: 'Grenzen',
    content: `
## Waarom schreeuwen niet werkt (ook al voelt het even effectief)

Je hebt het al drie keer gezegd. Rustig. Duidelijk. En er gebeurt niets. Dan komt het: die stem die je niet herkent als de jouwe, die volume knop die opeens op tien staat. Het werkt, even. Je kind luistert. Maar wat je kind eigenlijk hoort is niet je boodschap, maar je dreiging. En dat is een belangrijk verschil.

Wanneer je schreeuwt, activeert dat het stresssysteem van je kind. De amygdala springt aan, het denkende brein schakelt uit. Je kind gaat in vecht-, vlucht- of bevriesstand. Het resultaat: je kind stopt misschien met het gedrag, maar niet omdat het de grens begrijpt. Het stopt uit angst. En angst is een slechte leraar.

Onderzoek laat bovendien zien dat kinderen die regelmatig worden uitgescholden of toegeschreeuwd, vergelijkbare stressreacties vertonen als kinderen die fysiek gestraft worden. Dat is confronterend, maar ook hoopgevend: het betekent dat je door je aanpak te veranderen, een enorm verschil kunt maken.

## De KWH-formule: Kort, Warm, Helder

Een effectieve grens heeft drie eigenschappen. Hij is kort, want kinderen haken af bij lange uitleg. Hij is warm, want verbinding is de basis van samenwerking. En hij is helder, want vaagheid leidt tot verwarring.

Vergelijk deze twee aanpakken:

Vaag en lang: "Ik heb je nu al zo vaak gezegd dat je niet met eten mag gooien, waarom luister je nou nooit, dit is echt niet oké hoor, als je zo doorgaat dan..."

KWH: "Eten blijft op je bord. Wil je gooien? Dan mag je straks met een bal naar buiten."

De eerste aanpak bevat beschuldiging, frustratie en een onafgemaakte dreiging. De tweede is een heldere grens met een alternatief. Kort. Warm. Helder.

## Het verschil tussen streng en hard

Dit is misschien wel het belangrijkste inzicht: streng zijn en hard zijn zijn twee totaal verschillende dingen. Streng betekent duidelijk en consistent. Hard betekent dreigend en onverbiddelijk.

Een strenge vader zegt: "We gaan nu naar huis. Ik snap dat je nog wilt spelen, en we komen morgen terug." Een harde vader zegt: "We gaan NU. En als je niet meekomt, hoef je de volgende keer helemaal niet meer mee."

Het verschil zit in de erkenning. Bij streng is er ruimte voor het gevoel van je kind. Bij hard wordt dat gevoel genegeerd of zelfs bestraft.

## Vijf concrete scripts die je morgen kunt gebruiken

Script 1 - Bij niet luisteren: Ga op ooghoogte, maak oogcontact: "Ik ga je iets vertellen. Luister even. [Grens]. Heb je het gehoord?"

Script 2 - Bij slaan of schoppen: "Stop. Slaan mag niet. Ik snap dat je boos bent. Laat me je helpen om dat op een andere manier te uiten."

Script 3 - Bij weigeren om op te ruimen: "We gaan zo [leuke activiteit]. Eerst ruimen we samen op. Ik help je, waar zullen we beginnen?"

Script 4 - Bij zeuren in de winkel: "Ik hoor dat je het graag wilt. Vandaag kopen we het niet. Je mag het op je verlanglijstje zetten."

Script 5 - Bij bedtijdverzet: "Het is bedtijd. Wil je zelf je pyjama kiezen of zal ik er een uitleggen?" Keuze geven binnen de grens vergroot de samenwerking.

## Wat als het niet meteen werkt?

Grenzen stellen zonder schreeuwen is geen trucje dat direct resultaat geeft. Het is een nieuwe manier van communiceren die tijd nodig heeft. Je kind is misschien gewend aan een ander patroon. Het kan even duren voordat het vertrouwen groeit dat jouw "nee" niet gepaard gaat met angst.

Wees geduldig. Wees consistent. En wees mild voor jezelf als het af en toe niet lukt. Het gaat niet om perfectie, het gaat om richting.

---

*Gebaseerd op onderzoek van Gottman naar emotiecoaching in gezinnen, en het werk van Dan Siegel over de impact van ouderlijke communicatie op de hersenontwikkeling van kinderen.*
    `,
  },
  'herstellen-na-fout': {
    title: 'De Kracht van Herstellen na een Fout',
    description: 'Iedereen maakt fouten als ouder. Wat telt is hoe je herstelt. Leer de kunst van de oprechte verontschuldiging.',
    date: '2026-02-05',
    readTime: 4,
    category: 'Herstel',
    content: `
## Perfecte ouders bestaan niet

Je bent moe, je hebt een rotdag gehad, en dan doet je kind iets kleins en je ontploft. Te hard, te luid, en je ziet het direct in hun ogen. Die schrik. Die onzekerheid. Je wilt het terugnemen, maar het hangt al in de lucht.

Dit overkomt iedere vader. Echt iedere vader. En hier is het goede nieuws: het gaat niet om die fout. Het gaat om wat je daarna doet.

Edward Tronick, de onderzoeker achter het beroemde "Still Face Experiment", toonde aan dat zelfs de beste ouders maar in ongeveer 30% van de gevallen goed afgestemd zijn op hun kind. De overige 70% van de tijd is er sprake van misafstemming: momenten waarop je je kind niet goed begrijpt, niet goed reageert, of simpelweg even niet beschikbaar bent.

Maar hier zit het fascinerende: kinderen worden niet beschadigd door die misafstemming. Ze worden sterker door het herstel dat erop volgt. Het is juist dat patroon van "verbinding - breuk - herstel" dat veerkracht opbouwt.

## Waarom herstel zo krachtig is

Wanneer je herstelt na een fout, leert je kind meerdere dingen tegelijk. Het leert dat relaties tegen een stootje kunnen. Het leert dat fouten maken menselijk is. Het leert dat gevoelens serieus genomen worden. En misschien wel het belangrijkste: het leert hoe je verantwoordelijkheid neemt voor je gedrag. Dat is een les die geen boek of school kan bieden. Die leer je alleen door het voor te leven.

## De vijf stappen van een echte verontschuldiging

Stap 1 - Benoem wat je deed: "Ik schreeuwde tegen je. Dat was niet oké."

Stap 2 - Erken het effect: "Ik denk dat je daarvan schrok. Misschien werd je er verdrietig of bang van."

Stap 3 - Neem verantwoordelijkheid: "Dat was mijn fout. Niet die van jou. Jij deed niets verkeerd."

Stap 4 - Leg uit wat je anders wilt doen: "De volgende keer ga ik eerst even diep ademhalen voordat ik iets zeg."

Stap 5 - Check in: "Hoe voel je je nu? Is er iets wat je wilt zeggen?"

## Wat je beter niet kunt zeggen

"Sorry, maar jij luisterde ook niet." Dit is geen verontschuldiging, dit is een beschuldiging met een sorry-sausje. Het woord "maar" wist alles uit wat ervoor kwam.

"Je weet toch dat papa van je houdt." Dit gaat voorbij aan wat het kind voelt. Het kind heeft recht op erkenning van het moment, niet op geruststelling die eigenlijk voor jou bedoeld is.

"Ik was gewoon moe." Een verklaring is prima, maar alleen nadat je eerst de verantwoordelijkheid hebt genomen. Anders klinkt het als een excuus.

## Herstel per leeftijd

Bij peuters (1-3 jaar): Gebruik je stem, gezicht en lichaam. Ga zitten, spreek zacht, bied een knuffel aan. Woorden zijn minder belangrijk dan de toon en nabijheid.

Bij kleuters (4-6 jaar): Benoem het concreet. "Papa werd boos en dat was niet fijn voor jou. Sorry." Houd het kort en helder.

Bij schoolkinderen (7-12 jaar): Wees eerlijk en kwetsbaar. Kinderen in deze leeftijd hebben een sterk gevoel voor rechtvaardigheid en waarderen oprechtheid.

Bij tieners (13+): Respecteer hun ruimte. Bied je excuses aan zonder te verwachten dat ze het direct accepteren. Geef ze tijd. "Ik wil even zeggen dat ik fout zat. Je hoeft er nu niets mee te doen."

---

*Gebaseerd op het Still Face Experiment van Tronick, en het werk van Bowlby over hechtingsrelaties en de rol van herstel in de ouder-kindband.*
    `,
  },
  'waarom-je-kind-je-triggers': {
    title: 'Waarom Je Kind Precies Jouw Triggers Kent',
    description: 'Je kind drukt op je knoppen als geen ander. Begrijp waarom, en leer er anders mee omgaan.',
    date: '2026-01-28',
    readTime: 6,
    category: 'Zelfregulatie',
    content: `
## Niemand maakt je zo boos als je eigen kind

Je kunt een vergadering van drie uur doorstaan met lastige collega's zonder ook maar je stem te verheffen. Maar als je vierjarige voor de derde keer zijn beker melk omgooit, sta je daar te trillen van frustratie. Herkenbaar?

Je kind heeft een uniek vermogen om precies die knoppen te vinden die niemand anders kan bereiken. Dat is geen toeval. En het zegt meer over jou dan over je kind.

## Jouw zenuwstelsel vertelt een oud verhaal

Stephen Porges ontwikkelde de polyvagaaltheorie, die beschrijft hoe ons autonome zenuwstelsel reageert op gevaar en veiligheid. Ons zenuwstelsel heeft drie standen: sociaal betrokken (veilig, verbonden), vecht-of-vlucht (gestrest, geactiveerd), en bevriezing (overweldigd, afgesloten).

Wanneer je kind gedrag vertoont dat voor jou als "te veel" voelt, schakelt jouw zenuwstelsel over van de veilige stand naar de stressstand. Dat gaat razendsnel en vaak onbewust. Voordat je het weet, ben je aan het schreeuwen, terwijl je rationeel weet dat een omgegooid beker melk geen ramp is.

De vraag is: waarom reageert jouw systeem zo heftig op iets relatief kleins?

## Intergenerationele patronen

Het antwoord ligt vaak in je eigen opvoeding. Niet omdat je ouders slechte mensen waren, maar omdat je zenuwstelsel als kind heeft geleerd wat "gevaarlijk" is en wat niet.

Als jij als kind de boodschap kreeg dat morsen niet mocht, dat je netjes moest zijn, dat er consequenties waren voor onhandigheid, dan heeft je brein dat opgeslagen als een dreigingspatroon. Wanneer je eigen kind morst, herkent je zenuwstelsel dat patroon en slaat alarm. Niet om het huidige moment, maar om een oud gevoel dat nooit goed verwerkt is.

Dit is geen schuld. Dit is biologie. Je kunt pas iets veranderen als je het begrijpt.

## Jouw window of tolerance

Iedereen heeft een zogenaamd "window of tolerance", een zone waarbinnen je stress aankunt zonder je regulatie te verliezen. Binnen dit venster kun je nadenken, geduldig zijn, creatief reageren. Buiten dit venster raak je ofwel overstimulated (boosheid, geagiteerd) of onderstimulated (afwezig, emotioneel plat).

Als vader is het belangrijk om te weten hoe breed jouw venster is en wat het smaller maakt. Slaapgebrek, werkstress, conflicten met je partner, honger: dit zijn allemaal factoren die jouw venster verkleinen. Op een dag dat alles goed gaat, kun je die omgegooid beker moeiteloos aan. Op een dag dat je uitgeput bent, is diezelfde beker de druppel.

## Vier technieken om je zenuwstelsel te kalmeren

Techniek 1 - De fysiologische zucht: Adem in door je neus (dubbele inademing, kort-kort) en dan langzaam uit door je mond. Dit is de snelste manier om je zenuwstelsel te reguleren. Neurowetenschapper Andrew Huberman noemt dit de meest effectieve calmeringstechniek die we kennen.

Techniek 2 - Benoem wat er gebeurt: Zeg in stilte tegen jezelf: "Mijn zenuwstelsel staat op alarm. Dit is een oud patroon. Mijn kind is niet de vijand." Het benoemen van wat er in je gebeurt, activeert je prefrontale cortex en helpt je uit de automatische reactie te stappen.

Techniek 3 - De fysieke reset: Als het kan, verlaat kort de situatie. "Papa heeft even een momentje nodig." Ga naar een andere kamer, was je gezicht met koud water, beweeg even. Terugkomen in een rustigere staat is geen zwakte, het is wijsheid.

Techniek 4 - De ankerherinnering: Houd een beeld in je hoofd van een moment waarop je en je kind echt verbonden waren. Een knuffel, een lach, een rustig voorleesmoment. Haal dat beeld op wanneer je getriggerd wordt. Het helpt je zenuwstelsel te herinneren dat dit kind geen bedreiging is, maar je grote liefde.

## De vader die zichzelf kent

Je hoeft niet altijd rustig te zijn. Je hoeft niet perfect te reageren. Maar als je begrijpt waarom bepaald gedrag van je kind zo hard bij je binnenkomt, heb je al een enorme voorsprong. Bewustzijn is het begin van verandering.

---

*Dit artikel is gebaseerd op de polyvagaaltheorie van Porges, het concept van het window of tolerance (Siegel), en onderzoek naar intergenerationele overdracht van hechtingspatronen (Bowlby, Fonagy).*
    `,
  },
  'loslaten-zonder-angst': {
    title: 'Loslaten Zonder Angst: Je Kind Ruimte Geven',
    description: 'De paradox van beschermen en loslaten. Hoe geef je je kind autonomie zonder de verbinding te verliezen?',
    date: '2026-01-20',
    readTime: 5,
    category: 'Autonomie',
    content: `
## De beschermingsparadox

Vanaf het moment dat je kind geboren wordt, is alles in je gericht op beschermen. Je checkt of het ademt. Je vangt het op voordat het valt. Je scant elke speeltuin op gevaar. Dat instinct is krachtig en belangrijk.

Maar er komt een moment waarop datzelfde instinct je kind in de weg gaat zitten. Wanneer beschermen verandert in beperken, en wanneer jouw angst de ruimte inneemt die je kind nodig heeft om te groeien. De grote vraag van het vaderschap is niet alleen "hoe houd ik mijn kind veilig?" maar ook "hoe geef ik mijn kind de vrijheid om te leren?"

## Wat de wetenschap zegt over autonomie

Psychologen Edward Deci en Richard Ryan ontwikkelden de zelfdeterminatietheorie, een van de meest onderzochte motivatietheorieen ter wereld. De kern ervan is simpel: mensen, en dus ook kinderen, hebben drie psychologische basisbehoeften. Autonomie (het gevoel zelf keuzes te maken), competentie (het gevoel dingen te kunnen), en verbondenheid (het gevoel erbij te horen).

Wanneer kinderen autonomie ervaren, zijn ze meer gemotiveerd, presteren ze beter en voelen ze zich gelukkiger. Niet omdat er geen grenzen zijn, maar omdat ze binnen die grenzen echte keuzevrijheid hebben.

## Scaffolding: steun bieden zonder over te nemen

Er is een prachtig concept uit de ontwikkelingspsychologie dat "scaffolding" heet, letterlijk: steigerwerk. Net zoals een steiger een gebouw ondersteunt terwijl het gebouwd wordt, en verwijderd wordt zodra het stevig genoeg staat, zo kun je als vader steun bieden die meegroeit met wat je kind aankan.

Scaffolding is het tegenovergestelde van helikopterouderschap. Een helikoptervader lost het probleem op. Een scaffolding-vader vraagt: "Wat denk je dat je zou kunnen proberen?" De eerste neemt de kans op leren weg. De tweede geeft vertrouwen.

Concreet voorbeeld: je kind kan zijn jas niet dichtritsen. Helikopter: je ritst het dicht. Scaffolding: je houdt de onderkant van de rits vast zodat je kind het zelf kan proberen. Dat kleine verschil maakt een wereld van verschil voor het zelfvertrouwen van je kind.

## Leeftijdsgerichte vrijheid

Bij peuters (1-3 jaar): Bied keuzes aan tussen twee opties. "Wil je de rode of de blauwe beker?" Het kind ervaart autonomie, jij houdt controle over de opties.

Bij kleuters (4-6 jaar): Laat ze taken zelfstandig doen, ook als het langzamer of rommeliger gaat. Zelf aankleden, zelf boterhammen smeren, zelf conflicten met vriendjes proberen op te lossen voordat je ingrijpt.

Bij schoolkinderen (7-12 jaar): Vergroot de cirkel. Alleen naar een vriendje fietsen. Zelf het huiswerk plannen. Eigen geld beheren. Dit zijn oefenmomentjes in verantwoordelijkheid.

Bij tieners (13+): Geef ruimte voor eigen keuzes, ook als je het er niet mee eens bent (mits veilig). Jouw rol verschuift van regisseur naar adviseur. Dat voelt als verlies, maar het is groei.

## Waarom falen onmisbaar is

Dit is misschien het moeilijkste voor vaders: je kind laten falen. We willen ze behoeden voor pijn, teleurstelling, afwijzing. Maar onderzoek laat consequent zien dat kinderen die nooit mogen falen, minder veerkrachtig worden. Ze ontwikkelen een angst om fouten te maken, omdat ze nooit geleerd hebben dat een fout geen ramp is.

Een kind dat van de fiets valt en weer opstaat, leert iets wat geen beschermende vader kan aanleren: "Ik kan dit aan." Dat is het fundament van zelfvertrouwen.

Jouw rol is niet om de val te voorkomen. Jouw rol is om er te zijn wanneer ze opstaan. En te zeggen: "Dat deed vast pijn. Maar je deed het zelf. Wat knap."

---

*Gebaseerd op de zelfdeterminatietheorie van Deci en Ryan, het concept van scaffolding (Vygotsky), en onderzoek naar de ontwikkeling van veerkracht bij kinderen (Masten).*
    `,
  },
  'praten-met-je-tiener': {
    title: 'Praten met je Tiener: Waarom Zij-aan-Zij Werkt',
    description: 'Je tiener wil niet praten? Probeer het eens zij aan zij in plaats van tegenover elkaar.',
    date: '2026-01-12',
    readTime: 5,
    category: 'Verbinding',
    content: `
## "Hoe was het op school?" "Goed."

Als je een tiener hebt, ken je dit gesprek. Je stelt een vraag, je krijgt een lettergreep terug. Je probeert het nog eens, je krijgt een schouderophalen. Je voelt de verbinding wegglibben en je weet niet hoe je die terug moet pakken.

Het goede nieuws: dit is normaal. Het slechte nieuws: je moet je aanpak veranderen. Want wat werkte toen ze vijf waren, werkt niet meer bij vijftien.

## Wat er in het tienerbrein gebeurt

Het tienerbrein ondergaat een enorme verbouwing. Er vindt "pruning" plaats, het snoeien van ongebruikte hersenverbindingen, en tegelijkertijd worden veelgebruikte verbindingen sterker en sneller. Dit proces begint achterin het brein en werkt naar voren. De prefrontale cortex, het deel voor planning en impulsbeheer, is als laatste aan de beurt.

Ondertussen is het dopaminesysteem extra gevoelig. Tieners ervaren beloningen intenser en zijn sterker gemotiveerd door sociale status, spanning en nieuwigheid dan volwassenen. Dit verklaart waarom ze risico's nemen die jij niet begrijpt: hun brein waardeert de beloning hoger dan het risico.

Wat dit voor jou als vader betekent: je tiener is niet lui, onverschillig of opstandig. Ze zitten in een biologische transformatie die hen tijdelijk anders doet functioneren.

## Waarom tegenover elkaar niet werkt

Er is een reden waarom het gesprek aan de keukentafel zo moeizaam voelt. Oog in oog zitten, tegenover elkaar, voelt voor tieners als een verhoor. Hun brein is extra gevoelig voor sociale dreiging, en direct oogcontact van een autoriteitsfiguur kan het stresssysteem activeren.

Dit is niet persoonlijk. Het is neurologie. Het tienerbrein interpreteert direct oogcontact in een een-op-een-setting makkelijker als confrontatie dan als verbinding.

## De zij-aan-zij-techniek

En nu het geheim dat veel vaders ontdekken wanneer het ze wordt uitgelegd: de beste gesprekken met tieners ontstaan wanneer je naast elkaar bezig bent in plaats van tegenover elkaar.

In de auto: Rij-momenten zijn goud waard. Geen oogcontact, een gedeelde richting, een natuurlijk begin en einde van het gesprek. Veel vaders merken dat hun tiener in de auto opeens begint te praten. Dat is niet toevallig. De setting voelt veilig.

Tijdens het wandelen: Naast elkaar lopen heeft hetzelfde effect. De gedeelde beweging, de gedeelde omgeving, en de vrijheid om stil te zijn wanneer dat nodig is.

Tijdens het gamen of klussen: Samen iets doen verlaagt de drempel om te praten. Het gesprek hoeft niet het hoofddoel te zijn. Het ontstaat terloops, als bijproduct van samen bezig zijn. Dat is precies wat het voor een tiener veilig maakt.

## Open vragen versus gesloten vragen

Naast de setting maakt ook het type vraag verschil. Gesloten vragen ("Hoe was school?") leveren gesloten antwoorden op ("Goed"). Open vragen nodigen uit tot nadenken.

In plaats van "Hoe was school?" probeer: "Wat was het meest verrassende dat vandaag gebeurde?" Of: "Was er iets vandaag waar je van baalde?"

In plaats van "Heb je huiswerk?" probeer: "Waar ben je mee bezig voor school deze week?"

In plaats van "Gaat het goed met je?" probeer: "Ik merkte dat je stil was. Wil je er over praten, of wil je gewoon even rustig zitten?"

Die laatste vraag is belangrijk: geef altijd de optie om niet te praten. De wetenschap dat ze mogen zwijgen, maakt het paradoxaal genoeg makkelijker om te beginnen.

## De lange adem

Verbinding met je tiener is een lange-termijn-investering. Er zullen periodes zijn waarin het voelt alsof je geen enkele toegang hebt. Dat is normaal en het gaat voorbij. Wat blijft, is het patroon dat je neerzet: ik ben er, ik oordeel niet, ik luister wanneer jij er klaar voor bent.

Uit onderzoek blijkt dat de kwaliteit van de vader-tienerrelatie een van de sterkste voorspellers is van welzijn in de vroege volwassenheid. Het loont dus om die zij-aan-zij-momenten te blijven opzoeken, ook als het stil blijft.

---

*Gebaseerd op onderzoek naar de ontwikkeling van het tienerbrein (Blakemore, Crone), de impact van ouder-kind communicatie op tieners (Gottman), en studies naar zij-aan-zij-interactie bij adolescenten.*
    `,
  },
  'reflecteren-als-vader': {
    title: 'Reflecteren als Vader: De Meest Onderschatte Vaardigheid',
    description: 'De vader die begrijpt waarom hij boos wordt, is al aan het veranderen.',
    date: '2026-01-05',
    readTime: 4,
    category: 'Reflectie',
    content: `
## De automatische piloot

De meeste vaders functioneren op automatische piloot. Je kind doet iets, jij reageert. Snel, intuïtief, en vaak op dezelfde manier als je eigen vader reageerde, of juist precies het tegenovergestelde. Maar heb je ooit stilgestaan bij de vraag waarom je zo reageert?

Reflecteren is niet navelstaren. Het is de vaardigheid om even een stap terug te zetten en te kijken naar je eigen patronen. En het is, volgens onderzoek, een van de belangrijkste dingen die je als ouder kunt ontwikkelen.

## Wat is reflectief functioneren?

Peter Fonagy, een van de invloedrijkste psychologen op het gebied van hechting, introduceerde het concept "reflectief functioneren." Het betekent simpelweg: het vermogen om je eigen gedrag en dat van je kind te begrijpen in termen van onderliggende gevoelens, gedachten en behoeften.

Een vader met laag reflectief functioneren ziet een kind dat schreeuwt en denkt: "Hij is onhandelbaar." Een vader met hoog reflectief functioneren ziet hetzelfde kind en denkt: "Hij schreeuwt. Wat zou hij voelen? Wat heeft hij nodig? En wat doet dit met mij?"

Dat verschil in perspectief verandert alles. Het verandert hoe je reageert, hoe je kind zich gezien voelt, en hoe de relatie zich ontwikkelt.

## Patronen uit je eigen opvoeding

We dragen allemaal een onzichtbare rugzak mee uit onze jeugd. In die rugzak zitten overtuigingen over wat normaal is, wat acceptabel is, en hoe je met emoties omgaat.

Misschien leerde jij dat huilen zwakte was. Dan is het logisch dat je ongemakkelijk wordt wanneer je zoon huilt. Misschien was er in jouw gezin weinig ruimte voor woede. Dan kan de boosheid van je dochter onverwacht hard binnenkomen.

Dit herkennen is geen verwijt aan je ouders. Zij deden wat zij konden met wat zij hadden. Maar jij hebt nu de kans om bewust te kiezen welke patronen je doorgeeft en welke je hier laat stoppen.

## De wekelijkse reflectieoefening

Neem een keer per week vijf minuten. Meer hoeft niet. Stel jezelf drie vragen:

Vraag 1: "Wanneer voelde ik me deze week het meest verbonden met mijn kind?" Sta stil bij dat moment. Wat deed je? Wat deed je kind? Wat maakte het bijzonder?

Vraag 2: "Wanneer reageerde ik deze week op een manier die ik achteraf zou willen veranderen?" Geen oordeel, alleen observatie. Wat was de trigger? Wat voelde je op dat moment? Wat had je liever gedaan?

Vraag 3: "Wat heeft mijn kind deze week van mij nodig dat ik nog niet gegeven heb?" Soms is het antwoord tijd. Soms geduld. Soms gewoon een knuffel.

Schrijf het op als dat helpt, of denk er even over na onder de douche. Het gaat niet om het format, het gaat om de gewoonte.

## Waarden-gedreven opvoeden

Reflecteren helpt je ook om te ontdekken welke vader je wilt zijn, niet welke vader je automatisch bent. Stel jezelf de vraag: "Als mijn kind over twintig jaar terugdenkt aan mij als vader, wat wil ik dan dat het zich herinnert?"

Niet de regels. Niet de straffen. Maar het gevoel. Voelde ik me veilig? Voelde ik me gezien? Wist ik dat mijn vader er voor me was, ook als het moeilijk werd?

Vanuit die waarden kun je bewuste keuzes maken. Niet elke dag perfect, maar wel met een richting.

## De vader die zichzelf kent

De vader die begrijpt waarom hij boos wordt, is al aan het veranderen. De vader die zijn eigen patronen herkent, doorbreekt de cyclus. De vader die reflecteert, bouwt niet alleen aan de relatie met zijn kind, maar ook aan de relatie met zichzelf.

En dat is misschien wel het mooiste geschenk dat je je kind kunt geven: een vader die bereid is om te groeien.

---

*Gebaseerd op het werk van Fonagy over reflectief functioneren en mentaliseren, de hechtingstheorie van Bowlby, en onderzoek naar waarden-gedreven opvoeden (Hayes, Acceptance and Commitment Therapy).*
    `,
  },
};

const DEFAULT_POST = {
  title: 'Artikel niet gevonden',
  description: '',
  date: '2026-01-01',
  readTime: 0,
  category: '',
  content: 'Dit artikel is nog niet beschikbaar. Kom binnenkort terug!',
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = POSTS[slug] ?? DEFAULT_POST;
  return { title: post.title, description: post.description };
}

export default async function BlogArticle({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = POSTS[slug] ?? DEFAULT_POST;
  const formatted = new Date(post.date).toLocaleDateString('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' });
  const categoryColor = SKILL_COLORS[post.category] || '#F59E0B';

  // Simple markdown-to-html
  const htmlContent = post.content
    .split('\n')
    .map((line) => {
      const trimmed = line.trim();
      if (trimmed.startsWith('## ')) return `<h2>${trimmed.slice(3)}</h2>`;
      if (trimmed.startsWith('# ')) return `<h1>${trimmed.slice(2)}</h1>`;
      if (trimmed === '---') return '<hr />';
      if (trimmed.startsWith('*') && trimmed.endsWith('*')) return `<p><em>${trimmed.slice(1, -1)}</em></p>`;
      if (trimmed) return `<p>${trimmed}</p>`;
      return '';
    })
    .join('\n');

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <Link
        href="/blog"
        className="inline-flex items-center gap-1.5 text-sm font-semibold mb-8 hover:gap-2.5 transition-all"
        style={{ color: 'var(--text3)' }}
      >
        <ArrowLeft className="h-4 w-4" />
        Alle artikelen
      </Link>

      <article>
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span
              className="text-[11px] font-bold px-2.5 py-1 rounded-md"
              style={{ backgroundColor: categoryColor + '15', color: categoryColor }}
            >
              {post.category}
            </span>
            <span className="flex items-center gap-1 text-[11px]" style={{ color: 'var(--text3)' }}>
              <Clock className="h-3 w-3" />
              {post.readTime} min
            </span>
            <span className="text-[11px]" style={{ color: 'var(--text3)' }}>{formatted}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold leading-tight mb-3" style={{ color: 'var(--text)' }}>
            {post.title}
          </h1>
          <div className="flex items-center gap-2 text-[13px]" style={{ color: 'var(--text3)' }}>
            <User className="h-3.5 w-3.5" />
            De Vadercoach
          </div>
        </div>

        <div
          className="max-w-none [&_h2]:text-lg [&_h2]:font-bold [&_h2]:mt-8 [&_h2]:mb-3 [&_p]:text-[15px] [&_p]:leading-relaxed [&_p]:mb-4 [&_hr]:my-8 [&_hr]:border-[var(--border)] [&_em]:text-[13px] [&_em]:opacity-70"
          style={{ color: 'var(--text2)' }}
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </article>
    </div>
  );
}
