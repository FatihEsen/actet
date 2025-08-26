import React from 'react'
import { useTelemetry } from '../../store/TelemetryStore'
import { BarGauge } from '../svg/BarGauge'

export const FuelDisplay: React.FC = () => {
  const { telemetry } = useTelemetry()
  
  if (!telemetry) return null
  
  const { fuelLevel, fuelCapacity } = telemetry
  const fuelPercentage = (fuelLevel / fuelCapacity) * 100
  
  // Calculate estimated laps remaining (rough estimation)
  const avgConsumptionPerLap = 2.5 // liters per lap (rough estimate)
  const estimatedLaps = Math.floor(fuelLevel / avgConsumptionPerLap)
  
  const getFuelColor = () => {
    if (fuelPercentage <= 10) return '#FF3B3B' // danger - red
    if (fuelPercentage <= 25) return '#FF8C00' // warning - orange
    return '#00D4FF' // normal - blue
  }
  
  const getFuelStatus = () => {
    if (fuelPercentage <= 10) return 'CRITICAL'
    if (fuelPercentage <= 25) return 'LOW'
    return 'OK'
  }
  
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-racing font-bold text-silver-dark text-center">
        FUEL
      </h3>
      
      {/* Fuel level bar */}
      <div className="space-y-2">
        <BarGauge
          value={fuelLevel}
          max={fuelCapacity}
          unit="L"
          width={120}
          height={16}
          showValue={false}
          warningLevel={fuelCapacity * 0.25}
          dangerLevel={fuelCapacity * 0.1}
          color="#00D4FF"
          warningColor="#FF8C00"
          dangerColor="#FF3B3B"
          segments={10}
        />
        
        {/* Fuel value display */}
        <div className="text-center">
          <div 
            className="text-lg font-racing font-bold"
            style={{ color: getFuelColor() }}
          >
            {fuelLevel.toFixed(1)}L
          </div>
          <div className="text-xs text-silver-dark">
            {fuelPercentage.toFixed(1)}% of {fuelCapacity}L
          </div>
        </div>
      </div>
      
      {/* Fuel status and estimates */}
      <div className="space-y-1 text-xs text-center">
        <div 
          className="font-bold"
          style={{ color: getFuelColor() }}
        >
          {getFuelStatus()}
        </div>
        
        {estimatedLaps > 0 && (
          <div className="text-silver-dark">
            ~{estimatedLaps} laps remaining
          </div>
        )}
        
        {fuelPercentage <= 25 && (
          <div className="text-neon-orange animate-pulse">
            ⚠️ Consider refueling
          </div>
        )}
        
        {fuelPercentage <= 10 && (
          <div className="text-neon-red animate-blink font-bold">
            🚨 FUEL CRITICAL
          </div>
        )}
      </div>
    </div>
  )
}