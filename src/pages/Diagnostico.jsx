// src/pages/Diagnostico.jsx
import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import PageLayout from '../components/PageLayout'
import SeletorMaquina from '../components/diagnostico/SeletorMaquina'
import PerguntaNo from '../components/diagnostico/PerguntaNo'
import SolucaoCard from '../components/diagnostico/SolucaoCard'
import Biblioteca from '../components/diagnostico/Biblioteca'
import { diagnostico } from '../data/diagnostico'

const GOLD = '#C9932A'

export default function Diagnostico() {
  const [searchParams] = useSearchParams()
  const maquinaParamInicial = searchParams.get('maquina')

  const noAtualInicial = maquinaParamInicial
    ? (diagnostico.maquinas[maquinaParamInicial]?.arvore?.raiz ?? 'q_sintoma')
    : 'q_sintoma'

  const [maquinaId, setMaquinaId]     = useState(maquinaParamInicial)
  const [noAtual, setNoAtual]         = useState(noAtualInicial)
  const [historico, setHistorico]     = useState([])
  const [aba, setAba]                 = useState('diagnostico') // 'diagnostico' | 'biblioteca'
  const [filtroBiblioteca, setFiltro] = useState(null)          // string[] | null

  const maquinaData = maquinaId ? diagnostico.maquinas[maquinaId] : null
  const nos         = maquinaData?.arvore?.nos ?? {}
  const noData      = maquinaId ? nos[noAtual] : null

  // Cálculo de progresso (estimativa simples baseada no histórico)
  const progresso = Math.min(historico.length / 4, 0.9)

  function selecionarMaquina(id) {
    const raiz = diagnostico.maquinas[id]?.arvore?.raiz ?? 'q_sintoma'
    setMaquinaId(id)
    setNoAtual(raiz)
    setHistorico([])
  }

  function avancar(proximoNo) {
    setHistorico((h) => [...h, noAtual])
    setNoAtual(proximoNo)
  }

  function voltar() {
    const raiz = diagnostico.maquinas[maquinaId]?.arvore?.raiz ?? 'q_sintoma'
    const anterior = historico.at(-1) ?? raiz
    setHistorico((h) => h.slice(0, -1))
    setNoAtual(anterior)
  }

  function reiniciar() {
    setNoAtual('q_sintoma')
    setHistorico([])
    setMaquinaId(null)
    setFiltro(null)
    setAba('diagnostico')
  }

  function verBiblioteca(ids) {
    setFiltro(ids)
    setAba('biblioteca')
  }

  const isSolucao = noData && 'solucao' in noData

  return (
    <PageLayout titulo="Diagnóstico">
      {/* Tabs — só aparecem após selecionar máquina */}
      {maquinaId && (
        <div className="flex border-b" style={{ borderColor: '#E5E5E5' }}>
          {[
            { id: 'diagnostico', label: '🔧 Diagnóstico' },
            { id: 'biblioteca',  label: '📚 Biblioteca' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setAba(tab.id)}
              className="flex-1 py-3 text-sm font-semibold transition-colors"
              style={{
                color: aba === tab.id ? GOLD : '#9CA3AF',
                borderBottom: aba === tab.id ? `2px solid ${GOLD}` : '2px solid transparent',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      )}

      {/* Aba Diagnóstico */}
      {aba === 'diagnostico' && (
        <>
          {/* Estado 1: Sem máquina selecionada */}
          {!maquinaId && <SeletorMaquina onSelect={selecionarMaquina} />}

          {/* Estado 2: Pergunta */}
          {maquinaId && noData && !isSolucao && (
            <PerguntaNo
              no={noData}
              onAvancar={avancar}
              onVoltar={voltar}
              podeVoltar={historico.length > 0}
              progresso={progresso}
            />
          )}

          {/* Estado 3: Solução */}
          {maquinaId && noData && isSolucao && (
            <SolucaoCard
              solucao={noData.solucao}
              onReiniciar={reiniciar}
              onVerBiblioteca={verBiblioteca}
            />
          )}

          {/* Máquina selecionada mas nó não encontrado (erro de dados) */}
          {maquinaId && !noData && (
            <div className="px-4 pt-8 flex flex-col items-center gap-3">
              <span style={{ fontSize: 40 }}>⚠️</span>
              <p className="text-sm text-center" style={{ color: '#9CA3AF' }}>
                Nó não encontrado. Reinicie o diagnóstico.
              </p>
              <button
                onClick={reiniciar}
                className="px-6 py-3 rounded-xl font-bold text-sm"
                style={{ backgroundColor: GOLD, color: '#FFFFFF' }}
              >
                Reiniciar
              </button>
            </div>
          )}
        </>
      )}

      {/* Aba Biblioteca */}
      {aba === 'biblioteca' && (
        <Biblioteca
          maquinaId={maquinaId}
          filtroIds={filtroBiblioteca}
          onLimparFiltro={() => setFiltro(null)}
        />
      )}
    </PageLayout>
  )
}
