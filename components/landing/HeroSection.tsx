import PlannerForm from './PlannerForm'

const socialProof = [
  { avatar: 'AO', name: 'Adaeze O.' },
  { avatar: 'JL', name: 'Julien L.' },
  { avatar: 'MT', name: 'Maria T.' },
  { avatar: 'KS', name: 'Kwame S.' },
]

const stats = [
  { value: '12,000+', label: 'trips planned' },
  { value: '94%', label: 'under budget' },
  { value: '60+', label: 'countries' },
]

export default function HeroSection() {
  return (
    <section
      style={{
        minHeight: 'calc(100vh - 64px)',
        display: 'flex',
        alignItems: 'center',
        padding: '60px 24px',
        background: 'var(--paper)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background texture */}
      <div
        className="t-hatch"
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.4,
          pointerEvents: 'none',
        }}
      />

      {/* Decorative circle */}
      <div
        style={{
          position: 'absolute',
          top: -120,
          right: -120,
          width: 500,
          height: 500,
          borderRadius: '50%',
          background: 'var(--forest-50)',
          opacity: 0.6,
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 60,
          position: 'relative',
          zIndex: 1,
          flexWrap: 'wrap',
        }}
      >
        {/* Left — hero copy */}
        <div style={{ flex: '1 1 440px', maxWidth: 580 }}>
          {/* Social proof */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
            <div style={{ display: 'flex' }}>
              {socialProof.map((u, i) => (
                <div
                  key={u.avatar}
                  className="t-avatar"
                  style={{
                    marginLeft: i === 0 ? 0 : -10,
                    zIndex: socialProof.length - i,
                    fontSize: 11,
                    background: ['var(--forest-700)', 'var(--forest-600)', 'var(--coral)', 'var(--gold)'][i],
                  }}
                  title={u.name}
                >
                  {u.avatar}
                </div>
              ))}
            </div>
            <span style={{ fontSize: 13, color: 'var(--muted)' }}>
              Trusted by <strong style={{ color: 'var(--ink)' }}>12,000+</strong> travelers
            </span>
          </div>

          {/* Headline */}
          <h1
            className="t-display"
            style={{
              fontSize: 'clamp(44px, 7vw, 78px)',
              marginBottom: 20,
            }}
          >
            Know before
            <br />
            you{' '}
            <em className="t-underline-scribble" style={{ fontStyle: 'italic' }}>
              go.
            </em>
          </h1>

          <p
            style={{
              fontSize: 18,
              color: 'var(--muted)',
              lineHeight: 1.6,
              marginBottom: 32,
              maxWidth: 460,
            }}
          >
            Enter your budget, destination, and trip length. Travio&apos;s AI builds a
            realistic daily spend plan — so you travel with{' '}
            <strong style={{ color: 'var(--ink)' }}>financial confidence</strong>.
          </p>

          {/* Stats row */}
          <div style={{ display: 'flex', gap: 28, flexWrap: 'wrap' }}>
            {stats.map((s) => (
              <div key={s.label}>
                <div
                  className="t-mono"
                  style={{ fontSize: 22, fontWeight: 700, color: 'var(--forest-700)' }}
                >
                  {s.value}
                </div>
                <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          {/* Verdict pills */}
          <div style={{ display: 'flex', gap: 8, marginTop: 28, flexWrap: 'wrap' }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '8px 14px', borderRadius: 9999,
              background: 'var(--forest-100)', color: 'var(--forest-800)',
              fontSize: 13, fontWeight: 600,
            }}>
              ✓ YES — you can do this trip
            </span>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '8px 14px', borderRadius: 9999,
              background: 'var(--gold-soft)', color: 'var(--gold)',
              fontSize: 13, fontWeight: 600,
            }}>
              ⚡ POSSIBLE IF — stay in Deira
            </span>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '8px 14px', borderRadius: 9999,
              background: '#F9E0DF', color: 'var(--rose)',
              fontSize: 13, fontWeight: 600,
            }}>
              ✗ NOT QUITE — see alternatives
            </span>
          </div>
        </div>

        {/* Right — planner form */}
        <div style={{ flex: '1 1 400px', display: 'flex', justifyContent: 'center' }} id="planner">
          <PlannerForm />
        </div>
      </div>
    </section>
  )
}
