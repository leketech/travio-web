const features = [
  {
    emoji: '🧮',
    title: 'Smart budget breakdown',
    desc: 'Every dollar allocated across accommodation, food, transport, activities, and an emergency buffer — based on real destination costs.',
    color: 'var(--forest-50)',
  },
  {
    emoji: '✅',
    title: '"Can I Afford This?"',
    desc: 'One question. One honest answer: YES, POSSIBLE IF, or NOT QUITE — with actionable advice for each verdict.',
    color: 'var(--gold-soft)',
  },
  {
    emoji: '🌍',
    title: 'Compare destinations',
    desc: 'Not sure where to go? Compare 60+ countries side-by-side by daily cost, safety, WiFi, and best travel months.',
    color: 'var(--coral-soft)',
  },
  {
    emoji: '🔄',
    title: 'Live rebalancing',
    desc: 'Drag sliders to adjust categories. The AI instantly rebalances your entire budget to stay within your total.',
    color: 'var(--forest-100)',
  },
  {
    emoji: '📱',
    title: 'Mobile-first',
    desc: 'Plan on the go with our iOS and Android apps. All your saved trips sync instantly across devices.',
    color: 'var(--paper-2)',
  },
  {
    emoji: '💳',
    title: 'Visa & proof of funds',
    desc: 'See exactly how much you need to prove in your bank account for your destination\'s visa requirements.',
    color: 'var(--sky)',
  },
]

export default function FeaturesSection() {
  return (
    <section style={{ padding: '80px 24px', background: 'var(--paper-2)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Section header */}
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <div className="t-label" style={{ color: 'var(--forest-600)', marginBottom: 12 }}>
            Everything you need
          </div>
          <h2 className="t-display" style={{ fontSize: 'clamp(32px, 5vw, 52px)', marginBottom: 16 }}>
            Travel smarter with{' '}
            <em>your exact budget</em>
          </h2>
          <p style={{ fontSize: 18, color: 'var(--muted)', maxWidth: 500, margin: '0 auto' }}>
            Stop guessing. Know exactly what you can afford, down to the daily cup of coffee.
          </p>
        </div>

        {/* Feature grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 20,
          }}
        >
          {features.map((f) => (
            <div
              key={f.title}
              style={{
                background: 'var(--surface)',
                borderRadius: 'var(--r-md)',
                border: '1px solid var(--line)',
                padding: 28,
                boxShadow: 'var(--sh-1)',
                transition: 'transform 0.2s, box-shadow 0.2s',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.transform = 'translateY(-2px)'
                el.style.boxShadow = 'var(--sh-2)'
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.transform = 'translateY(0)'
                el.style.boxShadow = 'var(--sh-1)'
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 14,
                  background: f.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 24,
                  marginBottom: 16,
                }}
              >
                {f.emoji}
              </div>
              <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8, color: 'var(--ink)' }}>
                {f.title}
              </h3>
              <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.6 }}>
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
