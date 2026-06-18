import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Settings, ChevronRight, CheckCircle } from 'lucide-react'
import PageLayout from '../components/PageLayout'
import { maquinas } from '../data/maquinas'

export default function Maquinas() {
  const navigate = useNavigate()
  const [selecionada, setSelecionada] = useState(maquinas[0].id)

  const maquina = maquinas.find((m) => m.id === selecionada)

  return (
    <PageLayout dark titulo="Máquinas">
      {/* Subtítulo */}
      <div className="px-4 pt-4 pb-2">
        <p className="text-xs font-bold tracking-widest uppercase" style={{ color: '#C49A2A' }}>
          Compacta Print
        </p>
        <p className="font-bold text-xl mt-0.5" style={{ color: '#FFFFFF' }}>
          Selecionar Modelo
        </p>
        <p className="text-sm" style={{ color: '#6B7280' }}>
          {maquinas.length} modelos disponíveis
        </p>
      </div>

      {/* Carrossel de seleção */}
      <div className="px-4 mt-2">
        <div className="flex gap-3 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none' }}>
          {maquinas.map((m) => {
            const ativa = m.id === selecionada
            return (
              <button
                key={m.id}
                onClick={() => setSelecionada(m.id)}
                className="flex-shrink-0 p-3 rounded-xl text-left transition-all"
                style={{
                  width: 140,
                  backgroundColor: ativa ? 'rgba(196,154,42,0.12)' : '#0D2137',
                  border: ativa ? '2px solid #C49A2A' : '1px solid rgba(255,255,255,0.08)',
                  borderRadius: 12,
                }}
              >
                {/* Badge status */}
                {m.status === 'ativa' && (
                  <span
                    className="text-xs font-bold px-2 py-0.5 rounded-full block w-fit mb-2"
                    style={{ backgroundColor: '#C49A2A', color: '#061423' }}
                  >
                    ATIVA
                  </span>
                )}
                {/* Ícone máquina */}
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-2"
                  style={{ backgroundColor: ativa ? 'rgba(196,154,42,0.2)' : 'rgba(255,255,255,0.06)' }}
                >
                  <Settings size={20} color={ativa ? '#C49A2A' : '#6B7280'} />
                </div>
                <p className="font-bold text-sm" style={{ color: ativa ? '#C49A2A' : '#FFFFFF' }}>
                  {m.nome}
                </p>
                <p className="text-xs mt-0.5 leading-tight" style={{ color: '#6B7280' }}>
                  {m.subtitulo}
                </p>
              </button>
            )
          })}
        </div>
      </div>

      {/* Ficha técnica da máquina selecionada */}
      {maquina && (
        <div className="px-4 mt-4 space-y-3 pb-4">
          {/* Header da ficha */}
          <div
            className="p-4 rounded-xl"
            style={{ backgroundColor: '#0D2137', borderRadius: 12 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <Settings size={16} color="#C49A2A" />
              <p className="font-bold text-sm" style={{ color: '#C49A2A' }}>
                {maquina.nome} — Ficha Técnica
              </p>
            </div>
            <div className="space-y-2.5">
              {[
                { label: 'TIPO DE SALGADO', valor: maquina.formatos?.join(', ') || '—' },
                { label: 'BICO RECOMENDADO', valor: maquina.bicoRecomendado || '—' },
                { label: 'MANDÍBULA', valor: maquina.mandibula || '—' },
              ].map(({ label, valor }) => (
                <div key={label} className="flex justify-between items-start border-b pb-2"
                  style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                  <p className="text-xs font-bold tracking-wide" style={{ color: '#6B7280' }}>{label}</p>
                  <p className="text-xs font-medium text-right ml-4 max-w-[55%]" style={{ color: '#C49A2A' }}>{valor}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Regulagem inicial */}
          <div
            className="p-4 rounded-xl"
            style={{ backgroundColor: '#0D2137', borderRadius: 12 }}
          >
            <p className="font-bold text-xs tracking-widest uppercase mb-3" style={{ color: '#C49A2A' }}>
              Regulagem Inicial
            </p>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'FLUXO MASSA', valor: maquina.fluxoMassa },
                { label: 'FLUXO RECHEIO', valor: maquina.fluxoRecheio },
              ].map(({ label, valor }) => (
                <div key={label} className="flex flex-col items-center p-3 rounded-xl"
                  style={{ backgroundColor: 'rgba(196,154,42,0.08)', border: '1px solid rgba(196,154,42,0.2)' }}>
                  {/* Mini donut */}
                  <svg width={56} height={56} viewBox="0 0 56 56">
                    <circle cx={28} cy={28} r={20} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={8} />
                    <circle
                      cx={28} cy={28} r={20}
                      fill="none"
                      stroke="#C49A2A"
                      strokeWidth={8}
                      strokeDasharray={`${(valor / 100) * 125.7} 125.7`}
                      strokeLinecap="round"
                      transform="rotate(-90 28 28)"
                    />
                    <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle"
                      fill="#C49A2A" fontSize="11" fontWeight="bold">
                      {valor}%
                    </text>
                  </svg>
                  <p className="text-xs font-bold mt-1 tracking-wide" style={{ color: '#9CA3AF' }}>{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Accordions */}
          {maquina.dicasMassa && (
            <Accordion titulo="Dicas de Massa" itens={maquina.dicasMassa} cor="#C49A2A" />
          )}
          {maquina.dicasRecheio && (
            <Accordion titulo="Dicas de Recheio" itens={maquina.dicasRecheio} cor="#C49A2A" />
          )}
          {maquina.problemasComuns && (
            <Accordion titulo="Problemas Comuns" itens={maquina.problemasComuns.map((p) => `${p.problema}: ${p.solucao}`)} cor="#F87171" />
          )}

          {/* Alertas críticos */}
          {maquina.alertas && (
            <div
              className="p-4 rounded-xl"
              style={{ backgroundColor: 'rgba(220,38,38,0.08)', border: '1px solid rgba(220,38,38,0.3)', borderRadius: 12 }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-base">⚠️</span>
                <p className="font-bold text-sm" style={{ color: '#F87171' }}>ATENÇÃO CRÍTICA</p>
              </div>
              <ul className="space-y-1.5">
                {maquina.alertas.map((a, i) => (
                  <li key={i} className="flex gap-2">
                    <span style={{ color: '#F87171' }}>•</span>
                    <p className="text-xs" style={{ color: '#FCA5A5' }}>{a}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* CTA ver detalhe */}
          <button
            onClick={() => navigate(`/maquinas/${maquina.id}`)}
            className="w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2"
            style={{ backgroundColor: '#C49A2A', color: '#061423', borderRadius: 12 }}
          >
            Ver ficha completa
            <ChevronRight size={18} />
          </button>
        </div>
      )}
    </PageLayout>
  )
}

function Accordion({ titulo, itens, cor }) {
  const [aberto, setAberto] = useState(false)
  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{ backgroundColor: '#0D2137', borderRadius: 12 }}
    >
      <button
        className="w-full flex justify-between items-center px-4 py-3"
        onClick={() => setAberto((v) => !v)}
      >
        <p className="font-bold text-sm" style={{ color: '#FFFFFF' }}>{titulo}</p>
        <span className="text-lg" style={{ color: cor, transform: aberto ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
          ›
        </span>
      </button>
      {aberto && (
        <div className="px-4 pb-4 space-y-2 border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
          {itens.map((item, i) => (
            <div key={i} className="flex gap-2 pt-2">
              <span style={{ color: cor }}>•</span>
              <p className="text-sm" style={{ color: '#D1D5DB' }}>{item}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
