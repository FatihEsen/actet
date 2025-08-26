# Assetto Corsa Telemetry Dashboard

A modern, real-time telemetry dashboard for Assetto Corsa with F1-inspired design, built with React, TypeScript, and Tailwind CSS.

![Dashboard Preview](https://via.placeholder.com/800x400/0A0A0A/00D4FF?text=AC+Telemetry+Dashboard)

## ✨ Features

### 🏁 Real-time Telemetry
- **Speed & RPM Gauges**: Circular SVG gauges with redline warnings
- **Gear Display**: Visual gear indicator with shift points
- **Tire Temperatures**: Heat map visualization with color coding
- **Fuel Level**: Bar gauge with consumption warnings
- **Lap Times**: Current, best, and delta times with sector display
- **Pedal Inputs**: Real-time throttle, brake, steering visualization

### 🎛️ Car Controls
- **Electronic Systems**: TC, ABS, brake bias adjustment
- **Lights & Signals**: Turn signals, hazards, headlights with flashing animations
- **Engine Controls**: Ignition, engine maps, turbo modes
- **Racing Features**: DRS, pit limiter, rain lights

### 📱 Multi-platform Support
- **Desktop**: Optimized for 1920x1080+ displays
- **Mobile**: Touch-friendly responsive design
- **QR Code**: Easy mobile access setup

### 🎨 F1-Inspired Design
- **Dark Theme**: Carbon fiber and neon accents
- **Color Coding**: Blue, red, green, orange status indicators
- **Smooth Animations**: 60 FPS updates and transitions
- **Racing Fonts**: Orbitron and Rajdhani typography

## 🚀 Quick Start

### Option 1: Demo Mode (Instant)
```bash
# No dependencies needed - just open in browser
# The app includes a demo mode with simulated racing data
```

### Option 2: Development Setup
```bash
# Clone or download the project
cd assetto-corsa-telemetry

# Install dependencies (if Node.js is available)
npm install

# Start development server
npm run dev

# Open http://localhost:3000
```

### Option 3: Direct Browser Usage
1. Download the project files
2. Open `index.html` in a modern browser
3. Click "Demo Mode" to start immediately

## 📋 Setup Guide

### For Real AC Telemetry (Advanced)
1. **Assetto Corsa Setup**:
   - Open AC → Settings → General
   - Find "UDP Telemetry" section
   - Set IP: `127.0.0.1`
   - Set Port: `9996`
   - Set Update Rate: `50Hz`
   - Enable UDP Telemetry

2. **Dashboard Setup**:
   - Go to Settings page
   - Configure UDP connection
   - Test connection

### For Demo Mode (Recommended)
1. Open the dashboard
2. Click "Demo Mode" button
3. Explore all features with simulated data

## 🎮 Usage

### Dashboard Views
- **Main Dashboard**: Primary gauges and telemetry
- **Settings**: Configuration and preferences
- **Setup**: Onboarding and connection guide

### Controls
- **Electronics**: Toggle ABS, TC, adjust brake bias
- **Signals**: Left/right turn signals, hazard lights
- **Engine**: Ignition, engine maps, turbo control
- **Lights**: Headlights, high beams, rain lights

### Mobile Access
1. Scan QR code from setup page
2. Access dashboard on same network
3. Use touch controls for car functions

## 🛠️ Technical Details

### Built With
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling and design system
- **Zustand** - State management
- **Vite** - Build tool and dev server
- **SVG** - Scalable graphics for gauges

### Architecture
```
src/
├── components/
│   ├── dashboard/    # Telemetry widgets
│   ├── controls/     # Car control panels
│   ├── svg/         # Reusable SVG components
│   └── ui/          # Navigation and common UI
├── pages/           # Main application pages
├── store/           # State management (Zustand)
├── types/           # TypeScript definitions
├── utils/           # UDP client and helpers
└── styles/          # Global CSS and Tailwind config
```

### Data Flow
1. **UDP Server** (AC) → **WebSocket Bridge** → **Dashboard**
2. **Demo Mode**: Simulated realistic racing data
3. **Controls**: State management with immediate feedback
4. **Real-time**: 50-60 FPS updates for smooth visuals

## 🎨 Customization

### Themes
- Dark mode (default) - F1 inspired
- Light mode option available
- Custom color schemes in settings

### Units
- Speed: km/h or mph
- Temperature: Celsius or Fahrenheit  
- Pressure: PSI or Bar

### Layout
- Widget customization (planned)
- Drag-and-drop interface (planned)
- Multiple layout presets

## 📱 Mobile Features

### Responsive Design
- Optimized layouts for phones/tablets
- Touch-friendly button sizes
- Landscape mode support

### Mobile-Specific
- Haptic feedback for alerts
- Auto-rotation handling
- Offline capability

## 🔧 Advanced Setup

### UDP Bridge Server (Optional)
For real AC telemetry, you need a WebSocket bridge:

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

### Configuration Files
- `tailwind.config.js` - Design system colors
- `vite.config.ts` - Build configuration
- `tsconfig.json` - TypeScript settings

## 🐛 Troubleshooting

### Common Issues

**Demo Mode Not Working**
- Refresh the browser
- Check JavaScript is enabled
- Try a different browser

**UDP Connection Failed**
- Verify AC UDP settings
- Check IP/port configuration
- Ensure UDP bridge is running
- Confirm network connectivity

**Mobile Access Issues**
- Verify same network connection
- Check firewall settings
- Try direct IP access

### Browser Compatibility
- **Recommended**: Chrome 90+, Firefox 88+, Safari 14+
- **Required**: ES2020 support, WebSocket API
- **Mobile**: iOS 14+, Android 8+

## 📊 Performance

### Optimization Features
- 60 FPS smooth animations
- Efficient SVG rendering
- Minimal re-renders
- Lazy loading components
- Optimized bundle size

### System Requirements
- **Desktop**: Any modern browser
- **Mobile**: 2GB RAM recommended
- **Network**: Local network for real telemetry

## 🤝 Contributing

### Development
1. Fork the repository
2. Create feature branch
3. Make changes with tests
4. Submit pull request

### Feature Requests
- Track map integration
- More car brands support
- Additional telemetry data
- Custom widget creation

## 📄 License

MIT License - Feel free to use for personal and commercial projects.

## 🙏 Acknowledgments

- **Assetto Corsa** - Amazing racing simulation
- **F1 Teams** - Design inspiration
- **Racing Community** - Feature suggestions and feedback

## 📞 Support

- **Documentation**: See setup guide above
- **Issues**: Report bugs via GitHub issues
- **Community**: Join racing sim communities for tips

---

**Ready to race? Start with Demo Mode and explore all features!** 🏁

---

# Assetto Corsa Telemetri Paneli

*F1-ilhamlı tasarımla modern, gerçek zamanlı telemetri paneli - React, TypeScript ve Tailwind CSS ile geliştirilmiştir.*

## ✨ Özellikler

### 🏁 Gerçek Zamanlı Telemetri
- **Hız ve RPM Göstergeleri**: Kırmızı hat uyarıları ile dairesel SVG göstergeler
- **Vites Göstergesi**: Vites değişim noktaları ile görsel vites göstergesi
- **Lastik Sıcaklıkları**: Renk kodlu ısı haritası görselleştirmesi
- **Yakıt Seviyesi**: Tüketim uyarıları ile çubuk gösterge
- **Tur Zamanları**: Mevcut, en iyi ve delta zamanları ile sektör gösterimi
- **Pedal Girişleri**: Gerçek zamanlı gaz, fren, direksiyon görselleştirmesi

### 🎛️ Araç Kontrolleri
- **Elektronik Sistemler**: TC, ABS, fren dengesi ayarı
- **Işıklar ve Sinyaller**: Sinyal lambaları, dörtlü flaşör, farlar ile yanıp sönen animasyonlar
- **Motor Kontrolleri**: Kontak, motor haritaları, turbo modları
- **Yarış Özellikleri**: DRS, pit sınırlayıcısı, yağmur lambaları

### 📱 Çoklu Platform Desteği
- **Masaüstü**: 1920x1080+ ekranlar için optimize edilmiş
- **Mobil**: Dokunmatik dostu duyarlı tasarım
- **QR Kod**: Kolay mobil erişim kurulumu

### 🎨 F1-İlhamlı Tasarım
- **Koyu Tema**: Karbon fiber ve neon vurgular
- **Renk Kodlaması**: Mavi, kırmızı, yeşil, turuncu durum göstergeleri
- **Akıcı Animasyonlar**: 60 FPS güncellemeler ve geçişler
- **Yarış Fontları**: Orbitron ve Rajdhani tipografisi

## 🚀 Hızlı Başlangıç

### Seçenek 1: Demo Modu (Anında)
```bash
# Hiçbir bağımlılık gerekmez - sadece tarayıcıda açın
# Uygulama simüle edilmiş yarış verisi ile demo modu içerir
```

### Seçenek 2: Geliştirme Kurulumu
```bash
# Projeyi klonlayın veya indirin
cd assetto-corsa-telemetry

# Bağımlılıkları yükleyin (Node.js mevcutsa)
npm install

# Geliştirme sunucusunu başlatın
npm run dev

# http://localhost:3000 adresini açın
```

### Seçenek 3: Doğrudan Tarayıcı Kullanımı
1. Proje dosyalarını indirin
2. Modern bir tarayıcıda `demo.html` dosyasını açın
3. Hemen başlamak için "Demo Mode" butonuna tıklayın

## 📋 Kurulum Rehberi

### Gerçek AC Telemetrisi İçin (Gelişmiş)
1. **Assetto Corsa Kurulumu**:
   - AC → Ayarlar → Genel menüsünü açın
   - "UDP Telemetry" bölümünü bulun
   - IP: `127.0.0.1` olarak ayarlayın
   - Port: `9996` olarak ayarlayın
   - Güncelleme Hızı: `50Hz` olarak ayarlayın
   - UDP Telemetrisini etkinleştirin

2. **Panel Kurulumu**:
   - Ayarlar sayfasına gidin
   - UDP bağlantısını yapılandırın
   - Bağlantıyı test edin

### Demo Modu İçin (Önerilen)
1. Paneli açın
2. "Demo Mode" butonuna tıklayın
3. Simüle edilmiş verilerle tüm özellikleri keşfedin

## 🎮 Kullanım

### Panel Görünümleri
- **Ana Panel**: Birincil göstergeler ve telemetri
- **Ayarlar**: Yapılandırma ve tercihler
- **Kurulum**: Başlangıç rehberi ve bağlantı kılavuzu

### Kontroller
- **Elektronik**: ABS, TC açma/kapama, fren dengesi ayarı
- **Sinyaller**: Sol/sağ sinyal lambaları, dörtlü flaşör
- **Motor**: Kontak, motor haritaları, turbo kontrolü
- **Işıklar**: Farlar, uzun far, yağmur lambaları

### Mobil Erişim
1. Kurulum sayfasından QR kodu tarayın
2. Aynı ağ üzerinden panele erişin
3. Araç fonksiyonları için dokunmatik kontrolleri kullanın

## 🛠️ Teknik Detaylar

### Teknolojiler
- **React 18** - UI framework
- **TypeScript** - Tip güvenliği
- **Tailwind CSS** - Stil ve tasarım sistemi
- **Zustand** - Durum yönetimi
- **Vite** - Derleme aracı ve geliştirme sunucusu
- **SVG** - Göstergeler için ölçeklenebilir grafikler

## 🎨 Özelleştirme

### Temalar
- Koyu mod (varsayılan) - F1 ilhamlı
- Açık mod seçeneği mevcut
- Ayarlarda özel renk şemaları

### Birimler
- Hız: km/s veya mph
- Sıcaklık: Celsius veya Fahrenheit
- Basınç: PSI veya Bar

## 📱 Mobil Özellikler

### Duyarlı Tasarım
- Telefon/tablet için optimize edilmiş düzenler
- Dokunmatik dostu buton boyutları
- Yatay mod desteği

### Mobil-Özel
- Uyarılar için haptic geri bildirim
- Otomatik döndürme işleme
- Çevrimdışı özellik

## 🐛 Sorun Giderme

### Yaygın Sorunlar

**Demo Modu Çalışmıyor**
- Tarayıcıyı yenileyin
- JavaScript'in etkin olduğunu kontrol edin
- Farklı bir tarayıcı deneyin

**UDP Bağlantısı Başarısız**
- AC UDP ayarlarını doğrulayın
- IP/port yapılandırmasını kontrol edin
- UDP köprüsünün çalıştığından emin olun
- Ağ bağlantısını onaylayın

**Mobil Erişim Sorunları**
- Aynı ağ bağlantısını doğrulayın
- Güvenlik duvarı ayarlarını kontrol edin
- Doğrudan IP erişimi deneyin

### Tarayıcı Uyumluluğu
- **Önerilen**: Chrome 90+, Firefox 88+, Safari 14+
- **Gerekli**: ES2020 desteği, WebSocket API
- **Mobil**: iOS 14+, Android 8+

## 🏆 Proje Özellikleri

1. **Anında Kullanılabilirlik**: `demo.html` herhangi bir tarayıcıda anında çalışır
2. **Profesyonel Kalite**: F1 seviyesinde telemetri görselleştirmesi
3. **Eksiksiz Özellik Seti**: Her gereksinim uygulanmış ve test edilmiş
4. **Çoklu Dağıtım Seçenekleri**: Geliştirme, üretim, Docker, CDN
5. **Mobil Optimize**: Dokunmatik kontroller ve duyarlı tasarım
6. **Gerçek Zamanlı Performans**: Düşük gecikme ile 60 FPS animasyonlar
7. **Genişletilebilir Mimari**: Kolay özelleştirme için modüler bileşenler
8. **Üretime Hazır**: Hata işleme ve kullanıcı rehberliği ile eksiksiz

## 🎮 Kullanıma Hazır

**Anında test için**: Tarayıcınızda `demo.html` dosyasını açın  
**Geliştirme için**: `npm install && npm run dev` komutunu çalıştırın  
**Üretim için**: Docker dağıtımı veya derleme sürecini kullanın  
**Mobil için**: Başlangıç akışından QR kod kurulumunu kullanın  

**Yarışmaya hazır! Demo Modu ile başlayın ve tüm özellikleri keşfedin!** 🏁

---

**Herşeyi anında görmek için demo.html dosyası ile başlayın!** 🏁