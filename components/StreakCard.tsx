'use client'

import { Flame, Gift, Target, Zap } from 'lucide-react'

interface StreakCardProps {
  streakDays: number
}

export default function StreakCard({ streakDays }: StreakCardProps) {
  const daysForReward1 = 7
  const daysForReward2 = 14
  const daysForReward3 = 30
  
  const progress1 = Math.min(100, (streakDays / daysForReward1) * 100)
  const progress2 = Math.min(100, (streakDays / daysForReward2) * 100)
  const progress3 = Math.min(100, (streakDays / daysForReward3) * 100)

  const rewards = [
    {
      days: daysForReward1,
      reward: '🍔 Lanche no McDonald\'s ou Chick-fil-A',
      progress: progress1,
      completed: streakDays >= daysForReward1,
      color: 'from-orange-500 to-red-500',
      glow: 'rgba(249, 115, 22, 0.5)',
    },
    {
      days: daysForReward2,
      reward: '🎪 Diversão extra (arcade, jump park)',
      progress: progress2,
      completed: streakDays >= daysForReward2,
      color: 'from-purple-500 to-pink-500',
      glow: 'rgba(168, 85, 247, 0.5)',
    },
    {
      days: daysForReward3,
      reward: '🎮 Jogo NOVO ou console!',
      progress: progress3,
      completed: streakDays >= daysForReward3,
      color: 'from-cyan-500 to-blue-600',
      glow: 'rgba(6, 182, 212, 0.5)',
    },
  ]

  return (
    <div className="gamer-card p-5 mb-4 animate-slide-up">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center animate-pulse"
          style={{ boxShadow: '0 0 20px rgba(249, 115, 22, 0.5)' }}
        >
          <Flame className="w-5 h-5 text-white fill-white" />
        </div>
        <div>
          <h2 className="text-xl font-display text-white tracking-wide">🔥 Streak de Dias Perfeitos</h2>
          <p className="text-sm text-gray-400">Complete tarefas todos os dias!</p>
        </div>
      </div>

      <div className="space-y-4">
        {rewards.map((reward, index) => (
          <div
            key={reward.days}
            className={`p-4 rounded-2xl border-2 transition-all duration-300 hover-lift ${
              reward.completed
                ? `bg-gradient-to-r ${reward.color} bg-opacity-20`
                : 'bg-white/5 border-white/10'
            }`}
            style={{
              borderColor: reward.completed ? 'transparent' : undefined,
              boxShadow: reward.completed ? `0 0 30px ${reward.glow}` : 'none',
            }}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  reward.completed 
                    ? `bg-gradient-to-br ${reward.color}` 
                    : 'bg-white/10'
                }`}
                >
                  {reward.completed ? (
                    <Zap className="w-5 h-5 text-white fill-white" />
                  ) : (
                    <Target className="w-5 h-5 text-gray-400" />
                  )}
                </div>
                <div>
                  <p className={`font-bold ${reward.completed ? 'text-white' : 'text-gray-300'}`}>
                    {reward.days} dias perfeitos
                  </p>
                  <p className="text-sm text-gray-400">{reward.reward}</p>
                </div>
              </div>
              
              <span className={`text-sm font-black px-3 py-1 rounded-full ${
                reward.completed 
                  ? 'bg-white/20 text-white' 
                  : 'bg-white/10 text-gray-400'
              }`}
              >
                {reward.completed ? '✓ CONCLUÍDO!' : `${streakDays}/${reward.days}`}
              </span>
            </div>

            {!reward.completed && (
              <div className="progress-gamer">
                <div
                  className="progress-gamer-fill"
                  style={{ 
                    width: `${reward.progress}%`,
                    background: `linear-gradient(90deg, var(--neon-cyan), var(--neon-purple))`,
                  }}
                />
              </div>
            )}
            
            {reward.completed && (
              <div className="flex items-center gap-2 mt-2 animate-pulse">
                <Gift className="w-4 h-4 text-white" />
                <span className="text-sm font-bold text-white">Recompensa disponível!</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Visual de streak */}
      <div className="mt-5 p-4 rounded-2xl bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20">
        <div className="flex items-center justify-center gap-2">
          <span className="text-2xl">🔥</span>
          <span className="text-3xl font-black text-gradient-gold">{streakDays}</span>
          <span className="text-2xl">🔥</span>
        </div>
        <p className="text-center text-sm text-gray-400 mt-1">
          {streakDays === 0 ? 'Comece seu streak hoje!' : 
           streakDays === 1 ? '1 dia perfeito! Continue!' : 
           `${streakDays} dias perfeitos seguidos!`}
        </p>
      </div>
    </div>
  )
}
