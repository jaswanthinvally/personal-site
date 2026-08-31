import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'

const ThemeContext = createContext({
  theme: 'dark',
  toggleTheme: () => {},
})

function readTheme() {
  if (typeof document === 'undefined') {
    return 'dark'
  }
  return document.documentElement.getAttribute('data-theme') || 'dark'
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(readTheme)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const value = useMemo(
    () => ({
      theme,
      toggleTheme: () => setTheme((current) => (current === 'dark' ? 'light' : 'dark')),
    }),
    [theme]
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  return useContext(ThemeContext)
}
