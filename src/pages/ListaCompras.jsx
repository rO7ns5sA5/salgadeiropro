import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ShoppingCart, Check, Share2, ChevronLeft } from 'lucide-react'
import PageLayout from '../components/PageLayout'
import { calcularProducao, formatarKg } from '../lib/calculadora'

const GOLD = '#C9932A'
const NAVY = '#0B1729'

// Ingredientes base por kg de massa e por kg de recheio, por tipo de salgado
const ingredientesPorTipo = {
  Coxinha: {
    massa: [
      { item: 'Mandioca cozida', fator: 0.70, unidade: 'kg' },
      { item: 'Farinha de trigo', fator: 0.20, unidade: 'kg' },
      { item: 'Sal', fator: 0.01, unidade: 'kg' },
    ],
    recheio: [
      { item: 'Frango desfiado', fator: 0.70, unidade: 'kg' },
      { item: 'Requeijão cremoso', fator: 0.20, unidade: 'kg' },
      { item: 'Temperos (alho, cebola)', fator: 0.10, unidade: 'kg' },
    ],
    outros: [
      { item: 'Óleo para fritura', quantidade: 0, fatorPorUnidade: 0.005, unidade: 'L' },
    ],
  },
  Kibe: {
    massa: [
      { item: 'Batata cozida', fator: 0.75, unidade: 'kg' },
      { item: 'Farinha de trigo', fator: 0.15, unidade: 'kg' },
      { item: 'Sal', fator: 0.01, unidade: 'kg' },
    ],
    recheio: [
      { item: 'Carne moída', fator: 0.80, unidade: 'kg' },
      { item: 'Cebola', fator: 0.10, unidade: 'kg' },
      { item: 'Temperos', fator: 0.10, unidade: 'kg' },
    ],
    outros: [
      { item: 'Óleo para fritura', fatorPorUnidade: 0.005, unidade: 'L' },
    ],
  },
  Risole: {
    massa: [
      { item: 'Farinha de trigo', fator: 0.60, unidade: 'kg' },
      { item: 'Leite', fator: 0.30, unidade: 'L' },
      { item: 'Manteiga', fator: 0.08, unidade: 'kg' },
      { item: 'Sal', fator: 0.01, unidade: 'kg' },
    ],
    recheio: [
      { item: 'Camarão temperado', fator: 0.65, unidade: 'kg' },
      { item: 'Molho branco', fator: 0.25, unidade: 'kg' },
      { item: 'Temperos', fator: 0.10, unidade: 'kg' },
    ],
    outros: [
      { item: 'Óleo para fritura', fatorPorUnidade: 0.005, unidade: 'L' },
      { item: 'Farinha de rosca (empanamento)', fatorPorUnidade: 0.008, unidade: 'kg' },
      { item: 'Ovos (empanamento)', fatorPorUnidade: 0.1, unidade: 'un' },
    ],
  },
  Empada: {
    massa: [
      { item: 'Farinha de trigo', fator: 0.55, unidade: 'kg' },
      { item: 'Manteiga', fator: 0.25, unidade: 'kg' },
      { item: 'Ovos', fator: 0.15, unidade: 'kg' },
      { item: 'Sal', fator: 0.01, unidade: 'kg' },
    ],
    recheio: [
      { item: 'Frango desfiado', fator: 0.60, unidade: 'kg' },
      { item: 'Palmito picado', fator: 0.25, unidade: 'kg' },
      { item: 'Molho branco', fator: 0.15, unidade: 'kg' },
    ],
    outros: [],
  },
  Bolinha: {
    massa: [
      { item: 'Batata cozida', fator: 0.65, unidade: 'kg' },
      { item: 'Farinha de trigo', fator: 0.20, unidade: 'kg' },
      { item: 'Queijo ralado', fator: 0.10, unidade: 'kg' },
      { item: 'Sal', fator: 0.01, unidade: 'kg' },
    ],
    recheio: [
      { item: 'Queijo muçarela', fator: 0.80, unidade: 'kg' },
      { item: 'Presunto', fator: 0.20, unidade: 'kg' },
    ],
    outros: [
      { item: 'Óleo para fritura', fatorPorUnidade: 0.005, unidade: 'L' },
      { item: 'Farinha de rosca (empanamento)', fatorPorUnidade: 0.006, unidade: 'kg' },
    ],
  },
}

function formatarQtd(valor, unidade) {
  if (unidade === 'un') return `${Math.ceil(valor)} unidades`
  if (unidade === 'L') return `${valor.toFixed(1)} L`
  if (valor < 1) return `${Math.round(valor * 1000)}g`
  return `${valor.toFixed(2).replace(/\.?0+$/, '')} kg`
}

export default function ListaCompras() {
  const { state } = useLocation()
  const navigate = useNavigate()
  const [marcados, setMarcados] = useState({})

  if (!state?.form) {
    navigate('/calculadora')
    return null
  }

  const { form } = state
  const res = calcularProducao(form)
  const base = ingredientesPorTipo[form.tipoSalgado] || ingredientesPorTipo.Coxinha

  const totalMassaKg = res.totalMassa
  const totalRecheioKg = res.totalRecheio
  const qtdUnidades = form.quantidade

  const itensMassa = base.massa.map((i) => ({
    ...i,
    qtd: totalMassaKg * i.fator,
    categoria: 'Massa',
  }))

  const itensRecheio = base.recheio.map((i) => ({
    ...i,
    qtd: totalRecheioKg * i.fator,
    categoria: 'Recheio',
  }))

  const itensOutros = (base.outros || []).map((i) => ({
    ...i,
    qtd: qtdUnidades * i.fatorPorUnidade,
    categoria: 'Extras',
  }))

  const todos = [...itensMassa, ...itensRecheio, ...itensOutros]

  function toggleMarcado(idx) {
    setMarcados((m) => ({ ...m, [idx]: !m[idx] }))
  }

  function compartilhar() {
    const texto = [
      `🛒 Lista de compras — ${form.quantidade} ${form.tipoSalgado}s`,
      `📦 Total: ${formatarKg(res.pesoTotal)}`,
      '',
      ...todos.map((i, idx) => `${marcados[idx] ? '✅' : '⬜'} ${i.item}: ${formatarQtd(i.qtd, i.unidade)}`),
      '',
      'Gerado pelo Salgadeiro Pro',
    ].join('\n')

    if (navigator.share) {
      navigator.share({ title: 'Lista de Compras', text: texto }).catch(() => {})
    } else {
      navigator.clipboard.writeText(texto).catch(() => {})
      alert('Lista copiada!')
    }
  }

  const categorias = ['Massa', 'Recheio', 'Extras']

  return (
    <PageLayout titulo="Lista de Compras" voltar>
      <div className="px-4 pt-5 pb-6">
        {/* Header */}
        <div
          className="rounded-2xl p-4 mb-5 flex items-center gap-4"
          style={{ background: `linear-gradient(135deg, ${NAVY} 0%, #1a3055 100%)` }}
        >
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: 'rgba(201,147,42,0.2)', border: '1px solid rgba(201,147,42,0.3)' }}
          >
            <ShoppingCart size={22} color={GOLD} />
          </div>
          <div>
            <p className="font-bold text-base text-white">
              {form.quantidade.toLocaleString()} {form.tipoSalgado}s
            </p>
            <p className="text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>
              Peso total: {formatarKg(res.pesoTotal)} · {form.pesoUnitario}g/un
            </p>
          </div>
        </div>

        {/* Itens por categoria */}
        {categorias.map((cat) => {
          const itens = todos.filter((i) => i.categoria === cat)
          if (itens.length === 0) return null
          const idxBase = todos.indexOf(itens[0])
          return (
            <div key={cat} className="mb-5">
              <p className="font-bold text-sm mb-2" style={{ color: GOLD }}>
                {cat === 'Massa' ? '🌾 Massa' : cat === 'Recheio' ? '🍗 Recheio' : '🧴 Extras'}
              </p>
              <div
                className="rounded-2xl overflow-hidden divide-y"
                style={{ backgroundColor: '#FFFFFF', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', border: '1px solid #F0F0F0', borderColor: '#F0F0F0' }}
              >
                {itens.map((item, i) => {
                  const idx = idxBase + i
                  const marcado = !!marcados[idx]
                  return (
                    <button
                      key={idx}
                      onClick={() => toggleMarcado(idx)}
                      className="w-full flex items-center gap-3 px-4 py-3.5 text-left transition-all"
                      style={{ backgroundColor: marcado ? '#F0FDF4' : '#FFFFFF' }}
                    >
                      <div
                        className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-all"
                        style={{
                          backgroundColor: marcado ? '#15803D' : 'transparent',
                          border: marcado ? 'none' : '2px solid #E5E5E5',
                        }}
                      >
                        {marcado && <Check size={13} color="#fff" strokeWidth={3} />}
                      </div>
                      <p className="flex-1 text-sm font-medium" style={{ color: marcado ? '#9CA3AF' : '#1A1A1A', textDecoration: marcado ? 'line-through' : 'none' }}>
                        {item.item}
                      </p>
                      <p className="text-sm font-bold flex-shrink-0" style={{ color: marcado ? '#9CA3AF' : GOLD }}>
                        {formatarQtd(item.qtd, item.unidade)}
                      </p>
                    </button>
                  )
                })}
              </div>
            </div>
          )
        })}

        {/* Progresso */}
        {Object.values(marcados).some(Boolean) && (
          <div className="mb-5 p-4 rounded-2xl" style={{ backgroundColor: '#F0FDF4', border: '1px solid #BBF7D0' }}>
            <p className="text-sm font-bold" style={{ color: '#15803D' }}>
              {Object.values(marcados).filter(Boolean).length} de {todos.length} itens comprados
            </p>
            <div className="mt-2 h-2 rounded-full" style={{ backgroundColor: '#D1FAE5' }}>
              <div
                className="h-full rounded-full transition-all"
                style={{ backgroundColor: '#15803D', width: `${(Object.values(marcados).filter(Boolean).length / todos.length) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Botões */}
        <button
          onClick={compartilhar}
          className="w-full py-4 rounded-2xl font-bold text-base flex items-center justify-center gap-2"
          style={{ backgroundColor: GOLD, color: '#fff' }}
        >
          <Share2 size={16} />
          Compartilhar lista
        </button>

        <button
          onClick={() => navigate('/calculadora/resultado', { state: { form } })}
          className="w-full py-3 mt-3 rounded-xl font-medium text-sm"
          style={{ color: '#9CA3AF' }}
        >
          ← Voltar ao resultado
        </button>
      </div>
    </PageLayout>
  )
}
