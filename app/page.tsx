import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import HeroSection from '@/components/landing/HeroSection'
import FeaturesSection from '@/components/landing/FeaturesSection'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Travio — Know before you go.',
  description: 'AI-powered travel budget planner. Tell us your budget — we build the smartest spend plan for your trip.',
}

const testimonials = [
  {
    quote: 'I had $900 and wasn\'t sure if Bali was realistic. Travio said YES, built my whole plan, and I came back with $120 to spare.',
    name: 'Adaeze O.',
    role: 'First-time solo traveler',
    flag: '🇳🇬',
  },
  {
    quote: 'Used this to prove funds for my Schengen visa application. The breakdown was exactly what the embassy needed to see.',
    name: 'Kofi A.',
    role: 'Digital nomad',
    flag: '🇬🇭',
  },
  {
    quote: 'Travio saved our group trip. 4 people, different budgets — it calculated the split perfectly and kept us all on track.',
    name: 'Maria T.',
    role: 'Travel blogger',
    flag: '🇵🇹',
  },
]

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesSection />

        {/* How it works */}
        <section style={{ padding: '80px 24px', background: 'var(--paper)' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 56 }}>
              <div className="t-label" style={{ color: 'var(--forest-600)', marginBottom: 12 }}>
                Simple as 1-2-3
              </div>
              <h2 className="t-display" style={{ fontSize: 'clamp(30px, 5vw, 48px)' }}>
                How Travio works
              </h2>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: 32,
              }}
            >
              {[
                {
                  step: '01',
                  title: 'Enter your budget',
                  desc: 'Tell us your total budget, destination, trip length, and travel style. Takes 30 seconds.',
                  emoji: '💰',
                },
                {
                  step: '02',
                  title: 'AI builds the plan',
                  desc: 'Our AI allocates your budget across accommodation, food, transport, activities, and an emergency buffer.',
                  emoji: '🤖',
                },
                {
                  step: '03',
                  title: 'Travel with confidence',
                  desc: 'Know your daily limit, get local tips, and adjust sliders in real-time to match your priorities.',
                  emoji: '✈️',
                },
              ].map((s) => (
                <div key={s.step} style={{ textAlign: 'center' }}>
                  <div
                    style={{
                      width: 64,
                      height: 64,
                      borderRadius: 20,
                      background: 'var(--forest-700)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 28,
                      margin: '0 auto 16px',
                    }}
                  >
                    {s.emoji}
                  </div>
                  <div
                    className="t-eyebrow"
                    style={{ marginBottom: 6 }}
                  >
                    Step {s.step}
                  </div>
                  <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>{s.title}</h3>
                  <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.6 }}>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section style={{ padding: '80px 24px', background: 'var(--forest-800)' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <div
                className="t-label"
                style={{ color: 'var(--forest-300)', marginBottom: 12 }}
              >
                Real travelers
              </div>
              <h2
                className="t-display"
                style={{ fontSize: 'clamp(28px, 4vw, 44px)', color: 'var(--on-accent)' }}
              >
                Trusted by budget-conscious{' '}
                <em>explorers</em>
              </h2>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: 20,
              }}
            >
              {testimonials.map((t) => (
                <div
                  key={t.name}
                  style={{
                    background: 'rgba(255,255,255,0.06)',
                    borderRadius: 'var(--r-md)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    padding: 28,
                  }}
                >
                  <p
                    style={{
                      fontSize: 15,
                      color: 'rgba(250,246,236,0.85)',
                      lineHeight: 1.6,
                      marginBottom: 20,
                      fontStyle: 'italic',
                    }}
                  >
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div
                      className="t-avatar"
                      style={{ background: 'var(--forest-600)', fontSize: 16 }}
                    >
                      {t.flag}
                    </div>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--on-accent)' }}>
                        {t.name}
                      </div>
                      <div style={{ fontSize: 12, color: 'var(--forest-300)' }}>{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section
          style={{
            padding: '80px 24px',
            background: 'var(--paper)',
            textAlign: 'center',
          }}
        >
          <div style={{ maxWidth: 600, margin: '0 auto' }}>
            <span className="t-pill-accent-soft" style={{ marginBottom: 20, display: 'inline-flex' }}>
              Free to start · no card needed
            </span>
            <h2
              className="t-display"
              style={{ fontSize: 'clamp(36px, 6vw, 60px)', marginBottom: 16 }}
            >
              Ready to plan <em>smarter?</em>
            </h2>
            <p style={{ fontSize: 18, color: 'var(--muted)', marginBottom: 32 }}>
              Join 12,000+ travelers who plan with confidence.
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <a
                href="#planner"
                style={{
                  padding: '16px 32px',
                  borderRadius: 9999,
                  background: 'var(--forest-700)',
                  color: 'var(--on-accent)',
                  fontSize: 16,
                  fontWeight: 700,
                  textDecoration: 'none',
                  boxShadow: '0 6px 20px rgba(31,86,65,0.3)',
                }}
              >
                Plan my trip — it&apos;s free
              </a>
              <a
                href="/afford"
                style={{
                  padding: '16px 32px',
                  borderRadius: 9999,
                  border: '1.5px solid var(--line-2)',
                  color: 'var(--ink)',
                  fontSize: 16,
                  fontWeight: 600,
                  textDecoration: 'none',
                }}
              >
                Can I afford it?
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
