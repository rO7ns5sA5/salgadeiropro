// src/components/diagnostico/SeletorMaquina.jsx
import { diagnostico } from '../../data/diagnostico'

const GOLD = '#C9932A'

export default function SeletorMaquina({ onSelect }) {
  const maquinas = Object.entries(diagnostico.maquinas)

  return (
    <div className="px-4 pt-4">
      <p className="font-bold text-xl mb-1" style={{ color: '#1A1A1A' }}>
        Qual é a sua máquina?
      </p>
      <p className="text-sm mb-5" style={{ color: '#9CA3AF' }}>
        Selecione para ver diagnósticos específicos do seu modelo
      </p>
      <div className="grid grid-cols-2 gap-3">
        {maquinas.map(([id, m]) => (
          <button
            key={id}
            onClick={() => onSelect(id)}
            className="flex flex-col items-start p-4 rounded-2xl text-left active:scale-95 transition-transform"
            style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #E5E5E5',
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            }}
          >
            <span style={{ fontSize: 28 }}>{m.emoji}</span>
            <p className="font-bold text-sm mt-2" style={{ color: '#1A1A1A' }}>{m.nome}</p>
            <p className="text-xs mt-0.5" style={{ color: '#9CA3AF' }}>Compacta Print</p>
          </button>
        ))}
      </div>
    </div>
  )
}
