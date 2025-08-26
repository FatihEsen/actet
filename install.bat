@echo off
REM Installation script for Assetto Corsa Telemetry Dashboard (Windows)

echo 🏁 Setting up Assetto Corsa Telemetry Dashboard...

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js not found. Please install Node.js from https://nodejs.org/
    echo 📱 You can still use the demo.html file without Node.js!
    pause
    exit /b 1
)

REM Check if npm is installed
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ npm not found. Please install npm
    pause
    exit /b 1
)

echo ✅ Node.js and npm found

REM Install dependencies
echo 📦 Installing dependencies...
npm install

if %errorlevel% equ 0 (
    echo ✅ Dependencies installed successfully
) else (
    echo ❌ Failed to install dependencies
    echo 💡 Try using demo.html for immediate testing
    pause
    exit /b 1
)

REM Start development server
echo 🚀 Starting development server...
echo 📱 Open demo.html for instant demo without dependencies
echo 🌐 Full app will be available at http://localhost:3000
npm run dev

echo ✅ Setup complete! Your telemetry dashboard is ready!
pause