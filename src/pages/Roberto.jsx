import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Send, Mic, Bot, CheckCircle, Cpu } from 'lucide-react'
import { perguntarRoberto } from '../lib/claude'
import BottomNav from '../components/BottomNav'

const QUICK_REPLIES = [
  'Minha coxinha está rachando',
  'Como regular o bico da minha máquina',
  'Qual proporção de massa para kibe',
  'Como congelar sem rachadura',
  'Problema com o recheio vazando',
  'Qual bico usar para bolinha',
  'Massa quebrando na máquina',
  'Diferença entre Pop 4.0 e Black Inox',
]

const MSG_BOAS_VINDAS = {
  id: 'boas-vindas',
  role: 'assistant',
  content: 'Olá! Sou o Roberto, especialista técnico da Compacta Print com mais de 20 anos de experiência. Posso te ajudar com regulagem de máquinas, receitas, problemas de produção e muito mais. O que você precisa hoje?',
  fonte: 'ia',
  hora: new Date(),
}

function formatarHora(data) {
  return data.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
}

function BubbleIA({ msg }) {
  return (
    <div className="flex gap-2 items-end max-w-[85%]">
      {/* Avatar */}
      <div
        className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mb-4"
        style={{ backgroundColor: '#1a3a5c', border: '1px solid rgba(196,154,42,0.3)' }}
      >
        <Bot size={16} color="#C49A2A" />
      </div>
      <div>
        <div
          className="px-4 py-3 rounded-2xl rounded-bl-sm text-sm leading-relaxed"
          style={{ backgroundColor: '#E8F0FE', color: '#1A1A1A' }}
        >
          {msg.content}
        </div>
        <div className="flex items-center gap-1.5 mt-1 ml-1">
          {msg.fonte === 'cache' ? (
            <>
              <CheckCircle size={11} color="#15803D" />
              <span className="text-xs" style={{ color: '#15803D' }}>Revisado por Roberto</span>
            </>
          ) : msg.fonte === 'ia' ? (
            <>
              <Cpu size={11} color="#6B7280" />
              <span className="text-xs" style={{ color: '#9CA3AF' }}>Respondido por IA</span>
            </>
          ) : (
            <span className="text-xs" style={{ color: '#EF4444' }}>Erro de conexão</span>
          )}
          <span className="text-xs" style={{ color: '#D1D5DB' }}>· {formatarHora(msg.hora)}</span>
        </div>
      </div>
    </div>
  )
}

function BubbleUser({ msg }) {
  return (
    <div className="flex justify-end">
      <div className="max-w-[80%]">
        <div
          className="px-4 py-3 rounded-2xl rounded-br-sm text-sm leading-relaxed"
          style={{ backgroundColor: '#C49A2A', color: '#FFFFFF' }}
        >
          {msg.content}
        </div>
        <p className="text-xs mt-1 text-right" style={{ color: '#9CA3AF' }}>
          {formatarHora(msg.hora)}
        </p>
      </div>
    </div>
  )
}

function TypingIndicator() {
  return (
    <div className="flex gap-2 items-end">
      <div
        className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: '#1a3a5c', border: '1px solid rgba(196,154,42,0.3)' }}
      >
        <Bot size={16} color="#C49A2A" />
      </div>
      <div
        className="px-4 py-3 rounded-2xl rounded-bl-sm"
        style={{ backgroundColor: '#E8F0FE' }}
      >
        <div className="flex gap-1 items-center h-4">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full"
              style={{
                backgroundColor: '#9CA3AF',
                animation: `bounce 1.2s ease-in-out ${i * 0.2}s infinite`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Roberto() {
  const navigate = useNavigate()
  const [mensagens, setMensagens] = useState([MSG_BOAS_VINDAS])
  const [input, setInput] = useState('')
  const [carregando, setCarregando] = useState(false)
  const scrollRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [mensagens, carregando])

  const enviar = async (texto) => {
    const pergunta = texto.trim()
    if (!pergunta || carregando) return

    const msgUser = { id: Date.now(), role: 'user', content: pergunta, hora: new Date() }
    setMensagens((prev) => [...prev, msgUser])
    setInput('')
    setCarregando(true)

    // Monta histórico sem a mensagem de boas-vindas
    const historico = mensagens
      .filter((m) => m.id !== 'boas-vindas')
      .map((m) => ({ role: m.role, content: m.content }))

    try {
      const { resposta, fonte } = await perguntarRoberto(pergunta, historico)
      const msgIA = {
        id: Date.now() + 1,
        role: 'assistant',
        content: resposta,
        fonte,
        hora: new Date(),
      }
      setMensagens((prev) => [...prev, msgIA])
    } finally {
      setCarregando(false)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    enviar(input)
  }

  return (
    <div className="flex flex-col min-h-svh" style={{ backgroundColor: '#F5F0E8' }}>
      {/* Header navy */}
      <header
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4"
        style={{ backgroundColor: '#2C1A0E', height: 56, maxWidth: 480, margin: '0 auto' }}
      >
        <button onClick={() => navigate(-1)} className="w-8 h-8 flex items-center justify-center">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
        </button>
        <div className="text-center">
          <p className="font-bold text-sm text-white">Roberto — Especialista</p>
          <p className="text-xs" style={{ color: '#C49A2A' }}>Compacta Print · Online</p>
        </div>
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center"
          style={{ backgroundColor: 'rgba(196,154,42,0.2)', border: '1px solid rgba(196,154,42,0.4)' }}
        >
          <Bot size={18} color="#C49A2A" />
        </div>
      </header>

      {/* Área de mensagens */}
      <main
        className="flex-1 overflow-y-auto px-4 py-3 space-y-3"
        style={{ paddingTop: 72, paddingBottom: 180 }}
      >
        {mensagens.map((msg) =>
          msg.role === 'assistant'
            ? <BubbleIA key={msg.id} msg={msg} />
            : <BubbleUser key={msg.id} msg={msg} />
        )}

        {carregando && <TypingIndicator />}

        <div ref={scrollRef} />
      </main>

      {/* Área fixa inferior */}
      <div
        className="fixed bottom-0 left-0 right-0 z-40"
        style={{ maxWidth: 480, margin: '0 auto', backgroundColor: '#FFFFFF', borderTop: '1px solid #E5E5E5' }}
      >
        {/* Quick replies */}
        <div
          className="flex gap-2 px-3 py-2 overflow-x-auto"
          style={{ scrollbarWidth: 'none' }}
        >
          {QUICK_REPLIES.map((qr) => (
            <button
              key={qr}
              onClick={() => enviar(qr)}
              disabled={carregando}
              className="flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all"
              style={{
                border: '1.5px solid #C49A2A',
                color: '#2C1A0E',
                backgroundColor: 'transparent',
                opacity: carregando ? 0.5 : 1,
              }}
            >
              {qr}
            </button>
          ))}
        </div>

        {/* Input */}
        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-2 px-3 pb-3"
        >
          <div
            className="flex-1 flex items-center gap-2 px-4 rounded-2xl"
            style={{ backgroundColor: '#F5F0E8', border: '1px solid #E5E5E5', height: 48 }}
          >
            <input
              ref={inputRef}
              type="text"
              placeholder="Digite sua pergunta..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={carregando}
              className="flex-1 bg-transparent outline-none text-sm"
              style={{ color: '#1A1A1A' }}
            />
            <button type="button" className="flex-shrink-0">
              <Mic size={18} color="#9CA3AF" />
            </button>
          </div>
          <button
            type="submit"
            disabled={!input.trim() || carregando}
            className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 transition-opacity"
            style={{
              backgroundColor: '#2C1A0E',
              opacity: !input.trim() || carregando ? 0.5 : 1,
            }}
          >
            <Send size={18} color="#C49A2A" />
          </button>
        </form>

        {/* Espaço para bottom nav */}
        <div style={{ height: 64 }} />
      </div>

      <BottomNav />

      <style>{`
        @keyframes bounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-6px); }
        }
      `}</style>
    </div>
  )
}
