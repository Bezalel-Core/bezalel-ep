'use client'

export default function GamerLogo({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizes = {
    sm: { container: 'w-12 h-12', icon: 'text-2xl' },
    md: { container: 'w-16 h-16', icon: 'text-3xl' },
    lg: { container: 'w-24 h-24', icon: 'text-5xl' },
  }

  const { container, icon } = sizes[size]

  return (
    <div className={`${container} relative group`}>
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 via-purple-500 to-pink-500 rounded-2xl blur-xl opacity-50 group-hover:opacity-80 transition-opacity animate-pulse" />
      
      {/* Container */}
      <div className="relative w-full h-full rounded-2xl bg-gradient-to-br from-gray-900 to-black border-2 border-white/20 flex items-center justify-center overflow-hidden"
003e
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-purple-500/20 to-pink-500/20 animate-rainbow opacity-50" />
        
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 245, 255, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 245, 255, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '8px 8px',
          }}
        />
        
        {/* Icon */}
        <span className={`${icon} relative z-10 animate-float`}>🎮</span>
        
        {/* Corner accents */}
        <div className="absolute top-1 left-1 w-2 h-2 border-t-2 border-l-2 border-cyan-400 rounded-tl" />
        <div className="absolute top-1 right-1 w-2 h-2 border-t-2 border-r-2 border-pink-400 rounded-tr" />
        <div className="absolute bottom-1 left-1 w-2 h-2 border-b-2 border-l-2 border-purple-400 rounded-bl" />
        <div className="absolute bottom-1 right-1 w-2 h-2 border-b-2 border-r-2 border-cyan-400 rounded-br" />
      </div>
      
      <style jsx>{`
        @keyframes rainbow {
          0% { filter: hue-rotate(0deg); }
          100% { filter: hue-rotate(360deg); }
        }
        .animate-rainbow {
          animation: rainbow 4s linear infinite;
        }
      `}</style>
    </div>
  )
}
