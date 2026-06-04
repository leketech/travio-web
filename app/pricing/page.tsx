'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Check, Zap, X } from 'lucide-react'

const FEATURES = [
  { label: 'Trip budget generations',      free: '1 / month',       premium: 'Unlimited' },
  { label: '"Can I Afford?" checks',        free: '3 / hour',        premium: 'Unlimited' },
  { label: 'Destination comparison',        free: '2 destinations',  premium: 'Unlimited' },
  { label: 'AI budget rebalancing',         free: false,             premium: true },
  { label: 'Offline access (mobile)',       free: false,             premium: true },
  { label: 'Visa cost estimations',         free: false,             premium: true },
  { label: 'Live exchange rate alerts',     free: false,             premium: true },
  { label: 'PDF export',                    free: false,             premium: true },
]

export default function PricingPage() {
  const [billing, setBilling] = useState<'monthly' | 'annual'>('annual')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const monthlyPrice = billing === 'annual' ? (79 / 12).toFixed(2) : '9.00'
  const annualSaving = Math.round(100 - (79 / (9 * 12)) * 100)

  async function handleUpgrade() {
    setLoading(true)
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan: billing }),
      })
      const { url, error } = await res.json()
      if (error) throw new Error(error)
      window.location.href = url
    } catch {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-paper py-16 px-4">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-[var(--forest-100)] text-[var(--forest-700)] text-xs font-700 tracking-wider uppercase px-3 py-1.5 rounded-full mb-6">
            <Zap size={13} strokeWidth={2.5} />
            Premium
          </div>
          <h1 className="text-4xl font-800 text-ink tracking-tight mb-4">
            Budget smarter,<br className="hidden sm:block" /> travel further.
          </h1>
          <p className="text-muted text-lg max-w-lg mx-auto">
            Everything you need to plan any trip with total confidence.
            7-day free trial, cancel anytime.
          </p>
        </div>

        {/* Billing toggle */}
        <div className="flex items-center justify-center gap-3 mb-10">
          <button
            onClick={() => setBilling('monthly')}
            className={`text-sm font-600 px-4 py-2 rounded-full border transition-colors ${
              billing === 'monthly'
                ? 'bg-ink text-paper border-ink'
                : 'bg-surface text-muted border-line hover:border-ink2'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBilling('annual')}
            className={`flex items-center gap-2 text-sm font-600 px-4 py-2 rounded-full border transition-colors ${
              billing === 'annual'
                ? 'bg-ink text-paper border-ink'
                : 'bg-surface text-muted border-line hover:border-ink2'
            }`}
          >
            Annual
            <span className="bg-[var(--forest-700)] text-[var(--paper)] text-xs px-1.5 py-0.5 rounded-full">
              −{annualSaving}%
            </span>
          </button>
        </div>

        {/* Card grid */}
        <div className="grid sm:grid-cols-2 gap-6 mb-12">

          {/* Free tier */}
          <div className="bg-surface border border-line rounded-2xl p-8">
            <div className="mb-6">
              <p className="text-xs font-700 tracking-widest uppercase text-muted mb-2">Free</p>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-800 text-ink">$0</span>
              </div>
              <p className="text-muted text-sm mt-1">Always free, no card needed</p>
            </div>
            <button
              onClick={() => router.push('/')}
              className="w-full h-12 rounded-full border border-line text-ink font-600 text-sm hover:bg-paper2 transition-colors mb-8"
            >
              Start for free
            </button>
            <ul className="space-y-3">
              {FEATURES.map(f => (
                <li key={f.label} className="flex items-start gap-3">
                  <span className={`mt-0.5 shrink-0 ${f.free ? 'text-[var(--forest-600)]' : 'text-[var(--muted)]'}`}>
                    {f.free ? <Check size={16} strokeWidth={2.5} /> : <X size={16} strokeWidth={2} />}
                  </span>
                  <span className="text-sm text-ink2">
                    <span className="font-500">{f.label}</span>
                    {typeof f.free === 'string' && (
                      <span className="text-muted"> · {f.free}</span>
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Premium tier */}
          <div className="relative bg-[var(--forest-800)] rounded-2xl p-8 text-paper overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-[var(--forest-700)] rounded-full -translate-y-1/2 translate-x-1/2 opacity-40" />
            <div className="relative mb-6">
              <p className="text-xs font-700 tracking-widest uppercase text-[var(--forest-300)] mb-2">Premium</p>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-800">${monthlyPrice}</span>
                <span className="text-[var(--forest-300)] text-sm">/month</span>
              </div>
              {billing === 'annual' && (
                <p className="text-[var(--forest-300)] text-sm mt-1">Billed $79/year · 7 days free</p>
              )}
              {billing === 'monthly' && (
                <p className="text-[var(--forest-300)] text-sm mt-1">Billed monthly · 7 days free</p>
              )}
            </div>
            <button
              onClick={handleUpgrade}
              disabled={loading}
              className="relative w-full h-12 rounded-full bg-[var(--gold)] hover:bg-[#D4A840] text-[var(--ink)] font-700 text-sm transition-colors mb-8 disabled:opacity-60"
            >
              {loading ? 'Redirecting…' : 'Start 7-day free trial'}
            </button>
            <ul className="space-y-3 relative">
              {FEATURES.map(f => (
                <li key={f.label} className="flex items-start gap-3">
                  <span className="mt-0.5 shrink-0 text-[var(--gold)]">
                    <Check size={16} strokeWidth={2.5} />
                  </span>
                  <span className="text-sm text-[rgba(250,246,236,0.9)]">
                    <span className="font-500">{f.label}</span>
                    {typeof f.premium === 'string' && (
                      <span className="text-[var(--forest-300)]"> · {f.premium}</span>
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Trust bar */}
        <div className="grid grid-cols-3 gap-4 text-center max-w-lg mx-auto">
          {[
            { emoji: '🔒', text: 'Secure payment via Stripe' },
            { emoji: '↩️', text: 'Cancel anytime, no lock-in' },
            { emoji: '🎁', text: '7 days free, charge after' },
          ].map(t => (
            <div key={t.text} className="bg-surface border border-line rounded-xl p-4">
              <div className="text-xl mb-1">{t.emoji}</div>
              <p className="text-xs text-muted leading-snug">{t.text}</p>
            </div>
          ))}
        </div>

      </div>
    </main>
  )
}
