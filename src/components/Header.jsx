import { User } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function Header({ titulo, voltar = false, direita = null, dark = false }) {
  const navigate = useNavigate()

  const bg        = dark ? '#0B1729' : '#FFFFFF'
  const border    = dark ? 'none'    : '1px solid #E5E5E5'
  const logoColor = dark ? '#C9932A' : '#1A1A1A'
  const titleColor= dark ? '#FFFFFF' : '#1A1A1A'

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4"
      style={{
        backgroundColor: bg,
        borderBottom: border,
        height: 56,
        maxWidth: 480,
        margin: '0 auto',
      }}
    >
      {voltar ? (
        <button
          onClick={() => navigate(-1)}
          className="flex items-center justify-center w-9 h-9 rounded-xl"
          style={{ backgroundColor: dark ? 'rgba(255,255,255,0.08)' : '#F5F5F5' }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={titleColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
        </button>
      ) : (
        <span className="font-bold text-lg" style={{ color: logoColor, letterSpacing: '-0.3px' }}>
          Salgadeiro Pro
        </span>
      )}

      {titulo && (
        <span className="font-bold text-base absolute left-1/2 -translate-x-1/2" style={{ color: titleColor }}>
          {titulo}
        </span>
      )}

      {direita !== null ? direita : (
        !voltar && (
          <button
            onClick={() => navigate('/perfil')}
            className="relative flex items-center justify-center w-9 h-9 rounded-full"
            style={{ backgroundColor: dark ? 'rgba(255,255,255,0.08)' : '#F5F5F5' }}
          >
            <User size={17} color={dark ? '#C9932A' : '#666666'} />
            <span
              className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2"
              style={{ backgroundColor: '#22C55E', borderColor: bg }}
            />
          </button>
        )
      )}
    </header>
  )
}
