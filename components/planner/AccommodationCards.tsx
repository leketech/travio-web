'use client'

import { ExternalLink } from 'lucide-react'
import type { AccommodationCard } from '@/types'
import { formatCurrency } from '@/lib/utils'

interface Props {
  accommodations: AccommodationCard[]
  nights: number
  budgetPerNight: number
  currency: string
}

const TYPE_LABELS: Record<AccommodationCard['type'], string> = {
  hostel: 'Hostel',
  guesthouse: 'Guesthouse',
  'budget-hotel': 'Budget Hotel',
  'mid-range-hotel': 'Hotel',
}

const TYPE_COLORS: Record<AccommodationCard['type'], string> = {
  hostel: 'var(--forest-700)',
  guesthouse: 'var(--sky)',
  'budget-hotel': 'var(--gold)',
  'mid-range-hotel': 'var(--coral)',
}

function RatingBar({ value }: { value: number }) {
  const pct = ((value - 6) / 4) * 100
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
      <div
        style={{
          width: 48,
          height: 4,
          borderRadius: 9999,
          background: 'var(--line)',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: `${pct}%`,
            height: '100%',
            background: value >= 9 ? 'var(--forest-600)' : value >= 8 ? 'var(--gold)' : 'var(--coral)',
            borderRadius: 9999,
          }}
        />
      </div>
      <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink)' }}>{value.toFixed(1)}</span>
    </div>
  )
}

export default function AccommodationCards({ accommodations, nights, budgetPerNight, currency }: Props) {
  return (
    <div>
      <div
        style={{
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          marginBottom: 16,
          gap: 8,
          flexWrap: 'wrap',
        }}
      >
        <div>
          <div className="t-label" style={{ marginBottom: 4 }}>
            Where to stay
          </div>
          <p style={{ fontSize: 13, color: 'var(--muted)' }}>
            Based on your accommodation budget ·{' '}
            <strong style={{ color: 'var(--ink)' }}>
              {formatCurrency(budgetPerNight, currency)}/night
            </strong>
          </p>
        </div>
        <a
          href={`https://www.booking.com/searchresults.html?ss=Bangkok&utm_source=travio&utm_medium=referral`}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontSize: 12,
            fontWeight: 600,
            color: 'var(--forest-700)',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: 4,
          }}
        >
          View all on Booking.com
          <ExternalLink size={12} />
        </a>
      </div>

      {/* Horizontal scroll on mobile, 4-col grid on desktop */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: 14,
        }}
      >
        {accommodations.map((hotel) => {
          const totalEstimate = hotel.pricePerNight * nights
          const withinBudget = hotel.pricePerNight <= budgetPerNight * 1.1

          return (
            <div
              key={hotel.id}
              style={{
                background: 'var(--surface)',
                borderRadius: 'var(--r-md)',
                border: `1px solid ${withinBudget ? 'var(--line)' : 'var(--line-2)'}`,
                boxShadow: 'var(--sh-1)',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
              }}
            >
              {/* Image placeholder */}
              <div
                style={{
                  height: 100,
                  background: 'var(--paper-2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 40,
                  position: 'relative',
                }}
              >
                🏨
                {withinBudget && (
                  <span
                    style={{
                      position: 'absolute',
                      top: 8,
                      right: 8,
                      background: 'var(--forest-700)',
                      color: 'var(--on-accent)',
                      fontSize: 10,
                      fontWeight: 700,
                      padding: '2px 7px',
                      borderRadius: 9999,
                    }}
                  >
                    ✓ In budget
                  </span>
                )}
              </div>

              <div style={{ padding: '14px 14px 16px', display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
                {/* Type badge */}
                <span
                  style={{
                    display: 'inline-flex',
                    alignSelf: 'flex-start',
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: TYPE_COLORS[hotel.type],
                    background: `${TYPE_COLORS[hotel.type]}18`,
                    padding: '2px 7px',
                    borderRadius: 4,
                  }}
                >
                  {TYPE_LABELS[hotel.type]}
                </span>

                {/* Name */}
                <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink)', lineHeight: 1.3 }}>
                  {hotel.name}
                </div>

                {/* Neighborhood */}
                <div style={{ fontSize: 12, color: 'var(--muted)' }}>📍 {hotel.neighborhood}</div>

                {/* Rating */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <RatingBar value={hotel.rating} />
                  <span style={{ fontSize: 11, color: 'var(--muted)' }}>
                    {hotel.reviewCount.toLocaleString()} reviews
                  </span>
                </div>

                {/* Highlights */}
                <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 3 }}>
                  {hotel.highlights.map((h) => (
                    <li key={h} style={{ fontSize: 12, color: 'var(--ink-2)', display: 'flex', gap: 5, alignItems: 'flex-start' }}>
                      <span style={{ color: 'var(--forest-500)', flexShrink: 0 }}>·</span>
                      {h}
                    </li>
                  ))}
                </ul>

                {/* Price + CTA */}
                <div
                  style={{
                    marginTop: 'auto',
                    paddingTop: 10,
                    borderTop: '1px solid var(--line)',
                    display: 'flex',
                    alignItems: 'flex-end',
                    justifyContent: 'space-between',
                    gap: 8,
                  }}
                >
                  <div>
                    <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--ink)' }}>
                      {formatCurrency(hotel.pricePerNight, hotel.currency)}
                      <span style={{ fontSize: 12, fontWeight: 400, color: 'var(--muted)', marginLeft: 2 }}>
                        /night
                      </span>
                    </div>
                    <div style={{ fontSize: 11, color: 'var(--muted)' }}>
                      est. {formatCurrency(totalEstimate, hotel.currency)} total
                    </div>
                  </div>
                  <a
                    href={hotel.bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 4,
                      padding: '7px 12px',
                      borderRadius: 9999,
                      background: 'var(--forest-700)',
                      color: 'var(--on-accent)',
                      fontSize: 12,
                      fontWeight: 600,
                      textDecoration: 'none',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    Book
                    <ExternalLink size={11} />
                  </a>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Booking.com attribution */}
      <p style={{ fontSize: 11, color: 'var(--faint)', marginTop: 10, textAlign: 'right' }}>
        Powered by Booking.com · prices are indicative and may vary
      </p>
    </div>
  )
}
