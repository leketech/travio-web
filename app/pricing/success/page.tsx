import Link from 'next/link'
import { Check } from 'lucide-react'

export default function PricingSuccessPage() {
  return (
    <main className="min-h-screen bg-paper flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">

        <div className="w-20 h-20 rounded-full bg-[var(--forest-100)] flex items-center justify-center mx-auto mb-6">
          <Check size={36} strokeWidth={2.5} className="text-[var(--forest-700)]" />
        </div>

        <h1 className="text-3xl font-800 text-ink tracking-tight mb-3">
          Welcome to Premium!
        </h1>
        <p className="text-muted text-base leading-relaxed mb-8">
          Your 7-day free trial has started. Every premium feature is unlocked — AI rebalancing, PDF export, unlimited trips, live exchange rates, and more.
        </p>

        <div className="bg-surface border border-line rounded-2xl p-6 mb-8 text-left">
          <p className="text-xs font-700 tracking-widest uppercase text-muted mb-4">
            What&apos;s unlocked
          </p>
          <ul className="space-y-3">
            {[
              'Unlimited trip budget generations',
              'AI budget rebalancing with sliders',
              'Branded PDF export for every trip',
              'Visa cost estimations',
              'Live exchange rate alerts',
              'Offline access on mobile',
            ].map(item => (
              <li key={item} className="flex items-center gap-3 text-sm text-ink2">
                <Check size={15} strokeWidth={2.5} className="text-[var(--forest-600)] shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-3">
          <Link
            href="/trips/new"
            className="h-12 flex items-center justify-center rounded-full bg-[var(--forest-700)] text-paper font-700 text-sm hover:bg-[var(--forest-600)] transition-colors"
          >
            Plan your first trip
          </Link>
          <Link
            href="/"
            className="h-12 flex items-center justify-center rounded-full border border-line text-ink2 font-600 text-sm hover:bg-paper2 transition-colors"
          >
            Back to home
          </Link>
        </div>

      </div>
    </main>
  )
}
