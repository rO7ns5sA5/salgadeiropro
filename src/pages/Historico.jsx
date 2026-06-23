import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Trash2, Calculator, TrendingUp } from 'lucide-react'
import PageLayout from '../components/PageLayout'
import { carregarHistorico, removerCalculo } from '../lib/historico'
import { formatarMoeda } from '../lib/calculadora'

const GOLD = '#C9932A'
const NAVY = '#0B1729'

export default function Historico() {
  const navigate = useNavigate()
  const [historico, setHistorico] = useState(carregarHistorico)

  function remover(id) {
    setHistorico(removerCalculo(id))
  }

  return (
    <PageLayout titulo="Histórico" voltar>
      <div className="px-4 pt-5 pb-6">
        <p className="font-bold text-xl" style={{ color: '#1A1A1A' }}>Histórico de Cálculos</p>
        <p className="text-sm mt-0.5 mb-4" style={{ color: '#9CA3AF' }}>
          Últimos {historico.length} cálculos salvos
        </p>

        {historico.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 gap-4">
            <Calculator size={48} color="#E5E5E5" />
            <p className="text-sm text-center" style={{ color: '#9CA3AF' }}>
              Nenhum cálculo ainda.<br />Faça seu primeiro cálculo de produção!
            </p>
            <button
              onClick={() => navigate('/calculadora')}
              className="px-6 py-3 rounded-xl font-bold text-sm"
              style={{ backgroundColor: GOLD, color: '#fff' }}
            >
              Calcular agora
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {historico.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl p-4"
                style={{ backgroundColor: '#FFFFFF', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', border: '1px solid #F0F0F0' }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-bold text-base" style={{ color: '#1A1A1A' }}>
                      {item.form.quantidade.toLocaleString()} {item.form.tipoSalgado}s
                    </p>
                    <p className="text-xs mt-0.5" style={{ color: '#9CA3AF' }}>
                      {item.data} às {item.hora} · {item.form.pesoUnitario}g/un
                    </p>
                  </div>
                  <button onClick={() => remover(item.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}>
                    <Trash2 size={16} color="#D1D5DB" />
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-2 mb-3">
                  <div className="rounded-xl p-2.5 text-center" style={{ backgroundColor: '#F9FAFB' }}>
                    <p className="text-xs" style={{ color: '#9CA3AF' }}>Custo</p>
                    <p className="font-bold text-sm" style={{ color: '#1A1A1A' }}>{formatarMoeda(item.resultado.custoTotal)}</p>
                  </div>
                  <div className="rounded-xl p-2.5 text-center" style={{ backgroundColor: '#F9FAFB' }}>
                    <p className="text-xs" style={{ color: '#9CA3AF' }}>Preço/un</p>
                    <p className="font-bold text-sm" style={{ color: GOLD }}>{formatarMoeda(item.resultado.precoSugerido)}</p>
                  </div>
                  <div className="rounded-xl p-2.5 text-center" style={{ backgroundColor: '#F0FDF4' }}>
                    <p className="text-xs" style={{ color: '#15803D' }}>Lucro</p>
                    <p className="font-bold text-sm" style={{ color: '#15803D' }}>{formatarMoeda(item.resultado.lucroEstimado)}</p>
                  </div>
                </div>

                <button
                  onClick={() => navigate('/calculadora/resultado', { state: { form: item.form } })}
                  className="w-full py-2.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2"
                  style={{ backgroundColor: NAVY, color: '#fff' }}
                >
                  <TrendingUp size={14} />
                  Ver resultado completo
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </PageLayout>
  )
}
