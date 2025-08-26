// Assetto Corsa telemetry data types
export interface TelemetryData {
  // Core data
  speed: number; // km/h
  rpm: number;
  gear: number;
  maxRpm: number;
  
  // Engine & Performance
  turboBoost: number;
  fuelLevel: number; // liters
  fuelCapacity: number; // liters
  engineTemp: number; // celsius
  
  // Electronics
  abs: boolean;
  tc: number; // traction control level (0-10)
  tcCut: boolean; // traction control cutting power
  absInAction: boolean;
  
  // Brakes & Suspension
  brakeBias: number; // percentage front
  brakeTemp: [number, number, number, number]; // FL, FR, RL, RR
  
  // Tires
  tireTemp: [number, number, number, number]; // FL, FR, RL, RR (celsius)
  tirePressure: [number, number, number, number]; // FL, FR, RL, RR (psi)
  tireWear: [number, number, number, number]; // FL, FR, RL, RR (0-1)
  tireCompound: string;
  
  // Input
  throttle: number; // 0-1
  brake: number; // 0-1
  steer: number; // -1 to 1
  clutch: number; // 0-1
  
  // Lap data
  lapTime: number; // current lap time in milliseconds
  lastLap: number; // last lap time in milliseconds
  bestLap: number; // best lap time in milliseconds
  delta: number; // delta to best lap in milliseconds
  currentSector: number; // 0, 1, 2
  
  // Position & Track
  positionX: number;
  positionY: number;
  positionZ: number;
  velocity: [number, number, number];
  
  // Car status
  damage: {
    front: number; // 0-1
    rear: number; // 0-1
    left: number; // 0-1
    right: number; // 0-1
    center: number; // 0-1
  };
  
  // Flags and warnings
  isInPit: boolean;
  isInPitLane: boolean;
  mandatoryPitDone: boolean;
  
  // DRS
  drsAvailable: boolean;
  drsEnabled: boolean;
}

export interface CarControls {
  // Electronics
  abs: boolean;
  tc: number; // 0-10
  brakeBias: number; // percentage
  turboMode: 'low' | 'medium' | 'high';
  
  // Engine
  ignition: boolean;
  engineMap: number; // 1-8
  
  // Lights & Signals
  headlights: boolean;
  highBeams: boolean;
  leftSignal: boolean;
  rightSignal: boolean;
  hazardLights: boolean;
  rainLights: boolean;
  
  // Assists
  pitLimiter: boolean;
  drs: boolean;
  wipers: boolean;
  
  // Radio/Pit
  radioPreset: number;
}

export interface AppSettings {
  // Display
  theme: 'dark' | 'light';
  units: {
    speed: 'kmh' | 'mph';
    temperature: 'celsius' | 'fahrenheit';
    pressure: 'psi' | 'bar';
  };
  
  // Connection
  udp: {
    ip: string;
    port: number;
    enabled: boolean;
  };
  
  // Dashboard
  customization: {
    layout: 'compact' | 'detailed' | 'custom';
    widgets: string[];
    positions: Record<string, { x: number; y: number; w: number; h: number }>;
  };
  
  // Audio
  audio: {
    enabled: boolean;
    volume: number;
    shiftBeep: boolean;
    warningAlerts: boolean;
  };
  
  // Mobile
  mobile: {
    hapticFeedback: boolean;
    orientation: 'auto' | 'landscape' | 'portrait';
  };
}

export interface ConnectionStatus {
  connected: boolean;
  lastUpdate: number;
  latency: number;
  packetsReceived: number;
  packetsLost: number;
  error?: string;
}

// Widget configuration
export interface WidgetConfig {
  id: string;
  type: string;
  title: string;
  enabled: boolean;
  position: { x: number; y: number; w: number; h: number };
  settings: Record<string, any>;
}

// Color schemes for different racing series
export type ColorScheme = 'f1' | 'gt' | 'rally' | 'drift' | 'custom';

export interface ThemeConfig {
  scheme: ColorScheme;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    warning: string;
    danger: string;
    success: string;
    background: string;
    surface: string;
    text: string;
  };
}