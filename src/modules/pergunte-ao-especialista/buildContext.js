import { faqCompacta } from '../../data/faq'

export function buildContext({ receitas, maquinas }) {
  const receitasCtx = receitas
    .map(r => `- ${r.nome}: massa ${r.massa}, peso ${r.peso}g, proporção ${r.proporcaoMassa}% massa / ${r.proporcaoRecheio}% recheio, máquina ${r.maquina}, bico ${r.bico}`)
    .join('\n')

  const maquinasCtx = maquinas
    .map(m => {
      const problemas = m.problemasComuns
        ? m.problemasComuns.map(p => `  • ${p.problema}: ${p.solucao}`).join('\n')
        : ''
      const alertas = m.alertas ? m.alertas.join(' | ') : ''
      return `- ${m.nome} (${m.subtitulo}): ${m.capacidadeUnidades}un/h, salgados ${m.pesoSalgadoMin}g–${m.pesoSalgadoMax}g
  Alertas: ${alertas}
  Problemas comuns:\n${problemas}`
    })
    .join('\n\n')

  const faqCtx = faqCompacta
    .map(f => `P: ${f.pergunta}\nR: ${f.resposta}`)
    .join('\n\n')

  return `
=== BASE DE CONHECIMENTO SALGADEIRO PRO ===

RECEITAS DISPONÍVEIS NO APP:
${receitasCtx}

MÁQUINAS COMPACTA PRINT:
${maquinasCtx}

PARÂMETROS GERAIS DE PRODUÇÃO:
- Congelamento: -18°C a -22°C, tempo de choque 2h antes de armazenar, embalagem a vácuo ou saco próprio para congelamento
- Fritura coxinha/kibe: 180°C–185°C, 3–4min, óleo de soja ou girassol
- Fritura bolinha/risole: 175°C–180°C, 2–3min
- Empanamento crocante: farinha de rosca grossa, ovo batido sem água, 2 camadas para mais crocância
- Hidratação de massa mandioca: 60–65%, temperatura morna (não quente)
- Hidratação de massa batata: 55–60%, batata bem seca antes de amassar
- Hidratação de massa crocante (trigo): 50%, margarina para plasticidade

FAQ TÉCNICO COMPACTA PRINT (use para responder perguntas sobre operação, manutenção, problemas e garantia):
${faqCtx}
  `.trim()
}
