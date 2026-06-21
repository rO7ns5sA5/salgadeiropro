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

  return `
=== BASE DE CONHECIMENTO SALGADEIRO PRO ===

RECEITAS DISPONÍVEIS NO APP:
${receitasCtx}

MÁQUINAS COMPACTA PRINT:
${maquinasCtx}

--- EMPANAMENTO PROFISSIONAL ---

LÍQUIDOS DE ADERÊNCIA (SLURRY):
- Básico econômico: 1L água + 80g farinha de trigo. Para produção artesanal de baixo custo.
- Com amido (recomendado): 1L água gelada + 100g farinha de trigo + 40g amido de milho. Casca mais leve e crocante, evita encharcamento.
- Slurry profissional (padrão industrial): 1L água gelada + 150g farinha + 50g amido de milho + 5g sal. Textura de creme de leite leve. Manter sempre frio — a água gelada retarda ativação do glúten.
- Para coxinha congelada: 1L água gelada + 120g farinha + 30g amido modificado + 5g goma xantana (estabilizante). Evita descolamento da casca no freezer.
- Para bolinha de queijo: 800g água + 200g claras de ovo + 50g amido. Usar duplo empanamento — séria contenção do queijo derretido.
- Para risoles: 500g leite integral + 500g água + 80g farinha. Coloração dourada uniforme pela caramelização da lactose.
- Para salgados grandes de lanchonete (150g–200g): 1L água + 150g farinha + 30g amido. Blend de 70% farinha de rosca média + 30% Panko na cobertura. Aguenta 4h na estufa.

FARINHAS DE COBERTURA:
- Farinha de rosca fina: capa compacta e clássica, ideal para coxinha e bolinha (não deforma o produto). Crocância média, absorção de óleo média.
- Farinha de rosca grossa: aspecto rústico, alta crocância, ideal para croquetes e risoles grandes. Absorção média-baixa.
- Panko (farinha japonesa): flocos aerados, não absorve gordura, crocância muito alta. Ideal para salgados premium e linha gourmet. Absorção muito baixa.
- Flocos de milho triturados: coloração amarela vibrante, crocância alta/dura. Para medalhões e opções sem glúten. Absorção baixa.
- Blend gourmet: 70% Panko + 15% parmesão ralado fino + 5% ervas secas — para linhas especiais.
- Blend anti-encharcamento (vitrine): 70% rosca média + 30% Panko — aguenta estufa elétrica por horas.

TÉCNICA DE EMPANAMENTO (PASSO A PASSO):
1. Deixar salgados modelados descansarem 10–15 min para perder umidade colenta da massa quente
2. Submergir no slurry por 1–2 segundos apenas — não encharcar
3. Escorrer o excesso com escumadeira — líquido pingando na farinha cria grumos
4. Depositar na calha de farinha e cobrir com a mão seca (regra das duas mãos: mão molhada=líquido, mão seca=farinha)
5. Pressionar suavemente rolando na farinha para cobertura 100% sem falhas
6. Bater levemente para remover excesso de poeira de farinha solta
7. Descanso de 10 min antes de fritar ou congelar — amido e farinha se hidratam formando película firme
- Peneirar a farinha a cada 50–100 salgados para remover grumos úmidos

DUPLO EMPANAMENTO (quando usar):
- Bolinha de queijo: queijo derrete e pressão interna vaza sem contenção reforçada
- Risoles com recheios muito líquidos (camarão, requeijão mole)
- Salgados grandes de lanchonete (150g–200g)
- Sequência CORRETA: massa → slurry → farinha fina (sela poros) → slurry → panko ou rosca grossa (textura)
- NUNCA inverter: farinha grossa primeiro faz líquido da segunda passagem criar massa crua por baixo

DIAGNÓSTICO DE PROBLEMAS NO EMPANAMENTO:
- Casca descascando após frito: slurry ralo demais ou excesso de líquido antes de passar na farinha — aumentar proporção farinha/amido no slurry
- Salgado encharcado e mole: óleo abaixo de 160°C ou fritadeira sobrecarregada — usar termômetro, fritar menos unidades por vez
- Casca com bolhas grandes: ar aprisionado na modelagem ou falta de pressão ao empanar — apertar bem o salgado ao modelar
- Salgado estoura na fritadeira: recheio muito aquoso, pontos finos na massa ou choque térmico — padronizar espessura da massa, engrosse recheio com amido
- Farinha queimando e óleo ficando preto rápido: excesso de poeira de farinha solta ou farinha com açúcar de panificação — bater o salgado antes de fritar, peneirar a calha constantemente

--- CONGELAMENTO PROFISSIONAL ---

PRINCÍPIOS FÍSICOS:
- Congelamento lento (doméstico): forma macrocristais de gelo com pontas agudas que perfuram a estrutura da massa → rachaduras, encharcamento na fritura
- Congelamento rápido: forma microcristais arredondados que não danificam a massa → textura preservada
- Água expande 9% ao virar gelo — massa fraca ou ressecada racha no freezer
- Amido sofre retrogradação se a massa não estiver bem cozida (gelatinizada) → massa esfarelada após degelo

7 PILARES DO CONGELAMENTO PERFEITO:
1. Massa com hidratação correta e 4%–6% de gordura sobre o peso da farinha (manteiga/margarina) — plastificante que evita que a massa fique quebradiça no frio
2. Recheio firme sem água livre — recheio úmido vira pedra de gelo que estoura na fritura
3. Modelagem hermética sem bolsões de ar interno
4. Resfriamento prévio OBRIGATÓRIO antes de entrar no freezer
5. Congelamento em aberto (IQP — Individual Quick Freezing): salgados separados 1cm nas bandejas, sem se tocar, sem tampa
6. Embalagem vedada hermeticamente após congelamento completo
7. Temperatura estável de -18°C ou menos — oscilações quebram o empanamento

PROTOCOLO DE RESFRIAMENTO (antes do freezer):
- Nunca colocar salgado quente no freezer — vapor condensa e vira neve/cristais de gelo na superfície
- Zona de perigo bacteriológico: 10°C–60°C — salgados mornos empilhados por horas contaminam o recheio
1. Distribuir em bandejas espaçadas (1cm entre salgados)
2. Temperatura ambiente por no máximo 20 min para perder o calor inicial
3. Geladeira (4°C–7°C) por 30 min até o centro térmico cair abaixo de 10°C
4. Só então entrar no freezer

PROTOCOLO IQP (CONGELAMENTO EM ABERTO):
- Forrar bandejas com plástico filme ou silicone culinário (evita colar)
- Salgados alinhados sem se tocar, sem tampa — ar circula em volta do corpo todo
- Deixar até superfície completamente rígida e esbranquiçada: 2–4 horas em freezer convencional, 20–30 min em ultracongelador
- Somente após totalmente congelados: passar para embalagem final, selar imediatamente, etiquetar

TEMPERATURAS RECOMENDADAS:
- Resfriamento inicial: 4°C a 7°C (geladeira comercial — não embalar morno)
- Congelamento rápido ideal: -25°C a -40°C
- Estocagem: -18°C ou menos ESTÁVEL (oscilação entre -10°C e -5°C: água migra das células, crosta grossa de cristais, massa seca por dentro)
- Transporte: -15°C ou menos

VALIDADE ESTIMADA (sob -18°C, embalagem vedada):
- Coxinha / empanados: 90 dias — embalagem bem vedada para evitar que rosca resseque
- Bolinha de queijo: 60–90 dias — queijo com mais umidade tem validade menor
- Kibe / croquete de carne: 90 dias
- Salgados assados crus: 30–45 dias — fermento perde força com o tempo

PREPARO DE MASSA PARA CONGELAMENTO:
- Coxinha e Risole (massa cozida): sovar bem ainda morna para alinhar o glúten — garante elasticidade para selar bico e bordas. Massa mole demais = bolhas de água que estouram. Massa seca demais = racha nas bordas no freezer.
- Croquete (base bechamel): cozimento lento até soltar do fundo da panela. Passar em farinha de trigo seca antes do slurry (estrutura pastosa do bechamel racha no frio sem essa etapa)
- Massa de mandioca/batata: escorrer e espremer muito bem o tubérculo + misturar farinha de trigo para dar liga elástica duradoura no frio
- Massa fermentada (assados): para congelar cru, aumentar dose de fermento em 20% — congelamento destrói parte das leveduras

PREPARO DE RECHEIOS PARA CONGELAMENTO:
- Água livre no recheio = pedras de gelo = vapor de alta pressão na fritura = estouro
- Frango desfiado: cozinhar e desfiado limpo, retirar TOTAL do caldo excessivo. Espessar com roux ou amido modificado até a colher riscar o fundo sem deixar líquido
- Queijo para bolinha: evitar mussarela comum (muita água e gordura livre). Preferir mussarela seca ralada ou minas padrão curado. Queijo frescal destrói o salgado.
- Catupiry: congelar bolinhas de catupiry separadas e inserir congelado na massa — derrete perfeitamente na fritura
- NUNCA usar cebola e tomate em recheios para congelar — azeda após 3 dias e molha a massa
- Calabresa moída: processar bem seca, sem líquidos de cozimento
- Amido modificado (superior ao amido de milho comum): retém água mesmo após ciclo completo de congelamento e degelo

CONGELAMENTO POR TIPO DE SALGADO:
- Coxinha: escorrer bem o slurry do bico antes de passar na rosca — o bico retém umidade. Recheio de frango FIRME, sem molho solto.
- Risole: apertar firmemente as bordas da meia-lua antes de empanar. Farinha residual na borda durante modelagem faz abrir no congelador.
- Bolinha de queijo: duplo empanamento obrigatório. Não misturar água fria no recheio para "render".
- Kibe: trigo hidratado em 1,2 partes de água morna para 1 parte de trigo. Congelar imediatamente após modelar (carne moída crua oxida e perde cor).
- Croquete: passar em farinha de trigo seca ANTES do slurry — bechamel pastoso racha no frio sem essa camada.

DIAGNÓSTICO DE PROBLEMAS NO CONGELAMENTO:
- Rachou no freezer: massa fraca sem gordura suficiente / congelamento lento / recheio úmido que expandiu → aumentar margarina na massa, usar IQP
- Empanamento soltando após congelar: salgado empanado ainda quente ou slurry ralo → aguardar resfriamento completo, usar slurry com amido modificado
- Recheio vazando na fritura: ar interno na modelagem ou queijo com muita gordura livre → pressão constante na modelagem, substituir queijo mole
- Neve dentro da embalagem: oscilação de temperatura no freezer ou embalagem mal vedada → sacos de alta barreira, selar bem, minimizar abertura do freezer
- Massa borrachuda pós-preparo: farinha de baixa qualidade ou excesso de sova após cozimento completo → cozinhar bem a farinha e modelar ainda morna sem sovar depois
- Gosto de ranço/velho: tempo excessivo de estocagem ou gordura de má qualidade → respeitar validade, usar óleos/gorduras frescos
- Gelo no saco: embalou ainda morno ou freezer com porta sendo aberta constantemente

--- FRITURA PROFISSIONAL ---

PARÂMETROS DE FRITURA (por tamanho e estado):
- Salgado pequeno (festa, até 25g) FRESCO: 170°C–180°C, 3–4 min
- Salgado pequeno (festa, até 25g) CONGELADO: 160°C–170°C, 5–6 min — vai DIRETO do freezer sem descongelar na bancada
- Salgado médio (60g–90g) CONGELADO: 155°C–165°C, 5–6 min
- Salgado grande (lanchonete, 120g–180g) CONGELADO: 150°C–160°C, 7–10 min — repouso de 15 min em temperatura ambiente antes de fritar para o centro perder a dureza do gelo
- Bolinha de queijo gourmet com parmesão: fritar estritamente a 170°C para o queijo não queimar

REGRAS CRÍTICAS DE FRITURA:
- Salgados congelados pequenos/médios: DIRETO do freezer para o óleo — descongelamento na bancada destrói o empanamento (água condensada amolece a rosca)
- Regra de ocupação: máximo 1 parte de salgado para 3 partes de óleo — excesso derruba temperatura e transforma em cozimento por imersão gordurosa = encharcamento
- Tipo de óleo: preferir gordura vegetal hidrogenada ou óleos de algodão/palma (maior estabilidade térmica, ponto de fumaça elevado, secagem mais rápida). Óleo de soja comum queima rápido e deixa aspecto pesado.
- Óleo acima de 190°C: queima a farinha externa e mantém o centro gelado — temperatura ideal é MENOR, tempo MAIOR
- Óleo abaixo de 160°C: encharca o salgado — usar termômetro digital sempre

DICAS GERAIS DE PRODUÇÃO:
- Recheio deve estar frio (10°C–15°C) durante a modelagem — recheio quente cozinha a massa de dentro para fora
- Recheio deve ser seco — recheio molhado impossibilita fechar o salgado
- Queijo mussarela: usar em cubinhos para facilitar a modelagem e garantir derretimento uniforme
- Catupiry: congelar em bolinhas ou usar manga de confeiteiro para maior controle
- Ingredientes para EVITAR em recheios para congelar: cebola crua e tomate (azeda após 3 dias, tomate ainda molha e racha a massa na fritura)
`.trim()
}
