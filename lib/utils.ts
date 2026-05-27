import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(
  amount: number,
  currency: string = 'USD',
  locale: string = 'en-US'
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatNumber(n: number): string {
  return new Intl.NumberFormat('en-US').format(n)
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function getVerdictColor(verdict: 'yes' | 'maybe' | 'no'): string {
  const map = {
    yes: 'var(--forest-600)',
    maybe: 'var(--gold)',
    no: 'var(--rose)',
  }
  return map[verdict]
}

export function getVerdictLabel(verdict: 'yes' | 'maybe' | 'no'): string {
  const map = {
    yes: 'YES',
    maybe: 'POSSIBLE IF',
    no: 'NOT QUITE',
  }
  return map[verdict]
}

export function getTravelStyleLabel(style: string): string {
  const map: Record<string, string> = {
    'ultra-cheap': 'Ultra Budget',
    budget: 'Budget',
    comfort: 'Comfort',
    luxury: 'Luxury',
  }
  return map[style] ?? style
}

export function getDailyBudgetGuide(style: string): string {
  const map: Record<string, string> = {
    'ultra-cheap': 'Hostels, street food, public transport',
    budget: 'Budget hotels, local restaurants, some activities',
    comfort: 'Mid-range hotels, mix of dining, guided tours',
    luxury: 'Luxury hotels, fine dining, premium experiences',
  }
  return map[style] ?? ''
}

export function buildShareUrl(result: {
  destination: string
  budget: number
  currency: string
  days: number
  verdict: string
}): string {
  const slug = `${slugify(result.destination)}-${result.days}d-${result.budget}`
  return `/afford/${slug}`
}

// Map budget category IDs to emojis
export const CATEGORY_EMOJIS: Record<string, string> = {
  accommodation: '🏨',
  food: '🍽️',
  transport: '🚌',
  activities: '🎟️',
  emergency: '🛡️',
  misc: '🛍️',
}

// Map budget category IDs to Tailwind color classes
export const CATEGORY_COLORS: Record<string, string> = {
  accommodation: 'bg-forest-700',
  food: 'bg-coral',
  transport: 'bg-sky',
  activities: 'bg-gold',
  emergency: 'bg-rose',
  misc: 'bg-faint',
}
