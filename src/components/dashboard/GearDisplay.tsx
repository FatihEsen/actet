import React from 'react'
import { useTelemetry } from '../../store/TelemetryStore'

export const GearDisplay: React.FC = () => {
  const { telemetry } = useTelemetry()
  
  if (!telemetry) return null
  
  const { gear } = telemetry
  
  const getGearDisplay = () => {
    if (gear === 0) return 'N'
    if (gear === -1) return 'R'
    return gear.toString()
  }
  
  const getGearColor = () => {
    if (gear === 0) return '#FF8C00' // neutral - orange
    if (gear === -1) return '#FF3B3B' // reverse - red
    return '#00D4FF' // normal gears - blue
  }
  
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h3 className="text-sm font-racing font-bold text-silver-dark mb-2">GEAR</h3>
      
      <div className="relative">
        {/* Main gear display */}
        <div 
          className="w-16 h-16 rounded-lg border-2 flex items-center justify-center text-3xl font-racing font-bold transition-all duration-200"
          style={{ 
            borderColor: getGearColor(),
            color: getGearColor(),
            backgroundColor: 'rgba(26, 26, 26, 0.5)',
            boxShadow: `0 0 20px ${getGearColor()}33`
          }}
        >
          {getGearDisplay()}
        </div>
        
        {/* Gear indicator dots */}
        <div className="flex justify-center mt-2 space-x-1">
          {Array.from({ length: 6 }, (_, i) => {
            const gearNumber = i + 1
            const isActive = gear === gearNumber
            return (
              <div
                key={gearNumber}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
                  isActive ? 'bg-neon-blue' : 'bg-carbon-light'
                }`}
                style={{
                  boxShadow: isActive ? '0 0 4px #00D4FF' : 'none'
                }}
              />
            )
          })}
        </div>
        
        {/* Gear labels */}
        <div className="flex justify-center mt-1 space-x-1 text-xs text-silver-dark">
          {Array.from({ length: 6 }, (_, i) => (
            <span key={i + 1} className="w-1.5 text-center">
              {i + 1}
            </span>
          ))}
        </div>
      </div>
      
      {/* Additional info */}
      <div className="mt-3 text-center">
        {gear === 0 && (
          <span className="text-xs text-neon-orange">NEUTRAL</span>
        )}
        {gear === -1 && (
          <span className="text-xs text-neon-red">REVERSE</span>
        )}
        {gear > 0 && (
          <span className="text-xs text-silver-dark">
            Gear {gear}/6
          </span>
        )}
      </div>
    </div>
  )
}