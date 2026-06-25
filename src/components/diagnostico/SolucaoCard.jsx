const GOLD = '#C9932A'

export default function SolucaoCard({ solucao, onReiniciar, onVerBiblioteca }) {
  return (
    <div className="px-4 pt-4 space-y-4">
      {/* Badge de conclusão */}
      <div
        className="flex items-center gap-2 px-4 py-2.5 rounded-2xl"
        style={{ backgroundColor: '#F0FDF4', border: '1px solid #BBF7D0' }}
      >
        <span style={{ fontSize: 20 }}>✅</span>
        <p className="font-bold text-sm" style={{ color: '#15803D' }}>Diagnóstico concluído</p>
      </div>

      {/* Título da solução */}
      <div
        className="p-4 rounded-2xl"
        style={{ backgroundColor: '#FFFFFF', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', border: '1px solid #F0F0F0' }}
      >
        <p className="font-bold text-base mb-4" style={{ color: '#1A1A1A' }}>
          {solucao.titulo}
        </p>

        {/* Passos numerados */}
        <div className="space-y-3">
          {solucao.passos.map((passo, i) => (
            <div key={i} className="flex gap-3">
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{ backgroundColor: GOLD }}
              >
                <span className="text-xs font-bold text-white">{i + 1}</span>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: '#666666' }}>{passo}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Alerta crítico (opcional) */}
      {solucao.alerta && (
        <div
          className="px-4 py-3 rounded-2xl"
          style={{ backgroundColor: 'rgba(220,38,38,0.06)', border: '1px solid rgba(220,38,38,0.25)' }}
        >
          <p className="text-sm font-medium" style={{ color: '#DC2626' }}>{solucao.alerta}</p>
        </div>
      )}

      {/* Link para Biblioteca */}
      {solucao.biblioteca?.length > 0 && (
        <button
          onClick={() => onVerBiblioteca(solucao.biblioteca)}
          className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl font-semibold text-sm"
          style={{
            backgroundColor: '#FFFFFF',
            border: `1.5px solid ${GOLD}`,
            color: GOLD,
          }}
        >
          📚 Ver artigos relacionados
        </button>
      )}

      {/* Reiniciar */}
      <button
        onClick={onReiniciar}
        className="w-full py-3.5 rounded-2xl font-semibold text-sm"
        style={{ backgroundColor: GOLD, color: '#FFFFFF' }}
      >
        Novo diagnóstico
      </button>
    </div>
  )
}
