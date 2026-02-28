'use client';

import { useState } from 'react';
import { ShoppingCart, Loader2, Tag, Check, X } from 'lucide-react';

interface BuyButtonProps {
  slug: string;
  color: string;
  price: number;
}

export default function BuyButton({ slug, color, price }: BuyButtonProps) {
  const [loading, setLoading] = useState(false);
  const [showDiscount, setShowDiscount] = useState(false);
  const [discountInput, setDiscountInput] = useState('');
  const [discountApplied, setDiscountApplied] = useState<{ code: string; percentOff: number } | null>(null);
  const [discountError, setDiscountError] = useState('');
  const [validating, setValidating] = useState(false);

  const finalPrice = discountApplied
    ? Math.round(price * (1 - discountApplied.percentOff / 100) * 100) / 100
    : price;

  async function handleBuy() {
    setLoading(true);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slug,
          discountCode: discountApplied?.code || undefined,
        }),
      });

      const data = await res.json();

      if (data.checkoutUrl) {
        fetch('/api/analytics/track', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ path: `/event/buy-click/${slug}`, referrer: window.location.pathname }),
        }).catch(() => {});

        window.location.href = data.checkoutUrl;
      } else {
        alert(data.error || 'Er ging iets mis. Probeer het opnieuw.');
        setLoading(false);
      }
    } catch {
      alert('Er ging iets mis. Probeer het opnieuw.');
      setLoading(false);
    }
  }

  async function handleApplyDiscount() {
    const code = discountInput.trim().toUpperCase();
    if (!code) return;

    setDiscountError('');
    setValidating(true);

    try {
      const res = await fetch('/api/discount/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, slug }),
      });
      const data = await res.json();

      if (data.valid) {
        setDiscountApplied({ code: data.code, percentOff: data.percentOff });
        setDiscountError('');
      } else {
        setDiscountError(data.error || 'Ongeldige code');
        setDiscountApplied(null);
      }
    } catch {
      setDiscountError('Kon code niet controleren');
    } finally {
      setValidating(false);
    }
  }

  function handleRemoveDiscount() {
    setDiscountApplied(null);
    setDiscountInput('');
    setDiscountError('');
  }

  return (
    <div className="w-full space-y-3">
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
        {loading
          ? 'Laden...'
          : discountApplied
            ? `Kopen — €${finalPrice.toFixed(2)}`
            : 'Kopen'}
      </button>

      {!discountApplied ? (
        !showDiscount ? (
          <button
            onClick={() => setShowDiscount(true)}
            className="w-full text-center text-sm text-zinc-400 hover:text-zinc-300 transition-colors"
          >
            <Tag className="inline h-3.5 w-3.5 mr-1" />
            Heb je een kortingscode?
          </button>
        ) : (
          <div className="flex gap-2">
            <input
              type="text"
              value={discountInput}
              onChange={(e) => {
                setDiscountInput(e.target.value.toUpperCase());
                setDiscountError('');
              }}
              onKeyDown={(e) => e.key === 'Enter' && handleApplyDiscount()}
              placeholder="VADER-XXXXXX"
              className="flex-1 px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500"
              disabled={validating}
            />
            <button
              onClick={handleApplyDiscount}
              disabled={validating}
              className="px-4 py-2 rounded-lg bg-zinc-700 text-sm font-medium text-white hover:bg-zinc-600 transition-colors disabled:opacity-50"
            >
              {validating ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Toepassen'}
            </button>
          </div>
        )
      ) : (
        <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-emerald-900/30 border border-emerald-700/50">
          <span className="flex items-center gap-1.5 text-sm text-emerald-400">
            <Check className="h-4 w-4" />
            {discountApplied.percentOff}% korting toegepast
          </span>
          <button
            onClick={handleRemoveDiscount}
            className="text-zinc-400 hover:text-zinc-300"
            title="Verwijder korting"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {discountError && (
        <p className="text-sm text-red-400 text-center">{discountError}</p>
      )}
    </div>
  );
}
