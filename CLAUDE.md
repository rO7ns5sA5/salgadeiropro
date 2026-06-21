# SalgadeiroPro — CLAUDE.md

## Stack
React + JSX + Tailwind CSS + Claude API (`claude-sonnet-4-6`)

## Paleta
| Token | Valor |
|---|---|
| Fundo | `#0B1729` |
| Cards | `#0F2040` |
| Bordas | `#1E3A5F` |
| Destaque (gold) | `#C9932A` |
| Texto | `#D0E8F5` |

## Regras fixas
- Nunca usar imagens externas — apenas emojis e gradientes CSS
- Preservar a persona do Roberto em qualquer módulo de chat
- Usar `claude-sonnet-4-6` em todas as chamadas à API
- Seguir o padrão visual navy/gold já existente no projeto

## Estrutura
```
src/
  data/          ← dados estáticos (maquinas.js, receitas.js, treinamentos.js)
  lib/           ← claude.js (API), supabase.js (cache)
  components/    ← BottomNav, Header, PageLayout
  pages/         ← páginas principais
  modules/       ← módulos IA e funcionalidades avançadas
```

## Módulos

| Módulo | Status | Rota | Descrição |
|---|---|---|---|
| Pergunte ao Especialista | ✅ Concluído | `/especialista` | Chat IA com Roberto integrado à base de dados |
