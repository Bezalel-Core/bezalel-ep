import { Task, Penalty, Reward, Level, UserProgress } from '@/types'

export const dailyTasks: Task[] = [
  { id: '1', title: 'Arrumar cama ao acordar', points: 5, category: 'daily', icon: '🛏️' },
  { id: '2', title: 'Levantar quando chamarem', points: 5, category: 'daily', icon: '⏰' },
  { id: '3', title: 'Arrumar quarto', points: 10, category: 'daily', icon: '🧹' },
  { id: '4', title: 'Dormir no horário', points: 5, category: 'daily', icon: '😴' },
  { id: '5', title: 'Não desperdiçar comida', points: 5, category: 'daily', icon: '🍽️' },
  { id: '6', title: 'Jogar resto de comida no lixo', points: 5, category: 'daily', icon: '🗑️' },
  { id: '7', title: 'Usar própria toalha', points: 5, category: 'daily', icon: '🧽' },
  { id: '8', title: 'Fazer dever de casa', points: 10, category: 'daily', icon: '📚' },
  { id: '9', title: 'Lembrar material escolar', points: 5, category: 'daily', icon: '🎒' },
  { id: '10', title: 'Não comer no quarto', points: 5, category: 'daily', icon: '🚫' },
]

export const weeklyTasks: Task[] = [
  { id: 'w1', title: 'Cortar unhas', points: 10, category: 'weekly', icon: '💅' },
  { id: 'w2', title: 'Manter quarto limpo', points: 15, category: 'weekly', icon: '✨' },
]

export const monthlyTasks: Task[] = [
  { id: 'm1', title: 'Organizar armário', points: 20, category: 'monthly', icon: '👕' },
  { id: 'm2', title: 'Limpeza profunda do quarto', points: 20, category: 'monthly', icon: '🧼' },
]

export const penalties: Penalty[] = [
  { id: 'p1', title: 'Não arrumar cama', points: -10, icon: '🛏️' },
  { id: 'p2', title: 'Demorar para levantar', points: -10, icon: '⏰' },
  { id: 'p3', title: 'Não arrumar quarto', points: -20, icon: '🧹' },
  { id: 'p4', title: 'Não dormir no horário', points: -10, icon: '😴' },
  { id: 'p5', title: 'Desperdiçar comida', points: -10, icon: '🍽️' },
  { id: 'p6', title: 'Usar toalha dos pais', points: -10, icon: '🧽' },
  { id: 'p7', title: 'Esquecer material', points: -10, icon: '🎒' },
  { id: 'p8', title: 'Não fazer dever', points: -20, icon: '📚' },
  { id: 'p9', title: 'Mentir', points: -10, icon: '🤥' },
  { id: 'p10', title: 'Comer no quarto', points: -30, icon: '🍕' },
  { id: 'p11', title: 'Nota baixa na escola', points: -20, icon: '📝' },
  { id: 'p12', title: 'Nota muito baixa', points: -40, icon: '📉' },
  { id: 'p13', title: 'Desobediência grave', points: -30, icon: '⚠️' },
]

export const levels: Level[] = [
  {
    name: '🥉 Bronze',
    minPoints: 50,
    color: 'bg-amber-600',
    icon: '🥉',
    benefits: ['30min videogame'],
  },
  {
    name: '🥈 Prata',
    minPoints: 100,
    color: 'bg-gray-400',
    icon: '🥈',
    benefits: ['1h videogame'],
  },
  {
    name: '🥇 Ouro',
    minPoints: 200,
    color: 'bg-yellow-400',
    icon: '🥇',
    benefits: ['Videogame no quarto'],
  },
  {
    name: '💎 Diamante',
    minPoints: 500,
    color: 'bg-cyan-400',
    icon: '💎',
    benefits: ['Programação especial'],
  },
  {
    name: '👑 Lendário',
    minPoints: 1000,
    color: 'bg-gradient-to-r from-red-500 to-purple-600',
    icon: '👑',
    benefits: ['Recompensa épica!'],
  },
]

export const rewards: Reward[] = [
  { id: 'r1', title: 'Videogame 30min', description: 'Jogar por 30 minutos', minPoints: 50, icon: '🎮', unlocked: false },
  { id: 'r2', title: 'Videogame 1h', description: 'Jogar por 1 hora', minPoints: 100, icon: '🎮', unlocked: false },
  { id: 'r3', title: 'Videogame no quarto', description: 'Jogar no próprio quarto', minPoints: 200, icon: '🏠', unlocked: false },
  { id: 'r4', title: 'Passeio especial', description: 'Programação especial no fim de semana', minPoints: 500, icon: '🎯', unlocked: false },
  { id: 'r5', title: 'Lanche especial', description: 'Lanche no lugar favorito', minPoints: 0, icon: '🍔', unlocked: false },
  { id: 'r6', title: 'Diversão extra', description: 'Arcade, parque ou atividade especial', minPoints: 0, icon: '🎪', unlocked: false },
  { id: 'r7', title: 'Recompensa Épica', description: 'Algo incrível escolhido pelos pais!', minPoints: 1000, icon: '🎁', unlocked: false },
]

export const initialProgress: UserProgress = {
  name: 'Jogador',
  currentPoints: 75,
  streakDays: 3,
  lastPerfectDay: new Date().toISOString(),
  transactions: [
    { id: 't1', type: 'earn', title: 'Arrumar cama', points: 5, date: new Date().toISOString() },
    { id: 't2', type: 'earn', title: 'Fazer dever de casa', points: 10, date: new Date().toISOString() },
    { id: 't3', type: 'earn', title: 'Dormir no horário', points: 5, date: new Date().toISOString() },
    { id: 't4', type: 'lose', title: 'Esquecer material', points: -10, date: new Date(Date.now() - 86400000).toISOString() },
  ],
}
