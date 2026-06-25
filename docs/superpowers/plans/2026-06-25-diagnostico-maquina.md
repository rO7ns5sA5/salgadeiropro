# Diagnóstico de Máquina + Biblioteca de Problemas — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Adicionar dois módulos interligados de suporte técnico offline: árvore de decisão guiada para diagnosticar problemas de máquina e biblioteca pesquisável de artigos técnicos.

**Architecture:** Árvore de decisão estática em `src/data/diagnostico.js` com nós do tipo `pergunta` ou `solucao`. `Diagnostico.jsx` gerencia o estado de navegação (nó atual, histórico, máquina selecionada) e delega render para 4 sub-componentes focados. Biblioteca é separada mas acessível via link ao final de cada solução.

**Tech Stack:** React 19, react-router-dom v6, Tailwind CSS, sem novas dependências.

## Global Constraints

- Paleta: gold `#C9932A`, navy `#0B1729`, fundo `#FAFAFA`, cards `#FFFFFF`, bordas `#E5E5E5`
- Sem imagens externas — apenas emojis e gradientes CSS
- Sem novas dependências npm
- `px-4` mínimo em todo conteúdo scrollável, `paddingBottom: 80` para não ficar atrás do BottomNav
- Todos os cards com `borderRadius: 16` e `boxShadow: '0 2px 8px rgba(0,0,0,0.06)'`
- Spec: `docs/superpowers/specs/2026-06-25-diagnostico-maquina-design.md`

---

## Task 1: Dados — `src/data/diagnostico.js`

**Files:**
- Create: `src/data/diagnostico.js`

**Interfaces:**
- Produces: `diagnostico` (object com chave por maquinaId), `biblioteca` (array de artigos)
- `diagnostico.maquinas[id].arvore.raiz` → string ID do nó inicial
- `diagnostico.maquinas[id].arvore.nos[id]` → `{ pergunta, opcoes }` ou `{ solucao }`
- `opcoes[n]` → `{ texto: string, proximo: string }`
- `solucao` → `{ titulo, passos: string[], alerta?: string, biblioteca: string[] }`
- `biblioteca[n]` → `{ id, titulo, maquinas: string[], categoria, resumo, conteudo }`

- [ ] **Step 1: Criar o arquivo com estrutura completa para Pop 4.0 e entradas de biblioteca**

```js
// src/data/diagnostico.js

export const diagnostico = {
  maquinas: {
    pop40: {
      nome: 'Pop 4.0',
      emoji: '⚙️',
      arvore: {
        raiz: 'q_sintoma',
        nos: {
          q_sintoma: {
            pergunta: 'Qual é o problema principal?',
            opcoes: [
              { texto: 'Salgado saindo com peso irregular',  proximo: 'q_peso_quando' },
              { texto: 'Bico entupindo durante a produção',  proximo: 'q_bico_causa' },
              { texto: 'Salgado rachando ou abrindo',        proximo: 'q_racha_onde' },
              { texto: 'Barulho estranho na máquina',        proximo: 'q_ruido_tipo' },
            ],
          },

          // Ramo: Peso irregular
          q_peso_quando: {
            pergunta: 'O peso irregular acontece desde o início do lote ou piorou com o tempo?',
            opcoes: [
              { texto: 'Desde o início do lote',    proximo: 'sol_calibragem' },
              { texto: 'Piorou durante a produção', proximo: 'q_peso_funil' },
            ],
          },
          q_peso_funil: {
            pergunta: 'O funil de massa ou recheio está ficando vazio durante a produção?',
            opcoes: [
              { texto: 'Sim, um dos funis esvazia rápido', proximo: 'sol_funil_vazio' },
              { texto: 'Não, ambos ficam cheios',          proximo: 'sol_bico_desgaste' },
            ],
          },
          sol_calibragem: {
            solucao: {
              titulo: 'Recalibrar fluxo de massa e recheio',
              passos: [
                'Desligue a máquina e aguarde 30 segundos.',
                'Zere os potenciômetros de massa e recheio (gire no sentido anti-horário até o fim).',
                'Ligue novamente e ajuste o fluxo de massa para 70%.',
                'Ajuste o fluxo de recheio para 60%.',
                'Produza 10 unidades de teste e pese cada uma.',
                'Ajuste em incrementos de 5% até o peso estar dentro da faixa desejada.',
              ],
              alerta: '⚠️ Desligue a máquina antes de ajustar os potenciômetros.',
              biblioteca: ['calibragem-pop40', 'peso-irregular-causas'],
            },
          },
          sol_funil_vazio: {
            solucao: {
              titulo: 'Manter funis sempre abastecidos',
              passos: [
                'Reabasteca o funil que está esvaziando.',
                'Mantenha sempre pelo menos 1/3 do funil cheio durante a produção.',
                'Evite bolsas de ar ao colocar a massa — pressione levemente para baixo.',
                'Para produções longas, designar uma pessoa só para abastecer os funis.',
              ],
              biblioteca: ['funil-abastecimento'],
            },
          },
          sol_bico_desgaste: {
            solucao: {
              titulo: 'Inspecionar e substituir o bico',
              passos: [
                'Desligue a máquina.',
                'Remova o bico com cuidado (gire no sentido anti-horário).',
                'Inspecione o bico: verifique desgaste, entupimentos ou deformações.',
                'Se estiver desgastado ou deformado, substitua por bico novo do mesmo tamanho.',
                'Se estiver sujo, limpe com água morna e escova de cerdas macias.',
                'Recoloque o bico e teste com 5 unidades antes de retomar a produção.',
              ],
              alerta: '⚠️ Nunca use instrumentos metálicos para limpar o bico — pode danificar a rosca.',
              biblioteca: ['bico-manutencao'],
            },
          },

          // Ramo: Bico entupindo
          q_bico_causa: {
            pergunta: 'Como é o recheio que está usando?',
            opcoes: [
              { texto: 'Recheio com pedaços (carne, legumes)', proximo: 'sol_recheio_pedacos' },
              { texto: 'Recheio cremoso ou pastoso',           proximo: 'q_bico_viscosidade' },
            ],
          },
          q_bico_viscosidade: {
            pergunta: 'O recheio está muito grosso ou muito fluido?',
            opcoes: [
              { texto: 'Muito grosso, difícil de fluir',  proximo: 'sol_recheio_grosso' },
              { texto: 'Parece normal, nem grosso nem fino', proximo: 'sol_bico_limpar' },
            ],
          },
          sol_recheio_pedacos: {
            solucao: {
              titulo: 'Processar o recheio antes de usar',
              passos: [
                'Retire o recheio da máquina.',
                'Passe o recheio no processador ou pique os pedaços manualmente até ficarem menores que 5mm.',
                'Recoloque o recheio e retome a produção.',
                'Para recheios futuros, sempre processar os pedaços antes de colocar na máquina.',
              ],
              biblioteca: ['recheio-viscosidade', 'bico-entupindo-causas'],
            },
          },
          sol_recheio_grosso: {
            solucao: {
              titulo: 'Ajustar a consistência do recheio',
              passos: [
                'Retire o recheio da máquina.',
                'Aqueça levemente (até 15°C) para amolecer — nunca coloque recheio quente.',
                'Se necessário, adicione uma pequena quantidade de líquido (caldo, requeijão) para fluidificar.',
                'A viscosidade ideal: o recheio deve escorrer devagar ao inclinar o recipiente.',
                'Recoloque e retome a produção.',
              ],
              biblioteca: ['recheio-viscosidade'],
            },
          },
          sol_bico_limpar: {
            solucao: {
              titulo: 'Limpar o bico e verificar resíduos',
              passos: [
                'Desligue a máquina.',
                'Remova o bico (gire no sentido anti-horário).',
                'Mergulhe o bico em água morna por 5 minutos.',
                'Use escova de cerdas macias para remover resíduos internos.',
                'Verifique se há amassados ou deformações no bocal.',
                'Seque completamente antes de remontar.',
              ],
              alerta: '⚠️ Nunca use instrumentos metálicos para limpar internamente o bico.',
              biblioteca: ['bico-manutencao', 'bico-entupindo-causas'],
            },
          },

          // Ramo: Salgado rachando
          q_racha_onde: {
            pergunta: 'Onde o salgado está rachando?',
            opcoes: [
              { texto: 'No bico (ponta) da coxinha',  proximo: 'sol_racha_bico_recheio' },
              { texto: 'Nas bordas ou laterais',       proximo: 'sol_racha_borda_massa' },
              { texto: 'Só racha na fritura',          proximo: 'q_racha_fritura' },
            ],
          },
          q_racha_fritura: {
            pergunta: 'O recheio está quente quando você coloca na máquina?',
            opcoes: [
              { texto: 'Sim, recheio saiu quente do fogo', proximo: 'sol_recheio_quente' },
              { texto: 'Não, recheio estava frio',         proximo: 'sol_empanamento_fritura' },
            ],
          },
          sol_racha_bico_recheio: {
            solucao: {
              titulo: 'Recheio quente ou excesso de recheio no bico',
              passos: [
                'Verifique a temperatura do recheio — deve estar entre 5°C e 15°C.',
                'Se estiver quente, retire e resfrie o recheio antes de continuar.',
                'Reduza o fluxo de recheio em 5% no potenciômetro.',
                'Verifique se o bico está apertado corretamente (gire no sentido horário até firmar).',
              ],
              biblioteca: ['coxinha-rachando', 'recheio-temperatura'],
            },
          },
          sol_racha_borda_massa: {
            solucao: {
              titulo: 'Massa ressecada ou hidratação incorreta',
              passos: [
                'Verifique a hidratação da massa: deve estar entre 60–65% para mandioca.',
                'Se a massa estiver seca ao toque, adicione um pouco de líquido e sove até incorporar.',
                'A massa não deve grudar nas mãos, mas também não deve rachar ao dobrar.',
                'Certifique-se de que a massa está morna (não fria) ao colocar na máquina.',
              ],
              biblioteca: ['massa-hidratacao', 'coxinha-rachando'],
            },
          },
          sol_recheio_quente: {
            solucao: {
              titulo: 'Resfrie o recheio antes de usar',
              passos: [
                'Retire todo o recheio quente da máquina imediatamente.',
                'Espalhe o recheio em bandeja e leve à geladeira por pelo menos 20 minutos.',
                'O recheio deve estar entre 5°C e 15°C antes de ir para a máquina.',
                'Recheio quente cozinha a massa de dentro para fora, causando rachaduras na fritura.',
              ],
              alerta: '⚠️ Nunca use recheio quente — além de rachar, pode contaminar a produção.',
              biblioteca: ['recheio-temperatura', 'coxinha-rachando'],
            },
          },
          sol_empanamento_fritura: {
            solucao: {
              titulo: 'Verificar empanamento e temperatura do óleo',
              passos: [
                'Certifique-se de que o salgado foi empanado corretamente (slurry + farinha de rosca).',
                'Verifique a temperatura do óleo: deve estar entre 180°C–185°C para coxinha.',
                'Não encha demais a fritadeira — máximo 1/3 de salgados para 2/3 de óleo.',
                'Salgados congelados devem ir direto do freezer para o óleo (sem descongelar).',
              ],
              biblioteca: ['fritura-temperatura', 'empanamento-basico'],
            },
          },

          // Ramo: Barulho estranho
          q_ruido_tipo: {
            pergunta: 'Como é o barulho?',
            opcoes: [
              { texto: 'Raspagem ou arranhão metálico', proximo: 'sol_ruido_raspagem' },
              { texto: 'Vibração ou barulho do motor',  proximo: 'sol_ruido_motor' },
              { texto: 'Clique ou estalido ao ciclar',  proximo: 'sol_ruido_clique' },
            ],
          },
          sol_ruido_raspagem: {
            solucao: {
              titulo: 'Verificar bico e componentes internos',
              passos: [
                'Desligue a máquina imediatamente.',
                'Remova o bico e inspecione se está torto ou mal encaixado.',
                'Verifique se há resíduos de massa endurecida dentro do cabeçote.',
                'Limpe internamente com espátula de plástico e pano úmido.',
                'Se o ruído persistir após limpeza, entre em contato com a assistência Compacta Print.',
              ],
              alerta: '⚠️ Não opere a máquina com barulho de raspagem — pode danificar engrenagens.',
              biblioteca: ['manutencao-preventiva'],
            },
          },
          sol_ruido_motor: {
            solucao: {
              titulo: 'Verificar sobrecarga do motor',
              passos: [
                'Desligue a máquina e aguarde 5 minutos para esfriar.',
                'Verifique se a massa está muito fria ou dura — isso sobrecarrega o motor.',
                'A massa deve estar morna (não gelada) ao entrar na máquina.',
                'Reduza a velocidade de produção temporariamente.',
                'Se o barulho persistir, entre em contato com a assistência técnica.',
              ],
              alerta: '⚠️ Motores da Pop 4.0 têm garantia de 5 anos — não tente reparar internamente.',
              biblioteca: ['manutencao-preventiva'],
            },
          },
          sol_ruido_clique: {
            solucao: {
              titulo: 'Verificar mandíbula de corte',
              passos: [
                'Desligue a máquina.',
                'Inspecione a mandíbula de corte — verifique se está bem encaixada.',
                'Gire a mandíbula no sentido horário para firmar o encaixe.',
                'Verifique se há resíduos de massa travando o movimento.',
                'Limpe a área da mandíbula com pano úmido e reencaixe.',
              ],
              biblioteca: ['manutencao-preventiva'],
            },
          },
        },
      },
    },

    blackmix: {
      nome: 'Black Mix',
      emoji: '🖤',
      arvore: {
        raiz: 'q_sintoma',
        nos: {
          q_sintoma: {
            pergunta: 'Qual é o problema principal?',
            opcoes: [
              { texto: 'Salgado saindo com peso irregular',  proximo: 'sol_calibragem_black' },
              { texto: 'Bico solto durante a produção',      proximo: 'sol_bico_solto' },
              { texto: 'Formatos misturados na saída',       proximo: 'sol_purga' },
              { texto: 'Doces grudando na mandíbula',        proximo: 'sol_mandibula_doce' },
            ],
          },
          sol_calibragem_black: {
            solucao: {
              titulo: 'Recalibrar potenciômetros da Black Mix',
              passos: [
                'Desligue a máquina.',
                'Os 4 potenciômetros controlam: massa, recheio, corte e parada.',
                'Zere todos (gire anti-horário até o fim).',
                'Ajuste massa para 72%, recheio para 58%.',
                'Ajuste corte e parada conforme o formato sendo produzido.',
                'Teste com 10 unidades antes de retomar.',
              ],
              alerta: '⚠️ Desligue antes de ajustar potenciômetros.',
              biblioteca: ['calibragem-black', 'peso-irregular-causas'],
            },
          },
          sol_bico_solto: {
            solucao: {
              titulo: 'Travar o sistema de encaixe do bico',
              passos: [
                'Desligue a máquina.',
                'Remova o bico completamente.',
                'Limpe a rosca do bico e do cabeçote.',
                'Recoloque o bico e gire no sentido horário até encaixar completamente (você ouvirá um clique).',
                'Teste com a mão antes de ligar: o bico não deve girar livremente.',
              ],
              biblioteca: ['bico-manutencao'],
            },
          },
          sol_purga: {
            solucao: {
              titulo: 'Purgar a máquina ao trocar de bico',
              passos: [
                'Ao trocar de formato, remova o bico antigo completamente.',
                'Limpe o cabeçote com pano úmido.',
                'Instale o novo bico e gire até firmar.',
                'Produza 10 salgados de descarte (purga) até o formato estabilizar.',
                'Só então iniciar a produção oficial do novo formato.',
              ],
              biblioteca: ['troca-formato'],
            },
          },
          sol_mandibula_doce: {
            solucao: {
              titulo: 'Lubrificar a mandíbula para produção de doces',
              passos: [
                'Desligue a máquina.',
                'Aplique uma camada fina de óleo vegetal neutro na mandíbula de corte.',
                'Não use óleo mineral ou lubrificante industrial — apenas óleo alimentar.',
                'Repita a cada 30 minutos durante a produção de doces.',
              ],
              biblioteca: ['manutencao-preventiva'],
            },
          },
        },
      },
    },

    blackinox: {
      nome: 'Black Inox',
      emoji: '⬛',
      arvore: {
        raiz: 'q_sintoma',
        nos: {
          q_sintoma: {
            pergunta: 'Qual é o problema principal?',
            opcoes: [
              { texto: 'Contador digital não registrando', proximo: 'sol_contador' },
              { texto: 'Salgado saindo fora do peso',      proximo: 'sol_calibragem_inox' },
              { texto: 'Bico entupindo frequentemente',    proximo: 'sol_bico_inox' },
            ],
          },
          sol_contador: {
            solucao: {
              titulo: 'Resetar e verificar sensor de contagem',
              passos: [
                'Desligue a máquina.',
                'Localize o botão de reset lateral e pressione por 3 segundos.',
                'Religue a máquina.',
                'Se o contador continuar sem registrar, verifique se há massa obstruindo o sensor.',
                'Limpe o sensor com pano seco (não use água).',
                'Se o problema persistir, entre em contato com a assistência técnica.',
              ],
              biblioteca: ['manutencao-preventiva'],
            },
          },
          sol_calibragem_inox: {
            solucao: {
              titulo: 'Ajustar potenciômetro de massa em incrementos',
              passos: [
                'Desligue a máquina.',
                'Ajuste o potenciômetro de massa em incrementos de 5% até estabilizar.',
                'Produza 5 unidades, pese todas e calcule a média.',
                'Continue ajustando em 5% até atingir o peso desejado.',
                'Anote o valor final para referência futura.',
              ],
              alerta: '⚠️ Desligue antes de ajustar.',
              biblioteca: ['calibragem-black', 'peso-irregular-causas'],
            },
          },
          sol_bico_inox: {
            solucao: {
              titulo: 'Reduzir pedaços no recheio e ajustar fluxo',
              passos: [
                'Reduza os pedaços do recheio para menos de 5mm.',
                'Diminua o fluxo de recheio em 10% no potenciômetro.',
                'Verifique se o recheio está na viscosidade correta (escorre devagar).',
                'Limpe o bico conforme o procedimento padrão.',
              ],
              biblioteca: ['recheio-viscosidade', 'bico-manutencao'],
            },
          },
        },
      },
    },

    inoxsupreme: {
      nome: 'Inox Supreme',
      emoji: '🔩',
      arvore: {
        raiz: 'q_sintoma',
        nos: {
          q_sintoma: {
            pergunta: 'Qual é o problema principal?',
            opcoes: [
              { texto: 'Produção irregular após pausa',     proximo: 'sol_retomada' },
              { texto: 'Aquecimento excessivo da máquina',  proximo: 'sol_aquecimento' },
              { texto: 'Risole abrindo nas bordas',         proximo: 'sol_risole_borda' },
            ],
          },
          sol_retomada: {
            solucao: {
              titulo: 'Protocolo de retomada após pausa',
              passos: [
                'Ao retomar após pausa, nunca use os primeiros salgados.',
                'Descarte as primeiras 20 unidades após retomada — são de estabilização.',
                'Aguarde o fluxo estabilizar antes de iniciar a produção oficial.',
                'Para pausas acima de 5 minutos, é normal haver variação inicial.',
              ],
              biblioteca: ['inox-supreme-operacao'],
            },
          },
          sol_aquecimento: {
            solucao: {
              titulo: 'Reduzir velocidade e verificar ventilação',
              passos: [
                'Reduza a velocidade de produção em 10%.',
                'Verifique se há objetos bloqueando a ventilação ao redor da máquina.',
                'Mantenha pelo menos 20cm de espaço livre em todos os lados.',
                'Se o aquecimento persistir, pare a produção e aguarde 15 minutos.',
                'Retome em velocidade reduzida.',
              ],
              alerta: '⚠️ Operação contínua acima de 4 horas requer limpeza obrigatória.',
              biblioteca: ['inox-supreme-operacao', 'manutencao-preventiva'],
            },
          },
          sol_risole_borda: {
            solucao: {
              titulo: 'Ajustar pressão da mandíbula e verificar massa',
              passos: [
                'Desligue a máquina.',
                'Aumente a pressão da mandíbula em 5% (ajuste no parafuso lateral).',
                'Verifique a umidade da massa: se estiver muito seca, a borda não cola.',
                'Adicione uma pitada de água e sove até homogeneizar.',
                'Teste com 5 unidades antes de retomar.',
              ],
              biblioteca: ['massa-hidratacao'],
            },
          },
        },
      },
    },
  },
}

export const biblioteca = [
  {
    id: 'calibragem-pop40',
    titulo: 'Calibragem completa da Pop 4.0',
    maquinas: ['pop40'],
    categoria: 'Calibragem',
    resumo: 'Passo a passo para calibrar fluxo de massa, recheio e tempo de corte.',
    conteudo: `A calibragem correta é a base de uma produção consistente. Para a Pop 4.0, siga sempre esta sequência:

1. Zere todos os potenciômetros (sentido anti-horário até o fim)
2. Ajuste o fluxo de massa: ponto de partida recomendado é 70%
3. Ajuste o fluxo de recheio: ponto de partida é 60%
4. Ajuste o cortador: 50% para a maioria dos formatos
5. Produza 10 unidades de teste e pese cada uma

Se o peso médio estiver abaixo do desejado, aumente massa em 5%. Se estiver acima, reduza em 5%. Repita até estabilizar.

Para o tempo de corte (TEMPO): use 1 para salgados pequenos (50–60g), 2 para lanchonete (70–90g) e "3 a 4" para salgados grandes (100–150g).`,
  },
  {
    id: 'calibragem-black',
    titulo: 'Calibragem das linhas Black Inox e Black Mix',
    maquinas: ['blackinox', 'blackmix'],
    categoria: 'Calibragem',
    resumo: 'Como usar os 4 potenciômetros digitais para controle preciso de peso.',
    conteudo: `As linhas Black utilizam potenciômetros digitais com escala de 0 a 100. O painel tem 4 controles independentes:

- **Massa:** controla o volume de massa por ciclo
- **Recheio:** controla o volume de recheio por ciclo
- **Corte:** determina a velocidade da mandíbula de corte
- **Parada:** pausa entre ciclos (útil para produções manuais)

Pontos de partida recomendados:
- Black Mix: Massa 72%, Recheio 58%
- Black Inox: Massa 80%, Recheio 65%

Para o tempo (escala 10/20/30): use 10 para festa, 20 para lanchonete, 30 para salgados grandes.`,
  },
  {
    id: 'peso-irregular-causas',
    titulo: 'Por que o peso varia entre unidades?',
    maquinas: ['pop40', 'blackmix', 'blackinox', 'inoxsupreme'],
    categoria: 'Calibragem',
    resumo: 'As 5 causas mais comuns de variação de peso e como corrigir cada uma.',
    conteudo: `Variação de peso é o problema mais relatado pelos operadores. As causas mais comuns são:

1. **Funil não abastecido uniformemente:** a cada abastecimento, o nível muda e a pressão varia. Mantenha sempre acima de 1/3.

2. **Massa com temperatura inconsistente:** massa muito fria fica mais densa e flui menos. Certifique-se de que está morna (não gelada).

3. **Bolsas de ar no funil:** ao colocar massa, pressione para eliminar ar. Bolsas causam variação de ciclo a ciclo.

4. **Desgaste do bico:** bicos desgastados têm abertura irregular. Inspecione a cada 200kg produzidos.

5. **Potenciômetros fora de calibração:** recalibre sempre que trocar de lote de massa ou recheio.`,
  },
  {
    id: 'bico-manutencao',
    titulo: 'Manutenção e limpeza correta dos bicos',
    maquinas: ['pop40', 'blackmix', 'blackinox', 'inoxsupreme'],
    categoria: 'Manutenção',
    resumo: 'Como limpar, inspecionar e quando substituir bicos da Compacta Print.',
    conteudo: `Os bicos são peças de desgaste e precisam de atenção diária.

**Limpeza diária:**
- Remova o bico após cada jornada de produção
- Mergulhe em água morna por 10 minutos
- Use escova de cerdas macias para remover resíduos internos
- Seque completamente antes de armazenar ou remontar
- **Nunca use instrumentos metálicos internamente**

**Inspeção semanal:**
- Verifique deformações na abertura do bocal
- Confirme que a rosca está íntegra (sem amassados)
- Meça visualmente a abertura: deve ser simétrica

**Quando substituir:**
- Variação de peso superior a ±5g mesmo após calibragem
- Bocal visivelmente deformado ou com lascas
- Rosca danificada que não encaixa corretamente`,
  },
  {
    id: 'recheio-viscosidade',
    titulo: 'Viscosidade ideal do recheio para cada máquina',
    maquinas: ['pop40', 'blackmix', 'blackinox', 'inoxsupreme'],
    categoria: 'Massa e Recheio',
    resumo: 'Como identificar e ajustar a consistência do recheio para evitar entupimentos.',
    conteudo: `A viscosidade do recheio afeta diretamente o fluxo na máquina. O teste mais simples: incline o recipiente do recheio — ele deve escorrer lentamente (não imediatamente).

**Muito fluido:** o recheio escorre rápido e pode vazar pelo bico. Espesse com amido de milho ou roux.

**Ideal:** escorre devagar ao inclinar o recipiente. Mantém forma mas não é rígido.

**Muito grosso:** não escorre ao inclinar. Aqueça levemente (até 15°C) ou adicione líquido aos poucos.

**Temperatura ideal durante a produção:** 10°C–15°C. Recheio mais quente fica mais fluido (pode vazar); mais frio fica mais grosso (pode entupir).

**Pedaços no recheio:** nunca acima de 5mm para os bicos padrão.`,
  },
  {
    id: 'recheio-temperatura',
    titulo: 'Por que o recheio deve estar frio?',
    maquinas: ['pop40', 'blackmix', 'blackinox', 'inoxsupreme'],
    categoria: 'Massa e Recheio',
    resumo: 'O impacto da temperatura do recheio na qualidade do salgado.',
    conteudo: `Recheio quente é uma das causas mais comuns de salgados rachando e defeitos na modelagem.

**O que acontece com recheio quente:**
- Cozinha a massa de dentro para fora durante a modelagem
- A expansão térmica do recheio racha a massa após a modelagem
- Na fritura, a diferença de temperatura causa estouros violentos

**Temperatura ideal:** entre 5°C e 15°C.

**Como resfriar rapidamente:**
- Espalhe em bandeja rasa e leve à geladeira por 20–30 minutos
- Mexa durante o resfriamento para acelerar o processo
- Nunca coloque recheio quente direto no freezer (forma cristais)

**Temperatura ambiente:** em dias quentes, o recheio aquece rápido durante a produção. Divida em porções menores e mantenha o estoque na geladeira.`,
  },
  {
    id: 'coxinha-rachando',
    titulo: 'Coxinha rachando: diagnóstico completo',
    maquinas: ['pop40', 'blackmix', 'blackinox', 'inoxsupreme'],
    categoria: 'Massa e Recheio',
    resumo: 'Guia completo para identificar por que a coxinha está rachando e como corrigir.',
    conteudo: `Coxinha rachando é um dos problemas mais relatados. As causas são diferentes dependendo de QUANDO e ONDE acontece.

**Racha no bico (ponta) durante a modelagem:**
→ Recheio quente ou excesso de recheio. Resfrie o recheio e reduza o fluxo em 5%.

**Racha nas bordas durante a modelagem:**
→ Massa ressecada ou hidratação incorreta. Verifique a hidratação (60–65% para mandioca).

**Racha só na fritura:**
→ Empanamento incorreto, temperatura do óleo muito alta, ou recheio com muita água livre.

**Racha no congelamento:**
→ Massa com pouca gordura (adicione margarina), congelamento lento (congele em aberto individualmente), ou recheio muito úmido.`,
  },
  {
    id: 'massa-hidratacao',
    titulo: 'Hidratação correta da massa para cada tipo de salgado',
    maquinas: ['pop40', 'blackmix', 'blackinox', 'inoxsupreme'],
    categoria: 'Massa e Recheio',
    resumo: 'Proporções de hidratação para massa de mandioca, batata e trigo.',
    conteudo: `A hidratação correta da massa é fundamental para a modelagem perfeita.

**Massa de mandioca (coxinha):**
- Hidratação: 60–65%
- A massa deve estar morna ao entrar na máquina
- Não deve grudar nas mãos, mas também não deve rachar ao dobrar
- Descanse por 10 minutos antes de colocar na máquina

**Massa de batata (kibe, bolinha):**
- Hidratação: 55–60%
- Escorra e esprema bem a batata antes de amassar
- Misture uma pequena porção de farinha de trigo para dar liga
- A batata deve estar completamente seca — umidade excessiva causa rachadura

**Massa crocante de trigo (risole, pastel):**
- Hidratação: 50%
- Adicione margarina para plasticidade (4–6% sobre o peso da farinha)
- Descanse coberta por 15 minutos antes de usar`,
  },
  {
    id: 'fritura-temperatura',
    titulo: 'Temperatura correta do óleo para cada tipo de salgado',
    maquinas: ['pop40', 'blackmix', 'blackinox', 'inoxsupreme'],
    categoria: 'Fritura',
    resumo: 'Guia de temperaturas de fritura para salgados frescos e congelados.',
    conteudo: `A temperatura do óleo é crítica. Baixo demais encharca; alto demais queima por fora e deixa frio por dentro.

**Salgado pequeno (festa, até 25g) — fresco:**
- 170°C–180°C por 3–4 minutos

**Salgado pequeno (festa) — congelado:**
- 160°C–170°C por 5–6 minutos (direto do freezer, sem descongelar)

**Salgado médio (60g–90g) — congelado:**
- 155°C–165°C por 5–6 minutos

**Salgado grande (lanchonete, 120g+) — congelado:**
- 150°C–160°C por 7–10 minutos (repouso de 15min antes)

**Regra de ocupação:** máximo 1 parte de salgado para 3 partes de óleo. Excesso de salgados derruba a temperatura.

**Óleo ideal:** gordura vegetal hidrogenada ou óleo de algodão/palma. Evite soja (queima rápido).`,
  },
  {
    id: 'empanamento-basico',
    titulo: 'Empanamento profissional: passo a passo',
    maquinas: ['pop40', 'blackmix', 'blackinox', 'inoxsupreme'],
    categoria: 'Fritura',
    resumo: 'Técnica correta de empanamento para crocância duradoura.',
    conteudo: `O empanamento correto faz toda a diferença na crocância e na absorção de óleo.

**Slurry básico (para 1L de água):**
- 100g de farinha de trigo + 40g de amido de milho
- Manter sempre frio (água gelada)

**Passo a passo:**
1. Deixar salgados modelados descansarem 10–15 min
2. Mergulhar no slurry por 1–2 segundos
3. Escorrer o excesso com escumadeira
4. Cobrir completamente na farinha de rosca
5. Bater levemente para remover excesso
6. Descansar 10 min antes de fritar ou congelar

**Regra das duas mãos:** mão esquerda = líquido, mão direita = farinha. Não misture.

**Duplo empanamento:** para bolinhas de queijo e risoles com recheio muito líquido, repita o processo duas vezes.`,
  },
  {
    id: 'funil-abastecimento',
    titulo: 'Abastecimento correto dos funis',
    maquinas: ['pop40', 'blackmix', 'blackinox', 'inoxsupreme'],
    categoria: 'Operação',
    resumo: 'Como abastecer os funis de massa e recheio sem causar variação de peso.',
    conteudo: `O abastecimento incorreto dos funis é uma causa frequente de variação de peso entre unidades.

**Nível mínimo:** mantenha sempre acima de 1/3 do funil. Quando o nível cai, a pressão diminui e o salgado sai mais leve.

**Como abastecer sem parar a produção:**
1. Adicione a massa ou recheio novo em cima do que resta
2. Pressione levemente para eliminar bolsas de ar
3. Não despeje de uma vez — adicione aos poucos para não criar turbulência
4. Para recheio: certifique-se que está na temperatura correta (5–15°C)

**Bolsas de ar:** são o maior inimigo do peso constante. Ao colocar massa no funil, use a mão ou espátula de plástico para pressionar e eliminar as bolsas.

**Organização da produção:** em grandes lotes, designe uma pessoa exclusivamente para abastecer os funis.`,
  },
  {
    id: 'manutencao-preventiva',
    titulo: 'Manutenção preventiva: rotina diária, semanal e mensal',
    maquinas: ['pop40', 'blackmix', 'blackinox', 'inoxsupreme'],
    categoria: 'Manutenção',
    resumo: 'Checklist completo de manutenção para manter a máquina em perfeito estado.',
    conteudo: `Manutenção preventiva evita paradas inesperadas e prolonga a vida útil da máquina.

**Rotina diária (após cada produção):**
- Desmonte e limpe todos os bicos
- Limpe internamente o cabeçote com pano úmido
- Remova resíduos de massa e recheio de todas as superfícies
- Para Inox Supreme e Black Inox: sanitize com álcool 70° após a limpeza

**Rotina semanal:**
- Inspecione o estado dos bicos (desgaste, deformações)
- Verifique o aperto de todos os parafusos externos
- Teste o funcionamento sem carga (ligue em vazio por 30 segundos)
- Verifique se o contador (Black Inox/Mix) está funcionando

**Rotina mensal:**
- Calibragem completa com pesagem de 20 unidades de teste
- Inspeção visual da mandíbula de corte
- Verificação dos potenciômetros (devem girar suavemente)
- Contato com assistência técnica se houver qualquer anomalia

**Garantias Compacta Print:**
- Geral: 1 ano
- Motores: 5 anos
- Engrenagens: 10 anos`,
  },
  {
    id: 'troca-formato',
    titulo: 'Como trocar de formato na Black Mix',
    maquinas: ['blackmix'],
    categoria: 'Operação',
    resumo: 'Procedimento correto para trocar bicos e formatos sem misturar os salgados.',
    conteudo: `A Black Mix é a mais versátil da linha, mas a troca de formato requer procedimento correto.

**Passo a passo para troca de formato:**
1. Finalize o lote atual e desligue a máquina
2. Remova o bico antigo completamente (sentido anti-horário)
3. Limpe o cabeçote com pano úmido — remova todos os resíduos
4. Instale o novo bico e aperte firmemente (sentido horário até o fim)
5. Ajuste os potenciômetros conforme o novo formato (consulte a tabela de calibragem)
6. **Purga obrigatória:** produza e descarte 10 unidades antes de iniciar o lote oficial

**Tabela de bicos por formato:**
- Coxinha: Bico Standard Star 22mm
- Bolinha: Bico 18mm
- Enroladinho: Bico 20mm
- Kibe: Bico 28mm
- Churros: Bico Churros Tradicional

**Importante:** sempre recalibre os potenciômetros ao trocar de formato. Os valores ideais variam por produto.`,
  },
  {
    id: 'inox-supreme-operacao',
    titulo: 'Operação correta da Inox Supreme',
    maquinas: ['inoxsupreme'],
    categoria: 'Operação',
    resumo: 'Particularidades de operação da Inox Supreme para produção contínua.',
    conteudo: `A Inox Supreme é projetada para produção contínua de alta escala. Algumas particularidades importantes:

**Não interrompa o fluxo por mais de 5 minutos:** após pausa longa, a massa no cabeçote pode começar a secar e criar irregularidades. Se precisar parar, desmonte e limpe.

**Protocolo de retomada após pausa:**
- Descarte sempre as primeiras 20 unidades após qualquer pausa
- Aguarde o fluxo estabilizar visualmente antes de iniciar o lote

**Limpeza a cada 4 horas de operação:**
- Mesmo durante a produção, a cada 4 horas faça uma pausa para limpeza rápida
- Remova o bico, limpe o cabeçote, recoloque e retome

**Temperatura ambiente ideal:** abaixo de 20°C. Em dias quentes, o desempenho pode cair.

**Sistema de duplo funil:** permite trocar o recheio sem parar a produção. Use este recurso para maximizar a eficiência em lotes longos.

**Engrenagens em poliacetal:** não exigem lubrificação. Não aplique óleo ou graxa nas engrenagens.`,
  },
]
```

- [ ] **Step 2: Verificar que o arquivo não tem erros de sintaxe**

```bash
cd "A:/Sabor lab - Salgadeiro Pro/SalgadeiroPro_claude"
npm run build 2>&1 | tail -5
```

Esperado: `✓ built in X.XXs` sem erros.

- [ ] **Step 3: Commit**

```bash
git add src/data/diagnostico.js
git commit -m "feat: dados diagnóstico e biblioteca — árvore de decisão por máquina"
```

---

## Task 2: Componente `SeletorMaquina`

**Files:**
- Create: `src/components/diagnostico/SeletorMaquina.jsx`

**Interfaces:**
- Consumes: `diagnostico.maquinas` de `../../data/diagnostico`
- Props: `onSelect: (maquinaId: string) => void`
- Produces: nenhum estado próprio

- [ ] **Step 1: Criar o componente**

```jsx
// src/components/diagnostico/SeletorMaquina.jsx
import { diagnostico } from '../../data/diagnostico'

const GOLD = '#C9932A'

export default function SeletorMaquina({ onSelect }) {
  const maquinas = Object.entries(diagnostico.maquinas)

  return (
    <div className="px-4 pt-4">
      <p className="font-bold text-xl mb-1" style={{ color: '#1A1A1A' }}>
        Qual é a sua máquina?
      </p>
      <p className="text-sm mb-5" style={{ color: '#9CA3AF' }}>
        Selecione para ver diagnósticos específicos do seu modelo
      </p>
      <div className="grid grid-cols-2 gap-3">
        {maquinas.map(([id, m]) => (
          <button
            key={id}
            onClick={() => onSelect(id)}
            className="flex flex-col items-start p-4 rounded-2xl text-left active:scale-95 transition-transform"
            style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #E5E5E5',
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            }}
          >
            <span style={{ fontSize: 28 }}>{m.emoji}</span>
            <p className="font-bold text-sm mt-2" style={{ color: '#1A1A1A' }}>{m.nome}</p>
            <p className="text-xs mt-0.5" style={{ color: '#9CA3AF' }}>Compacta Print</p>
          </button>
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Build para verificar**

```bash
npm run build 2>&1 | tail -5
```

Esperado: sem erros.

- [ ] **Step 3: Commit**

```bash
git add src/components/diagnostico/SeletorMaquina.jsx
git commit -m "feat: componente SeletorMaquina — grid de seleção de modelo"
```

---

## Task 3: Componente `PerguntaNo`

**Files:**
- Create: `src/components/diagnostico/PerguntaNo.jsx`

**Interfaces:**
- Props: `no: { pergunta: string, opcoes: { texto: string, proximo: string }[] }`, `onAvancar: (proximoNo: string) => void`, `onVoltar: () => void`, `podevoltar: boolean`, `progresso: number` (0–1)

- [ ] **Step 1: Criar o componente**

```jsx
// src/components/diagnostico/PerguntaNo.jsx
const GOLD = '#C9932A'

export default function PerguntaNo({ no, onAvancar, onVoltar, podeVoltar, progresso }) {
  return (
    <div className="px-4 pt-4">
      {/* Barra de progresso */}
      <div className="mb-5">
        <div
          className="w-full rounded-full overflow-hidden"
          style={{ height: 4, backgroundColor: '#E5E5E5' }}
        >
          <div
            className="h-full rounded-full transition-all duration-300"
            style={{ width: `${Math.round(progresso * 100)}%`, backgroundColor: GOLD }}
          />
        </div>
        <p className="text-xs mt-1.5" style={{ color: '#9CA3AF' }}>
          Respondendo diagnóstico...
        </p>
      </div>

      {/* Pergunta */}
      <p className="font-bold text-lg mb-5 leading-snug" style={{ color: '#1A1A1A' }}>
        {no.pergunta}
      </p>

      {/* Opções */}
      <div className="space-y-3">
        {no.opcoes.map((op) => (
          <button
            key={op.proximo}
            onClick={() => onAvancar(op.proximo)}
            className="w-full text-left px-4 py-4 rounded-2xl font-medium text-sm active:scale-95 transition-all"
            style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #E5E5E5',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
              color: '#1A1A1A',
            }}
          >
            {op.texto}
          </button>
        ))}
      </div>

      {/* Voltar */}
      {podeVoltar && (
        <button
          onClick={onVoltar}
          className="mt-5 text-sm font-medium"
          style={{ color: '#9CA3AF' }}
        >
          ← Voltar para a pergunta anterior
        </button>
      )}
    </div>
  )
}
```

- [ ] **Step 2: Build**

```bash
npm run build 2>&1 | tail -5
```

- [ ] **Step 3: Commit**

```bash
git add src/components/diagnostico/PerguntaNo.jsx
git commit -m "feat: componente PerguntaNo — perguntas da árvore de decisão"
```

---

## Task 4: Componente `SolucaoCard`

**Files:**
- Create: `src/components/diagnostico/SolucaoCard.jsx`

**Interfaces:**
- Props: `solucao: { titulo: string, passos: string[], alerta?: string, biblioteca: string[] }`, `onReiniciar: () => void`, `onVerBiblioteca: (ids: string[]) => void`

- [ ] **Step 1: Criar o componente**

```jsx
// src/components/diagnostico/SolucaoCard.jsx
const GOLD = '#C9932A'

export default function SolucaoCard({ solucao, onReiniciar, onVerBiblioteca }) {
  return (
    <div className="px-4 pt-4 space-y-4">
      {/* Badge de conclusão */}
      <div
        className="flex items-center gap-2 px-4 py-2.5 rounded-2xl"
        style={{ backgroundColor: '#F0FDF4', border: '1px solid #BBF7D0' }}
      >
        <span style={{ fontSize: 20 }}>✅</span>
        <p className="font-bold text-sm" style={{ color: '#15803D' }}>Diagnóstico concluído</p>
      </div>

      {/* Título da solução */}
      <div
        className="p-4 rounded-2xl"
        style={{ backgroundColor: '#FFFFFF', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', border: '1px solid #F0F0F0' }}
      >
        <p className="font-bold text-base mb-4" style={{ color: '#1A1A1A' }}>
          {solucao.titulo}
        </p>

        {/* Passos numerados */}
        <div className="space-y-3">
          {solucao.passos.map((passo, i) => (
            <div key={i} className="flex gap-3">
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{ backgroundColor: GOLD }}
              >
                <span className="text-xs font-bold text-white">{i + 1}</span>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: '#666666' }}>{passo}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Alerta crítico (opcional) */}
      {solucao.alerta && (
        <div
          className="px-4 py-3 rounded-2xl"
          style={{ backgroundColor: 'rgba(220,38,38,0.06)', border: '1px solid rgba(220,38,38,0.25)' }}
        >
          <p className="text-sm font-medium" style={{ color: '#DC2626' }}>{solucao.alerta}</p>
        </div>
      )}

      {/* Link para Biblioteca */}
      {solucao.biblioteca?.length > 0 && (
        <button
          onClick={() => onVerBiblioteca(solucao.biblioteca)}
          className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl font-semibold text-sm"
          style={{
            backgroundColor: '#FFFFFF',
            border: `1.5px solid ${GOLD}`,
            color: GOLD,
          }}
        >
          📚 Ver artigos relacionados
        </button>
      )}

      {/* Reiniciar */}
      <button
        onClick={onReiniciar}
        className="w-full py-3.5 rounded-2xl font-semibold text-sm"
        style={{ backgroundColor: GOLD, color: '#FFFFFF' }}
      >
        Novo diagnóstico
      </button>
    </div>
  )
}
```

- [ ] **Step 2: Build**

```bash
npm run build 2>&1 | tail -5
```

- [ ] **Step 3: Commit**

```bash
git add src/components/diagnostico/SolucaoCard.jsx
git commit -m "feat: componente SolucaoCard — exibe solução com passos e links"
```

---

## Task 5: Componente `Biblioteca`

**Files:**
- Create: `src/components/diagnostico/Biblioteca.jsx`

**Interfaces:**
- Props: `maquinaId: string | null`, `filtroIds: string[] | null` (pré-filtro vindo de SolucaoCard), `onLimparFiltro: () => void`
- Consumes: `biblioteca` de `../../data/diagnostico`

- [ ] **Step 1: Criar o componente**

```jsx
// src/components/diagnostico/Biblioteca.jsx
import { useState } from 'react'
import { Search } from 'lucide-react'
import { biblioteca } from '../../data/diagnostico'

const GOLD = '#C9932A'

export default function Biblioteca({ maquinaId, filtroIds, onLimparFiltro }) {
  const [busca, setBusca] = useState('')

  // Aplica filtros
  const artigos = biblioteca.filter((a) => {
    if (filtroIds) return filtroIds.includes(a.id)
    if (maquinaId && !a.maquinas.includes(maquinaId)) return false
    if (busca) {
      const q = busca.toLowerCase()
      return a.titulo.toLowerCase().includes(q) || a.resumo.toLowerCase().includes(q)
    }
    return true
  })

  // Agrupa por categoria
  const categorias = [...new Set(artigos.map((a) => a.categoria))]

  return (
    <div className="px-4 pt-4">
      {/* Filtro ativo (vindo de SolucaoCard) */}
      {filtroIds && (
        <div
          className="flex items-center justify-between mb-4 px-3 py-2 rounded-xl"
          style={{ backgroundColor: '#FEF8EC', border: `1px solid ${GOLD}30` }}
        >
          <p className="text-xs font-medium" style={{ color: GOLD }}>
            📚 Artigos relacionados ao diagnóstico
          </p>
          <button
            onClick={onLimparFiltro}
            className="text-xs"
            style={{ color: '#9CA3AF' }}
          >
            Ver todos
          </button>
        </div>
      )}

      {/* Busca (só aparece sem filtroIds) */}
      {!filtroIds && (
        <div
          className="flex items-center gap-2 px-3 rounded-xl mb-4"
          style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5', height: 44 }}
        >
          <Search size={16} color="#9CA3AF" />
          <input
            type="text"
            placeholder="Buscar problema ou solução..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="flex-1 bg-transparent outline-none text-sm"
            style={{ color: '#1A1A1A' }}
          />
        </div>
      )}

      {/* Lista por categoria */}
      {categorias.length === 0 ? (
        <div className="flex flex-col items-center py-12">
          <span style={{ fontSize: 40 }}>🔍</span>
          <p className="text-sm mt-3" style={{ color: '#9CA3AF' }}>
            Nenhum artigo encontrado
          </p>
        </div>
      ) : (
        <div className="space-y-5 pb-4">
          {categorias.map((cat) => (
            <div key={cat}>
              <p className="text-xs font-bold uppercase tracking-wide mb-2" style={{ color: '#9CA3AF' }}>
                {cat}
              </p>
              <div className="space-y-2">
                {artigos
                  .filter((a) => a.categoria === cat)
                  .map((artigo) => (
                    <ArtigoCard key={artigo.id} artigo={artigo} />
                  ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function ArtigoCard({ artigo }) {
  const [aberto, setAberto] = useState(false)

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{ backgroundColor: '#FFFFFF', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', border: '1px solid #F0F0F0' }}
    >
      <button
        className="w-full flex items-start justify-between gap-3 p-4 text-left"
        onClick={() => setAberto((v) => !v)}
      >
        <div className="flex-1">
          <p className="font-semibold text-sm" style={{ color: '#1A1A1A' }}>{artigo.titulo}</p>
          <p className="text-xs mt-0.5 leading-snug" style={{ color: '#9CA3AF' }}>{artigo.resumo}</p>
        </div>
        <span style={{ color: '#9CA3AF', fontSize: 18, transform: aberto ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }}>
          ›
        </span>
      </button>
      {aberto && (
        <div
          className="px-4 pb-4"
          style={{ borderTop: '1px solid #F5F5F5' }}
        >
          <p className="text-sm leading-relaxed whitespace-pre-line mt-3" style={{ color: '#666666' }}>
            {artigo.conteudo}
          </p>
        </div>
      )}
    </div>
  )
}
```

- [ ] **Step 2: Build**

```bash
npm run build 2>&1 | tail -5
```

- [ ] **Step 3: Commit**

```bash
git add src/components/diagnostico/Biblioteca.jsx
git commit -m "feat: componente Biblioteca — artigos pesquisáveis por máquina e categoria"
```

---

## Task 6: Página principal `Diagnostico.jsx`

**Files:**
- Create: `src/pages/Diagnostico.jsx`

**Interfaces:**
- Consumes: `SeletorMaquina`, `PerguntaNo`, `SolucaoCard`, `Biblioteca`
- Consumes: `diagnostico` de `../data/diagnostico`
- Consumes: `useSearchParams` de react-router-dom (para `?maquina=pop40`)
- Consumes: `PageLayout` de `../components/PageLayout`

- [ ] **Step 1: Criar a página**

```jsx
// src/pages/Diagnostico.jsx
import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import PageLayout from '../components/PageLayout'
import SeletorMaquina from '../components/diagnostico/SeletorMaquina'
import PerguntaNo from '../components/diagnostico/PerguntaNo'
import SolucaoCard from '../components/diagnostico/SolucaoCard'
import Biblioteca from '../components/diagnostico/Biblioteca'
import { diagnostico } from '../data/diagnostico'

const GOLD = '#C9932A'

export default function Diagnostico() {
  const [searchParams] = useSearchParams()
  const maquinaParamInicial = searchParams.get('maquina')

  const [maquinaId, setMaquinaId]     = useState(maquinaParamInicial)
  const [noAtual, setNoAtual]         = useState('raiz')
  const [historico, setHistorico]     = useState([])
  const [aba, setAba]                 = useState('diagnostico') // 'diagnostico' | 'biblioteca'
  const [filtroBiblioteca, setFiltro] = useState(null)          // string[] | null

  const maquinaData = maquinaId ? diagnostico.maquinas[maquinaId] : null
  const nos         = maquinaData?.arvore?.nos ?? {}
  const noData      = maquinaId ? nos[noAtual] : null

  // Cálculo de progresso (estimativa simples baseada no histórico)
  const progresso = Math.min(historico.length / 4, 0.9)

  function selecionarMaquina(id) {
    setMaquinaId(id)
    setNoAtual('raiz')
    setHistorico([])
  }

  function avancar(proximoNo) {
    setHistorico((h) => [...h, noAtual])
    setNoAtual(proximoNo)
  }

  function voltar() {
    const anterior = historico.at(-1) ?? 'raiz'
    setHistorico((h) => h.slice(0, -1))
    setNoAtual(anterior)
  }

  function reiniciar() {
    setNoAtual('raiz')
    setHistorico([])
    setMaquinaId(null)
    setFiltro(null)
    setAba('diagnostico')
  }

  function verBiblioteca(ids) {
    setFiltro(ids)
    setAba('biblioteca')
  }

  const isSolucao = noData && 'solucao' in noData

  return (
    <PageLayout titulo="Diagnóstico">
      {/* Tabs — só aparecem após selecionar máquina */}
      {maquinaId && (
        <div className="flex border-b" style={{ borderColor: '#E5E5E5' }}>
          {[
            { id: 'diagnostico', label: '🔧 Diagnóstico' },
            { id: 'biblioteca',  label: '📚 Biblioteca' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setAba(tab.id)}
              className="flex-1 py-3 text-sm font-semibold transition-colors"
              style={{
                color: aba === tab.id ? GOLD : '#9CA3AF',
                borderBottom: aba === tab.id ? `2px solid ${GOLD}` : '2px solid transparent',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      )}

      {/* Aba Diagnóstico */}
      {aba === 'diagnostico' && (
        <>
          {/* Estado 1: Sem máquina selecionada */}
          {!maquinaId && <SeletorMaquina onSelect={selecionarMaquina} />}

          {/* Estado 2: Pergunta */}
          {maquinaId && noData && !isSolucao && (
            <PerguntaNo
              no={noData}
              onAvancar={avancar}
              onVoltar={voltar}
              podeVoltar={historico.length > 0}
              progresso={progresso}
            />
          )}

          {/* Estado 3: Solução */}
          {maquinaId && noData && isSolucao && (
            <SolucaoCard
              solucao={noData.solucao}
              onReiniciar={reiniciar}
              onVerBiblioteca={verBiblioteca}
            />
          )}

          {/* Máquina selecionada mas nó não encontrado (erro de dados) */}
          {maquinaId && !noData && (
            <div className="px-4 pt-8 flex flex-col items-center gap-3">
              <span style={{ fontSize: 40 }}>⚠️</span>
              <p className="text-sm text-center" style={{ color: '#9CA3AF' }}>
                Nó não encontrado. Reinicie o diagnóstico.
              </p>
              <button
                onClick={reiniciar}
                className="px-6 py-3 rounded-xl font-bold text-sm"
                style={{ backgroundColor: GOLD, color: '#FFFFFF' }}
              >
                Reiniciar
              </button>
            </div>
          )}
        </>
      )}

      {/* Aba Biblioteca */}
      {aba === 'biblioteca' && (
        <Biblioteca
          maquinaId={maquinaId}
          filtroIds={filtroBiblioteca}
          onLimparFiltro={() => setFiltro(null)}
        />
      )}
    </PageLayout>
  )
}
```

- [ ] **Step 2: Build**

```bash
npm run build 2>&1 | tail -5
```

Esperado: sem erros.

- [ ] **Step 3: Commit**

```bash
git add src/pages/Diagnostico.jsx
git commit -m "feat: página Diagnostico — árvore de decisão + biblioteca integrada"
```

---

## Task 7: Integrações — rota, Home e MaquinaDetalhe

**Files:**
- Modify: `src/App.jsx`
- Modify: `src/pages/Home.jsx`
- Modify: `src/pages/MaquinaDetalhe.jsx`

**Interfaces:**
- Consumes: `Diagnostico` de `./pages/Diagnostico`
- `App.jsx`: rota `/diagnostico` já existe como placeholder — trocar o elemento
- `Home.jsx`: adicionar card no grid de módulos com `Wrench` icon e path `/diagnostico`
- `MaquinaDetalhe.jsx`: adicionar botão "Diagnosticar problema" com `navigate('/diagnostico?maquina=' + maquina.id)`

- [ ] **Step 1: Conectar rota em `App.jsx`**

Localizar a linha:
```jsx
<Route path="/diagnostico" element={<Diagnostico />} />
```

Verificar que o import existe:
```jsx
import Diagnostico from './pages/Diagnostico'
```

Se não existir, adicionar ambos. Se a rota já existir mas com placeholder, substituir pelo componente real.

- [ ] **Step 2: Adicionar card na Home**

Em `src/pages/Home.jsx`, no array `modulos`, adicionar após "Treinamentos":

```jsx
{ label: 'Diagnosticar Máquina', desc: 'Identifique e resolva problemas', icon: Wrench, path: '/diagnostico' },
```

Verificar que `Wrench` já está importado do lucide-react (já estava). Se não estiver, adicionar ao import.

- [ ] **Step 3: Adicionar botão em `MaquinaDetalhe.jsx`**

Localizar o botão "Ver ficha completa" (CTA ao final da página) e adicionar ANTES dele:

```jsx
<button
  onClick={() => navigate(`/diagnostico?maquina=${maquina.id}`)}
  className="w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 mb-3"
  style={{ backgroundColor: 'transparent', color: '#C9932A', border: '1.5px solid #C9932A', borderRadius: 12 }}
>
  🔧 Diagnosticar problema
</button>
```

- [ ] **Step 4: Verificar build final**

```bash
npm run build 2>&1 | tail -5
```

Esperado: `✓ built in X.XXs` sem erros.

- [ ] **Step 5: Commit final**

```bash
git add src/App.jsx src/pages/Home.jsx src/pages/MaquinaDetalhe.jsx
git commit -m "feat: conectar rotas, card Home e botão MaquinaDetalhe para Diagnóstico"
```

- [ ] **Step 6: Push para remote**

```bash
git push origin main
```

---

## Self-Review

**Cobertura do spec:**
- ✅ Árvore de decisão guiada por máquina → Tasks 1, 3, 6
- ✅ Arquivo `diagnostico.js` novo → Task 1
- ✅ SeletorMaquina com pré-seleção via query param → Task 6
- ✅ Barra de progresso na pergunta → Task 3
- ✅ Voltar um nó → Task 3 + 6
- ✅ Solução com passos, alerta e link biblioteca → Task 4
- ✅ Biblioteca separada com busca e filtro por máquina → Task 5
- ✅ Tabs Diagnóstico | Biblioteca → Task 6
- ✅ Home card → Task 7
- ✅ MaquinaDetalhe button → Task 7
- ✅ Rota `/diagnostico` → Task 7

**Consistência de tipos:**
- `onSelect(maquinaId: string)` → `setMaquinaId(id)` ✅
- `onAvancar(proximoNo: string)` → `avancar(proximoNo)` ✅
- `onVerBiblioteca(ids: string[])` → `verBiblioteca(ids)` → `filtroIds` ✅
- `filtroIds` é `string[] | null` em ambos SolucaoCard e Biblioteca ✅

**Sem placeholders:** todo o conteúdo da árvore está escrito no Task 1. ✅
