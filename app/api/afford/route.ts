import { NextRequest, NextResponse } from 'next/server'
import type { AffordResult } from '@/types'

// Rough daily cost estimates (USD) for popular destinations
const DAILY_COSTS: Record<string, number> = {
  // SE Asia
  bangkok: 55, bali: 60, hanoi: 45, 'ho chi minh': 50,
  'chiang mai': 50, phuket: 70, 'kuala lumpur': 55, singapore: 170,
  // South Asia
  delhi: 40, mumbai: 50, goa: 55,
  // Middle East
  dubai: 180, istanbul: 70, 'abu dhabi': 170,
  // Europe
  paris: 200, london: 220, rome: 160, lisbon: 90, porto: 80,
  amsterdam: 200, berlin: 100, barcelona: 140, madrid: 130,
  // Caucasus
  tbilisi: 40, yerevan: 45,
  // Americas
  'new york': 280, 'los angeles': 200, cancun: 90, 'mexico city': 60,
  medellin: 60, buenos aires: 80,
  // Africa
  marrakech: 60, nairobi: 70, cape town: 80,
}

function getDailyCost(destination: string): number {
  const lower = destination.toLowerCase()
  for (const [key, cost] of Object.entries(DAILY_COSTS)) {
    if (lower.includes(key)) return cost
  }
  return 80 // default
}

export async function POST(req: NextRequest) {
  try {
    const { destination, budget, currency = 'USD', days } = await req.json()

    if (!destination || !budget || !days) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const dailyCost = getDailyCost(destination)
    const totalEstimate = dailyCost * days
    const diff = budget - totalEstimate

    let verdict: 'yes' | 'maybe' | 'no'
    let message: string
    let conditions: string[] | undefined

    if (diff >= 0) {
      verdict = 'yes'
      message = `$${budget} is ${diff > 100 ? 'more than enough' : 'just enough'} for ${days} days in ${destination}. You could have ~$${Math.round(diff)} left over.`
    } else if (diff >= -budget * 0.25) {
      verdict = 'maybe'
      message = `It's tight but doable if you make smart choices. You're about $${Math.abs(Math.round(diff))} short at average prices.`
      conditions = [
        'Book a hostel or guesthouse instead of a hotel',
        'Eat at local markets and street food stalls',
        'Use public transport — skip taxis and ride-shares',
        'Choose 1-2 paid activities, make the rest free',
      ]
    } else {
      verdict = 'no'
      message = `$${budget} won't cover ${days} days in ${destination} comfortably. Average daily cost is ~$${dailyCost}, so you'd need ~$${totalEstimate}.`
    }

    const result: AffordResult = {
      verdict,
      budget,
      currency,
      destination,
      days,
      dailyCost,
      totalEstimate,
      message,
      conditions,
      shareUrl: `/afford/${destination.toLowerCase().replace(/\s+/g, '-')}-${days}d-${budget}`,
    }

    return NextResponse.json({ data: result, timestamp: new Date().toISOString() })
  } catch (err) {
    console.error('[/api/afford]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
