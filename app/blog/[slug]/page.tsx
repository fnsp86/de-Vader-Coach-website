import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Clock, User } from 'lucide-react';
import { SKILL_COLORS } from '@/lib/courses';
import ShareButtons from '@/components/ShareButtons';

const POSTS: Record<string, {
  title: string;
  description: string;
  date: string;
  readTime: number;
  category: string;
  content: string;
}> = {
  'aanwezig-zijn-voor-kind': {
    title: 'De Twee Minuten Die Alles Veranderden',
    description: 'Een vader legt zijn telefoon neer. Zijn dochter kijkt op. En er gebeurt iets dat hij niet had verwacht.',
    date: '2026-02-20',
    readTime: 3,
    category: 'Aanwezigheid',
    content: `
## De telefoon lag op tafel

Gisteren zat ik op de bank. Mijn dochter van zes vertelde over school. Ik knikte. Ik zei "ja, leuk!" op de juiste momenten. Maar mijn ogen waren op mijn scherm.

Op een gegeven moment stopte ze met praten. Ik keek op. Ze keek me aan. Niet boos. Niet verdrietig. Gewoon... wachtend.

Ik legde mijn telefoon weg. Draaide me naar haar toe. "Vertel nog eens. Wie was dat ook alweer?"

Haar ogen lichtten op alsof ik een cadeautje gaf.

## Twintig seconden

Dat is alles wat het kostte. Geen uren. Geen speciaal uitje. Geen groot gebaar. Twintig seconden bewust kiezen om er te zijn.

Onderzoekers noemen het "attentional shift" - het moment waarop je je aandacht verplaatst van waar het toevallig is, naar waar het ertoe doet. Het klinkt vanzelfsprekend. Maar tel eens hoe vaak je kind praat terwijl jij ergens anders bent met je hoofd.

## Halfaanwezig is erger dan afwezig

Dat is misschien het meest confronterende inzicht dat ik tegenkwam. Kinderen reageren heftiger op een ouder die er half is, dan op een ouder die er even niet is. Halfaanwezigheid stuurt een boodschap: jij bent niet interessant genoeg voor mijn volledige aandacht.

Niet omdat je een slechte vader bent. Maar omdat je brein, net als dat van iedereen, gewend is geraakt aan constante prikkels. Je telefoon is ontworpen om je aandacht te vangen. Je kind niet.

## Het experiment

Ik ga het een week proberen. Elke dag een moment kiezen - het hoeft niet lang te zijn - waarin ik er helemaal ben. Telefoon weg. Ogen op haar. Luisteren alsof het de eerste keer is.

Ik ben benieuwd wat er verandert. Niet bij haar. Bij mij.

---

*Meer lezen over aanwezigheid? In de cursus Aanwezig Vaderschap duiken we dieper in wat er gebeurt als je kind merkt dat je er echt bent - en wat je kunt doen om dat vaker te laten gebeuren.*
    `,
  },
  'driftbuien-begrijpen': {
    title: 'Afgelopen Zaterdag in de Albert Heijn',
    description: 'Mijn zoon lag krijsend op de grond bij de kassa. Iedereen keek. Dit is wat ik leerde.',
    date: '2026-02-15',
    readTime: 3,
    category: 'Emotiecoaching',
    content: `
## Gang 7, tussen de koekjes en het brood

Mijn zoon van vier wilde een pakje koekjes. Ik zei nee. Hij zei het nog een keer. Ik zei weer nee. En toen ging hij naar de grond alsof iemand de stekker eruit trok.

Volledig. Volume op tien. Armen, benen, snot, tranen.

Een vrouw keek me aan met die blik. Je weet welke. Die blik die zegt: "Kun je je kind niet even..."

## Wat ik vroeger deed

Twee jaar geleden had ik een van deze drie dingen gedaan:

1. Toegeven. ("Oké, eentje dan." = rust, maar dan weet hij: schreeuwen werkt.)
2. Dreigen. ("Als je niet stopt, gaan we weg." = misschien rust, maar hij leert niks.)
3. Negeren en doorlopen. ("Hij houdt vanzelf op." = klopt, maar wat voelt hij ondertussen?)

## Wat ik nu deed

Ik ging op mijn hurken zitten. Midden in gang 7. Terwijl mensen om ons heen liepen. Ik zei iets. Iets simpels. En het veranderde de situatie.

Ik ga niet precies vertellen wat ik zei, want het klinkt te simpel. Je zou het lezen en denken: dat kan niet werken. Maar het gaat niet om de woorden. Het gaat om wat er in het brein van je kind gebeurt op dat moment. En dat is fascinerender dan je denkt.

## Wat ik sindsdien weet

Een driftbui is geen gedragsprobleem. Het is een brein dat overbelast is. Letterlijk. Het deel dat nadenkt en remt is bij een vierjarige nog nauwelijks ontwikkeld. Wat wel werkt, is het alarmsysteem. En dat staat op volle sterkte aan.

Straffen op dat moment is zoiets als iemand uitleggen hoe een brandblusser werkt terwijl het huis in brand staat. Eerst moet het vuur uit.

De vraag is alleen: hoe?

---

*In de cursus Emotiecoaching voor Vaders leer je precies wat er in het brein van je kind gebeurt tijdens een driftbui, en hoe je het kunt kalmeren in plaats van escaleren. Het is minder ingewikkeld dan je denkt - en effectiever dan je hoopt.*
    `,
  },
  'grenzen-zonder-schreeuwen': {
    title: 'Ik Heb Het Al Drie Keer Gezegd',
    description: 'Waarom je kind niet luistert als je het voor de vierde keer zegt. (Hint: het ligt niet aan je kind.)',
    date: '2026-02-10',
    readTime: 3,
    category: 'Grenzen',
    content: `
## Het getal is altijd drie

Eerste keer: rustig. Vriendelijk zelfs. "Kom je aan tafel?"

Tweede keer: iets luider. Iets minder vriendelijk. "Ik zei: kom aan tafel."

Derde keer: de stem die je niet herkent als de jouwe. "KOM. NU. AAN. TAFEL."

En dan luistert je kind. Niet omdat je het drie keer hebt gezegd. Maar omdat je kind heeft geleerd dat de eerste twee keer niet tellen.

## Een ongemakkelijke waarheid

Je kind is niet het probleem. Je patroon is het probleem. En ik zeg dat als vader die precies hetzelfde deed. Jaren.

Je kind heeft geleerd: papa meent het pas als hij schreeuwt. Dus bij de eerste keer denkt het: dat is de "preview-papa". Bij de tweede: "oké, het wordt serieuzer." Bij de derde: "ah, nu meent hij het."

Jij traint je kind onbewust om pas bij schreeuwen te luisteren.

## Wat als je het omdraait?

Stel je voor dat je kind de eerste keer al weet: papa meent het. Niet omdat je strenger bent. Niet omdat je dreigt. Maar omdat je iets anders doet.

Het klinkt als een trucje. Het is geen trucje. Het is een andere manier van communiceren. En het verschil zit in drie dingen die je meteen kunt herkennen als je ze eenmaal ziet.

## Streng is niet hetzelfde als hard

Dat is de fout die de meeste vaders maken. Ze denken dat grenzen stellen betekent: harder zijn. Meer volume. Meer dreiging.

Maar de vaders die het beste grenzen stellen, zijn vaak de rustigste in de kamer. Ze hoeven niet te schreeuwen. Hun kind weet: dit is het. Niet omdat papa eng is. Maar omdat papa duidelijk is.

Het verschil tussen streng en hard? Eentje bouwt vertrouwen op. De ander breekt het af.

---

*Hoe je grenzen stelt die je kind de eerste keer serieus neemt - zonder te schreeuwen, dreigen of eindeloos te herhalen? Dat leer je in de cursus Grenzen Stellen met Liefde.*
    `,
  },
  'herstellen-na-fout': {
    title: 'Vanmorgen Was Ik Die Vader',
    description: 'Ik schreeuwde om een beker melk. Mijn dochter keek me aan. En ik zag het.',
    date: '2026-02-05',
    readTime: 3,
    category: 'Herstel',
    content: `
## Het was maar een beker melk

Ze morste. Weer. Derde keer deze week. En ik hoorde mezelf zeggen: "KUN JE NIET EENS NORMAAL DRINKEN?"

De stilte daarna was oorverdovend.

Mijn dochter van zeven keek me aan. Niet boos. Niet huilend. Erger. Ze keek alsof ze heel even niet zeker wist of ze veilig was.

Over een beker melk.

## Tien minuten later

Ik zat in de keuken. Handen om een kop koffie. Met dat gevoel dat elke vader kent: de combinatie van schaamte en de neiging om te doen alsof het niet gebeurd is.

Het liefst wilde ik de tv aanzetten en een koekje geven. Het wegwuiven. "Papa was even moe." Klaar.

Maar ik wist dat dat precies het verkeerde was.

## Zeventig procent

Onderzoekers ontdekten iets dat me enorm geruststelde. Zelfs bij de beste ouder-kind relaties klopt de afstemming maar in 30% van de gevallen. De overige 70% is misafstemming. Momenten waarin het niet klopt. Waarin je verkeerd reageert. Waarin je kind iets anders nodig had dan wat je gaf.

Zeventig procent. Dat is niet falen. Dat is normaal.

Het verschil tussen een sterke band en een zwakke band zit niet in het voorkomen van die momenten. Het zit in wat je erna doet.

## Wat ik deed

Ik ging terug naar haar kamer. Ik ging op mijn hurken zitten. En ik zei iets.

Het kostte me moeite. Mijn trots verzette zich. Mijn eerste impuls was om het te verzachten: "sorry, maar jij moet ook beter opletten." Dat deed ik niet.

Ik zeg niet precies wat ik zei, want een goed herstelgesprek hangt af van de situatie, de leeftijd van je kind en wat er precies gebeurd is. Maar ik kan je dit vertellen: het duurde minder dan een minuut. En haar reactie verraste me.

Ze knuffelde me. En zei: "Het geeft niet papa. Het was maar melk."

Ze vergaf me sneller dan ik mezelf vergaf.

---

*Herstellen na een fout is een vaardigheid. En net als elke vaardigheid kun je het leren. In de cursus Herstel na Conflict leer je hoe je terugkomt na een breuk - op een manier die de band sterker maakt dan daarvoor.*
    `,
  },
  'waarom-je-kind-je-triggers': {
    title: 'De Omgegooid Beker',
    description: 'Je overleeft een werkdag van acht uur zonder je stem te verheffen. Maar een beker melk? Dat is de druppel.',
    date: '2026-01-28',
    readTime: 3,
    category: 'Zelfregulatie',
    content: `
## Op werk ben je een held

Je hebt een collega die je halverwege een zin onderbreekt. Een manager die om vijf uur een "urgent" verzoek stuurt. Een klant die belt om te klagen over iets dat niet jouw schuld is.

En jij? Jij blijft rustig. Professioneel. Beheerst.

Dan kom je thuis. Je zoon van vier gooit zijn beker melk om. En jij ontploft.

## Dat is raar, toch?

Op werk kun je acht uur lang omgaan met frustratie, onredelijkheid en stress. Maar thuis, bij de persoon van wie je het meeste houdt, verlies je het bij een beker melk.

Dat is niet omdat je een slechte vader bent. Het is niet omdat je kind vervelend is. Het is omdat je kind toegang heeft tot een laag in jou waar je collega's niet bij kunnen.

## De onzichtbare rugzak

Je draagt iets mee. Iedereen doet dat. Onzichtbaar, maar zwaar. Het zijn de patronen uit je eigen jeugd. De stemmen die je als kind hoorde. De regels die er waren. De dingen die wel en niet mochten.

Misschien werd er thuis geschreeuwd als je morste. Misschien werd er gezucht. Misschien werd er niks gezegd, maar voelde je het ongenoegen hangen.

Je brein heeft dat opgeslagen. Niet als herinnering, maar als alarm. En wanneer je eigen kind morst, gaat dat alarm af. Niet om de melk. Om iets van lang geleden.

## Het window

Er is een concept in de psychologie dat "window of tolerance" heet. Het beschrijft de zone waarbinnen je goed functioneert - geduldig, creatief, rustig. Buiten die zone ga je ofwel in de overdrive (boosheid, schreeuwen) of in de shutdown (afwezig, koud).

Na een werkdag is je window smaller. Na slaapgebrek is het nóg smaller. Na ruzie met je partner is het een spleetje.

Die beker melk was niet de oorzaak. Het was de druppel in een emmer die al vol zat.

## De vraag

De vraag is niet: hoe voorkom ik dat mijn kind me triggert? Dat kun je niet. Kinderen zijn ontworpen om op je knoppen te drukken.

De vraag is: wat doe ik met die trigger? En daar begint iets moois.

---

*In de cursus Zelfregulatie als Vader leer je wat er in je zenuwstelsel gebeurt op het moment dat je de controle verliest - en hoe je het kunt opvangen voordat het escaleert.*
    `,
  },
  'loslaten-zonder-angst': {
    title: 'De Jas Met De Rits',
    description: 'Mijn dochter wil haar jas zelf dichtritsen. Het duurt. Het duurt lang. Mijn handen jeuken.',
    date: '2026-01-20',
    readTime: 3,
    category: 'Autonomie',
    content: `
## Twee minuten en drieendertig seconden

Zo lang deed mijn dochter van vier erover om haar jas dicht te ritsen. Ik heb het geteld. Niet met een stopwatch, maar in mijn hoofd. Terwijl mijn handen jeukten. Terwijl ik al drie keer bijna had gezegd: "Zal ik even?"

Ze worstelde. Het lukte niet. Het lukte bijna. Het lukte weer niet. Ze blies haar haar uit haar gezicht. Probeerde het opnieuw.

En toen: klik.

Ze keek naar me op. Stralend. "IK DID HET ZELF!"

## Wat ik bijna deed

Ik deed bijna wat ik altijd doe: overnemen. Het gaat sneller. Het gaat beter. We zijn al laat. Allemaal waar.

Maar wat had ze geleerd als ik het had overgenomen? Dat papa het sneller kan. Dat zij het blijkbaar niet kan. Dat als iets moeilijk is, iemand anders het wel voor je doet.

## De paradox

Het gekke aan opvoeden is dat je beschermingsinstinct soms precies het tegenovergestelde doet van wat je kind nodig heeft. Je wilt ze behoeden voor frustratie. Maar frustratie is de brandstof van groei.

Je wilt ze beschermen tegen falen. Maar een kind dat nooit mag falen, leert nooit dat het kan opstaan.

De moeilijkste verschuiving in het vaderschap is die van beschermer naar coach. Van "ik doe het voor je" naar "ik geloof dat jij het kunt."

## De jas

Die jas was maar een jas. Maar dat moment was meer dan een rits.

Het was mijn dochter die leerde: ik kan iets moeilijks. Het was mij die leerde: soms is wachten het moeilijkste dat een vader kan doen. En het meest waardevolle.

Twee minuten en drieendertig seconden. Dat is de prijs van zelfvertrouwen.

---

*Meer weten over hoe je je kind ruimte geeft zonder de verbinding te verliezen? De cursus Autonomie en Loslaten helpt je om de balans te vinden tussen beschermen en loslaten - voor elke leeftijd.*
    `,
  },
  'praten-met-je-tiener': {
    title: 'Het Gesprek Dat Niet Aan Tafel Gebeurde',
    description: 'Mijn zoon praat niet met mij. Behalve in de auto. Om kwart over tien. In het donker.',
    date: '2026-01-12',
    readTime: 3,
    category: 'Verbinding',
    content: `
## "Hoe was school?" "Goed."

Drie jaar lang was dat ons gesprek. Mijn zoon van veertien en ik. Elke dag hetzelfde script.

Ik probeerde het anders. "Wat heb je gedaan?" "Niks." "Alles oké?" "Ja." En dan draaide hij zich om, oortjes in, deur dicht.

Ik dacht: ik verlies hem.

## De autorit

Het gebeurde op een dinsdagavond. Ik haalde hem op van voetbaltraining. Halfelf. Donker. Radio stond zacht aan.

Ik stelde geen vraag. Ik reed gewoon. Vijf minuten stilte. Toen begon ik over iets dat mij was overkomen op werk. Niks bijzonders. Een collega die iets raars had gezegd. Ik vertelde het meer aan mezelf dan aan hem.

"Wat zei hij dan?"

Ik keek opzij. Hij keek niet naar mij. Hij keek uit het raam. Maar hij luisterde.

Tien minuten later wist ik meer over zijn leven dan in de afgelopen drie maanden.

## Waarom daar?

Ik begreep het niet. Waarom praat hij in de auto maar niet aan tafel? Waarom om halfelf maar niet om zes uur? Waarom naast mij maar niet tegenover mij?

Toen ik het opzocht, viel alles op zijn plek. Het bleek dat er een verklaring was die niks te maken had met mijn opvoeding of met zijn puberteit. Het zat in iets veel simpelers: de positie.

Meer vertel ik niet. Want dit inzicht veranderde alles voor mij, en ik gun je dat je het zelf ontdekt.

## Wat ik nu doe

Ik plan geen gesprekken meer. Ik creeer momenten. En soms zegt hij niks. En soms zegt hij alles. En ik heb geleerd dat beide oké is.

Het enige wat ik doe is: er zijn. Naast hem. Zonder agenda.

---

*In de cursus Verbinding met je Tiener ontdek je waarom bepaalde settings werken en andere niet, en hoe je momenten van verbinding kunt creeren zonder ze te forceren.*
    `,
  },
  'reflecteren-als-vader': {
    title: 'Ik Lijk Mijn Vader Wel',
    description: 'Je hoort jezelf schreeuwen en denkt: dit is niet wie ik wil zijn. Maar het is wie je bent op de automatische piloot.',
    date: '2026-01-05',
    readTime: 3,
    category: 'Reflectie',
    content: `
## Die stem

Het was een donderdagavond. Moe. Lang dag. Mijn zoon wilde niet naar bed. Ik opende mijn mond en hoorde een stem die niet van mij was.

Het was de stem van mijn vader.

Dezelfde toon. Dezelfde woorden bijna. "Als je niet nu naar boven gaat..."

Ik stopte halverwege de zin. Niet omdat ik wilde stoppen. Maar omdat ik schrok van wat ik hoorde.

## De automatische piloot

De meeste vaders functioneren op automatische piloot. Je kind doet iets, jij reageert. Snel. Instinctief. En vaak op precies dezelfde manier als je zelf bent opgevoed.

Niet omdat je dat wilt. Maar omdat je brein terugvalt op de patronen die het kent. Onder stress ga je niet nadenken over wat de beste reactie is. Je doet wat je lichaam heeft geleerd.

En je lichaam heeft geleerd van jouw ouders.

## De rugzak

Ik noem het de rugzak. Iedereen heeft er een. Onzichtbaar, maar altijd mee. Erin zitten de regels van je eigen jeugd. De manier waarop er werd omgegaan met boosheid. Met verdriet. Met grenzen. Met liefde.

Sommige dingen in die rugzak zijn waardevol. Andere zitten in de weg.

De vader die nooit in zijn rugzak kijkt, geeft alles ongesorteerd door aan zijn kind. De vader die er wel in kijkt, kan kiezen: dit geef ik door. En dit laat ik hier stoppen.

## De vraag die alles verandert

Een onderzoeker ontdekte dat het sterkste voorspellende vermogen voor goed ouderschap niet is hoeveel boeken je leest, hoeveel cursussen je volgt, of hoe je eigen jeugd was.

Het is hoe goed je begrijpt waarom je doet wat je doet.

Eenvoudiger gezegd: de vader die snapt waarom hij boos wordt, is al aan het veranderen.

Niet omdat hij het perfect doet. Maar omdat hij niet meer op de automatische piloot staat.

## Eenzelf vraag

Ik stel mezelf tegenwoordig een vraag. Een keer per week. Het kost me vijf minuten en het heeft meer veranderd dan welk boek ook.

Welke vraag? Dat bewaar ik. Maar ik kan je vertellen dat het antwoord elke week anders is. En elke week een beetje eerlijker.

---

*In de cursus Reflectief Vaderschap leer je de patronen uit je eigen opvoeding herkennen, begrijpen en bewust kiezen wat je wel en niet doorgeeft. Het is de meest onderschatte vaardigheid in het vaderschap.*
    `,
  },
  'kind-luistert-niet': {
    title: 'Hij Keek Me Recht Aan En Deed Het Toch',
    description: 'Je kind hoort je wel, maar luistert niet. Dat verschil veranderde alles voor mij als vader.',
    date: '2026-02-25',
    readTime: 3,
    category: 'Grenzen',
    content: `
## Ik stond in de deuropening

Mijn zoon van zes zat op de grond. Lego. Overal. Ik had net gezegd: "Ruim je Lego op, we gaan eten."

Hij keek me aan. Recht in mijn ogen. En ging gewoon door met bouwen.

Geen protest. Geen "nee". Geen driftbui. Gewoon... negeren. Alsof ik lucht was.

## De tien-keer-test

Ik begon te tellen. Niet bewust, maar achteraf. Op een dinsdag hield ik bij hoe vaak ik iets zei dat hij niet deed. Tien keer. Tien keer op een avond. Opruimen, schoenen aan, handen wassen, niet rennen, niet schreeuwen, aan tafel komen, groente eten, tanden poetsen, pyjama aan, naar bed.

Tien keer vroeg ik iets. Tien keer moest ik het herhalen. Soms twee keer. Soms vier keer.

Ik was de hele avond aan het zenden. En hij had de ontvanger uitgezet.

## Het probleem was niet zijn oren

Mijn eerste gedachte was: hij luistert niet. Mijn tweede gedachte - en die kwam pas weken later - was: hij hoort me wel. Hij luistert alleen niet. En dat is een belangrijk verschil.

Want als een kind je niet hoort, is de oplossing: harder praten. Maar als een kind je wel hoort en niet luistert, dan is de vraag anders. Dan is de vraag: waarom neemt hij jou niet serieus?

Dat is een ongemakkelijke vraag. Maar het eerlijke antwoord veranderde hoe ik met hem praat.

## Wat ik ontdekte

Er is iets wat onderzoekers "instructiemoeheid" noemen. Het punt waarop een kind zoveel opdrachten krijgt dat het brein stopt met reageren. Niet uit ongehoorzaamheid. Uit overbelasting.

Mijn zoon luisterde niet omdat ik te veel zei. En te weinig deed.

Wat ik nu anders doe? Dat vertel ik niet in een blog. Maar ik kan zeggen: het is simpeler dan ik dacht. En het begint niet bij hem. Het begint bij mij.

---

*In de cursus Grenzen Stellen met Liefde leer je waarom je kind niet luistert bij de eerste keer - en hoe je dat kunt veranderen zonder harder te praten.*
    `,
  },
  'peuter-driftbui-wat-doen': {
    title: 'Drie Jaar Oud En De Baas Van Het Hele Huis',
    description: 'Mijn peuter krijste alsof de wereld verging. Over een banaan. Dit is wat ik leerde over dat kleine brein.',
    date: '2026-02-22',
    readTime: 3,
    category: 'Emotiecoaching',
    content: `
## De banaan was verkeerd

Niet de verkeerde banaan. Dezelfde banaan. Maar ik had hem gepeld. En zij wilde hem zelf pellen.

Dus nu stond mijn dochter van drie in de keuken, schreeuwend, huilend, stampend, wijzend naar de banaan alsof ik een misdaad had begaan. "IK WIL HEM HEEL! MAAK HEM HEEL!"

Ik stond daar met een gepelde banaan en dacht: dit is mijn leven nu.

## De onmogelijke eis

Ze wilde dat ik de banaan weer heel maakte. Dat kan niet. Dat wist ik. Dat wist zij ook. Maar haar brein kon dat op dat moment niet verwerken.

Mijn eerste reactie was logisch. Ik legde uit dat een banaan niet terug kan. Ik was redelijk. Kalm. Volwassen.

Het maakte alles erger.

## Wat er van binnen gebeurt

Een peuterbrein is als een auto met een gaspedaal en geen rem. Het deel dat emoties voelt - de amygdala - werkt prima. Het deel dat emoties remt en reguleert - de prefrontale cortex - is nog een bouwput.

Daarom is redeneren met een peuter midden in een driftbui zoiets als uitleggen hoe de motor werkt tegen iemand die net uit een achtbaan stapt. De informatie komt niet aan. Het systeem is overbelast.

## De banaan daarna

Ik ging naast haar zitten op de keukenvloer. Ik zei niet dat het onzin was. Ik zei niet dat ze moest stoppen. Ik deed iets anders. Iets waar mijn verstand zich tegen verzette, maar wat haar brein nodig had.

Binnen twee minuten zat ze op mijn schoot. Met een gepelde banaan. Etend. Alsof er niks was gebeurd.

Die twee minuten leerden me meer over driftbuien dan alle opvoedboeken die ik had gelezen.

---

*In de cursus Emotiecoaching voor Vaders leer je wat er in het peuterbrein gebeurt tijdens een driftbui en hoe je de kalmte terug brengt - zonder te redeneren, te dreigen of toe te geven.*
    `,
  },
  'schuldgevoel-als-vader': {
    title: 'De Stem Die Zegt Dat Je Het Niet Goed Genoeg Doet',
    description: 'Schuldgevoel als vader. Het zit er altijd. Na het schreeuwen. Na het werken. Na alles. Maar klopt het wel?',
    date: '2026-02-18',
    readTime: 3,
    category: 'Herstel',
    content: `
## Maandagochtend, half acht

Mijn dochter stond bij de deur. Jas aan. Rugzak om. Ze keek me aan en zei: "Papa, ga je vandaag weer zo laat werken?"

Ik zei: "Nee schat, vandaag niet."

Ik werkte tot half zeven.

Op de terugweg in de auto begon het. Die stem. Je kent hem wel. Die stem die een lijstje opsomt van alles wat je die dag niet was. Niet op tijd thuis. Niet bij het eten. Niet bij het voorlezen.

## Het lijstje wordt nooit korter

Het rare aan schuldgevoel als vader is dat het er altijd is. Als je werkt, voel je je schuldig dat je niet thuis bent. Als je thuis bent, voel je je schuldig dat je afgeleid bent. Als je streng bent, voel je je schuldig. Als je toegeeft, voel je je schuldig.

Er is altijd een versie van jou die het beter doet. Die eerdere vader. Die geduldige vader. Die vader op Instagram die zondagochtend pannenkoeken bakt met bloem op zijn neus.

## De valkuil

Schuldgevoel voelt productief. Het voelt alsof het betekent dat je het serieus neemt. Dat je een goede vader bent juist omdat je je schuldig voelt.

Maar dat klopt niet. Schuldgevoel is geen bewijs van betrokkenheid. Het is een signaal dat je jezelf beoordeelt met een maatstaf die niet klopt.

En hier wordt het interessant: de meeste vaders hebben nooit stilgestaan bij waar die maatstaf vandaan komt. Wie heeft bepaald wat een goede vader is? Jouw eigen vader? Een boek? Een gevoel?

## De ontdekking

Ik ontdekte iets dat me meer rust gaf dan wat ook. Het was geen trucje en geen techniek. Het was een inzicht over hoe schuldgevoel werkt - en waarom het bijna altijd over het verleden gaat, nooit over dit moment.

Dat inzicht veranderde niet wat ik doe. Het veranderde hoe ik naar mezelf kijk terwijl ik het doe.

---

*In de cursus Herstel na Conflict leer je hoe je omgaat met schuldgevoel, hoe je herstelt na momenten waar je spijt van hebt, en hoe je de maatstaf verschuift van perfectie naar verbinding.*
    `,
  },
  'vader-burn-out-opvoeding': {
    title: 'Ik Had Niks Meer Over',
    description: 'Opvoeden op een leeg reservoir. Als vader alles geven tot er niks meer is. Herkenbaar?',
    date: '2026-02-14',
    readTime: 3,
    category: 'Zelfregulatie',
    content: `
## Het moment dat ik het wist

Mijn zoon vroeg of ik mee wilde spelen. Gewoon. Lego. Op de grond. Iets wat ik normaal leuk vind.

En ik voelde niks. Geen zin. Geen energie. Geen boosheid zelfs. Gewoon... leeg.

Ik zei: "Straks." Maar ik wist dat straks niet zou komen. Niet vandaag. En morgen waarschijnlijk ook niet.

## De checklist

Moe. Altijd moe. Slaap hielp niet. Weekend hielp niet. Vakantie hielp niet.

Kort lontje. Korter dan normaal. Dingen die me vroeger niks deden - een glas dat omvalt, schoenen die weer niet in de gang staan - voelden als persoonlijke aanvallen.

Afstand. Van mijn kinderen. Van mijn partner. Van mezelf. Functioneren op de automatische piloot. Ochtend doorkomen, dag doorkomen, avond doorkomen. Herhaal.

Ik herkende de tekenen niet. Want vaders hebben geen burn-out. Vaders zijn moe. Dat is iets anders. Toch?

## Het verschil

Er is een verschil tussen moe zijn en op zijn. Moe zijn is een volle dag en een goed bed. Op zijn is een gevoel dat slaap niet oplost. Het is het punt waarop je zenuwstelsel niet meer terugkeert naar de basislijn.

Onderzoekers noemen het "parental burnout" en het treft meer vaders dan je denkt. Niet de vaders die niet betrokken zijn. Juist de vaders die alles willen geven. Die de lat hoog leggen. Die elke avond beschikbaar zijn, elke vraag beantwoorden, elk gevoel opvangen.

Tot er niks meer over is om te geven.

## Wat ik moest leren

Ik moest leren dat je pas iets kunt geven als er iets in de tank zit. Dat klinkt als een dooddoener. Maar de manier waarop je dat doet - als vader, met een baan, met kinderen die je nodig hebben - is minder vanzelfsprekend dan het klinkt.

Het begint met iets dat ik nooit eerder had gedaan. Iets kleins. Maar het was het begin van de weg terug.

---

*In de cursus Zelfregulatie als Vader leer je de signalen van overbelasting herkennen, hoe je je zenuwstelsel weer in balans brengt, en hoe je een noodplan bouwt voor de momenten waarop je niks meer over hebt.*
    `,
  },
  'quality-time-kind': {
    title: 'Het Moment Dat Ik Mijn Telefoon In De Lade Legde',
    description: 'Quality time hoeft geen uitje te zijn. Soms is het vijf minuten op de grond met je volle aandacht.',
    date: '2026-02-11',
    readTime: 3,
    category: 'Aanwezigheid',
    content: `
## Dierentuin, speeltuin, pretpark

Ik was de vader van de uitjes. Elke zaterdag iets. Dierentuin. Speeltuin. Pannenkoekenhuis. Ik plande het doordeweeks al. Voelde me er goed bij. Kijk mij. Betrokken vader.

Tot mijn vrouw iets zei dat bleef hangen. "Hij wil niet nog een uitje. Hij wil gewoon dat je op de grond gaat zitten."

## Op de grond

Die zaterdag deed ik niks. Geen plan. Geen auto. Ik ging naast mijn zoon op de grond zitten. Met zijn dinosaurussen. Telefoon in de lade.

De eerste vijf minuten waren ongemakkelijk. Ik wist niet wat ik moest doen. Ik zat daar maar. Met een plastic T-Rex in mijn hand.

Maar hij begon te praten. Over school. Over een jongen die gemeen was. Over een droom die hij had gehad. Over een plan om een ruimteschip te bouwen van dozen.

Na twintig minuten keek hij me aan en zei: "Dit is de leukste dag."

We hadden niks gedaan.

## De mythe van kwaliteitstijd

Ergens zijn we gaan geloven dat quality time iets bijzonders moet zijn. Iets met een kaartje en een parkeerplek. Iets wat je plant in je agenda.

Maar kinderen meten quality time niet in activiteiten. Ze meten het in aandacht. Onverdeelde, ongehaaste, volledige aandacht. En dat is iets dat je niet kunt kopen. Alleen geven.

Het verschil tussen een vader die er is en een vader die echt aanwezig is, zit niet in de hoeveelheid tijd. Het zit in de kwaliteit van de aandacht in die tijd.

## De lade

Mijn telefoon zit nu vaker in de lade. Niet de hele dag. Maar er zijn momenten - twintig minuten, soms een halfuur - waarin hij daar ligt en ik op de grond zit.

Het voelt niet altijd bijzonder. Maar voor hem wel. En langzaam ook voor mij.

---

*In de cursus Aanwezig Vaderschap leer je waarom twintig minuten volle aandacht meer doet dan een hele dag half aanwezig zijn - en hoe je die momenten inbouwt in een druk bestaan.*
    `,
  },
  'kind-bang-in-donker': {
    title: 'Er Zit Een Monster Onder Mijn Bed',
    description: 'Mijn zoon is bang in het donker. Elke avond weer. Ik zei dat er niks was. Dat hielp niet.',
    date: '2026-02-08',
    readTime: 3,
    category: 'Emotiecoaching',
    content: `
## Elke avond hetzelfde

"Papa, ik durf niet." Staand in de deuropening. Knuffel tegen zich aan. Ogen groot.

Mijn zoon van vijf is bang in het donker. Al maanden. Elke avond. Soms om acht uur. Soms om half elf. Soms twee keer per nacht.

Ik had alles geprobeerd. Nachtlampje. Deur op een kier. Monsterspray. Ik had zelfs onder het bed gekeken terwijl hij toekeek. "Zie je? Niks."

Maar elke avond stond hij daar weer.

## Wat ik zei

"Er zijn geen monsters. Er is niks om bang voor te zijn. Ga maar lekker slapen."

Logisch. Kloppend. Feitelijk juist.

En totaal nutteloos.

Want zijn brein hoorde iets anders. Zijn brein hoorde: wat jij voelt klopt niet. Jouw angst is niet echt. Wat jij ervaart telt niet.

Ik wilde hem geruststellen. Maar ik ontkende wat hij voelde.

## Het brein in het donker

Angst bij kinderen werkt anders dan bij volwassenen. Wij weten dat er geen monsters zijn. Ons rationele brein kan de angst uitschakelen. Bij een vijfjarige werkt dat nog niet zo. De verbeelding is sterker dan de logica. En in het donker verdwijnt het enige dat geruststelt: wat je kunt zien.

Zeggen dat er niks is, is zoiets als tegen iemand met hoogtevrees zeggen: "Je staat op een brug, er kan niks gebeuren." Klopt. Helpt niet.

## Wat ik leerde

Ik leerde dat de eerste stap niet geruststelling is. De eerste stap is iets anders. Iets wat ik als vader niet gewend was te doen - omdat ik altijd de oplosser wilde zijn.

Die ene verandering in mijn reactie zorgde ervoor dat de avonden langzaam rustiger werden. Niet in een keer. Niet perfect. Maar mijn zoon staat minder vaak in de deuropening. En als hij er staat, duurt het korter.

Niet omdat de monsters weg zijn. Maar omdat hij weet dat papa snapt dat ze er voor hem echt zijn.

---

*In de cursus Emotiecoaching voor Vaders leer je hoe je omgaat met angst, verdriet en boosheid bij je kind - op een manier die geruststelt zonder te ontkennen.*
    `,
  },
  'scheiden-en-vader-zijn': {
    title: 'De Zondag Dat Ik Hem Terugbracht',
    description: 'Vader zijn na een scheiding. De autodeur die dichtslaat. Het stille huis. En toch een goede vader zijn.',
    date: '2026-02-04',
    readTime: 3,
    category: 'Verbinding',
    content: `
## De oprit

Ik zette hem af. Hij rende naar binnen zonder om te kijken. De deur ging dicht. Ik bleef even staan bij de auto.

De stilte op de terugweg was het ergste. Geen gepraat vanaf de achterbank. Geen "papa, nog een liedje." Alleen de radio en mijn gedachten.

Iedere zondag hetzelfde. Twee dagen samen. En dan dat moment bij de oprit.

## Halve vader

Zo voelde het. Alsof ik een halve vader was geworden. De weekendversie. De leuke versie. De versie die pannenkoeken bakt en naar de speeltuin gaat omdat hij niet weet wat hij anders moet.

Doordeweeks miste ik de gewone dingen. Het ontbijt. De ruzie over tandenpoetsen. Het voorlezen. De dingen waar je als vader tegenop ziet tot je ze niet meer hebt.

En in het weekend voelde het alsof ik het moest goedmaken. Twee dagen om te compenseren voor vijf dagen afwezigheid. Dat werd een race. Vol programma. Geen stilte. Want stilte voelde als falen.

## Het gesprek

Een vriend die hetzelfde had meegemaakt zei iets dat bleef hangen. "Je hoeft geen super-vader te zijn in het weekend. Je hoeft gewoon vader te zijn."

Ik wist niet wat hij bedoelde. Tot ik het probeerde.

Ik stopte met plannen. Op een zaterdag deden we niks. Gewoon thuis. Hij speelde. Ik zat op de bank. We kookten samen. Hij morste. Ik morste ook.

Het was de eerste keer in maanden dat het voelde als normaal.

## Wat ik leerde

De band met je kind hangt niet af van het aantal dagen. Het hangt af van de kwaliteit van de momenten. En kwaliteit is niet pannenkoeken en pretparken. Kwaliteit is er zijn. Echt zijn. Ook in de gewone momenten.

Hoe je dat doet als je maar twee dagen hebt - dat is een vaardigheid. En het is minder vanzelfsprekend dan het klinkt.

---

*In de cursus Verbinding met je Tiener ontdek je hoe je een sterke band opbouwt - ook als je niet elke dag samen bent. De principes werken voor elke leeftijd en elke situatie.*
    `,
  },
  'puber-telefoon-verslaving': {
    title: 'De Telefoon Die Nooit Uitgaat',
    description: 'Mijn puber zit de hele dag op zijn telefoon. Ik zei: leg neer. Het werd ruzie. Er is een betere manier.',
    date: '2026-01-30',
    readTime: 3,
    category: 'Grenzen',
    content: `
## Half elf op een schoolavond

Ik liep langs zijn kamer. Deur op een kier. Het blauwe licht van zijn scherm in het donker. Oortjes in. TikTok-geluid.

"Het is half elf. Telefoon uit."

Niks.

"Hoor je me? Telefoon uit."

"Ja ja, zo."

Tien minuten later. Deur open. Hetzelfde scherm. Dezelfde positie. Alsof ik niks had gezegd.

## De ruzie die altijd hetzelfde is

We hadden hem vaker. Dezelfde woorden. Dezelfde frustratie. Ik dreigde de telefoon af te pakken. Hij dreigde met - ja, met wat eigenlijk? Met boos zijn. Met niet praten. Met die stilte die erger is dan schreeuwen.

Ik had het gevoel dat ik hem kwijtraakte aan een scherm. Dat alles wat belangrijk was - school, slaap, het gezin - op de tweede plek kwam na die telefoon.

## Wat ik verkeerd begreep

Ik dacht dat het om de telefoon ging. Dat als ik de telefoon maar kon beperken, het probleem opgelost was.

Maar de telefoon is niet het probleem. De telefoon is de plek waar zijn sociale leven zich afspeelt. Zijn vrienden. Zijn identiteit. Zijn wereld. Voor hem is die telefoon niet een apparaat. Het is de toegang tot alles wat voor hem belangrijk is.

Dat wil niet zeggen dat er geen grenzen nodig zijn. Maar het betekent dat "leg neer" voor hem voelt als: ik ontneem je toegang tot je hele wereld.

Geen wonder dat hij niet luistert.

## De andere aanpak

Ik ontdekte dat er een verschil is tussen grenzen opleggen en grenzen samen vormgeven. Het eerste levert strijd op. Het tweede levert iets anders op - iets wat ik niet had verwacht.

Het kostte een gesprek. En dat gesprek begon niet met regels. Het begon met een vraag.

Welke vraag? Dat bewaar ik. Maar het antwoord verraste me.

---

*In de cursus Grenzen Stellen met Liefde leer je hoe je grenzen stelt die je tiener serieus neemt - zonder machtstrijd.*
    `,
  },
  'nieuwe-baby-als-vader': {
    title: 'De Eerste Nacht Met Drie',
    description: 'Vader worden. Iedereen feliciteert je. Niemand vertelt je dat je je soms verloren voelt. Dit is wat mij hielp.',
    date: '2026-01-25',
    readTime: 3,
    category: 'Aanwezigheid',
    content: `
## Half vier 's nachts

Ze sliep eindelijk. De baby, bedoel ik. Mijn vrouw sliep ook. Het hele huis sliep.

Behalve ik.

Ik zat in de woonkamer. In het donker. Met een kopje thee dat koud was geworden. En een gevoel waar ik geen naam voor had.

Het was niet verdriet. Het was niet angst. Het was iets ertussenin. Een soort verdwaaldheid. Alsof iedereen een handleiding had gekregen behalve ik.

## De felicitaties

Iedereen was blij. "Gefeliciteerd!" "Wat een wonder!" "Geniet ervan!"

En ik glimlachte en knikte en zei de juiste dingen. Maar van binnen dacht ik: ik voel niet wat ik zou moeten voelen.

Ik voelde geen overweldigende liefde. Ik voelde overweldiging. En daaronder, ergens, een stille paniek: ik weet niet wat ik doe.

## Het geheim dat niemand vertelt

Ik dacht dat ik de enige was. De enige vader die niet direct die magische klik voelde. Die niet huilde van geluk in de verloskamer. Die eerder verdoofd was dan ontroerd.

Toen ik het voorzichtig noemde tegen een vriend, zei hij: "Ja. Bij mij ook. Bij iedereen eigenlijk."

Het bleek dat het normaal is. Dat de band tussen vader en kind niet altijd als een bliksemschicht komt. Dat het voor veel vaders langzaam groeit. Door doen. Door er zijn. Door de nachtvoedingen en de verschoningen en de momenten waarop je twijfelt of je het goed doet.

## De ochtend erna

De volgende ochtend pakte ik haar op. Ze was wakker en stil. Ze keek me aan met die ogen die nog nergens naar keken en overal tegelijk.

En ik zei: "Ik weet nog niet precies hoe dit werkt. Maar ik ben er."

Het was geen magisch moment. Maar het was een begin.

---

*In de cursus Aanwezig Vaderschap leer je hoe je vanaf het begin een band opbouwt met je kind - ook als die klik niet meteen komt.*
    `,
  },
  'kind-slaat-andere-kinderen': {
    title: 'Het Telefoontje Van School',
    description: 'Je kind slaat op school. Je schrikt. Je schaamt je. Maar er zit iets achter dat gedrag. Dit is mijn verhaal.',
    date: '2026-01-22',
    readTime: 3,
    category: 'Emotiecoaching',
    content: `
## Dinsdag, kwart over twee

Mijn telefoon ging. Nummer van school. Je weet meteen dat het geen goed nieuws is.

"Uw zoon heeft een ander kind geslagen op het schoolplein."

De rest van het gesprek hoorde ik half. Iets over een conflict bij het voetballen. Een duw. Een klap. Tranen bij het andere kind. Mijn zoon op de gang.

## De schaamte

Eerst voelde ik schaamte. Wat denken ze van mij? Wat voor vader heeft een kind dat slaat? Heb ik iets verkeerd gedaan?

Toen boosheid. Op hem. Hoe vaak hebben we het hierover gehad? Je slaat niet. Punt.

In de auto op weg naar school repeteerde ik mijn toespraak. Streng. Duidelijk. Consequenties.

## De gang

Hij zat op een stoel. Klein. Veel kleiner dan ik me herinnerde. Zijn benen bungelden. Hij keek niet op toen ik binnenkwam.

Ik ging naast hem zitten. De toespraak lag klaar. Maar iets weerhield me.

Ik vroeg: "Wat gebeurde er?"

En toen kwamen de tranen. Niet om straf. Niet om het geslagen kind. Om iets anders. Iets wat al weken speelde. Iets waar hij geen woorden voor had gehad. Tot nu.

## Gedrag is communicatie

Dat leerde ik die middag. Slaan is niet oke. Dat verandert niet. Maar slaan is altijd de buitenkant van iets. Kinderen die slaan, doen dat niet omdat ze agressief zijn. Ze doen het omdat ze iets voelen dat te groot is voor hun lichaam.

De vraag is niet: hoe stop ik het slaan? De vraag is: wat probeert mijn kind me te vertellen?

Het antwoord op die vraag lag niet in straffen. Het lag in iets wat ik die middag voor het eerst probeerde. En het begon met op die stoel gaan zitten.

---

*In de cursus Emotiecoaching voor Vaders leer je het gedrag van je kind lezen als communicatie, en hoe je de emotie achter het gedrag bereikt.*
    `,
  },
  'vader-eigen-emoties': {
    title: 'Ik Was Niet Boos Om De Lego',
    description: 'Je schreeuwt tegen je kind en weet: dit gaat niet over wat er net gebeurde. Waar komt die boosheid vandaan?',
    date: '2026-01-17',
    readTime: 3,
    category: 'Zelfregulatie',
    content: `
## Tien blokjes op de trap

Mijn zoon had Lego laten liggen op de trap. Ik trapte erop. Op sokken. Op die ene hoekige steen die altijd de verkeerde kant op ligt.

Wat ik deed was buitenproportioneel. Ik schreeuwde. Niet een beetje. Vol volume. Over Lego op de trap. Tegen een kind van vijf.

Hij schrok. Ik schrok van mezelf.

## De vraag daarna

Later die avond, toen hij sliep, stelde ik mezelf de vraag: waar ging dat over?

Niet de Lego. Dat wist ik. Je schreeuwt niet zo over tien blokjes. Er zat iets anders achter.

Die dag op werk was zwaar geweest. Mijn leidinggevende had kritiek gegeven op iets waar ik hard aan had gewerkt. Ik had niks gezegd. Geknikt. Professioneel. De boosheid ingeslikt.

En 's avonds, op de trap, kwam het eruit. Niet op mijn leidinggevende. Op mijn zoon.

## Het patroon

Ik begon het te zien. Het was niet de eerste keer. Het was een patroon. Slechte dag op werk: kort lontje thuis. Ruzie met mijn vrouw: ongeduldig met de kinderen. Slecht geslapen: de beker melk die omvalt is een ramp.

Mijn kinderen kregen niet mijn boosheid over hen. Ze kregen mijn boosheid over al het andere.

## De ontdekking

Er is iets wat psychologen "displaced anger" noemen. Verplaatste boosheid. Je kunt de emotie niet uiten waar die hoort, dus zoekt het brein een veiliger doelwit. En wie is er veiliger dan je kind? Dat klinkt hard. Maar het is hoe ons zenuwstelsel werkt.

De oplossing is niet: wees niet boos. Je bent een mens. Boosheid hoort erbij. De oplossing is iets anders. Iets wat begint tussen het moment dat je de Lego voelt en het moment dat je mond opengaat.

Dat moment - die paar seconden - is waar alles verandert. En het is trainbaar.

---

*In de cursus Zelfregulatie als Vader leer je je eigen triggers herkennen, begrijpen waar je boosheid vandaan komt, en hoe je die paar cruciale seconden gebruikt om anders te reageren.*
    `,
  },
  'huiswerk-strijd': {
    title: 'Iedere Avond Hetzelfde Gevecht',
    description: 'Huiswerk. Elke avond strijd. Elke avond ruzie. Ik ontdekte dat het niet over het huiswerk ging.',
    date: '2026-01-14',
    readTime: 3,
    category: 'Grenzen',
    content: `
## Kwart over vijf

De tas ligt in de gang. De boeken zitten erin. Mijn dochter van tien zit op de bank. Telefoon. YouTube.

"Heb je huiswerk?"

"Zo."

Dat "zo" kan alles betekenen. Over vijf minuten. Over een uur. Morgenochtend om half acht in paniek.

Om zes uur zit ze nog op de bank. Om half zeven begin ik. De toon wordt anders. De zinnen korter. "Nu. Huiswerk. Tafel."

Om zeven uur zitten we samen aan tafel. Zij huilend. Ik gefrustreerd. Allebei boos over iets wat niet over sommen gaat.

## Het script

Het was elke avond hetzelfde. Hetzelfde script. Dezelfde woorden. Hetzelfde resultaat. Ik had het gevoel dat ik vastzat in een toneelstuk en mijn tekst niet kon veranderen.

Ik probeerde alles. Belonen. Dreigen. Planningen maken. Stickers. Timer zetten. Niks werkte langer dan drie dagen.

## Het inzicht

Toen vroeg iemand me: "Waar gaat de ruzie eigenlijk over?"

Ik zei: "Huiswerk."

"Nee," zei hij. "Waar gaat het echt over?"

Ik moest erover nadenken. En het antwoord was: controle. Ik wilde controle over wanneer zij haar huiswerk maakte. Zij wilde controle over haar eigen tijd. En elke avond botsten die twee behoeften.

Het huiswerk was het slagveld. Maar de oorlog ging ergens anders over.

## Wat er veranderde

Ik veranderde een ding. Niet het huiswerk. Niet de regels. Niet haar. Ik veranderde het moment waarop ik me ermee bemoeide. En de manier waarop.

Het verschil was klein. Het effect was groot. Niet meteen. Niet perfect. Maar de avonden werden rustiger. En het huiswerk werd haar verantwoordelijkheid in plaats van mijn strijd.

Hoe? Dat is een langer verhaal. Maar het begon met loslaten op de plek waar ik het meest wilde vasthouden.

---

*In de cursus Grenzen Stellen met Liefde leer je hoe je duidelijke verwachtingen stelt zonder machtstrijd - en hoe je de verantwoordelijkheid bij je kind legt zonder de verbinding te verliezen.*
    `,
  },
  'kind-wil-niet-naar-school': {
    title: 'Mama, Mijn Buik Doet Zeer',
    description: 'Je kind wil niet naar school. Elke ochtend strijd. Is het aanstellen? Of is er iets anders aan de hand?',
    date: '2026-01-10',
    readTime: 3,
    category: 'Autonomie',
    content: `
## Maandag, dinsdag, woensdag

Drie ochtenden achter elkaar hetzelfde. Mijn zoon van acht op de rand van zijn bed. "Mijn buik doet zeer."

De eerste dag geloofde ik hem. De tweede dag twijfelde ik. De derde dag was ik gefrustreerd. "Je buik deed gisteren ook al zeer. Je moet gewoon naar school."

Hij ging. Met tegenzin. Met tranen in zijn ogen. En ik reed naar werk met een knoop in mijn maag.

## De twijfel

Is het echt? Stelt hij aan? Is er iets aan de hand? Of is het gewoon een fase?

Dat is het moeilijke als vader. Je wilt niet te snel toegeven. Anders leert hij dat buikpijn een excuus is. Maar je wilt ook niet te snel doorzetten. Want stel dat er echt iets is.

Ik zat ertussenin. Gefrustreerd en bezorgd tegelijk.

## Wat ik niet zag

Het duurde twee weken voor ik de vraag anders stelde. In plaats van "Is je buik echt zeer?" vroeg ik: "Wat gebeurt er op school?"

Stilte. Lang.

Toen: een verhaal over een jongen. Over pauzes alleen. Over een groepje dat hem niet mee liet doen. Over iets wat al weken speelde en waar hij geen woorden voor had.

De buikpijn was echt. Maar de oorzaak zat niet in zijn buik.

## Het lichaam praat

Kinderen hebben niet altijd woorden voor wat ze voelen. Maar hun lichaam praat wel. Buikpijn, hoofdpijn, moeheid - het zijn vaak de signalen van iets wat ze niet kunnen uitleggen.

De reflex is om het gedrag op te lossen: je moet naar school. De kunst is om het signaal te lezen: er is iets waardoor school niet veilig voelt.

Dat wil niet zeggen dat je ze thuis houdt. Het wil zeggen dat je eerst luistert. En dan samen kijkt wat ze nodig hebben om weer te kunnen gaan.

Hoe je dat gesprek voert, hangt af van de leeftijd. Maar het begint altijd op dezelfde plek: naast je kind, in plaats van tegenover.

---

*In de cursus Autonomie en Loslaten leer je hoe je je kind helpt omgaan met moeilijke situaties - zonder het over te nemen, maar ook zonder het alleen te laten.*
    `,
  },
  'stiefvader-tips': {
    title: 'Jij Bent Mijn Vader Niet',
    description: 'Stiefvader worden. Die ene zin die alles samenvat. En wat ik leerde over de rol die niemand je uitlegt.',
    date: '2026-01-07',
    readTime: 3,
    category: 'Verbinding',
    content: `
## De eerste keer dat ze het zei

We zaten aan tafel. Ik had gevraagd of ze haar bord naar de keuken wilde brengen. Iets simpels. Iets wat ik al tien keer had gevraagd.

Ze keek me aan. Negen jaar oud. En zei: "Jij bent mijn vader niet."

Het was alsof iemand een emmer koud water over me heen gooide. De tafel was stil. Haar moeder keek naar haar bord. Ik wist niet wat ik moest zeggen.

## De rol zonder handleiding

Niemand vertelt je hoe je stiefvader moet zijn. Er is geen cursus. Geen script. Geen moment waarop iemand zegt: dit is je rol en zo doe je dat.

Je bent geen vader. Maar je doet vaderdingen. Je brengt naar school. Je helpt met huiswerk. Je bent er als ze ziek is. Maar je bent niet haar vader. En zij laat je dat weten.

De eerste maanden probeerde ik haar vader te zijn. De grenzen te stellen. De regels te handhaven. Consequent te zijn, zoals iedereen zegt dat je moet zijn.

Het maakte alles erger.

## Het gesprek

Op een avond, nadat ze naar bed was, zei haar moeder: "Je hoeft haar vader niet te zijn. Je mag gewoon iemand zijn die er is."

Dat klonk als opgeven. Maar het was het tegenovergestelde.

## Wat ik leerde

Ik leerde dat verbinding niet begint bij autoriteit. Het begint bij vertrouwen. En vertrouwen bouw je niet door regels op te leggen. Vertrouwen bouw je door aanwezig te zijn zonder iets te eisen.

Ik stopte met proberen haar vader te zijn. Ik begon gewoon aanwezig te zijn. Bij het eten. Bij de tv. Bij het schoolplein. Zonder een rol. Zonder verwachtingen.

Het duurde maanden. Maar op een dag, zomaar, kroop ze naast me op de bank. Ze zei niks. Maar het was genoeg.

De band met een stiefkind groeit niet door je rol te claimen. Het groeit door geduld, aanwezigheid en de bereidheid om een relatie te laten ontstaan in plaats van af te dwingen.

---

*In de cursus Verbinding met je Tiener leer je hoe je een band opbouwt die niet afhankelijk is van je officiele rol - maar van echte verbinding. De principes werken voor elke vader, in elke gezinsvorm.*
    `,
  },
  'vader-kind-weekendvader': {
    title: 'Elke Zondag Hetzelfde Afscheid',
    description: 'Weekendvader. Twee dagen per week. De uitdaging om in beperkte tijd een echte band te bouwen.',
    date: '2026-01-03',
    readTime: 3,
    category: 'Verbinding',
    content: `
## De koffer

Klein. Roze. Met een eenhoorn erop. Elke vrijdagmiddag staat ze bij de deur ermee. En elke zondagavond zet ze hem weer bij de andere deur.

Twee dagen. Dat is wat ik heb. Twee dagen per week om vader te zijn.

In het begin telde ik de uren. Achtenveertig uur. Min slapen: tweeendertig uur. Min eten, aankleden, tandjes poetsen: zesentwintig uur. Zesentwintig uur echte tijd. Per week. Het voelde als niks.

## De compensatiereflex

Ik deed wat veel weekendvaders doen: compenseren. Vol programma. Speeltuin, bioscoop, ijsje, zwemmen. Een weekend als een vakantiefolder. Elke minuut gevuld. Alsof stilte betekende dat ik het niet goed deed.

Ze vond het leuk. Maar ze was ook moe. En eerlijk gezegd: ik ook.

Op een zondagavond na zo'n vol weekend zei ze in de auto: "Papa, volgende keer wil ik gewoon thuisblijven."

## Gewoon thuisblijven

De zaterdag erna deden we niks. Ze tekende. Ik las de krant. Ze vroeg of ik mee wilde tekenen. Ik tekende een hond die op een aardappel leek. Ze lachte. We maakten samen tosti's. Ze vertelde over school.

Het was de beste zaterdag in maanden.

## Wat ik snapte

Kinderen willen geen entertainment. Ze willen nabijheid. Het gevoel dat je er bent. Dat ze er mogen zijn zonder dat er iets moet.

Als weekendvader is de verleiding groot om die twee dagen speciaal te maken. Maar speciaal is niet wat je kind nodig heeft. Normaal is wat je kind nodig heeft. Gewoon samen zijn. Zonder agenda.

Het voelt als een paradox: hoe minder je probeert, hoe meer het is. Maar het klopt. Twee dagen echte aanwezigheid is meer waard dan zeven dagen half.

De kunst is leren hoe je in beperkte tijd maximale verbinding creert. En dat begint met het loslaten van de drang om te compenseren.

---

*In de cursus Verbinding met je Tiener ontdek je hoe je echte verbindingsmomenten creert - ook met beperkte tijd.*
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

        <div className="mt-10 pt-6 border-t" style={{ borderColor: 'var(--border)' }}>
          <ShareButtons
            url={`https://devadercoach.nl/blog/${slug}`}
            title={post.title}
          />
        </div>
      </article>
    </div>
  );
}
