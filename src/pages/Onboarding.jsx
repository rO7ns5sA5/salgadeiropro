import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const slides = [
  {
    emoji: '🥙',
    titulo: 'Transforme receita em processo',
    descricao: 'Aprenda a produzir salgados com padrão, cálculo e técnica profissional.',
    bg: 'linear-gradient(135deg, #1E3A5F 0%, #0B1729 100%)',
    visual: (
      <div style={{ width: '100%', height: 200, background: 'linear-gradient(135deg, #0F2040 0%, #1E3A5F 100%)', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 8, padding: 16 }}>
          {Array.from({ length: 24 }).map((_, i) => (
            <div key={i} style={{ width: 28, height: 36, background: 'linear-gradient(180deg, #C9932A 0%, #A07020 100%)', borderRadius: '50% 50% 40% 40%', opacity: 0.85 + (i % 3) * 0.05 }} />
          ))}
        </div>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #0B1729 0%, transparent 60%)' }} />
      </div>
    ),
  },
  {
    emoji: '📊',
    titulo: 'Calcule e lucre mais',
    descricao: 'Descubra o custo real de cada salgado e maximize seu lucro com precisão.',
    bg: 'linear-gradient(135deg, #1E3A5F 0%, #0B1729 100%)',
    visual: (
      <div style={{ width: '100%', height: 200, background: 'linear-gradient(135deg, #0F2040 0%, #1E3A5F 100%)', borderRadius: 16, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', padding: 24, gap: 12, position: 'relative', overflow: 'hidden' }}>
        {[60, 80, 45, 90, 70, 100, 55].map((h, i) => (
          <div key={i} style={{ flex: 1, height: `${h}%`, background: i === 5 ? '#C9932A' : 'rgba(201,147,42,0.3)', borderRadius: '6px 6px 0 0', transition: 'height 0.3s' }} />
        ))}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #0B1729 0%, transparent 70%)' }} />
        <div style={{ position: 'absolute', bottom: 16, left: 0, right: 0, textAlign: 'center' }}>
          <span style={{ color: '#C9932A', fontSize: 24, fontWeight: 700 }}>+38% lucro</span>
        </div>
      </div>
    ),
  },
  {
    emoji: '🤖',
    titulo: 'Pergunte ao especialista',
    descricao: 'Roberto IA responde dúvidas sobre máquinas, receitas e produção 24h por dia.',
    bg: 'linear-gradient(135deg, #1E3A5F 0%, #0B1729 100%)',
    visual: (
      <div style={{ width: '100%', height: 200, background: 'linear-gradient(135deg, #0F2040 0%, #1E3A5F 100%)', borderRadius: 16, padding: 20, display: 'flex', flexDirection: 'column', gap: 10, overflow: 'hidden', position: 'relative' }}>
        <div style={{ alignSelf: 'flex-start', background: 'rgba(201,147,42,0.15)', border: '1px solid rgba(201,147,42,0.3)', borderRadius: '0 12px 12px 12px', padding: '8px 14px', maxWidth: '80%' }}>
          <p style={{ color: '#D0E8F5', fontSize: 13, margin: 0 }}>Qual a calibragem para coxinha de 60g na Pop 4.0?</p>
        </div>
        <div style={{ alignSelf: 'flex-end', background: '#C9932A', borderRadius: '12px 0 12px 12px', padding: '8px 14px', maxWidth: '80%' }}>
          <p style={{ color: '#fff', fontSize: 13, margin: 0 }}>Massa 70, Recheio 30, Cortador 50 — bico 3 👌</p>
        </div>
        <div style={{ alignSelf: 'flex-start', background: 'rgba(201,147,42,0.15)', border: '1px solid rgba(201,147,42,0.3)', borderRadius: '0 12px 12px 12px', padding: '8px 14px', maxWidth: '70%' }}>
          <p style={{ color: '#D0E8F5', fontSize: 13, margin: 0 }}>Tempo de extrusão?</p>
        </div>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 40, background: 'linear-gradient(to top, #0F2040, transparent)' }} />
      </div>
    ),
  },
]

export default function Onboarding() {
  const navigate = useNavigate()
  const [atual, setAtual] = useState(0)

  function avancar() {
    if (atual < slides.length - 1) {
      setAtual(atual + 1)
    } else {
      localStorage.setItem('onboarding_concluido', '1')
      navigate('/home')
    }
  }

  function pular() {
    localStorage.setItem('onboarding_concluido', '1')
    navigate('/home')
  }

  const slide = slides[atual]

  return (
    <div style={{ width: '100vw', height: '100vh', background: '#0B1729', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: "'Hanken Grotesk', sans-serif" }}>
      <div style={{ width: '100%', maxWidth: 400, padding: '0 24px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 32 }}>
          <span style={{ fontSize: 22 }}>🥙</span>
          <span style={{ fontWeight: 700, fontSize: 18, color: '#C9932A' }}>Salgadeiro Pro</span>
        </div>

        {/* Visual */}
        <div style={{ width: '100%', marginBottom: 28 }}>
          {slide.visual}
        </div>

        {/* Texto */}
        <h2 style={{ color: '#C9932A', fontSize: 24, fontWeight: 700, textAlign: 'center', margin: '0 0 12px', lineHeight: 1.2 }}>
          {slide.titulo}
        </h2>
        <p style={{ color: '#D0E8F5', fontSize: 15, textAlign: 'center', margin: '0 0 40px', opacity: 0.8, lineHeight: 1.5 }}>
          {slide.descricao}
        </p>

        {/* Dots */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 32 }}>
          {slides.map((_, i) => (
            <div key={i} style={{ width: i === atual ? 24 : 8, height: 8, borderRadius: 9999, background: i === atual ? '#C9932A' : 'rgba(201,147,42,0.3)', transition: 'all 0.3s' }} />
          ))}
        </div>

        {/* Botão */}
        <button
          onClick={avancar}
          style={{ width: '100%', padding: '16px', borderRadius: 12, background: '#C9932A', color: '#fff', fontWeight: 700, fontSize: 16, border: 'none', cursor: 'pointer', marginBottom: 16 }}
        >
          {atual === slides.length - 1 ? 'Começar' : 'Próximo'}
        </button>

        {atual < slides.length - 1 && (
          <button onClick={pular} style={{ background: 'none', border: 'none', color: 'rgba(208,232,245,0.4)', fontSize: 14, cursor: 'pointer' }}>
            Pular
          </button>
        )}
      </div>
    </div>
  )
}
