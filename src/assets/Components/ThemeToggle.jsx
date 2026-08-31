import React from 'react'
import { FiMoon, FiSun } from 'react-icons/fi'
import { useTheme } from '../../theme/ThemeProvider'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-heading transition hover:border-accent hover:text-accent"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? <FiSun size={16} /> : <FiMoon size={16} />}
    </button>
  )
}
