import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search } from 'lucide-react'
import PageLayout from '../components/PageLayout'
import { receitas } from '../data/receitas'

const GOLD = '#C9932A'
const formatos = ['Todos', 'Coxinha', 'Kibe', 'Risole', 'Bolinha', 'Enroladinho', 'Esfirra', 'Pastel']

const FormatoIcon = ({ formato, size = 32, color = '#9CA3AF' }) => {
  const s = size
  const icons = {
    coxinha: (
      <svg width={s} height={s} viewBox="0 0 32 32" fill="none">
        <path d="M16 4 C16 4 8 14 8 20 C8 26 12 28 16 28 C20 28 24 26 24 20 C24 14 16 4 16 4Z" stroke={color} strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M10 20 Q16 17 22 20" stroke={color} strokeWidth="1" strokeLinecap="round"/>
      </svg>
    ),
    kibe: (
      <svg width={s} height={s} viewBox="0 0 32 32" fill="none">
        <ellipse cx="16" cy="16" rx="11" ry="7" stroke={color} strokeWidth="1.5"/>
        <path d="M6 14 Q16 11 26 14" stroke={color} strokeWidth="1" strokeLinecap="round"/>
      </svg>
    ),
    risole: (
      <svg width={s} height={s} viewBox="0 0 32 32" fill="none">
        <rect x="5" y="9" width="22" height="14" rx="4" stroke={color} strokeWidth="1.5"/>
        <path d="M5 14 Q16 11 27 14" stroke={color} strokeWidth="1" strokeLinecap="round"/>
        <path d="M5 18 Q16 21 27 18" stroke={color} strokeWidth="1" strokeLinecap="round"/>
      </svg>
    ),
    bolinha: (
      <svg width={s} height={s} viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="10" stroke={color} strokeWidth="1.5"/>
        <circle cx="16" cy="16" r="6" stroke={color} strokeWidth="1" strokeDasharray="2 2"/>
      </svg>
    ),
    enroladinho: (
      <svg width={s} height={s} viewBox="0 0 32 32" fill="none">
        <rect x="5" y="11" width="22" height="10" rx="5" stroke={color} strokeWidth="1.5"/>
        <line x1="11" y1="11" x2="11" y2="21" stroke={color} strokeWidth="1" strokeLinecap="round"/>
        <line x1="21" y1="11" x2="21" y2="21" stroke={color} strokeWidth="1" strokeLinecap="round"/>
      </svg>
    ),
    esfirra: (
      <svg width={s} height={s} viewBox="0 0 32 32" fill="none">
        <path d="M16 5 L27 24 Q16 20 5 24 Z" stroke={color} strokeWidth="1.5" strokeLinejoin="round"/>
      </svg>
    ),
    empada: (
      <svg width={s} height={s} viewBox="0 0 32 32" fill="none">
        <ellipse cx="16" cy="20" rx="11" ry="6" stroke={color} strokeWidth="1.5"/>
        <path d="M5 20 Q5 12 16 12 Q27 12 27 20" stroke={color} strokeWidth="1.5"/>
        <ellipse cx="16" cy="12" rx="5" ry="2.5" stroke={color} strokeWidth="1.5"/>
      </svg>
    ),
    pastel: (
      <svg width={s} height={s} viewBox="0 0 32 32" fill="none">
        <rect x="5" y="9" width="22" height="14" rx="2" stroke={color} strokeWidth="1.5"/>
        <path d="M5 9 L16 18 L27 9" stroke={color} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  }
  return icons[formato] ?? (
    <svg width={s} height={s} viewBox="0 0 32 32">
      <circle cx="16" cy="16" r="10" stroke={color} strokeWidth="1.5" fill="none"/>
    </svg>
  )
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
          <Search size={16} color="#9CA3AF" />
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
                  backgroundColor: ativo ? GOLD : '#FFFFFF',
                  color: ativo ? '#FFFFFF' : '#666666',
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
        <p className="text-xs mt-0.5" style={{ color: '#9CA3AF' }}>
          {receitasFiltradas.length} {receitasFiltradas.length === 1 ? 'receita' : 'receitas'}
        </p>
      </div>

      {/* Grid 2 colunas */}
      <div className="px-4 grid grid-cols-2 gap-3 pb-4">
        {receitasFiltradas.map((receita) => (
          <div
            key={receita.id}
            className="rounded-2xl overflow-hidden"
            style={{
              backgroundColor: '#FFFFFF',
              boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
              border: '1px solid #F0F0F0',
            }}
          >
            {/* Imagem */}
            <div className="relative" style={{ height: 108, backgroundColor: '#F5F5F5' }}>
              <img
                src={receita.imagem}
                alt={receita.nome}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = 'none'
                  e.target.nextSibling.style.display = 'flex'
                }}
              />
              {/* Fallback sem imagem */}
              <div
                className="absolute inset-0 items-center justify-center flex-col gap-1"
                style={{
                  display: 'none',
                  background: `linear-gradient(135deg, #f0ebe2 0%, #e8e0d4 100%)`,
                }}
              >
                <FormatoIcon formato={receita.formato} size={40} color={GOLD} />
                <span className="text-xs font-bold capitalize" style={{ color: GOLD }}>
                  {receita.formato}
                </span>
              </div>
              {/* Badge formato */}
              <div
                className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-xs font-bold"
                style={{ backgroundColor: 'rgba(0,0,0,0.55)', color: '#FFFFFF' }}
              >
                {receita.formato.charAt(0).toUpperCase() + receita.formato.slice(1)}
              </div>
            </div>

            {/* Conteúdo */}
            <div className="p-3">
              <p className="font-semibold text-sm leading-snug" style={{ color: '#1A1A1A' }}>
                {receita.nome}
              </p>
              <div className="mt-1.5 space-y-0.5">
                <p className="text-xs" style={{ color: '#9CA3AF' }}>
                  Massa: <span style={{ color: '#666666', fontWeight: 500 }}>{receita.massa}</span>
                </p>
                <p className="text-xs" style={{ color: '#9CA3AF' }}>
                  Peso: <span style={{ color: '#666666', fontWeight: 500 }}>{receita.peso}g</span>
                </p>
              </div>
              <button
                onClick={() => navigate(`/receitas/${receita.id}`)}
                className="mt-3 w-full py-2 rounded-xl text-sm font-semibold"
                style={{ backgroundColor: GOLD, color: '#FFFFFF' }}
              >
                Ver ficha
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Formatos visuais */}
      <div className="px-4 pb-4">
        <p className="font-semibold text-sm mb-3" style={{ color: '#1A1A1A' }}>Formatos disponíveis</p>
        <div className="flex gap-3 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
          {['coxinha','kibe','risole','bolinha','enroladinho','esfirra','empada','pastel'].map((fmt) => {
            const ativo = filtro === fmt.charAt(0).toUpperCase() + fmt.slice(1)
            return (
              <button
                key={fmt}
                onClick={() => setFiltro(fmt.charAt(0).toUpperCase() + fmt.slice(1))}
                className="flex-shrink-0 flex flex-col items-center gap-1"
              >
                <div
                  className="w-13 h-13 rounded-full flex items-center justify-center transition-all"
                  style={{
                    width: 52, height: 52,
                    backgroundColor: ativo ? '#FEF8EC' : '#FFFFFF',
                    border: ativo ? `1.5px solid ${GOLD}` : '1px solid #E5E5E5',
                  }}
                >
                  <FormatoIcon formato={fmt} size={28} color={ativo ? GOLD : '#9CA3AF'} />
                </div>
                <span className="text-xs font-medium capitalize" style={{ color: ativo ? GOLD : '#9CA3AF' }}>
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
