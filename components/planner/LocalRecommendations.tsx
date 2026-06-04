'use client'

import { useState } from 'react'
import { ExternalLink } from 'lucide-react'
import type { FoodPlace, ActivityRecommendation } from '@/types'
import { formatCurrency } from '@/lib/utils'

interface Props {
  foodPlaces: FoodPlace[]
  activities: ActivityRecommendation[]
}

const PRICE_LEVELS: Record<1 | 2 | 3, { label: string; color: string }> = {
  1: { label: '$  Budget', color: 'var(--forest-600)' },
  2: { label: '$$  Mid-range', color: 'var(--gold)' },
  3: { label: '$$$  Splurge', color: 'var(--coral)' },
}

const CATEGORY_LABELS: Record<ActivityRecommendation['category'], { label: string; emoji: string; color: string }> = {
  culture:    { label: 'Culture',    emoji: '🏛️', color: 'var(--forest-700)' },
  nature:     { label: 'Nature',     emoji: '🌿', color: 'var(--forest-500)' },
  'food-tour':{ label: 'Food Tour',  emoji: '🍜', color: 'var(--coral)' },
  adventure:  { label: 'Adventure',  emoji: '🧗', color: 'var(--gold)' },
  free:       { label: 'Free',       emoji: '✨', color: 'var(--sky)' },
}

type Tab = 'food' | 'activities'

export default function LocalRecommendations({ foodPlaces, activities }: Props) {
  const [tab, setTab] = useState<Tab>('food')

  return (
    <div>
      <div className="t-label" style={{ marginBottom: 16 }}>
        Local recommendations
      </div>

      {/* Tab switcher */}
      <div
        style={{
          display: 'inline-flex',
          background: 'var(--paper-2)',
          borderRadius: 'var(--r-sm)',
          padding: 4,
          marginBottom: 20,
          gap: 2,
        }}
      >
        {(['food', 'activities'] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            style={{
              padding: '7px 16px',
              borderRadius: 10,
              border: 'none',
              cursor: 'pointer',
              fontSize: 13,
              fontWeight: 600,
              transition: 'all 0.15s',
              background: tab === t ? 'var(--surface)' : 'transparent',
              color: tab === t ? 'var(--ink)' : 'var(--muted)',
              boxShadow: tab === t ? 'var(--sh-1)' : 'none',
            }}
          >
            {t === 'food' ? '🍽️  Where to eat' : '🎟️  Things to do'}
          </button>
        ))}
      </div>

      {/* Food tab */}
      {tab === 'food' && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: 12,
          }}
        >
          {foodPlaces.map((place) => (
            <div
              key={place.id}
              style={{
                background: 'var(--surface)',
                borderRadius: 'var(--r-md)',
                border: '1px solid var(--line)',
                padding: '16px 18px',
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink)' }}>{place.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 1 }}>{place.cuisine}</div>
                </div>
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    color: PRICE_LEVELS[place.priceLevel].color,
                    whiteSpace: 'nowrap',
                    flexShrink: 0,
                  }}
                >
                  {PRICE_LEVELS[place.priceLevel].label}
                </span>
              </div>

              <div
                style={{
                  background: 'var(--paper)',
                  borderRadius: 8,
                  padding: '8px 10px',
                  fontSize: 13,
                  color: 'var(--ink-2)',
                  fontStyle: 'italic',
                }}
              >
                &ldquo;{place.specialty}&rdquo;
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 12, color: 'var(--muted)' }}>📍 {place.neighborhood}</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)' }}>
                  avg {formatCurrency(place.avgMeal, place.currency)}
                </span>
              </div>

              {place.tip && (
                <div
                  style={{
                    fontSize: 12,
                    color: 'var(--forest-800)',
                    background: 'var(--forest-50)',
                    border: '1px solid var(--forest-100)',
                    borderRadius: 6,
                    padding: '6px 10px',
                    display: 'flex',
                    gap: 6,
                    alignItems: 'flex-start',
                    lineHeight: 1.4,
                  }}
                >
                  <span style={{ color: 'var(--forest-600)', flexShrink: 0 }}>💡</span>
                  {place.tip}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Activities tab */}
      {tab === 'activities' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {activities.map((act) => {
            const meta = CATEGORY_LABELS[act.category]
            return (
              <div
                key={act.id}
                style={{
                  background: 'var(--surface)',
                  borderRadius: 'var(--r-md)',
                  border: '1px solid var(--line)',
                  padding: '16px 18px',
                  display: 'flex',
                  gap: 14,
                  alignItems: 'flex-start',
                }}
              >
                {/* Category icon */}
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 12,
                    background: `${meta.color}18`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 20,
                    flexShrink: 0,
                  }}
                >
                  {meta.emoji}
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      justifyContent: 'space-between',
                      gap: 8,
                      marginBottom: 4,
                    }}
                  >
                    <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink)' }}>{act.name}</div>
                    <div style={{ textAlign: 'right', flexShrink: 0 }}>
                      {act.price === 0 ? (
                        <span
                          style={{
                            fontSize: 13,
                            fontWeight: 700,
                            color: 'var(--forest-600)',
                          }}
                        >
                          Free
                        </span>
                      ) : (
                        <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)' }}>
                          {formatCurrency(act.price, act.currency)}
                        </span>
                      )}
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: 10, marginBottom: 6 }}>
                    <span
                      style={{
                        fontSize: 11,
                        fontWeight: 600,
                        color: meta.color,
                        background: `${meta.color}18`,
                        padding: '2px 7px',
                        borderRadius: 4,
                      }}
                    >
                      {meta.label}
                    </span>
                    <span style={{ fontSize: 12, color: 'var(--muted)' }}>⏱ {act.duration}</span>
                  </div>

                  <p style={{ fontSize: 13, color: 'var(--ink-2)', lineHeight: 1.5, margin: 0 }}>
                    {act.description}
                  </p>

                  {act.bookingUrl && (
                    <a
                      href={act.bookingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 4,
                        marginTop: 10,
                        fontSize: 12,
                        fontWeight: 600,
                        color: 'var(--forest-700)',
                        textDecoration: 'none',
                      }}
                    >
                      Book via GetYourGuide
                      <ExternalLink size={11} />
                    </a>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}