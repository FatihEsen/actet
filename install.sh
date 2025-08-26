#!/bin/bash
# Installation script for Assetto Corsa Telemetry Dashboard

echo "🏁 Setting up Assetto Corsa Telemetry Dashboard..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found. Please install Node.js from https://nodejs.org/"
    echo "📱 You can still use the demo.html file without Node.js!"
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm not found. Please install npm"
    exit 1
fi

echo "✅ Node.js and npm found"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully"
else
    echo "❌ Failed to install dependencies"
    echo "💡 Try using demo.html for immediate testing"
    exit 1
fi

# Start development server
echo "🚀 Starting development server..."
npm run dev

echo "✅ Setup complete! Your telemetry dashboard is ready!"
echo "📱 Open demo.html for instant demo without dependencies"
echo "🌐 Access the full app at http://localhost:3000"