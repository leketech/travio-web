import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import AffordInput from '@/components/afford/AffordInput'

export const metadata: Metadata = {
  title: 'Can I Afford This Trip?',
  description: 'Get an honest YES, POSSIBLE IF, or NOT QUITE verdict for any trip — in seconds. No account needed.',
}

export default function AffordPage() {
  return (
    <>
      <Navbar />
      <main
        style={{
          minHeight: '100vh',
          background: 'var(--paper)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px 24px',
        }}
      >
        <AffordInput />
      </main>
      <Footer />
    </>
  )
}
