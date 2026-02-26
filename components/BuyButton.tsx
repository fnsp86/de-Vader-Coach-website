'use client';

import { useState } from 'react';
import { ShoppingCart, Loader2 } from 'lucide-react';

interface BuyButtonProps {
  slug: string;
  color: string;
}

export default function BuyButton({ slug, color }: BuyButtonProps) {
  const [loading, setLoading] = useState(false);

  async function handleBuy() {
    setLoading(true);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug }),
      });

      const data = await res.json();

      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      } else {
        alert('Er ging iets mis. Probeer het opnieuw.');
        setLoading(false);
      }
    } catch {
      alert('Er ging iets mis. Probeer het opnieuw.');
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleBuy}
      disabled={loading}
      className="w-full flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl text-base font-bold text-black transition-transform hover:scale-[0.97] disabled:opacity-70 disabled:hover:scale-100"
      style={{ backgroundColor: color }}
    >
      {loading ? (
        <Loader2 className="h-5 w-5 animate-spin" />
      ) : (
        <ShoppingCart className="h-5 w-5" />
      )}
      {loading ? 'Laden...' : 'Kopen'}
    </button>
  );
}
