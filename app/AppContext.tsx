'use client'

import React, { createContext, useContext, useState } from 'react'

interface AppContextType {
  showSettings: boolean
  setShowSettings: (show: boolean) => void
  showSearch: boolean
  setShowSearch: (show: boolean) => void
  showSurahList: boolean
  setShowSurahList: (show: boolean) => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [showSettings, setShowSettings] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const [showSurahList, setShowSurahList] = useState(false)

  return (
    <AppContext.Provider value={{ 
      showSettings, setShowSettings, 
      showSearch, setShowSearch, 
      showSurahList, setShowSurahList 
    }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}
