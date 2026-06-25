import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const GOLD = '#C9932A'
const NAVY = '#0B1729'

export default function Splash() {
  const navigate = useNavigate()
  const [phase, setPhase] = useState(0)
  // 0: initial · 1: dot · 2: oval (extrusion) · 3: circle (cut) · 4: wordmark · 5: logo + tagline

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 300),
      setTimeout(() => setPhase(2), 700),
      setTimeout(() => setPhase(3), 1050),
      setTimeout(() => setPhase(4), 1400),
      setTimeout(() => setPhase(5), 1900),
      setTimeout(() => {
        const dest = localStorage.getItem('onboarding_concluido') ? '/home' : '/onboarding'
        navigate(dest)
      }, 3000),
    ]
    return () => timers.forEach(clearTimeout)
  }, [navigate])

  return (
    <div
      style={{
        position: 'fixed', inset: 0,
        backgroundColor: NAVY,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        fontFamily: "'Hanken Grotesk', sans-serif",
        overflow: 'hidden',
        maxWidth: 480, margin: '0 auto',
      }}
    >
      {/* Elemento assinatura: ponto → extrusão → gota coxinha */}
      <div
        style={{
          width:  phase >= 3 ? 58  : phase >= 2 ? 148 : phase >= 1 ? 12 : 0,
          height: phase >= 3 ? 82  : phase >= 2 ? 26  : phase >= 1 ? 12 : 0,
          borderRadius: phase >= 3
            ? '50% 50% 42% 42% / 6% 6% 94% 94%'
            : '50%',
          transform: phase >= 3 ? 'rotate(180deg)' : 'rotate(0deg)',
          backgroundColor: GOLD,
          flexShrink: 0,
          marginBottom: 40,
          transition: phase === 3
            ? [
                'width 0.22s cubic-bezier(0.175,0.885,0.32,1.6)',
                'height 0.22s cubic-bezier(0.175,0.885,0.32,1.6)',
                'border-radius 0.22s cubic-bezier(0.175,0.885,0.32,1.6)',
                'transform 0.22s cubic-bezier(0.175,0.885,0.32,1.6)',
              ].join(', ')
            : 'width 0.38s cubic-bezier(0.4,0,0.2,1), height 0.38s cubic-bezier(0.4,0,0.2,1)',
        }}
      />

      {/* Wordmark */}
      <div
        style={{
          textAlign: 'center',
          opacity: phase >= 4 ? 1 : 0,
          transform: phase >= 4 ? 'translateY(0)' : 'translateY(14px)',
          transition: 'opacity 0.45s ease, transform 0.45s ease',
        }}
      >
        <div style={{
          fontSize: 11, fontWeight: 700,
          letterSpacing: '0.22em',
          color: 'rgba(255,255,255,0.38)',
          textTransform: 'uppercase',
          marginBottom: 8,
        }}>
          Compacta Print
        </div>
        <div style={{ fontSize: 38, fontWeight: 800, letterSpacing: '-0.02em', color: '#FFFFFF', lineHeight: 1 }}>
          SALGADEIRO
        </div>
        <div style={{ fontSize: 38, fontWeight: 800, letterSpacing: '-0.02em', color: GOLD, lineHeight: 1, marginTop: 2 }}>
          PRO
        </div>
      </div>

      {/* Logo Compacta Print + tagline */}
      <div
        style={{
          position: 'absolute', bottom: 48,
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12,
          opacity: phase >= 5 ? 1 : 0,
          transition: 'opacity 0.5s ease',
        }}
      >
        <img
          src="/images/logo_compacta.png"
          alt="Compacta Print"
          style={{ height: 28, objectFit: 'contain', filter: 'brightness(0) invert(1)', opacity: 0.55 }}
        />
        <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)', letterSpacing: '0.1em', margin: 0 }}>
          A Engenharia do Sabor
        </p>
      </div>

      <style>{`
        @media (prefers-reduced-motion: reduce) {
          * { transition-duration: 0.01ms !important; animation-duration: 0.01ms !important; }
        }
      `}</style>
    </div>
  )
}
