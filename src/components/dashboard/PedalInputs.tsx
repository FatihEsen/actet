import React from 'react'
import { useTelemetry } from '../../store/TelemetryStore'
import { BarGauge } from '../svg/BarGauge'

export const PedalInputs: React.FC = () => {
  const { telemetry } = useTelemetry()
  
  if (!telemetry) return null
  
  const { throttle, brake, steer, clutch } = telemetry
  
  // Convert percentage values to 0-100 range for display
  const throttlePercent = throttle * 100
  const brakePercent = brake * 100
  const clutchPercent = clutch * 100
  const steerPercent = Math.abs(steer) * 100
  
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-racing font-bold text-neon-blue text-center">
        Driver Inputs
      </h3>
      
      {/* Main inputs grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Throttle */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-silver">Throttle</span>
            <span className="text-sm font-racing font-bold text-neon-green">
              {throttlePercent.toFixed(0)}%
            </span>
          </div>
          <BarGauge
            value={throttlePercent}
            max={100}
            unit="%"
            width={120}
            height={20}
            showValue={false}
            color="#00FF94"
            orientation="horizontal"
          />
        </div>
        
        {/* Brake */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-silver">Brake</span>
            <span className="text-sm font-racing font-bold text-neon-red">
              {brakePercent.toFixed(0)}%
            </span>
          </div>
          <BarGauge
            value={brakePercent}
            max={100}
            unit="%"
            width={120}
            height={20}
            showValue={false}
            color="#FF3B3B"
            orientation="horizontal"
          />
        </div>
        
        {/* Steering */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-silver">Steering</span>
            <span className="text-sm font-racing font-bold text-neon-blue">
              {steer > 0 ? 'R' : steer < 0 ? 'L' : 'C'} {steerPercent.toFixed(0)}%
            </span>
          </div>
          
          {/* Custom steering indicator */}
          <div className="relative h-5 bg-carbon rounded-full overflow-hidden">
            {/* Center line */}
            <div className="absolute left-1/2 top-0 w-0.5 h-full bg-silver transform -translate-x-0.5" />
            
            {/* Steering indicator */}
            <div 
              className="absolute top-0 h-full rounded-full transition-all duration-100"
              style={{
                backgroundColor: '#00D4FF',
                width: `${steerPercent}%`,
                left: steer >= 0 ? '50%' : `${50 - steerPercent}%`,
                boxShadow: '0 0 4px #00D4FF'
              }}
            />
          </div>
        </div>
        
        {/* Clutch */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-silver">Clutch</span>
            <span className="text-sm font-racing font-bold text-neon-yellow">
              {clutchPercent.toFixed(0)}%
            </span>
          </div>
          <BarGauge
            value={clutchPercent}
            max={100}
            unit="%"
            width={120}
            height={20}
            showValue={false}
            color="#FFD700"
            orientation="horizontal"
          />
        </div>
      </div>
      
      {/* Real-time input visualization */}
      <div className="glass-panel p-4">
        <h4 className="text-sm font-bold text-silver-dark mb-3 text-center">
          Real-time Input Trace
        </h4>
        
        <div className="relative h-24 bg-carbon rounded-lg overflow-hidden">
          {/* Grid lines */}
          <div className="absolute inset-0">
            {Array.from({ length: 5 }, (_, i) => (
              <div
                key={i}
                className="absolute w-full border-t border-carbon-light/30"
                style={{ top: `${i * 25}%` }}
              />
            ))}
            {Array.from({ length: 11 }, (_, i) => (
              <div
                key={i}
                className="absolute h-full border-l border-carbon-light/20"
                style={{ left: `${i * 10}%` }}
              />
            ))}
          </div>
          
          {/* Input indicators */}
          <div className="absolute inset-0">
            {/* Throttle bar (green) */}
            <div 
              className="absolute bottom-0 w-1 bg-neon-green transition-all duration-100"
              style={{ 
                height: `${throttlePercent}%`,
                left: '20%',
                boxShadow: '0 0 4px #00FF94'
              }}
            />
            
            {/* Brake bar (red) */}
            <div 
              className="absolute bottom-0 w-1 bg-neon-red transition-all duration-100"
              style={{ 
                height: `${brakePercent}%`,
                left: '40%',
                boxShadow: '0 0 4px #FF3B3B'
              }}
            />
            
            {/* Steering indicator (blue) */}
            <div 
              className="absolute w-1 h-1 bg-neon-blue rounded-full transition-all duration-100"
              style={{ 
                left: `${50 + (steer * 25)}%`,
                top: `${50 - (steerPercent / 2)}%`,
                boxShadow: '0 0 4px #00D4FF'
              }}
            />
            
            {/* Clutch bar (yellow) */}
            <div 
              className="absolute bottom-0 w-1 bg-neon-yellow transition-all duration-100"
              style={{ 
                height: `${clutchPercent}%`,
                left: '80%',
                boxShadow: '0 0 4px #FFD700'
              }}
            />
          </div>
          
          {/* Labels */}
          <div className="absolute bottom-1 left-0 right-0 flex justify-around text-xs text-silver-dark">
            <span className="text-neon-green">T</span>
            <span className="text-neon-red">B</span>
            <span className="text-neon-blue">S</span>
            <span className="text-neon-yellow">C</span>
          </div>
        </div>
        
        {/* Input consistency indicators */}
        <div className="mt-3 grid grid-cols-2 gap-4 text-xs">
          <div className="flex justify-between">
            <span className="text-silver-dark">Smoothness:</span>
            <span className="text-neon-blue">Good</span>
          </div>
          <div className="flex justify-between">
            <span className="text-silver-dark">Consistency:</span>
            <span className="text-neon-green">Excellent</span>
          </div>
        </div>
      </div>
    </div>
  )
}