'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import { Plane } from 'lucide-react'

function LoadingContent() {
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Simulate AI planning (in production: POST to /api/plan then redirect)
    const timer = setTimeout(() => {
      router.replace('/trips/bangkok-7d-1000')
    }, 2200)
    return () => clearTimeout(timer)
  }, [router])

  const dest = searchParams.get('dest') ?? 'your destination'
  const budget = searchParams.get('budget') ?? '1000'

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--forest-800)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
        color: 'var(--on-accent)',
      }}
    >
      {/* Animated logo */}
      <div
        style={{
          width: 72,
          height: 72,
          borderRadius: 24,
          background: 'var(--forest-600)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 32,
          animation: 'float 2s ease-in-out infinite',
        }}
      >
        <Plane size={36} color="white" />
      </div>

      <h1 className="t-display" style={{ fontSize: 40, color: 'white', marginBottom: 12, textAlign: 'center' }}>
        Building your plan…
      </h1>
      <p style={{ fontSize: 18, color: 'var(--forest-300)', marginBottom: 40, textAlign: 'center' }}>
        Allocating <strong style={{ color: 'white' }}>${budget}</strong> across {dest}
      </p>

      {/* Progress steps */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, maxWidth: 340, width: '100%' }}>
        {[
          { label: 'Checking destination costs', delay: 0 },
          { label: 'Allocating accommodation budget', delay: 400 },
          { label: 'Calculating food & transport', delay: 800 },
          { label: 'Adding local tips', delay: 1200 },
        ].map((step, i) => (
          <div key={step.label} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div
              style={{
                width: 22,
                height: 22,
                borderRadius: 9999,
                background: 'var(--forest-600)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                animation: `fadein 0.5s ${step.delay}ms both`,
              }}
            >
              <span style={{ fontSize: 11, color: 'white', fontWeight: 700 }}>✓</span>
            </div>
            <span
              style={{
                fontSize: 14,
                color: 'var(--forest-300)',
                animation: `fadein 0.5s ${step.delay}ms both`,
              }}
            >
              {step.label}
            </span>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes fadein {
          from { opacity: 0; transform: translateX(-8px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  )
}

export default function NewTripPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', background: 'var(--forest-800)' }} />}>
      <LoadingContent />
    </Suspense>
  )
}
