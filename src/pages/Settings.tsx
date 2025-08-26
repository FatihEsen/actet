import React, { useState } from 'react'
import { useSettings } from '../store/SettingsStore'
import { useTelemetry } from '../store/TelemetryStore'

const Settings: React.FC = () => {
  const { settings, updateSettings, resetSettings, exportSettings, importSettings } = useSettings()
  const { connectionStatus } = useTelemetry()
  const [importJson, setImportJson] = useState('')
  
  const handleUdpSettingsChange = (key: string, value: any) => {
    updateSettings({
      udp: { ...settings.udp, [key]: value }
    })
  }
  
  const handleUnitsChange = (key: string, value: any) => {
    updateSettings({
      units: { ...settings.units, [key]: value }
    })
  }
  
  const handleAudioChange = (key: string, value: any) => {
    updateSettings({
      audio: { ...settings.audio, [key]: value }
    })
  }
  
  const handleMobileChange = (key: string, value: any) => {
    updateSettings({
      mobile: { ...settings.mobile, [key]: value }
    })
  }
  
  const handleExportSettings = () => {
    const json = exportSettings()
    navigator.clipboard.writeText(json)
    alert('Settings copied to clipboard!')
  }
  
  const handleImportSettings = () => {
    try {
      importSettings(importJson)
      setImportJson('')
      alert('Settings imported successfully!')
    } catch (error) {
      alert('Invalid settings JSON')
    }
  }
  
  const SettingSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="glass-panel p-6 space-y-4">
      <h3 className="text-lg font-racing font-bold text-neon-blue border-b border-carbon-light pb-2">
        {title}
      </h3>
      {children}
    </div>
  )
  
  const ToggleSwitch: React.FC<{
    label: string
    checked: boolean
    onChange: (checked: boolean) => void
    description?: string
  }> = ({ label, checked, onChange, description }) => (
    <div className="flex items-center justify-between">
      <div>
        <div className="text-sm font-medium text-silver">{label}</div>
        {description && <div className="text-xs text-silver-dark">{description}</div>}
      </div>
      <button
        onClick={() => onChange(!checked)}
        className={`
          relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200
          ${checked ? 'bg-neon-blue' : 'bg-carbon-light'}
        `}
      >
        <span
          className={`
            inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200
            ${checked ? 'translate-x-6' : 'translate-x-1'}
          `}
        />
      </button>
    </div>
  )
  
  const SelectInput: React.FC<{
    label: string
    value: string
    options: { value: string; label: string }[]
    onChange: (value: string) => void
  }> = ({ label, value, options, onChange }) => (
    <div className="space-y-2">
      <label className="text-sm font-medium text-silver">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-carbon border border-carbon-light rounded-lg px-3 py-2 text-silver focus:border-neon-blue focus:outline-none"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
  
  const NumberInput: React.FC<{
    label: string
    value: number
    onChange: (value: number) => void
    min?: number
    max?: number
    step?: number
  }> = ({ label, value, onChange, min, max, step = 1 }) => (
    <div className="space-y-2">
      <label className="text-sm font-medium text-silver">{label}</label>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        min={min}
        max={max}
        step={step}
        className="w-full bg-carbon border border-carbon-light rounded-lg px-3 py-2 text-silver focus:border-neon-blue focus:outline-none"
      />
    </div>
  )
  
  const SliderInput: React.FC<{
    label: string
    value: number
    min: number
    max: number
    step?: number
    onChange: (value: number) => void
    formatValue?: (value: number) => string
  }> = ({ label, value, min, max, step = 1, onChange, formatValue }) => (
    <div className="space-y-2">
      <div className="flex justify-between">
        <span className="text-sm font-medium text-silver">{label}</span>
        <span className="text-sm font-racing font-bold text-neon-blue">
          {formatValue ? formatValue(value) : value}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 bg-carbon rounded-lg appearance-none cursor-pointer"
        style={{
          background: `linear-gradient(to right, #00D4FF 0%, #00D4FF ${((value - min) / (max - min)) * 100}%, #2A2A2A ${((value - min) / (max - min)) * 100}%, #2A2A2A 100%)`
        }}
      />
    </div>
  )
  
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-racing font-bold text-neon-blue">Settings</h1>
        <p className="text-silver-dark mt-2">Configure your telemetry dashboard</p>
      </div>
      
      {/* UDP Connection Settings */}
      <SettingSection title="UDP Connection">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-silver">IP Address</label>
            <input
              type="text"
              value={settings.udp.ip}
              onChange={(e) => handleUdpSettingsChange('ip', e.target.value)}
              className="w-full bg-carbon border border-carbon-light rounded-lg px-3 py-2 text-silver focus:border-neon-blue focus:outline-none"
              placeholder="127.0.0.1"
            />
          </div>
          
          <NumberInput
            label="Port"
            value={settings.udp.port}
            onChange={(value) => handleUdpSettingsChange('port', value)}
            min={1}
            max={65535}
          />
        </div>
        
        <ToggleSwitch
          label="Enable UDP Connection"
          checked={settings.udp.enabled}
          onChange={(checked) => handleUdpSettingsChange('enabled', checked)}
          description="Connect to Assetto Corsa for real-time telemetry data"
        />
        
        {/* Connection status */}
        <div className="bg-carbon/50 rounded-lg p-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-silver-dark">Connection Status</span>
            <div className={`flex items-center space-x-2 ${
              connectionStatus.connected ? 'text-neon-green' : 'text-neon-red'
            }`}>
              <div className="w-2 h-2 rounded-full bg-current" />
              <span className="text-sm font-medium">
                {connectionStatus.connected ? 'Connected' : 'Disconnected'}
              </span>
            </div>
          </div>
          {connectionStatus.error && (
            <div className="text-xs text-neon-red mt-1">{connectionStatus.error}</div>
          )}
        </div>
      </SettingSection>
      
      {/* Display Settings */}
      <SettingSection title="Display & Units">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <SelectInput
            label="Theme"
            value={settings.theme}
            options={[
              { value: 'dark', label: 'Dark' },
              { value: 'light', label: 'Light' }
            ]}
            onChange={(value) => updateSettings({ theme: value as 'dark' | 'light' })}
          />
          
          <SelectInput
            label="Speed Unit"
            value={settings.units.speed}
            options={[
              { value: 'kmh', label: 'km/h' },
              { value: 'mph', label: 'mph' }
            ]}
            onChange={(value) => handleUnitsChange('speed', value)}
          />
          
          <SelectInput
            label="Temperature Unit"
            value={settings.units.temperature}
            options={[
              { value: 'celsius', label: 'Celsius (°C)' },
              { value: 'fahrenheit', label: 'Fahrenheit (°F)' }
            ]}
            onChange={(value) => handleUnitsChange('temperature', value)}
          />
        </div>
        
        <SelectInput
          label="Pressure Unit"
          value={settings.units.pressure}
          options={[
            { value: 'psi', label: 'PSI' },
            { value: 'bar', label: 'Bar' }
          ]}
          onChange={(value) => handleUnitsChange('pressure', value)}
        />
      </SettingSection>
      
      {/* Audio Settings */}
      <SettingSection title="Audio & Alerts">
        <ToggleSwitch
          label="Enable Audio"
          checked={settings.audio.enabled}
          onChange={(checked) => handleAudioChange('enabled', checked)}
        />
        
        {settings.audio.enabled && (
          <div className="space-y-4">
            <SliderInput
              label="Volume"
              value={settings.audio.volume}
              min={0}
              max={1}
              step={0.1}
              onChange={(value) => handleAudioChange('volume', value)}
              formatValue={(value) => `${Math.round(value * 100)}%`}
            />
            
            <ToggleSwitch
              label="Shift Beep"
              checked={settings.audio.shiftBeep}
              onChange={(checked) => handleAudioChange('shiftBeep', checked)}
              description="Play sound when approaching redline"
            />
            
            <ToggleSwitch
              label="Warning Alerts"
              checked={settings.audio.warningAlerts}
              onChange={(checked) => handleAudioChange('warningAlerts', checked)}
              description="Play alerts for low fuel, overheating, etc."
            />
          </div>
        )}
      </SettingSection>
      
      {/* Mobile Settings */}
      <SettingSection title="Mobile Settings">
        <ToggleSwitch
          label="Haptic Feedback"
          checked={settings.mobile.hapticFeedback}
          onChange={(checked) => handleMobileChange('hapticFeedback', checked)}
          description="Vibrate on important events (mobile only)"
        />
        
        <SelectInput
          label="Screen Orientation"
          value={settings.mobile.orientation}
          options={[
            { value: 'auto', label: 'Auto' },
            { value: 'landscape', label: 'Landscape' },
            { value: 'portrait', label: 'Portrait' }
          ]}
          onChange={(value) => handleMobileChange('orientation', value)}
        />
      </SettingSection>
      
      {/* Import/Export Settings */}
      <SettingSection title="Backup & Restore">
        <div className="space-y-4">
          <div className="flex space-x-3">
            <button
              onClick={handleExportSettings}
              className="racing-button success flex-1"
            >
              📄 Export Settings
            </button>
            <button
              className="racing-button danger flex-1"
              onClick={() => {
                if (confirm('Are you sure you want to reset all settings?')) {
                  resetSettings()
                }
              }}
            >
              🔄 Reset to Defaults
            </button>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-silver">Import Settings JSON</label>
            <textarea
              value={importJson}
              onChange={(e) => setImportJson(e.target.value)}
              placeholder="Paste exported settings JSON here..."
              className="w-full h-24 bg-carbon border border-carbon-light rounded-lg px-3 py-2 text-silver focus:border-neon-blue focus:outline-none resize-none"
            />
            <button
              onClick={handleImportSettings}
              disabled={!importJson.trim()}
              className="racing-button w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              📥 Import Settings
            </button>
          </div>
        </div>
      </SettingSection>
    </div>
  )
}

export default Settings