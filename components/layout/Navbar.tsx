'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, Plane } from 'lucide-react'

const navLinks = [
  { label: 'Plan a Trip', href: '/#planner' },
  { label: 'Can I Afford?', href: '/afford' },
  { label: 'Compare', href: '/compare' },
  { label: 'Pricing', href: '/pricing' },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: 'rgba(250, 246, 236, 0.88)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid var(--line)',
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '0 24px',
          height: 64,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 10,
              background: 'var(--forest-700)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Plane size={16} color="var(--on-accent)" />
          </div>
          <span
            style={{
              fontFamily: 'var(--f-display)',
              fontSize: 22,
              color: 'var(--ink)',
              letterSpacing: '-0.02em',
            }}
          >
            Travio
          </span>
        </Link>

        {/* Desktop nav */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: 6 }} className="hidden md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                padding: '8px 14px',
                borderRadius: 9999,
                fontSize: 14,
                fontWeight: 500,
                color: 'var(--ink-2)',
                textDecoration: 'none',
                transition: 'background 0.15s',
              }}
              onMouseEnter={(e) => {
                ;(e.currentTarget as HTMLElement).style.background = 'var(--paper-2)'
              }}
              onMouseLeave={(e) => {
                ;(e.currentTarget as HTMLElement).style.background = 'transparent'
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }} className="hidden md:flex">
          <Link
            href="/login"
            style={{
              padding: '8px 16px',
              borderRadius: 9999,
              fontSize: 14,
              fontWeight: 500,
              color: 'var(--ink)',
              textDecoration: 'none',
            }}
          >
            Sign in
          </Link>
          <Link
            href="/register"
            style={{
              padding: '10px 20px',
              borderRadius: 9999,
              fontSize: 14,
              fontWeight: 600,
              background: 'var(--ink)',
              color: 'var(--paper)',
              textDecoration: 'none',
              boxShadow: 'var(--sh-1)',
            }}
          >
            Get started
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{
            padding: 8,
            borderRadius: 10,
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: 'var(--ink)',
          }}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          style={{
            borderTop: '1px solid var(--line)',
            background: 'var(--paper)',
            padding: '12px 24px 20px',
          }}
          className="md:hidden"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              style={{
                display: 'block',
                padding: '12px 0',
                fontSize: 16,
                fontWeight: 500,
                color: 'var(--ink)',
                textDecoration: 'none',
                borderBottom: '1px solid var(--line)',
              }}
            >
              {link.label}
            </Link>
          ))}
          <div style={{ marginTop: 16, display: 'flex', gap: 10 }}>
            <Link
              href="/login"
              onClick={() => setMobileOpen(false)}
              style={{
                flex: 1,
                padding: '12px',
                borderRadius: 9999,
                fontSize: 15,
                fontWeight: 500,
                color: 'var(--ink)',
                textDecoration: 'none',
                textAlign: 'center',
                border: '1px solid var(--line-2)',
              }}
            >
              Sign in
            </Link>
            <Link
              href="/register"
              onClick={() => setMobileOpen(false)}
              style={{
                flex: 1,
                padding: '12px',
                borderRadius: 9999,
                fontSize: 15,
                fontWeight: 600,
                background: 'var(--ink)',
                color: 'var(--paper)',
                textDecoration: 'none',
                textAlign: 'center',
              }}
            >
              Get started
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
