import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Algemene Voorwaarden',
  description: 'Algemene voorwaarden van De Vadercoach. Toepasselijkheid, betalingen, herroeping, aansprakelijkheid en meer.',
  openGraph: {
    title: 'Algemene Voorwaarden - De Vadercoach',
    description: 'Algemene voorwaarden van De Vadercoach. Toepasselijkheid, betalingen, herroeping, aansprakelijkheid en meer.',
    type: 'website',
    url: 'https://devadercoach.nl/voorwaarden',
  },
  alternates: {
    canonical: 'https://devadercoach.nl/voorwaarden',
  },
};

export default function VoorwaardenPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
      <h1 className="text-3xl font-extrabold mb-2" style={{ color: 'var(--text)' }}>
        Algemene Voorwaarden
      </h1>
      <p className="text-sm mb-8" style={{ color: 'var(--text3)' }}>Laatst bijgewerkt: 28 februari 2026</p>

      <div className="space-y-6 text-sm leading-relaxed" style={{ color: 'var(--text2)' }}>

        <h2 className="text-lg font-bold pt-4" style={{ color: 'var(--text)' }}>1. Definities</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong style={{ color: 'var(--text)' }}>De Vadercoach</strong> &ndash; de aanbieder van de website devadercoach.nl, de app, de digitale cursussen en alle overige producten en diensten.</li>
          <li><strong style={{ color: 'var(--text)' }}>Klant</strong> &ndash; iedere natuurlijke persoon die een overeenkomst aangaat met De Vadercoach of gebruik maakt van de website, app of producten.</li>
          <li><strong style={{ color: 'var(--text)' }}>Digitale producten</strong> &ndash; alle digitale content aangeboden door De Vadercoach, waaronder PDF-cursussen, de Vader Experience, de gratis snelgids en app-content.</li>
          <li><strong style={{ color: 'var(--text)' }}>Overeenkomst</strong> &ndash; elke afspraak of overeenkomst tussen De Vadercoach en de klant, waarvan deze algemene voorwaarden integraal onderdeel uitmaken.</li>
          <li><strong style={{ color: 'var(--text)' }}>Overeenkomst op afstand</strong> &ndash; een overeenkomst waarbij uitsluitend gebruik wordt gemaakt van middelen voor communicatie op afstand (de website).</li>
        </ul>

        <h2 className="text-lg font-bold pt-4" style={{ color: 'var(--text)' }}>2. Identiteit van de ondernemer</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>Handelsnaam: De Vadercoach</li>
          <li>E-mail: <a href="mailto:info@devadercoach.nl" className="text-amber-400 hover:underline">info@devadercoach.nl</a></li>
          <li>Website: devadercoach.nl</li>
        </ul>

        <h2 className="text-lg font-bold pt-4" style={{ color: 'var(--text)' }}>3. Toepasselijkheid</h2>
        <p>
          Deze algemene voorwaarden zijn van toepassing op elk aanbod van De Vadercoach, elk gebruik van
          de website devadercoach.nl, de De Vadercoach app, de Vader Experience, alle digitale cursussen (PDF)
          en overige digitale producten en diensten. Door gebruik te maken van onze website, app of producten,
          of door een bestelling te plaatsen, ga je akkoord met deze voorwaarden.
        </p>
        <p>
          De tekst van deze voorwaarden wordt voor of bij het sluiten van de overeenkomst aan de klant
          beschikbaar gesteld. Indien dit niet mogelijk is, wordt aangegeven waar de voorwaarden elektronisch
          te raadplegen zijn.
        </p>

        <h2 className="text-lg font-bold pt-4" style={{ color: 'var(--text)' }}>4. Het aanbod</h2>
        <p>De Vadercoach biedt de volgende producten en diensten aan:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong style={{ color: 'var(--text)' }}>Gratis snelgids</strong> &ndash; een gratis PDF-download beschikbaar na het achterlaten van je e-mailadres.</li>
          <li><strong style={{ color: 'var(--text)' }}>Digitale cursussen (PDF)</strong> &ndash; betaalde werkboeken over specifieke vaderschapsvaardigheden. Prijzen staan vermeld op de productpagina en zijn inclusief BTW.</li>
          <li><strong style={{ color: 'var(--text)' }}>Vader Experience</strong> &ndash; een betaald 22-daags interactief programma. De prijs staat vermeld op de productpagina en is inclusief BTW.</li>
          <li><strong style={{ color: 'var(--text)' }}>De Vadercoach app</strong> &ndash; beschikbaar als eenmalige aankoop. De app biedt dagelijkse oefeningen, trainingen over de 8 vadervaardigheden, voortgang bijhouden en een community van vaders.</li>
          <li><strong style={{ color: 'var(--text)' }}>Blogartikelen en gratis content</strong> &ndash; gratis beschikbaar op de website.</li>
        </ul>
        <p>
          Het aanbod bevat een nauwkeurige omschrijving van de aangeboden digitale producten. Kennelijke
          vergissingen of fouten in het aanbod binden De Vadercoach niet.
        </p>

        <h2 className="text-lg font-bold pt-4" style={{ color: 'var(--text)' }}>5. De overeenkomst</h2>
        <p>
          De overeenkomst komt tot stand op het moment dat de klant het aanbod aanvaardt (de bestelling plaatst)
          en aan de daarbij gestelde voorwaarden is voldaan. De Vadercoach bevestigt de ontvangst van de
          aanvaarding per e-mail. Zolang de ontvangst niet is bevestigd, kan de klant de overeenkomst ontbinden.
        </p>

        <h2 className="text-lg font-bold pt-4" style={{ color: 'var(--text)' }}>6. Prijzen en betaling</h2>
        <p>
          Betalingen worden verwerkt door Mollie B.V. Wij accepteren iDEAL, creditcard en andere door Mollie
          aangeboden betaalmethoden. Alle vermelde prijzen zijn in euro&apos;s en inclusief BTW, tenzij
          uitdrukkelijk anders vermeld.
        </p>
        <p>
          De Vadercoach behoudt zich het recht voor om prijzen te wijzigen. Prijswijzigingen gelden niet voor
          reeds afgeronde aankopen. Gedurende de geldigheidsduur van een aanbod worden de prijzen van het
          aangeboden product niet verhoogd, behoudens prijswijzigingen als gevolg van veranderingen in BTW-tarieven.
        </p>

        <h2 className="text-lg font-bold pt-4" style={{ color: 'var(--text)' }}>7. Kortingscodes</h2>
        <p>
          Bij aanmelding voor de nieuwsbrief kun je een persoonlijke kortingscode ontvangen. Kortingscodes zijn
          eenmalig bruikbaar, persoonlijk, niet overdraagbaar, niet inwisselbaar voor geld en hebben een
          beperkte geldigheid (standaard 30 dagen). De Vadercoach behoudt zich het recht voor om kortingsacties
          op elk moment te wijzigen of te beeindigen. Kortingscodes zijn niet te combineren met andere acties
          of kortingen, tenzij uitdrukkelijk anders vermeld.
        </p>

        <h2 className="text-lg font-bold pt-4" style={{ color: 'var(--text)' }}>8. Levering</h2>
        <p>
          Digitale producten (PDF-cursussen, Vader Experience) worden direct na betaling geleverd via een
          downloadlink of toegangscode per e-mail. De Vadercoach streeft ernaar de levering binnen enkele
          minuten na betaling te voltooien. Bij technische problemen neem je contact op via{' '}
          <a href="mailto:info@devadercoach.nl" className="text-amber-400 hover:underline">info@devadercoach.nl</a>{' '}
          en zorgen wij zo snel mogelijk voor levering.
        </p>

        <h2 className="text-lg font-bold pt-4" style={{ color: 'var(--text)' }}>9. Herroepingsrecht</h2>
        <p>
          Op grond van de Wet koop op afstand heb je als consument het recht om een aankoop binnen 14 dagen
          zonder opgave van redenen te ontbinden. Echter, omdat het gaat om digitale content die niet op een
          materiele drager is geleverd en de levering direct na betaling start, vervalt het herroepingsrecht
          zodra de levering is begonnen, conform artikel 6:230p lid 1 sub c van het Burgerlijk Wetboek.
        </p>
        <p>
          Door de aankoop te voltooien ga je er uitdrukkelijk mee akkoord dat de levering direct begint en dat
          je daarmee afstand doet van je herroepingsrecht.
        </p>
        <p>
          <strong style={{ color: 'var(--text)' }}>Niet-goed-geld-terug garantie:</strong> ondanks het vervallen
          van het wettelijk herroepingsrecht bieden wij een vrijwillige 30 dagen niet-goed-geld-terug garantie.
          Niet tevreden? Mail naar{' '}
          <a href="mailto:info@devadercoach.nl" className="text-amber-400 hover:underline">info@devadercoach.nl</a>{' '}
          binnen 30 dagen na aankoop en je krijgt je geld terug. Geen vragen, geen gedoe.
        </p>

        <h2 className="text-lg font-bold pt-4" style={{ color: 'var(--text)' }}>10. Conformiteit</h2>
        <p>
          De Vadercoach staat ervoor in dat de digitale producten voldoen aan de overeenkomst, de in het aanbod
          vermelde specificaties en aan redelijke eisen van deugdelijkheid. De cursussen bevatten het aantal
          pagina&apos;s en hoofdstukken zoals vermeld op de productpagina.
        </p>

        <h2 className="text-lg font-bold pt-4" style={{ color: 'var(--text)' }}>11. Geen professionele hulpverlening</h2>
        <p>
          De Vadercoach biedt educatief en informatief materiaal over vaderschap en opvoeding. Onze producten, de app,
          de Vader Experience en alle overige content zijn <strong style={{ color: 'var(--text)' }}>geen vervanging voor professionele
          psychologische hulp, therapie, medisch advies of enige andere vorm van professionele hulpverlening</strong>.
          De informatie is algemeen van aard en niet afgestemd op jouw persoonlijke situatie. Bij problemen met je
          geestelijke gezondheid, relatie of opvoeding raden wij aan contact op te nemen met een gekwalificeerde professional.
        </p>

        <h2 className="text-lg font-bold pt-4" style={{ color: 'var(--text)' }}>12. Aansprakelijkheid</h2>
        <p>De Vadercoach is op geen enkele wijze aansprakelijk voor:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Directe of indirecte schade die voortvloeit uit het gebruik van of het vertrouwen op de informatie uit onze cursussen, app, Vader Experience of overige content.</li>
          <li>Schade als gevolg van het toepassen van tips, oefeningen of adviezen uit onze producten.</li>
          <li>Schade door onbeschikbaarheid of onjuist functioneren van de website, app of digitale producten.</li>
          <li>Schade door verlies van gegevens, voortgang of toegang tot gekochte producten.</li>
          <li>Gevolgschade, gederfde winst, gemiste besparingen of schade door bedrijfsstagnatie.</li>
        </ul>
        <p>
          De totale aansprakelijkheid van De Vadercoach is in alle gevallen beperkt tot het bedrag dat je hebt betaald
          voor het betreffende product. Gebruik van alle producten en diensten is volledig op eigen risico.
        </p>

        <h2 className="text-lg font-bold pt-4" style={{ color: 'var(--text)' }}>13. Intellectueel eigendom</h2>
        <p>
          Alle content op de website en in de app, inclusief maar niet beperkt tot teksten, cursussen,
          de Vader Experience, ontwerpen, illustraties, logo&apos;s, audio en software, is eigendom van De Vadercoach
          en beschermd door het auteursrecht en andere intellectuele eigendomsrechten.
        </p>
        <p>
          Alle producten en content zijn bedoeld voor persoonlijk gebruik. Verveelvoudiging, verspreiding,
          doorverkoop of publicatie zonder voorafgaande schriftelijke toestemming is niet toegestaan. Bij
          geconstateerde inbreuk behoudt De Vadercoach zich het recht voor om juridische stappen te ondernemen.
        </p>

        <h2 className="text-lg font-bold pt-4" style={{ color: 'var(--text)' }}>14. Affiliate links en aanbevelingen</h2>
        <p>
          Onze website bevat aanbevelingen voor externe producten (boeken, tools) via affiliate links. Wanneer
          je via zo&apos;n link een product koopt, ontvangen wij een kleine commissie. Dit brengt geen extra
          kosten voor jou mee. Wij bevelen alleen producten aan die wij zelf waardevol vinden en relevant achten
          voor vaders. Affiliate links zijn herkenbaar en worden als zodanig aangemerkt.
        </p>

        <h2 className="text-lg font-bold pt-4" style={{ color: 'var(--text)' }}>15. Nieuwsbrief en communicatie</h2>
        <p>
          Bij het downloaden van de gratis snelgids word je aangemeld voor onze nieuwsbrief. Dit wordt
          duidelijk vermeld bij het invullen van je e-mailadres. Je ontvangt een welkomstmail, een reeks
          tips over vaderschap en af en toe een maandelijkse nieuwsbrief met inspiratie en aanbiedingen.
          Elke e-mail bevat een uitschrijflink waarmee je je direct kunt afmelden. Wij delen je e-mailadres
          nooit met derden voor commerciele doeleinden. Zie ook ons{' '}
          <a href="/privacy" className="text-amber-400 hover:underline">privacybeleid</a>.
        </p>

        <h2 className="text-lg font-bold pt-4" style={{ color: 'var(--text)' }}>16. Beschikbaarheid</h2>
        <p>
          De Vadercoach spant zich in om de website en app beschikbaar te houden, maar garandeert geen
          ononderbroken toegang. Wij zijn niet aansprakelijk voor tijdelijke onbeschikbaarheid door onderhoud,
          updates of omstandigheden buiten onze controle (overmacht).
        </p>

        <h2 className="text-lg font-bold pt-4" style={{ color: 'var(--text)' }}>17. Overmacht</h2>
        <p>
          In geval van overmacht is De Vadercoach niet gehouden tot het nakomen van enige verplichting. Onder
          overmacht wordt verstaan: storingen in het internet, storingen in de telecommunicatie-infrastructuur,
          storingen bij toeleveranciers of dienstverleners, stroomonderbrekingen, overheidsmaatregelen, en
          elke andere omstandigheid die redelijkerwijs niet aan De Vadercoach kan worden toegerekend.
        </p>

        <h2 className="text-lg font-bold pt-4" style={{ color: 'var(--text)' }}>18. Klachtenprocedure</h2>
        <p>
          Klachten over de uitvoering van de overeenkomst moeten zo spoedig mogelijk, volledig en duidelijk
          omschreven worden ingediend via{' '}
          <a href="mailto:info@devadercoach.nl" className="text-amber-400 hover:underline">info@devadercoach.nl</a>.
          Wij reageren binnen 14 dagen op je klacht. Als een klacht een langere verwerkingstijd nodig heeft,
          ontvang je een bevestiging met een indicatie wanneer je een uitgebreider antwoord kunt verwachten.
        </p>

        <h2 className="text-lg font-bold pt-4" style={{ color: 'var(--text)' }}>19. Geschillenbeslechting</h2>
        <p>
          Op deze voorwaarden en alle overeenkomsten met De Vadercoach is uitsluitend Nederlands recht van
          toepassing. Geschillen worden bij voorkeur in onderling overleg opgelost. Indien dit niet lukt,
          worden geschillen voorgelegd aan de bevoegde rechter in Nederland.
        </p>
        <p>
          Je kunt een geschil ook voorleggen aan het Europees platform voor onlinegeschillenbeslechting (ODR):{' '}
          <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:underline">
            ec.europa.eu/consumers/odr
          </a>.
        </p>

        <h2 className="text-lg font-bold pt-4" style={{ color: 'var(--text)' }}>20. Wijzigingen</h2>
        <p>
          Wij behouden het recht om deze voorwaarden op elk moment te wijzigen. De meest actuele versie is altijd
          beschikbaar op deze pagina met de bijbehorende datum. Bij wezenlijke wijzigingen informeren wij je
          via e-mail of een melding op de website. Voortgezet gebruik na een wijziging geldt als acceptatie
          van de gewijzigde voorwaarden.
        </p>

        <h2 className="text-lg font-bold pt-4" style={{ color: 'var(--text)' }}>21. Contact</h2>
        <p>
          Vragen over deze voorwaarden? Neem contact op via{' '}
          <a href="mailto:info@devadercoach.nl" className="text-amber-400 hover:underline">info@devadercoach.nl</a>.
        </p>
      </div>
    </div>
  );
}
