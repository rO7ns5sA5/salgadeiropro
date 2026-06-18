import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Play, CheckCircle, Clock, ChevronRight, Award } from 'lucide-react'
import PageLayout from '../components/PageLayout'
import { treinamentos } from '../data/treinamentos'

const categorias = ['Todos', 'Iniciante', 'Intermediário', 'Avançado', 'Compacta Print', 'Operações']

const statusConfig = {
  em_andamento: { label: 'Em andamento', cor: '#F59E0B', bg: '#FEF3C7' },
  nao_iniciado: { label: 'Não iniciado', cor: '#9CA3AF', bg: '#F3F4F6' },
  concluido:    { label: 'Concluído',    cor: '#15803D', bg: '#DCFCE7' },
}

function BarraProgresso({ pct }) {
  return (
    <div className="w-full rounded-full overflow-hidden" style={{ height: 6, backgroundColor: '#E5E5E5' }}>
      <div
        className="h-full rounded-full transition-all"
        style={{
          width: `${pct}%`,
          backgroundColor: pct === 100 ? '#15803D' : '#F59E0B',
        }}
      />
    </div>
  )
}

export default function Treinamentos() {
  const navigate = useNavigate()
  const [filtro, setFiltro] = useState('Todos')

  const lista = treinamentos.filter(
    (t) => filtro === 'Todos' || t.categoria === filtro
  )

  const emAndamento = treinamentos.find((t) => t.status === 'em_andamento')
  const proximaAula = emAndamento?.aulas.find((a) => !a.concluida)

  const totalConcluidos = treinamentos.filter((t) => t.status === 'concluido').length

  return (
    <PageLayout titulo="Treinamentos">
      {/* Banner Training Center */}
      <div
        className="mx-4 mt-4 p-4 rounded-xl"
        style={{
          background: 'linear-gradient(135deg, #2C1A0E 0%, #4a2d1a 100%)',
          borderRadius: 12,
          borderLeft: '4px solid #C49A2A',
        }}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-bold tracking-widest uppercase" style={{ color: '#C49A2A' }}>
              SalgadeiroPro
            </p>
            <p className="font-bold text-lg text-white mt-0.5">Training Center</p>
            <p className="text-xs mt-0.5" style={{ color: '#9CA3AF' }}>
              A Engenharia do Sabor — Formação Profissional
            </p>
          </div>
          <div className="flex flex-col items-center">
            <Award size={32} color="#C49A2A" />
            <p className="text-xs font-bold mt-1" style={{ color: '#C49A2A' }}>
              {totalConcluidos}/{treinamentos.length}
            </p>
          </div>
        </div>
      </div>

      {/* Continuar curso ativo */}
      {emAndamento && proximaAula && (
        <div className="px-4 mt-4">
          <p className="text-xs font-bold uppercase tracking-wide mb-2" style={{ color: '#6B7280' }}>
            Continuar de onde parou
          </p>
          <button
            className="w-full flex items-center gap-3 p-4 rounded-xl text-left"
            style={{
              backgroundColor: '#FFFFFF',
              border: '2px solid #F59E0B',
              borderRadius: 12,
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            }}
          >
            <div
              className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0"
            >
              <img src={emAndamento.imagem} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs" style={{ color: '#9CA3AF' }}>{emAndamento.titulo}</p>
              <p className="font-bold text-sm mt-0.5 truncate" style={{ color: '#1A1A1A' }}>
                Aula {proximaAula.numero}: {proximaAula.titulo}
              </p>
              <div className="mt-2">
                <BarraProgresso pct={emAndamento.progresso} />
                <p className="text-xs mt-1" style={{ color: '#F59E0B' }}>
                  {emAndamento.progresso}% concluído
                </p>
              </div>
            </div>
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: '#F59E0B' }}
            >
              <Play size={18} color="#FFFFFF" fill="#FFFFFF" />
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
                  backgroundColor: ativo ? '#2C1A0E' : '#FFFFFF',
                  color: ativo ? '#C49A2A' : '#6B7280',
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
              className="rounded-xl overflow-hidden"
              style={{
                backgroundColor: '#FFFFFF',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                borderRadius: 12,
                border: curso.status === 'em_andamento' ? '1.5px solid #F59E0B' : '1px solid #F0F0F0',
              }}
            >
              <div className="flex gap-3 p-3">
                {/* Thumbnail */}
                <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                  <img
                    src={curso.imagem}
                    alt={curso.titulo}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className="text-xs font-bold px-2 py-0.5 rounded-full"
                      style={{ backgroundColor: st.bg, color: st.cor }}
                    >
                      {st.label}
                    </span>
                    <span
                      className="text-xs px-2 py-0.5 rounded-full"
                      style={{ backgroundColor: '#F5F0E8', color: '#6B7280' }}
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

                {/* Ícone status */}
                <div className="flex-shrink-0 flex items-start pt-1">
                  {curso.status === 'concluido' ? (
                    <CheckCircle size={20} color="#15803D" />
                  ) : (
                    <ChevronRight size={20} color="#9CA3AF" />
                  )}
                </div>
              </div>

              {/* Barra de progresso */}
              <div className="px-3 pb-2">
                <div className="flex justify-between items-center mb-1">
                  <p className="text-xs" style={{ color: '#9CA3AF' }}>
                    Progresso: {curso.progresso}%
                  </p>
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
                    className="w-full py-2.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2"
                    style={{
                      backgroundColor: curso.status === 'em_andamento' ? '#F59E0B' : '#2C1A0E',
                      color: '#FFFFFF',
                    }}
                  >
                    <Play size={14} fill="currentColor" />
                    {curso.status === 'em_andamento' && proxAula
                      ? `Continuar — Aula ${proxAula.numero}: ${proxAula.titulo.slice(0, 28)}...`
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
