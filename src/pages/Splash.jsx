import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const loadingSteps = [
  'Calibrando parâmetros',
  'Otimizando produção',
  'Verificando receitas',
  'Salgadeiro Pro pronto',
]

export default function Splash() {
  const navigate = useNavigate()
  const [progress, setProgress] = useState(0)
  const [stepIndex, setStepIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.random() * 18
        if (next >= 100) {
          clearInterval(interval)
          setTimeout(() => navigate('/home'), 400)
          return 100
        }
        const idx = Math.floor((next / 100) * (loadingSteps.length - 1))
        setStepIndex(idx)
        return next
      })
    }, 300)
    return () => clearInterval(interval)
  }, [navigate])

  return (
    <div
      className="relative flex flex-col items-center justify-center overflow-hidden"
      style={{ width: '100vw', height: '100vh', backgroundColor: '#061423', fontFamily: "'Hanken Grotesk', sans-serif" }}
    >
      {/* Grid background */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        backgroundImage: 'linear-gradient(rgba(242,201,76,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(242,201,76,0.03) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
      }} />
      <div style={{
        position: 'absolute', inset: 0, zIndex: 2,
        background: 'radial-gradient(circle at center, transparent 20%, #061423 90%)',
      }} />

      {/* Scanline */}
      <div style={{
        position: 'absolute', top: 0, left: 0, width: '100%', height: 100, zIndex: 3,
        background: 'linear-gradient(to bottom, transparent, rgba(242,201,76,0.05), transparent)',
        animation: 'scanline 8s linear infinite',
        pointerEvents: 'none',
      }} />

      {/* Corner brackets */}
      {[
        { top: 24, left: 24, borderTop: true, borderLeft: true },
        { top: 24, right: 24, borderTop: true, borderRight: true },
        { bottom: 24, left: 24, borderBottom: true, borderLeft: true },
        { bottom: 24, right: 24, borderBottom: true, borderRight: true },
      ].map((pos, i) => (
        <div key={i} style={{
          position: 'absolute', width: 48, height: 48, zIndex: 10, pointerEvents: 'none',
          ...pos,
          borderTop: pos.borderTop ? '2px solid rgba(242,201,76,0.2)' : undefined,
          borderBottom: pos.borderBottom ? '2px solid rgba(242,201,76,0.2)' : undefined,
          borderLeft: pos.borderLeft ? '2px solid rgba(242,201,76,0.2)' : undefined,
          borderRight: pos.borderRight ? '2px solid rgba(242,201,76,0.2)' : undefined,
        }} />
      ))}

      {/* Main content */}
      <main style={{ position: 'relative', zIndex: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', animation: 'fadeInScale 1.4s cubic-bezier(0.16,1,0.3,1) forwards' }}>
        {/* Logo */}
        <div style={{ position: 'relative', marginBottom: 32, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ position: 'absolute', width: 256, height: 256, border: '1px solid rgba(242,201,76,0.1)', borderRadius: '50%', animation: 'spin 60s linear infinite' }} />
          <div style={{ position: 'absolute', width: 288, height: 288, border: '1px solid rgba(242,201,76,0.05)', borderRadius: '50%', animation: 'spin 90s linear infinite reverse' }} />

          <div style={{
            width: 160, height: 160, borderRadius: 16, overflow: 'hidden',
            boxShadow: '0 25px 50px rgba(0,0,0,0.5)',
            filter: 'drop-shadow(0 0 15px rgba(242,201,76,0.2))',
            background: 'linear-gradient(135deg, #1E3A5F 0%, #0B1729 100%)',
          }}>
            <img src="/images/logo_splash.png" alt="Salgadeiro Pro" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </div>

        {/* Name */}
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: 32, fontWeight: 700, color: '#F2C94C', letterSpacing: '-0.02em', marginBottom: 8, lineHeight: 1 }}>
            Salgadeiro Pro
          </h1>
          <p style={{ fontSize: 13, fontWeight: 700, color: '#C9932A', letterSpacing: '0.3em', textTransform: 'uppercase', opacity: 0.9 }}>
            A Engenharia do Sabor
          </p>
        </div>

        {/* Progress bar */}
        <div style={{ marginTop: 64, width: 192, height: 4, backgroundColor: '#1E2B3B', borderRadius: 9999, overflow: 'hidden' }}>
          <div style={{ height: '100%', backgroundColor: '#F2C94C', borderRadius: 9999, transition: 'width 0.3s ease-out', width: `${progress}%` }} />
        </div>

        <div style={{ marginTop: 16, display: 'flex', alignItems: 'center', gap: 8, opacity: 0.5 }}>
          <span style={{ fontSize: 13, color: '#D6E4F9', textTransform: 'uppercase', letterSpacing: '0.1em', fontFamily: 'monospace' }}>
            {loadingSteps[stepIndex]}
          </span>
        </div>
      </main>

      <style>{`
        @keyframes fadeInScale {
          0% { opacity: 0; transform: scale(0.92); filter: blur(10px); }
          100% { opacity: 1; transform: scale(1); filter: blur(0); }
        }
        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}
