import { useState, useRef, useEffect } from 'react'
import { Send } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { receitas } from '../../data/receitas'
import { maquinas } from '../../data/maquinas'
import { useEspecialista } from './useEspecialista'
import BottomNav from '../../components/BottomNav'

const SUGESTOES = [
  'Qual a hidratação ideal para coxinha?',
  'Como congelar salgados sem perder qualidade?',
  'Temperatura do óleo para fritar croquete',
  'Por que o salgado está abrindo na fritura?',
  'Como empanar para ficar crocante?',
  'Recheio vazando na modelagem — o que fazer?',
  'Tempo de descanso da massa de risole',
  'Como ajustar o bico da modeladora?',
]

function TypingDots() {
  return (
    <div className="flex gap-2 items-end mb-3">
      <div
        className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ background: 'linear-gradient(135deg, #C9932A, #E8B84B)' }}
      >
        <span style={{ fontSize: 18 }}>🧑‍🍳</span>
      </div>
      <div
        className="px-4 py-3 rounded-2xl rounded-bl-sm"
        style={{ background: '#0F2040', border: '1px solid #1E3A5F' }}
      >
        <div className="flex gap-1 items-center h-4">
          {[0, 1, 2].map(i => (
            <div
              key={i}
              className="w-2 h-2 rounded-full"
              style={{
                background: '#C9932A',
                animation: `esp-bounce 1.2s ease-in-out ${i * 0.2}s infinite`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

function BubbleRoberto({ msg }) {
  return (
    <div className="flex gap-2 items-end mb-3 max-w-[88%]">
      <div
        className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mb-5"
        style={{ background: 'linear-gradient(135deg, #C9932A, #E8B84B)', flexShrink: 0 }}
      >
        <span style={{ fontSize: 18 }}>🧑‍🍳</span>
      </div>
      <div>
        <div
          className="px-4 py-3 rounded-2xl rounded-bl-sm text-sm leading-relaxed whitespace-pre-wrap"
          style={{ background: '#0F2040', border: '1px solid #1E3A5F', color: '#D0E8F5' }}
        >
          {msg.content}
        </div>
        {msg.fromCache && (
          <span className="text-xs mt-1 ml-1 block" style={{ color: '#4A7A9B' }}>
            🗃️ cache
          </span>
        )}
      </div>
    </div>
  )
}

function BubbleUser({ msg }) {
  return (
    <div className="flex justify-end mb-3">
      <div
        className="max-w-[80%] px-4 py-3 rounded-2xl rounded-br-sm text-sm leading-relaxed font-semibold"
        style={{ background: 'linear-gradient(135deg, #C9932A, #E8B84B)', color: '#0B1729' }}
      >
        {msg.content}
      </div>
    </div>
  )
}

export default function PergunteEspecialista({ maquinaUsuario = null }) {
  const navigate = useNavigate()
  const { messages, loading, enviar, limpar } = useEspecialista({ receitas, maquinas, maquinaUsuario })
  const [input, setInput] = useState('')
  const scrollRef = useRef(null)
  const textareaRef = useRef(null)
  const mostrarSugestoes = messages.length === 0

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      submit()
    }
  }

  function submit() {
    if (!input.trim() || loading) return
    enviar(input.trim())
    setInput('')
    textareaRef.current?.focus()
  }

  return (
    <div
      className="flex flex-col min-h-svh"
      style={{ backgroundColor: '#0B1729', maxWidth: 480, margin: '0 auto' }}
    >
      {/* Header */}
      <header
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4"
        style={{
          backgroundColor: '#0B1729',
          borderBottom: '1px solid #1E3A5F',
          height: 60,
          maxWidth: 480,
          margin: '0 auto',
        }}
      >
        <button
          onClick={() => navigate(-1)}
          className="w-8 h-8 flex items-center justify-center"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#D0E8F5" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
        </button>

        <div className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #C9932A, #E8B84B)' }}
          >
            <span style={{ fontSize: 16 }}>🧑‍🍳</span>
          </div>
          <div className="text-center">
            <p className="font-bold text-sm" style={{ color: '#D0E8F5' }}>Pergunte ao Especialista</p>
            <p className="text-xs" style={{ color: '#C9932A' }}>Roberto · Produção de Salgados</p>
          </div>
        </div>

        <button
          onClick={limpar}
          className="text-xs px-2 py-1 rounded"
          style={{ color: '#4A7A9B', border: '1px solid #1E3A5F' }}
        >
          Limpar
        </button>
      </header>

      {/* Mensagens */}
      <main
        className="flex-1 overflow-y-auto px-4 py-3"
        style={{ paddingTop: 72, paddingBottom: 200 }}
      >
        {mostrarSugestoes && (
          <div className="mb-4">
            <p className="text-xs mb-3 font-medium" style={{ color: '#4A7A9B' }}>
              Dúvidas frequentes — toque para perguntar:
            </p>
            <div className="flex flex-wrap gap-2">
              {SUGESTOES.map(s => (
                <button
                  key={s}
                  onClick={() => enviar(s)}
                  disabled={loading}
                  className="text-xs px-3 py-2 rounded-xl transition-opacity"
                  style={{
                    border: '1px solid #1E3A5F',
                    color: '#D0E8F5',
                    background: '#0F2040',
                    opacity: loading ? 0.5 : 1,
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map(msg =>
          msg.role === 'user'
            ? <BubbleUser key={msg.id} msg={msg} />
            : <BubbleRoberto key={msg.id} msg={msg} />
        )}

        {loading && <TypingDots />}
        <div ref={scrollRef} />
      </main>

      {/* Input fixo */}
      <div
        className="fixed bottom-0 left-0 right-0 z-40"
        style={{
          maxWidth: 480,
          margin: '0 auto',
          backgroundColor: '#0B1729',
          borderTop: '1px solid #1E3A5F',
        }}
      >
        <div className="flex items-end gap-2 px-3 pt-3 pb-2">
          <textarea
            ref={textareaRef}
            rows={1}
            placeholder="Digite sua dúvida técnica..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={loading}
            className="flex-1 resize-none rounded-2xl px-4 py-3 text-sm outline-none transition-colors"
            style={{
              background: '#0B1729',
              border: `1px solid ${input ? '#C9932A' : '#1E3A5F'}`,
              color: '#D0E8F5',
              maxHeight: 96,
              lineHeight: 1.5,
            }}
          />
          <button
            onClick={submit}
            disabled={!input.trim() || loading}
            className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all"
            style={{
              background: input.trim() && !loading
                ? 'linear-gradient(135deg, #C9932A, #E8B84B)'
                : '#1E3A5F',
              color: input.trim() && !loading ? '#0B1729' : '#3A5A7A',
            }}
          >
            <Send size={18} />
          </button>
        </div>
        <p className="text-center text-xs pb-2" style={{ color: '#1E3A5F' }}>
          Enter envia · Shift+Enter nova linha
        </p>
        <div style={{ height: 72 }} />
      </div>

      <BottomNav dark />

      <style>{`
        @keyframes esp-bounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-5px); }
        }
      `}</style>
    </div>
  )
}
