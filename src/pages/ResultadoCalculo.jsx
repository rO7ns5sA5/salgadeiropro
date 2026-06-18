import { useLocation, useNavigate } from 'react-router-dom'
import { TrendingUp, Save, FileDown, Package, Layers, DollarSign, Tag } from 'lucide-react'
import PageLayout from '../components/PageLayout'
import { calcularProducao, formatarMoeda, formatarKg } from '../lib/calculadora'

function DonutChart({ massaPct, recheiosPct }) {
  const size = 160
  const stroke = 22
  const r = (size - stroke) / 2
  const circ = 2 * Math.PI * r
  const cx = size / 2
  const cy = size / 2

  const massaLen = (massaPct / 100) * circ
  const recheioLen = (recheiosPct / 100) * circ
  const gap = 4

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          {/* Fundo */}
          <circle cx={cx} cy={cy} r={r} fill="none" stroke="#F0F0F0" strokeWidth={stroke} />
          {/* Recheio (começa do 0) */}
          <circle
            cx={cx} cy={cy} r={r}
            fill="none"
            stroke="#7B2D2D"
            strokeWidth={stroke}
            strokeDasharray={`${recheioLen - gap} ${circ - recheioLen + gap}`}
            strokeDashoffset={0}
            strokeLinecap="round"
            transform={`rotate(-90 ${cx} ${cy})`}
          />
          {/* Massa (começa após o recheio) */}
          <circle
            cx={cx} cy={cy} r={r}
            fill="none"
            stroke="#C49A2A"
            strokeWidth={stroke}
            strokeDasharray={`${massaLen - gap} ${circ - massaLen + gap}`}
            strokeDashoffset={-(recheioLen)}
            strokeLinecap="round"
            transform={`rotate(-90 ${cx} ${cy})`}
          />
        </svg>
        {/* Centro */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p className="font-bold text-xl" style={{ color: '#1A1A1A' }}>{massaPct}%</p>
          <p className="text-xs" style={{ color: '#9CA3AF' }}>Massa</p>
        </div>
      </div>
      {/* Legenda */}
      <div className="flex gap-4 mt-2">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#C49A2A' }} />
          <span className="text-xs font-medium" style={{ color: '#374151' }}>Massa {massaPct}%</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#7B2D2D' }} />
          <span className="text-xs font-medium" style={{ color: '#374151' }}>Recheio {recheiosPct}%</span>
        </div>
      </div>
    </div>
  )
}

function MetricCard({ icon: Icon, label, valor, cor = '#1A1A1A' }) {
  return (
    <div
      className="flex flex-col gap-1 p-3 rounded-xl"
      style={{ backgroundColor: '#FFFFFF', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', borderRadius: 12 }}
    >
      <div className="flex items-center gap-1.5">
        <Icon size={14} color="#9CA3AF" />
        <p className="text-xs" style={{ color: '#9CA3AF' }}>{label}</p>
      </div>
      <p className="font-bold text-base" style={{ color: cor }}>{valor}</p>
    </div>
  )
}

export default function ResultadoCalculo() {
  const { state } = useLocation()
  const navigate = useNavigate()

  if (!state?.form) {
    navigate('/calculadora')
    return null
  }

  const { form } = state
  const res = calcularProducao(form)

  return (
    <PageLayout voltar titulo="Resultado">
      {/* Hero card */}
      <div className="px-4 pt-4">
        <div
          className="relative rounded-xl overflow-hidden"
          style={{ height: 160, borderRadius: 12 }}
        >
          <img
            src="https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800&h=400&fit=crop"
            alt="Salgados"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.72))' }}
          />
          <div className="absolute bottom-0 left-0 p-4">
            <p className="text-white font-bold text-2xl leading-tight">
              {form.quantidade.toLocaleString()} {form.tipoSalgado.toLowerCase()}s de {form.pesoUnitario}g
            </p>
            <p className="text-white text-sm opacity-80 mt-0.5">
              Total: {formatarKg(res.pesoTotal)} · Receita: {form.tipoSalgado}
            </p>
          </div>
        </div>
      </div>

      <div className="px-4 py-4 space-y-4">
        {/* Gráfico donut */}
        <div
          className="p-4 rounded-xl flex flex-col items-center"
          style={{ backgroundColor: '#FFFFFF', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', borderRadius: 12 }}
        >
          <p className="font-bold text-sm mb-4 self-start" style={{ color: '#1A1A1A' }}>
            Proporção Massa vs. Recheio
          </p>
          <DonutChart massaPct={form.proporcaoMassa} recheiosPct={form.proporcaoRecheio} />
        </div>

        {/* Grid de métricas */}
        <div className="grid grid-cols-2 gap-3">
          <MetricCard icon={Package} label="Total Massa" valor={formatarKg(res.totalMassa)} />
          <MetricCard icon={Layers} label="Total Recheio" valor={formatarKg(res.totalRecheio)} />
          <MetricCard icon={DollarSign} label="Custo Estimado" valor={formatarMoeda(res.custoTotal)} />
          <MetricCard icon={Tag} label="Preço Sugerido/un" valor={formatarMoeda(res.precoSugerido)} cor="#C49A2A" />
        </div>

        {/* Lucro estimado */}
        <div
          className="flex items-center justify-between p-4 rounded-xl"
          style={{ backgroundColor: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: 12 }}
        >
          <div>
            <p className="text-sm" style={{ color: '#15803D' }}>Lucro Estimado</p>
            <p className="font-bold text-2xl" style={{ color: '#15803D' }}>
              {formatarMoeda(res.lucroEstimado)}
            </p>
            <p className="text-xs mt-0.5" style={{ color: '#6B7280' }}>
              Margem de 2,5× sobre o custo
            </p>
          </div>
          <TrendingUp size={36} color="#15803D" strokeWidth={1.5} />
        </div>

        {/* Custo por unidade */}
        <div
          className="flex justify-between items-center p-4 rounded-xl"
          style={{ backgroundColor: '#FFFFFF', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', borderRadius: 12 }}
        >
          <p className="text-sm" style={{ color: '#374151' }}>Custo por unidade</p>
          <p className="font-bold" style={{ color: '#1A1A1A' }}>{formatarMoeda(res.custoPorUnidade)}</p>
        </div>
        <div
          className="flex justify-between items-center p-4 rounded-xl"
          style={{ backgroundColor: '#FFFFFF', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', borderRadius: 12 }}
        >
          <p className="text-sm" style={{ color: '#374151' }}>Receita bruta total</p>
          <p className="font-bold" style={{ color: '#C49A2A' }}>{formatarMoeda(res.receitaBruta)}</p>
        </div>

        {/* Botões */}
        <div className="flex gap-3">
          <button
            className="flex-1 py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2"
            style={{ backgroundColor: '#061423', color: '#FFFFFF', borderRadius: 12 }}
          >
            <Save size={16} />
            Salvar cálculo
          </button>
          <button
            className="flex-1 py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2"
            style={{ backgroundColor: 'transparent', color: '#061423', border: '2px solid #061423', borderRadius: 12 }}
          >
            <FileDown size={16} />
            Exportar PDF
          </button>
        </div>

        <button
          onClick={() => navigate('/calculadora')}
          className="w-full py-3 rounded-xl font-medium text-sm"
          style={{ color: '#9CA3AF' }}
        >
          ← Novo cálculo
        </button>
      </div>
    </PageLayout>
  )
}
