'use client'

import { Level } from '@/types'
import { Check, Lock, Crown, Star, Sparkles } from 'lucide-react'

interface LevelProgressProps {
  levels: Level[]
  currentPoints: number
}

export default function LevelProgress({ levels, currentPoints }: LevelProgressProps) {
  // Gradientes para cada nível
  const getLevelStyle = (levelName: string, isUnlocked: boolean) => {
    if (!isUnlocked) {
      return {
        bg: 'bg-white/5',
        border: 'border-white/10',
        text: 'text-gray-500',
        icon: 'text-gray-500',
      }
    }
    
    if (levelName.includes('Bronze')) {
      return {
        bg: 'bg-gradient-to-r from-amber-600/30 to-orange-700/30',
        border: 'border-amber-500/50',
        text: 'text-amber-300',
        icon: 'text-amber-400',
        glow: '0 0 20px rgba(245, 158, 11, 0.4)',
      }
    }
    if (levelName.includes('Prata')) {
      return {
        bg: 'bg-gradient-to-r from-slate-300/30 to-slate-500/30',
        border: 'border-slate-400/50',
        text: 'text-slate-300',
        icon: 'text-slate-400',
        glow: '0 0 20px rgba(148, 163, 184, 0.4)',
      }
    }
    if (levelName.includes('Ouro')) {
      return {
        bg: 'bg-gradient-to-r from-yellow-400/30 to-amber-500/30',
        border: 'border-yellow-400/50',
        text: 'text-yellow-300',
        icon: 'text-yellow-400',
        glow: '0 0 30px rgba(250, 204, 21, 0.5)',
      }
    }
    if (levelName.includes('Diamante')) {
      return {
        bg: 'bg-gradient-to-r from-cyan-400/30 to-blue-600/30',
        border: 'border-cyan-400/50',
        text: 'text-cyan-300',
        icon: 'text-cyan-400',
        glow: '0 0 30px rgba(34, 211, 238, 0.5)',
      }
    }
    if (levelName.includes('Lenda')) {
      return {
        bg: 'bg-gradient-to-r from-purple-500/30 via-pink-500/30 to-purple-600/30',
        border: 'border-purple-400/50',
        text: 'text-purple-300',
        icon: 'text-purple-400',
        glow: '0 0 40px rgba(168, 85, 247, 0.6)',
      }
    }
    
    return {
      bg: 'bg-white/10',
      border: 'border-white/20',
      text: 'text-white',
      icon: 'text-gray-400',
    }
  }

  return (
    <div className="gamer-card p-5 mb-4 animate-slide-up">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center animate-pulse">
          <Crown className="w-5 h-5 text-white" />
        </div>
        <h2 className="text-xl font-display text-white tracking-wide">🏆 Níveis de Recompensa</h2>
      </div>
      
      <div className="space-y-3">
        {levels.map((level, index) => {
          const isUnlocked = currentPoints >= level.minPoints
          const isNext = !isUnlocked && (index === 0 || currentPoints >= levels[index - 1].minPoints)
          const style = getLevelStyle(level.name, isUnlocked)

          return (
            <div
              key={level.name}
              className={`p-4 rounded-2xl border-2 transition-all duration-300 hover-lift ${style.bg} ${style.border}`}
              style={{
                boxShadow: isUnlocked ? style.glow : 'none',
                animationDelay: `${index * 0.1}s`,
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`text-4xl filter drop-shadow-lg ${isUnlocked ? 'animate-float' : 'grayscale opacity-50'}`}
                    style={{ animationDelay: `${index * 0.2}s` }}
                  >
                    {level.icon}
                  </div>
                  <div>
                    <p className={`font-black text-lg ${isUnlocked ? style.text : 'text-gray-500'}`}>
                      {level.name.replace(/[🥉🥈🥇💎👑]/g, '').trim()}
                    </p>
                    <p className={`text-sm font-medium ${isUnlocked ? 'text-white/70' : 'text-gray-600'}`}>
                      {level.minPoints} pontos
                    </p>
                  </div>
                </div>
                
                <div>
                  {isUnlocked ? (
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center animate-bounce-in"
                      style={{ 
                        background: 'linear-gradient(135deg, #39ff14, #00d9a3)',
                        boxShadow: '0 0 20px rgba(57, 255, 20, 0.5)',
                      }}
                    >
                      <Check className="w-7 h-7 text-white" strokeWidth={3} />
                    </div>
                  ) : (
                    <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center"
                    >
                      <Lock className="w-6 h-6 text-gray-600" />
                    </div>
                  )}
                </div>
              </div>
              
              {isUnlocked && level.benefits.length > 0 && (
                <div className="mt-3 flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <p className="text-sm font-medium text-white/80">{level.benefits[0]}</p>
                </div>
              )}
              
              {isNext && (
                <div className="mt-3">
                  <div className="progress-gamer">
                    <div 
                      className="progress-gamer-fill"
                      style={{ width: `${Math.min(100, (currentPoints / level.minPoints) * 100)}%` }}
                    />
                  </div>
                  <p className="text-xs text-cyan-300 mt-1 font-medium">
                    Faltam {level.minPoints - currentPoints} pts para desbloquear!
                  </p>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
