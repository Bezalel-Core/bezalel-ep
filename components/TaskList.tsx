'use client'

import { Task } from '@/types'
import { Check, Plus, Sparkles } from 'lucide-react'
import { useState } from 'react'

interface TaskListProps {
  tasks: Task[]
  onComplete: (taskId: string) => void
  title: string
  color: string
}

export default function TaskList({ tasks, onComplete, title, color }: TaskListProps) {
  const [animatingTask, setAnimatingTask] = useState<string | null>(null)

  const handleClick = (taskId: string) => {
    const task = tasks.find(t => t.id === taskId)
    if (task?.completed) return
    
    setAnimatingTask(taskId)
    setTimeout(() => {
      onComplete(taskId)
      setAnimatingTask(null)
    }, 300)
  }

  return (
    <div className="gamer-card p-5 mb-4 animate-slide-up">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <h2 className="text-xl font-display text-white tracking-wide">{title}</h2>
      </div>
      
      <div className="space-y-3">
        {tasks.map((task, index) => (
          <button
            key={task.id}
            onClick={() => handleClick(task.id)}
            className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all duration-300 hover-lift ${
              task.completed
                ? 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-2 border-green-400/50'
                : 'bg-white/5 border-2 border-white/10 hover:border-cyan-400/50 hover:bg-cyan-500/10'
            } ${animatingTask === task.id ? 'animate-bounce-in scale-105' : ''}`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-center gap-4">
              <span className="text-3xl filter drop-shadow-lg">{task.icon}</span>
              <span className={`font-bold text-lg ${task.completed ? 'text-green-400 line-through opacity-70' : 'text-white'}`}>
                {task.title}
              </span>
            </div>
            
            <div className="flex items-center gap-3">
              <span className={`font-black text-xl ${task.completed ? 'text-green-400' : 'text-gradient-cyan'}`}
                style={task.completed ? {} : { background: 'linear-gradient(135deg, #00f5ff, #00d4ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
              >
                +{task.points}
              </span>
              
              {task.completed ? (
                <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg animate-bounce-in"
                  style={{ boxShadow: '0 0 20px rgba(57, 255, 20, 0.5)' }}
                >
                  <Check className="w-6 h-6 text-white" strokeWidth={3} />
                </div>
              ) : (
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center transition-all hover:bg-cyan-500/30 hover:rotate-90"
                >
                  <Plus className="w-6 h-6 text-cyan-400" />
                </div>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
