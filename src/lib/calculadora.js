export function calcularProducao({
  tipoSalgado,
  pesoUnitario,
  quantidade,
  proporcaoMassa,
  proporcaoRecheio,
  custoMassa,
  custoRecheio,
  custoAdicionais,
}) {
  const pesoTotal = (pesoUnitario * quantidade) / 1000 // kg

  const totalMassa = (pesoTotal * proporcaoMassa) / 100
  const totalRecheio = (pesoTotal * proporcaoRecheio) / 100

  const custoTotalMassa = totalMassa * custoMassa
  const custoTotalRecheio = totalRecheio * custoRecheio
  const custoTotalAdicionais = pesoTotal * (custoAdicionais || 0)
  const custoTotal = custoTotalMassa + custoTotalRecheio + custoTotalAdicionais

  const custoPorUnidade = custoTotal / quantidade
  const margemSugerida = 2.5
  const precoSugerido = custoPorUnidade * margemSugerida
  const receitaBruta = precoSugerido * quantidade
  const lucroEstimado = receitaBruta - custoTotal

  return {
    pesoTotal,
    totalMassa,
    totalRecheio,
    custoTotal,
    custoPorUnidade,
    precoSugerido,
    receitaBruta,
    lucroEstimado,
  }
}

export function formatarMoeda(valor) {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

export function formatarKg(valor) {
  return valor < 1
    ? `${(valor * 1000).toFixed(0)}g`
    : `${valor.toFixed(2).replace('.', ',')}kg`
}
