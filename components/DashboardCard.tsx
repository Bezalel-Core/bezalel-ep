'use client'

import { UserProgress, Level } from '@/types'
import { levels } from '@/data/mock'
import { Flame, Zap, Gamepad2 } from 'lucide-react'

interface DashboardCardProps {
  progress: UserProgress
}

export default function DashboardCard({ progress }: DashboardCardProps) {
  const getCurrentLevel = (points: number): Level => {
    for (let i = levels.length - 1; i >= 0; i--) {
      if (points >= levels[i].minPoints) {
        return levels[i]
      }
    }
    return { name: 'Iniciante', minPoints: 0, color: 'bg-gray-500', icon: '🌱', benefits: [] }
  }

  const getNextLevel = (points: number): Level | null => {
    for (let i = 0; i < levels.length; i++) {
      if (points < levels[i].minPoints) {
        return levels[i]
      }
    }
    return null
  }

  const currentLevel = getCurrentLevel(progress.currentPoints)
  const nextLevel = getNextLevel(progress.currentPoints)
  const progressToNext = nextLevel
    ? Math.min(100, ((progress.currentPoints - (levels[levels.indexOf(nextLevel) - 1]?.minPoints || 0)) / (nextLevel.minPoints - (levels[levels.indexOf(nextLevel) - 1]?.minPoints || 0))) * 100)
    : 100

  const canPlayGame = progress.currentPoints >= 50

  return (
    <div className="space-y-4">
      {/* Main Points Card */}
      <div className="glass rounded-3xl p-6 card-hover">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-500 to-pink-500 flex items-center justify-center glow-orange">
              <span className="text-2xl">{currentLevel.icon}</span>
            </div>
            <div>
              <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Nível Atual</p>
              <p className="text-white font-bold">{currentLevel.name.replace(/[🥉🥈🥇💎👑]/g, '').trim()}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full">
            <Flame className="w-5 h-5 text-orange-500" />
            <span className="text-white font-bold">{progress.streakDays}</span>
            <span className="text-gray-400 text-sm">dia(s)</span>
          </div>
        </div>

        {/* Big Points Display */}
        <div className="text-center mb-6">
          <p className="text-gray-400 text-sm font-medium uppercase tracking-widest mb-2">Pontos Totais</p>
          <div className="flex items-center justify-center gap-2">
            <Zap className="w-8 h-8 text-orange-500" />
            <p className="text-5xl font-black gradient-text">{progress.currentPoints.toLocaleString()}</p>
          </div>
        </div>

        {/* Progress Bar */}
        {nextLevel && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Próximo: {nextLevel.name.replace(/[🥉🥈🥇💎👑]/g, '').trim()}</span>
              <span className="text-orange-500 font-bold">+{nextLevel.minPoints - progress.currentPoints}</span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-orange-500 to-pink-500 rounded-full progress-glow"
                style={{ width: `${progressToNext}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Game Status */}
      <div className={`rounded-2xl p-5 flex items-center gap-4 ${
        canPlayGame 
          ? 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30' 
          : 'bg-gradient-to-r from-red-500/20 to-rose-500/20 border border-red-500/30'
      }`}>
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
          canPlayGame ? 'bg-green-500/20' : 'bg-red-500/20'
        }`}>
          <Gamepad2 className={`w-7 h-7 ${canPlayGame ? 'text-green-500' : 'text-red-500'}`} />
        </div>
        <div className="flex-1">
          <p className="text-gray-400 text-sm">Status do Videogame</p>
          <p className={`text-lg font-bold ${canPlayGame ? 'text-green-400' : 'text-red-400'}`}>
            {canPlayGame ? '✓ Liberado para jogar' : '✗ Bloqueado'}
          </p>
        </div>
        {!canPlayGame && (
          <div className="text-right">
            <p className="text-xs text-gray-500">Faltam</p>
            <p className="text-orange-500 font-bold">{50 - progress.currentPoints} pts</p>
          </div>
        )}
      </div>
    </div>
  )
}
