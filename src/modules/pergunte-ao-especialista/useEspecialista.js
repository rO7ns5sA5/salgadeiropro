import { useState, useCallback, useMemo } from 'react'
import { buildContext } from './buildContext'
import { buildSystemPrompt } from './systemPrompt'
import { buscarCache, salvarCache } from './semanticCache'
import { buscarFaq } from '../../data/faq'

export function useEspecialista({ receitas, maquinas, maquinaUsuario = null }) {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)

  const systemPrompt = useMemo(() => {
    const ctx = buildContext({ receitas, maquinas })
    return buildSystemPrompt(ctx, maquinaUsuario)
  }, [receitas, maquinas, maquinaUsuario])

  const enviar = useCallback(async (textoUsuario, imagem = null) => {
    if ((!textoUsuario.trim() && !imagem) || loading) return

    const msgUsuario = {
      role: 'user',
      content: textoUsuario || 'Analise esta imagem.',
      imagem,
      id: Date.now(),
    }

    if (!imagem) {
      const cached = buscarCache(textoUsuario)
      if (cached) {
        setMessages(prev => [
          ...prev,
          msgUsuario,
          { role: 'assistant', content: cached, fromCache: true, id: Date.now() + 1 },
        ])
        return
      }
    }

    const novasMensagens = [...messages, msgUsuario]
    setMessages(novasMensagens)
    setLoading(true)

    const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY
    if (!apiKey) {
      // Modo offline: busca no FAQ local
      const resultados = buscarFaq(textoUsuario)
      const respostaOffline = resultados.length > 0
        ? resultados.map(r => `**${r.pergunta}**\n${r.resposta}`).join('\n\n---\n\n')
        : 'Não encontrei essa informação na minha base offline. Para dúvidas específicas, ligue para a Compacta Print: (11) 3188-7000.'
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: `📴 *Modo offline — respondendo pela base de conhecimento local:*\n\n${respostaOffline}`,
        id: Date.now() + 1,
      }])
      setLoading(false)
      return
    }

    try {
      const apiMessages = novasMensagens.map(({ role, content, imagem: img }) => {
        if (img) {
          return {
            role,
            content: [
              { type: 'image', source: { type: 'base64', media_type: img.mimeType, data: img.base64 } },
              { type: 'text', text: content },
            ],
          }
        }
        return { role, content }
      })

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
          system: systemPrompt,
          messages: apiMessages,
        }),
      })

      const data = await res.json()
      const resposta = data.content?.find(b => b.type === 'text')?.text
        ?? 'Não consegui processar. Tente novamente.'

      if (!imagem) salvarCache(textoUsuario, resposta)
      setMessages(prev => [...prev, { role: 'assistant', content: resposta, id: Date.now() + 1 }])
    } catch {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: '⚠️ Erro de conexão. Verifique sua internet e tente novamente.',
        id: Date.now() + 1,
      }])
    } finally {
      setLoading(false)
    }
  }, [messages, loading, systemPrompt])

  const limpar = useCallback(() => setMessages([]), [])

  return { messages, loading, enviar, limpar }
}
