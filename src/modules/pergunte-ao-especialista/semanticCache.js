const cache = new Map()

function normalizar(texto) {
  return texto
    .toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

export function buscarCache(pergunta) {
  const chave = normalizar(pergunta)
  if (cache.has(chave)) return cache.get(chave)
  for (const [k, v] of cache) {
    const palavrasCache = k.split(' ')
    const palavrasNova = chave.split(' ')
    const intersecao = palavrasCache.filter(p => palavrasNova.includes(p))
    if (palavrasCache.length > 0 && intersecao.length / palavrasCache.length >= 0.8) return v
  }
  return null
}

export function salvarCache(pergunta, resposta) {
  const chave = normalizar(pergunta)
  cache.set(chave, resposta)
  if (cache.size > 100) {
    cache.delete(cache.keys().next().value)
  }
}
