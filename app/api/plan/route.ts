import { NextRequest, NextResponse } from 'next/server'
import type { TripInput, BudgetResult, BudgetCategory } from '@/types'

// ── Budget allocation percentages by style ──────────────────────
const ALLOCATION: Record<string, Record<string, number>> = {
  'ultra-cheap': { accommodation: 0.30, food: 0.25, transport: 0.10, activities: 0.10, emergency: 0.10, misc: 0.15 },
  budget:        { accommodation: 0.28, food: 0.20, transport: 0.10, activities: 0.18, emergency: 0.10, misc: 0.14 },
  comfort:       { accommodation: 0.35, food: 0.22, transport: 0.12, activities: 0.18, emergency: 0.08, misc: 0.05 },
  luxury:        { accommodation: 0.45, food: 0.22, transport: 0.12, activities: 0.14, emergency: 0.05, misc: 0.02 },
}

const CATEGORY_META: Record<string, { label: string; emoji: string; color: string }> = {
  accommodation: { label: 'Accommodation', emoji: '🏨', color: '#1F5641' },
  food:          { label: 'Food & Drinks', emoji: '🍽️', color: '#DD7842' },
  transport:     { label: 'Transport', emoji: '🚌', color: '#6F94A6' },
  activities:    { label: 'Activities', emoji: '🎟️', color: '#C29A3D' },
  emergency:     { label: 'Emergency Buffer', emoji: '🛡️', color: '#B85148' },
  misc:          { label: 'Miscellaneous', emoji: '🛍️', color: '#A8AB9D' },
}

export async function POST(req: NextRequest) {
  try {
    const body: TripInput = await req.json()
    const { destination, totalBudget, days, travelers, style, currency = 'USD' } = body

    if (!destination || !totalBudget || !days) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const perPersonBudget = totalBudget / travelers
    const alloc = ALLOCATION[style] ?? ALLOCATION.budget

    // Build category breakdown
    const categories: BudgetCategory[] = Object.entries(alloc).map(([id, pct]) => {
      const amount = Math.round(perPersonBudget * pct)
      return {
        id,
        ...CATEGORY_META[id],
        amount,
        percentage: Math.round(pct * 100),
      }
    })

    const totalAllocated = categories.reduce((s, c) => s + c.amount, 0)
    const remainingBuffer = perPersonBudget - totalAllocated
    const dailyBudget = Math.round(perPersonBudget / days)

    // Simple verdict logic
    const budgetPer100km: Record<string, number> = {}
    const verdict: 'yes' | 'maybe' | 'no' =
      perPersonBudget >= dailyBudget * days * 0.95 ? 'yes' : 'maybe'

    const result: BudgetResult = {
      id: `${destination.toLowerCase().replace(/\s+/g, '-')}-${days}d-${totalBudget}`,
      destination,
      country: destination, // TODO: geocode
      flag: '🌍',
      totalBudget: perPersonBudget,
      currency,
      days,
      travelers,
      style,
      dailyBudget,
      categories,
      remainingBuffer: Math.max(0, remainingBuffer),
      verdict,
      verdictMessage:
        verdict === 'yes'
          ? `$${perPersonBudget} is enough for ${days} days in ${destination}. You\'ll have ~$${Math.max(0, remainingBuffer)} left over.`
          : `It\'s tight. Stretch your budget by staying in budget accommodation and eating local.`,
      tips: [
        `Stay in budget guesthouses or hostels to keep accommodation under $${categories.find(c => c.id === 'accommodation')?.amount}`,
        `Eat at local markets — saves 60% vs tourist restaurants`,
        `Use public transport instead of taxis`,
      ],
      neighborhoods: ['City centre budget area', 'Local residential area'],
      localTips: [`Research free attractions ahead of time`, `Buy a local SIM card for data`],
      createdAt: new Date().toISOString(),
    }

    return NextResponse.json({ data: result, timestamp: new Date().toISOString() })
  } catch (err) {
    console.error('[/api/plan]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
