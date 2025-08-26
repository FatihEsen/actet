import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { TelemetryProvider } from './store/TelemetryStore'
import { SettingsProvider } from './store/SettingsStore'
import Dashboard from './pages/Dashboard'
import Settings from './pages/Settings'
import Onboarding from './pages/Onboarding'
import { Navigation } from './components/ui/Navigation'
import { ConnectionStatus } from './components/ui/ConnectionStatus'

function App() {
  return (
    <TelemetryProvider>
      <SettingsProvider>
        <Router>
          <div className="min-h-screen bg-racing-dark text-silver">
            {/* Header with navigation and connection status */}
            <header className="glass-panel border-b border-carbon-light/30 p-4">
              <div className="max-w-7xl mx-auto flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <h1 className="text-2xl font-racing font-bold text-neon-blue">
                    AC Telemetry
                  </h1>
                  <Navigation />
                </div>
                <ConnectionStatus />
              </div>
            </header>

            {/* Main content */}
            <main className="max-w-7xl mx-auto p-4">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/setup" element={<Onboarding />} />
              </Routes>
            </main>

            {/* Footer */}
            <footer className="mt-8 p-4 border-t border-carbon-light/30">
              <div className="max-w-7xl mx-auto text-center text-silver-dark text-sm">
                <p>Assetto Corsa Telemetry Dashboard v1.0.0</p>
                <p className="mt-1">Designed for desktop and mobile racing</p>
              </div>
            </footer>
          </div>
        </Router>
      </SettingsProvider>
    </TelemetryProvider>
  )
}

export default App