import React from 'react'
import { useTelemetry } from '../../store/TelemetryStore'
import { useSettings } from '../../store/SettingsStore'

export const ConnectionStatus: React.FC = () => {
  const { connectionStatus, isSimulating, startSimulation, stopSimulation } = useTelemetry()
  const { settings } = useSettings()
  
  const formatLatency = (latency: number) => {
    return latency > 0 ? `${latency}ms` : 'N/A'
  }
  
  const getStatusColor = () => {
    if (isSimulating) return 'text-neon-yellow'
    if (connectionStatus.connected) return 'text-neon-green'
    return 'text-neon-red'
  }
  
  const getStatusText = () => {
    if (isSimulating) return 'Simulating'
    if (connectionStatus.connected) return 'Connected'
    return 'Disconnected'
  }
  
  const handleToggleSimulation = () => {
    if (isSimulating) {
      stopSimulation()
    } else {
      startSimulation()
    }
  }
  
  return (
    <div className="flex items-center space-x-4">
      {/* Connection indicator */}
      <div className="flex items-center space-x-2">
        <div className={`w-3 h-3 rounded-full ${getStatusColor()} ${
          connectionStatus.connected || isSimulating ? 'animate-pulse' : ''
        }`} 
        style={{
          backgroundColor: 'currentColor',
          boxShadow: connectionStatus.connected || isSimulating ? '0 0 8px currentColor' : 'none'
        }} />
        <span className={`text-sm font-medium ${getStatusColor()}`}>
          {getStatusText()}
        </span>
      </div>
      
      {/* Connection details */}
      {(connectionStatus.connected || isSimulating) && (
        <div className="hidden md:flex items-center space-x-4 text-xs text-silver-dark">
          <span>
            📡 {formatLatency(connectionStatus.latency)}
          </span>
          <span>
            📦 {connectionStatus.packetsReceived}
          </span>
          {connectionStatus.packetsLost > 0 && (
            <span className="text-neon-red">
              ❌ {connectionStatus.packetsLost}
            </span>
          )}
        </div>
      )}
      
      {/* UDP Settings */}
      {!connectionStatus.connected && !isSimulating && (
        <div className="text-xs text-silver-dark">
          {settings.udp.ip}:{settings.udp.port}
        </div>
      )}
      
      {/* Simulation toggle button */}
      <button
        onClick={handleToggleSimulation}
        className={`px-3 py-1 rounded text-xs font-medium transition-all duration-200 ${
          isSimulating
            ? 'bg-neon-yellow text-racing-dark hover:bg-neon-yellow/80'
            : 'bg-carbon border border-carbon-light hover:bg-carbon-light'
        }`}
      >
        {isSimulating ? 'Stop Demo' : 'Demo Mode'}
      </button>
      
      {/* Error display */}
      {connectionStatus.error && (
        <div className="text-xs text-neon-red max-w-xs truncate" title={connectionStatus.error}>
          ⚠️ {connectionStatus.error}
        </div>
      )}
    </div>
  )
}