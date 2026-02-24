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
import { Trophy, Gamepad2, History, Gift, Home as HomeIcon } from 'lucide-react'

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
          <div className="space-y-4">
            <DashboardCard progress={progress} />
            <TaskList
              tasks={dailyTasks}
              onComplete={handleTaskComplete}
              title="Tarefas de Hoje"
            />
            <PenaltyList penalties={penalties} onApply={handlePenaltyApply} />
          </div>
        )
      case 'levels':
        return (
          <div className="space-y-4">
            <LevelProgress levels={levels} currentPoints={progress.currentPoints} />
            <StreakCard streakDays={progress.streakDays} />
          </div>
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
    <div className="min-h-screen pb-24">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-[#0a0a0f]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-pink-500 flex items-center justify-center font-black text-white text-sm glow-orange">
                EP
              </div>
              <div>
                <h1 className="text-white font-bold text-lg">Bezalel</h1>
                <p className="text-xs text-gray-400">Evolution Points</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-md mx-auto p-4">
        {renderContent()}
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-[#0a0a0f]/90 backdrop-blur-xl border-t border-white/5 px-2 py-3">
        <div className="max-w-md mx-auto flex justify-around">
          <NavButton
            active={activeTab === 'dashboard'}
            onClick={() => setActiveTab('dashboard')}
            icon={<HomeIcon className="w-5 h-5" />}
            label="Início"
          />
          <NavButton
            active={activeTab === 'levels'}
            onClick={() => setActiveTab('levels')}
            icon={<Trophy className="w-5 h-5" />}
            label="Níveis"
          />
          <NavButton
            active={activeTab === 'rewards'}
            onClick={() => setActiveTab('rewards')}
            icon={<Gift className="w-5 h-5" />}
            label="Prêmios"
          />
          <NavButton
            active={activeTab === 'history'}
            onClick={() => setActiveTab('history')}
            icon={<History className="w-5 h-5" />}
            label="Histórico"
          />
        </div>
      </nav>
    </div>
  )
}

interface NavButtonProps {
  active: boolean
  onClick: () => void
  icon: React.ReactNode
  label: string
}

function NavButton({ active, onClick, icon, label }: NavButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center p-2 rounded-xl transition-all ${
        active 
          ? 'text-orange-500' 
          : 'text-gray-500 hover:text-gray-300'
      }`}
    >
      {icon}
      <span className="text-[10px] mt-1 font-medium">{label}</span>
    </button>
  )
}
