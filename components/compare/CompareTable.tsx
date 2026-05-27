'use client'

import { useState } from 'react'
import type { CompareDestination } from '@/types'
import { formatCurrency } from '@/lib/utils'
import { Wifi, Shield, Sun } from 'lucide-react'

interface Props {
  destinations: CompareDestination[]
  budgetFilter?: number
}

export default function CompareTable({ destinations, budgetFilter }: Props) {
  const [sortBy, setSortBy] = useState<'cost' | 'safety' | 'internet'>('cost')

  const filtered = destinations.filter((d) =>
    budgetFilter ? d.avgDailyCost <= budgetFilter / 7 : true
  )

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'cost') return a.avgDailyCost - b.avgDailyCost
    if (sortBy === 'safety') return b.safetyScore - a.safetyScore
    if (sortBy === 'internet') return b.internetScore - a.internetScore
    return 0
  })

  return (
    <div>
      {/* Sort controls */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
        {[
          { id: 'cost' as const, label: 'Cheapest first' },
          { id: 'safety' as const, label: 'Safest first' },
          { id: 'internet' as const, label: 'Best WiFi' },
        ].map((s) => (
          <button
            key={s.id}
            onClick={() => setSortBy(s.id)}
            style={{
              padding: '8px 16px',
              borderRadius: 9999,
              border: `1.5px solid ${sortBy === s.id ? 'var(--forest-700)' : 'var(--line)'}`,
              background: sortBy === s.id ? 'var(--forest-50)' : 'var(--surface)',
              color: sortBy === s.id ? 'var(--forest-700)' : 'var(--ink)',
              fontSize: 13,
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'all 0.15s',
            }}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Cards grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: 16,
        }}
      >
        {sorted.map((dest, rank) => (
          <div
            key={dest.id}
            style={{
              background: 'var(--surface)',
              borderRadius: 'var(--r-md)',
              border: `1.5px solid ${rank === 0 ? 'var(--forest-700)' : 'var(--line)'}`,
              boxShadow: rank === 0 ? 'var(--sh-2)' : 'var(--sh-1)',
              padding: 20,
              position: 'relative',
              transition: 'transform 0.15s',
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)' }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)' }}
          >
            {rank === 0 && (
              <div
                style={{
                  position: 'absolute',
                  top: -10,
                  left: 16,
                  background: 'var(--forest-700)',
                  color: 'var(--on-accent)',
                  fontSize: 11,
                  fontWeight: 700,
                  padding: '3px 10px',
                  borderRadius: 9999,
                  letterSpacing: '0.06em',
                }}
              >
                BEST VALUE
              </div>
            )}

            {/* Flag + name */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
              <span style={{ fontSize: 32 }}>{dest.flag}</span>
              <div>
                <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--ink)' }}>{dest.name}</div>
                <div style={{ fontSize: 12, color: 'var(--muted)' }}>
                  {dest.tags.slice(0, 3).join(' · ')}
                </div>
              </div>
            </div>

            {/* Daily cost */}
            <div
              style={{
                background: 'var(--paper)',
                borderRadius: 'var(--r-sm)',
                padding: '10px 14px',
                marginBottom: 14,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <span style={{ fontSize: 13, color: 'var(--muted)' }}>Avg. daily cost</span>
              <span className="t-mono" style={{ fontSize: 20, fontWeight: 700, color: 'var(--forest-700)' }}>
                ~{formatCurrency(dest.avgDailyCost, 'USD')}/day
              </span>
            </div>

            {/* Score row */}
            <div style={{ display: 'flex', gap: 10, marginBottom: 14 }}>
              <div
                style={{
                  flex: 1,
                  textAlign: 'center',
                  background: 'var(--forest-50)',
                  borderRadius: 10,
                  padding: '8px 6px',
                }}
              >
                <Shield size={14} color="var(--forest-600)" style={{ margin: '0 auto 2px' }} />
                <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--forest-700)' }}>
                  {dest.safetyScore}
                </div>
                <div style={{ fontSize: 10, color: 'var(--muted)' }}>Safety</div>
              </div>
              <div
                style={{
                  flex: 1,
                  textAlign: 'center',
                  background: 'var(--forest-50)',
                  borderRadius: 10,
                  padding: '8px 6px',
                }}
              >
                <Wifi size={14} color="var(--forest-600)" style={{ margin: '0 auto 2px' }} />
                <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--forest-700)' }}>
                  {dest.internetScore}
                </div>
                <div style={{ fontSize: 10, color: 'var(--muted)' }}>WiFi</div>
              </div>
              <div
                style={{
                  flex: 1,
                  textAlign: 'center',
                  background: 'var(--gold-soft)',
                  borderRadius: 10,
                  padding: '8px 6px',
                }}
              >
                <Sun size={14} color="var(--gold)" style={{ margin: '0 auto 2px' }} />
                <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--gold)' }}>
                  {dest.weatherRating}
                </div>
                <div style={{ fontSize: 10, color: 'var(--muted)' }}>Weather</div>
              </div>
            </div>

            {/* Best months */}
            <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
              {dest.bestMonths.map((m) => (
                <span
                  key={m}
                  style={{
                    padding: '3px 8px',
                    borderRadius: 9999,
                    background: 'var(--paper-2)',
                    fontSize: 11,
                    fontWeight: 500,
                    color: 'var(--muted)',
                  }}
                >
                  {m}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
