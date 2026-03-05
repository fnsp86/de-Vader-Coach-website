import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Account verwijderen',
  description: 'Verwijder je De Vadercoach account en bijbehorende gegevens.',
  alternates: {
    canonical: 'https://devadercoach.nl/account-verwijderen',
  },
};

export default function AccountVerwijderenPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
      <h1 className="text-3xl font-extrabold mb-2" style={{ color: 'var(--text)' }}>
        Account verwijderen
      </h1>
      <p className="text-sm mb-8" style={{ color: 'var(--text3)' }}>De Vadercoach</p>

      <div className="space-y-6 text-sm leading-relaxed" style={{ color: 'var(--text2)' }}>
        <h2 className="text-lg font-bold pt-4" style={{ color: 'var(--text)' }}>Hoe verwijder ik mijn account?</h2>
        <p>Je kunt je account op twee manieren verwijderen:</p>

        <h3 className="font-bold pt-2" style={{ color: 'var(--text)' }}>Via de app</h3>
        <ol className="list-decimal pl-5 space-y-1">
          <li>Open de De Vadercoach app</li>
          <li>Ga naar <strong>Instellingen</strong> (tandwiel-icoon)</li>
          <li>Scroll naar beneden en tik op <strong>Account verwijderen</strong></li>
          <li>Bevestig je keuze</li>
        </ol>

        <h3 className="font-bold pt-2" style={{ color: 'var(--text)' }}>Via e-mail</h3>
        <p>
          Stuur een e-mail naar{' '}
          <a href="mailto:info@devadercoach.nl" className="text-amber-400 hover:underline">
            info@devadercoach.nl
          </a>{' '}
          met als onderwerp &quot;Account verwijderen&quot; en vermeld het e-mailadres waarmee je bent geregistreerd.
          We verwerken je verzoek binnen 7 werkdagen.
        </p>

        <h2 className="text-lg font-bold pt-4" style={{ color: 'var(--text)' }}>Welke gegevens worden verwijderd?</h2>
        <p>Bij het verwijderen van je account worden de volgende gegevens permanent verwijderd:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Je accountgegevens (naam, e-mailadres)</li>
          <li>Je voortgang en opgeslagen antwoorden</li>
          <li>Je voorkeuren en instellingen</li>
          <li>Alle lokaal opgeslagen app-gegevens</li>
        </ul>

        <h2 className="text-lg font-bold pt-4" style={{ color: 'var(--text)' }}>Welke gegevens worden bewaard?</h2>
        <p>
          Geanonimiseerde analytische gegevens (zoals geaggregeerde gebruiksstatistieken) kunnen bewaard
          blijven omdat deze niet meer te herleiden zijn naar jou als persoon. Eventuele factuurgegevens
          worden conform de wettelijke bewaarplicht maximaal 7 jaar bewaard.
        </p>

        <h2 className="text-lg font-bold pt-4" style={{ color: 'var(--text)' }}>Vragen?</h2>
        <p>
          Neem contact op via{' '}
          <a href="mailto:info@devadercoach.nl" className="text-amber-400 hover:underline">
            info@devadercoach.nl
          </a>{' '}
          als je vragen hebt over het verwijderen van je account of je gegevens.
        </p>
      </div>
    </div>
  );
}
