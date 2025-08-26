import React from 'react'
import { useTelemetry } from '../../store/TelemetryStore'
import { useSettings } from '../../store/SettingsStore'

export const TireTemperatures: React.FC = () => {
  const { telemetry } = useTelemetry()
  const { settings } = useSettings()
  
  if (!telemetry) return null
  
  const { tireTemp, tirePressure, tireWear, tireCompound } = telemetry
  
  // Convert temperature based on units
  const convertTemp = (celsius: number) => {
    return settings.units.temperature === 'fahrenheit' 
      ? (celsius * 9/5) + 32 
      : celsius
  }
  
  const convertPressure = (psi: number) => {
    return settings.units.pressure === 'bar' ? psi * 0.0689476 : psi
  }
  
  const tempUnit = settings.units.temperature === 'fahrenheit' ? '°F' : '°C'
  const pressureUnit = settings.units.pressure === 'bar' ? 'bar' : 'psi'
  
  // Get color based on temperature
  const getTempColor = (temp: number) => {
    if (temp < 60) return '#00D4FF' // cold - blue
    if (temp < 80) return '#00FF94' // optimal - green
    if (temp < 100) return '#FFD700' // warm - yellow
    if (temp < 120) return '#FF8C00' // hot - orange
    return '#FF3B3B' // overheating - red
  }
  
  // Get wear color
  const getWearColor = (wear: number) => {
    if (wear < 0.2) return '#00FF94' // good - green
    if (wear < 0.5) return '#FFD700' // medium - yellow
    if (wear < 0.8) return '#FF8C00' // high - orange
    return '#FF3B3B' // critical - red
  }
  
  const tirePositions = [
    { name: 'FL', index: 0, label: 'Front Left' },
    { name: 'FR', index: 1, label: 'Front Right' },
    { name: 'RL', index: 2, label: 'Rear Left' },
    { name: 'RR', index: 3, label: 'Rear Right' }
  ]
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-racing font-bold text-neon-blue">
          Tire Data
        </h3>
        <span className="text-sm text-silver-dark">
          Compound: {tireCompound}
        </span>
      </div>
      
      {/* Tire layout visual */}
      <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto">
        {/* Front tires */}
        <div className="space-y-2">
          <div className="text-xs text-center text-silver-dark">FRONT</div>
          <div className="grid grid-cols-2 gap-2">
            {tirePositions.slice(0, 2).map(({ name, index, label }) => (
              <div
                key={name}
                className="glass-panel p-3 text-center space-y-1"
                title={label}
              >
                <div className="text-xs font-bold text-silver">{name}</div>
                
                {/* Temperature */}
                <div 
                  className="text-sm font-racing font-bold"
                  style={{ color: getTempColor(tireTemp[index]) }}
                >
                  {convertTemp(tireTemp[index]).toFixed(0)}{tempUnit}
                </div>
                
                {/* Pressure */}
                <div className="text-xs text-silver-dark">
                  {convertPressure(tirePressure[index]).toFixed(1)}{pressureUnit}
                </div>
                
                {/* Wear indicator */}
                <div className="w-full h-1 bg-carbon rounded-full overflow-hidden">
                  <div 
                    className="h-full transition-all duration-300"
                    style={{ 
                      width: `${tireWear[index] * 100}%`,
                      backgroundColor: getWearColor(tireWear[index])
                    }}
                  />
                </div>
                <div 
                  className="text-xs"
                  style={{ color: getWearColor(tireWear[index]) }}
                >
                  {(tireWear[index] * 100).toFixed(0)}%
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Rear tires */}
        <div className="space-y-2">
          <div className="text-xs text-center text-silver-dark">REAR</div>
          <div className="grid grid-cols-2 gap-2">
            {tirePositions.slice(2, 4).map(({ name, index, label }) => (
              <div
                key={name}
                className="glass-panel p-3 text-center space-y-1"
                title={label}
              >
                <div className="text-xs font-bold text-silver">{name}</div>
                
                {/* Temperature */}
                <div 
                  className="text-sm font-racing font-bold"
                  style={{ color: getTempColor(tireTemp[index]) }}
                >
                  {convertTemp(tireTemp[index]).toFixed(0)}{tempUnit}
                </div>
                
                {/* Pressure */}
                <div className="text-xs text-silver-dark">
                  {convertPressure(tirePressure[index]).toFixed(1)}{pressureUnit}
                </div>
                
                {/* Wear indicator */}
                <div className="w-full h-1 bg-carbon rounded-full overflow-hidden">
                  <div 
                    className="h-full transition-all duration-300"
                    style={{ 
                      width: `${tireWear[index] * 100}%`,
                      backgroundColor: getWearColor(tireWear[index])
                    }}
                  />
                </div>
                <div 
                  className="text-xs"
                  style={{ color: getWearColor(tireWear[index]) }}
                >
                  {(tireWear[index] * 100).toFixed(0)}%
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Temperature legend */}
      <div className="flex justify-center space-x-4 text-xs">
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 rounded-full bg-blue-400" />
          <span>Cold</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 rounded-full bg-green-400" />
          <span>Optimal</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 rounded-full bg-yellow-400" />
          <span>Warm</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 rounded-full bg-orange-400" />
          <span>Hot</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 rounded-full bg-red-400" />
          <span>Critical</span>
        </div>
      </div>
    </div>
  )
}