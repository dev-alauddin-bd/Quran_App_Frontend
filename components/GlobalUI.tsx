'use client'

import React from 'react'
import { TopHeader } from './TopHeader'
import { SearchModal } from './SearchModal'
import { MobileSurahDrawer } from './MobileSurahDrawer'
import { useApp } from '@/app/AppContext'
import { useQuranData } from '@/hooks/useQuranData'
import { useMobileView } from '@/hooks/useMobileView'
import { usePathname, useRouter } from 'next/navigation'

export function GlobalUI({ children }: { children: React.ReactNode }) {
  const { 
    showSettings, setShowSettings, 
    showSearch, setShowSearch, 
    showSurahList, setShowSurahList 
  } = useApp()
  const { surahs } = useQuranData()
  const isMobile = useMobileView()
  const pathname = usePathname()
  const router = useRouter()

  const isReader = pathname.startsWith('/surah/')
  const currentView = isReader ? 'reader' : 'home'

  const handleSurahSelect = (id: number) => {
    router.push(`/surah/${id}`)
    setShowSearch(false)
    setShowSurahList(false)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="sticky top-0 z-[100]">
        <TopHeader
          onSearchClick={() => setShowSearch(true)}
          onSettingsClick={() => setShowSettings(!showSettings)}
          onMenuClick={() => setShowSurahList(true)}
          onHomeClick={() => router.push('/')}
          onQuranClick={() => router.push('/surah/1')}
          currentView={currentView}
        />
      </div>
      
      <main className="flex-1 flex flex-col">
        {children}
      </main>

      <SearchModal
        isOpen={showSearch}
        onClose={() => setShowSearch(false)}
        onSurahSelect={handleSurahSelect}
      />

      {isMobile && (
        <MobileSurahDrawer
          surahs={surahs}
          selectedSurah={1} // We could track this in context if needed
          onSurahSelect={handleSurahSelect}
          isOpen={showSurahList}
          onClose={() => setShowSurahList(false)}
        />
      )}
    </div>
  )
}
