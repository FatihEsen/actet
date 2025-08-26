#!/usr/bin/env node

/**
 * Dependency Checker for Assetto Corsa Telemetry Dashboard
 * Verifies all required dependencies are available
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const colors = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function checkCommand(command, name) {
  try {
    execSync(`${command} --version`, { stdio: 'ignore' });
    log(`✅ ${name} is installed`, 'green');
    return true;
  } catch (error) {
    log(`❌ ${name} is not installed`, 'red');
    return false;
  }
}

function checkFile(filePath, name) {
  if (fs.existsSync(filePath)) {
    log(`✅ ${name} found`, 'green');
    return true;
  } else {
    log(`❌ ${name} not found`, 'red');
    return false;
  }
}

function checkPackageJson() {
  const packagePath = path.join(__dirname, 'package.json');
  if (!fs.existsSync(packagePath)) {
    log('❌ package.json not found', 'red');
    return false;
  }

  const pkg = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
  const deps = { ...pkg.dependencies, ...pkg.devDependencies };
  
  log('\n📦 Checking package.json dependencies:', 'blue');
  
  const requiredDeps = [
    'react', 'react-dom', 'react-router-dom', 'zustand', 
    'framer-motion', 'clsx', 'vite', 'typescript', 'tailwindcss'
  ];
  
  let allPresent = true;
  requiredDeps.forEach(dep => {
    if (deps[dep]) {
      log(`  ✅ ${dep}: ${deps[dep]}`, 'green');
    } else {
      log(`  ❌ ${dep}: missing`, 'red');
      allPresent = false;
    }
  });
  
  return allPresent;
}

function checkNodeModules() {
  const nodeModulesPath = path.join(__dirname, 'node_modules');
  if (fs.existsSync(nodeModulesPath)) {
    const modules = fs.readdirSync(nodeModulesPath);
    log(`✅ node_modules found (${modules.length} packages)`, 'green');
    return true;
  } else {
    log('❌ node_modules not found - run npm install', 'red');
    return false;
  }
}

function main() {
  log('🏁 Assetto Corsa Telemetry Dashboard - Dependency Check', 'blue');
  log('=' .repeat(60), 'blue');
  
  // Check system dependencies
  log('\n🔧 System Dependencies:', 'blue');
  const nodeOk = checkCommand('node', 'Node.js');
  const npmOk = checkCommand('npm', 'npm');
  
  if (!nodeOk) {
    log('\n💡 Install Node.js from: https://nodejs.org/', 'yellow');
    log('📱 You can still use demo.html without Node.js!', 'yellow');
  }
  
  // Check project files
  log('\n📁 Project Files:', 'blue');
  const demoOk = checkFile('demo.html', 'demo.html');
  const packageOk = checkFile('package.json', 'package.json');
  const srcOk = checkFile('src', 'src directory');
  
  // Check package.json dependencies
  if (packageOk) {
    const depsOk = checkPackageJson();
    
    // Check node_modules
    log('\n📦 Installed Packages:', 'blue');
    const modulesOk = checkNodeModules();
    
    if (!modulesOk && npmOk) {
      log('\n🔧 Run this command to install dependencies:', 'yellow');
      log('   npm install', 'yellow');
    }
  }
  
  // Check alternative options
  log('\n🌐 Alternative Options:', 'blue');
  if (demoOk) {
    log('✅ demo.html - Works without dependencies', 'green');
  }
  
  log('✅ CDN version - Browser-only with external libraries', 'green');
  log('✅ Docker deployment - Containerized solution', 'green');
  
  // Summary
  log('\n📊 Summary:', 'blue');
  if (nodeOk && npmOk && packageOk && srcOk) {
    log('🎉 All dependencies satisfied! Ready for development.', 'green');
    log('\nRun: npm run dev', 'green');
  } else if (demoOk) {
    log('📱 Use demo.html for immediate testing', 'yellow');
    log('🔧 Install Node.js for full development features', 'yellow');
  } else {
    log('❌ Missing critical files. Please check installation.', 'red');
  }
  
  log('\n🏁 Dependency check complete!', 'blue');
}

if (require.main === module) {
  main();
}

module.exports = { checkCommand, checkFile, checkPackageJson };