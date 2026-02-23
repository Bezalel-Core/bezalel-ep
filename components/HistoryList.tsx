'use client'

import { Transaction } from '@/types'
import { ArrowUp, ArrowDown, Clock, History, TrendingUp, TrendingDown } from 'lucide-react'

interface HistoryListProps {
  transactions: Transaction[]
}

export default function HistoryList({ transactions }: HistoryListProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })
  }

  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
  }

  const totalEarned = transactions
    .filter(t => t.type === 'earn')
    .reduce((sum, t) => sum + t.points, 0)
  
  const totalLost = transactions
    .filter(t => t.type === 'lose')
    .reduce((sum, t) => sum + t.points, 0)

  return (
    <div className="gamer-card p-5 mb-4 animate-slide-up">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center"
003e
          <History className="w-5 h-5 text-white" />
        </div>
        <h2 className="text-xl font-display text-white tracking-wide">📜 Histórico de Pontos</h2>
      </div>

      {/* Resumo */}
      {transactions.length > 0 && (
        <div className="grid grid-cols-2 gap-3 mb-5">
          <div className="p-4 rounded-2xl bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30"
          >
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="w-4 h-4 text-green-400" />
              <span className="text-xs text-green-400 font-bold">GANHOS</span>
            </div>
            <p className="text-2xl font-black text-green-400">+{totalEarned}</p>
          </div>
          
          <div className="p-4 rounded-2xl bg-gradient-to-r from-red-500/20 to-pink-500/20 border border-red-500/30"
          >
            <div className="flex items-center gap-2 mb-1">
              <TrendingDown className="w-4 h-4 text-red-400" />
              <span className="text-xs text-red-400 font-bold">PERDIDOS</span>
            </div>
            <p className="text-2xl font-black text-red-400">{totalLost}</p>
          </div>
        </div>
      )}

      <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
        {transactions.length === 0 ? (
          <div className="text-center py-10">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-white/5 flex items-center justify-center"
            >
              <Clock className="w-8 h-8 text-gray-600" />
            </div>
            <p className="text-gray-500 font-medium">Nenhuma atividade ainda</p>
            <p className="text-sm text-gray-600 mt-1">Complete tarefas para ver seu histórico!</p>
          </div>
        ) : (
          transactions.map((transaction, index) => (
            <div
              key={transaction.id}
              className={`flex items-center justify-between p-4 rounded-2xl transition-all hover-lift ${
                transaction.type === 'earn' 
                  ? 'bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20' 
                  : 'bg-gradient-to-r from-red-500/10 to-pink-500/10 border border-red-500/20'
              }`}
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    transaction.type === 'earn' 
                      ? 'bg-gradient-to-br from-green-400 to-emerald-500' 
                      : 'bg-gradient-to-br from-red-400 to-pink-500'
                  }`}
                  style={{
                    boxShadow: transaction.type === 'earn' 
                      ? '0 0 15px rgba(57, 255, 20, 0.4)' 
                      : '0 0 15px rgba(239, 68, 68, 0.4)',
                  }}
                >
                  {transaction.type === 'earn' ? (
                    <ArrowUp className="w-6 h-6 text-white" strokeWidth={3} />
                  ) : (
                    <ArrowDown className="w-6 h-6 text-white" strokeWidth={3} />
                  )}
                </div>
                <div>
                  <p className="font-bold text-white">{transaction.title}</p>
                  <p className="text-xs text-gray-500 flex items-center gap-1"
003e
                    <Clock className="w-3 h-3" />
                    {formatDate(transaction.date)} às {formatTime(transaction.date)}
                  </p>
                </div>
              </div>
              <span
                className={`font-black text-xl ${
                  transaction.type === 'earn' ? 'text-green-400' : 'text-red-400'
                }`}
              >
                {transaction.type === 'earn' ? '+' : ''}
                {transaction.points}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
