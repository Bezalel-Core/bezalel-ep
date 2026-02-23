'use client'

import { UserProgress, Level } from '@/types'
import { levels } from '@/data/mock'
import { Trophy, Flame, Star, Zap } from 'lucide-react'
import { BounceText } from './Animations'

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
    ? Math.min(100, (progress.currentPoints / nextLevel.minPoints) * 100)
    : 100

  const canPlayGame = progress.currentPoints >= 50

  // Cores por nível
  const getLevelGradient = (levelName: string) => {
    if (levelName.includes('Bronze')) return 'from-amber-600 to-orange-700'
    if (levelName.includes('Prata')) return 'from-slate-300 to-slate-500'
    if (levelName.includes('Ouro')) return 'from-yellow-400 to-amber-500'
    if (levelName.includes('Diamante')) return 'from-cyan-400 to-blue-600'
    if (levelName.includes('Lenda')) return 'from-purple-500 to-pink-600'
    return 'from-indigo-500 to-purple-600'
  }

  return (
    <div className="gamer-card p-6 mb-6 animate-slide-up">
      {/* Header com Avatar e Info */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${getLevelGradient(currentLevel.name)} flex items-center justify-center text-4xl shadow-2xl animate-float`}
            style={{ boxShadow: `0 0 30px rgba(0, 245, 255, 0.4)` }}
          >
            {currentLevel.icon}
          </div>
          <div>
            <h1 className="text-3xl font-display text-white tracking-wider">
              {progress.name}
            </h1>
            <p className="text-gradient-cyan font-bold text-lg">
              {currentLevel.name}
            </p>
          </div>
        </div>
        
        <div className="text-center">
          <div className="flex items-center gap-1 text-orange-400 animate-pulse">
            <Flame className="w-7 h-7" />
            <span className="text-3xl font-black">{progress.streakDays}</span>
          </div>
          <p className="text-xs text-gray-400 font-medium">dia(s) seguido(s)</p>
        </div>
      </div>

      {/* Card de Pontos Principal */}
      <div className="relative rounded-3xl p-5 mb-5 overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.3) 0%, rgba(118, 75, 162, 0.3) 100%)',
          border: '2px solid rgba(0, 245, 255, 0.3)',
        }}
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-400/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-purple-500/20 rounded-full blur-2xl" />
        
        <div className="relative flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-lg">
              <Star className="w-7 h-7 text-white fill-white" />
            </div>
            <div>
              <span className="text-5xl font-black text-white">
                <BounceText>{progress.currentPoints}</BounceText>
              </span>
              <span className="text-cyan-300 ml-2 font-bold">pontos</span>
            </div>
          </div>
          <Trophy className="w-12 h-12 text-yellow-400 animate-pulse" />
        </div>

        {/* Barra de Progresso */}
        <div className="progress-gamer">
          <div
            className="progress-gamer-fill"
            style={{ width: `${progressToNext}%` }}
          />
        </div>
        
        {nextLevel && (
          <p className="text-sm text-cyan-200 mt-2 font-medium">
            🎯 Faltam <span className="text-white font-bold">{nextLevel.minPoints - progress.currentPoints}</span> pts para <span className="text-gradient-gold">{nextLevel.name}</span>
          </p>
        )}
      </div>

      {/* Status do Videogame */}
      <div 
        className={`p-4 rounded-2xl text-center font-black text-xl transition-all duration-300 ${
          canPlayGame
            ? 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-2 border-green-400/50 text-green-400'
            : 'bg-gradient-to-r from-red-500/20 to-pink-500/20 border-2 border-red-400/50 text-red-400'
        }`}
        style={{
          boxShadow: canPlayGame ? '0 0 30px rgba(57, 255, 20, 0.3)' : '0 0 30px rgba(255, 0, 0, 0.2)',
        }}
      >
        <div className="flex items-center justify-center gap-3">
          {canPlayGame ? (
            <>
              <Zap className="w-7 h-7 animate-pulse fill-green-400" />
              <span className="animate-glow-pulse">🎮 PODE JOGAR VIDEOGAME! 🎮</span>
              <Zap className="w-7 h-7 animate-pulse fill-green-400" />
            </>
          ) : (
            <>
              <span>⛔ SEM VIDEOGAME</span>
              <span className="text-sm block mt-1 font-medium opacity-80">(Precisa de 50 pts)</span>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
