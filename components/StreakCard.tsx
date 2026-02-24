'use client'

import { Flame, Gift, Star } from 'lucide-react'

interface StreakCardProps {
  streakDays: number
}

export default function StreakCard({ streakDays }: StreakCardProps) {
  const daysForReward1 = 7
  const daysForReward2 = 14
  const progress1 = Math.min(100, (streakDays / daysForReward1) * 100)
  const progress2 = Math.min(100, (streakDays / daysForReward2) * 100)

  return (
    <div className="glass rounded-3xl overflow-hidden card-hover">
      <div className="p-5 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-orange-500/20 rounded-xl flex items-center justify-center">
            <Flame className="w-5 h-5 text-orange-500" />
          </div>
          <div>
            <h2 className="text-white font-bold">🔥 Streak</h2>
            <p className="text-gray-400 text-sm">Dias perfeitos consecutivos</p>
          </div>
        </div>
      </div>

      <div className="p-3 space-y-3">
        {/* 7 dias */}
        <div className={`rounded-2xl p-4 border ${
          streakDays >= 7 
            ? 'bg-green-500/10 border-green-500/30' 
            : 'bg-white/5 border-white/10'
        }`}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                <Gift className={`w-5 h-5 ${streakDays >= 7 ? 'text-green-500' : 'text-gray-400'}`} />
              </div>
              <div>
                <p className={`font-bold ${streakDays >= 7 ? 'text-white' : 'text-gray-400'}`}>
                  7 Dias
                </p>
                <p className="text-xs text-gray-500">Lanche Mc/CFA</p>
              </div>
            </div>
            
            {streakDays >= 7 ? (
              <div className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs font-bold">
                ✓ Concluído
              </div>
            ) : (
              <div className="text-orange-500 font-bold">
                {streakDays}/{daysForReward1}
              </div>
            )}
          </div>
          
          {streakDays < 7 && (
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-orange-500 to-pink-500 rounded-full"
                style={{ width: `${progress1}%` }}
              />
            </div>
          )}
        </div>

        {/* 14 dias */}
        <div className={`rounded-2xl p-4 border ${
          streakDays >= 14 
            ? 'bg-green-500/10 border-green-500/30' 
            : 'bg-white/5 border-white/10'
        }`}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                <Star className={`w-5 h-5 ${streakDays >= 14 ? 'text-green-500' : 'text-gray-400'}`} />
              </div>
              <div>
                <p className={`font-bold ${streakDays >= 14 ? 'text-white' : 'text-gray-400'}`}>
                  14 Dias
                </p>
                <p className="text-xs text-gray-500">Arcade/Jump Park</p>
              </div>
            </div>
            
            {streakDays >= 14 ? (
              <div className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs font-bold">
                ✓ Concluído
              </div>
            ) : (
              <div className="text-purple-500 font-bold">
                {streakDays}/{daysForReward2}
              </div>
            )}
          </div>
          
          {streakDays < 14 && (
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                style={{ width: `${progress2}%` }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
