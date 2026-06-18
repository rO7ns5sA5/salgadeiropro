import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Settings, Wrench, AlertTriangle, Lightbulb, X, Zap, Package, Ruler, Shield, Clock } from 'lucide-react'
import PageLayout from '../components/PageLayout'
import { maquinas } from '../data/maquinas'

function InfograficoBarra({ label, valor, max, cor = '#C49A2A' }) {
  const pct = Math.round((valor / max) * 100)
  return (
    <div className="mb-3">
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs font-medium" style={{ color: '#9CA3AF' }}>{label}</span>
        <span className="text-xs font-bold" style={{ color: cor }}>{valor.toLocaleString('pt-BR')}</span>
      </div>
      <div className="h-2 rounded-full" style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}>
        <div className="h-2 rounded-full transition-all duration-700"
          style={{ width: `${pct}%`, backgroundColor: cor }} />
      </div>
    </div>
  )
}

function InfograficoModal({ maquina, onClose }) {
  const capacidades = [
    { label: 'Pop 4.0', kg: 40 },
    { label: 'Inox Supreme', kg: 60 },
    { label: 'Black Inox', kg: 50 },
    { label: 'Black Mix', kg: 50 },
    { label: 'Inox Prime 12.0', kg: 120 },
  ]
  const maxKg = 120

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end"
      style={{ backgroundColor: 'rgba(0,0,0,0.7)' }}
      onClick={onClose}
    >
      <div
        className="w-full rounded-t-3xl overflow-y-auto"
        style={{ backgroundColor: '#061423', maxHeight: '88vh', maxWidth: 480, margin: '0 auto' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 rounded-full" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }} />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-5 pb-4 pt-2">
          <div>
            <p className="text-xs font-bold tracking-widest" style={{ color: '#C49A2A' }}>COMPACTA PRINT</p>
            <p className="text-2xl font-bold" style={{ color: '#FFFFFF' }}>{maquina.nome}</p>
            <p className="text-sm" style={{ color: '#9CA3AF' }}>{maquina.subtitulo}</p>
          </div>
          <button onClick={onClose} className="w-9 h-9 rounded-full flex items-center justify-center"
            style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}>
            <X size={18} color="#9CA3AF" />
          </button>
        </div>

        <div className="px-5 pb-8 space-y-6">

          {/* Capacidade de Produção */}
          {maquina.capacidadeKg && (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 rounded flex items-center justify-center" style={{ backgroundColor: 'rgba(196,154,42,0.15)' }}>
                  <Clock size={14} color="#C49A2A" />
                </div>
                <p className="text-sm font-bold" style={{ color: '#FFFFFF' }}>Capacidade de Produção</p>
              </div>
              <div className="p-4 rounded-2xl mb-4" style={{ background: 'linear-gradient(135deg, rgba(196,154,42,0.15) 0%, rgba(196,154,42,0.05) 100%)', border: '1px solid rgba(196,154,42,0.25)' }}>
                <div className="flex justify-around text-center">
                  <div>
                    <p className="text-3xl font-bold" style={{ color: '#C49A2A' }}>{maquina.capacidadeKg}<span className="text-lg">kg</span></p>
                    <p className="text-xs mt-1" style={{ color: '#9CA3AF' }}>por hora</p>
                  </div>
                  <div className="w-px" style={{ backgroundColor: 'rgba(196,154,42,0.2)' }} />
                  <div>
                    <p className="text-3xl font-bold" style={{ color: '#C49A2A' }}>{(maquina.capacidadeUnidades / 1000).toFixed(0)}<span className="text-lg">K</span></p>
                    <p className="text-xs mt-1" style={{ color: '#9CA3AF' }}>unidades/hora</p>
                  </div>
                  <div className="w-px" style={{ backgroundColor: 'rgba(196,154,42,0.2)' }} />
                  <div>
                    <p className="text-3xl font-bold" style={{ color: '#C49A2A' }}>{maquina.pesoSalgadoMax}<span className="text-lg">g</span></p>
                    <p className="text-xs mt-1" style={{ color: '#9CA3AF' }}>máx/unidade</p>
                  </div>
                </div>
              </div>
              <p className="text-xs font-bold mb-3 tracking-wide" style={{ color: '#6B7280' }}>COMPARATIVO COM A LINHA COMPACTA</p>
              {capacidades.map(c => (
                <InfograficoBarra
                  key={c.label}
                  label={c.label}
                  valor={c.kg}
                  max={maxKg}
                  cor={c.label === maquina.nome ? '#C49A2A' : 'rgba(196,154,42,0.3)'}
                />
              ))}
            </div>
          )}

          {/* Linha divisória */}
          <div style={{ height: 1, backgroundColor: 'rgba(255,255,255,0.06)' }} />

          {/* Especificações físicas */}
          {maquina.dimensoes && (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 rounded flex items-center justify-center" style={{ backgroundColor: 'rgba(196,154,42,0.15)' }}>
                  <Ruler size={14} color="#C49A2A" />
                </div>
                <p className="text-sm font-bold" style={{ color: '#FFFFFF' }}>Dimensões e Peso</p>
              </div>
              {/* Ilustração de dimensões */}
              <div className="flex items-end justify-center gap-6 mb-4 py-4">
                {[
                  { label: 'Altura', val: maquina.dimensoes.altura, unit: 'cm', color: '#C49A2A' },
                  { label: 'Largura', val: maquina.dimensoes.largura, unit: 'cm', color: '#8B6914' },
                  { label: 'Prof.', val: maquina.dimensoes.profundidade, unit: 'cm', color: '#5C4409' },
                ].map(d => {
                  const maxDim = Math.max(maquina.dimensoes.altura, maquina.dimensoes.largura, maquina.dimensoes.profundidade)
                  const h = Math.round((d.val / maxDim) * 80)
                  return (
                    <div key={d.label} className="flex flex-col items-center gap-1">
                      <p className="text-xs font-bold" style={{ color: d.color }}>{d.val}{d.unit}</p>
                      <div className="w-10 rounded-t-lg" style={{ height: h, backgroundColor: d.color, opacity: 0.85 }} />
                      <p className="text-xs" style={{ color: '#6B7280' }}>{d.label}</p>
                    </div>
                  )
                })}
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="p-3 rounded-xl text-center" style={{ backgroundColor: '#0D2137' }}>
                  <p className="text-lg font-bold" style={{ color: '#FFFFFF' }}>{maquina.pesoBruto} kg</p>
                  <p className="text-xs" style={{ color: '#9CA3AF' }}>Peso bruto</p>
                </div>
                <div className="p-3 rounded-xl text-center" style={{ backgroundColor: '#0D2137' }}>
                  <p className="text-lg font-bold" style={{ color: '#FFFFFF' }}>{maquina.motores}</p>
                  <p className="text-xs" style={{ color: '#9CA3AF' }}>Motores</p>
                </div>
              </div>
            </div>
          )}

          {/* Linha divisória */}
          <div style={{ height: 1, backgroundColor: 'rgba(255,255,255,0.06)' }} />

          {/* Elétrico */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 rounded flex items-center justify-center" style={{ backgroundColor: 'rgba(196,154,42,0.15)' }}>
                <Zap size={14} color="#C49A2A" />
              </div>
              <p className="text-sm font-bold" style={{ color: '#FFFFFF' }}>Elétrico</p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: 'Voltagem', valor: maquina.voltagem },
                { label: 'Potência', valor: maquina.potencia ? `${maquina.potencia}W` : 'Não informado' },
                { label: 'Corrente', valor: maquina.corrente ? `${maquina.corrente}A` : 'Não informado' },
                { label: 'Frequência', valor: '50/60 Hz' },
              ].map(({ label, valor }) => (
                <div key={label} className="p-3 rounded-xl" style={{ backgroundColor: '#0D2137' }}>
                  <p className="text-xs" style={{ color: '#6B7280' }}>{label}</p>
                  <p className="text-sm font-bold mt-0.5" style={{ color: '#C49A2A' }}>{valor}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Linha divisória */}
          <div style={{ height: 1, backgroundColor: 'rgba(255,255,255,0.06)' }} />

          {/* Formatos suportados */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 rounded flex items-center justify-center" style={{ backgroundColor: 'rgba(196,154,42,0.15)' }}>
                <Package size={14} color="#C49A2A" />
              </div>
              <p className="text-sm font-bold" style={{ color: '#FFFFFF' }}>Formatos Suportados</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {maquina.formatos?.map(f => (
                <span key={f} className="px-3 py-1.5 rounded-full text-xs font-bold"
                  style={{ backgroundColor: 'rgba(196,154,42,0.12)', border: '1px solid rgba(196,154,42,0.25)', color: '#C49A2A' }}>
                  {f}
                </span>
              ))}
            </div>
          </div>

          {/* Garantia */}
          {maquina.garantia && (
            <>
              <div style={{ height: 1, backgroundColor: 'rgba(255,255,255,0.06)' }} />
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-6 h-6 rounded flex items-center justify-center" style={{ backgroundColor: 'rgba(196,154,42,0.15)' }}>
                    <Shield size={14} color="#C49A2A" />
                  </div>
                  <p className="text-sm font-bold" style={{ color: '#FFFFFF' }}>Garantia Compacta</p>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { label: 'Geral', valor: maquina.garantia.geral },
                    { label: 'Motores', valor: maquina.garantia.motores },
                    { label: 'Engrenagens', valor: maquina.garantia.engrenagens },
                  ].map(({ label, valor }) => (
                    <div key={label} className="p-3 rounded-xl text-center" style={{ backgroundColor: '#0D2137' }}>
                      <p className="text-sm font-bold" style={{ color: '#C49A2A' }}>{valor}</p>
                      <p className="text-xs mt-0.5" style={{ color: '#9CA3AF' }}>{label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  )
}

export default function MaquinaDetalhe() {
  const { id } = useParams()
  const navigate = useNavigate()
  const maquina = maquinas.find((m) => m.id === id)
  const [tabBico, setTabBico] = useState(0)
  const [showInfografico, setShowInfografico] = useState(false)

  if (!maquina) {
    return (
      <PageLayout dark voltar titulo="Máquina">
        <div className="flex items-center justify-center h-40">
          <p style={{ color: '#6B7280' }}>Máquina não encontrada.</p>
        </div>
      </PageLayout>
    )
  }

  const bicos = maquina.bicos || [{ nome: maquina.bicoRecomendado, tipo: 'massa', fluxoIdeal: maquina.fluxoMassa }]

  return (
    <PageLayout dark semHeader>
      {/* Header manual dark */}
      <div
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4"
        style={{ backgroundColor: '#061423', height: 56, maxWidth: 480, margin: '0 auto', borderBottom: '1px solid rgba(196,154,42,0.15)' }}
      >
        <button onClick={() => navigate(-1)} className="w-8 h-8 flex items-center justify-center"
          style={{ color: '#C49A2A' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
        </button>
        <button className="text-center" onClick={() => setShowInfografico(true)}>
          <p className="text-xs" style={{ color: '#6B7280' }}>COMPACTA PRINT</p>
          <p className="font-bold text-sm underline decoration-dotted" style={{ color: '#C49A2A' }}>{maquina.nome} ↗</p>
        </button>
        <div className="w-8" />
      </div>

      <div style={{ paddingTop: 56, paddingBottom: 80 }}>
        {/* Banner máquina */}
        <div
          className="mx-4 mt-4 p-4 rounded-xl flex items-center gap-4"
          style={{ background: 'linear-gradient(135deg, #0D2137 0%, #1a3a5c 100%)', border: '1px solid rgba(196,154,42,0.3)', borderRadius: 12 }}
        >
          <div
            className="w-20 h-20 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: 'rgba(196,154,42,0.12)', border: '1px solid rgba(196,154,42,0.3)' }}
          >
            <Settings size={36} color="#C49A2A" />
          </div>
          <button className="flex-1 min-w-0 text-left" onClick={() => setShowInfografico(true)}>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full"
              style={{ backgroundColor: 'rgba(196,154,42,0.2)', color: '#C49A2A' }}>
              COMPACTA PRINT
            </span>
            <p className="font-bold text-xl mt-1" style={{ color: '#FFFFFF' }}>{maquina.nome}</p>
            <p className="text-sm" style={{ color: '#9CA3AF' }}>{maquina.subtitulo}</p>
            <p className="text-xs mt-1 font-medium" style={{ color: 'rgba(196,154,42,0.6)' }}>Toque para ver infográfico ↗</p>
          </button>
        </div>

        {/* Cards de capacidade */}
        {maquina.capacidadeKg && (
          <div className="mx-4 mt-3 grid grid-cols-2 gap-2">
            <div className="p-3 rounded-xl text-center"
              style={{ backgroundColor: 'rgba(196,154,42,0.1)', border: '1px solid rgba(196,154,42,0.2)' }}>
              <p className="text-2xl font-bold" style={{ color: '#C49A2A' }}>{maquina.capacidadeKg}<span className="text-sm">kg</span></p>
              <p className="text-xs mt-0.5" style={{ color: '#9CA3AF' }}>por hora</p>
            </div>
            <div className="p-3 rounded-xl text-center"
              style={{ backgroundColor: 'rgba(196,154,42,0.1)', border: '1px solid rgba(196,154,42,0.2)' }}>
              <p className="text-2xl font-bold" style={{ color: '#C49A2A' }}>{(maquina.capacidadeUnidades / 1000).toFixed(0)}K</p>
              <p className="text-xs mt-0.5" style={{ color: '#9CA3AF' }}>unidades/hora</p>
            </div>
          </div>
        )}

        <div className="px-4 mt-4 space-y-4">
          {/* Especificações técnicas */}
          <div className="p-4 rounded-xl" style={{ backgroundColor: '#0D2137', borderRadius: 12 }}>
            <div className="flex items-center gap-2 mb-3">
              <Settings size={16} color="#C49A2A" />
              <p className="font-bold text-sm" style={{ color: '#C49A2A' }}>Especificações Técnicas</p>
            </div>
            {[
              { label: 'VOLTAGEM', valor: maquina.voltagem || '—' },
              maquina.potencia && { label: 'POTÊNCIA', valor: `${maquina.potencia}W` },
              maquina.motores && { label: 'MOTORES', valor: `${maquina.motores} independentes` },
              maquina.dimensoes && { label: 'DIMENSÕES', valor: `${maquina.dimensoes.altura}×${maquina.dimensoes.largura}×${maquina.dimensoes.profundidade} cm` },
              maquina.pesoBruto && { label: 'PESO BRUTO', valor: `${maquina.pesoBruto} kg` },
              maquina.pesoSalgadoMin && { label: 'PESO DO SALGADO', valor: `${maquina.pesoSalgadoMin}g a ${maquina.pesoSalgadoMax}g` },
              maquina.garantia && { label: 'GARANTIA', valor: `${maquina.garantia.geral} (motores ${maquina.garantia.motores})` },
            ].filter(Boolean).map(({ label, valor }) => (
              <div key={label} className="flex justify-between items-center py-2.5 border-b"
                style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                <p className="text-xs font-bold tracking-wide" style={{ color: '#6B7280' }}>{label}</p>
                <p className="text-sm font-bold text-right" style={{ color: '#C49A2A', maxWidth: '55%' }}>{valor}</p>
              </div>
            ))}
          </div>

          {/* Configuração de produção */}
          <div className="p-4 rounded-xl" style={{ backgroundColor: '#0D2137', borderRadius: 12 }}>
            <div className="flex items-center gap-2 mb-3">
              <Wrench size={16} color="#C49A2A" />
              <p className="font-bold text-sm" style={{ color: '#C49A2A' }}>Configuração de Produção</p>
            </div>
            {[
              { label: 'MANDÍBULA', valor: maquina.mandibula || '—' },
              { label: 'BICO RECOMENDADO', valor: maquina.bicoRecomendado || '—' },
              { label: 'FLUXO MASSA', valor: `${maquina.fluxoMassa}%` },
              { label: 'FLUXO RECHEIO', valor: `${maquina.fluxoRecheio}%` },
              { label: 'FORMATOS', valor: maquina.formatos?.slice(0, 4).join(', ') + (maquina.formatos?.length > 4 ? '...' : '') || '—' },
            ].map(({ label, valor }) => (
              <div key={label} className="flex justify-between items-center py-2.5 border-b"
                style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                <p className="text-xs font-bold tracking-wide" style={{ color: '#6B7280' }}>{label}</p>
                <p className="text-sm font-bold text-right" style={{ color: '#C49A2A', maxWidth: '55%' }}>{valor}</p>
              </div>
            ))}
          </div>

          {/* Bicos disponíveis */}
          <div className="rounded-xl overflow-hidden" style={{ backgroundColor: '#0D2137', borderRadius: 12 }}>
            <div className="flex items-center gap-2 px-4 py-3 border-b"
              style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
              <Wrench size={16} color="#C49A2A" />
              <p className="font-bold text-sm" style={{ color: '#C49A2A' }}>Bicos Disponíveis</p>
            </div>
            <div className="flex border-b overflow-x-auto" style={{ borderColor: 'rgba(255,255,255,0.06)', scrollbarWidth: 'none' }}>
              {bicos.map((b, i) => (
                <button
                  key={i}
                  onClick={() => setTabBico(i)}
                  className="flex-shrink-0 px-3 py-2 text-xs font-bold transition-all"
                  style={{
                    backgroundColor: tabBico === i ? '#C49A2A' : 'transparent',
                    color: tabBico === i ? '#061423' : '#6B7280',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {i + 1}. {b.nome}
                </button>
              ))}
            </div>
            <div className="p-4">
              <div className="flex justify-between items-center">
                <p className="text-sm font-bold" style={{ color: '#FFFFFF' }}>{bicos[tabBico]?.nome}</p>
                <span className="text-xs px-2 py-0.5 rounded-full font-bold capitalize"
                  style={{ backgroundColor: 'rgba(196,154,42,0.15)', color: '#C49A2A' }}>
                  {bicos[tabBico]?.tipo}
                </span>
              </div>
              <div className="mt-3 flex items-center gap-3">
                <p className="text-xs" style={{ color: '#6B7280' }}>Fluxo ideal:</p>
                <div className="flex-1 h-2 rounded-full" style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}>
                  <div className="h-2 rounded-full" style={{ width: `${bicos[tabBico]?.fluxoIdeal || 70}%`, backgroundColor: '#C49A2A' }} />
                </div>
                <p className="text-xs font-bold" style={{ color: '#C49A2A' }}>{bicos[tabBico]?.fluxoIdeal || 70}%</p>
              </div>
            </div>
          </div>

          {/* Tabela de calibragem real (quando disponível) */}
          {maquina.calibragens ? (() => {
            const escala = maquina.escalaMaxPainel || 100
            const isSupreme = escala === 5
            return (
              <div className="rounded-xl overflow-hidden" style={{ backgroundColor: '#0D2137' }}>
                <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                  <div className="flex items-center gap-2">
                    <Settings size={16} color="#C49A2A" />
                    <p className="font-bold text-sm" style={{ color: '#C49A2A' }}>Tabela de Calibragem do Painel</p>
                  </div>
                  <span className="text-xs px-2 py-0.5 rounded-full font-bold"
                    style={{ backgroundColor: 'rgba(196,154,42,0.15)', color: '#C49A2A' }}>
                    escala 0–{escala}
                  </span>
                </div>
                <div className="grid px-4 py-2 border-b" style={{ gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr', borderColor: 'rgba(255,255,255,0.06)' }}>
                  {[isSupreme ? 'M / R / PESO' : 'BICO / PESO', 'MASSA', 'RECHEIO', 'CORT.', 'TEMPO'].map(h => (
                    <p key={h} className="text-xs font-bold text-center" style={{ color: '#6B7280' }}>{h}</p>
                  ))}
                </div>
                {maquina.calibragens.map((c, i) => {
                  const pesoLabel = c.peso ? `${c.peso}g` : `${c.pesoMin}–${c.pesoMax}g`
                  const bicoLabel = isSupreme ? `M${c.bicoMassa}/R${c.bicoRecheio}` : `Bico ${c.bico}`
                  return (
                    <div key={i} className="grid px-4 py-3 border-b"
                      style={{
                        gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr',
                        borderColor: 'rgba(255,255,255,0.06)',
                        backgroundColor: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)',
                      }}>
                      <div>
                        <p className="text-xs font-bold" style={{ color: '#FFFFFF' }}>{bicoLabel} — {c.descricao}</p>
                        <p className="text-xs mt-0.5" style={{ color: '#C49A2A' }}>{pesoLabel}</p>
                      </div>
                      {[c.massa, c.recheio, c.cortador].map((v, idx) => (
                        <div key={idx} className="flex flex-col items-center justify-center">
                          <svg width={36} height={36} viewBox="0 0 36 36">
                            <circle cx={18} cy={18} r={13} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={5} />
                            <circle cx={18} cy={18} r={13} fill="none" stroke="#C49A2A" strokeWidth={5}
                              strokeDasharray={`${(v / escala) * 81.7} 81.7`}
                              strokeLinecap="round" transform="rotate(-90 18 18)" />
                            <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle"
                              fill="#C49A2A" fontSize="8" fontWeight="bold">{v}</text>
                          </svg>
                        </div>
                      ))}
                      <div className="flex items-center justify-center">
                        <span className="text-xs font-bold" style={{ color: c.tempo ? '#C49A2A' : '#4B5563' }}>
                          {c.tempo ?? '—'}
                        </span>
                      </div>
                    </div>
                  )
                })}
                <div className="px-4 py-2">
                  <p className="text-xs" style={{ color: '#6B7280' }}>
                    {isSupreme
                      ? 'Escala 1–5 (potenciômetros analógicos). M = Bico de Massa, R = Bico de Recheio.'
                      : 'Escala 0–100. TEMPO no potenciômetro de parada.'}
                  </p>
                </div>
              </div>
            )
          })() : (
            /* Painel de calibragem genérico */
            <div className="rounded-xl p-4" style={{ backgroundColor: '#0D2137', borderRadius: 12 }}>
              <p className="font-bold text-sm mb-4" style={{ color: '#C49A2A' }}>Painel de Calibragem</p>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: 'MASSA', valor: maquina.fluxoMassa },
                  { label: 'RECHEIO', valor: maquina.fluxoRecheio },
                  { label: 'CORTADOR', valor: 50 },
                ].map(({ label, valor }) => (
                  <div key={label} className="flex flex-col items-center">
                    <svg width={64} height={64} viewBox="0 0 64 64">
                      <circle cx={32} cy={32} r={24} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={8} />
                      <circle cx={32} cy={32} r={24} fill="none" stroke="#C49A2A" strokeWidth={8}
                        strokeDasharray={`${(valor / 100) * 150.8} 150.8`}
                        strokeLinecap="round" transform="rotate(-90 32 32)" />
                      <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle"
                        fill="#C49A2A" fontSize="12" fontWeight="bold">{valor}%</text>
                    </svg>
                    <p className="text-xs font-bold mt-1 tracking-wide" style={{ color: '#9CA3AF' }}>{label}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Dica de mestre */}
          {maquina.dicasMassa?.[0] && (
            <div className="p-4 rounded-xl"
              style={{ backgroundColor: 'rgba(196,154,42,0.08)', border: '1px solid rgba(196,154,42,0.25)', borderRadius: 12 }}>
              <div className="flex items-center gap-2 mb-2">
                <Lightbulb size={16} color="#C49A2A" />
                <p className="font-bold text-sm" style={{ color: '#C49A2A' }}>DICA DE MESTRE</p>
              </div>
              <p className="text-sm" style={{ color: '#D1D5DB' }}>{maquina.dicasMassa[0]}</p>
            </div>
          )}

          {/* Problemas comuns */}
          {maquina.problemasComuns && (
            <div className="rounded-xl overflow-hidden"
              style={{ backgroundColor: '#0D2137', borderRadius: 12 }}>
              <div className="flex items-center gap-2 px-4 py-3 border-b"
                style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                <Wrench size={16} color="#C49A2A" />
                <p className="font-bold text-sm" style={{ color: '#C49A2A' }}>Problemas Comuns</p>
              </div>
              {maquina.problemasComuns.map((p, i) => (
                <div key={i} className="px-4 py-3 border-b"
                  style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                  <p className="text-sm font-bold" style={{ color: '#FFFFFF' }}>{p.problema}</p>
                  <p className="text-xs mt-1" style={{ color: '#9CA3AF' }}>{p.solucao}</p>
                </div>
              ))}
            </div>
          )}

          {/* Alertas críticos */}
          {maquina.alertas && (
            <div className="p-4 rounded-xl"
              style={{ backgroundColor: 'rgba(220,38,38,0.08)', border: '1px solid rgba(220,38,38,0.3)', borderRadius: 12 }}>
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle size={16} color="#F87171" />
                <p className="font-bold text-sm" style={{ color: '#F87171' }}>ATENÇÃO CRÍTICA</p>
              </div>
              <ul className="space-y-2">
                {maquina.alertas.map((a, i) => (
                  <li key={i} className="flex gap-2">
                    <span style={{ color: '#F87171' }}>•</span>
                    <p className="text-xs" style={{ color: '#FCA5A5' }}>{a}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* BottomNav dark manual */}
      <nav
        className="fixed bottom-0 left-0 right-0 z-50 flex items-center"
        style={{
          backgroundColor: '#061423',
          borderTop: '1px solid rgba(196,154,42,0.2)',
          height: 64,
          maxWidth: 480,
          margin: '0 auto',
        }}
      >
        {[
          { label: 'Dashboard', path: '/' },
          { label: 'Máquinas', path: '/maquinas', ativo: true },
          { label: 'Receitas', path: '/receitas' },
          { label: 'Perfil', path: '/perfil' },
        ].map(({ label, path, ativo }) => (
          <button
            key={path}
            onClick={() => navigate(path)}
            className="flex-1 flex flex-col items-center justify-center gap-0.5 py-2"
          >
            <span className="text-xs font-medium" style={{ color: ativo ? '#C49A2A' : '#6B7280' }}>
              {label}
            </span>
          </button>
        ))}
      </nav>

      {showInfografico && (
        <InfograficoModal maquina={maquina} onClose={() => setShowInfografico(false)} />
      )}
    </PageLayout>
  )
}
