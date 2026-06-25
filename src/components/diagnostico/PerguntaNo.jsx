const GOLD = '#C9932A'

export default function PerguntaNo({ no, onAvancar, onVoltar, podeVoltar, progresso }) {
  return (
    <div className="px-4 pt-4">
      {/* Barra de progresso */}
      <div className="mb-5">
        <div
          className="w-full rounded-full overflow-hidden"
          style={{ height: 4, backgroundColor: '#E5E5E5' }}
        >
          <div
            className="h-full rounded-full transition-all duration-300"
            style={{ width: `${Math.round(progresso * 100)}%`, backgroundColor: GOLD }}
          />
        </div>
        <p className="text-xs mt-1.5" style={{ color: '#9CA3AF' }}>
          Respondendo diagnóstico...
        </p>
      </div>

      {/* Pergunta */}
      <p className="font-bold text-lg mb-5 leading-snug" style={{ color: '#1A1A1A' }}>
        {no.pergunta}
      </p>

      {/* Opções */}
      <div className="space-y-3">
        {no.opcoes.map((op) => (
          <button
            key={op.proximo}
            onClick={() => onAvancar(op.proximo)}
            className="w-full text-left px-4 py-4 rounded-2xl font-medium text-sm active:scale-95 transition-all"
            style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #E5E5E5',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
              color: '#1A1A1A',
            }}
          >
            {op.texto}
          </button>
        ))}
      </div>

      {/* Voltar */}
      {podeVoltar && (
        <button
          onClick={onVoltar}
          className="mt-5 text-sm font-medium"
          style={{ color: '#9CA3AF' }}
        >
          ← Voltar para a pergunta anterior
        </button>
      )}
    </div>
  )
}
