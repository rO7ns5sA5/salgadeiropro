import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_ANON_KEY

function isValidUrl(s) {
  try { return /^https?:\/\/.+/.test(new URL(s).href) } catch { return false }
}

export const supabase = isValidUrl(url) && key && !key.includes('your_')
  ? createClient(url, key)
  : null

export async function buscarCacheResposta(pergunta) {
  if (!supabase) return null

  const termos = pergunta.trim().split(/\s+/).slice(0, 6).join(' & ')

  const { data, error } = await supabase
    .from('cached_answers')
    .select('id, resposta, vezes_servida')
    .eq('aprovado', true)
    .ilike('pergunta', `%${pergunta.trim().slice(0, 40)}%`)
    .order('vezes_servida', { ascending: false })
    .limit(1)

  if (error || !data?.length) return null

  // Incrementa contador
  await supabase
    .from('cached_answers')
    .update({ vezes_servida: data[0].vezes_servida + 1, atualizado_em: new Date().toISOString() })
    .eq('id', data[0].id)

  return data[0].resposta
}

export async function salvarRespostaCache(pergunta, resposta, categoria = 'geral') {
  if (!supabase) return

  await supabase.from('cached_answers').insert({
    pergunta: pergunta.trim(),
    resposta,
    categoria,
    aprovado: false,
    vezes_servida: 0,
  })
}
