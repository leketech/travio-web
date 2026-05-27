'use client'

import { useState } from 'react'
import type { BudgetResult } from '@/types'
import { formatCurrency } from '@/lib/utils'

interface Props {
  result: BudgetResult
}

export default function BudgetBreakdown({ result }: Props) {
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  return (
    <div
      style={{
        background: 'var(--surface)',
        borderRadius: 'var(--r-lg)',
        border: '1px solid var(--line)',
        boxShadow: 'var(--sh-2)',
        padding: 28,
      }}
    >
      {/* Header row */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          marginBottom: 24,
        }}
      >
        <div>
          <div className="t-label" style={{ marginBottom: 4 }}>Budget breakdown</div>
          <h2 className="t-display" style={{ fontSize: 32 }}>
            {result.flag} {result.destination}
          </h2>
          <p style={{ fontSize: 13, color: 'var(--muted)', marginTop: 4 }}>
            {result.days} days · {result.travelers} traveler{result.travelers > 1 ? 's' : ''} ·{' '}
            {result.style} style
          </p>
        </div>

        {/* Verdict badge */}
        <div
          style={{
            padding: '12px 18px',
            borderRadius: 'var(--r-md)',
            background:
              result.verdict === 'yes'
                ? 'var(--forest-100)'
                : result.verdict === 'maybe'
                ? 'var(--gold-soft)'
                : '#F9E0DF',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              fontSize: 20,
              fontWeight: 800,
              color:
                result.verdict === 'yes'
                  ? 'var(--forest-700)'
                  : result.verdict === 'maybe'
                  ? 'var(--gold)'
                  : 'var(--rose)',
            }}
          >
            {result.verdict === 'yes' ? '✓ YES' : result.verdict === 'maybe' ? '⚡ POSSIBLE' : '✗ NO'}
          </div>
          <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 2 }}>
            {formatCurrency(result.totalBudget, result.currency)} total
          </div>
        </div>
      </div>

      {/* Daily budget highlight */}
      <div
        style={{
          background: 'var(--forest-800)',
          borderRadius: 'var(--r-md)',
          padding: '16px 20px',
          marginBottom: 20,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <div style={{ fontSize: 11, color: 'var(--forest-300)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 2 }}>
            Daily budget
          </div>
          <div
            className="t-mono"
            style={{ fontSize: 32, fontWeight: 700, color: 'var(--on-accent)' }}
          >
            {formatCurrency(result.dailyBudget, result.currency)}
            <span style={{ fontSize: 14, fontWeight: 400, color: 'var(--forest-300)', marginLeft: 4 }}>
              /day
            </span>
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 11, color: 'var(--forest-300)', marginBottom: 2 }}>Remaining buffer</div>
          <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--forest-300)' }}>
            {formatCurrency(result.remainingBuffer, result.currency)}
          </div>
        </div>
      </div>

      {/* Category list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {result.categories.map((cat) => {
          const isHovered = hoveredId === cat.id
          return (
            <div
              key={cat.id}
              onMouseEnter={() => setHoveredId(cat.id)}
              onMouseLeave={() => setHoveredId(null)}
              style={{
                padding: '12px 14px',
                borderRadius: 'var(--r-sm)',
                background: isHovered ? 'var(--paper)' : 'transparent',
                border: `1px solid ${isHovered ? 'var(--line)' : 'transparent'}`,
                cursor: 'default',
                transition: 'all 0.15s',
              }}
            >
              {/* Top row */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: 6,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 18 }}>{cat.emoji}</span>
                  <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--ink)' }}>
                    {cat.label}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 11, color: 'var(--muted)' }}>{cat.percentage}%</span>
                  <span
                    className="t-mono"
                    style={{ fontSize: 15, fontWeight: 600, color: 'var(--ink)' }}
                  >
                    {formatCurrency(cat.amount, result.currency)}
                  </span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="t-bar">
                <div
                  className="t-bar-fill"
                  style={{
                    width: `${cat.percentage}%`,
                    background: cat.color,
                  }}
                />
              </div>

              {/* Description on hover */}
              {isHovered && cat.description && (
                <p style={{ fontSize: 12, color: 'var(--muted)', marginTop: 6, lineHeight: 1.4 }}>
                  {cat.description}
                </p>
              )}
            </div>
          )
        })}
      </div>

      {/* Tips */}
      {result.tips.length > 0 && (
        <div
          style={{
            marginTop: 24,
            background: 'var(--paper)',
            borderRadius: 'var(--r-sm)',
            padding: '16px 18px',
          }}
        >
          <div className="t-label" style={{ marginBottom: 10 }}>Local money tips</div>
          <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
            {result.tips.map((tip, i) => (
              <li
                key={i}
                style={{
                  fontSize: 13,
                  color: 'var(--ink-2)',
                  paddingBottom: 8,
                  marginBottom: 8,
                  borderBottom: i < result.tips.length - 1 ? '1px solid var(--line)' : 'none',
                  display: 'flex',
                  gap: 8,
                  alignItems: 'flex-start',
                  lineHeight: 1.4,
                }}
              >
                <span style={{ color: 'var(--forest-600)', flexShrink: 0, marginTop: 1 }}>→</span>
                {tip}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
