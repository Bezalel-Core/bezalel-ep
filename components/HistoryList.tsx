'use client'

import { Transaction } from '@/types'
import { ArrowUp, ArrowDown, Clock } from 'lucide-react'

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

  return (
    <div className="glass rounded-3xl overflow-hidden card-hover">
      <div className="p-5 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-cyan-500/20 rounded-xl flex items-center justify-center">
            <Clock className="w-5 h-5 text-cyan-500" />
          </div>
          <div>
            <h2 className="text-white font-bold">📜 Histórico</h2>
            <p className="text-gray-400 text-sm">Suas últimas atividades</p>
          </div>
        </div>
      </div>

      <div className="p-3">
        {transactions.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4 opacity-50">📝</div>
            <p className="text-gray-500 font-medium">Nenhuma atividade ainda</p>
          </div>
        ) : (
          <div className="space-y-2">
            {transactions.map((transaction) => (
              <div
                key={transaction.id}
                className={`flex items-center gap-4 p-4 rounded-2xl ${
                  transaction.type === 'earn' 
                    ? 'bg-green-500/10 border border-green-500/20' 
                    : 'bg-red-500/10 border border-red-500/20'
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    transaction.type === 'earn' 
                      ? 'bg-green-500/20' 
                      : 'bg-red-500/20'
                  }`}
                >
                  {transaction.type === 'earn' ? (
                    <ArrowUp className="w-5 h-5 text-green-500" />
                  ) : (
                    <ArrowDown className="w-5 h-5 text-red-500" />
                  )}
                </div>

                <div className="flex-1">
                  <p className="font-medium text-white">{transaction.title}</p>
                  <p className="text-xs text-gray-500">
                    {formatDate(transaction.date)} às {formatTime(transaction.date)}
                  </p>
                </div>

                <span
                  className={`font-bold text-lg ${
                    transaction.type === 'earn' 
                      ? 'text-green-400' 
                      : 'text-red-400'
                  }`}
                >
                  {transaction.type === 'earn' ? '+' : ''}
                  {transaction.points}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
