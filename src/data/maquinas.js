// Pop 4.0 — escala 0 a 100, TEMPO: 1 / 2 / 3 a 4
const calibragemPop = [
  { bico: 1, descricao: "Copo",              pesoMin: 10,  pesoMax: 15,  massa: 50, recheio: 20, cortador: 50, tempo: null },
  { bico: 2, descricao: "Festa",             pesoMin: 20,  pesoMax: 30,  massa: 60, recheio: 30, cortador: 50, tempo: null },
  { bico: 3, descricao: "R$1,00",            pesoMin: 50,  pesoMax: 60,  massa: 70, recheio: 30, cortador: 50, tempo: 1 },
  { bico: 4, descricao: "Lanchonete",        pesoMin: 70,  pesoMax: 90,  massa: 70, recheio: 30, cortador: 50, tempo: 2 },
  { bico: 5, descricao: "Lanchonete Padrão", pesoMin: 100, pesoMax: 150, massa: 80, recheio: 30, cortador: 50, tempo: "3 a 4" },
]

// Black Inox e Black Mix — escala 0 a 100, TEMPO: 10 / 20 / 30
const calibragemBlack = [
  { bico: 1, descricao: "Copo",              pesoMin: 10,  pesoMax: 15,  massa: 50, recheio: 20, cortador: 50, tempo: null },
  { bico: 2, descricao: "Festa",             pesoMin: 20,  pesoMax: 30,  massa: 60, recheio: 30, cortador: 50, tempo: null },
  { bico: 3, descricao: "R$1,00",            pesoMin: 50,  pesoMax: 60,  massa: 70, recheio: 30, cortador: 50, tempo: 10 },
  { bico: 4, descricao: "Lanchonete",        pesoMin: 70,  pesoMax: 90,  massa: 70, recheio: 30, cortador: 50, tempo: 20 },
  { bico: 5, descricao: "Lanchonete Padrão", pesoMin: 100, pesoMax: 150, massa: 80, recheio: 30, cortador: 50, tempo: 30 },
]

// Inox Supreme — escala 1 a 5 (potenciômetros analógicos), bicos de massa e recheio numerados separadamente
const calibragemSupreme = [
  { bicoMassa: 2, bicoRecheio: 2, descricao: "Copo",              peso: 15,        massa: 3, recheio: 3, cortador: 3, tempo: null },
  { bicoMassa: 4, bicoRecheio: 2, descricao: "Festa",             peso: 25,        massa: 5, recheio: 4, cortador: 3, tempo: null },
  { bicoMassa: 6, bicoRecheio: 3, descricao: "R$1,00",            pesoMin: 50, pesoMax: 60, massa: 5, recheio: 4, cortador: 3, tempo: 1 },
  { bicoMassa: 7, bicoRecheio: 3, descricao: "Lanchonete",        peso: 100,       massa: 5, recheio: 4, cortador: 3, tempo: 1.5 },
  { bicoMassa: 8, bicoRecheio: 5, descricao: "Lanchonete Padrão", peso: 150,       massa: 4, recheio: 5, cortador: 3, tempo: 2 },
  { bicoMassa: 9, bicoRecheio: 6, descricao: "Lanchonete Grande", peso: 200,       massa: 4, recheio: 5, cortador: 3, tempo: 2 },
  { bicoMassa: 9, bicoRecheio: 6, descricao: "Refeição",          peso: 250,       massa: 5, recheio: 5, cortador: 3, tempo: "2 ou 3" },
]

const bicosCalibragemPadrao = [
  { nome: "Bico 1 — Copo (10–15g)",          tipo: "massa", fluxoIdeal: 50 },
  { nome: "Bico 2 — Festa (20–30g)",          tipo: "massa", fluxoIdeal: 60 },
  { nome: "Bico 3 — R$1,00 (50–60g)",         tipo: "massa", fluxoIdeal: 70 },
  { nome: "Bico 4 — Lanchonete (70–90g)",     tipo: "massa", fluxoIdeal: 70 },
  { nome: "Bico 5 — Padrão (100–150g)",       tipo: "massa", fluxoIdeal: 80 },
]

export const maquinas = [
  {
    id: "pop40",
    nome: "Pop 4.0",
    subtitulo: "Modeladora compacta de entrada",
    status: "ativa",
    capacidadeKg: 40,
    capacidadeUnidades: 4000,
    pesoSalgadoMin: 7,
    pesoSalgadoMax: 150,
    dimensoes: { altura: 55, largura: 28, profundidade: 59 },
    pesoBruto: 18.8,
    voltagem: "127V ou 220V",
    motores: 3,
    garantia: { geral: "1 ano", motores: "5 anos", engrenagens: "10 anos" },
    formatos: ["Coxinha", "Kibe", "Bolinha", "Almôndega", "Nhoque", "Churros", "Enroladinho"],
    bicoRecomendado: "Coxinha 22mm",
    mandibula: "Corte Liso (Coxinha)",
    fluxoMassa: 75,
    fluxoRecheio: 60,
    calibragens: calibragemPop,
    bicos: bicosCalibragemPadrao,
    alertas: [
      "A massa deve estar morna ou fria. Massa quente perde a liga na rosca.",
      "Evite bolsas de ar nos funis pressionando o conteúdo levemente.",
      "Cuba de polietileno — não use instrumentos metálicos para remover massa."
    ],
    dicasMassa: [
      "Use mandioca cozida e amassada ainda morna para melhor liga.",
      "A hidratação ideal é 60–65% — massa não pode grudar nas mãos.",
      "Descanse a massa por 10 minutos antes de colocar na máquina."
    ],
    dicasRecheio: [
      "O recheio deve ter pedaços menores que 5mm para não entupir o bico.",
      "Viscosidade ideal: o recheio deve escorrer devagar ao inclinar o recipiente.",
      "Mantenha o recheio entre 10–15°C durante a produção."
    ],
    problemasComuns: [
      { problema: "Coxinha rachando", solucao: "Verificar temperatura do recheio e pressão dos rolos. Recheio quente expande e racha a massa." },
      { problema: "Bico entupindo", solucao: "Reduzir pedaços no recheio para menos de 5mm. Verificar viscosidade — recheio muito grosso entope." },
      { problema: "Peso irregular", solucao: "Recalibrar fluxo de massa e recheio. Verificar se os funis estão cheios uniformemente." }
    ]
  },
  {
    id: "inoxsupreme",
    nome: "Inox Supreme",
    subtitulo: "Modeladora profissional em inox",
    status: "disponivel",
    capacidadeKg: 60,
    capacidadeUnidades: 6000,
    pesoSalgadoMin: 7,
    pesoSalgadoMax: 150,
    dimensoes: { altura: 62, largura: 32, profundidade: 62 },
    pesoBruto: 22,
    voltagem: "127V ou 220V",
    motores: 3,
    garantia: { geral: "1 ano", motores: "5 anos", engrenagens: "10 anos" },
    formatos: ["Coxinha", "Kibe", "Risole", "Bolinha", "Almôndega", "Churros", "Enroladinho", "Empada"],
    bicoRecomendado: "Risole 30mm",
    mandibula: "Corte Reto (Risole/Travesseiro)",
    fluxoMassa: 70,
    fluxoRecheio: 55,
    escalaMaxPainel: 5,
    calibragens: calibragemSupreme,
    bicos: [
      { nome: "M2/R2 — Copo (15g)",            tipo: "massa", fluxoIdeal: 60 },
      { nome: "M4/R2 — Festa (25g)",            tipo: "massa", fluxoIdeal: 75 },
      { nome: "M6/R3 — R$1,00 (50–60g)",        tipo: "massa", fluxoIdeal: 75 },
      { nome: "M7/R3 — Lanchonete (100g)",      tipo: "massa", fluxoIdeal: 75 },
      { nome: "M8/R5 — Padrão (150g)",          tipo: "massa", fluxoIdeal: 80 },
      { nome: "M9/R6 — Grande (200g)",          tipo: "massa", fluxoIdeal: 80 },
      { nome: "M9/R6 — Refeição (250g)",        tipo: "massa", fluxoIdeal: 100 },
    ],
    alertas: [
      "Ideal para produção contínua — não interrompa o fluxo por mais de 5 minutos.",
      "Limpeza obrigatória a cada 4 horas de operação contínua.",
      "Estrutura em inox — sanitize com álcool 70° após cada jornada."
    ],
    dicasMassa: [
      "Para produção industrial, mantenha reserva de massa pré-preparada.",
      "A temperatura ambiente abaixo de 20°C é ideal para a consistência da massa.",
      "Engrenagens em poliacetal — não exigem lubrificação."
    ],
    dicasRecheio: [
      "Recheios pastosos funcionam melhor neste modelo.",
      "Sistema de duplo funil permite trocar o recheio sem parar a produção.",
      "Recheios com pedaços grandes: passe no processador antes de usar."
    ],
    problemasComuns: [
      { problema: "Produção irregular após pausa", solucao: "Após retomar, descarte os primeiros 20 salgados até estabilizar o fluxo." },
      { problema: "Aquecimento excessivo", solucao: "Reduzir velocidade em 10% e verificar ventilação ao redor da máquina." },
      { problema: "Risole abrindo nas bordas", solucao: "Aumentar pressão da mandíbula em 5% e verificar umidade da massa." }
    ]
  },
  {
    id: "blackinox",
    nome: "Black Inox",
    subtitulo: "Linha premium com painel digital",
    status: "disponivel",
    capacidadeKg: 50,
    capacidadeUnidades: 5000,
    pesoSalgadoMin: 7,
    pesoSalgadoMax: 150,
    dimensoes: { altura: 69, largura: 35, profundidade: 64 },
    pesoBruto: 20.6,
    voltagem: "127V ou 220V",
    motores: 3,
    garantia: { geral: "1 ano", motores: "5 anos", engrenagens: "10 anos" },
    formatos: ["Coxinha", "Kibe", "Risole", "Empada", "Bolinha", "Almôndega", "Churros"],
    bicoRecomendado: "Coxinha 22mm",
    mandibula: "Corte Liso (Coxinha/Bolinha)",
    fluxoMassa: 80,
    fluxoRecheio: 65,
    calibragens: calibragemBlack,
    bicos: bicosCalibragemPadrao,
    alertas: [
      "Contador digital sem bateria — registra produção acumulada automaticamente.",
      "Calibragem dos potenciômetros deve ser verificada a cada 30 dias.",
      "Cuba de polietileno — não use instrumentos metálicos para remover massa."
    ],
    dicasMassa: [
      "Os 4 potenciômetros permitem ajuste fino de massa, recheio, corte e parada.",
      "Use o modo automático para manter peso constante ao longo do turno.",
      "Engrenagens em poliacetal — resistência equivalente ao aço sem necessidade de lubrificação."
    ],
    dicasRecheio: [
      "O controle de fluxo individual elimina variações de peso entre lotes.",
      "Compatível com recheios líquidos e pastosos com diferentes viscosidades.",
      "Recheios frios (5–10°C) aumentam a precisão do fluxo eletrônico."
    ],
    problemasComuns: [
      { problema: "Salgado saindo fora do peso", solucao: "Ajustar potenciômetro de massa em incrementos de 5% até estabilizar." },
      { problema: "Contador não registrando", solucao: "Verificar conexão do sensor de contagem e reiniciar com botão lateral." },
      { problema: "Bico entupindo frequentemente", solucao: "Reduzir pedaços no recheio e diminuir fluxo de recheio em 10%." }
    ]
  },
  {
    id: "blackmix",
    nome: "Black Mix",
    subtitulo: "Versátil para múltiplos formatos",
    status: "disponivel",
    capacidadeKg: 50,
    capacidadeUnidades: 5000,
    pesoSalgadoMin: 7,
    pesoSalgadoMax: 150,
    dimensoes: { altura: 69, largura: 35, profundidade: 64 },
    pesoBruto: 20.6,
    voltagem: "127V ou 220V",
    motores: 3,
    garantia: { geral: "1 ano", motores: "5 anos", engrenagens: "10 anos" },
    formatos: ["Coxinha", "Kibe", "Risole", "Bolinha", "Enroladinho", "Churros", "Almôndega", "Nhoque", "Brigadeiro", "Cajuzinho"],
    bicoRecomendado: "Bolinha 18mm",
    mandibula: "Corte Almofada (Multi-formato)",
    fluxoMassa: 72,
    fluxoRecheio: 58,
    calibragens: calibragemBlack,
    bicos: bicosCalibragemPadrao,
    alertas: [
      "Ao trocar de formato, sempre limpe o bico completamente antes de instalar o novo.",
      "Formatos diferentes requerem recalibração de fluxo — consulte a tabela no manual.",
      "Contador digital integrado — sem necessidade de pilhas ou baterias."
    ],
    dicasMassa: [
      "Ideal para negócios que trabalham com múltiplos tipos de salgados e doces.",
      "A troca de bico é rápida — purge com 10 salgados de descarte ao trocar.",
      "Cuba frontal facilita o abastecimento contínuo durante a produção."
    ],
    dicasRecheio: [
      "Cada formato tem uma viscosidade ideal de recheio — consulte a tabela.",
      "Para doces (brigadeiro, cajuzinho), use o fluxo de recheio zerado.",
      "Recheios sólidos (cubos de queijo) — passe no processador antes de usar."
    ],
    problemasComuns: [
      { problema: "Bico solto durante produção", solucao: "Apertar o sistema de trava no sentido horário até encaixar completamente." },
      { problema: "Formatos misturados na saída", solucao: "Purgar a máquina com 10 salgados de descarte ao trocar o bico." },
      { problema: "Doces grudando na mandíbula", solucao: "Aplicar óleo vegetal neutro na mandíbula antes de produzir doces." }
    ]
  },
  {
    id: "inoxprime",
    nome: "Inox Prime 12.0",
    subtitulo: "Linha industrial de alta capacidade",
    status: "disponivel",
    capacidadeKg: 120,
    capacidadeUnidades: 12000,
    pesoSalgadoMin: 7,
    pesoSalgadoMax: 250,
    dimensoes: { altura: 76, largura: 46, profundidade: 71 },
    pesoBruto: 40,
    voltagem: "220V",
    potencia: 750,
    corrente: 12,
    motores: 3,
    garantia: { geral: "1 ano", motores: "5 anos", engrenagens: "10 anos" },
    formatos: ["Coxinha", "Kibe", "Risole", "Bolinha", "Enroladinho", "Empada", "Churros", "Almôndega", "Nhoque", "Brigadeiro"],
    bicoRecomendado: "Coxinha 22mm",
    mandibula: "Corte Liso (Coxinha)",
    fluxoMassa: 85,
    fluxoRecheio: 70,
    bicos: [
      { nome: "Coxinha 22mm", tipo: "massa", fluxoIdeal: 85 },
      { nome: "Coxinha 26mm", tipo: "massa", fluxoIdeal: 82 },
      { nome: "Kibe 28mm", tipo: "massa", fluxoIdeal: 78 },
      { nome: "Risole 30mm", tipo: "massa", fluxoIdeal: 75 },
      { nome: "Bolinha 18mm", tipo: "massa", fluxoIdeal: 80 },
      { nome: "Churros Tradicional", tipo: "massa", fluxoIdeal: 90 },
      { nome: "Churros Mini", tipo: "massa", fluxoIdeal: 88 },
      { nome: "Churros Espanhol", tipo: "massa", fluxoIdeal: 85 },
      { nome: "Recheio Universal", tipo: "recheio", fluxoIdeal: 70 },
      { nome: "Recheio Denso", tipo: "recheio", fluxoIdeal: 65 },
    ],
    alertas: [
      "Exclusiva para 220V — nunca conecte em 127V.",
      "Botão de emergência: parada imediata de todos os 3 motores independentes.",
      "Voltímetro integrado — monitore a tensão de entrada antes de ligar.",
      "Cuba frontal transparente — inspecione o nível de massa sem parar a produção."
    ],
    dicasMassa: [
      "Estrutura em inox escovado — sanitize com álcool 70° após cada jornada.",
      "3 motores industriais independentes — ajuste massa, recheio e corte separadamente.",
      "9 bicos de massa inclusos: suporta todos os formatos sem acessório extra."
    ],
    dicasRecheio: [
      "6 bicos de recheio permitem trabalhar com diferentes viscosidades simultaneamente.",
      "Sistema de duplo potenciômetro de recheio: fino e grosso no mesmo equipamento.",
      "Para produção acima de 8h, mantenha recheio em câmara fria adjacente."
    ],
    problemasComuns: [
      { problema: "Voltímetro indicando abaixo de 210V", solucao: "Parar a produção. Tensão baixa danifica os motores. Acionar eletricista." },
      { problema: "Botão de emergência acionado involuntariamente", solucao: "Girar o botão no sentido horário para destravar e religar na sequência correta." },
      { problema: "Produção irregular entre os 3 motores", solucao: "Verificar sincronização dos potenciômetros — todos devem partir do zero ao recalibrar." }
    ]
  }
]
