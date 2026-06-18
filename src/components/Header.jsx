import { Bell, User } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function Header({ titulo, voltar = false, direita = null, dark = false }) {
  const navigate = useNavigate()

  const bg = dark ? '#061423' : '#2C1A0E'
  const textColor = dark ? '#C49A2A' : '#FFFFFF'

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4"
      style={{
        backgroundColor: bg,
        height: 56,
      }}
    >
      {voltar ? (
        <button
          onClick={() => navigate(-1)}
          className="flex items-center justify-center w-8 h-8"
          style={{ color: textColor }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
        </button>
      ) : (
        <span className="font-bold text-lg" style={{ color: '#FFFFFF', letterSpacing: '-0.3px' }}>
          Salgadeiro Pro
        </span>
      )}

      {titulo && (
        <span className="font-bold text-base absolute left-1/2 -translate-x-1/2" style={{ color: textColor }}>
          {titulo}
        </span>
      )}

      {direita !== null ? direita : (
        !voltar && (
          <button
            onClick={() => navigate('/perfil')}
            className="relative flex items-center justify-center w-8 h-8 rounded-full"
            style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}
          >
            <User size={16} color="#FFFFFF" />
            <span
              className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full border-2"
              style={{ backgroundColor: '#E53E3E', borderColor: bg }}
            />
          </button>
        )
      )}
    </header>
  )
}
