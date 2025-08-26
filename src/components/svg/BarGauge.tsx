import React from 'react'

interface BarGaugeProps {
  value: number
  min?: number
  max: number
  unit?: string
  label?: string
  width?: number
  height?: number
  showValue?: boolean
  showPercentage?: boolean
  warningLevel?: number
  dangerLevel?: number
  className?: string
  color?: string
  backgroundColor?: string
  warningColor?: string
  dangerColor?: string
  orientation?: 'horizontal' | 'vertical'
  segments?: number
}

export const BarGauge: React.FC<BarGaugeProps> = ({
  value,
  min = 0,
  max,
  unit = '',
  label = '',
  width = 200,
  height = 20,
  showValue = true,
  showPercentage = false,
  warningLevel,
  dangerLevel,
  className = '',
  color = '#00D4FF', // neon-blue
  backgroundColor = '#2A2A2A', // carbon-light
  warningColor = '#FF8C00', // neon-orange
  dangerColor = '#FF3B3B', // neon-red
  orientation = 'horizontal',
  segments = 0
}) => {
  // Normalize value to 0-1 range
  const normalizedValue = Math.max(0, Math.min(1, (value - min) / (max - min)))
  
  // Calculate warning/danger positions
  const warningRatio = warningLevel ? Math.max(0, Math.min(1, (warningLevel - min) / (max - min))) : 0
  const dangerRatio = dangerLevel ? Math.max(0, Math.min(1, (dangerLevel - min) / (max - min))) : 0
  
  // Determine current color based on value
  const getCurrentColor = () => {
    if (dangerLevel && value >= dangerLevel) return dangerColor
    if (warningLevel && value >= warningLevel) return warningColor
    return color
  }
  
  const currentColor = getCurrentColor()
  
  // Adjust dimensions based on orientation
  const gaugeWidth = orientation === 'horizontal' ? width : height
  const gaugeHeight = orientation === 'horizontal' ? height : width
  const isVertical = orientation === 'vertical'
  
  // Calculate fill dimensions
  const fillLength = gaugeWidth * normalizedValue
  const warningPosition = gaugeWidth * warningRatio
  const dangerPosition = gaugeWidth * dangerRatio
  
  const formatValue = (val: number) => {
    if (showPercentage) {
      return `${Math.round(normalizedValue * 100)}%`
    }
    return `${Math.round(val)}${unit ? ` ${unit}` : ''}`
  }
  
  return (
    <div className={`flex ${isVertical ? 'flex-col' : 'flex-row'} items-center space-${isVertical ? 'y' : 'x'}-2 ${className}`}>
      {/* Label */}
      {label && (
        <span className="text-sm font-medium text-silver-dark whitespace-nowrap">
          {label}
        </span>
      )}
      
      {/* Gauge container */}
      <div className="relative" style={{ width: gaugeWidth, height: gaugeHeight }}>
        <svg 
          width={gaugeWidth} 
          height={gaugeHeight}
          className={isVertical ? 'transform rotate-180' : ''}
        >
          {/* Background */}
          <rect
            x={0}
            y={0}
            width={gaugeWidth}
            height={gaugeHeight}
            fill={backgroundColor}
            rx={gaugeHeight / 4}
            ry={gaugeHeight / 4}
          />
          
          {/* Warning zone */}
          {warningLevel && warningPosition < gaugeWidth && (
            <rect
              x={warningPosition}
              y={0}
              width={Math.min(gaugeWidth - warningPosition, dangerPosition - warningPosition || gaugeWidth)}
              height={gaugeHeight}
              fill={warningColor}
              opacity={0.3}
              rx={gaugeHeight / 4}
              ry={gaugeHeight / 4}
            />
          )}
          
          {/* Danger zone */}
          {dangerLevel && dangerPosition < gaugeWidth && (
            <rect
              x={dangerPosition}
              y={0}
              width={gaugeWidth - dangerPosition}
              height={gaugeHeight}
              fill={dangerColor}
              opacity={0.3}
              rx={gaugeHeight / 4}
              ry={gaugeHeight / 4}
            />
          )}
          
          {/* Progress fill */}
          <rect
            x={0}
            y={0}
            width={fillLength}
            height={gaugeHeight}
            fill={currentColor}
            rx={gaugeHeight / 4}
            ry={gaugeHeight / 4}
            style={{
              filter: `drop-shadow(0 0 4px ${currentColor})`
            }}
          />
          
          {/* Segments (if specified) */}
          {segments > 1 && Array.from({ length: segments - 1 }, (_, i) => {
            const segmentPosition = (gaugeWidth / segments) * (i + 1)
            return (
              <line
                key={i}
                x1={segmentPosition}
                y1={0}
                x2={segmentPosition}
                y2={gaugeHeight}
                stroke="#0A0A0A"
                strokeWidth={1}
              />
            )
          })}
          
          {/* Border */}
          <rect
            x={0}
            y={0}
            width={gaugeWidth}
            height={gaugeHeight}
            fill="none"
            stroke="#1A1A1A"
            strokeWidth={1}
            rx={gaugeHeight / 4}
            ry={gaugeHeight / 4}
          />
        </svg>
        
        {/* Value overlay */}
        {showValue && (
          <div 
            className={`absolute inset-0 flex items-center justify-center text-xs font-racing font-bold`}
            style={{ 
              color: normalizedValue > 0.5 ? '#0A0A0A' : currentColor,
              textShadow: '0 0 2px rgba(0,0,0,0.8)'
            }}
          >
            {formatValue(value)}
          </div>
        )}
      </div>
      
      {/* Value display (if not overlay) */}
      {!showValue && (
        <span 
          className="text-sm font-racing font-bold whitespace-nowrap"
          style={{ color: currentColor }}
        >
          {formatValue(value)}
        </span>
      )}
    </div>
  )
}