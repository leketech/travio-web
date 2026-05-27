'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Plane, MapPin, Calendar, DollarSign, Users, Sparkles } from 'lucide-react'
import type { TravelStyle } from '@/types'

const STYLES: { id: TravelStyle; label: string; emoji: string; desc: string }[] = [
  { id: 'ultra-cheap', label: 'Ultra Budget', emoji: '🎒', desc: 'Hostels, street food, local transit' },
  { id: 'budget', label: 'Budget', emoji: '🏨', desc: 'Budget hotels, local eateries, some activities' },
  { id: 'comfort', label: 'Comfort', emoji: '✈️', desc: 'Mid-range hotels, mix of dining, tours' },
  { id: 'luxury', label: 'Luxury', emoji: '🌟', desc: 'Luxury hotels, fine dining, premium experiences' },
]

export default function PlannerForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    destination: '',
    budget: '',
    days: '7',
    travelers: '1',
    style: 'budget' as TravelStyle,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.destination || !form.budget) return
    setLoading(true)
    // In MVP, route to a result with query params (API will be wired later)
    const params = new URLSearchParams({
      dest: form.destination,
      budget: form.budget,
      days: form.days,
      travelers: form.travelers,
      style: form.style,
    })
    router.push(`/trips/new?${params.toString()}`)
  }

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }))

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        background: 'var(--surface)',
        borderRadius: 'var(--r-lg)',
        border: '1px solid var(--line)',
        boxShadow: 'var(--sh-3)',
        padding: 32,
        maxWidth: 540,
        width: '100%',
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <span className="t-pill-accent-soft" style={{ marginBottom: 12, display: 'inline-flex' }}>
          <Sparkles size={12} />
          AI Budget Planner
        </span>
        <h2
          className="t-display"
          style={{ fontSize: 28, marginTop: 8, marginBottom: 4 }}
        >
          Plan your trip
        </h2>
        <p style={{ fontSize: 14, color: 'var(--muted)' }}>
          Tell us your budget — we&apos;ll build the smartest spend plan.
        </p>
      </div>

      {/* Destination */}
      <div style={{ marginBottom: 16 }}>
        <label className="t-label" style={{ display: 'block', marginBottom: 6 }}>
          Destination
        </label>
        <div style={{ position: 'relative' }}>
          <MapPin
            size={16}
            style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)' }}
          />
          <input
            className="t-input"
            type="text"
            placeholder="Bangkok, Bali, Paris…"
            value={form.destination}
            onChange={(e) => set('destination', e.target.value)}
            required
            style={{ paddingLeft: 40 }}
          />
        </div>
      </div>

      {/* Budget */}
      <div style={{ marginBottom: 16 }}>
        <label className="t-label" style={{ display: 'block', marginBottom: 6 }}>
          Total budget (USD)
        </label>
        <div style={{ position: 'relative' }}>
          <DollarSign
            size={16}
            style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)' }}
          />
          <input
            className="t-input"
            type="number"
            placeholder="1000"
            min={100}
            max={100000}
            value={form.budget}
            onChange={(e) => set('budget', e.target.value)}
            required
            style={{ paddingLeft: 40 }}
          />
        </div>
      </div>

      {/* Days + Travelers row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
        <div>
          <label className="t-label" style={{ display: 'block', marginBottom: 6 }}>
            Duration
          </label>
          <div style={{ position: 'relative' }}>
            <Calendar
              size={16}
              style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)' }}
            />
            <select
              className="t-input"
              value={form.days}
              onChange={(e) => set('days', e.target.value)}
              style={{ paddingLeft: 40, appearance: 'none', cursor: 'pointer' }}
            >
              {[3, 5, 7, 10, 14, 21, 30].map((d) => (
                <option key={d} value={d}>{d} days</option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <label className="t-label" style={{ display: 'block', marginBottom: 6 }}>
            Travelers
          </label>
          <div style={{ position: 'relative' }}>
            <Users
              size={16}
              style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)' }}
            />
            <select
              className="t-input"
              value={form.travelers}
              onChange={(e) => set('travelers', e.target.value)}
              style={{ paddingLeft: 40, appearance: 'none', cursor: 'pointer' }}
            >
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <option key={n} value={n}>{n} {n === 1 ? 'person' : 'people'}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Travel style */}
      <div style={{ marginBottom: 24 }}>
        <label className="t-label" style={{ display: 'block', marginBottom: 10 }}>
          Travel style
        </label>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          {STYLES.map((s) => {
            const active = form.style === s.id
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => set('style', s.id)}
                style={{
                  padding: '10px 12px',
                  borderRadius: 'var(--r-sm)',
                  border: `1.5px solid ${active ? 'var(--forest-700)' : 'var(--line)'}`,
                  background: active ? 'var(--forest-50)' : 'var(--surface)',
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                }}
              >
                <div style={{ fontSize: 18, marginBottom: 2 }}>{s.emoji}</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: active ? 'var(--forest-700)' : 'var(--ink)' }}>
                  {s.label}
                </div>
                <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 2 }}>
                  {s.desc}
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="t-btn-accent"
        style={{
          width: '100%',
          padding: '16px 24px',
          borderRadius: 9999,
          border: 'none',
          fontSize: 16,
          fontWeight: 700,
          cursor: loading ? 'not-allowed' : 'pointer',
          opacity: loading ? 0.7 : 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
        }}
      >
        {loading ? (
          <>
            <div
              style={{
                width: 18,
                height: 18,
                border: '2px solid rgba(250,246,236,0.3)',
                borderTopColor: 'var(--on-accent)',
                borderRadius: '50%',
                animation: 'spin 0.8s linear infinite',
              }}
            />
            Building your plan…
          </>
        ) : (
          <>
            <Plane size={18} />
            Build my budget plan
          </>
        )}
      </button>

      <style jsx>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </form>
  )
}
