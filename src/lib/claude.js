import { buscarCacheResposta, salvarRespostaCache } from './supabase'

const SYSTEM_PROMPT = `Você é Roberto, especialista técnico da Compacta Print com mais de 20 anos de experiência em máquinas de salgados. Você projetou as máquinas Pop 4.0, Inox Supreme, Black Inox e Black Mix.

Responda sempre em português brasileiro, de forma direta e técnica mas acessível. Quando a pergunta for sobre regulagem de máquina, sempre pergunte qual modelo o usuário tem. Quando for sobre receita, sempre relacione com a configuração correta da máquina.

Máquinas da linha Compacta Print:
- Pop 4.0: extrusora de alta capacidade, bico Standard Star 22mm, mandíbula Corte Liso
- Inox Supreme: produção contínua, acabamento inox, ideal para escala industrial
- Black Inox: linha premium, painel digital, controle de fluxo eletrônico
- Black Mix: versátil, aceita múltiplos formatos, ideal para diversificação

Problemas mais comuns:
- Coxinha rachando: temperatura do recheio vs massa, pressão dos rolos
- Massa quebrando: hidratação incorreta, temperatura quente demais
- Bico entupindo: recheio com pedaços grandes, viscosidade errada
- Salgado irregular: fluxo desregulado, desgaste do bico

Sempre finalize com uma pergunta de acompanhamento para continuar ajudando.

Assine sempre como: Roberto — Especialista Compacta Print`

function detectarCategoria(texto) {
  const t = texto.toLowerCase()
  if (t.includes('máquina') || t.includes('bico') || t.includes('regulag') || t.includes('pop') || t.includes('inox')) return 'maquina'
  if (t.includes('receita') || t.includes('massa') || t.includes('recheio') || t.includes('ingrediente')) return 'receita'
  if (t.includes('produção') || t.includes('calcul') || t.includes('quantidade') || t.includes('custo')) return 'producao'
  return 'geral'
}

export async function perguntarRoberto(pergunta, historico = []) {
  // 1. Tenta cache (só para perguntas sem histórico longo = perguntas frequentes)
  if (historico.length <= 1) {
    const cached = await buscarCacheResposta(pergunta)
    if (cached) {
      return { resposta: cached, fonte: 'cache' }
    }
  }

  // 2. Chama Claude API
  const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY
  if (!apiKey) {
    return {
      resposta: 'Roberto está offline no momento. Configure a chave da API para ativar o assistente.',
      fonte: 'erro',
    }
  }

  const messages = [
    ...historico.map((m) => ({ role: m.role, content: m.content })),
    { role: 'user', content: pergunta },
  ]

  try {
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
        system: SYSTEM_PROMPT,
        messages,
      }),
    })

    if (!res.ok) {
      const err = await res.json().catch(() => ({}))
      throw new Error(err?.error?.message || `HTTP ${res.status}`)
    }

    const data = await res.json()
    const resposta = data.content?.[0]?.text || 'Não consegui gerar uma resposta.'

    // 3. Salva no cache para revisão
    const categoria = detectarCategoria(pergunta)
    await salvarRespostaCache(pergunta, resposta, categoria)

    return { resposta, fonte: 'ia' }
  } catch (err) {
    console.error('Erro Claude API:', err)
    return {
      resposta: `Erro ao conectar com Roberto: ${err.message}. Verifique sua conexão e a chave da API.`,
      fonte: 'erro',
    }
  }
}
