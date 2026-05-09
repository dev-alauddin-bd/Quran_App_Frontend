'use client'

import { useParams, useRouter } from 'next/navigation'
import { QuranReader } from '@/components/QuranReader'
import { useMobileView } from '@/hooks/useMobileView'
import { useEffect, useState } from 'react'
import { IconSidebar } from '@/components/IconSidebar'
import { SurahSidebar } from '@/components/SurahSidebar'
import { FontSettingsPanel } from '@/components/FontSettingsPanel'
import { useFontSettings } from '@/hooks/useFontSettings'
import { useQuranData } from '@/hooks/useQuranData'
import { useApp } from '@/app/AppContext'
import { SmoothScroll } from '@/components/SmoothScroll'

export default function SurahPage() {
  const params = useParams()
  const router = useRouter()
  const surahId = parseInt(params.id as string) || 1
  const isMobile = useMobileView()
  const [viewMode, setViewMode] = useState<'reading' | 'translation'>('translation')

  const {
    showSettings, setShowSettings,
    showSearch, setShowSearch,
    showSurahList, setShowSurahList
  } = useApp()

  const { surahs } = useQuranData()
  const { settings, updateFont, updateArabicSize, updateTranslationSize } = useFontSettings()

  useEffect(() => {
    if (!isMobile) setShowSettings(true)
  }, [isMobile, setShowSettings])

  const handleSurahChange = (id: number) => {
    router.push(`/surah/${id}`)
  }

  const handleSearchClick = () => setShowSearch(true)
  const handleSettingsClick = () => setShowSettings(!showSettings)
  const handleMenuClick = () => setShowSurahList(true)

  return (
    <div className="flex bg-background text-foreground relative min-h-screen">
      {/* Icon Sidebar - Leftmost permanent - Fixed */}
      {!isMobile && (
        <div className="fixed left-0 top-16 h-[calc(100vh-64px)] z-50">
          <IconSidebar
            onSearchClick={handleSearchClick}
            onMenuClick={handleMenuClick}
            onHomeClick={() => router.push('/')}
            onQuranClick={() => router.push('/surah/1')}
          />
        </div>
      )}

      <div className="flex-1 flex relative">
        {/* Left: Surah Sidebar - Fixed with offset */}
        {!isMobile && (
          <div className="fixed left-[76px] top-16 h-[calc(100vh-64px)] z-40 border-r border-border">
            <SurahSidebar
              surahs={surahs}
              selectedSurah={surahId}
              onSurahSelect={handleSurahChange}
            />
          </div>
        )}

        {/* Center: Actual View Content - With exact margins for fixed sidebars */}
        <div className={`flex-1 transition-all duration-300 ${
          !isMobile ? 'ml-[416px]' : ''
        } ${
          !isMobile && showSettings ? 'mr-[320px]' : ''
        }`}>
          <QuranReader
            selectedSurah={surahId}
            onSurahChange={handleSurahChange}
            isMobile={isMobile}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
          />
        </div>

        {/* Right: Font Settings Sidebar - Fixed */}
        {!isMobile && showSettings && (
          <div className="fixed right-0 top-16 h-[calc(100vh-64px)] z-40 border-l border-border">
            <FontSettingsPanel
              settings={settings}
              onFontChange={updateFont}
              onArabicSizeChange={updateArabicSize}
              onTranslationSizeChange={updateTranslationSize}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
              isOpen={showSettings}
              onClose={() => setShowSettings(false)}
            />
          </div>
        )}
      </div>

      {/* Mobile Settings Drawer Overlay */}
      {isMobile && showSettings && (
        <div className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setShowSettings(false)} />
          <div className="relative w-full max-w-md h-[80vh] sm:h-auto bg-card rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-2xl">
            <FontSettingsPanel
              settings={settings}
              onFontChange={updateFont}
              onArabicSizeChange={updateArabicSize}
              onTranslationSizeChange={updateTranslationSize}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
              isOpen={true}
              onClose={() => setShowSettings(false)}
            />
          </div>
        </div>
      )}
    </div>
  )
}
