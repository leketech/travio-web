'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function PrintTrigger() {
  const router = useRouter()

  useEffect(() => {
    const t = setTimeout(() => window.print(), 600)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="screen-only">
      <button className="btn-back" onClick={() => router.back()}>
        ← Back
      </button>
      <button className="btn-print" onClick={() => window.print()}>
        ↓ Save as PDF
      </button>
    </div>
  )
}
