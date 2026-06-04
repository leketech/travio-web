// ── Core domain types ──────────────────────────────────────────────

export type TravelStyle = 'ultra-cheap' | 'budget' | 'comfort' | 'luxury'

export interface TripInput {
  destination: string
  country: string
  totalBudget: number
  currency: string
  days: number
  travelers: number
  style: TravelStyle
  startDate?: string
}

export interface BudgetCategory {
  id: string
  label: string
  emoji: string
  amount: number
  percentage: number
  color: string
  description?: string
}

export interface BudgetResult {
  id: string
  destination: string
  country: string
  flag: string
  totalBudget: number
  currency: string
  days: number
  travelers: number
  style: TravelStyle
  dailyBudget: number
  categories: BudgetCategory[]
  remainingBuffer: number
  verdict: 'yes' | 'maybe' | 'no'
  verdictMessage: string
  tips: string[]
  neighborhoods: string[]
  localTips: string[]
  createdAt: string
}

export interface AffordInput {
  destination: string
  budget: number
  currency: string
  days: number
}

export interface AffordResult {
  verdict: 'yes' | 'maybe' | 'no'
  budget: number
  currency: string
  destination: string
  days: number
  dailyCost: number
  totalEstimate: number
  message: string
  conditions?: string[]  // for "maybe" verdict
  alternatives?: CompareDestination[]  // for "no" verdict
  shareUrl?: string
}

export interface CompareDestination {
  id: string
  name: string
  country: string
  flag: string
  avgDailyCost: number
  currency: string
  accommodation: { min: number; max: number }
  food: { min: number; max: number }
  transport: { min: number; max: number }
  safetyScore: number
  internetScore: number
  weatherRating: string
  bestMonths: string[]
  tags: string[]
}

export interface SavedTrip {
  id: string
  name: string
  destination: string
  flag: string
  budget: number
  currency: string
  days: number
  createdAt: string
  result: BudgetResult
}

// ── API types ──────────────────────────────────────────────────────

export interface ApiResponse<T> {
  data: T
  error?: string
  timestamp: string
}

export interface PlanRequest extends TripInput {}
export interface PlanResponse extends BudgetResult {}

// ── Recommendation types ───────────────────────────────────────────

export interface AccommodationCard {
  id: string
  name: string
  type: 'hostel' | 'guesthouse' | 'budget-hotel' | 'mid-range-hotel'
  pricePerNight: number
  currency: string
  rating: number
  reviewCount: number
  neighborhood: string
  highlights: string[]
  bookingUrl: string
}

export interface FoodPlace {
  id: string
  name: string
  cuisine: string
  priceLevel: 1 | 2 | 3
  avgMeal: number
  currency: string
  specialty: string
  neighborhood: string
  tip?: string
}

export interface ActivityRecommendation {
  id: string
  name: string
  category: 'culture' | 'nature' | 'food-tour' | 'adventure' | 'free'
  price: number
  currency: string
  duration: string
  description: string
  bookingUrl?: string
}

// ── UI types ───────────────────────────────────────────────────────

export type Theme = 'light' | 'dark'
export type AccentPalette = 'forest' | 'coral' | 'ocean' | 'sunset'

export interface NavItem {
  label: string
  href: string
  icon?: string
}
