import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import CompareTable from '@/components/compare/CompareTable'
import { compareDestinations } from '@/lib/mock-data'

export const metadata: Metadata = {
  title: 'Compare Destinations',
  description: 'Compare 60+ countries side by side — daily costs, safety, WiFi, and best months to visit.',
}

export default function ComparePage() {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: '100vh', background: 'var(--paper)', padding: '48px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          {/* Header */}
          <div style={{ marginBottom: 40 }}>
            <div className="t-label" style={{ color: 'var(--forest-600)', marginBottom: 10 }}>
              60+ destinations
            </div>
            <h1 className="t-display" style={{ fontSize: 'clamp(36px, 6vw, 60px)', marginBottom: 12 }}>
              Compare by budget
            </h1>
            <p style={{ fontSize: 18, color: 'var(--muted)', maxWidth: 500 }}>
              Find where your money goes furthest. Sort by cost, safety, or WiFi quality.
            </p>
          </div>

          <CompareTable destinations={compareDestinations} />
        </div>
      </main>
      <Footer />
    </>
  )
}
