'use client';

import { useState } from 'react';
import { ShoppingCart, Loader2, Tag, Check, X, Mail } from 'lucide-react';

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

  // Email step
  const [showEmail, setShowEmail] = useState(false);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const finalPrice = discountApplied
    ? Math.round(price * (1 - discountApplied.percentOff / 100) * 100) / 100
    : price;

  function handleBuyClick() {
    setShowEmail(true);
    setEmailError('');
  }

  async function handleBuy() {
    // Validate email
    const trimmed = email.trim().toLowerCase();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setEmailError('Vul een geldig e-mailadres in');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slug,
          email: trimmed,
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
      {!showEmail ? (
        <button
          onClick={handleBuyClick}
          className="w-full flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl text-base font-bold text-black transition-transform hover:scale-[0.97]"
          style={{ backgroundColor: color }}
        >
          <ShoppingCart className="h-5 w-5" />
          {discountApplied ? `Kopen · \u20AC${finalPrice.toFixed(2)}` : 'Kopen'}
        </button>
      ) : (
        <div className="space-y-2">
          <label className="text-sm font-medium" style={{ color: 'var(--text2)' }}>
            E-mailadres voor je factuur
          </label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailError('');
                }}
                onKeyDown={(e) => e.key === 'Enter' && handleBuy()}
                placeholder="jouw@email.nl"
                className="w-full pl-9 pr-3 py-2.5 rounded-lg bg-zinc-800 border border-zinc-700 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500"
                disabled={loading}
                autoFocus
              />
            </div>
            <button
              onClick={handleBuy}
              disabled={loading}
              className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-black transition-transform hover:scale-[0.97] disabled:opacity-70 disabled:hover:scale-100"
              style={{ backgroundColor: color }}
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <ShoppingCart className="h-4 w-4" />
              )}
              {loading ? 'Laden...' : `\u20AC${finalPrice.toFixed(2)}`}
            </button>
          </div>
          {emailError && (
            <p className="text-sm text-red-400">{emailError}</p>
          )}
          <button
            onClick={() => setShowEmail(false)}
            className="text-xs hover:underline"
            style={{ color: 'var(--text3)' }}
          >
            Annuleren
          </button>
        </div>
      )}

      {!showEmail && (
        <>
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
        </>
      )}
    </div>
  );
}
