import { useNavigate } from 'react-router-dom'
import { Calculator, Bot, BookOpen, Settings, Play, FolderOpen } from 'lucide-react'
import PageLayout from '../components/PageLayout'

const modulos = [
  {
    label: 'Calcular produção',
    desc: 'Custo, quantidade e lucro',
    icon: Calculator,
    path: '/calculadora',
    color: '#C49A2A',
  },
  {
    label: 'Perguntar ao Roberto',
    desc: 'IA especialista Compacta',
    icon: Bot,
    path: '/roberto',
    color: '#C49A2A',
  },
  {
    label: 'Receitas profissionais',
    desc: 'Fichas técnicas completas',
    icon: BookOpen,
    path: '/receitas',
    color: '#C49A2A',
  },
  {
    label: 'Máquinas Compacta Print',
    desc: 'Pop 4.0, Black Inox e mais',
    icon: Settings,
    path: '/maquinas',
    color: '#C49A2A',
  },
  {
    label: 'Treinamentos',
    desc: 'Cursos em vídeo',
    icon: Play,
    path: '/treinamentos',
    color: '#C49A2A',
  },
  {
    label: 'Biblioteca técnica',
    desc: 'Manuais e documentos',
    icon: FolderOpen,
    path: '/treinamentos',
    color: '#C49A2A',
  },
]

export default function Home() {
  const navigate = useNavigate()

  return (
    <PageLayout>
      <div className="px-5 pt-5 pb-2">
        <p className="text-2xl font-bold" style={{ color: '#1A1A1A' }}>
          Olá, produtor! 👋
        </p>
        <p className="text-sm mt-1" style={{ color: '#6B7280' }}>
          Bem-vindo ao SalgadeiroPro
        </p>
      </div>

      {/* Banner hero */}
      <div className="px-5 mt-3">
        <div
          className="relative rounded-xl overflow-hidden"
          style={{ height: 180, borderRadius: 12 }}
        >
          <img
            src="/images/banner_boteco.jpeg"
            alt="Salgados de Boteco"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.65))' }}
          />
          <div className="absolute bottom-0 left-0 p-4">
            <p className="text-white font-bold text-xl leading-tight">
              Salgados de Boteco
            </p>
            <p className="text-white text-sm mt-0.5 opacity-90">
              Descubra segredos para petiscos irresistíveis e lucre mais.
            </p>
            <button
              onClick={() => navigate('/receitas')}
              className="mt-3 px-4 py-2 rounded-xl font-bold text-sm"
              style={{ backgroundColor: '#C49A2A', color: '#FFFFFF' }}
            >
              Explorar receitas
            </button>
          </div>
        </div>
      </div>

      {/* Grid de módulos */}
      <div className="px-5 mt-5 mb-2">
        <p className="font-bold text-base mb-3" style={{ color: '#1A1A1A' }}>
          O que você precisa hoje?
        </p>
        <div className="grid grid-cols-2 gap-3">
          {modulos.map(({ label, desc, icon: Icon, path, color }) => (
            <button
              key={path + label}
              onClick={() => navigate(path)}
              className="flex flex-col items-start p-4 rounded-xl text-left transition-transform active:scale-95"
              style={{
                backgroundColor: '#FFFFFF',
                border: '0.5px solid #E5E5E5',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                borderRadius: 12,
              }}
            >
              <div
                className="flex items-center justify-center w-9 h-9 rounded-lg mb-2"
                style={{ backgroundColor: '#FDF8EC' }}
              >
                <Icon size={20} color={color} strokeWidth={2} />
              </div>
              <p className="font-bold text-sm leading-tight" style={{ color: '#1A1A1A' }}>
                {label}
              </p>
              <p className="text-xs mt-0.5" style={{ color: '#9CA3AF' }}>
                {desc}
              </p>
            </button>
          ))}
        </div>
      </div>
    </PageLayout>
  )
}
