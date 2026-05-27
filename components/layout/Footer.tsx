import Link from 'next/link'
import { Plane } from 'lucide-react'

export default function Footer() {
  return (
    <footer
      style={{
        background: 'var(--ink)',
        color: 'var(--paper)',
        padding: '48px 24px 32px',
        marginTop: 'auto',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: 40,
            marginBottom: 48,
          }}
        >
          {/* Brand */}
          <div>
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none', marginBottom: 12 }}>
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 10,
                  background: 'var(--forest-600)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Plane size={16} color="white" />
              </div>
              <span
                style={{
                  fontFamily: 'var(--f-display)',
                  fontSize: 22,
                  color: 'var(--paper)',
                  letterSpacing: '-0.02em',
                }}
              >
                Travio
              </span>
            </Link>
            <p style={{ fontSize: 14, color: 'var(--faint)', lineHeight: 1.6, maxWidth: 200 }}>
              Know exactly what you can afford before you fly.
            </p>
          </div>

          {/* Product */}
          <div>
            <div className="t-label" style={{ color: 'var(--faint)', marginBottom: 14 }}>Product</div>
            {['Plan a Trip', 'Can I Afford?', 'Compare Destinations', 'Saved Trips'].map((item) => (
              <Link
                key={item}
                href="#"
                style={{ display: 'block', fontSize: 14, color: 'var(--paper-3)', marginBottom: 10, textDecoration: 'none' }}
              >
                {item}
              </Link>
            ))}
          </div>

          {/* Company */}
          <div>
            <div className="t-label" style={{ color: 'var(--faint)', marginBottom: 14 }}>Company</div>
            {['About', 'Blog', 'Careers', 'Press'].map((item) => (
              <Link
                key={item}
                href="#"
                style={{ display: 'block', fontSize: 14, color: 'var(--paper-3)', marginBottom: 10, textDecoration: 'none' }}
              >
                {item}
              </Link>
            ))}
          </div>

          {/* Legal */}
          <div>
            <div className="t-label" style={{ color: 'var(--faint)', marginBottom: 14 }}>Legal</div>
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
              <Link
                key={item}
                href="#"
                style={{ display: 'block', fontSize: 14, color: 'var(--paper-3)', marginBottom: 10, textDecoration: 'none' }}
              >
                {item}
              </Link>
            ))}
          </div>
        </div>

        <div
          style={{
            borderTop: '1px solid rgba(255,255,255,0.08)',
            paddingTop: 24,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 12,
          }}
        >
          <p style={{ fontSize: 13, color: 'var(--faint)' }}>
            © 2025 Travio. All rights reserved.
          </p>
          <p style={{ fontSize: 13, color: 'var(--faint)' }}>
            Built for travelers who plan smart.
          </p>
        </div>
      </div>
    </footer>
  )
}
