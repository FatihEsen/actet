import React, { useState } from 'react'
import { useSettings } from '../store/SettingsStore'
import { useTelemetry } from '../store/TelemetryStore'
import { useNavigate } from 'react-router-dom'

const Onboarding: React.FC = () => {
  const { settings, updateSettings } = useSettings()
  const { startSimulation } = useTelemetry()
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(0)
  const [setupMethod, setSetupMethod] = useState<'udp' | 'demo'>('demo')
  
  const steps = [
    {
      title: 'Welcome to AC Telemetry',
      content: 'Setup your racing dashboard for the ultimate telemetry experience'
    },
    {
      title: 'Choose Setup Method',
      content: 'How would you like to get started?'
    },
    {
      title: setupMethod === 'udp' ? 'UDP Configuration' : 'Demo Mode',
      content: setupMethod === 'udp' 
        ? 'Configure your connection to Assetto Corsa' 
        : 'Experience the dashboard with simulated data'
    },
    {
      title: 'Mobile Access',
      content: 'Access your dashboard on mobile devices'
    },
    {
      title: 'Ready to Race!',
      content: 'Your telemetry dashboard is configured and ready'
    }
  ]
  
  const handleUdpSettingsChange = (key: string, value: any) => {
    updateSettings({
      udp: { ...settings.udp, [key]: value }
    })
  }
  
  const generateQRCode = () => {
    const url = window.location.origin
    return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(url)}`
  }
  
  const handleFinishSetup = () => {
    if (setupMethod === 'demo') {
      startSimulation()
    } else {
      updateSettings({
        udp: { ...settings.udp, enabled: true }
      })
    }
    navigate('/')
  }
  
  const StepIndicator: React.FC = () => (
    <div className="flex justify-center mb-8">
      {steps.map((_, index) => (
        <div key={index} className="flex items-center">
          <div 
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
              index <= currentStep 
                ? 'bg-neon-blue text-racing-dark' 
                : 'bg-carbon text-silver-dark'
            }`}
          >
            {index + 1}
          </div>
          {index < steps.length - 1 && (
            <div 
              className={`w-12 h-0.5 transition-all duration-300 ${
                index < currentStep ? 'bg-neon-blue' : 'bg-carbon'
              }`} 
            />
          )}
        </div>
      ))}
    </div>
  )
  
  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="text-center space-y-6">
            <div className="text-6xl mb-6">🏁</div>
            <h2 className="text-3xl font-racing font-bold text-neon-blue">
              Welcome to AC Telemetry
            </h2>
            <p className="text-lg text-silver-dark max-w-2xl mx-auto">
              The ultimate telemetry dashboard for Assetto Corsa. Monitor your performance, 
              analyze your driving, and take your racing to the next level with real-time data 
              visualization and car controls.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="glass-panel p-4 text-center">
                <div className="text-2xl mb-2">📊</div>
                <h3 className="font-bold text-neon-blue">Real-time Data</h3>
                <p className="text-sm text-silver-dark">
                  Speed, RPM, tire temps, fuel, and more
                </p>
              </div>
              <div className="glass-panel p-4 text-center">
                <div className="text-2xl mb-2">🎮</div>
                <h3 className="font-bold text-neon-blue">Car Controls</h3>
                <p className="text-sm text-silver-dark">
                  TC, ABS, brake bias, signals, and lights
                </p>
              </div>
              <div className="glass-panel p-4 text-center">
                <div className="text-2xl mb-2">📱</div>
                <h3 className="font-bold text-neon-blue">Mobile Ready</h3>
                <p className="text-sm text-silver-dark">
                  Responsive design for desktop and mobile
                </p>
              </div>
            </div>
          </div>
        )
      
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-racing font-bold text-neon-blue text-center">
              Choose Your Setup Method
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <div 
                className={`glass-panel p-6 cursor-pointer border-2 transition-all duration-300 ${
                  setupMethod === 'demo' 
                    ? 'border-neon-blue bg-neon-blue/10' 
                    : 'border-carbon-light hover:border-neon-blue/50'
                }`}
                onClick={() => setSetupMethod('demo')}
              >
                <div className="text-center space-y-4">
                  <div className="text-4xl">🚗</div>
                  <h3 className="text-xl font-bold text-neon-green">Demo Mode</h3>
                  <p className="text-silver-dark">
                    Start immediately with simulated racing data. Perfect for exploring 
                    the dashboard features and interface.
                  </p>
                  <div className="text-sm text-neon-green font-medium">
                    ✓ Instant setup<br/>
                    ✓ No configuration needed<br/>
                    ✓ Realistic simulation
                  </div>
                </div>
              </div>
              
              <div 
                className={`glass-panel p-6 cursor-pointer border-2 transition-all duration-300 ${
                  setupMethod === 'udp' 
                    ? 'border-neon-blue bg-neon-blue/10' 
                    : 'border-carbon-light hover:border-neon-blue/50'
                }`}
                onClick={() => setSetupMethod('udp')}
              >
                <div className="text-center space-y-4">
                  <div className="text-4xl">🔗</div>
                  <h3 className="text-xl font-bold text-neon-blue">UDP Connection</h3>
                  <p className="text-silver-dark">
                    Connect directly to Assetto Corsa for real-time telemetry data 
                    from your actual racing sessions.
                  </p>
                  <div className="text-sm text-neon-blue font-medium">
                    ✓ Real-time data<br/>
                    ✓ Live car controls<br/>
                    ✓ Race session data
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      
      case 2:
        return setupMethod === 'demo' ? (
          <div className="text-center space-y-6">
            <h2 className="text-2xl font-racing font-bold text-neon-green">
              Demo Mode Setup
            </h2>
            <div className="text-6xl mb-6">🎮</div>
            <p className="text-lg text-silver-dark max-w-2xl mx-auto">
              Demo mode will start immediately with realistic simulated data. 
              You'll see live gauges, telemetry data, and can test all the car controls.
            </p>
            <div className="glass-panel p-6 max-w-lg mx-auto">
              <h3 className="font-bold text-silver mb-4">What you'll see:</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="text-left">
                  ✓ Live speed and RPM<br/>
                  ✓ Gear changes<br/>
                  ✓ Tire temperatures<br/>
                  ✓ Fuel consumption
                </div>
                <div className="text-left">
                  ✓ Lap times and deltas<br/>
                  ✓ Car controls<br/>
                  ✓ Turn signals<br/>
                  ✓ Electronic systems
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <h2 className="text-2xl font-racing font-bold text-neon-blue text-center">
              UDP Configuration
            </h2>
            <div className="max-w-2xl mx-auto space-y-6">
              <div className="glass-panel p-6">
                <h3 className="font-bold text-silver mb-4">Assetto Corsa Setup</h3>
                <ol className="text-sm text-silver-dark space-y-2 list-decimal list-inside">
                  <li>Open Assetto Corsa</li>
                  <li>Go to Settings → General</li>
                  <li>Find "UDP Telemetry" section</li>
                  <li>Set IP: <code className="bg-carbon px-1 rounded text-neon-blue">127.0.0.1</code></li>
                  <li>Set Port: <code className="bg-carbon px-1 rounded text-neon-blue">9996</code></li>
                  <li>Set Update Rate: <code className="bg-carbon px-1 rounded text-neon-blue">50Hz</code></li>
                  <li>Enable UDP Telemetry</li>
                </ol>
              </div>
              
              <div className="glass-panel p-6">
                <h3 className="font-bold text-silver mb-4">Dashboard Configuration</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-silver">IP Address</label>
                    <input
                      type="text"
                      value={settings.udp.ip}
                      onChange={(e) => handleUdpSettingsChange('ip', e.target.value)}
                      className="w-full bg-carbon border border-carbon-light rounded-lg px-3 py-2 text-silver focus:border-neon-blue focus:outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-silver">Port</label>
                    <input
                      type="number"
                      value={settings.udp.port}
                      onChange={(e) => handleUdpSettingsChange('port', Number(e.target.value))}
                      className="w-full bg-carbon border border-carbon-light rounded-lg px-3 py-2 text-silver focus:border-neon-blue focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      
      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-racing font-bold text-neon-blue text-center">
              Mobile Access
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="text-center space-y-4">
                <h3 className="text-lg font-bold text-silver">Scan QR Code</h3>
                <div className="bg-white p-4 rounded-lg inline-block">
                  <img 
                    src={generateQRCode()} 
                    alt="QR Code for mobile access"
                    className="w-48 h-48 mx-auto"
                  />
                </div>
                <p className="text-sm text-silver-dark">
                  Scan with your phone to access the dashboard on mobile
                </p>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-silver">Mobile Features</h3>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="text-neon-green">📱</div>
                    <div>
                      <div className="font-medium text-silver">Responsive Design</div>
                      <div className="text-sm text-silver-dark">
                        Optimized layout for phones and tablets
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="text-neon-blue">👆</div>
                    <div>
                      <div className="font-medium text-silver">Touch Controls</div>
                      <div className="text-sm text-silver-dark">
                        Large, touch-friendly buttons for car controls
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="text-neon-orange">📳</div>
                    <div>
                      <div className="font-medium text-silver">Haptic Feedback</div>
                      <div className="text-sm text-silver-dark">
                        Vibration alerts for important events
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="text-neon-yellow">🔄</div>
                    <div>
                      <div className="font-medium text-silver">Auto-Rotation</div>
                      <div className="text-sm text-silver-dark">
                        Landscape mode for optimal racing view
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="glass-panel p-4">
                  <h4 className="font-bold text-silver-dark mb-2">Network Access</h4>
                  <p className="text-sm text-silver-dark">
                    Current URL: <code className="bg-carbon px-1 rounded text-neon-blue">
                      {window.location.origin}
                    </code>
                  </p>
                  <p className="text-xs text-silver-dark mt-2">
                    Make sure your mobile device is on the same network
                  </p>
                </div>
              </div>
            </div>
          </div>
        )
      
      case 4:
        return (
          <div className="text-center space-y-6">
            <div className="text-6xl mb-6">🏁</div>
            <h2 className="text-3xl font-racing font-bold text-neon-green">
              Ready to Race!
            </h2>
            <p className="text-lg text-silver-dark max-w-2xl mx-auto">
              Your telemetry dashboard is now configured and ready for action. 
              {setupMethod === 'demo' 
                ? 'Demo mode will start with realistic racing data.' 
                : 'Connect to Assetto Corsa to see live telemetry data.'
              }
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto mt-8">
              <div className="glass-panel p-4">
                <div className="text-2xl mb-2">⚡</div>
                <h3 className="font-bold text-neon-blue">Performance</h3>
                <p className="text-sm text-silver-dark">
                  Monitor speed, RPM, and lap times
                </p>
              </div>
              <div className="glass-panel p-4">
                <div className="text-2xl mb-2">🎛️</div>
                <h3 className="font-bold text-neon-blue">Controls</h3>
                <p className="text-sm text-silver-dark">
                  Adjust TC, ABS, and other settings
                </p>
              </div>
              <div className="glass-panel p-4">
                <div className="text-2xl mb-2">📊</div>
                <h3 className="font-bold text-neon-blue">Analytics</h3>
                <p className="text-sm text-silver-dark">
                  Analyze tire temps and fuel consumption
                </p>
              </div>
            </div>
            
            <div className="glass-panel p-6 max-w-lg mx-auto">
              <h3 className="font-bold text-silver mb-4">Quick Tips</h3>
              <div className="text-sm text-silver-dark text-left space-y-2">
                <div>• Use the Settings page to customize units and preferences</div>
                <div>• Control panel works in both demo and live modes</div>
                <div>• Access the dashboard on mobile for trackside monitoring</div>
                <div>• All data updates in real-time at 60 FPS</div>
              </div>
            </div>
          </div>
        )
      
      default:
        return null
    }
  }
  
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <StepIndicator />
      
      <div className="min-h-[60vh]">
        {renderStepContent()}
      </div>
      
      {/* Navigation buttons */}
      <div className="flex justify-between items-center">
        <button
          onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
          disabled={currentStep === 0}
          className="racing-button disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ← Previous
        </button>
        
        <div className="text-center">
          <div className="text-sm text-silver-dark">
            Step {currentStep + 1} of {steps.length}
          </div>
          <div className="text-xs text-silver-dark mt-1">
            {steps[currentStep].title}
          </div>
        </div>
        
        {currentStep < steps.length - 1 ? (
          <button
            onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
            className="racing-button success"
          >
            Next →
          </button>
        ) : (
          <button
            onClick={handleFinishSetup}
            className="racing-button success text-lg px-6 py-3"
          >
            🏁 Start Racing!
          </button>
        )}
      </div>
    </div>
  )
}

export default Onboarding