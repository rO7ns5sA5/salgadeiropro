import { useNavigate, useLocation } from 'react-router-dom'
import { Home, BookOpen, Wrench, GraduationCap, User } from 'lucide-react'

const navItems = [
  { label: 'Início',      icon: Home,           path: '/' },
  { label: 'Receitas',    icon: BookOpen,        path: '/receitas' },
  { label: 'Ferramentas', icon: Wrench,          path: '/calculadora' },
  { label: 'Aprender',    icon: GraduationCap,   path: '/treinamentos' },
  { label: 'Perfil',      icon: User,            path: '/perfil' },
]

export default function BottomNav({ dark = false }) {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const bg = dark ? '#061423' : '#FFFFFF'
  const borderTop = dark ? '1px solid rgba(196,154,42,0.2)' : '1px solid #E5E5E5'

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 flex items-center"
      style={{
        backgroundColor: bg,
        borderTop,
        height: 64,
        maxWidth: 480,
        margin: '0 auto',
      }}
    >
      {navItems.map(({ label, icon: Icon, path }) => {
        const active = pathname === path || (path !== '/' && pathname.startsWith(path))
        const activeColor = '#C49A2A'
        const inactiveColor = dark ? '#6B7280' : '#9CA3AF'
        const color = active ? activeColor : inactiveColor

        return (
          <button
            key={path}
            onClick={() => navigate(path)}
            className="flex flex-col items-center justify-center flex-1 gap-0.5 py-2"
          >
            <Icon size={22} color={color} strokeWidth={active ? 2.5 : 1.8} />
            <span
              className="text-xs font-medium"
              style={{ color, fontSize: 10 }}
            >
              {label}
            </span>
          </button>
        )
      })}
    </nav>
  )
}
