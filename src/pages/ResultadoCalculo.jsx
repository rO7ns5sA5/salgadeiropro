import { useLocation, useNavigate } from 'react-router-dom'
import { TrendingUp, Save, FileDown, Package, Layers, DollarSign, Tag } from 'lucide-react'
import PageLayout from '../components/PageLayout'
import { calcularProducao, formatarMoeda, formatarKg } from '../lib/calculadora'

const GOLD = '#C9932A'
const NAVY = '#0B1729'

function DonutChart({ massaPct, recheiosPct }) {
  const size = 156
  const stroke = 20
  const r = (size - stroke) / 2
  const circ = 2 * Math.PI * r
  const cx = size / 2
  const cy = size / 2
  const gap = 4
  const massaLen = (massaPct / 100) * circ
  const recheioLen = (recheiosPct / 100) * circ

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          <circle cx={cx} cy={cy} r={r} fill="none" stroke="#F0F0F0" strokeWidth={stroke} />
          <circle
            cx={cx} cy={cy} r={r}
            fill="none" stroke="#94a3b8"
            strokeWidth={stroke}
            strokeDasharray={`${recheioLen - gap} ${circ - recheioLen + gap}`}
            strokeDashoffset={0}
            strokeLinecap="round"
            transform={`rotate(-90 ${cx} ${cy})`}
          />
          <circle
            cx={cx} cy={cy} r={r}
            fill="none" stroke={GOLD}
            strokeWidth={stroke}
            strokeDasharray={`${massaLen - gap} ${circ - massaLen + gap}`}
            strokeDashoffset={-(recheioLen)}
            strokeLinecap="round"
            transform={`rotate(-90 ${cx} ${cy})`}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p className="font-bold text-xl" style={{ color: '#1A1A1A' }}>{massaPct}%</p>
          <p className="text-xs" style={{ color: '#9CA3AF' }}>Massa</p>
        </div>
      </div>
      <div className="flex gap-5 mt-2">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: GOLD }} />
          <span className="text-xs font-medium" style={{ color: '#666666' }}>Massa {massaPct}%</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#94a3b8' }} />
          <span className="text-xs font-medium" style={{ color: '#666666' }}>Recheio {recheiosPct}%</span>
        </div>
      </div>
    </div>
  )
}

function MetricCard({ icon: Icon, label, valor, cor = '#1A1A1A' }) {
  return (
    <div
      className="flex flex-col gap-1 p-4 rounded-2xl"
      style={{ backgroundColor: '#FFFFFF', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', border: '1px solid #F0F0F0' }}
    >
      <div className="flex items-center gap-1.5">
        <Icon size={13} color="#9CA3AF" />
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
      {/* Hero card — gradiente CSS, sem imagem externa */}
      <div className="px-4 pt-4">
        <div
          className="relative rounded-2xl overflow-hidden p-5 flex flex-col justify-end"
          style={{
            height: 148,
            background: `linear-gradient(135deg, ${NAVY} 0%, #1a3055 60%, #0f2a4a 100%)`,
          }}
        >
          {/* Ícone decorativo */}
          <div
            className="absolute top-4 right-4 w-14 h-14 rounded-2xl flex items-center justify-center"
            style={{ backgroundColor: 'rgba(201,147,42,0.18)', border: '1px solid rgba(201,147,42,0.3)' }}
          >
            <span style={{ fontSize: 28 }}>🧆</span>
          </div>
          <p className="text-white font-bold text-xl leading-tight">
            {form.quantidade.toLocaleString()} {form.tipoSalgado.toLowerCase()}s
          </p>
          <p className="text-white text-sm opacity-70 mt-0.5">
            {form.pesoUnitario}g/un · Total: {formatarKg(res.pesoTotal)}
          </p>
        </div>
      </div>

      <div className="px-4 py-4 space-y-4">
        {/* Gráfico */}
        <div
          className="p-4 rounded-2xl flex flex-col items-center"
          style={{ backgroundColor: '#FFFFFF', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', border: '1px solid #F0F0F0' }}
        >
          <p className="font-semibold text-sm mb-4 self-start" style={{ color: '#1A1A1A' }}>
            Proporção Massa vs. Recheio
          </p>
          <DonutChart massaPct={form.proporcaoMassa} recheiosPct={form.proporcaoRecheio} />
        </div>

        {/* Métricas */}
        <div className="grid grid-cols-2 gap-3">
          <MetricCard icon={Package}    label="Total Massa"       valor={formatarKg(res.totalMassa)} />
          <MetricCard icon={Layers}     label="Total Recheio"     valor={formatarKg(res.totalRecheio)} />
          <MetricCard icon={DollarSign} label="Custo Estimado"    valor={formatarMoeda(res.custoTotal)} />
          <MetricCard icon={Tag}        label="Preço Sugerido/un" valor={formatarMoeda(res.precoSugerido)} cor={GOLD} />
        </div>

        {/* Lucro */}
        <div
          className="flex items-center justify-between p-4 rounded-2xl"
          style={{ backgroundColor: '#F0FDF4', border: '1px solid #BBF7D0' }}
        >
          <div>
            <p className="text-sm" style={{ color: '#15803D' }}>Lucro Estimado</p>
            <p className="font-bold text-2xl" style={{ color: '#15803D' }}>
              {formatarMoeda(res.lucroEstimado)}
            </p>
            <p className="text-xs mt-0.5" style={{ color: '#666666' }}>Margem de 2,5× sobre o custo</p>
          </div>
          <TrendingUp size={34} color="#15803D" strokeWidth={1.5} />
        </div>

        {/* Detalhes */}
        <div
          className="flex justify-between items-center p-4 rounded-2xl"
          style={{ backgroundColor: '#FFFFFF', boxShadow: '0 1px 4px rgba(0,0,0,0.05)', border: '1px solid #F0F0F0' }}
        >
          <p className="text-sm" style={{ color: '#666666' }}>Custo por unidade</p>
          <p className="font-bold" style={{ color: '#1A1A1A' }}>{formatarMoeda(res.custoPorUnidade)}</p>
        </div>
        <div
          className="flex justify-between items-center p-4 rounded-2xl"
          style={{ backgroundColor: '#FFFFFF', boxShadow: '0 1px 4px rgba(0,0,0,0.05)', border: '1px solid #F0F0F0' }}
        >
          <p className="text-sm" style={{ color: '#666666' }}>Receita bruta total</p>
          <p className="font-bold" style={{ color: GOLD }}>{formatarMoeda(res.receitaBruta)}</p>
        </div>

        {/* Botões */}
        <div className="flex gap-3">
          <button
            className="flex-1 py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2"
            style={{ backgroundColor: NAVY, color: '#FFFFFF' }}
          >
            <Save size={15} />
            Salvar cálculo
          </button>
          <button
            className="flex-1 py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2"
            style={{ backgroundColor: 'transparent', color: NAVY, border: `1.5px solid ${NAVY}` }}
          >
            <FileDown size={15} />
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
