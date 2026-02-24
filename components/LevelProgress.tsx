'use client'

import { Level } from '@/types'
import { Lock, Check, ChevronRight } from 'lucide-react'

interface LevelProgressProps {
  levels: Level[]
  currentPoints: number
}

export default function LevelProgress({ levels, currentPoints }: LevelProgressProps) {
  return (
    <div className="glass rounded-3xl overflow-hidden card-hover">
      <div className="p-5 border-b border-white/10">
        <h2 className="text-white font-bold flex items-center gap-2">
          🎯 Progresso de Níveis
        </h2>
      </div>

      <div className="p-3 space-y-2">
        {levels.map((level, index) => {
          const isUnlocked = currentPoints >= level.minPoints
          const isNext = !isUnlocked && (index === 0 || currentPoints >= levels[index - 1].minPoints)

          return (
            <div
              key={level.name}
              className={`rounded-2xl p-4 border transition-all ${
                isUnlocked
                  ? 'bg-gradient-to-r from-orange-500/20 to-pink-500/20 border-orange-500/30'
                  : isNext
                  ? 'bg-white/5 border-white/10'
                  : 'bg-white/5 border-white/5'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="text-3xl">{level.icon}</div>
                
                <div className="flex-1">
                  <p className={`font-bold ${isUnlocked ? 'text-white' : 'text-gray-400'}`}>
                    {level.name.replace(/[🥉🥈🥇💎👑]/g, '').trim()}
                  </p>
                  <p className="text-sm text-gray-500">
                    {level.minPoints} pontos
                  </p>
                </div>

                <div>
                  {isUnlocked ? (
                    <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center">
                      <Check className="w-5 h-5 text-green-500" />
                    </div>
                  ) : isNext ? (
                    <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </div>
                  ) : (
                    <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center">
                      <Lock className="w-4 h-4 text-gray-600" />
                    </div>
                  )}
                </div>
              </div>

              {isUnlocked && level.benefits.length > 0 && (
                <div className="mt-3 pt-3 border-t border-white/10">
                  <p className="text-sm text-orange-400 font-medium">🎁 {level.benefits[0]}</p>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
