import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Camera, RefreshCw, ChevronRight, X } from 'lucide-react'
import PageLayout from '../components/PageLayout'

const GOLD = '#C9932A'
const NAVY = '#0B1729'

const MODOS = [
  {
    id: 'salgado',
    emoji: '🔍',
    titulo: 'Diagnosticar salgado',
    descricao: 'Foto do salgado rachado, queimado ou mal modelado',
    prompt: `Você é Roberto, especialista técnico da Compacta Print com 20+ anos de experiência. Analise esta foto de um salgado e identifique:
1. O problema visual (rachado, queimado, mal modelado, irregular, etc.)
2. A causa provável na máquina (pressão, temperatura, fluxo, bico)
3. Como corrigir: ajustes específicos no painel (massa, recheio, cortador, tempo)
4. Se for formato identificável, diga qual bico/mandíbula está sendo usado.
Seja direto e técnico. Responda em português brasileiro.
Assine como: Roberto — Especialista Compacta Print`,
  },
  {
    id: 'bico',
    emoji: '⚙️',
    titulo: 'Identificar bico',
    descricao: 'Foto da peça para saber o bico: coxinha, kibe, bolinha, risole, nhoque ou enroladinho',
    prompt: `Você é Roberto, especialista técnico da Compacta Print. Analise esta foto da peça/bico e identifique:
1. O tipo de bico:
   - Gota/teardrop = Coxinha
   - Oval horizontal = Kibe
   - Esférico = Bolinha
   - Retangular almofada = Risole travesseiro
   - Cilíndrico corte reto = Nhoque ou Enroladinho de salsicha
2. O formato do salgado que produz
3. A mandíbula correspondente
4. Máquinas Compacta Print compatíveis (Pop 4.0, Black Inox, Black Mix, Inox Supreme)
5. Configuração recomendada para este bico (massa, recheio, cortador)
Seja direto e técnico. Responda em português brasileiro.
Assine como: Roberto — Especialista Compacta Print`,
  },
  {
    id: 'painel',
    emoji: '📊',
    titulo: 'Corrigir painel',
    descricao: 'Foto do painel da máquina para análise da regulagem atual',
    prompt: `Você é Roberto, especialista técnico da Compacta Print. Analise esta foto do painel da máquina e:
1. Identifique o modelo da máquina se possível (Pop 4.0 = escala 0-100; Inox Supreme = escala 1-5; Black Inox/Mix = escala 0-100 com timer 10/20/30)
2. Leia as configurações atuais visíveis (massa, recheio, cortador, tempo/timer)
3. Avalie se a regulagem está correta para produção padrão
4. Sugira ajustes específicos se necessário, com os valores exatos para cada botão/dial
5. Alerte para qualquer configuração fora do ideal
Seja direto e técnico. Responda em português brasileiro.
Assine como: Roberto — Especialista Compacta Print`,
  },
]

async function analisarImagem(base64, mimeType, prompt) {
  const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY
  if (!apiKey) {
    return 'Roberto está offline. Configure a chave da API para ativar o diagnóstico visual.'
  }

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-6',
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: [
            { type: 'image', source: { type: 'base64', media_type: mimeType, data: base64 } },
            { type: 'text', text: prompt },
          ],
        },
      ],
    }),
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err?.error?.message || `HTTP ${res.status}`)
  }

  const data = await res.json()
  return data.content?.[0]?.text || 'Não consegui analisar a imagem.'
}

export default function Diagnostico() {
  const navigate = useNavigate()
  const [modo, setModo] = useState(null)
  const [foto, setFoto] = useState(null)
  const [fotoBase64, setFotoBase64] = useState(null)
  const [fotoMime, setFotoMime] = useState(null)
  const [loading, setLoading] = useState(false)
  const [resultado, setResultado] = useState(null)
  const [erro, setErro] = useState(null)
  const inputRef = useRef(null)

  function selecionarFoto(e) {
    const file = e.target.files?.[0]
    if (!file) return
    const url = URL.createObjectURL(file)
    setFoto(url)
    setResultado(null)
    setErro(null)

    const reader = new FileReader()
    reader.onload = (ev) => {
      const dataUrl = ev.target.result
      const base64 = dataUrl.split(',')[1]
      setFotoBase64(base64)
      setFotoMime(file.type || 'image/jpeg')
    }
    reader.readAsDataURL(file)
  }

  async function analisar() {
    if (!fotoBase64 || !modo) return
    setLoading(true)
    setErro(null)
    try {
      const resposta = await analisarImagem(fotoBase64, fotoMime, modo.prompt)
      setResultado(resposta)
    } catch (e) {
      setErro(`Erro: ${e.message}`)
    } finally {
      setLoading(false)
    }
  }

  function resetar() {
    setFoto(null)
    setFotoBase64(null)
    setResultado(null)
    setErro(null)
  }

  return (
    <PageLayout titulo="Diagnóstico" dark>
      <div className="px-4 pt-5 pb-6">

        {/* Header */}
        <div className="mb-5">
          <p className="font-bold text-xl" style={{ color: '#D0E8F5' }}>Diagnóstico Visual</p>
          <p className="text-sm mt-0.5" style={{ color: '#6B9DC2' }}>
            Tire uma foto e o Roberto analisa o problema
          </p>
        </div>

        {/* Seleção de modo */}
        {!modo && (
          <div className="space-y-3">
            {MODOS.map((m) => (
              <button
                key={m.id}
                onClick={() => setModo(m)}
                className="w-full flex items-center gap-4 p-4 rounded-2xl text-left transition-all active:scale-98"
                style={{ backgroundColor: '#0F2040', border: '1px solid #1E3A5F' }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 text-2xl"
                  style={{ backgroundColor: 'rgba(201,147,42,0.15)', border: '1px solid rgba(201,147,42,0.25)' }}
                >
                  {m.emoji}
                </div>
                <div className="flex-1">
                  <p className="font-bold text-base" style={{ color: '#D0E8F5' }}>{m.titulo}</p>
                  <p className="text-xs mt-0.5" style={{ color: '#6B9DC2' }}>{m.descricao}</p>
                </div>
                <ChevronRight size={18} color="#3B5F82" />
              </button>
            ))}
          </div>
        )}

        {/* Modo selecionado */}
        {modo && (
          <>
            {/* Breadcrumb */}
            <button
              onClick={() => { setModo(null); resetar() }}
              className="flex items-center gap-1 mb-4 text-sm"
              style={{ color: GOLD, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
            >
              ← Voltar
            </button>

            {/* Modo ativo */}
            <div
              className="flex items-center gap-3 p-3 rounded-xl mb-5"
              style={{ backgroundColor: 'rgba(201,147,42,0.1)', border: '1px solid rgba(201,147,42,0.25)' }}
            >
              <span style={{ fontSize: 24 }}>{modo.emoji}</span>
              <div>
                <p className="font-bold text-sm" style={{ color: GOLD }}>{modo.titulo}</p>
                <p className="text-xs" style={{ color: '#6B9DC2' }}>{modo.descricao}</p>
              </div>
            </div>

            {/* Foto */}
            {!foto ? (
              <button
                onClick={() => inputRef.current?.click()}
                className="w-full rounded-2xl flex flex-col items-center justify-center gap-3 transition-all"
                style={{ height: 220, backgroundColor: '#0F2040', border: '2px dashed #1E3A5F' }}
              >
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center"
                  style={{ backgroundColor: 'rgba(201,147,42,0.15)' }}
                >
                  <Camera size={28} color={GOLD} />
                </div>
                <p className="font-bold text-sm" style={{ color: '#D0E8F5' }}>Tirar foto ou escolher da galeria</p>
                <p className="text-xs" style={{ color: '#6B9DC2' }}>JPG, PNG — máx 10MB</p>
              </button>
            ) : (
              <div className="relative rounded-2xl overflow-hidden mb-4" style={{ height: 240 }}>
                <img src={foto} alt="Foto para análise" className="w-full h-full object-cover" />
                <button
                  onClick={resetar}
                  className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}
                >
                  <X size={16} color="#fff" />
                </button>
              </div>
            )}

            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              capture="environment"
              onChange={selecionarFoto}
              style={{ display: 'none' }}
            />

            {/* Botão analisar */}
            {foto && !resultado && (
              <button
                onClick={analisar}
                disabled={loading}
                className="w-full py-4 rounded-2xl font-bold text-base flex items-center justify-center gap-2 mt-3"
                style={{ backgroundColor: loading ? '#1E3A5F' : GOLD, color: '#fff', border: 'none', cursor: loading ? 'not-allowed' : 'pointer' }}
              >
                {loading ? (
                  <>
                    <RefreshCw size={16} className="animate-spin" />
                    Roberto analisando...
                  </>
                ) : (
                  <>
                    <Camera size={16} />
                    Analisar com Roberto
                  </>
                )}
              </button>
            )}

            {/* Resultado */}
            {resultado && (
              <div className="mt-4">
                <div
                  className="rounded-2xl p-4"
                  style={{ backgroundColor: '#0F2040', border: '1px solid #1E3A5F' }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <div
                      className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0"
                      style={{ border: '2px solid #C9932A' }}
                    >
                      <img src="/images/especialista.jpeg" alt="Roberto" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="font-bold text-sm" style={{ color: GOLD }}>Roberto</p>
                      <p className="text-xs" style={{ color: '#6B9DC2' }}>Especialista Compacta Print</p>
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed whitespace-pre-wrap" style={{ color: '#D0E8F5' }}>
                    {resultado}
                  </p>
                </div>

                <div className="flex gap-3 mt-3">
                  <button
                    onClick={resetar}
                    className="flex-1 py-3 rounded-xl font-bold text-sm"
                    style={{ backgroundColor: '#0F2040', color: '#D0E8F5', border: '1px solid #1E3A5F' }}
                  >
                    Nova foto
                  </button>
                  <button
                    onClick={() => navigate('/roberto')}
                    className="flex-1 py-3 rounded-xl font-bold text-sm"
                    style={{ backgroundColor: GOLD, color: '#fff' }}
                  >
                    Continuar com Roberto
                  </button>
                </div>
              </div>
            )}

            {/* Erro */}
            {erro && (
              <div className="mt-4 p-4 rounded-2xl" style={{ backgroundColor: '#2D0A0A', border: '1px solid #7F1D1D' }}>
                <p className="text-sm" style={{ color: '#FCA5A5' }}>{erro}</p>
              </div>
            )}
          </>
        )}
      </div>
    </PageLayout>
  )
}
