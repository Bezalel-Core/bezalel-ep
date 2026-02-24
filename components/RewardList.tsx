'use client'

import { Reward } from '@/types'
import { Gift, Lock, Check, Sparkles } from 'lucide-react'

interface RewardListProps {
  rewards: Reward[]
  currentPoints: number
}

export default function RewardList({ rewards, currentPoints }: RewardListProps) {
  return (
    <div className="glass rounded-3xl overflow-hidden card-hover">
      <div className="p-5 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-pink-500/20 rounded-xl flex items-center justify-center">
            <Gift className="w-5 h-5 text-pink-500" />
          </div>
          <div>
            <h2 className="text-white font-bold">🎁 Recompensas</h2>
            <p className="text-gray-400 text-sm">Desbloqueie com seus pontos</p>
          </div>
        </div>
      </div>

      <div className="p-3 space-y-2">
        {rewards.map((reward) => {
          const isUnlocked = reward.minPoints === 0 || currentPoints >= reward.minPoints

          return (
            <div
              key={reward.id}
              className={`rounded-2xl p-4 border transition-all ${
                isUnlocked
                  ? 'bg-gradient-to-r from-pink-500/20 to-purple-500/20 border-pink-500/30'
                  : 'bg-white/5 border-white/10'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="text-3xl">{reward.icon}</div>
                
                <div className="flex-1">
                  <p className={`font-bold ${isUnlocked ? 'text-white' : 'text-gray-400'}`}>
                    {reward.title}
                  </p>
                  <p className={`text-sm ${isUnlocked ? 'text-gray-300' : 'text-gray-500'}`}>
                    {reward.description}
                  </p>
                </div>

                <div>
                  {reward.minPoints > 0 ? (
                    isUnlocked ? (
                      <div className="bg-green-500/20 text-green-400 px-3 py-2 rounded-xl flex items-center gap-2">
                        <Check className="w-4 h-4" />
                        <span className="text-sm font-bold">Liberado</span>
                      </div>
                    ) : (
                      <div className="bg-white/5 text-gray-500 px-3 py-2 rounded-xl flex items-center gap-2">
                        <Lock className="w-4 h-4" />
                        <span className="text-sm font-bold">{reward.minPoints} pts</span>
                      </div>
                    )
                  ) : (
                    <div className="bg-orange-500/20 text-orange-400 px-3 py-2 rounded-xl flex items-center gap-2">
                      <Sparkles className="w-4 h-4" />
                      <span className="text-sm font-bold">Streak</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
