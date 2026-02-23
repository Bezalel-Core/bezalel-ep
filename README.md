# Kauan Rewards 🎮

Sistema de gamificação para Kauan (11 anos) — acumule pontos completando tarefas e desbloqueie recompensas!

## 📋 Funcionalidades

- ✅ **Tarefas Diárias** — Marque atividades completadas e ganhe pontos
- ⚠️ **Penalidades** — Registre infrações (perde pontos)
- 🎯 **Níveis** — Bronze, Prata, Ouro, Diamante, Lendário
- 🔥 **Streak** — 7 dias = lanche, 14 dias = diversão extra
- 🎁 **Recompensas** — Videogame, piscina, celular novo
- 📜 **Histórico** — Acompanhe ganhos e perdas

## 🚀 Como Rodar

```bash
# Instalar dependências
npm install

# Rodar em desenvolvimento
npm run dev

# Abrir no navegador
http://localhost:3000
```

## 📱 Build para Produção

```bash
npm run build
```

Os arquivos estáticos serão gerados na pasta `dist/`.

## 🛠️ Tecnologias

- Next.js 14
- TypeScript
- Tailwind CSS
- PWA-ready

## 📁 Estrutura

```
app/
├── page.tsx          # Dashboard principal
├── layout.tsx        # Layout com navegação
├── globals.css       # Estilos globais
components/
├── DashboardCard.tsx # Card de pontos/nível
├── TaskList.tsx      # Lista de tarefas
├── PenaltyList.tsx   # Lista de penalidades
├── LevelProgress.tsx # Progresso de níveis
├── StreakCard.tsx    # Streak de dias
├── HistoryList.tsx   # Histórico de transações
├── RewardList.tsx    # Lista de recompensas
data/
├── mock.ts           # Dados iniciais
types/
└── index.ts          # Tipos TypeScript
```

---
Projeto criado com 💜 para Kauan
