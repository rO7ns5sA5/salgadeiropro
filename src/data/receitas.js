export const receitas = [
  {
    id: 1,
    nome: "Coxinha de Frango Cremoso",
    formato: "coxinha",
    massa: "Mandioca",
    peso: 60,
    maquina: "Pop 4.0",
    bico: "Standard Star 22mm",
    proporcaoMassa: 70,
    proporcaoRecheio: 30,
    imagem: "/images/coxinha.jpeg",
    ingredientes: [
      { item: "Mandioca cozida", quantidade: "1kg" },
      { item: "Farinha de trigo", quantidade: "200g" },
      { item: "Sal", quantidade: "10g" },
      { item: "Frango desfiado", quantidade: "400g" },
      { item: "Requeijão cremoso", quantidade: "100g" }
    ],
    modoPreparo: [
      "Cozinhe a mandioca até ficar bem macia e amasse ainda quente.",
      "Misture a farinha de trigo e o sal até obter uma massa homogênea.",
      "Tempere o frango desfiado com alho, cebola e misture o requeijão.",
      "Configure a máquina Pop 4.0 com bico Standard Star 22mm.",
      "Ajuste o fluxo de massa em 75% e recheio em 60%.",
      "Produza os salgados e verifique o peso unitário regularmente."
    ],
    dicas: [
      "A massa deve estar morna ao colocar na máquina — nunca quente.",
      "O requeijão ajuda a manter o recheio úmido após fritura.",
      "Congele por até 3 meses antes de fritar."
    ]
  },
  {
    id: 2,
    nome: "Kibe de Carne",
    formato: "kibe",
    massa: "Batata",
    peso: 60,
    maquina: "Pop 4.0",
    bico: "Kibe 28mm",
    proporcaoMassa: 65,
    proporcaoRecheio: 35,
    imagem: "/images/Kibe_carne.jpeg",
    ingredientes: [
      { item: "Batata cozida", quantidade: "1kg" },
      { item: "Farinha de trigo", quantidade: "150g" },
      { item: "Carne moída temperada", quantidade: "400g" },
      { item: "Cebola", quantidade: "1 unidade" },
      { item: "Temperos a gosto", quantidade: "q.s." }
    ],
    modoPreparo: [
      "Cozinhe e amasse as batatas ainda quentes.",
      "Adicione a farinha e misture bem até obter liga.",
      "Refogue a carne com cebola e temperos.",
      "Use o bico Kibe 28mm na Pop 4.0.",
      "Ajuste o fluxo de massa em 72% e recheio em 58%."
    ],
    dicas: [
      "A carne deve estar bem temperada e sem excesso de líquido.",
      "A massa de batata deve estar bem seca para não rachar."
    ]
  },
  {
    id: 3,
    nome: "Risole Meia Lua",
    formato: "risole",
    massa: "Crocante",
    peso: 50,
    maquina: "Inox Supreme",
    bico: "Risole 30mm",
    proporcaoMassa: 60,
    proporcaoRecheio: 40,
    imagem: "/images/risole_meia_lua.jpeg",
    ingredientes: [
      { item: "Farinha de trigo", quantidade: "500g" },
      { item: "Água morna", quantidade: "250ml" },
      { item: "Margarina", quantidade: "50g" },
      { item: "Queijo mussarela", quantidade: "300g" },
      { item: "Alho picado", quantidade: "3 dentes" }
    ],
    modoPreparo: [
      "Misture a farinha, água morna e margarina até obter massa lisa.",
      "Combine queijo ralado com alho picado e temperos.",
      "Configure a Inox Supreme com bico Risole 30mm.",
      "Mantenha a massa em temperatura ambiente durante a produção."
    ],
    dicas: [
      "O risole aceita recheios mais úmidos que a coxinha.",
      "Use a Inox Supreme para produção contínua em maior escala."
    ]
  },
  {
    id: 4,
    nome: "Risole Travesseiro",
    formato: "risole",
    massa: "Crocante",
    peso: 55,
    maquina: "Inox Supreme",
    bico: "Risole 30mm",
    proporcaoMassa: 60,
    proporcaoRecheio: 40,
    imagem: "/images/risole_tracesseiro.jpeg",
    ingredientes: [
      { item: "Farinha de trigo", quantidade: "500g" },
      { item: "Água morna", quantidade: "250ml" },
      { item: "Margarina", quantidade: "50g" },
      { item: "Presunto", quantidade: "200g" },
      { item: "Queijo prato", quantidade: "200g" }
    ],
    modoPreparo: [
      "Prepare a massa misturando farinha, água e margarina.",
      "Recheie com fatias de presunto e queijo.",
      "Configure a Inox Supreme no formato travesseiro.",
      "Empane e frite a 180°C até dourar."
    ],
    dicas: [
      "O formato travesseiro é ideal para recheios fatiados.",
      "Pressione bem as bordas para não abrir durante a fritura."
    ]
  },
  {
    id: 5,
    nome: "Bolinho de Bacalhau",
    formato: "bolinha",
    massa: "Batata",
    peso: 40,
    maquina: "Black Mix",
    bico: "Bolinha 18mm",
    proporcaoMassa: 65,
    proporcaoRecheio: 35,
    imagem: "/images/bolinh_bacalhau.jpeg",
    ingredientes: [
      { item: "Batata cozida", quantidade: "800g" },
      { item: "Bacalhau desfiado", quantidade: "400g" },
      { item: "Salsinha", quantidade: "q.s." },
      { item: "Cebola", quantidade: "1 unidade" },
      { item: "Ovo", quantidade: "2 unidades" }
    ],
    modoPreparo: [
      "Amasse a batata ainda quente e misture o bacalhau dessalgado.",
      "Adicione salsinha e cebola picados.",
      "Use a Black Mix com bico Bolinha 18mm.",
      "Produza em lotes e congele imediatamente."
    ],
    dicas: [
      "Dessalgue o bacalhau por 24h trocando a água a cada 8h.",
      "Frite direto do congelador a 180°C."
    ]
  },
  {
    id: 6,
    nome: "Bolinho de Feijoada",
    formato: "bolinha",
    massa: "Mandioca",
    peso: 45,
    maquina: "Black Mix",
    bico: "Bolinha 18mm",
    proporcaoMassa: 60,
    proporcaoRecheio: 40,
    imagem: "/images/bolinho_feijoada.jpeg",
    ingredientes: [
      { item: "Mandioca cozida", quantidade: "700g" },
      { item: "Feijão preto cozido", quantidade: "300g" },
      { item: "Carne de porco desfiada", quantidade: "200g" },
      { item: "Temperos a gosto", quantidade: "q.s." }
    ],
    modoPreparo: [
      "Amasse a mandioca e misture o feijão amassado.",
      "Refogue a carne de porco com temperos.",
      "Configure a Black Mix com bico Bolinha 18mm.",
      "Frite a 180°C até dourar."
    ],
    dicas: [
      "O feijão preto amassado dá liga à massa de mandioca.",
      "Sirva com molho de pimenta e laranja."
    ]
  },
  {
    id: 7,
    nome: "Enroladinho de Salsicha",
    formato: "enroladinho",
    massa: "Crocante",
    peso: 35,
    maquina: "Black Mix",
    bico: "Enroladinho 20mm",
    proporcaoMassa: 55,
    proporcaoRecheio: 45,
    imagem: "/images/enroladinho_salsicha.jpeg",
    ingredientes: [
      { item: "Farinha de trigo", quantidade: "500g" },
      { item: "Água morna", quantidade: "200ml" },
      { item: "Salsicha", quantidade: "500g" },
      { item: "Fermento biológico", quantidade: "10g" }
    ],
    modoPreparo: [
      "Prepare a massa com farinha, água e fermento.",
      "Deixe descansar por 20 minutos.",
      "Enrole a salsicha na massa.",
      "Asse a 200°C por 20 minutos ou frite a 180°C."
    ],
    dicas: [
      "O fermento deixa a massa mais leve e crocante.",
      "Pincele com gema antes de assar para dourar."
    ]
  },
  {
    id: 8,
    nome: "Enroladinho Assado",
    formato: "enroladinho",
    massa: "Crocante",
    peso: 35,
    maquina: "Black Mix",
    bico: "Enroladinho 20mm",
    proporcaoMassa: 55,
    proporcaoRecheio: 45,
    imagem: "/images/enroladinho_salsicha_assado.jpeg",
    ingredientes: [
      { item: "Farinha de trigo", quantidade: "500g" },
      { item: "Manteiga", quantidade: "100g" },
      { item: "Salsicha", quantidade: "500g" },
      { item: "Queijo parmesão", quantidade: "50g" }
    ],
    modoPreparo: [
      "Prepare a massa folhada com farinha e manteiga.",
      "Enrole a salsicha e polvilhe parmesão.",
      "Asse a 200°C por 25 minutos até dourar."
    ],
    dicas: [
      "A versão assada tem menos gordura que a frita.",
      "O parmesão cria uma crosta crocante e saborosa."
    ]
  },
  {
    id: 9,
    nome: "Esfirra",
    formato: "esfirra",
    massa: "Fermentada",
    peso: 70,
    maquina: "Black Inox",
    bico: "Esfirra 35mm",
    proporcaoMassa: 60,
    proporcaoRecheio: 40,
    imagem: "/images/esfirra.jpeg",
    ingredientes: [
      { item: "Farinha de trigo", quantidade: "600g" },
      { item: "Fermento biológico", quantidade: "15g" },
      { item: "Carne moída", quantidade: "400g" },
      { item: "Tomate", quantidade: "2 unidades" },
      { item: "Cebola", quantidade: "1 unidade" }
    ],
    modoPreparo: [
      "Prepare a massa com fermento e deixe crescer por 1 hora.",
      "Tempere a carne com tomate, cebola e limão.",
      "Modele as esfirras e recheie.",
      "Asse a 200°C por 20 minutos."
    ],
    dicas: [
      "A massa deve dobrar de volume antes de modelar.",
      "O recheio de carne deve estar frio para não murchar a massa."
    ]
  },
  {
    id: 10,
    nome: "Mini Pastéis",
    formato: "pastel",
    massa: "Crocante",
    peso: 30,
    maquina: "Black Mix",
    bico: "Pastel 25mm",
    proporcaoMassa: 55,
    proporcaoRecheio: 45,
    imagem: "/images/mini_pasteis.jpeg",
    ingredientes: [
      { item: "Farinha de trigo", quantidade: "500g" },
      { item: "Água", quantidade: "200ml" },
      { item: "Cachaça", quantidade: "1 colher" },
      { item: "Queijo e presunto", quantidade: "300g" }
    ],
    modoPreparo: [
      "Prepare a massa com farinha, água e cachaça (deixa crocante).",
      "Abra fino e recheie.",
      "Feche bem as bordas com garfo.",
      "Frite em óleo bem quente a 190°C."
    ],
    dicas: [
      "A cachaça na massa é o segredo do pastel crocante.",
      "Óleo muito quente sela a massa rapidamente."
    ]
  }
]
