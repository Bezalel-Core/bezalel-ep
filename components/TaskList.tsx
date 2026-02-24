'use client'

import { Task } from '@/types'
import { Check, Plus } from 'lucide-react'

interface TaskListProps {
  tasks: Task[]
  onComplete: (taskId: string) => void
  title: string
}

export default function TaskList({ tasks, onComplete, title }: TaskListProps) {
  const completedCount = tasks.filter(t => t.completed).length

  return (
    <div className="glass rounded-3xl overflow-hidden card-hover">
      {/* Header */}
      <div className="p-5 border-b border-white/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">📋</span>
            <div>
              <h2 className="text-white font-bold">{title}</h2>
              <p className="text-gray-400 text-sm">{completedCount} de {tasks.length} concluídas</p>
            </div>
          </div>
          <div className="bg-white/5 px-3 py-1 rounded-full">
            <span className="text-orange-500 font-bold text-sm">{completedCount}/{tasks.length}</span>
          </div>
        </div>
      </div>

      {/* Task List */}
      <div className="p-3 space-y-2">
        {tasks.map((task) => (
          <button
            key={task.id}
            onClick={() => onComplete(task.id)}
            disabled={task.completed}
            className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all duration-200 ${
              task.completed
                ? 'bg-white/5'
                : 'bg-white/5 hover:bg-white/10 active:scale-[0.98]'
            }`}
          >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${
              task.completed ? 'bg-green-500/20 grayscale opacity-50' : 'bg-white/10'
            }`}>
              {task.icon}
            </div>

            <div className="flex-1 text-left">
              <p className={`font-medium ${task.completed ? 'text-gray-500 line-through' : 'text-white'}`}>
                {task.title}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className={`font-bold ${task.completed ? 'text-green-500' : 'text-orange-500'}`}>
                +{task.points}
              </span>
              
              {task.completed ? (
                <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center">
                  <Check className="w-5 h-5 text-green-500" />
                </div>
              ) : (
                <div className="w-10 h-10 bg-orange-500/20 rounded-xl flex items-center justify-center">
                  <Plus className="w-5 h-5 text-orange-500" />
                </div>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
