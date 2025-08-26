# Assetto Corsa Telemetry Dashboard - Setup Guide

## 🚀 Quick Start (Instant Demo)

The fastest way to see the telemetry dashboard in action:

1. **Open the Demo**: Simply open `demo.html` in any modern web browser
2. **Start Demo Mode**: Click the "Demo Mode" button to see live simulated telemetry
3. **Explore Features**: Try all the car controls and watch the real-time gauges

**Features in Demo:**
- ✅ Live speed and RPM gauges with SVG animations
- ✅ Gear display with visual indicators
- ✅ Tire temperature heat maps
- ✅ Fuel level with consumption simulation
- ✅ Lap times with delta calculations
- ✅ Car controls (ABS, TC, signals, lights)
- ✅ Turn signals with flashing animations
- ✅ F1-inspired dark theme design
- ✅ Responsive mobile-friendly layout

## 🛠️ Full Development Setup

For the complete React/TypeScript version with build tools:

### Prerequisites
- Node.js 16+ and npm
- Modern web browser

### Installation
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Development Features
- Hot module reloading
- TypeScript type checking
- ESLint code quality
- Tailwind CSS with custom design system
- State management with Zustand
- Responsive design system

## 📱 Mobile Access

### For Demo Version
1. Open `demo.html` on your computer
2. Note the IP address (e.g., 192.168.1.100)
3. Access `http://[YOUR_IP]/demo.html` from mobile browser
4. All features work on mobile with touch controls

### For Development Version
1. Start the dev server: `npm run dev`
2. The server will show local and network URLs
3. Use the network URL on mobile devices
4. QR code generator available in onboarding

## 🔧 Real Assetto Corsa Integration

### AC Setup (for real telemetry)
1. **Assetto Corsa Configuration**:
   - Open AC → Settings → General
   - Find "UDP Telemetry" section
   - Set IP: `127.0.0.1`
   - Set Port: `9996`
   - Set Update Rate: `50Hz`
   - Enable UDP Telemetry

2. **UDP Bridge Server** (required for browser):
   ```javascript
   // server.js - Run with Node.js
   const WebSocket = require('ws')
   const dgram = require('dgram')
   
   const wss = new WebSocket.Server({ port: 8080 })
   const udpServer = dgram.createSocket('udp4')
   
   udpServer.bind(9996)
   udpServer.on('message', (msg, rinfo) => {
     wss.clients.forEach(client => {
       if (client.readyState === WebSocket.OPEN) {
         client.send(msg)
       }
     })
   })
   
   console.log('UDP bridge running on port 8080')
   ```

3. **Dashboard Connection**:
   - Go to Settings page
   - Configure UDP connection
   - Enable real-time telemetry

## 🎨 Customization

### Theme Colors (Tailwind config)
```javascript
colors: {
  'racing-dark': '#0A0A0A',
  'carbon': '#1A1A1A',
  'neon-blue': '#00D4FF',
  'neon-red': '#FF3B3B',
  'neon-green': '#00FF94',
  'neon-orange': '#FF8C00',
  // Customize these colors
}
```

### Widget Configuration
- Modify `src/components/dashboard/` for telemetry widgets
- Update `src/components/controls/` for car controls
- Customize layouts in `src/pages/Dashboard.tsx`

### Responsive Breakpoints
- Desktop: 1920x1080+ (optimized)
- Tablet: 768px+ (responsive grid)
- Mobile: 320px+ (stacked layout)

## 📊 Features Overview

### Telemetry Dashboard
- **Primary Gauges**: Speed and RPM with SVG animations
- **Gear Display**: Visual gear indicator with shift points
- **Electronics**: ABS, TC, DRS status indicators
- **Fuel System**: Level monitoring with warnings
- **Tire Data**: Temperature heat maps with color coding
- **Lap Times**: Current, best, and delta times
- **Driver Inputs**: Pedal visualization

### Car Controls
- **Electronics**: ABS toggle, TC adjustment (0-10)
- **Brake System**: Brake bias adjustment
- **Engine**: Ignition, engine maps, turbo modes
- **Lighting**: Headlights, high beams, rain lights
- **Signals**: Turn signals with proper one-at-a-time logic
- **Racing**: DRS, pit limiter, hazard lights

### Mobile Features
- **Touch Controls**: Large, finger-friendly buttons
- **Responsive Layout**: Optimized for phone screens
- **Haptic Feedback**: Vibration alerts (where supported)
- **Orientation**: Auto-rotation and landscape optimization

## 🔍 Troubleshooting

### Demo Not Working
- **Check Browser**: Use Chrome 90+, Firefox 88+, Safari 14+
- **JavaScript Enabled**: Ensure JS is not blocked
- **File Access**: Some features need HTTP (not file://)

### Development Issues
- **Dependencies**: Run `npm install` if modules missing
- **Port Conflicts**: Change port in `vite.config.ts`
- **TypeScript Errors**: Check `tsconfig.json` configuration

### UDP Connection Problems
- **AC Settings**: Verify UDP telemetry is enabled
- **Network**: Check firewall and IP settings
- **Bridge Server**: Ensure UDP-WebSocket bridge is running
- **CORS**: May need server configuration for cross-origin

### Mobile Access Issues
- **Network**: Ensure same WiFi network
- **IP Address**: Use computer's local IP, not localhost
- **Firewall**: Check Windows/Mac firewall settings

## 📱 Browser Compatibility

### Desktop
- **Chrome**: 90+ ✅ (Recommended)
- **Firefox**: 88+ ✅ 
- **Safari**: 14+ ✅
- **Edge**: 90+ ✅

### Mobile
- **iOS Safari**: 14+ ✅
- **Chrome Mobile**: 90+ ✅
- **Samsung Internet**: 14+ ✅
- **Firefox Mobile**: 88+ ✅

### Required Features
- ES2020 support
- CSS Grid and Flexbox
- WebSocket API (for real telemetry)
- SVG support
- CSS custom properties

## 🎯 Performance

### Optimization Features
- **60 FPS Updates**: Smooth gauge animations
- **Efficient Rendering**: Minimal DOM manipulations  
- **SVG Graphics**: Scalable, hardware-accelerated
- **Lazy Loading**: Components load when needed
- **Memory Management**: Proper cleanup of intervals

### System Requirements
- **RAM**: 1GB+ available
- **CPU**: Any modern processor
- **GPU**: Hardware acceleration recommended
- **Storage**: 50MB for full version

## 📁 Project Structure

```
assetto-corsa-telemetry/
├── demo.html                 # Standalone demo (works immediately)
├── package.json              # Dependencies and scripts  
├── index.html                # Main HTML template
├── src/
│   ├── components/           # React components
│   │   ├── dashboard/        # Telemetry widgets
│   │   ├── controls/         # Car control panels
│   │   ├── svg/             # Reusable SVG components
│   │   └── ui/              # Navigation and common UI
│   ├── pages/               # Main application pages
│   ├── store/               # State management
│   ├── types/               # TypeScript definitions
│   ├── utils/               # Utilities and helpers
│   └── styles/              # Global CSS and Tailwind
├── tailwind.config.js       # Design system configuration
├── vite.config.ts           # Build tool configuration
└── README.md               # Documentation
```

## 🤝 Support & Community

- **Documentation**: See README.md for detailed info
- **Issues**: Report bugs via GitHub issues
- **Racing Communities**: Join sim racing forums for tips
- **Updates**: Check for new features and improvements

---

**Start with the demo.html file to see everything in action immediately!** 🏁