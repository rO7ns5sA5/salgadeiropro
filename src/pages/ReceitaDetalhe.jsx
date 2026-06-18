import { useParams, useNavigate } from 'react-router-dom'
import { Settings, Calculator, ChefHat, Lightbulb } from 'lucide-react'
import PageLayout from '../components/PageLayout'
import { receitas } from '../data/receitas'

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
      {/* Hero foto */}
      <div className="relative" style={{ height: 240 }}>
        <img
          src={receita.imagem}
          alt={receita.nome}
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.7) 100%)' }}
        />
        {/* Botão voltar */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 w-9 h-9 rounded-full flex items-center justify-center"
          style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
        </button>
        {/* Info sobreposta */}
        <div className="absolute bottom-0 left-0 p-4">
          <div className="flex gap-2 mb-2">
            <span className="px-2 py-0.5 rounded-full text-xs font-bold capitalize"
              style={{ backgroundColor: '#C49A2A', color: '#FFFFFF' }}>
              {receita.formato}
            </span>
            <span className="px-2 py-0.5 rounded-full text-xs font-bold"
              style={{ backgroundColor: 'rgba(255,255,255,0.2)', color: '#FFFFFF' }}>
              {receita.peso}g
            </span>
          </div>
          <p className="text-white font-bold text-2xl leading-tight">{receita.nome}</p>
          <p className="text-white text-sm mt-1 opacity-80">Massa: {receita.massa}</p>
        </div>
      </div>

      <div className="px-4 py-4 space-y-4">
        {/* Card máquina recomendada */}
        <div
          className="flex items-center gap-3 p-4 rounded-xl"
          style={{ backgroundColor: '#061423', borderRadius: 12 }}
        >
          <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: 'rgba(196,154,42,0.2)' }}>
            <Settings size={20} color="#C49A2A" />
          </div>
          <div>
            <p className="text-xs" style={{ color: '#9CA3AF' }}>Máquina recomendada</p>
            <p className="font-bold" style={{ color: '#C49A2A' }}>{receita.maquina}</p>
            <p className="text-xs" style={{ color: '#6B7280' }}>Bico: {receita.bico}</p>
          </div>
        </div>

        {/* Proporções */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 rounded-xl text-center"
            style={{ backgroundColor: '#FFFFFF', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', borderRadius: 12 }}>
            <p className="text-2xl font-bold" style={{ color: '#C49A2A' }}>{receita.proporcaoMassa}%</p>
            <p className="text-xs mt-0.5" style={{ color: '#6B7280' }}>Proporção Massa</p>
          </div>
          <div className="p-3 rounded-xl text-center"
            style={{ backgroundColor: '#FFFFFF', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', borderRadius: 12 }}>
            <p className="text-2xl font-bold" style={{ color: '#7B2D2D' }}>{receita.proporcaoRecheio}%</p>
            <p className="text-xs mt-0.5" style={{ color: '#6B7280' }}>Proporção Recheio</p>
          </div>
        </div>

        {/* Ingredientes */}
        <div className="rounded-xl overflow-hidden"
          style={{ backgroundColor: '#FFFFFF', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', borderRadius: 12 }}>
          <div className="flex items-center gap-2 px-4 py-3 border-b" style={{ borderColor: '#F0F0F0' }}>
            <ChefHat size={18} color="#C49A2A" />
            <p className="font-bold" style={{ color: '#1A1A1A' }}>Ingredientes</p>
          </div>
          <div className="divide-y" style={{ '--tw-divide-opacity': 1 }}>
            {receita.ingredientes.map((ing, i) => (
              <div key={i} className="flex justify-between items-center px-4 py-3">
                <p className="text-sm" style={{ color: '#1A1A1A' }}>{ing.item}</p>
                <p className="text-sm font-bold" style={{ color: '#C49A2A' }}>{ing.quantidade}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Modo de preparo */}
        {receita.modoPreparo && (
          <div className="rounded-xl overflow-hidden"
            style={{ backgroundColor: '#FFFFFF', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', borderRadius: 12 }}>
            <div className="flex items-center gap-2 px-4 py-3 border-b" style={{ borderColor: '#F0F0F0' }}>
              <p className="font-bold" style={{ color: '#1A1A1A' }}>Modo de preparo</p>
            </div>
            <div className="p-4 space-y-3">
              {receita.modoPreparo.map((passo, i) => (
                <div key={i} className="flex gap-3">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ backgroundColor: '#C49A2A' }}>
                    <span className="text-xs font-bold text-white">{i + 1}</span>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: '#374151' }}>{passo}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Dicas */}
        {receita.dicas && (
          <div className="rounded-xl p-4"
            style={{ backgroundColor: '#FDF8EC', border: '1px solid #E8D5A3', borderRadius: 12 }}>
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb size={18} color="#C49A2A" />
              <p className="font-bold text-sm" style={{ color: '#1A1A1A' }}>Dicas de produção</p>
            </div>
            <ul className="space-y-2">
              {receita.dicas.map((dica, i) => (
                <li key={i} className="flex gap-2">
                  <span style={{ color: '#C49A2A' }}>•</span>
                  <p className="text-sm" style={{ color: '#374151' }}>{dica}</p>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* CTA Calculadora */}
        <button
          onClick={() => navigate('/calculadora')}
          className="w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2"
          style={{ backgroundColor: '#C49A2A', color: '#FFFFFF', borderRadius: 12 }}
        >
          <Calculator size={18} />
          Calcular produção desta receita
        </button>
      </div>
    </PageLayout>
  )
}
