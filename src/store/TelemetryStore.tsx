import React, { createContext, useContext, ReactNode } from 'react'
import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'
import { TelemetryData, ConnectionStatus } from '../types'

interface TelemetryState {
  // Data
  telemetry: TelemetryData | null
  connectionStatus: ConnectionStatus
  isSimulating: boolean
  
  // Actions
  updateTelemetry: (data: Partial<TelemetryData>) => void
  updateConnectionStatus: (status: Partial<ConnectionStatus>) => void
  startSimulation: () => void
  stopSimulation: () => void
  resetData: () => void
}

// Default telemetry data for simulation
const defaultTelemetryData: TelemetryData = {
  speed: 0,
  rpm: 800,
  gear: 0,
  maxRpm: 8000,
  turboBoost: 0,
  fuelLevel: 65,
  fuelCapacity: 80,
  engineTemp: 85,
  abs: true,
  tc: 3,
  tcCut: false,
  absInAction: false,
  brakeBias: 60,
  brakeTemp: [350, 350, 300, 300],
  tireTemp: [85, 85, 80, 80],
  tirePressure: [28.5, 28.5, 27.0, 27.0],
  tireWear: [0.1, 0.1, 0.15, 0.15],
  tireCompound: 'Soft',
  throttle: 0,
  brake: 0,
  steer: 0,
  clutch: 0,
  lapTime: 0,
  lastLap: 92340, // 1:32.340
  bestLap: 91850, // 1:31.850
  delta: 490, // +0.490
  currentSector: 1,
  positionX: 0,
  positionY: 0,
  positionZ: 0,
  velocity: [0, 0, 0],
  damage: {
    front: 0,
    rear: 0,
    left: 0,
    right: 0,
    center: 0
  },
  isInPit: false,
  isInPitLane: false,
  mandatoryPitDone: false,
  drsAvailable: false,
  drsEnabled: false
}

const defaultConnectionStatus: ConnectionStatus = {
  connected: false,
  lastUpdate: 0,
  latency: 0,
  packetsReceived: 0,
  packetsLost: 0
}

export const useTelemetryStore = create<TelemetryState>()(
  subscribeWithSelector((set, get) => ({
    telemetry: null,
    connectionStatus: defaultConnectionStatus,
    isSimulating: false,

    updateTelemetry: (data) => {
      set((state) => ({
        telemetry: state.telemetry ? { ...state.telemetry, ...data } : { ...defaultTelemetryData, ...data },
        connectionStatus: {
          ...state.connectionStatus,
          lastUpdate: Date.now(),
          packetsReceived: state.connectionStatus.packetsReceived + 1
        }
      }))
    },

    updateConnectionStatus: (status) => {
      set((state) => ({
        connectionStatus: { ...state.connectionStatus, ...status }
      }))
    },

    startSimulation: () => {
      set({ isSimulating: true, telemetry: { ...defaultTelemetryData } })
      
      // Simulate telemetry data updates
      const simulationInterval = setInterval(() => {
        const state = get()
        if (!state.isSimulating) {
          clearInterval(simulationInterval)
          return
        }

        const currentTelemetry = state.telemetry || defaultTelemetryData
        const time = Date.now() / 1000

        // Simulate realistic racing data
        const newData: Partial<TelemetryData> = {
          speed: Math.max(0, 120 + Math.sin(time * 0.3) * 80 + Math.random() * 10),
          rpm: Math.max(800, 3000 + Math.sin(time * 0.5) * 2000 + Math.random() * 200),
          throttle: Math.max(0, 0.6 + Math.sin(time * 0.4) * 0.3 + Math.random() * 0.1),
          brake: Math.max(0, Math.sin(time * 0.7) > 0.7 ? 0.8 + Math.random() * 0.2 : 0),
          steer: Math.sin(time * 0.2) * 0.5 + Math.random() * 0.1,
          gear: Math.min(6, Math.max(1, Math.floor(currentTelemetry.speed / 25))),
          lapTime: (Date.now() % 120000), // 2 minute lap cycle
          tireTemp: currentTelemetry.tireTemp.map(temp => 
            Math.max(40, Math.min(120, temp + (Math.random() - 0.5) * 2))
          ) as [number, number, number, number],
          engineTemp: Math.max(70, Math.min(110, 85 + Math.sin(time * 0.1) * 10 + Math.random() * 2)),
          fuelLevel: Math.max(0, currentTelemetry.fuelLevel - 0.02),
          tcCut: currentTelemetry.throttle > 0.8 && Math.random() > 0.9,
          absInAction: currentTelemetry.brake > 0.5 && Math.random() > 0.8
        }

        state.updateTelemetry(newData)
      }, 50) // 20 FPS updates

      // Update connection status
      set((state) => ({
        connectionStatus: {
          ...state.connectionStatus,
          connected: true,
          lastUpdate: Date.now()
        }
      }))
    },

    stopSimulation: () => {
      set({ 
        isSimulating: false,
        connectionStatus: { ...defaultConnectionStatus, connected: false }
      })
    },

    resetData: () => {
      set({
        telemetry: null,
        connectionStatus: defaultConnectionStatus,
        isSimulating: false
      })
    }
  }))
)

// React Context Provider for easier usage
const TelemetryContext = createContext<TelemetryState | null>(null)

export const TelemetryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const store = useTelemetryStore()
  
  return (
    <TelemetryContext.Provider value={store}>
      {children}
    </TelemetryContext.Provider>
  )
}

export const useTelemetry = () => {
  const context = useContext(TelemetryContext)
  if (!context) {
    throw new Error('useTelemetry must be used within a TelemetryProvider')
  }
  return context
}