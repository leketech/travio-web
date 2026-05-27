'use client'

import Link from 'next/link'
import type { AffordResult } from '@/types'
import { formatCurrency } from '@/lib/utils'
import { Share2, Plane } from 'lucide-react'

interface Props {
  result: AffordResult
}

export default function AffordResultCard({ result }: Props) {
  const isYes = result.verdict === 'yes'
  const isMaybe = result.verdict === 'maybe'
  const isNo = result.verdict === 'no'

  const bgColor = isYes ? 'var(--forest-700)' : isMaybe ? 'var(--gold)' : 'var(--rose)'
  const lightBg = isYes ? 'var(--forest-100)' : isMaybe ? 'var(--gold-soft)' : '#F9E0DF'
  const textColor = isYes ? 'var(--forest-700)' : isMaybe ? 'var(--gold)' : 'var(--rose)'

  const verdictLabel = isYes ? '✓ YES' : isMaybe ? '⚡ POSSIBLE IF' : '✗ NOT QUITE'

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Can I afford ${result.destination} for ${result.days} days?`,
        text: `${verdictLabel} — with $${result.budget} for ${result.days} days in ${result.destination}. Built with Travio.`,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
    }
  }

  return (
    <div
      style={{
        maxWidth: 520,
        width: '100%',
        margin: '0 auto',
      }}
    >
      {/* Verdict card */}
      <div
        style={{
          background: bgColor,
          borderRadius: 'var(--r-xl)',
          padding: 36,
          color: '#fff',
          marginBottom: 16,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Subtle texture */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'repeating-linear-gradient(135deg, rgba(255,255,255,0.04) 0 1px, transparent 1px 8px)',
            pointerEvents: 'none',
          }}
        />

        <div style={{ position: 'relative' }}>
          <div style={{ fontSize: 13, opacity: 0.7, marginBottom: 8, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Your verdict
          </div>
          <div
            style={{
              fontFamily: 'var(--f-display)',
              fontSize: 'clamp(52px, 12vw, 80px)',
              lineHeight: 0.9,
              marginBottom: 16,
            }}
          >
            {isYes ? <><em>Yes,</em><br />you can!</> : isMaybe ? <><em>Possible</em><br />if…</> : <><em>Not quite</em><br />yet.</>}
          </div>

          <div style={{ fontSize: 16, opacity: 0.9, lineHeight: 1.5, maxWidth: 340, marginBottom: 20 }}>
            {result.message}
          </div>

          {/* Numbers */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 12,
              marginBottom: 20,
            }}
          >
            {[
              { label: 'Your budget', value: formatCurrency(result.budget, result.currency) },
              { label: 'Estimated total', value: formatCurrency(result.totalEstimate, result.currency) },
              { label: 'Duration', value: `${result.days} days` },
              { label: 'Daily cost', value: formatCurrency(result.dailyCost, result.currency) + '/day' },
            ].map((s) => (
              <div
                key={s.label}
                style={{
                  background: 'rgba(255,255,255,0.14)',
                  borderRadius: 14,
                  padding: '10px 14px',
                }}
              >
                <div style={{ fontSize: 11, opacity: 0.7, marginBottom: 2, letterSpacing: '0.08em' }}>{s.label}</div>
                <div
                  className="t-mono"
                  style={{ fontSize: 18, fontWeight: 700 }}
                >
                  {s.value}
                </div>
              </div>
            ))}
          </div>

          {/* Share button */}
          <button
            onClick={handleShare}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '10px 18px',
              borderRadius: 9999,
              background: 'rgba(255,255,255,0.2)',
              border: '1px solid rgba(255,255,255,0.3)',
              color: '#fff',
              fontSize: 14,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            <Share2 size={15} />
            Share this result
          </button>
        </div>
      </div>

      {/* Conditions (maybe) */}
      {isMaybe && result.conditions && result.conditions.length > 0 && (
        <div
          style={{
            background: 'var(--surface)',
            borderRadius: 'var(--r-md)',
            border: '1px solid var(--line)',
            padding: 20,
            marginBottom: 12,
          }}
        >
          <div className="t-label" style={{ marginBottom: 10 }}>Make it work if you…</div>
          {result.conditions.map((c, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                gap: 8,
                alignItems: 'flex-start',
                fontSize: 14,
                color: 'var(--ink-2)',
                marginBottom: i < result.conditions!.length - 1 ? 8 : 0,
              }}
            >
              <span style={{ color: 'var(--gold)', fontWeight: 700, flexShrink: 0 }}>⚡</span>
              {c}
            </div>
          ))}
        </div>
      )}

      {/* Alternatives (no) */}
      {isNo && result.alternatives && result.alternatives.length > 0 && (
        <div
          style={{
            background: 'var(--surface)',
            borderRadius: 'var(--r-md)',
            border: '1px solid var(--line)',
            padding: 20,
            marginBottom: 12,
          }}
        >
          <div className="t-label" style={{ marginBottom: 12 }}>
            Better fits for {formatCurrency(result.budget, result.currency)}
          </div>
          {result.alternatives.map((alt) => (
            <div
              key={alt.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 0',
                borderBottom: '1px solid var(--line)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 22 }}>{alt.flag}</span>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>{alt.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--muted)' }}>
                    {alt.tags.slice(0, 2).join(' · ')}
                  </div>
                </div>
              </div>
              <div className="t-mono" style={{ fontSize: 13, color: 'var(--forest-700)', fontWeight: 600 }}>
                ~{formatCurrency(alt.avgDailyCost, 'USD')}/day
              </div>
            </div>
          ))}
        </div>
      )}

      {/* CTA */}
      <div style={{ display: 'flex', gap: 10 }}>
        <Link
          href="/"
          style={{
            flex: 1,
            padding: '14px',
            borderRadius: 9999,
            border: '1px solid var(--line-2)',
            fontSize: 14,
            fontWeight: 600,
            color: 'var(--ink)',
            textDecoration: 'none',
            textAlign: 'center',
          }}
        >
          Try another trip
        </Link>
        <Link
          href={`/?dest=${encodeURIComponent(result.destination)}&budget=${result.budget}&days=${result.days}`}
          style={{
            flex: 1,
            padding: '14px',
            borderRadius: 9999,
            background: 'var(--forest-700)',
            color: 'var(--on-accent)',
            fontSize: 14,
            fontWeight: 600,
            textDecoration: 'none',
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 6,
          }}
        >
          <Plane size={15} />
          Full plan
        </Link>
      </div>
    </div>
  )
}
