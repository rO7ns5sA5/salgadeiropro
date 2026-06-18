import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PageLayout from '../components/PageLayout'

const tipos = ['Coxinha', 'Kibe', 'Risole', 'Empada', 'Bolinha']

const defaultState = {
  tipoSalgado: 'Coxinha',
  pesoUnitario: 60,
  quantidade: 500,
  proporcaoMassa: 70,
  proporcaoRecheio: 30,
  custoMassa: 4.5,
  custoRecheio: 12.0,
  custoAdicionais: 1.0,
}

function CurrencyInput({ label, value, onChange }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1" style={{ color: '#374151' }}>
        {label}
      </label>
      <div className="flex items-center rounded-xl px-3"
        style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5', height: 48 }}>
        <span className="text-sm mr-1" style={{ color: '#9CA3AF' }}>R$</span>
        <input
          type="number"
          min={0}
          step={0.1}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="flex-1 bg-transparent outline-none text-sm font-medium"
          style={{ color: '#1A1A1A' }}
        />
        <span className="text-xs ml-1" style={{ color: '#9CA3AF' }}>/kg</span>
      </div>
    </div>
  )
}

function SliderField({ label, value, onChange, min = 0, max = 100 }) {
  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <label className="text-sm font-medium" style={{ color: '#374151' }}>{label}</label>
        <div className="px-3 py-1 rounded-lg text-sm font-bold"
          style={{ backgroundColor: '#C49A2A', color: '#FFFFFF', minWidth: 48, textAlign: 'center' }}>
          {value}%
        </div>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 rounded-lg appearance-none cursor-pointer"
        style={{ accentColor: '#C49A2A' }}
      />
    </div>
  )
}

export default function Calculadora() {
  const navigate = useNavigate()
  const [form, setForm] = useState(defaultState)

  const set = (key) => (val) => setForm((f) => ({ ...f, [key]: val }))

  const handleCalcular = () => {
    navigate('/calculadora/resultado', { state: { form } })
  }

  return (
    <PageLayout titulo="Produção">
      <div className="px-4 pt-4 pb-6 space-y-5">
        <div>
          <p className="font-bold text-xl" style={{ color: '#1A1A1A' }}>
            Calculadora de Produção
          </p>
          <p className="text-sm mt-0.5" style={{ color: '#9CA3AF' }}>
            Calcule custos, quantidade e lucro estimado
          </p>
        </div>

        {/* Tipo de salgado */}
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: '#374151' }}>
            Tipo de Salgado
          </label>
          <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
            {tipos.map((t) => {
              const ativo = form.tipoSalgado === t
              return (
                <button
                  key={t}
                  onClick={() => set('tipoSalgado')(t)}
                  className="flex-shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-all"
                  style={{
                    backgroundColor: ativo ? '#C49A2A' : '#FFFFFF',
                    color: ativo ? '#FFFFFF' : '#6B7280',
                    border: ativo ? 'none' : '1px solid #E5E5E5',
                  }}
                >
                  {t}
                </button>
              )
            })}
          </div>
        </div>

        {/* Peso unitário */}
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: '#374151' }}>
            Peso Unitário (g)
          </label>
          <div className="flex items-center gap-3">
            <button
              onClick={() => set('pesoUnitario')(Math.max(10, form.pesoUnitario - 10))}
              className="w-11 h-11 rounded-xl flex items-center justify-center font-bold text-lg flex-shrink-0"
              style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5', color: '#374151' }}
            >
              −
            </button>
            <div className="flex-1 flex items-center justify-center rounded-xl h-11"
              style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5' }}>
              <span className="font-bold text-lg" style={{ color: '#1A1A1A' }}>
                {form.pesoUnitario}g
              </span>
            </div>
            <button
              onClick={() => set('pesoUnitario')(form.pesoUnitario + 10)}
              className="w-11 h-11 rounded-xl flex items-center justify-center font-bold text-lg flex-shrink-0"
              style={{ backgroundColor: '#C49A2A', color: '#FFFFFF', border: 'none' }}
            >
              +
            </button>
          </div>
        </div>

        {/* Quantidade */}
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: '#374151' }}>
            Quantidade Desejada
          </label>
          <input
            type="number"
            min={1}
            value={form.quantidade}
            onChange={(e) => set('quantidade')(Number(e.target.value))}
            className="w-full rounded-xl px-4 outline-none text-sm font-medium"
            style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #E5E5E5',
              height: 48,
              color: '#1A1A1A',
            }}
          />
        </div>

        {/* Sliders de proporção */}
        <div
          className="p-4 rounded-xl space-y-4"
          style={{ backgroundColor: '#FFFFFF', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', borderRadius: 12 }}
        >
          <p className="font-bold text-sm" style={{ color: '#1A1A1A' }}>Proporções</p>
          <SliderField
            label="Proporção Massa (%)"
            value={form.proporcaoMassa}
            onChange={(v) => {
              set('proporcaoMassa')(v)
              set('proporcaoRecheio')(100 - v)
            }}
          />
          <SliderField
            label="Proporção Recheio (%)"
            value={form.proporcaoRecheio}
            onChange={(v) => {
              set('proporcaoRecheio')(v)
              set('proporcaoMassa')(100 - v)
            }}
          />
        </div>

        {/* Custos */}
        <div
          className="p-4 rounded-xl space-y-3"
          style={{ backgroundColor: '#FFFFFF', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', borderRadius: 12 }}
        >
          <p className="font-bold text-sm" style={{ color: '#1A1A1A' }}>Custos</p>
          <CurrencyInput label="Custo da Massa (R$/kg)" value={form.custoMassa} onChange={set('custoMassa')} />
          <CurrencyInput label="Custo do Recheio (R$/kg)" value={form.custoRecheio} onChange={set('custoRecheio')} />
          <CurrencyInput label="Adicionais — óleo, embalagem (R$/kg)" value={form.custoAdicionais} onChange={set('custoAdicionais')} />
        </div>

        {/* Botão calcular */}
        <button
          onClick={handleCalcular}
          className="w-full py-4 rounded-xl font-bold text-base"
          style={{ backgroundColor: '#C49A2A', color: '#FFFFFF', borderRadius: 12 }}
        >
          Calcular agora
        </button>
      </div>
    </PageLayout>
  )
}
