import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search } from 'lucide-react'
import PageLayout from '../components/PageLayout'
import { receitas } from '../data/receitas'

const formatos = ['Todos', 'Coxinha', 'Kibe', 'Risole', 'Bolinha', 'Enroladinho', 'Esfirra', 'Pastel']

const FormatoIcon = ({ formato, size = 32 }) => {
  const s = size
  const icons = {
    coxinha: (
      <svg width={s} height={s} viewBox="0 0 32 32" fill="none">
        <path d="M16 4 C16 4 8 14 8 20 C8 26 12 28 16 28 C20 28 24 26 24 20 C24 14 16 4 16 4Z" stroke="#6B7280" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M10 20 Q16 17 22 20" stroke="#6B7280" strokeWidth="1" strokeLinecap="round"/>
      </svg>
    ),
    kibe: (
      <svg width={s} height={s} viewBox="0 0 32 32" fill="none">
        <ellipse cx="16" cy="16" rx="11" ry="7" stroke="#6B7280" strokeWidth="1.5"/>
        <path d="M6 14 Q16 11 26 14" stroke="#6B7280" strokeWidth="1" strokeLinecap="round"/>
      </svg>
    ),
    risole: (
      <svg width={s} height={s} viewBox="0 0 32 32" fill="none">
        <rect x="5" y="9" width="22" height="14" rx="4" stroke="#6B7280" strokeWidth="1.5"/>
        <path d="M5 14 Q16 11 27 14" stroke="#6B7280" strokeWidth="1" strokeLinecap="round"/>
        <path d="M5 18 Q16 21 27 18" stroke="#6B7280" strokeWidth="1" strokeLinecap="round"/>
      </svg>
    ),
    bolinha: (
      <svg width={s} height={s} viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="10" stroke="#6B7280" strokeWidth="1.5"/>
        <circle cx="16" cy="16" r="6" stroke="#6B7280" strokeWidth="1" strokeDasharray="2 2"/>
      </svg>
    ),
    enroladinho: (
      <svg width={s} height={s} viewBox="0 0 32 32" fill="none">
        <rect x="5" y="11" width="22" height="10" rx="5" stroke="#6B7280" strokeWidth="1.5"/>
        <line x1="11" y1="11" x2="11" y2="21" stroke="#6B7280" strokeWidth="1" strokeLinecap="round"/>
        <line x1="21" y1="11" x2="21" y2="21" stroke="#6B7280" strokeWidth="1" strokeLinecap="round"/>
      </svg>
    ),
    esfirra: (
      <svg width={s} height={s} viewBox="0 0 32 32" fill="none">
        <path d="M16 5 L27 24 Q16 20 5 24 Z" stroke="#6B7280" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M16 10 L23 22 Q16 19 9 22 Z" stroke="#6B7280" strokeWidth="1" strokeLinejoin="round"/>
      </svg>
    ),
    empada: (
      <svg width={s} height={s} viewBox="0 0 32 32" fill="none">
        <ellipse cx="16" cy="20" rx="11" ry="6" stroke="#6B7280" strokeWidth="1.5"/>
        <path d="M5 20 Q5 12 16 12 Q27 12 27 20" stroke="#6B7280" strokeWidth="1.5"/>
        <ellipse cx="16" cy="12" rx="5" ry="2.5" stroke="#6B7280" strokeWidth="1.5"/>
      </svg>
    ),
    pastel: (
      <svg width={s} height={s} viewBox="0 0 32 32" fill="none">
        <rect x="5" y="9" width="22" height="14" rx="2" stroke="#6B7280" strokeWidth="1.5"/>
        <path d="M5 9 L16 18 L27 9" stroke="#6B7280" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9 13 Q16 18 23 13" stroke="#6B7280" strokeWidth="1" strokeLinecap="round"/>
      </svg>
    ),
  }
  return icons[formato] || <svg width={s} height={s} viewBox="0 0 32 32"><circle cx="16" cy="16" r="10" stroke="#6B7280" strokeWidth="1.5" fill="none"/></svg>
}

const formatoEmoji = {
  coxinha: true, kibe: true, risole: true, empada: true,
  bolinha: true, enroladinho: true, esfirra: true, pastel: true,
}

export default function Receitas() {
  const navigate = useNavigate()
  const [busca, setBusca] = useState('')
  const [filtro, setFiltro] = useState('Todos')

  const receitasFiltradas = receitas.filter((r) => {
    const matchFiltro = filtro === 'Todos' || r.formato === filtro.toLowerCase()
    const matchBusca = r.nome.toLowerCase().includes(busca.toLowerCase())
    return matchFiltro && matchBusca
  })

  return (
    <PageLayout titulo="Receitas">
      {/* Barra de busca */}
      <div className="px-4 pt-4">
        <div
          className="flex items-center gap-2 px-3 rounded-xl"
          style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5', height: 44 }}
        >
          <Search size={18} color="#9CA3AF" />
          <input
            type="text"
            placeholder="Buscar receita..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="flex-1 bg-transparent outline-none text-sm"
            style={{ color: '#1A1A1A' }}
          />
        </div>
      </div>

      {/* Filtros de formato */}
      <div className="px-4 mt-3">
        <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
          {formatos.map((f) => {
            const ativo = filtro === f
            return (
              <button
                key={f}
                onClick={() => setFiltro(f)}
                className="flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all"
                style={{
                  backgroundColor: ativo ? '#C49A2A' : '#FFFFFF',
                  color: ativo ? '#FFFFFF' : '#6B7280',
                  border: ativo ? 'none' : '1px solid #E5E5E5',
                }}
              >
                {f}
              </button>
            )
          })}
        </div>
      </div>

      {/* Título da seção */}
      <div className="px-4 mt-4 mb-3">
        <p className="font-bold text-xl" style={{ color: '#1A1A1A' }}>
          {filtro === 'Todos' ? 'Todas as receitas' : filtro}
        </p>
        <p className="text-sm" style={{ color: '#9CA3AF' }}>
          {receitasFiltradas.length} {receitasFiltradas.length === 1 ? 'receita' : 'receitas'}
        </p>
      </div>

      {/* Grid de receitas */}
      <div className="px-4 grid grid-cols-2 gap-3 pb-4">
        {receitasFiltradas.map((receita) => (
          <div
            key={receita.id}
            className="rounded-xl overflow-hidden"
            style={{
              backgroundColor: '#FFFFFF',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              borderRadius: 12,
            }}
          >
            {/* Foto */}
            <div className="relative" style={{ height: 110 }}>
              <img
                src={receita.imagem}
                alt={receita.nome}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = 'none'
                  e.target.nextSibling.style.display = 'flex'
                }}
              />
              <div
                className="absolute inset-0 items-center justify-center flex-col gap-1"
                style={{ display: 'none', background: 'linear-gradient(135deg, #2C1A0E 0%, #4a2d1a 100%)' }}
              >
                <FormatoIcon formato={receita.formato} size={44} />
                <span className="text-xs font-bold capitalize" style={{ color: '#C49A2A' }}>{receita.formato}</span>
              </div>
              <div
                className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-xs font-bold"
                style={{ backgroundColor: '#2C1A0E', color: '#C49A2A' }}
              >
                {receita.formato.charAt(0).toUpperCase() + receita.formato.slice(1)}
              </div>
            </div>

            {/* Info */}
            <div className="p-3">
              <p className="font-bold text-sm leading-tight" style={{ color: '#1A1A1A' }}>
                {receita.nome}
              </p>
              <div className="mt-2 space-y-0.5">
                <p className="text-xs" style={{ color: '#6B7280' }}>
                  Massa: <span className="font-medium" style={{ color: '#1A1A1A' }}>{receita.massa}</span>
                </p>
                <p className="text-xs" style={{ color: '#6B7280' }}>
                  Peso: <span className="font-medium" style={{ color: '#1A1A1A' }}>{receita.peso}g</span>
                </p>
              </div>
              <button
                onClick={() => navigate(`/receitas/${receita.id}`)}
                className="mt-3 w-full py-2 rounded-xl text-xs font-bold"
                style={{ backgroundColor: '#C49A2A', color: '#FFFFFF' }}
              >
                Ver ficha técnica
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Formatos disponíveis */}
      <div className="px-4 pb-4">
        <p className="font-bold text-sm mb-3" style={{ color: '#1A1A1A' }}>
          Formatos disponíveis
        </p>
        <div className="flex gap-3 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
          {Object.keys(formatoEmoji).map((fmt) => {
            const ativo = filtro === fmt.charAt(0).toUpperCase() + fmt.slice(1)
            return (
              <button
                key={fmt}
                onClick={() => setFiltro(fmt.charAt(0).toUpperCase() + fmt.slice(1))}
                className="flex-shrink-0 flex flex-col items-center gap-1"
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center transition-all"
                  style={{
                    backgroundColor: ativo ? 'rgba(196,154,42,0.12)' : '#FFFFFF',
                    border: ativo ? '1.5px solid #C49A2A' : '1px solid #E5E5E5',
                  }}
                >
                  <FormatoIcon formato={fmt} size={30} />
                </div>
                <span className="text-xs font-medium capitalize" style={{ color: ativo ? '#C49A2A' : '#6B7280' }}>
                  {fmt}
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </PageLayout>
  )
}
