'use client'

import { Reward } from '@/types'
import { Gift, Lock, Check, Sparkles, Crown } from 'lucide-react'

interface RewardListProps {
  rewards: Reward[]
  currentPoints: number
}

export default function RewardList({ rewards, currentPoints }: RewardListProps) {
  return (
    <div className="gamer-card p-5 mb-4 animate-slide-up">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center animate-pulse"
          style={{ boxShadow: '0 0 20px rgba(236, 72, 153, 0.5)' }}
        >
          <Gift className="w-5 h-5 text-white" />
        </div>
        <h2 className="text-xl font-display text-white tracking-wide">🎁 Recompensas Disponíveis</h2>
      </div>

      <div className="space-y-3">
        {rewards.map((reward, index) => {
          const isUnlocked = reward.minPoints === 0 || currentPoints >= reward.minPoints
          const isStreakReward = reward.minPoints === 0

          return (
            <div
              key={reward.id}
              className={`p-4 rounded-2xl border-2 transition-all duration-300 hover-lift ${
                isUnlocked
                  ? 'bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-cyan-500/10 border-pink-500/30'
                  : 'bg-white/5 border-white/10'
              }`}
              style={{
                boxShadow: isUnlocked ? '0 0 30px rgba(236, 72, 153, 0.2)' : 'none',
                animationDelay: `${index * 0.1}s`,
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`text-4xl filter drop-shadow-lg ${isUnlocked ? 'animate-float' : 'grayscale opacity-50'}`}
                    style={{ animationDelay: `${index * 0.2}s` }}
                  >
                    {reward.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className={`font-black text-lg ${isUnlocked ? 'text-white' : 'text-gray-500'}`}>
                        {reward.title}
                      </p>
                      {isUnlocked && !isStreakReward && (
                        <Sparkles className="w-4 h-4 text-yellow-400 animate-pulse" />
                      )}
                      {isStreakReward && (
                        <span className="text-xs bg-orange-500/20 text-orange-400 px-2 py-0.5 rounded-full font-bold">
                          STREAK
                        </span>
                      )}
                    </div>
                    <p className={`text-sm ${isUnlocked ? 'text-gray-300' : 'text-gray-600'}`}>
                      {reward.description}
                    </p>
                  </div>
                </div>
                
                <div className="text-right">
                  {!isStreakReward ? (
                    <>
                      <p className={`font-black text-xl ${isUnlocked ? 'text-gradient-gold' : 'text-gray-600'}`}
                        style={isUnlocked ? { background: 'linear-gradient(135deg, #ffd700, #ffaa00)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' } : {}}
                      >
                        {reward.minPoints} pts
                      </p>
                      <div className="mt-1">
                        {isUnlocked ? (
                          <span className="inline-flex items-center gap-1 text-xs text-green-400 font-bold bg-green-500/20 px-2 py-1 rounded-full"
                          >
                            <Check className="w-3 h-3" /> Desbloqueado
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-xs text-gray-500 font-bold bg-white/10 px-2 py-1 rounded-full"
                          >
                            <Lock className="w-3 h-3" /> Bloqueado
                          </span>
                        )}
                      </div>
                    </>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-xs text-orange-400 font-bold bg-orange-500/20 px-3 py-1.5 rounded-full"
                    >
                      <Crown className="w-3 h-3" /> Streak Reward
                    </span>
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
