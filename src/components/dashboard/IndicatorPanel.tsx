import React from 'react'
import { useTelemetry } from '../../store/TelemetryStore'
import { IndicatorLight } from '../svg/IndicatorLight'

export const IndicatorPanel: React.FC = () => {
  const { telemetry } = useTelemetry()
  
  if (!telemetry) return null
  
  const { abs, absInAction, tc, tcCut, drsAvailable, drsEnabled } = telemetry
  
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-racing font-bold text-silver-dark text-center">
        SYSTEMS
      </h3>
      
      <div className="grid grid-cols-2 gap-3">
        {/* ABS Indicator */}
        <IndicatorLight
          active={abs && absInAction}
          label="ABS"
          activeColor="#00FF94"
          inactiveColor={abs ? "#2A2A2A" : "#FF3B3B"}
          pulsing={absInAction}
          size={45}
        />
        
        {/* Traction Control */}
        <IndicatorLight
          active={tc > 0 && tcCut}
          label={`TC ${tc}`}
          activeColor="#FFD700"
          inactiveColor={tc > 0 ? "#2A2A2A" : "#FF3B3B"}
          pulsing={tcCut}
          size={45}
        />
        
        {/* DRS */}
        <IndicatorLight
          active={drsEnabled}
          label="DRS"
          activeColor="#00D4FF"
          inactiveColor={drsAvailable ? "#2A2A2A" : "#8C8C8C"}
          size={45}
        />
        
        {/* Pit Limiter */}
        <IndicatorLight
          active={telemetry.isInPitLane}
          label="PIT"
          activeColor="#FF8C00"
          inactiveColor="#2A2A2A"
          size={45}
        />
      </div>
      
      {/* System status text */}
      <div className="text-xs text-center space-y-1">
        {abs && (
          <div className="text-neon-green">
            ABS: {absInAction ? 'ACTIVE' : 'READY'}
          </div>
        )}
        {tc > 0 && (
          <div className="text-neon-yellow">
            TC: Level {tc} {tcCut ? '(CUTTING)' : ''}
          </div>
        )}
        {drsAvailable && (
          <div className="text-neon-blue">
            DRS: {drsEnabled ? 'OPEN' : 'AVAILABLE'}
          </div>
        )}
      </div>
    </div>
  )
}