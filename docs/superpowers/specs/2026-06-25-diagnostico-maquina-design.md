# Diagnóstico de Máquina + Biblioteca de Problemas

**Data:** 2026-06-25  
**Status:** Aprovado  
**Projeto:** SalgadeiroPro

---

## Resumo

Dois módulos interligados para suporte técnico offline ao salgadeiro:

1. **Diagnóstico de Máquina** — árvore de decisão guiada que identifica a causa de um problema e entrega os passos de solução
2. **Biblioteca de Problemas** — acervo pesquisável de artigos técnicos, acessível diretamente ou via link ao final de um diagnóstico

Ambos funcionam 100% offline, sem custo de IA, com conteúdo específico por modelo de máquina.

---

## Decisões de Design

| Pergunta | Decisão |
|---|---|
| Fluxo do diagnóstico | Árvore de decisão guiada (pergunta → ramificação) |
| Escopo | Específico por máquina (Pop 4.0, Black Mix, Black Inox, Inox Supreme) |
| Relação Diagnóstico ↔ Biblioteca | Separados, conectados por links "ver artigos relacionados" ao final do diagnóstico |
| Fonte de dados | Arquivo novo `src/data/diagnostico.js` com estrutura de árvore |
| Acesso no app | Card na Home + botão na ficha da máquina (pré-seleciona via query param) |
| Implementação | Árvore estática em JS — sem IA, sem dependências externas |

---

## Estrutura de Dados

### `src/data/diagnostico.js`

```js
export const diagnostico = {
  maquinas: {
    pop40: {
      nome: 'Pop 4.0',
      arvore: {
        raiz: 'q1',
        nos: {
          // Nó de pergunta
          q1: {
            pergunta: 'Qual é o problema principal?',
            opcoes: [
              { texto: 'Salgado saindo com peso irregular',  proximo: 'q2_peso' },
              { texto: 'Bico entupindo durante a produção', proximo: 'q2_bico' },
              { texto: 'Salgado rachando ou abrindo',       proximo: 'q2_racha' },
              { texto: 'Máquina fazendo barulho estranho',  proximo: 'q2_ruido' },
            ]
          },
          // Nó de solução
          sol_calibragem: {
            solucao: {
              titulo: 'Recalibrar fluxo de massa e recheio',
              passos: [
                'Zere os potenciômetros de massa e recheio',
                'Ajuste o fluxo de massa para 70%',
                'Ajuste o fluxo de recheio para 60%',
                'Produza 5 unidades de teste e verifique o peso',
              ],
              alerta: '⚠️ Desligue a máquina antes de ajustar os potenciômetros.',
              biblioteca: ['peso-irregular-pop40', 'calibragem-basica'],
            }
          }
          // ... demais nós
        }
      }
    },
    blackmix:     { /* mesma estrutura */ },
    blackinox:    { /* mesma estrutura */ },
    inoxsupreme:  { /* mesma estrutura */ },
  }
}

export const biblioteca = [
  {
    id: 'peso-irregular-pop40',
    titulo: 'Peso irregular na Pop 4.0',
    maquinas: ['pop40'],
    categoria: 'Calibragem',
    resumo: 'Causas e soluções para variação de peso entre unidades durante a produção.',
    conteudo: '...',  // texto completo do artigo
  },
  // ...
]
```

**Dois tipos de nó:**
- **Pergunta:** `{ pergunta, opcoes: [{ texto, proximo }] }` — exibe botões e avança na árvore
- **Solução:** `{ solucao: { titulo, passos, alerta?, biblioteca[] } }` — exibe resultado final

---

## Arquitetura de Componentes

```
src/
  data/
    diagnostico.js              ← árvore de decisão + biblioteca (dados estáticos)
  pages/
    Diagnostico.jsx             ← página principal, gerencia estado da navegação
  components/
    diagnostico/
      SeletorMaquina.jsx        ← estado 1: grid de seleção de máquina
      PerguntaNo.jsx            ← estado 2: pergunta + opções como botões
      SolucaoCard.jsx           ← estado 3: passos + alerta + links biblioteca
      Biblioteca.jsx            ← estado 4: lista filtrada por máquina + busca
```

---

## Fluxo de Telas

### Estado 1 — Seleção de máquina
Grid 2×2 com os 4 modelos. Se o usuário chegar via `/diagnostico?maquina=pop40`, esta etapa é pulada automaticamente.

### Estado 2 — Pergunta da árvore
- Título da pergunta
- Barra de progresso (passos percorridos / estimativa)
- Botões de opção (uma por linha, texto completo)
- Botão ← voltar um nó (pilha de histórico)

### Estado 3 — Solução encontrada
- Badge "✅ Diagnóstico concluído"
- Título da solução
- Passos numerados
- Bloco de alerta ⚠️ (se houver)
- Botão "📚 Ver artigos relacionados" → abre Biblioteca filtrada
- Botão "Novo diagnóstico" → reinicia

### Estado 4 — Biblioteca de Problemas
- Tabs: Diagnóstico | Biblioteca
- Campo de busca
- Filtro por máquina (dropdown)
- Lista agrupada por categoria
- Artigo individual com conteúdo completo

---

## Estado do Componente (`Diagnostico.jsx`)

```js
const [maquinaId, setMaquinaId]       = useState(null)
const [noAtual, setNoAtual]           = useState('raiz')
const [historico, setHistorico]       = useState([])   // pilha para voltar
const [aba, setAba]                   = useState('diagnostico')
const [filtroBiblioteca, setFiltro]   = useState(null) // pré-filtro vindo da solução
```

**Três funções de navegação:**

```js
function avancar(proximoNo) {
  setHistorico(h => [...h, noAtual])
  setNoAtual(proximoNo)
}

function voltar() {
  setNoAtual(historico.at(-1) ?? 'raiz')
  setHistorico(h => h.slice(0, -1))
}

function reiniciar() {
  setNoAtual('raiz')
  setHistorico([])
  setMaquinaId(null)
}
```

---

## Integrações com o App Existente

| Onde | O quê |
|---|---|
| `src/App.jsx` | Rota `/diagnostico` já existe como placeholder — apenas importar e conectar `Diagnostico.jsx` |
| `src/pages/Home.jsx` | Adicionar card "🔧 Diagnosticar Máquina" no grid de módulos |
| `src/pages/MaquinaDetalhe.jsx` | Botão "Diagnosticar problema" → `navigate('/diagnostico?maquina=' + maquina.id)` |

---

## Visual

Segue o padrão navy/gold já estabelecido:
- Fundo `#FAFAFA`, cards `#FFFFFF`
- Opções de diagnóstico: botões brancos com borda `#E5E5E5`, active com borda gold `#C9932A`
- Solução: título em `#1A1A1A`, passos numerados com círculo gold
- Alerta: fundo `rgba(220,38,38,0.06)`, borda vermelha, texto vermelho
- Barra de progresso: gold sobre `#E5E5E5`

---

## O que NÃO está neste escopo

- Diagnóstico via IA/chat (Roberto) — módulo separado futuro
- Sincronização de diagnósticos com Supabase
- Histórico de diagnósticos anteriores
- Notificações de manutenção preventiva

---

## Dependências

Nenhuma nova dependência. Usa apenas:
- React + useState (já instalado)
- react-router-dom + useSearchParams para query param `?maquina=`
- Componentes existentes: `PageLayout`, `Header`, `BottomNav`
