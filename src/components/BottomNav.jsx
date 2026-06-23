import { useNavigate, useLocation } from 'react-router-dom'
import { Home, BookOpen, Wrench, Tv, User } from 'lucide-react'

const navItems = [
  { label: 'Início',   icon: Home,     path: '/home' },
  { label: 'Receitas', icon: BookOpen,  path: '/receitas' },
  { label: 'Calcular', icon: Wrench,    path: '/calculadora' },
  { label: 'TV',       icon: Tv,        path: '/tv' },
  { label: 'Perfil',   icon: User,      path: '/perfil' },
]

const GOLD = '#C9932A'

export default function BottomNav({ dark = false }) {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const bg        = dark ? '#0B1729' : '#FFFFFF'
  const borderTop = dark ? '1px solid rgba(201,147,42,0.2)' : '1px solid #E5E5E5'

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 flex items-stretch"
      style={{
        backgroundColor: bg,
        borderTop,
        height: 64,
        paddingBottom: 'env(safe-area-inset-bottom)',
        maxWidth: 860,
        margin: '0 auto',
      }}
    >
      {navItems.map(({ label, icon: Icon, path, badge }) => {
        const active        = pathname === path || (path !== '/' && pathname.startsWith(path))
        const activeColor   = GOLD
        const inactiveColor = dark ? '#6B7280' : '#9CA3AF'
        const color         = active ? activeColor : inactiveColor

        return (
          <button
            key={path}
            onClick={() => navigate(path)}
            className="flex flex-col items-center justify-center flex-1 gap-0.5 py-2 relative"
          >
            <div className="relative">
              <Icon size={21} color={color} strokeWidth={active ? 2.5 : 1.8} />
              {badge && (
                <span
                  className="absolute font-bold"
                  style={{
                    top: -4,
                    right: -9,
                    fontSize: 7,
                    lineHeight: 1,
                    backgroundColor: GOLD,
                    color: '#FFFFFF',
                    borderRadius: 3,
                    padding: '1px 2px',
                  }}
                >
                  {badge}
                </span>
              )}
            </div>
            <span style={{ color, fontSize: 9.5, lineHeight: 1, fontWeight: active ? 600 : 400 }}>
              {label}
            </span>
          </button>
        )
      })}
    </nav>
  )
}
