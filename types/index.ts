export interface Task {
  id: string
  title: string
  points: number
  category: 'daily' | 'weekly' | 'monthly'
  icon: string
  completed?: boolean
}

export interface Penalty {
  id: string
  title: string
  points: number
  icon: string
}

export interface Reward {
  id: string
  title: string
  description: string
  minPoints: number
  icon: string
  unlocked: boolean
}

export interface Level {
  name: string
  minPoints: number
  color: string
  icon: string
  benefits: string[]
}

export interface Transaction {
  id: string
  type: 'earn' | 'lose'
  title: string
  points: number
  date: string
}

export interface UserProgress {
  name: string
  currentPoints: number
  streakDays: number
  lastPerfectDay: string | null
  transactions: Transaction[]
}
