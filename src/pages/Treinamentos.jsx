import { useState } from 'react'
import { Play, CheckCircle, Clock, ChevronRight, Award } from 'lucide-react'
import PageLayout from '../components/PageLayout'
import { treinamentos } from '../data/treinamentos'

const GOLD = '#C9932A'

// Thumbnails sem imagens externas — emoji + gradiente por categoria
const thumbConfig = {
  'Iniciante':       { emoji: '🥟', bg: 'linear-gradient(135deg, #FEF8EC, #fde8b4)' },
  'Intermediário':   { emoji: '🍗', bg: 'linear-gradient(135deg, #FEF8EC, #fdd3a0)' },
  'Avançado':        { emoji: '📊', bg: 'linear-gradient(135deg, #EFF6FF, #bfdbfe)' },
  'Compacta Print':  { emoji: '⚙️', bg: 'linear-gradient(135deg, #F0F9FF, #bae6fd)' },
  'Operações':       { emoji: '❄️', bg: 'linear-gradient(135deg, #F0FDF4, #bbf7d0)' },
}

const statusConfig = {
  em_andamento: { label: 'Em andamento', cor: GOLD,      bg: '#FEF8EC' },
  nao_iniciado: { label: 'Não iniciado', cor: '#9CA3AF', bg: '#F5F5F5' },
  concluido:    { label: 'Concluído',    cor: '#15803D', bg: '#DCFCE7' },
}

const categorias = ['Todos', 'Iniciante', 'Intermediário', 'Avançado', 'Compacta Print', 'Operações']

function BarraProgresso({ pct }) {
  return (
    <div className="w-full rounded-full overflow-hidden" style={{ height: 5, backgroundColor: '#E5E5E5' }}>
      <div
        className="h-full rounded-full"
        style={{ width: `${pct}%`, backgroundColor: pct === 100 ? '#15803D' : GOLD }}
      />
    </div>
  )
}

function Thumbnail({ categoria, size = 64 }) {
  const cfg = thumbConfig[categoria] ?? { emoji: '📚', bg: 'linear-gradient(135deg, #F5F5F5, #E5E5E5)' }
  return (
    <div
      className="flex-shrink-0 flex items-center justify-center rounded-xl"
      style={{ width: size, height: size, background: cfg.bg }}
    >
      <span style={{ fontSize: size * 0.44 }}>{cfg.emoji}</span>
    </div>
  )
}

export default function Treinamentos() {
  const [filtro, setFiltro] = useState('Todos')

  const lista = treinamentos.filter((t) => filtro === 'Todos' || t.categoria === filtro)
  const emAndamento  = treinamentos.find((t) => t.status === 'em_andamento')
  const proximaAula  = emAndamento?.aulas.find((a) => !a.concluida)
  const totalConcluidos = treinamentos.filter((t) => t.status === 'concluido').length

  return (
    <PageLayout titulo="Treinamentos">
      {/* Banner Training Center */}
      <div
        className="mx-4 mt-4 p-4 rounded-2xl"
        style={{
          background: 'linear-gradient(135deg, #0B1729 0%, #1a3055 100%)',
          borderLeft: `4px solid ${GOLD}`,
        }}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-bold tracking-widest uppercase" style={{ color: GOLD }}>
              Salgadeiro Pro
            </p>
            <p className="font-bold text-lg text-white mt-0.5">Training Center</p>
            <p className="text-xs mt-0.5" style={{ color: '#9CA3AF' }}>
              A Engenharia do Sabor — Formação Profissional
            </p>
          </div>
          <div className="flex flex-col items-center">
            <Award size={30} color={GOLD} />
            <p className="text-xs font-bold mt-1" style={{ color: GOLD }}>
              {totalConcluidos}/{treinamentos.length}
            </p>
          </div>
        </div>
      </div>

      {/* Continuar de onde parou */}
      {emAndamento && proximaAula && (
        <div className="px-4 mt-4">
          <p className="text-xs font-bold uppercase tracking-wide mb-2" style={{ color: '#9CA3AF' }}>
            Continuar de onde parou
          </p>
          <button
            className="w-full flex items-center gap-3 p-4 rounded-2xl text-left"
            style={{
              backgroundColor: '#FFFFFF',
              border: `2px solid ${GOLD}`,
              boxShadow: '0 2px 8px rgba(201,147,42,0.12)',
            }}
          >
            <Thumbnail categoria={emAndamento.categoria} size={52} />
            <div className="flex-1 min-w-0">
              <p className="text-xs" style={{ color: '#9CA3AF' }}>{emAndamento.titulo}</p>
              <p className="font-bold text-sm mt-0.5 truncate" style={{ color: '#1A1A1A' }}>
                Aula {proximaAula.numero}: {proximaAula.titulo}
              </p>
              <div className="mt-2">
                <BarraProgresso pct={emAndamento.progresso} />
                <p className="text-xs mt-1 font-medium" style={{ color: GOLD }}>
                  {emAndamento.progresso}% concluído
                </p>
              </div>
            </div>
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: GOLD }}
            >
              <Play size={16} color="#FFFFFF" fill="#FFFFFF" />
            </div>
          </button>
        </div>
      )}

      {/* Filtros */}
      <div className="px-4 mt-4">
        <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
          {categorias.map((cat) => {
            const ativo = filtro === cat
            return (
              <button
                key={cat}
                onClick={() => setFiltro(cat)}
                className="flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium"
                style={{
                  backgroundColor: ativo ? GOLD : '#FFFFFF',
                  color: ativo ? '#FFFFFF' : '#666666',
                  border: ativo ? 'none' : '1px solid #E5E5E5',
                }}
              >
                {cat}
              </button>
            )
          })}
        </div>
      </div>

      {/* Lista de cursos */}
      <div className="px-4 mt-3 space-y-3 pb-4">
        {lista.map((curso) => {
          const st = statusConfig[curso.status]
          const proxAula = curso.aulas.find((a) => !a.concluida)

          return (
            <div
              key={curso.id}
              className="rounded-2xl overflow-hidden"
              style={{
                backgroundColor: '#FFFFFF',
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                border: curso.status === 'em_andamento'
                  ? `1.5px solid ${GOLD}`
                  : '1px solid #F0F0F0',
              }}
            >
              <div className="flex gap-3 p-3">
                <Thumbnail categoria={curso.categoria} size={64} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span
                      className="text-xs font-bold px-2 py-0.5 rounded-full"
                      style={{ backgroundColor: st.bg, color: st.cor }}
                    >
                      {st.label}
                    </span>
                    <span
                      className="text-xs px-2 py-0.5 rounded-full"
                      style={{ backgroundColor: '#F5F5F5', color: '#666666' }}
                    >
                      {curso.categoria}
                    </span>
                  </div>
                  <p className="font-bold text-sm leading-tight" style={{ color: '#1A1A1A' }}>
                    {curso.titulo}
                  </p>
                  <div className="flex items-center gap-1 mt-1">
                    <Clock size={11} color="#9CA3AF" />
                    <p className="text-xs" style={{ color: '#9CA3AF' }}>
                      {curso.duracao} min · {curso.aulas.length} aulas
                    </p>
                  </div>
                </div>
                <div className="flex-shrink-0 flex items-start pt-1">
                  {curso.status === 'concluido'
                    ? <CheckCircle size={20} color="#15803D" />
                    : <ChevronRight size={20} color="#9CA3AF" />
                  }
                </div>
              </div>

              {/* Progresso */}
              <div className="px-3 pb-2">
                <div className="flex justify-between items-center mb-1">
                  <p className="text-xs" style={{ color: '#9CA3AF' }}>Progresso: {curso.progresso}%</p>
                  <p className="text-xs" style={{ color: '#9CA3AF' }}>
                    {curso.aulas.filter((a) => a.concluida).length}/{curso.aulas.length} aulas
                  </p>
                </div>
                <BarraProgresso pct={curso.progresso} />
              </div>

              {/* CTA */}
              {curso.status !== 'concluido' && (
                <div className="px-3 pb-3">
                  <button
                    className="w-full py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2"
                    style={{
                      backgroundColor: curso.status === 'em_andamento' ? GOLD : '#0B1729',
                      color: '#FFFFFF',
                    }}
                  >
                    <Play size={13} fill="currentColor" />
                    {curso.status === 'em_andamento' && proxAula
                      ? `Continuar — Aula ${proxAula.numero}`
                      : 'Começar curso'}
                  </button>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </PageLayout>
  )
}
