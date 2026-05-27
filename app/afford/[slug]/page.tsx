import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import AffordResultCard from '@/components/afford/AffordResult'
import type { AffordResult } from '@/types'
import { compareDestinations } from '@/lib/mock-data'

interface PageProps {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ dest?: string; days?: string; budget?: string }>
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const sp = await searchParams
  const dest = sp.dest ?? 'this destination'
  const budget = sp.budget ?? '?'
  const days = sp.days ?? '?'
  return {
    title: `Can I afford ${dest} for ${days} days with $${budget}?`,
    description: `Find out if $${budget} is enough for ${days} days in ${dest} — with a full verdict and actionable tips.`,
  }
}

// Build a mock afford result from query params
async function getAffordResult(
  dest: string,
  budget: number,
  days: number
): Promise<AffordResult> {
  // Rough daily cost estimates by category
  const ROUGH_DAILY: Record<string, number> = {
    default: 80,
    bangkok: 55,
    bali: 60,
    hanoi: 45,
    'ho chi minh': 50,
    dubai: 180,
    paris: 200,
    london: 220,
    tokyo: 130,
    istanbul: 70,
    tbilisi: 40,
    lisbon: 90,
  }

  const key = Object.keys(ROUGH_DAILY).find((k) =>
    dest.toLowerCase().includes(k)
  ) ?? 'default'

  const dailyCost = ROUGH_DAILY[key]
  const totalEstimate = dailyCost * days
  const diff = budget - totalEstimate

  let verdict: 'yes' | 'maybe' | 'no'
  let message: string
  let conditions: string[] | undefined
  let alternatives: typeof compareDestinations | undefined

  if (diff >= 0) {
    verdict = 'yes'
    message = `$${budget} is ${diff > 50 ? 'more than enough' : 'just enough'} for ${days} days in ${dest}. You'll end up with ~$${Math.max(0, diff)} left over.`
  } else if (diff >= -budget * 0.25) {
    verdict = 'maybe'
    message = `It's tight, but doable if you make smart choices. You're ~$${Math.abs(diff)} short at average prices.`
    conditions = [
      'Stay in budget hostels or guesthouses instead of hotels',
      'Eat at local markets and street food stalls',
      'Use public transport — avoid taxis and ride-share apps',
      'Skip 1-2 paid tourist attractions and explore free neighbourhoods',
    ]
  } else {
    verdict = 'no'
    message = `$${budget} won't stretch to ${days} days in ${dest} comfortably. The average daily cost is $${dailyCost}, so you'd need ~$${totalEstimate}.`
    alternatives = compareDestinations.filter(
      (d) => d.avgDailyCost * days <= budget * 1.1
    ).slice(0, 3)
  }

  return {
    verdict,
    budget,
    currency: 'USD',
    destination: dest,
    days,
    dailyCost,
    totalEstimate,
    message,
    conditions,
    alternatives,
  }
}

export default async function AffordSlugPage({ params, searchParams }: PageProps) {
  const sp = await searchParams
  const dest = sp.dest ?? 'Bangkok'
  const budget = Number(sp.budget ?? 1000)
  const days = Number(sp.days ?? 7)

  const result = await getAffordResult(dest, budget, days)

  return (
    <>
      <Navbar />
      <main
        style={{
          minHeight: '100vh',
          background: 'var(--paper)',
          padding: '60px 24px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <AffordResultCard result={result} />
      </main>
      <Footer />
    </>
  )
}
