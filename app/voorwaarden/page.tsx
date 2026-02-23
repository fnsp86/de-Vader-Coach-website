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
      <p className="text-sm mb-8" style={{ color: 'var(--text3)' }}>Laatst bijgewerkt: 23 februari 2026</p>

      <div className="space-y-6 text-sm leading-relaxed" style={{ color: 'var(--text2)' }}>
        <h2 className="text-lg font-bold pt-4" style={{ color: 'var(--text)' }}>1. Toepasselijkheid</h2>
        <p>
          Deze voorwaarden zijn van toepassing op het gebruik van de website devadercoach.nl,
          de De Vadercoach app en alle aankopen van digitale producten (PDF-cursussen).
        </p>

        <h2 className="text-lg font-bold pt-4" style={{ color: 'var(--text)' }}>2. Producten</h2>
        <p>
          Onze producten zijn digitale PDF-cursussen. Na betaling ontvang je een downloadlink per e-mail.
          Cursussen zijn bedoeld voor persoonlijk gebruik en mogen niet worden doorverkocht of gedeeld.
        </p>

        <h2 className="text-lg font-bold pt-4" style={{ color: 'var(--text)' }}>3. Betalingen</h2>
        <p>
          Betalingen worden verwerkt door Mollie. Wij accepteren iDEAL, creditcard en andere gangbare betaalmethoden.
          Prijzen zijn inclusief BTW tenzij anders vermeld.
        </p>

        <h2 className="text-lg font-bold pt-4" style={{ color: 'var(--text)' }}>4. Herroepingsrecht</h2>
        <p>
          Omdat het gaat om digitale content die direct na betaling wordt geleverd, geldt er conform
          de Wet koop op afstand geen herroepingsrecht nadat de download is gestart. Door de aankoop
          te voltooien stem je hiermee in.
        </p>

        <h2 className="text-lg font-bold pt-4" style={{ color: 'var(--text)' }}>5. De App</h2>
        <p>
          De De Vadercoach app is gratis beschikbaar. De app biedt geen vervanging voor professionele
          psychologische hulp of therapie. Bij ernstige problemen raden wij aan contact op te nemen
          met een professional.
        </p>

        <h2 className="text-lg font-bold pt-4" style={{ color: 'var(--text)' }}>6. Intellectueel eigendom</h2>
        <p>
          Alle content, inclusief teksten, ontwerpen, cursussen en de app, is eigendom van De Vadercoach
          en beschermd door het auteursrecht. Gebruik zonder toestemming is niet toegestaan.
        </p>

        <h2 className="text-lg font-bold pt-4" style={{ color: 'var(--text)' }}>7. Aansprakelijkheid</h2>
        <p>
          De Vadercoach biedt informatie en educatief materiaal, geen professionele hulpverlening.
          Wij zijn niet aansprakelijk voor de toepassing van de informatie uit onze cursussen of app.
        </p>

        <h2 className="text-lg font-bold pt-4" style={{ color: 'var(--text)' }}>8. Communicatie en nieuwsbrieven</h2>
        <p>
          Door gebruik te maken van onze diensten ga je akkoord met het ontvangen van serviceberichten.
          Nieuwsbrieven en aanbiedingen kun je altijd afmelden via de uitschrijflink in de e-mail.
          Wij delen je e-mailadres nooit met derden voor commerciële doeleinden.
        </p>

        <h2 className="text-lg font-bold pt-4" style={{ color: 'var(--text)' }}>9. Wijzigingen</h2>
        <p>
          Wij behouden het recht om deze voorwaarden te wijzigen. Wijzigingen worden op de website gepubliceerd.
        </p>

        <h2 className="text-lg font-bold pt-4" style={{ color: 'var(--text)' }}>10. Contact</h2>
        <p>
          Vragen? Neem contact op via{' '}
          <a href="mailto:info@devadercoach.nl" className="text-amber-400 hover:underline">info@devadercoach.nl</a>.
        </p>
      </div>
    </div>
  );
}
