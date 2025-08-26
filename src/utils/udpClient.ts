import { TelemetryData } from '../types'

// UDP connection manager for Assetto Corsa telemetry
export class UDPTelemetryClient {
  private socket: WebSocket | null = null
  private isConnected = false
  private reconnectAttempts = 0
  private maxReconnectAttempts = 5
  private reconnectDelay = 2000
  private onDataCallback?: (data: Partial<TelemetryData>) => void
  private onStatusCallback?: (status: { connected: boolean; error?: string; latency?: number }) => void
  
  constructor(
    private ip: string = '127.0.0.1',
    private port: number = 9996
  ) {}
  
  // Connect to UDP server (via WebSocket bridge)
  connect(
    onData: (data: Partial<TelemetryData>) => void,
    onStatus: (status: { connected: boolean; error?: string; latency?: number }) => void
  ) {
    this.onDataCallback = onData
    this.onStatusCallback = onStatus
    
    try {
      // Note: Direct UDP connections aren't possible from browsers
      // In a real implementation, you'd need a WebSocket server that bridges UDP data
      // For now, we'll simulate the connection
      this.simulateConnection()
    } catch (error) {
      this.handleError(`Connection failed: ${error}`)
    }
  }
  
  // Simulate UDP connection (for demo purposes)
  private simulateConnection() {
    this.isConnected = true
    this.reconnectAttempts = 0
    
    if (this.onStatusCallback) {
      this.onStatusCallback({ connected: true, latency: Math.random() * 20 + 5 })
    }
    
    // Simulate periodic telemetry data
    const dataInterval = setInterval(() => {
      if (!this.isConnected) {
        clearInterval(dataInterval)
        return
      }
      
      if (this.onDataCallback) {
        // Generate realistic racing data
        const time = Date.now() / 1000
        const mockData: Partial<TelemetryData> = {
          speed: Math.max(0, 150 + Math.sin(time * 0.3) * 100 + Math.random() * 20),
          rpm: Math.max(800, 4000 + Math.sin(time * 0.5) * 2500 + Math.random() * 300),
          gear: Math.min(6, Math.max(1, Math.floor((150 + Math.sin(time * 0.3) * 100) / 30))),
          throttle: Math.max(0, 0.7 + Math.sin(time * 0.4) * 0.3 + Math.random() * 0.1),
          brake: Math.max(0, Math.sin(time * 0.7) > 0.6 ? 0.8 + Math.random() * 0.2 : 0),
          steer: Math.sin(time * 0.2) * 0.6 + Math.random() * 0.1,
          fuelLevel: Math.max(0, 65 - (time % 3600) * 0.02), // Fuel consumption over time
          engineTemp: 85 + Math.sin(time * 0.1) * 8 + Math.random() * 3,
          tireTemp: [
            85 + Math.sin(time * 0.15) * 10 + Math.random() * 5,
            85 + Math.sin(time * 0.16) * 10 + Math.random() * 5,
            80 + Math.sin(time * 0.14) * 8 + Math.random() * 4,
            80 + Math.sin(time * 0.13) * 8 + Math.random() * 4
          ] as [number, number, number, number],
          lapTime: (Date.now() % 120000), // 2-minute lap cycle
          tcCut: Math.random() > 0.95,
          absInAction: Math.random() > 0.9
        }
        
        this.onDataCallback(mockData)
      }
      
      // Update latency
      if (this.onStatusCallback) {
        this.onStatusCallback({ 
          connected: true, 
          latency: Math.random() * 15 + 8 
        })
      }
    }, 50) // 20 FPS
  }
  
  disconnect() {
    this.isConnected = false
    
    if (this.socket) {
      this.socket.close()
      this.socket = null
    }
    
    if (this.onStatusCallback) {
      this.onStatusCallback({ connected: false })
    }
  }
  
  private handleError(error: string) {
    console.error('UDP Telemetry Error:', error)
    
    if (this.onStatusCallback) {
      this.onStatusCallback({ connected: false, error })
    }
    
    // Attempt reconnection
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++
      setTimeout(() => {
        if (this.onDataCallback && this.onStatusCallback) {
          this.connect(this.onDataCallback, this.onStatusCallback)
        }
      }, this.reconnectDelay * this.reconnectAttempts)
    }
  }
  
  // Update connection settings
  updateSettings(ip: string, port: number) {
    this.ip = ip
    this.port = port
    
    // Reconnect with new settings if currently connected
    if (this.isConnected && this.onDataCallback && this.onStatusCallback) {
      this.disconnect()
      this.connect(this.onDataCallback, this.onStatusCallback)
    }
  }
}

// Parse AC UDP telemetry packet (for real UDP implementation)
export const parseACTelemetryPacket = (buffer: ArrayBuffer): Partial<TelemetryData> | null => {
  try {
    const view = new DataView(buffer)
    let offset = 0
    
    // AC UDP packet structure (simplified)
    const data: Partial<TelemetryData> = {
      speed: view.getFloat32(offset, true), // Little endian
      rpm: view.getFloat32(offset + 4, true),
      gear: view.getInt32(offset + 8, true),
      throttle: view.getFloat32(offset + 12, true),
      brake: view.getFloat32(offset + 16, true),
      steer: view.getFloat32(offset + 20, true),
      // ... more fields would be parsed here
    }
    
    return data
  } catch (error) {
    console.error('Failed to parse telemetry packet:', error)
    return null
  }
}

// WebSocket server setup helper (for server-side implementation)
export const createUDPBridgeServer = (wsPort: number = 8080, udpPort: number = 9996) => {
  // This would be implemented on the server side to bridge UDP to WebSocket
  const serverCode = `
// Node.js server to bridge UDP telemetry to WebSocket
const WebSocket = require('ws')
const dgram = require('dgram')

const wss = new WebSocket.Server({ port: ${wsPort} })
const udpServer = dgram.createSocket('udp4')

udpServer.bind(${udpPort})

udpServer.on('message', (msg, rinfo) => {
  // Broadcast telemetry data to all connected WebSocket clients
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(msg)
    }
  })
})

wss.on('connection', (ws) => {
  console.log('WebSocket client connected')
  
  ws.on('close', () => {
    console.log('WebSocket client disconnected')
  })
})

console.log('UDP to WebSocket bridge running on port ${wsPort}')
console.log('Listening for UDP telemetry on port ${udpPort}')
`
  
  return serverCode
}

// Local storage helpers for connection settings
export const saveConnectionSettings = (settings: { ip: string; port: number; enabled: boolean }) => {
  localStorage.setItem('ac-telemetry-connection', JSON.stringify(settings))
}

export const loadConnectionSettings = (): { ip: string; port: number; enabled: boolean } | null => {
  const stored = localStorage.getItem('ac-telemetry-connection')
  return stored ? JSON.parse(stored) : null
}

// Connection status helpers
export const getConnectionStatusText = (connected: boolean, error?: string) => {
  if (error) return `Error: ${error}`
  if (connected) return 'Connected'
  return 'Disconnected'
}

export const getConnectionStatusColor = (connected: boolean, error?: string) => {
  if (error) return '#FF3B3B' // red
  if (connected) return '#00FF94' // green
  return '#8C8C8C' // gray
}