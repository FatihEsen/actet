import React from 'react'
import { useTelemetry } from '../../store/TelemetryStore'
import { CircularGauge } from '../svg/CircularGauge'

export const RPMGauge: React.FC = () => {
  const { telemetry } = useTelemetry()
  
  if (!telemetry) return null
  
  const { rpm, maxRpm } = telemetry
  const redlineRpm = maxRpm * 0.9
  const shiftRpm = maxRpm * 0.95
  
  // Shift light logic
  const shouldShowShiftLight = rpm >= shiftRpm
  
  return (
    <div className="flex flex-col items-center space-y-2">
      <div className="flex items-center space-x-2">
        <h3 className="text-lg font-racing font-bold text-neon-blue">RPM</h3>
        {/* Shift light */}
        {shouldShowShiftLight && (
          <div className="flex space-x-1">
            {Array.from({ length: 5 }, (_, i) => (
              <div
                key={i}
                className="w-3 h-3 bg-neon-red rounded-full animate-shift-light"
                style={{
                  animationDelay: `${i * 0.1}s`
                }}
              />
            ))}
          </div>
        )}
      </div>
      
      <CircularGauge
        value={rpm}
        max={maxRpm}
        unit="RPM"
        size={180}
        strokeWidth={10}
        showValue={true}
        showRedline={true}
        redlineValue={redlineRpm}
        warningValue={redlineRpm * 0.9}
        color="#00FF94"
        warningColor="#FF8C00"
        redlineColor="#FF3B3B"
        className="mx-auto"
      />
      
      {/* Additional RPM info */}
      <div className="flex justify-between w-full text-xs text-silver-dark">
        <span>Idle: 800</span>
        <span>Redline: {Math.round(redlineRpm)}</span>
      </div>
    </div>
  )
}