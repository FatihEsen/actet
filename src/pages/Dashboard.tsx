import React from 'react'
import { useTelemetry } from '../store/TelemetryStore'
import { useSettings } from '../store/SettingsStore'
import { SpeedGauge } from '../components/dashboard/SpeedGauge'
import { RPMGauge } from '../components/dashboard/RPMGauge'
import { GearDisplay } from '../components/dashboard/GearDisplay'
import { IndicatorPanel } from '../components/dashboard/IndicatorPanel'
import { FuelDisplay } from '../components/dashboard/FuelDisplay'
import { TireTemperatures } from '../components/dashboard/TireTemperatures'
import { LapTimes } from '../components/dashboard/LapTimes'
import { PedalInputs } from '../components/dashboard/PedalInputs'
import { ControlPanel } from '../components/controls/ControlPanel'

const Dashboard: React.FC = () => {
  const { telemetry, connectionStatus, isSimulating } = useTelemetry()
  const { settings } = useSettings()
  
  // Show onboarding if no connection and not simulating
  if (!telemetry && !connectionStatus.connected && !isSimulating) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="glass-panel p-8 max-w-md">
          <h2 className="text-2xl font-racing font-bold text-neon-blue mb-4">
            Welcome to AC Telemetry
          </h2>
          <p className="text-silver-dark mb-6">
            Connect to Assetto Corsa or try the demo mode to see live telemetry data.
          </p>
          <div className="space-y-3">
            <button 
              onClick={() => window.location.href = '/setup'}
              className="w-full racing-button"
            >
              🔧 Setup Connection
            </button>
            <button 
              onClick={() => {
                const { startSimulation } = useTelemetry.getState()
                startSimulation()
              }}
              className="w-full racing-button success"
            >
              🚗 Try Demo Mode
            </button>
          </div>
        </div>
      </div>
    )
  }
  
  return (
    <div className="space-y-6">
      {/* Main telemetry grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Primary gauges - Speed and RPM */}
        <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="glass-panel p-4">
            <SpeedGauge />
          </div>
          <div className="glass-panel p-4">
            <RPMGauge />
          </div>
        </div>
        
        {/* Secondary information */}
        <div className="lg:col-span-6 grid grid-cols-2 sm:grid-cols-3 gap-4">
          <div className="glass-panel p-4">
            <GearDisplay />
          </div>
          <div className="glass-panel p-4">
            <FuelDisplay />
          </div>
          <div className="col-span-2 sm:col-span-1 glass-panel p-4">
            <IndicatorPanel />
          </div>
        </div>
      </div>
      
      {/* Advanced telemetry */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="glass-panel p-4">
          <TireTemperatures />
        </div>
        <div className="glass-panel p-4">
          <LapTimes />
        </div>
      </div>
      
      {/* Pedal inputs - mobile responsive */}
      <div className="glass-panel p-4">
        <PedalInputs />
      </div>
      
      {/* Control panel */}
      <div className="glass-panel p-4">
        <ControlPanel />
      </div>
      
      {/* Debug info (development only) */}
      {process.env.NODE_ENV === 'development' && telemetry && (
        <details className="glass-panel p-4">
          <summary className="text-silver-dark cursor-pointer">Debug Data</summary>
          <pre className="text-xs text-silver-dark mt-2 overflow-auto">
            {JSON.stringify(telemetry, null, 2)}
          </pre>
        </details>
      )}
    </div>
  )
}

export default Dashboard