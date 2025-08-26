import React from 'react'

interface IndicatorLightProps {
  active: boolean
  label: string
  activeColor: string
  inactiveColor: string
  pulsing?: boolean
  size?: number
  className?: string
}

export const IndicatorLight: React.FC<IndicatorLightProps> = ({
  active,
  label,
  activeColor,
  inactiveColor,
  pulsing = false,
  size = 50,
  className = ''
}) => {
  const color = active ? activeColor : inactiveColor
  const glowEffect = active ? `0 0 15px ${activeColor}` : 'none'
  
  return (
    <div className={`flex flex-col items-center space-y-2 ${className}`}>
      <div
        className={`relative flex items-center justify-center rounded-lg border-2 transition-all duration-200 ${
          pulsing && active ? 'animate-pulse' : ''
        }`}
        style={{
          width: size,
          height: size,
          backgroundColor: color,
          borderColor: active ? activeColor : '#2A2A2A',
          boxShadow: glowEffect,
        }}
      >
        {/* Inner light circle */}
        <div
          className="rounded-full transition-all duration-200"
          style={{
            width: size * 0.6,
            height: size * 0.6,
            backgroundColor: active ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.1)',
            boxShadow: active ? `inset 0 0 10px ${activeColor}` : 'none',
          }}
        />
        
        {/* Reflection effect */}
        <div
          className="absolute top-1 left-1 rounded-full opacity-40"
          style={{
            width: size * 0.25,
            height: size * 0.25,
            backgroundColor: 'white',
            background: 'linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%)',
          }}
        />
      </div>
      
      {/* Label */}
      <span
        className={`text-xs font-racing font-bold transition-colors duration-200 ${
          active ? 'text-white' : 'text-silver-dark'
        }`}
        style={{
          color: active ? activeColor : undefined,
          textShadow: active ? `0 0 8px ${activeColor}` : 'none',
        }}
      >
        {label}
      </span>
    </div>
  )
}