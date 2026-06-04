import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2026-04-22.dahlia' })

const PRICES = {
  monthly: process.env.STRIPE_PRICE_MONTHLY!,
  annual:  process.env.STRIPE_PRICE_ANNUAL!,
}

export async function POST(req: NextRequest) {
  const { plan = 'monthly', email } = await req.json() as { plan?: 'monthly' | 'annual'; email?: string }

  const priceId = PRICES[plan]
  if (!priceId) {
    return NextResponse.json({ error: 'Invalid plan' }, { status: 400 })
  }

  const origin = req.headers.get('origin') ?? process.env.NEXT_PUBLIC_URL ?? 'http://localhost:3000'

  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    payment_method_types: ['card'],
    line_items: [{ price: priceId, quantity: 1 }],
    customer_email: email,
    success_url: `${origin}/pricing/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/pricing`,
    metadata: { plan },
    subscription_data: {
      trial_period_days: 7,
      metadata: { plan },
    },
  })

  return NextResponse.json({ url: session.url })
}
