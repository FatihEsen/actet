import React from 'react'
import { useTelemetry } from '../../store/TelemetryStore'
import { useSettings } from '../../store/SettingsStore'
import { CircularGauge } from '../svg/CircularGauge'

export const SpeedGauge: React.FC = () => {
  const { telemetry } = useTelemetry()
  const { settings } = useSettings()
  
  if (!telemetry) return null
  
  // Convert speed based on units
  const speed = settings.units.speed === 'mph' 
    ? telemetry.speed * 0.621371 
    : telemetry.speed
  
  const maxSpeed = settings.units.speed === 'mph' ? 250 : 400
  const unit = settings.units.speed === 'mph' ? 'MPH' : 'KM/H'
  
  return (
    <div className="flex flex-col items-center space-y-2">
      <h3 className="text-lg font-racing font-bold text-neon-blue">Speed</h3>
      <CircularGauge
        value={speed}
        max={maxSpeed}
        unit={unit}
        size={180}
        strokeWidth={10}
        showValue={true}
        warningValue={maxSpeed * 0.8}
        color="#00D4FF"
        warningColor="#FF8C00"
        className="mx-auto"
      />
    </div>
  )
}