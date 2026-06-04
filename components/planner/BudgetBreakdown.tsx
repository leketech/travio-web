'use client'

import { useState, useMemo } from 'react'
import * as Slider from '@radix-ui/react-slider'
import type { BudgetResult } from '@/types'
import { formatCurrency } from '@/lib/utils'

interface Props {
  result: BudgetResult
}

const EMERGENCY_ID = 'emergency'

function deltaColor(delta: number) {
  if (delta > 0) return 'var(--coral)'
  if (delta < 0) return 'var(--forest-600)'
  return 'var(--muted)'
}

function deltaLabel(delta: number, currency: string) {
  if (delta === 0) return null
  const sign = delta > 0 ? '+' : ''
  return `${sign}${formatCurrency(delta, currency)}`
}

export default function BudgetBreakdown({ result }: Props) {
  const originalAmounts = useMemo(
    () => Object.fromEntries(result.categories.map((c) => [c.id, c.amount])),
    [result]
  )

  const [amounts, setAmounts] = useState<Record<string, number>>(() => ({ ...originalAmounts }))

  const totalSpent = useMemo(() => Object.values(amounts).reduce((s, v) => s + v, 0), [amounts])
  const buffer = result.totalBudget - totalSpent
  const dailyBudget = Math.round(totalSpent / result.days)

  const verdict: 'yes' | 'maybe' | 'no' =
    buffer >= 50 ? 'yes' : buffer >= 0 ? 'maybe' : 'no'

  const hasChanges = result.categories.some((c) => amounts[c.id] !== originalAmounts[c.id])

  const handleChange = (catId: string, newAmount: number) => {
    setAmounts((prev) => ({ ...prev, [catId]: Math.round(newAmount / 5) * 5 }))
  }

  const reset = () => setAmounts({ ...originalAmounts })

  const verdictBg = {
    yes: 'var(--forest-100)',
    maybe: 'var(--gold-soft)',
    no: '#F9E0DF',
  }[verdict]

  const verdictTextColor = {
    yes: 'var(--forest-700)',
    maybe: 'var(--gold)',
    no: 'var(--rose)',
  }[verdict]

  const verdictLabel = {
    yes: '✓ CAN AFFORD',
    maybe: '⚡ POSSIBLE',
    no: '✗ OVER BUDGET',
  }[verdict]

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
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          marginBottom: 24,
          gap: 16,
          flexWrap: 'wrap',
        }}
      >
        <div>
          <div className="t-label" style={{ marginBottom: 4 }}>
            Budget breakdown
          </div>
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
            background: verdictBg,
            textAlign: 'center',
            transition: 'background 0.2s',
          }}
        >
          <div
            style={{ fontSize: 20, fontWeight: 800, color: verdictTextColor, transition: 'color 0.2s' }}
          >
            {verdictLabel}
          </div>
          <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 2 }}>
            {formatCurrency(result.totalBudget, result.currency)} total
          </div>
        </div>
      </div>

      {/* Daily budget + buffer stats */}
      <div
        style={{
          background: 'var(--forest-800)',
          borderRadius: 'var(--r-md)',
          padding: '16px 20px',
          marginBottom: 24,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 12,
          flexWrap: 'wrap',
        }}
      >
        <div>
          <div
            style={{
              fontSize: 11,
              color: 'var(--forest-300)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginBottom: 2,
            }}
          >
            Daily budget
          </div>
          <div className="t-mono" style={{ fontSize: 32, fontWeight: 700, color: 'var(--on-accent)' }}>
            {formatCurrency(dailyBudget, result.currency)}
            <span style={{ fontSize: 14, fontWeight: 400, color: 'var(--forest-300)', marginLeft: 4 }}>
              /day
            </span>
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 11, color: 'var(--forest-300)', marginBottom: 2 }}>
            Remaining buffer
          </div>
          <div
            className="t-mono"
            style={{
              fontSize: 22,
              fontWeight: 700,
              color: buffer < 0 ? 'var(--rose)' : 'var(--forest-300)',
              transition: 'color 0.2s',
            }}
          >
            {formatCurrency(buffer, result.currency)}
          </div>
        </div>
      </div>

      {/* Slider hint + reset */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 16,
          gap: 8,
        }}
      >
        <p style={{ fontSize: 13, color: 'var(--muted)' }}>
          Drag sliders to rebalance · buffer updates in real time
        </p>
        {hasChanges && (
          <button
            onClick={reset}
            style={{
              fontSize: 12,
              fontWeight: 600,
              color: 'var(--forest-700)',
              background: 'var(--forest-50)',
              border: '1px solid var(--forest-100)',
              borderRadius: 9999,
              padding: '5px 12px',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}
          >
            ↺ Reset to AI plan
          </button>
        )}
      </div>

      {/* Category rows */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {result.categories.map((cat) => {
          const current = amounts[cat.id]
          const delta = current - originalAmounts[cat.id]
          const pct = Math.round((current / result.totalBudget) * 100)
          const isLocked = cat.id === EMERGENCY_ID
          const label = deltaLabel(delta, result.currency)

          return (
            <div
              key={cat.id}
              style={{
                padding: '14px 16px',
                borderRadius: 'var(--r-sm)',
                background: 'var(--paper)',
                border: '1px solid var(--line)',
              }}
            >
              {/* Top row */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: 10,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 18 }}>{cat.emoji}</span>
                  <div>
                    <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--ink)' }}>
                      {cat.label}
                    </span>
                    {isLocked && (
                      <span
                        style={{
                          marginLeft: 6,
                          fontSize: 10,
                          color: 'var(--muted)',
                          background: 'var(--paper-2)',
                          border: '1px solid var(--line)',
                          borderRadius: 4,
                          padding: '1px 5px',
                        }}
                      >
                        fixed
                      </span>
                    )}
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  {label && (
                    <span
                      style={{
                        fontSize: 12,
                        fontWeight: 600,
                        color: deltaColor(delta),
                        transition: 'color 0.15s',
                      }}
                    >
                      {label}
                    </span>
                  )}
                  <span style={{ fontSize: 11, color: 'var(--muted)' }}>{pct}%</span>
                  <span
                    className="t-mono"
                    style={{
                      fontSize: 15,
                      fontWeight: 600,
                      color: 'var(--ink)',
                      minWidth: 60,
                      textAlign: 'right',
                    }}
                  >
                    {formatCurrency(current, result.currency)}
                  </span>
                </div>
              </div>

              {/* Slider or static bar */}
              {isLocked ? (
                <div className="t-bar">
                  <div
                    className="t-bar-fill"
                    style={{ width: `${pct}%`, background: cat.color }}
                  />
                </div>
              ) : (
                <Slider.Root
                  value={[current]}
                  onValueChange={([v]) => handleChange(cat.id, v)}
                  min={0}
                  max={Math.round(result.totalBudget * 0.75)}
                  step={5}
                  style={{
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    width: '100%',
                    height: 20,
                    cursor: 'pointer',
                    touchAction: 'none',
                    userSelect: 'none',
                  }}
                >
                  <Slider.Track
                    style={{
                      background: 'var(--paper-3)',
                      position: 'relative',
                      flexGrow: 1,
                      borderRadius: 9999,
                      height: 6,
                    }}
                  >
                    <Slider.Range
                      style={{
                        position: 'absolute',
                        background: cat.color,
                        borderRadius: 9999,
                        height: '100%',
                      }}
                    />
                  </Slider.Track>
                  <Slider.Thumb
                    style={{
                      display: 'block',
                      width: 18,
                      height: 18,
                      background: 'var(--surface)',
                      borderRadius: 9999,
                      border: `2.5px solid ${cat.color}`,
                      boxShadow: '0 1px 4px rgba(0,0,0,0.15)',
                      cursor: 'grab',
                      outline: 'none',
                    }}
                    onFocus={(e) => {
                      ;(e.target as HTMLElement).style.boxShadow = `0 0 0 4px ${cat.color}33`
                    }}
                    onBlur={(e) => {
                      ;(e.target as HTMLElement).style.boxShadow = '0 1px 4px rgba(0,0,0,0.15)'
                    }}
                  />
                </Slider.Root>
              )}

              {/* Description */}
              {cat.description && (
                <p style={{ fontSize: 12, color: 'var(--muted)', marginTop: 6, lineHeight: 1.4 }}>
                  {cat.description}
                </p>
              )}
            </div>
          )
        })}
      </div>

      {/* Over-budget warning */}
      {buffer < 0 && (
        <div
          style={{
            marginTop: 16,
            padding: '12px 16px',
            borderRadius: 'var(--r-sm)',
            background: '#F9E0DF',
            border: '1px solid var(--rose)',
            fontSize: 13,
            color: 'var(--rose)',
            fontWeight: 500,
          }}
        >
          ⚠️ You are {formatCurrency(Math.abs(buffer), result.currency)} over budget. Reduce some
          categories or increase your total budget.
        </div>
      )}

      {/* Local tips */}
      {result.tips.length > 0 && (
        <div
          style={{
            marginTop: 24,
            background: 'var(--paper)',
            borderRadius: 'var(--r-sm)',
            padding: '16px 18px',
            border: '1px solid var(--line)',
          }}
        >
          <div className="t-label" style={{ marginBottom: 10 }}>
            Local money tips
          </div>
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
