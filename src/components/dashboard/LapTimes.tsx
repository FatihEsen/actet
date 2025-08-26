import React from 'react'
import { useTelemetry } from '../../store/TelemetryStore'

export const LapTimes: React.FC = () => {
  const { telemetry } = useTelemetry()
  
  if (!telemetry) return null
  
  const { lapTime, lastLap, bestLap, delta, currentSector } = telemetry
  
  // Format time from milliseconds to MM:SS.mmm
  const formatTime = (milliseconds: number) => {
    if (milliseconds <= 0) return '--:--.---'
    
    const totalSeconds = milliseconds / 1000
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = totalSeconds % 60
    
    return `${minutes}:${seconds.toFixed(3).padStart(6, '0')}`
  }
  
  // Format delta time with + or - prefix
  const formatDelta = (deltaMs: number) => {
    if (deltaMs === 0) return '-.---'
    const prefix = deltaMs > 0 ? '+' : ''
    return `${prefix}${(deltaMs / 1000).toFixed(3)}`
  }
  
  const getDeltaColor = (deltaMs: number) => {
    if (deltaMs < 0) return '#00FF94' // faster - green
    if (deltaMs > 0) return '#FF3B3B' // slower - red
    return '#FFD700' // equal - yellow
  }
  
  const getSectorColor = (sector: number) => {
    return sector === currentSector ? '#00D4FF' : '#2A2A2A'
  }
  
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-racing font-bold text-neon-blue">
        Lap Times
      </h3>
      
      {/* Current lap time */}
      <div className="glass-panel p-4 text-center">
        <div className="text-sm text-silver-dark mb-1">CURRENT LAP</div>
        <div className="text-2xl font-racing font-bold text-neon-blue">
          {formatTime(lapTime)}
        </div>
        
        {/* Sector indicators */}
        <div className="flex justify-center mt-2 space-x-2">
          {[1, 2, 3].map((sector) => (
            <div
              key={sector}
              className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all duration-200"
              style={{
                borderColor: getSectorColor(sector),
                backgroundColor: sector === currentSector ? getSectorColor(sector) : 'transparent',
                color: sector === currentSector ? '#0A0A0A' : getSectorColor(sector)
              }}
            >
              {sector}
            </div>
          ))}
        </div>
        <div className="text-xs text-silver-dark mt-1">
          Sector {currentSector}/3
        </div>
      </div>
      
      {/* Best and last lap comparison */}
      <div className="grid grid-cols-2 gap-4">
        {/* Best lap */}
        <div className="glass-panel p-3 text-center">
          <div className="text-xs text-silver-dark mb-1">BEST LAP</div>
          <div className="text-lg font-racing font-bold text-neon-green">
            {formatTime(bestLap)}
          </div>
          <div className="text-xs text-silver-dark mt-1">
            🏆 Personal Best
          </div>
        </div>
        
        {/* Last lap */}
        <div className="glass-panel p-3 text-center">
          <div className="text-xs text-silver-dark mb-1">LAST LAP</div>
          <div className="text-lg font-racing font-bold text-silver">
            {formatTime(lastLap)}
          </div>
          <div 
            className="text-sm font-bold mt-1"
            style={{ color: getDeltaColor(delta) }}
          >
            {formatDelta(delta)}
          </div>
        </div>
      </div>
      
      {/* Delta to best */}
      <div className="glass-panel p-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-silver-dark">Delta to Best:</span>
          <span 
            className="text-lg font-racing font-bold"
            style={{ color: getDeltaColor(delta) }}
          >
            {formatDelta(delta)}
          </span>
        </div>
        
        {/* Visual delta bar */}
        <div className="mt-2 relative h-2 bg-carbon rounded-full overflow-hidden">
          <div 
            className="absolute top-0 left-1/2 w-0.5 h-full bg-silver"
            style={{ transform: 'translateX(-50%)' }}
          />
          {delta !== 0 && (
            <div 
              className="absolute top-0 h-full rounded-full transition-all duration-300"
              style={{
                backgroundColor: getDeltaColor(delta),
                width: `${Math.min(50, Math.abs(delta) / 20)}%`,
                left: delta > 0 ? '50%' : `${50 - Math.min(50, Math.abs(delta) / 20)}%`
              }}
            />
          )}
        </div>
        
        <div className="flex justify-between text-xs text-silver-dark mt-1">
          <span>-1.0s</span>
          <span>0.0s</span>
          <span>+1.0s</span>
        </div>
      </div>
      
      {/* Lap statistics */}
      <div className="text-xs text-silver-dark space-y-1">
        <div className="flex justify-between">
          <span>Average delta:</span>
          <span>{formatDelta(delta * 0.8)}</span>
        </div>
        <div className="flex justify-between">
          <span>Improvement potential:</span>
          <span className="text-neon-green">
            {delta > 0 ? formatDelta(-Math.abs(delta * 0.3)) : 'On pace!'}
          </span>
        </div>
      </div>
    </div>
  )
}