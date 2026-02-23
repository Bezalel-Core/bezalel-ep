'use client'

import { useEffect, useState } from 'react'

interface ConfettiPiece {
  id: number
  x: number
  color: string
  delay: number
  duration: number
  size: number
}

export function useConfetti() {
  const [confettiPieces, setConfettiPieces] = useState<ConfettiPiece[]>([])
  const [isActive, setIsActive] = useState(false)

  const triggerConfetti = () => {
    const colors = ['#00f5ff', '#ff00ff', '#9d00ff', '#39ff14', '#ffff00', '#ff6600', '#ff6b9d', '#00d4ff']
    const pieces: ConfettiPiece[] = Array.from({ length: 50 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 100,
      color: colors[Math.floor(Math.random() * colors.length)],
      delay: Math.random() * 0.5,
      duration: 2 + Math.random() * 2,
      size: 8 + Math.random() * 8,
    }))
    
    setConfettiPieces(pieces)
    setIsActive(true)
    
    setTimeout(() => {
      setIsActive(false)
      setConfettiPieces([])
    }, 4000)
  }

  return { triggerConfetti, confettiPieces, isActive }
}

export function Confetti({ pieces }: { pieces: ConfettiPiece[] }) {
  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {pieces.map((piece) => (
        <div
          key={piece.id}
          className="absolute animate-confetti"
          style={{
            left: `${piece.x}%`,
            top: '-20px',
            animationDelay: `${piece.delay}s`,
            animationDuration: `${piece.duration}s`,
          }}
        >
          <div
            style={{
              width: piece.size,
              height: piece.size,
              backgroundColor: piece.color,
              borderRadius: Math.random() > 0.5 ? '50%' : '2px',
              transform: `rotate(${Math.random() * 360}deg)`,
              boxShadow: `0 0 10px ${piece.color}`,
            }}
          />
        </div>
      ))}
      <style jsx>{`
        @keyframes confetti {
          0% {
            transform: translateY(0) rotate(0deg) scale(1);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg) scale(0.5);
            opacity: 0;
          }
        }
        .animate-confetti {
          animation: confetti ease-out forwards;
        }
      `}</style>
    </div>
  )
}

export function SparkleEffect({ children, trigger }: { children: React.ReactNode; trigger: boolean }) {
  const [sparkles, setSparkles] = useState<{ id: number; x: number; y: number }[]>([])

  useEffect(() => {
    if (trigger) {
      const newSparkles = Array.from({ length: 8 }, (_, i) => ({
        id: Date.now() + i,
        x: 20 + Math.random() * 60,
        y: 20 + Math.random() * 60,
      }))
      setSparkles(newSparkles)
      setTimeout(() => setSparkles([]), 1000)
    }
  }, [trigger])

  return (
    <div className="relative inline-block">
      {children}
      {sparkles.map((sparkle) => (
        <div
          key={sparkle.id}
          className="absolute pointer-events-none"
          style={{
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
            animation: 'sparkle 0.8s ease-out forwards',
          }}
        >
          ✨
        </div>
      ))}
      <style jsx>{`
        @keyframes sparkle {
          0% {
            transform: scale(0) rotate(0deg);
            opacity: 1;
          }
          50% {
            transform: scale(1.5) rotate(180deg);
            opacity: 1;
          }
          100% {
            transform: scale(0) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  )
}

export function BounceText({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`inline-block animate-bounce-gentle ${className}`}>
      {children}
      <style jsx>{`
        @keyframes bounce-gentle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        .animate-bounce-gentle {
          animation: bounce-gentle 1s ease-in-out infinite;
        }
      `}</style>
    </span>
  )
}

export function PointsPopup({ points, show }: { points: number; show: boolean }) {
  if (!show) return null
  
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
      <div 
        className="text-6xl font-black animate-points-popup"
        style={{
          background: 'linear-gradient(135deg, #00f5ff, #ff00ff)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textShadow: '0 0 30px rgba(0, 245, 255, 0.5)',
        }}
      >
        +{points}
      </div>
      <style jsx>{`
        @keyframes points-popup {
          0% {
            transform: scale(0) translateY(0);
            opacity: 0;
          }
          20% {
            transform: scale(1.5) translateY(-20px);
            opacity: 1;
          }
          80% {
            transform: scale(1) translateY(-40px);
            opacity: 1;
          }
          100% {
            transform: scale(0.8) translateY(-60px);
            opacity: 0;
          }
        }
        .animate-points-popup {
          animation: points-popup 1.2s ease-out forwards;
        }
      `}</style>
    </div>
  )
}
