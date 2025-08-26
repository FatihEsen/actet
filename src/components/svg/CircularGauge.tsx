import React from 'react'

interface CircularGaugeProps {
  value: number
  min?: number
  max: number
  unit?: string
  size?: number
  strokeWidth?: number
  showValue?: boolean
  showRedline?: boolean
  redlineValue?: number
  warningValue?: number
  className?: string
  color?: string
  backgroundColor?: string
  redlineColor?: string
  warningColor?: string
}

export const CircularGauge: React.FC<CircularGaugeProps> = ({
  value,
  min = 0,
  max,
  unit = '',
  size = 200,
  strokeWidth = 8,
  showValue = true,
  showRedline = false,
  redlineValue,
  warningValue,
  className = '',
  color = '#00D4FF', // neon-blue
  backgroundColor = '#2A2A2A', // carbon-light
  redlineColor = '#FF3B3B', // neon-red
  warningColor = '#FF8C00' // neon-orange
}) => {
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  
  // Calculate angles (gauge goes from -135° to +135°, total 270°)
  const startAngle = -135
  const endAngle = 135
  const totalAngle = endAngle - startAngle
  
  // Calculate current value position
  const valueRatio = Math.max(0, Math.min(1, (value - min) / (max - min)))
  const currentAngle = startAngle + (totalAngle * valueRatio)
  
  // Calculate redline position if enabled
  const redlineRatio = redlineValue ? Math.max(0, Math.min(1, (redlineValue - min) / (max - min))) : 0
  const redlineAngle = startAngle + (totalAngle * redlineRatio)
  
  // Calculate warning position if enabled
  const warningRatio = warningValue ? Math.max(0, Math.min(1, (warningValue - min) / (max - min))) : 0
  const warningAngle = startAngle + (totalAngle * warningRatio)
  
  // SVG path calculations
  const centerX = size / 2
  const centerY = size / 2
  
  const polarToCartesian = (angle: number, r: number) => {
    const rad = (angle - 90) * Math.PI / 180
    return {
      x: centerX + r * Math.cos(rad),
      y: centerY + r * Math.sin(rad)
    }
  }
  
  const createArc = (startAngle: number, endAngle: number, radius: number) => {
    const start = polarToCartesian(startAngle, radius)
    const end = polarToCartesian(endAngle, radius)
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1"
    
    return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${end.x} ${end.y}`
  }
  
  // Calculate stroke dash array for the progress arc
  const progressArcLength = (totalAngle / 360) * circumference * valueRatio
  const totalArcLength = (totalAngle / 360) * circumference
  
  // Dynamic color based on value
  const getValueColor = () => {
    if (redlineValue && value >= redlineValue) return redlineColor
    if (warningValue && value >= warningValue) return warningColor
    return color
  }
  
  const formatValue = (val: number) => {
    if (val >= 1000) {
      return (val / 1000).toFixed(1) + 'k'
    }
    return Math.round(val).toString()
  }
  
  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background arc */}
        <path
          d={createArc(startAngle, endAngle, radius)}
          fill="none"
          stroke={backgroundColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
        
        {/* Redline arc (if enabled) */}
        {showRedline && redlineValue && (
          <path
            d={createArc(redlineAngle, endAngle, radius)}
            fill="none"
            stroke={redlineColor}
            strokeWidth={strokeWidth / 2}
            strokeLinecap="round"
            opacity={0.6}
          />
        )}
        
        {/* Warning arc (if enabled) */}
        {warningValue && (
          <path
            d={createArc(warningAngle, redlineAngle || endAngle, radius)}
            fill="none"
            stroke={warningColor}
            strokeWidth={strokeWidth / 2}
            strokeLinecap="round"
            opacity={0.4}
          />
        )}
        
        {/* Progress arc */}
        <path
          d={createArc(startAngle, currentAngle, radius)}
          fill="none"
          stroke={getValueColor()}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          style={{
            filter: `drop-shadow(0 0 6px ${getValueColor()})`
          }}
        />
        
        {/* Tick marks */}
        {Array.from({ length: 11 }, (_, i) => {
          const tickAngle = startAngle + (totalAngle * i / 10)
          const tickStart = polarToCartesian(tickAngle, radius - strokeWidth / 2)
          const tickEnd = polarToCartesian(tickAngle, radius - strokeWidth)
          
          return (
            <line
              key={i}
              x1={tickStart.x}
              y1={tickStart.y}
              x2={tickEnd.x}
              y2={tickEnd.y}
              stroke={backgroundColor}
              strokeWidth={1}
            />
          )
        })}
      </svg>
      
      {/* Center value display */}
      {showValue && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div 
            className="text-3xl font-racing font-bold"
            style={{ color: getValueColor() }}
          >
            {formatValue(value)}
          </div>
          {unit && (
            <div className="text-sm text-silver-dark font-medium">
              {unit}
            </div>
          )}
        </div>
      )}
    </div>
  )
}