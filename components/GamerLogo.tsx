'use client'

export default function GamerLogo({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' | 'xl' }) {
  const sizes = {
    sm: { container: 'w-12 h-12', text: 'text-lg', subtext: 'text-[6px]' },
    md: { container: 'w-16 h-16', text: 'text-2xl', subtext: 'text-[8px]' },
    lg: { container: 'w-24 h-24', text: 'text-4xl', subtext: 'text-xs' },
    xl: { container: 'w-32 h-32', text: 'text-5xl', subtext: 'text-sm' },
  }

  const { container, text, subtext } = sizes[size]

  return (
    <div className={`${container} relative group cursor-pointer`}>
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 via-purple-500 to-pink-500 rounded-2xl blur-xl opacity-60 group-hover:opacity-90 transition-opacity animate-pulse" />
      
      {/* Container */}
      <div className="relative w-full h-full rounded-2xl bg-gradient-to-br from-gray-900 via-black to-gray-900 border-2 border-white/20 flex flex-col items-center justify-center overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-purple-500/20 to-pink-500/20 opacity-50" 
          style={{ animation: 'gradient-shift 3s ease infinite' }} 
        />
        
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 245, 255, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 245, 255, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '6px 6px',
          }}
        />
        
        {/* EP Text */}
        <div className="relative z-10 flex flex-col items-center">
          <span 
            className={`${text} font-black tracking-tighter`}
            style={{
              background: 'linear-gradient(135deg, #00f5ff 0%, #9d00ff 50%, #ff00ff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(0 0 8px rgba(0, 245, 255, 0.5))',
            }}
          >
            EP
          </span>
          <span className={`${subtext} font-bold text-cyan-400 tracking-widest uppercase`}>
            Bezalel
          </span>
        </div>
        
        {/* Corner accents */}
        <div className="absolute top-1 left-1 w-2 h-2 border-t-2 border-l-2 border-cyan-400 rounded-tl" />
        <div className="absolute top-1 right-1 w-2 h-2 border-t-2 border-r-2 border-pink-400 rounded-tr" />
        <div className="absolute bottom-1 left-1 w-2 h-2 border-b-2 border-l-2 border-purple-400 rounded-bl" />
        <div className="absolute bottom-1 right-1 w-2 h-2 border-b-2 border-r-2 border-cyan-400 rounded-br" />
        
        {/* Shine effect */}
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
          style={{
            background: 'linear-gradient(135deg, transparent 40%, rgba(255,255,255,0.1) 50%, transparent 60%)',
            transform: 'translateX(-100%)',
            animation: 'shine 2s infinite',
          }}
        />
      </div>
      
      <style jsx>{`
        @keyframes gradient-shift {
          0%, 100% { filter: hue-rotate(0deg); }
          50% { filter: hue-rotate(30deg); }
        }
        @keyframes shine {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
      `}</style>
    </div>
  )
}

// Componente para o logo com ícone de evolução
export function EvolutionLogo({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizes = {
    sm: { container: 'w-14 h-14', icon: 'text-xl' },
    md: { container: 'w-20 h-20', icon: 'text-3xl' },
    lg: { container: 'w-28 h-28', icon: 'text-5xl' },
  }

  const { container, icon } = sizes[size]

  return (
    <div className={`${container} relative group`}>
      {/* Multiple glow rings */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 via-purple-500 to-pink-500 rounded-3xl blur-2xl opacity-40 animate-pulse" />
      <div className="absolute inset-2 bg-gradient-to-br from-purple-500 via-pink-500 to-cyan-500 rounded-2xl blur-xl opacity-30 animate-pulse" style={{ animationDelay: '0.5s' }} />
      
      {/* Main container */}
      <div className="relative w-full h-full rounded-3xl bg-gradient-to-br from-gray-900 via-black to-gray-900 border-2 border-white/10 flex items-center justify-center overflow-hidden">
        {/* Hexagon pattern background */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 0l8.66 5v10L10 20l-8.66-5V5z' fill='none' stroke='%2300f5ff' stroke-width='0.5'/%3E%3C/svg%3E")`,
          }}
        />
        
        {/* Evolution arrow animation */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-cyan-400 opacity-20 animate-bounce" style={{ animationDuration: '2s' }}>
            ⬆️
          </div>
        </div>
        
        {/* Main icon */}
        <div className={`${icon} relative z-10 animate-float`}>
          ⚡🎮
        </div>
        
        {/* Orbiting dots */}
        <div className="absolute inset-0 animate-spin" style={{ animationDuration: '8s' }}>
          <div className="absolute top-1 left-1/2 w-1.5 h-1.5 bg-cyan-400 rounded-full" />
        </div>
        <div className="absolute inset-0 animate-spin" style={{ animationDuration: '12s', animationDirection: 'reverse' }}>
          <div className="absolute bottom-1 right-1/2 w-1 h-1 bg-pink-400 rounded-full" />
        </div>
      </div>
      
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-5px) rotate(5deg); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
