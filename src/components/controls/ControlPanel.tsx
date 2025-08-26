import React from 'react'
import { useSettings } from '../../store/SettingsStore'
import { useTelemetry } from '../../store/TelemetryStore'

export const ControlPanel: React.FC = () => {
  const { controls, updateControls } = useSettings()
  const { telemetry } = useTelemetry()
  
  const handleControlChange = (control: string, value: any) => {
    updateControls({ [control]: value })
  }
  
  const ControlButton: React.FC<{
    label: string
    active: boolean
    onClick: () => void
    color?: string
    icon?: string
    size?: 'sm' | 'md' | 'lg'
    disabled?: boolean
  }> = ({ 
    label, 
    active, 
    onClick, 
    color = 'blue', 
    icon, 
    size = 'md',
    disabled = false 
  }) => {
    const sizeClasses = {
      sm: 'px-2 py-1 text-xs',
      md: 'px-3 py-2 text-sm',
      lg: 'px-4 py-3 text-base'
    }
    
    const colorClasses = {
      blue: active ? 'bg-neon-blue text-racing-dark border-neon-blue' : 'border-neon-blue/50 hover:bg-neon-blue/10',
      red: active ? 'bg-neon-red text-white border-neon-red' : 'border-neon-red/50 hover:bg-neon-red/10',
      green: active ? 'bg-neon-green text-racing-dark border-neon-green' : 'border-neon-green/50 hover:bg-neon-green/10',
      orange: active ? 'bg-neon-orange text-racing-dark border-neon-orange' : 'border-neon-orange/50 hover:bg-neon-orange/10',
      yellow: active ? 'bg-neon-yellow text-racing-dark border-neon-yellow' : 'border-neon-yellow/50 hover:bg-neon-yellow/10'
    }
    
    return (
      <button
        onClick={onClick}
        disabled={disabled}
        className={`
          ${sizeClasses[size]} 
          ${colorClasses[color as keyof typeof colorClasses]} 
          border-2 rounded-lg font-medium transition-all duration-200 
          flex items-center justify-center space-x-1
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 active:scale-95'}
          ${active && !disabled ? 'glow' : ''}
        `}
      >
        {icon && <span>{icon}</span>}
        <span>{label}</span>
      </button>
    )
  }
  
  const SliderControl: React.FC<{
    label: string
    value: number
    min: number
    max: number
    step?: number
    unit?: string
    onChange: (value: number) => void
    color?: string
  }> = ({ label, value, min, max, step = 1, unit = '', onChange, color = '#00D4FF' }) => (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-silver">{label}</span>
        <span className="text-sm font-racing font-bold" style={{ color }}>
          {value}{unit}
        </span>
      </div>
      <div className="relative">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full h-2 bg-carbon rounded-lg appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, ${color} 0%, ${color} ${((value - min) / (max - min)) * 100}%, #2A2A2A ${((value - min) / (max - min)) * 100}%, #2A2A2A 100%)`
          }}
        />
      </div>
    </div>
  )
  
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-racing font-bold text-neon-blue text-center">
        Car Controls
      </h3>
      
      {/* Electronics Controls */}
      <div className="space-y-4">
        <h4 className="text-sm font-bold text-silver-dark border-b border-carbon-light pb-1">
          Electronics
        </h4>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <ControlButton
            label="ABS"
            active={controls.abs}
            onClick={() => handleControlChange('abs', !controls.abs)}
            color="green"
            icon="🛡️"
          />
          
          <ControlButton
            label="Ignition"
            active={controls.ignition}
            onClick={() => handleControlChange('ignition', !controls.ignition)}
            color="red"
            icon="🔑"
          />
          
          <ControlButton
            label="Pit Limiter"
            active={controls.pitLimiter}
            onClick={() => handleControlChange('pitLimiter', !controls.pitLimiter)}
            color="yellow"
            icon="🏁"
          />
          
          <ControlButton
            label="DRS"
            active={controls.drs}
            onClick={() => handleControlChange('drs', !controls.drs)}
            color="blue"
            icon="💨"
            disabled={!telemetry?.drsAvailable}
          />
        </div>
        
        {/* Adjustable controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SliderControl
            label="Traction Control"
            value={controls.tc}
            min={0}
            max={10}
            onChange={(value) => handleControlChange('tc', value)}
            color="#FFD700"
          />
          
          <SliderControl
            label="Brake Bias"
            value={controls.brakeBias}
            min={45}
            max={75}
            unit="%"
            onChange={(value) => handleControlChange('brakeBias', value)}
            color="#FF8C00"
          />
        </div>
      </div>
      
      {/* Lights & Signals */}
      <div className="space-y-4">
        <h4 className="text-sm font-bold text-silver-dark border-b border-carbon-light pb-1">
          Lights & Signals
        </h4>
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {/* Turn signals */}
          <ControlButton
            label="Left Signal"
            active={controls.leftSignal}
            onClick={() => handleControlChange('leftSignal', !controls.leftSignal)}
            color="orange"
            icon="⬅️"
          />
          
          <ControlButton
            label="Right Signal"
            active={controls.rightSignal}
            onClick={() => handleControlChange('rightSignal', !controls.rightSignal)}
            color="orange"
            icon="➡️"
          />
          
          {/* Hazard lights */}
          <ControlButton
            label="Hazards"
            active={controls.hazardLights}
            onClick={() => handleControlChange('hazardLights', !controls.hazardLights)}
            color="red"
            icon="⚠️"
          />
          
          {/* Headlights */}
          <ControlButton
            label="Headlights"
            active={controls.headlights}
            onClick={() => handleControlChange('headlights', !controls.headlights)}
            color="yellow"
            icon="💡"
          />
          
          {/* Rain lights */}
          <ControlButton
            label="Rain Lights"
            active={controls.rainLights}
            onClick={() => handleControlChange('rainLights', !controls.rainLights)}
            color="red"
            icon="🌧️"
          />
        </div>
      </div>
      
      {/* Engine & Performance */}
      <div className="space-y-4">
        <h4 className="text-sm font-bold text-silver-dark border-b border-carbon-light pb-1">
          Engine & Performance
        </h4>
        
        <div className="grid grid-cols-3 gap-3">
          {/* Turbo mode buttons */}
          {(['low', 'medium', 'high'] as const).map((mode) => (
            <ControlButton
              key={mode}
              label={`Turbo ${mode.charAt(0).toUpperCase() + mode.slice(1)}`}
              active={controls.turboMode === mode}
              onClick={() => handleControlChange('turboMode', mode)}
              color={mode === 'low' ? 'green' : mode === 'medium' ? 'yellow' : 'red'}
              size="sm"
            />
          ))}
        </div>
        
        <SliderControl
          label="Engine Map"
          value={controls.engineMap}
          min={1}
          max={8}
          onChange={(value) => handleControlChange('engineMap', value)}
          color="#00FF94"
        />
      </div>
      
      {/* Additional Controls */}
      <div className="space-y-4">
        <h4 className="text-sm font-bold text-silver-dark border-b border-carbon-light pb-1">
          Additional
        </h4>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          <ControlButton
            label="Wipers"
            active={controls.wipers}
            onClick={() => handleControlChange('wipers', !controls.wipers)}
            color="blue"
            icon="🌊"
          />
          
          <ControlButton
            label="High Beams"
            active={controls.highBeams}
            onClick={() => handleControlChange('highBeams', !controls.highBeams)}
            color="yellow"
            icon="💡"
            disabled={!controls.headlights}
          />
          
          <SliderControl
            label="Radio Preset"
            value={controls.radioPreset}
            min={1}
            max={8}
            onChange={(value) => handleControlChange('radioPreset', value)}
            color="#00D4FF"
          />
        </div>
      </div>
      
      {/* Signal indicators with flashing animation */}
      {(controls.leftSignal || controls.rightSignal || controls.hazardLights) && (
        <div className="glass-panel p-3">
          <div className="flex justify-center items-center space-x-4">
            {(controls.leftSignal || controls.hazardLights) && (
              <div className="flex items-center space-x-2 signal-flash">
                <div className="w-3 h-3 bg-neon-orange rounded-full"></div>
                <span className="text-neon-orange font-bold">LEFT</span>
              </div>
            )}
            
            {(controls.rightSignal || controls.hazardLights) && (
              <div className="flex items-center space-x-2 signal-flash">
                <span className="text-neon-orange font-bold">RIGHT</span>
                <div className="w-3 h-3 bg-neon-orange rounded-full"></div>
              </div>
            )}
            
            {controls.hazardLights && (
              <div className="flex items-center space-x-2 hazard-flash">
                <span className="text-neon-red font-bold">⚠️ HAZARD ⚠️</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}