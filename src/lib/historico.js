const CHAVE = 'historico_calculos'
const MAX = 10

export function salvarCalculo(form, resultado) {
  const historico = carregarHistorico()
  const novo = {
    id: Date.now(),
    data: new Date().toLocaleDateString('pt-BR'),
    hora: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
    form,
    resultado,
  }
  const atualizado = [novo, ...historico].slice(0, MAX)
  localStorage.setItem(CHAVE, JSON.stringify(atualizado))
  return atualizado
}

export function carregarHistorico() {
  try {
    return JSON.parse(localStorage.getItem(CHAVE) || '[]')
  } catch {
    return []
  }
}

export function removerCalculo(id) {
  const historico = carregarHistorico().filter((c) => c.id !== id)
  localStorage.setItem(CHAVE, JSON.stringify(historico))
  return historico
}
