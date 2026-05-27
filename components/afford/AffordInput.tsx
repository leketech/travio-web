'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Sparkles } from 'lucide-react'
import { slugify } from '@/lib/utils'

export default function AffordInput() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    destination: '',
    budget: '',
    days: '5',
  })

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.destination || !form.budget) return
    setLoading(true)
    const slug = `${slugify(form.destination)}-${form.days}d-${form.budget}`
    router.push(`/afford/${slug}?dest=${encodeURIComponent(form.destination)}&days=${form.days}&budget=${form.budget}`)
  }

  return (
    <div
      style={{
        background: 'var(--surface)',
        borderRadius: 'var(--r-xl)',
        border: '1px solid var(--line)',
        boxShadow: 'var(--sh-3)',
        padding: 40,
        maxWidth: 560,
        width: '100%',
        margin: '0 auto',
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: 32 }}>
        <span className="t-pill-accent-soft" style={{ marginBottom: 14, display: 'inline-flex' }}>
          <Sparkles size={12} />
          No account needed · free
        </span>
        <h1 className="t-display" style={{ fontSize: 'clamp(36px, 6vw, 52px)', marginBottom: 12 }}>
          Can I afford{' '}
          <em className="t-underline-scribble">this trip?</em>
        </h1>
        <p style={{ fontSize: 16, color: 'var(--muted)' }}>
          Get an honest YES / POSSIBLE IF / NO — in seconds.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Sentence-style input */}
        <div
          style={{
            background: 'var(--paper)',
            borderRadius: 'var(--r-md)',
            padding: '20px 24px',
            border: '1px solid var(--line)',
            marginBottom: 20,
            lineHeight: 2.2,
            fontSize: 18,
            color: 'var(--ink)',
          }}
        >
          <span>I have </span>
          <span style={{ position: 'relative', display: 'inline-block' }}>
            <span style={{ fontWeight: 700, color: 'var(--forest-700)' }}>$</span>
            <input
              type="number"
              value={form.budget}
              onChange={(e) => set('budget', e.target.value)}
              placeholder="1000"
              min={50}
              required
              style={{
                width: 90,
                border: 'none',
                borderBottom: '2px solid var(--forest-500)',
                outline: 'none',
                background: 'transparent',
                fontSize: 18,
                fontWeight: 700,
                color: 'var(--forest-700)',
                fontFamily: 'var(--f-mono)',
                padding: '0 4px',
              }}
            />
          </span>
          <span> and want to visit </span>
          <input
            type="text"
            value={form.destination}
            onChange={(e) => set('destination', e.target.value)}
            placeholder="Bangkok"
            required
            style={{
              border: 'none',
              borderBottom: '2px solid var(--forest-500)',
              outline: 'none',
              background: 'transparent',
              fontSize: 18,
              fontWeight: 600,
              color: 'var(--ink)',
              fontFamily: 'inherit',
              minWidth: 120,
              padding: '0 4px',
            }}
          />
          <span> for </span>
          <select
            value={form.days}
            onChange={(e) => set('days', e.target.value)}
            style={{
              border: 'none',
              borderBottom: '2px solid var(--forest-500)',
              outline: 'none',
              background: 'transparent',
              fontSize: 18,
              fontWeight: 600,
              color: 'var(--ink)',
              cursor: 'pointer',
              appearance: 'none',
              padding: '0 4px',
            }}
          >
            {[3, 5, 7, 10, 14, 21].map((d) => (
              <option key={d} value={d}>{d} days</option>
            ))}
          </select>
          <span>.</span>
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            padding: '16px 24px',
            borderRadius: 9999,
            border: 'none',
            fontSize: 16,
            fontWeight: 700,
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.7 : 1,
            background: 'var(--forest-700)',
            color: 'var(--on-accent)',
            boxShadow: '0 6px 20px rgba(31,86,65,0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            transition: 'transform 0.15s',
          }}
        >
          {loading ? 'Checking…' : '✦ Can I afford it?'}
        </button>
      </form>

      <p style={{ textAlign: 'center', fontSize: 12, color: 'var(--faint)', marginTop: 14 }}>
        Results are shareable — screenshot and send to your travel group 📱
      </p>
    </div>
  )
}
