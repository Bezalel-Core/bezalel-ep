'use client'

import { Penalty } from '@/types'
import { Minus, AlertTriangle, Zap, Skull } from 'lucide-react'
import { useState } from 'react'

interface PenaltyListProps {
  penalties: Penalty[]
  onApply: (penaltyId: string) => void
}

export default function PenaltyList({ penalties, onApply }: PenaltyListProps) {
  const [clickedId, setClickedId] = useState<string | null>(null)

  const handleClick = (penaltyId: string) => {
    setClickedId(penaltyId)
    setTimeout(() => {
      onApply(penaltyId)
      setClickedId(null)
    }, 200)
  }

  return (
    <div className="gamer-card p-5 mb-4 animate-slide-up">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-pink-600 flex items-center justify-center"
          style={{ boxShadow: '0 0 20px rgba(239, 68, 68, 0.4)' }}
        >
          <AlertTriangle className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-display text-white tracking-wide">⚠️ Penalidades</h2>
          <p className="text-sm text-gray-400">Cuidado! Clique para registrar</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {penalties.map((penalty, index) => (
          <button
            key={penalty.id}
            onClick={() => handleClick(penalty.id)}
            className={`p-4 rounded-2xl transition-all duration-200 text-left group ${
              clickedId === penalty.id 
                ? 'animate-shake scale-95' 
                : 'hover:scale-105'
            }`}
            style={{
              background: 'linear-gradient(145deg, rgba(239, 68, 68, 0.15) 0%, rgba(236, 72, 153, 0.15) 100%)',
              border: '2px solid rgba(239, 68, 68, 0.3)',
              boxShadow: '0 4px 15px rgba(239, 68, 68, 0.1)',
              animationDelay: `${index * 0.1}s`,
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl filter drop-shadow-lg group-hover:scale-110 transition-transform">{penalty.icon}</span>
              <div className="flex items-center gap-1">
                <Minus className="w-4 h-4 text-red-400" />
                <span className="text-red-400 font-black">{Math.abs(penalty.points)}</span>
              </div>
            </div>
            <p className="text-sm text-gray-300 font-bold group-hover:text-white transition-colors">
              {penalty.title}
            </p>
            
            <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="flex items-center gap-1 text-xs text-red-400"
003e
                <Zap className="w-3 h-3" />
                <span>Clique para aplicar</span>
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="mt-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center gap-3"
003e
        <Skull className="w-5 h-5 text-red-400" />
        <p className="text-xs text-gray-400">
          Penalidades reduzem seus pontos! Fique atento às regras.
        </p>
      </div>
    </div>
  )
}
