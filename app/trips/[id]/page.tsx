import { Suspense } from 'react'
import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import BudgetBreakdown from '@/components/planner/BudgetBreakdown'
import BudgetChart from '@/components/planner/BudgetChart'
import { mockBangkokResult } from '@/lib/mock-data'
import Link from 'next/link'
import { ArrowLeft, Share2, Bookmark } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Budget Plan',
}

// In production this would fetch from the API
async function getTripResult(id: string) {
  // TODO: fetch from /api/trips/[id]
  return mockBangkokResult
}

export default async function TripPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const result = await getTripResult(id)

  return (
    <>
      <Navbar />
      <main style={{ minHeight: '100vh', background: 'var(--paper)', padding: '32px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          {/* Breadcrumb */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
            <Link
              href="/"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                fontSize: 14,
                color: 'var(--muted)',
                textDecoration: 'none',
              }}
            >
              <ArrowLeft size={16} />
              Back to planner
            </Link>
            <div style={{ display: 'flex', gap: 8 }}>
              <button
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '8px 14px',
                  borderRadius: 9999,
                  border: '1px solid var(--line)',
                  background: 'var(--surface)',
                  fontSize: 13,
                  fontWeight: 500,
                  cursor: 'pointer',
                  color: 'var(--ink)',
                }}
              >
                <Bookmark size={14} />
                Save trip
              </button>
              <button
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '8px 14px',
                  borderRadius: 9999,
                  border: '1px solid var(--line)',
                  background: 'var(--surface)',
                  fontSize: 13,
                  fontWeight: 500,
                  cursor: 'pointer',
                  color: 'var(--ink)',
                }}
              >
                <Share2 size={14} />
                Share
              </button>
            </div>
          </div>

          {/* Two-column layout */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr)',
              gap: 20,
              alignItems: 'start',
            }}
            className="dashboard-grid"
          >
            {/* Main — breakdown */}
            <Suspense
              fallback={
                <div
                  style={{
                    background: 'var(--surface)',
                    borderRadius: 'var(--r-lg)',
                    height: 500,
                    animation: 'pulse 1.5s infinite',
                  }}
                />
              }
            >
              <BudgetBreakdown result={result} />
            </Suspense>

            {/* Sidebar — chart + neighborhoods */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <BudgetChart result={result} />

              {/* Neighborhoods */}
              <div
                style={{
                  background: 'var(--surface)',
                  borderRadius: 'var(--r-md)',
                  border: '1px solid var(--line)',
                  padding: 20,
                }}
              >
                <div className="t-label" style={{ marginBottom: 12 }}>
                  Best neighborhoods to stay
                </div>
                {result.neighborhoods.map((n, i) => (
                  <div
                    key={n}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      padding: '8px 0',
                      borderBottom: i < result.neighborhoods.length - 1 ? '1px solid var(--line)' : 'none',
                    }}
                  >
                    <span
                      style={{
                        width: 22,
                        height: 22,
                        borderRadius: 9999,
                        background: 'var(--forest-100)',
                        color: 'var(--forest-700)',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 11,
                        fontWeight: 700,
                        flexShrink: 0,
                      }}
                    >
                      {i + 1}
                    </span>
                    <span style={{ fontSize: 14, color: 'var(--ink-2)' }}>{n}</span>
                  </div>
                ))}
              </div>

              {/* Local tips */}
              <div
                style={{
                  background: 'var(--forest-50)',
                  borderRadius: 'var(--r-md)',
                  border: '1px solid var(--forest-100)',
                  padding: 20,
                }}
              >
                <div className="t-label" style={{ color: 'var(--forest-600)', marginBottom: 12 }}>
                  Local know-how
                </div>
                {result.localTips.map((tip, i) => (
                  <div
                    key={i}
                    style={{
                      fontSize: 13,
                      color: 'var(--forest-800)',
                      display: 'flex',
                      gap: 8,
                      alignItems: 'flex-start',
                      lineHeight: 1.4,
                      marginBottom: i < result.localTips.length - 1 ? 10 : 0,
                    }}
                  >
                    <span style={{ color: 'var(--forest-500)', flexShrink: 0 }}>✦</span>
                    {tip}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />

      <style>{`
        @media (max-width: 768px) {
          .dashboard-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </>
  )
}
