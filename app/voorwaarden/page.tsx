import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Algemene Voorwaarden',
  description: 'Algemene voorwaarden van De Vadercoach.',
};

export default function VoorwaardenPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
      <h1 className="text-3xl font-extrabold mb-2" style={{ color: 'var(--text)' }}>
        Algemene Voorwaarden
      </h1>
      <p className="text-sm mb-8" style={{ color: 'var(--text3)' }}>Laatst bijgewerkt: 28 februari 2026</p>

      <div className="space-y-6 text-sm leading-relaxed" style={{ color: 'var(--text2)' }}>
        <h2 className="text-lg font-bold pt-4" style={{ color: 'var(--text)' }}>1. Toepasselijkheid</h2>
        <p>
          Deze algemene voorwaarden zijn van toepassing op elk gebruik van de website devadercoach.nl,
          de De Vadercoach app, de Vader Experience, alle digitale cursussen (PDF) en overige digitale
          producten en diensten aangeboden door De Vadercoach. Door gebruik te maken van onze website,
          app of producten ga je akkoord met deze voorwaarden.
        </p>

        <h2 className="text-lg font-bold pt-4" style={{ color: 'var(--text)' }}>2. Producten en diensten</h2>
        <p>De Vadercoach biedt de volgende producten en diensten aan:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong style={{ color: 'var(--text)' }}>Gratis snelgids</strong> - een gratis PDF-download beschikbaar na het achterlaten van je e-mailadres.</li>
          <li><strong style={{ color: 'var(--text)' }}>Digitale cursussen (PDF)</strong> - betaalde cursussen over specifieke vaderschapsvaardigheden. Prijzen staan vermeld op de productpagina en zijn inclusief BTW.</li>
          <li><strong style={{ color: 'var(--text)' }}>Vader Experience</strong> - een betaald 22-daags interactief programma. De prijs staat vermeld op de productpagina en is inclusief BTW.</li>
          <li><strong style={{ color: 'var(--text)' }}>De Vadercoach app</strong> - gratis te downloaden. De app biedt dagelijkse oefeningen, voortgang bijhouden en toegang tot aangeschafte content.</li>
          <li><strong style={{ color: 'var(--text)' }}>Blogartikelen en gratis content</strong> - gratis beschikbaar op de website.</li>
        </ul>
        <p>Alle producten en content zijn bedoeld voor persoonlijk gebruik en mogen niet worden doorverkocht, gekopieerd of gedeeld zonder schriftelijke toestemming.</p>

        <h2 className="text-lg font-bold pt-4" style={{ color: 'var(--text)' }}>3. Betalingen en prijzen</h2>
        <p>
          Betalingen worden verwerkt door Mollie B.V. Wij accepteren iDEAL, creditcard en andere door Mollie aangeboden
          betaalmethoden. Alle vermelde prijzen zijn in euro&apos;s en inclusief BTW, tenzij uitdrukkelijk anders vermeld.
          De Vadercoach behoudt zich het recht voor om prijzen te wijzigen. Reeds afgeronde aankopen worden niet be&iuml;nvloed
          door prijswijzigingen.
        </p>

        <h2 className="text-lg font-bold pt-4" style={{ color: 'var(--text)' }}>4. Kortingscodes</h2>
        <p>
          Bij aanmelding voor de nieuwsbrief kun je een persoonlijke kortingscode ontvangen. Kortingscodes zijn eenmalig
          bruikbaar, niet overdraagbaar, niet inwisselbaar voor geld en hebben een beperkte geldigheid. De Vadercoach
          behoudt zich het recht voor om kortingsacties op elk moment te wijzigen of te beindigen.
        </p>

        <h2 className="text-lg font-bold pt-4" style={{ color: 'var(--text)' }}>5. Levering en herroepingsrecht</h2>
        <p>
          Digitale producten (PDF-cursussen, Vader Experience) worden direct na betaling geleverd via een downloadlink
          of toegangscode. Omdat het gaat om digitale content die direct na betaling beschikbaar wordt gesteld, vervalt
          het herroepingsrecht zodra de levering is gestart, conform artikel 6:230p lid 1 sub c van het Burgerlijk Wetboek.
          Door de aankoop te voltooien stem je hiermee uitdrukkelijk in en doe je afstand van je herroepingsrecht.
        </p>

        <h2 className="text-lg font-bold pt-4" style={{ color: 'var(--text)' }}>6. Geen professionele hulpverlening</h2>
        <p>
          De Vadercoach biedt educatief en informatief materiaal over vaderschap en opvoeding. Onze producten, de app,
          de Vader Experience en alle overige content zijn <strong style={{ color: 'var(--text)' }}>geen vervanging voor professionele
          psychologische hulp, therapie, medisch advies of enige andere vorm van professionele hulpverlening</strong>.
          De informatie is algemeen van aard en niet afgestemd op jouw persoonlijke situatie. Bij problemen met je
          geestelijke gezondheid, relatie of opvoeding raden wij aan contact op te nemen met een gekwalificeerde professional.
        </p>

        <h2 className="text-lg font-bold pt-4" style={{ color: 'var(--text)' }}>7. Aansprakelijkheid</h2>
        <p>
          De Vadercoach is op geen enkele wijze aansprakelijk voor:
        </p>
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

        <h2 className="text-lg font-bold pt-4" style={{ color: 'var(--text)' }}>8. Intellectueel eigendom</h2>
        <p>
          Alle content op de website en in de app, inclusief maar niet beperkt tot teksten, cursussen,
          de Vader Experience, ontwerpen, illustraties, logo&apos;s, audio en software, is eigendom van De Vadercoach
          en beschermd door het auteursrecht en andere intellectuele eigendomsrechten.
          Verveelvoudiging, verspreiding of publicatie zonder voorafgaande schriftelijke toestemming is niet toegestaan.
        </p>

        <h2 className="text-lg font-bold pt-4" style={{ color: 'var(--text)' }}>9. Nieuwsbrief en communicatie</h2>
        <p>
          Bij het downloaden van de gratis snelgids word je aangemeld voor onze nieuwsbrief. Je ontvangt
          een welkomstmail, een reeks tips over vaderschap en af en toe een maandelijkse nieuwsbrief met
          inspiratie en aanbiedingen. Elke e-mail bevat een uitschrijflink waarmee je je direct kunt afmelden.
          Wij delen je e-mailadres nooit met derden voor commercile doeleinden.
        </p>

        <h2 className="text-lg font-bold pt-4" style={{ color: 'var(--text)' }}>10. Beschikbaarheid</h2>
        <p>
          De Vadercoach spant zich in om de website en app beschikbaar te houden, maar garandeert geen
          ononderbroken toegang. Wij zijn niet aansprakelijk voor tijdelijke onbeschikbaarheid door onderhoud,
          updates of omstandigheden buiten onze controle.
        </p>

        <h2 className="text-lg font-bold pt-4" style={{ color: 'var(--text)' }}>11. Wijzigingen</h2>
        <p>
          Wij behouden het recht om deze voorwaarden op elk moment te wijzigen. De meest actuele versie is altijd
          beschikbaar op deze pagina. Bij wezenlijke wijzigingen informeren wij je via e-mail of een melding op de website.
          Voortgezet gebruik na een wijziging geldt als acceptatie van de gewijzigde voorwaarden.
        </p>

        <h2 className="text-lg font-bold pt-4" style={{ color: 'var(--text)' }}>12. Toepasselijk recht</h2>
        <p>
          Op deze voorwaarden en alle overeenkomsten met De Vadercoach is Nederlands recht van toepassing.
          Geschillen worden voorgelegd aan de bevoegde rechter in Nederland.
        </p>

        <h2 className="text-lg font-bold pt-4" style={{ color: 'var(--text)' }}>13. Contact</h2>
        <p>
          Vragen over deze voorwaarden? Neem contact op via{' '}
          <a href="mailto:info@devadercoach.nl" className="text-amber-400 hover:underline">info@devadercoach.nl</a>.
        </p>
      </div>
    </div>
  );
}
