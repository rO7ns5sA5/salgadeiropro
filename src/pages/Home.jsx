import { useNavigate } from 'react-router-dom'
import { Calculator, Bot, BookOpen, Settings, Play, FolderOpen, Wrench } from 'lucide-react'
import PageLayout from '../components/PageLayout'

const GOLD = '#C9932A'
const NAVY = '#0B1729'

const modulos = [
  { label: 'Calcular produção',    desc: 'Custo, quantidade e lucro',   icon: Calculator, path: '/calculadora' },
  { label: 'Perguntar ao Roberto', desc: 'IA especialista Compacta',    icon: Bot,        path: '/especialista' },
  { label: 'Receitas profissionais', desc: 'Fichas técnicas completas', icon: BookOpen,   path: '/receitas' },
  { label: 'Máquinas Compacta',    desc: 'Pop 4.0, Black Inox e mais',  icon: Settings,   path: '/maquinas' },
  { label: 'Treinamentos',         desc: 'Cursos em vídeo',             icon: Play,       path: '/treinamentos' },
  { label: 'Biblioteca técnica',   desc: 'Manuais e documentos',        icon: FolderOpen, path: '/treinamentos' },
  { label: 'Diagnosticar Máquina', desc: 'Identifique e resolva problemas', icon: Wrench, path: '/diagnostico' },
]

export default function Home() {
  const navigate = useNavigate()

  return (
    <PageLayout>
      {/* Saudação */}
      <div className="px-4 pt-5 pb-2">
        <p className="text-2xl font-bold" style={{ color: '#1A1A1A' }}>
          Olá, produtor! 👋
        </p>
        <p className="text-sm mt-1" style={{ color: '#666666' }}>
          Bem-vindo ao Salgadeiro Pro
        </p>
      </div>

      {/* Banner hero */}
      <div className="px-4 mt-3">
        <div
          className="relative rounded-2xl overflow-hidden"
          style={{ height: 176 }}
        >
          <img
            src="/images/banner_boteco.jpeg"
            alt="Salgados de Boteco"
            className="absolute inset-0 w-full h-full object-cover"
            onError={(e) => { e.target.style.display = 'none' }}
          />
          {/* Fallback gradient */}
          <div
            className="absolute inset-0"
            style={{ background: `linear-gradient(135deg, ${NAVY} 0%, #1a2e4a 100%)` }}
          />
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.7))' }}
          />
          <div className="absolute bottom-0 left-0 p-4">
            <p className="text-white font-bold text-xl leading-tight">
              Salgados de Boteco
            </p>
            <p className="text-white text-sm mt-0.5 opacity-80">
              Descubra segredos para petiscos irresistíveis e lucre mais.
            </p>
            <button
              onClick={() => navigate('/receitas')}
              className="mt-3 px-5 py-2 rounded-xl font-bold text-sm"
              style={{ backgroundColor: GOLD, color: '#FFFFFF' }}
            >
              Explorar receitas
            </button>
          </div>
        </div>
      </div>

      {/* Grid de módulos */}
      <div className="px-4 mt-5 mb-4">
        <p className="font-bold text-lg mb-3" style={{ color: '#1A1A1A' }}>
          O que você precisa hoje?
        </p>
        <div className="grid grid-cols-2 gap-3">
          {modulos.map(({ label, desc, icon: Icon, path }) => (
            <button
              key={path + label}
              onClick={() => navigate(path)}
              className="flex flex-col items-start p-4 rounded-2xl text-left active:scale-95 transition-transform"
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #E5E5E5',
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
              }}
            >
              <div
                className="flex items-center justify-center w-10 h-10 rounded-xl mb-3"
                style={{ backgroundColor: '#FEF8EC' }}
              >
                <Icon size={20} color={GOLD} strokeWidth={2} />
              </div>
              <p className="font-semibold text-sm leading-snug" style={{ color: '#1A1A1A' }}>
                {label}
              </p>
              <p className="text-xs mt-0.5 leading-snug" style={{ color: '#9CA3AF' }}>
                {desc}
              </p>
            </button>
          ))}
        </div>
      </div>
    </PageLayout>
  )
}
