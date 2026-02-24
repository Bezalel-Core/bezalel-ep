'use client'

import { useState } from 'react'
import DashboardCard from '@/components/DashboardCard'
import TaskList from '@/components/TaskList'
import PenaltyList from '@/components/PenaltyList'
import LevelProgress from '@/components/LevelProgress'
import StreakCard from '@/components/StreakCard'
import HistoryList from '@/components/HistoryList'
import RewardList from '@/components/RewardList'
import GamerLogo from '@/components/GamerLogo'
import { Confetti, useConfetti, PointsPopup } from '@/components/Animations'
import {
  dailyTasks as initialDailyTasks,
  penalties,
  levels,
  rewards,
  initialProgress,
} from '@/data/mock'
import { Transaction, Task } from '@/types'
import { Trophy, Gamepad2, History, Gift, Zap } from 'lucide-react'

export default function Home() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [dailyTasks, setDailyTasks] = useState<Task[]>(initialDailyTasks)
  const [progress, setProgress] = useState(initialProgress)
  const { triggerConfetti, confettiPieces, isActive } = useConfetti()
  const [showPointsPopup, setShowPointsPopup] = useState(false)
  const [lastPoints, setLastPoints] = useState(0)

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

    // Trigger animations
    setLastPoints(task.points)
    setShowPointsPopup(true)
    triggerConfetti()
    
    setTimeout(() => setShowPointsPopup(false), 1200)
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
            <div className="flex items-center justify-center gap-3 mb-6">
              <GamerLogo size="md" />
              <div className="text-center">
                <h1 className="text-3xl font-display text-white tracking-wider">
                  Bezalel
                </h1>
                <p className="text-sm text-cyan-400 font-bold tracking-widest">
                  EVOLUTION POINTS
                </p>
              </div>
            </div>
            
            <DashboardCard progress={progress} />
            <TaskList
              tasks={dailyTasks}
              onComplete={handleTaskComplete}
              title="📋 Tarefas de Hoje"
              color="text-cyan-400"
            />
            <PenaltyList penalties={penalties} onApply={handlePenaltyApply} />
          </>
        )
      case 'levels':
        return (
          <>
            <div className="flex items-center justify-center gap-3 mb-6">
              <Trophy className="w-10 h-10 text-yellow-400" />
              <h1 className="text-3xl font-display text-white tracking-wider">Níveis</h1>
            </div>
            
            <LevelProgress levels={levels} currentPoints={progress.currentPoints} />
            <StreakCard streakDays={progress.streakDays} />
          </>
        )
      case 'rewards':
        return (
          <>
            <div className="flex items-center justify-center gap-3 mb-6">
              <Gift className="w-10 h-10 text-pink-400" />
              <h1 className="text-3xl font-display text-white tracking-wider">Recompensas</h1>
            </div>
            
            <RewardList rewards={rewards} currentPoints={progress.currentPoints} />
          </>
        )
      case 'history':
        return (
          <>
            <div className="flex items-center justify-center gap-3 mb-6">
              <History className="w-10 h-10 text-purple-400" />
              <h1 className="text-3xl font-display text-white tracking-wider">Histórico</h1>
            </div>
            
            <HistoryList transactions={progress.transactions} />
          </>
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen pb-24">
      {isActive && <Confetti pieces={confettiPieces} />}
      <PointsPopup points={lastPoints} show={showPointsPopup} />
      
      <div className="max-w-md mx-auto p-4">
        {renderContent()}
      </div>

      <nav className="fixed bottom-0 left-0 right-0 bg-gray-900/90 backdrop-blur-lg border-t border-white/10 px-4 py-2">
        <div className="max-w-md mx-auto flex justify-around">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex flex-col items-center p-3 rounded-2xl transition-all duration-300 ${
              activeTab === 'dashboard' 
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/30' 
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Gamepad2 className="w-6 h-6" />
            <span className="text-xs mt-1 font-bold">Tarefas</span>
          </button>

          <button
            onClick={() => setActiveTab('levels')}
            className={`flex flex-col items-center p-3 rounded-2xl transition-all duration-300 ${
              activeTab === 'levels' 
                ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-lg shadow-yellow-500/30' 
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Trophy className="w-6 h-6" />
            <span className="text-xs mt-1 font-bold">Níveis</span>
          </button>

          <button
            onClick={() => setActiveTab('rewards')}
            className={`flex flex-col items-center p-3 rounded-2xl transition-all duration-300 ${
              activeTab === 'rewards' 
                ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg shadow-pink-500/30' 
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Gift className="w-6 h-6" />
            <span className="text-xs mt-1 font-bold">Recompensas</span>
          </button>

          <button
            onClick={() => setActiveTab('history')}
            className={`flex flex-col items-center p-3 rounded-2xl transition-all duration-300 ${
              activeTab === 'history' 
                ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-lg shadow-purple-500/30' 
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <History className="w-6 h-6" />
            <span className="text-xs mt-1 font-bold">Histórico</span>
          </button>
        </div>
      </nav>
    </div>
  )
}
