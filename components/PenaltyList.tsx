'use client'

import { Penalty } from '@/types'
import { AlertTriangle, Minus } from 'lucide-react'

interface PenaltyListProps {
  penalties: Penalty[]
  onApply: (penaltyId: string) => void
}

export default function PenaltyList({ penalties, onApply }: PenaltyListProps) {
  return (
    <div className="glass rounded-3xl overflow-hidden card-hover">
      <div className="p-5 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-red-500/20 rounded-xl flex items-center justify-center">
            <AlertTriangle className="w-5 h-5 text-red-500" />
          </div>
          <div>
            <h2 className="text-white font-bold">Penalidades</h2>
            <p className="text-gray-400 text-sm">Toque para registrar</p>
          </div>
        </div>
      </div>

      <div className="p-3">
        <div className="grid grid-cols-2 gap-2">
          {penalties.map((penalty) => (
            <button
              key={penalty.id}
              onClick={() => onApply(penalty.id)}
              className="bg-red-500/10 border border-red-500/20 hover:border-red-500/40 rounded-2xl p-3 transition-all active:scale-[0.98] text-left"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl">{penalty.icon}</span>
                <div className="flex items-center gap-1 bg-red-500/20 text-red-400 px-2 py-1 rounded-lg text-xs font-bold">
                  <Minus className="w-3 h-3" />
                  {Math.abs(penalty.points)}
                </div>
              </div>
              <p className="text-xs text-gray-300 font-medium leading-tight">{penalty.title}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
