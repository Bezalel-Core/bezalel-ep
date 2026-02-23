'use client'

import { useState } from 'react'
import DashboardCard from '@/components/DashboardCard'
import TaskList from '@/components/TaskList'
import PenaltyList from '@/components/PenaltyList'
import LevelProgress from '@/components/LevelProgress'
import StreakCard from '@/components/StreakCard'
import HistoryList from '@/components/HistoryList'
import RewardList from '@/components/RewardList'
import {
  dailyTasks as initialDailyTasks,
  penalties,
  levels,
  rewards,
  initialProgress,
} from '@/data/mock'
import { Transaction, Task } from '@/types'
import { Trophy, Gamepad2, History, Gift } from 'lucide-react'

export default function Home() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [dailyTasks, setDailyTasks] = useState<Task[]>(initialDailyTasks)
  const [progress, setProgress] = useState(initialProgress)

  const handleTaskComplete = (taskId: string) => {
    const task = dailyTasks.find((t) => t.id === taskId)
    if (!task || task.completed) return

    setDailyTasks((prev) =>
      prev.map((t) =>
        t.id === taskId ? { ...t, completed: true } : t
      )
    )

    const newTransaction: Transaction = {
      id: `t${Date.now()}`,
      type: 'earn',
      title: task.title,
      points: task.points,
      date: new Date().toISOString(),
    }

    setProgress((prev) => ({
      ...prev,
      currentPoints: prev.currentPoints + task.points,
      transactions: [newTransaction, ...prev.transactions],
    }))
  }

  const handlePenaltyApply = (penaltyId: string) => {
    const penalty = penalties.find((p) => p.id === penaltyId)
    if (!penalty) return

    const newTransaction: Transaction = {
      id: `t${Date.now()}`,
      type: 'lose',
      title: penalty.title,
      points: penalty.points,
      date: new Date().toISOString(),
    }

    setProgress((prev) => ({
      ...prev,
      currentPoints: Math.max(0, prev.currentPoints + penalty.points),
      transactions: [newTransaction, ...prev.transactions],
    }))
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <>
            <DashboardCard progress={progress} />
            <TaskList
              tasks={dailyTasks}
              onComplete={handleTaskComplete}
              title="📋 Tarefas de Hoje"
              color="text-indigo-600"
            />
            <PenaltyList penalties={penalties} onApply={handlePenaltyApply} />
          </>
        )
      case 'levels':
        return (
          <>
            <LevelProgress levels={levels} currentPoints={progress.currentPoints} />
            <StreakCard streakDays={progress.streakDays} />
          </>
        )
      case 'rewards':
        return <RewardList rewards={rewards} currentPoints={progress.currentPoints} />
      case 'history':
        return <HistoryList transactions={progress.transactions} />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen pb-20">
      <div className="max-w-md mx-auto p-4">
        {renderContent()}
      </div>

      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
        <div className="max-w-md mx-auto flex justify-around">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex flex-col items-center p-2 rounded-xl transition-colors ${
              activeTab === 'dashboard' ? 'text-indigo-600 bg-indigo-50' : 'text-gray-400'
            }`}
          >
            <Gamepad2 className="w-6 h-6" />
            <span className="text-xs mt-1 font-medium">Tarefas</span>
          </button>

          <button
            onClick={() => setActiveTab('levels')}
            className={`flex flex-col items-center p-2 rounded-xl transition-colors ${
              activeTab === 'levels' ? 'text-indigo-600 bg-indigo-50' : 'text-gray-400'
            }`}
          >
            <Trophy className="w-6 h-6" />
            <span className="text-xs mt-1 font-medium">Níveis</span>
          </button>

          <button
            onClick={() => setActiveTab('rewards')}
            className={`flex flex-col items-center p-2 rounded-xl transition-colors ${
              activeTab === 'rewards' ? 'text-indigo-600 bg-indigo-50' : 'text-gray-400'
            }`}
          >
            <Gift className="w-6 h-6" />
            <span className="text-xs mt-1 font-medium">Recompensas</span>
          </button>

          <button
            onClick={() => setActiveTab('history')}
            className={`flex flex-col items-center p-2 rounded-xl transition-colors ${
              activeTab === 'history' ? 'text-indigo-600 bg-indigo-50' : 'text-gray-400'
            }`}
          >
            <History className="w-6 h-6" />
            <span className="text-xs mt-1 font-medium">Histórico</span>
          </button>
        </div>
      </nav>
    </div>
  )
}
