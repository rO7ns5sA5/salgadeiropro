import { useState } from 'react'
import { Search } from 'lucide-react'
import { biblioteca } from '../../data/diagnostico'

const GOLD = '#C9932A'

export default function Biblioteca({ maquinaId, filtroIds, onLimparFiltro }) {
  const [busca, setBusca] = useState('')

  // Aplica filtros
  const artigos = biblioteca.filter((a) => {
    if (filtroIds) return filtroIds.includes(a.id)
    if (maquinaId && !a.maquinas.includes(maquinaId)) return false
    if (busca) {
      const q = busca.toLowerCase()
      return a.titulo.toLowerCase().includes(q) || a.resumo.toLowerCase().includes(q)
    }
    return true
  })

  // Agrupa por categoria
  const categorias = [...new Set(artigos.map((a) => a.categoria))]

  return (
    <div className="px-4 pt-4">
      {/* Filtro ativo (vindo de SolucaoCard) */}
      {filtroIds && (
        <div
          className="flex items-center justify-between mb-4 px-3 py-2 rounded-xl"
          style={{ backgroundColor: '#FEF8EC', border: `1px solid ${GOLD}30` }}
        >
          <p className="text-xs font-medium" style={{ color: GOLD }}>
            📚 Artigos relacionados ao diagnóstico
          </p>
          <button
            onClick={onLimparFiltro}
            className="text-xs"
            style={{ color: '#9CA3AF' }}
          >
            Ver todos
          </button>
        </div>
      )}

      {/* Busca (só aparece sem filtroIds) */}
      {!filtroIds && (
        <div
          className="flex items-center gap-2 px-3 rounded-xl mb-4"
          style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5', height: 44 }}
        >
          <Search size={16} color="#9CA3AF" />
          <input
            type="text"
            placeholder="Buscar problema ou solução..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="flex-1 bg-transparent outline-none text-sm"
            style={{ color: '#1A1A1A' }}
          />
        </div>
      )}

      {/* Lista por categoria */}
      {categorias.length === 0 ? (
        <div className="flex flex-col items-center py-12">
          <span style={{ fontSize: 40 }}>🔍</span>
          <p className="text-sm mt-3" style={{ color: '#9CA3AF' }}>
            Nenhum artigo encontrado
          </p>
        </div>
      ) : (
        <div className="space-y-5 pb-4">
          {categorias.map((cat) => (
            <div key={cat}>
              <p className="text-xs font-bold uppercase tracking-wide mb-2" style={{ color: '#9CA3AF' }}>
                {cat}
              </p>
              <div className="space-y-2">
                {artigos
                  .filter((a) => a.categoria === cat)
                  .map((artigo) => (
                    <ArtigoCard key={artigo.id} artigo={artigo} />
                  ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function ArtigoCard({ artigo }) {
  const [aberto, setAberto] = useState(false)

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{ backgroundColor: '#FFFFFF', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', border: '1px solid #F0F0F0' }}
    >
      <button
        className="w-full flex items-start justify-between gap-3 p-4 text-left"
        onClick={() => setAberto((v) => !v)}
      >
        <div className="flex-1">
          <p className="font-semibold text-sm" style={{ color: '#1A1A1A' }}>{artigo.titulo}</p>
          <p className="text-xs mt-0.5 leading-snug" style={{ color: '#9CA3AF' }}>{artigo.resumo}</p>
        </div>
        <span style={{ color: '#9CA3AF', fontSize: 18, transform: aberto ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }}>
          ›
        </span>
      </button>
      {aberto && (
        <div
          className="px-4 pb-4"
          style={{ borderTop: '1px solid #F5F5F5' }}
        >
          <p className="text-sm leading-relaxed whitespace-pre-line mt-3" style={{ color: '#666666' }}>
            {artigo.conteudo}
          </p>
        </div>
      )}
    </div>
  )
}
