import { useParams, useNavigate } from 'react-router-dom'
import { Settings, Calculator, ChefHat, Lightbulb } from 'lucide-react'
import PageLayout from '../components/PageLayout'
import { receitas } from '../data/receitas'

const GOLD = '#C9932A'
const NAVY = '#0B1729'

export default function ReceitaDetalhe() {
  const { id } = useParams()
  const navigate = useNavigate()
  const receita = receitas.find((r) => r.id === Number(id))

  if (!receita) {
    return (
      <PageLayout voltar titulo="Receita">
        <div className="flex items-center justify-center h-40">
          <p style={{ color: '#9CA3AF' }}>Receita não encontrada.</p>
        </div>
      </PageLayout>
    )
  }

  return (
    <PageLayout voltar semHeader>
      {/* Hero */}
      <div
        className="relative"
        style={{ height: 236, background: `linear-gradient(135deg, ${NAVY} 0%, #1a3055 100%)` }}
      >
        <img
          src={receita.imagem}
          alt={receita.nome}
          className="absolute inset-0 w-full h-full object-cover"
          onError={(e) => { e.target.style.display = 'none' }}
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.72) 100%)' }}
        />
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 w-9 h-9 rounded-full flex items-center justify-center"
          style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
        </button>
        <div className="absolute bottom-0 left-0 p-4">
          <div className="flex gap-2 mb-2">
            <span className="px-2 py-0.5 rounded-full text-xs font-bold capitalize"
              style={{ backgroundColor: GOLD, color: '#FFFFFF' }}>
              {receita.formato}
            </span>
            <span className="px-2 py-0.5 rounded-full text-xs font-bold"
              style={{ backgroundColor: 'rgba(255,255,255,0.2)', color: '#FFFFFF' }}>
              {receita.peso}g
            </span>
          </div>
          <p className="text-white font-bold text-2xl leading-tight">{receita.nome}</p>
          <p className="text-white text-sm mt-1 opacity-70">Massa: {receita.massa}</p>
        </div>
      </div>

      <div className="px-4 py-4 space-y-4">
        {/* Máquina recomendada */}
        <div
          className="flex items-center gap-3 p-4 rounded-2xl"
          style={{ backgroundColor: NAVY }}
        >
          <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: 'rgba(201,147,42,0.2)' }}>
            <Settings size={19} color={GOLD} />
          </div>
          <div>
            <p className="text-xs" style={{ color: '#9CA3AF' }}>Máquina recomendada</p>
            <p className="font-bold" style={{ color: GOLD }}>{receita.maquina}</p>
            <p className="text-xs" style={{ color: '#6B7280' }}>Bico: {receita.bico}</p>
          </div>
        </div>

        {/* Proporções */}
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: 'Proporção Massa',   valor: receita.proporcaoMassa,   cor: GOLD },
            { label: 'Proporção Recheio', valor: receita.proporcaoRecheio, cor: '#64748b' },
          ].map(({ label, valor, cor }) => (
            <div key={label} className="p-4 rounded-2xl text-center"
              style={{ backgroundColor: '#FFFFFF', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', border: '1px solid #F0F0F0' }}>
              <p className="text-2xl font-bold" style={{ color: cor }}>{valor}%</p>
              <p className="text-xs mt-0.5" style={{ color: '#9CA3AF' }}>{label}</p>
            </div>
          ))}
        </div>

        {/* Ingredientes */}
        <div className="rounded-2xl overflow-hidden"
          style={{ backgroundColor: '#FFFFFF', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', border: '1px solid #F0F0F0' }}>
          <div className="flex items-center gap-2 px-4 py-3" style={{ borderBottom: '1px solid #F0F0F0' }}>
            <ChefHat size={17} color={GOLD} />
            <p className="font-semibold" style={{ color: '#1A1A1A' }}>Ingredientes</p>
          </div>
          {receita.ingredientes.map((ing, i) => (
            <div key={i} className="flex justify-between items-center px-4 py-3"
              style={{ borderBottom: i < receita.ingredientes.length - 1 ? '1px solid #F5F5F5' : 'none' }}>
              <p className="text-sm" style={{ color: '#1A1A1A' }}>{ing.item}</p>
              <p className="text-sm font-bold" style={{ color: GOLD }}>{ing.quantidade}</p>
            </div>
          ))}
        </div>

        {/* Modo de preparo */}
        {receita.modoPreparo && (
          <div className="rounded-2xl overflow-hidden"
            style={{ backgroundColor: '#FFFFFF', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', border: '1px solid #F0F0F0' }}>
            <div className="px-4 py-3" style={{ borderBottom: '1px solid #F0F0F0' }}>
              <p className="font-semibold" style={{ color: '#1A1A1A' }}>Modo de preparo</p>
            </div>
            <div className="p-4 space-y-3">
              {receita.modoPreparo.map((passo, i) => (
                <div key={i} className="flex gap-3">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ backgroundColor: GOLD }}>
                    <span className="text-xs font-bold text-white">{i + 1}</span>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: '#666666' }}>{passo}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Dicas */}
        {receita.dicas && (
          <div className="rounded-2xl p-4"
            style={{ backgroundColor: '#FEF8EC', border: `1px solid ${GOLD}30` }}>
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb size={17} color={GOLD} />
              <p className="font-semibold text-sm" style={{ color: '#1A1A1A' }}>Dicas de produção</p>
            </div>
            <ul className="space-y-2">
              {receita.dicas.map((dica, i) => (
                <li key={i} className="flex gap-2">
                  <span style={{ color: GOLD }}>•</span>
                  <p className="text-sm" style={{ color: '#666666' }}>{dica}</p>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* CTA */}
        <button
          onClick={() => navigate('/calculadora')}
          className="w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-2"
          style={{ backgroundColor: GOLD, color: '#FFFFFF' }}
        >
          <Calculator size={17} />
          Calcular produção desta receita
        </button>
      </div>
    </PageLayout>
  )
}
