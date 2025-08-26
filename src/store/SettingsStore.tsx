import React, { createContext, useContext, ReactNode, useEffect } from 'react'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { AppSettings, CarControls, WidgetConfig } from '../types'

interface SettingsState {
  // Settings
  settings: AppSettings
  controls: CarControls
  widgets: WidgetConfig[]
  
  // Actions
  updateSettings: (settings: Partial<AppSettings>) => void
  updateControls: (controls: Partial<CarControls>) => void
  updateWidget: (widgetId: string, config: Partial<WidgetConfig>) => void
  addWidget: (widget: WidgetConfig) => void
  removeWidget: (widgetId: string) => void
  resetSettings: () => void
  exportSettings: () => string
  importSettings: (json: string) => void
}

// Default settings
const defaultSettings: AppSettings = {
  theme: 'dark',
  units: {
    speed: 'kmh',
    temperature: 'celsius',
    pressure: 'psi'
  },
  udp: {
    ip: '127.0.0.1',
    port: 9996,
    enabled: false
  },
  customization: {
    layout: 'detailed',
    widgets: ['speed', 'rpm', 'gear', 'abs', 'tc', 'fuel', 'tires'],
    positions: {}
  },
  audio: {
    enabled: true,
    volume: 0.7,
    shiftBeep: true,
    warningAlerts: true
  },
  mobile: {
    hapticFeedback: true,
    orientation: 'auto'
  }
}

const defaultControls: CarControls = {
  abs: true,
  tc: 3,
  brakeBias: 60,
  turboMode: 'medium',
  ignition: true,
  engineMap: 4,
  headlights: false,
  highBeams: false,
  leftSignal: false,
  rightSignal: false,
  hazardLights: false,
  rainLights: false,
  pitLimiter: false,
  drs: false,
  wipers: false,
  radioPreset: 1
}

const defaultWidgets: WidgetConfig[] = [
  {
    id: 'speed',
    type: 'gauge',
    title: 'Speed',
    enabled: true,
    position: { x: 0, y: 0, w: 2, h: 2 },
    settings: { maxValue: 350, unit: 'kmh', showDigital: true }
  },
  {
    id: 'rpm',
    type: 'gauge',
    title: 'RPM',
    enabled: true,
    position: { x: 2, y: 0, w: 2, h: 2 },
    settings: { showRedline: true, showShiftLight: true }
  },
  {
    id: 'gear',
    type: 'digital',
    title: 'Gear',
    enabled: true,
    position: { x: 4, y: 0, w: 1, h: 1 },
    settings: { showNeutral: true }
  },
  {
    id: 'abs',
    type: 'indicator',
    title: 'ABS',
    enabled: true,
    position: { x: 0, y: 2, w: 1, h: 1 },
    settings: { activeColor: 'green', inactiveColor: 'gray' }
  },
  {
    id: 'tc',
    type: 'indicator',
    title: 'TC',
    enabled: true,
    position: { x: 1, y: 2, w: 1, h: 1 },
    settings: { showLevel: true }
  },
  {
    id: 'fuel',
    type: 'bar',
    title: 'Fuel',
    enabled: true,
    position: { x: 2, y: 2, w: 2, h: 1 },
    settings: { warningLevel: 10, unit: 'liters' }
  },
  {
    id: 'tires',
    type: 'tire-temps',
    title: 'Tire Temps',
    enabled: true,
    position: { x: 0, y: 3, w: 4, h: 2 },
    settings: { showPressure: true, showWear: true }
  }
]

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set, get) => ({
      settings: defaultSettings,
      controls: defaultControls,
      widgets: defaultWidgets,

      updateSettings: (newSettings) => {
        set((state) => ({
          settings: { ...state.settings, ...newSettings }
        }))
      },

      updateControls: (newControls) => {
        set((state) => ({
          controls: { ...state.controls, ...newControls }
        }))
        
        // Handle signal logic - only one turn signal can be active
        if (newControls.leftSignal && get().controls.rightSignal) {
          set((state) => ({
            controls: { ...state.controls, rightSignal: false }
          }))
        } else if (newControls.rightSignal && get().controls.leftSignal) {
          set((state) => ({
            controls: { ...state.controls, leftSignal: false }
          }))
        }
        
        // Turn off signals when hazards are activated
        if (newControls.hazardLights) {
          set((state) => ({
            controls: { 
              ...state.controls, 
              leftSignal: false, 
              rightSignal: false 
            }
          }))
        }
      },

      updateWidget: (widgetId, config) => {
        set((state) => ({
          widgets: state.widgets.map(widget =>
            widget.id === widgetId ? { ...widget, ...config } : widget
          )
        }))
      },

      addWidget: (widget) => {
        set((state) => ({
          widgets: [...state.widgets, widget]
        }))
      },

      removeWidget: (widgetId) => {
        set((state) => ({
          widgets: state.widgets.filter(widget => widget.id !== widgetId)
        }))
      },

      resetSettings: () => {
        set({
          settings: defaultSettings,
          controls: defaultControls,
          widgets: defaultWidgets
        })
      },

      exportSettings: () => {
        const state = get()
        return JSON.stringify({
          settings: state.settings,
          controls: state.controls,
          widgets: state.widgets
        }, null, 2)
      },

      importSettings: (json) => {
        try {
          const imported = JSON.parse(json)
          set({
            settings: { ...defaultSettings, ...imported.settings },
            controls: { ...defaultControls, ...imported.controls },
            widgets: imported.widgets || defaultWidgets
          })
        } catch (error) {
          console.error('Failed to import settings:', error)
        }
      }
    }),
    {
      name: 'ac-telemetry-settings',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        settings: state.settings,
        controls: state.controls,
        widgets: state.widgets
      })
    }
  )
)

// React Context Provider
const SettingsContext = createContext<SettingsState | null>(null)

export const SettingsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const store = useSettingsStore()
  
  // Apply theme changes to document
  useEffect(() => {
    const theme = store.settings.theme
    document.documentElement.className = theme
  }, [store.settings.theme])
  
  return (
    <SettingsContext.Provider value={store}>
      {children}
    </SettingsContext.Provider>
  )
}

export const useSettings = () => {
  const context = useContext(SettingsContext)
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider')
  }
  return context
}