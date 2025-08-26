import React from 'react'
import { Link, useLocation } from 'react-router-dom'

export const Navigation: React.FC = () => {
  const location = useLocation()
  
  const navItems = [
    { path: '/', label: 'Dashboard', icon: '📊' },
    { path: '/settings', label: 'Settings', icon: '⚙️' },
    { path: '/setup', label: 'Setup', icon: '🔧' }
  ]
  
  return (
    <nav className="flex space-x-1">
      {navItems.map(({ path, label, icon }) => (
        <Link
          key={path}
          to={path}
          className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center space-x-2 ${
            location.pathname === path
              ? 'bg-neon-blue text-racing-dark'
              : 'text-silver hover:bg-carbon-light hover:text-neon-blue'
          }`}
        >
          <span>{icon}</span>
          <span className="hidden sm:inline">{label}</span>
        </Link>
      ))}
    </nav>
  )
}