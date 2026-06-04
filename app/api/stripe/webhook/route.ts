import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { cookies } from 'next/headers'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2026-04-22.dahlia' })
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig  = req.headers.get('stripe-signature')

  if (!sig) return NextResponse.json({ error: 'No signature' }, { status: 400 })

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret)
  } catch {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  const cookieStore = await cookies()

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session
      if (session.mode === 'subscription' && session.payment_status === 'paid') {
        // Mark user premium via cookie (replace with DB write once backend is live)
        cookieStore.set('travio_premium', '1', {
          httpOnly: true, secure: true, sameSite: 'lax',
          maxAge: 60 * 60 * 24 * 365,
          path: '/',
        })
        cookieStore.set('travio_customer', session.customer as string, {
          httpOnly: true, secure: true, sameSite: 'lax',
          maxAge: 60 * 60 * 24 * 365,
          path: '/',
        })
      }
      break
    }
    case 'customer.subscription.deleted': {
      cookieStore.delete('travio_premium')
      cookieStore.delete('travio_customer')
      break
    }
    case 'customer.subscription.updated': {
      const sub = event.data.object as Stripe.Subscription
      if (sub.status !== 'active' && sub.status !== 'trialing') {
        cookieStore.delete('travio_premium')
      }
      break
    }
  }

  return NextResponse.json({ received: true })
}
