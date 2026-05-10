"use client"
import { Settings, Palette } from 'lucide-react'
import { FontSettings, ArabicFont } from '@/hooks/useFontSettings'

import { useEffect, useState } from 'react'
import { useTheme } from '@/components/theme-provider'

interface FontSettingsPanelProps {
  settings: FontSettings
  onFontChange: (font: ArabicFont) => void
  onArabicSizeChange: (size: number) => void
  onTranslationSizeChange: (size: number) => void
  viewMode: 'reading' | 'translation'
  onViewModeChange: (mode: 'reading' | 'translation') => void
  isOpen: boolean
  onClose: () => void
}

const fonts: { value: ArabicFont; label: string }[] = [
  { value: 'kfgq', label: 'KFGQ' },
  { value: 'amiri', label: 'Amiri' },
  { value: 'scheherazade', label: 'Scheherazade' },
]

const themes = [
  { value: 'light', label: 'Light', color: 'bg-white border-gray-200' },
  { value: 'dark', label: 'Dark', color: 'bg-[#0f0f0f] border-gray-800' },
] as const

export function FontSettingsPanel({
  settings,
  onFontChange,
  onArabicSizeChange,
  onTranslationSizeChange,
  viewMode,
  onViewModeChange,
  isOpen,
  onClose,
}: FontSettingsPanelProps) {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const [activeTab, setActiveTab] = useState<'translation' | 'reading'>(viewMode === 'reading' ? 'reading' : 'translation')

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (viewMode === 'reading') setActiveTab('reading')
    else if (activeTab === 'reading') setActiveTab('translation')
  }, [viewMode])

  const handleTabChange = (tab: 'translation' | 'reading') => {
    setActiveTab(tab)
    if (tab === 'reading') onViewModeChange('reading')
    else onViewModeChange('translation')
  }

  if (!mounted) return null

  const content = (
    <div className="flex flex-col h-full bg-card">
      {/* Tabs at the very top with dynamic slider */}
      <div className="p-6 border-b border-border bg-background">
        <div className="relative flex p-1 bg-muted rounded-xl">
          {/* Sliding Background */}
          <div
            className="absolute top-1 bottom-1 bg-background rounded-lg shadow-sm transition-all duration-300 ease-out"
            style={{
              left: activeTab === 'translation' ? '4px' : '50%',
              width: 'calc(50% - 4px)'
            }}
          />

          <button
            onClick={() => handleTabChange('translation')}
            className={`relative z-10 flex-1 py-2.5 rounded-lg text-xs font-bold transition-all ${activeTab === 'translation' ? 'text-primary' : 'text-foreground/40 hover:text-foreground'}`}
          >
            Translation
          </button>
          <button
            onClick={() => handleTabChange('reading')}
            className={`relative z-10 flex-1 py-2.5 rounded-lg text-xs font-bold transition-all ${activeTab === 'reading' ? 'text-primary' : 'text-foreground/40 hover:text-foreground'}`}
          >
            Reading
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-8 space-y-10 bg-background" data-lenis-prevent>

        {activeTab === 'translation' && (
          <>
            {/* Theme Selection */}
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <label className="text-[10px] font-black text-foreground/40 uppercase tracking-[0.2em] flex items-center gap-3">
                  <Palette size={14} className="text-primary" />
                  Appearance Theme
                </label>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {themes.map(t => (
                  <button
                    key={t.value}
                    onClick={() => setTheme(t.value)}
                    className={`group flex items-center gap-3 p-3 rounded-xl border transition-all ${theme === t.value
                        ? 'bg-primary/5 border-primary ring-1 ring-primary/20'
                        : 'bg-card border-border hover:border-primary/30 hover:bg-muted/30'
                      }`}
                  >
                    <div className={`w-6 h-6 rounded-full border border-border shadow-inner ${t.color}`} />
                    <span className={`text-[10px] font-bold uppercase tracking-wider ${theme === t.value ? 'text-primary' : 'text-foreground/60'
                      }`}>
                      {t.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Font Selection */}
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <label className="text-[10px] font-black text-foreground/40 uppercase tracking-[0.2em]">Arabic Font</label>
              </div>
              <div className="grid grid-cols-1 gap-2">
                {fonts.map(font => (
                  <button
                    key={font.value}
                    onClick={() => onFontChange(font.value)}
                    className={`w-full py-4 px-4 rounded-xl text-xs font-bold transition-all border text-left flex justify-between items-center ${settings.arabicFont === font.value
                      ? 'bg-primary/5 text-primary border-primary'
                      : 'bg-card border-border/50 text-foreground/60 hover:border-border hover:text-foreground'
                      }`}
                  >
                    <span>{font.label}</span>
                    {settings.arabicFont === font.value && <div className="w-1.5 h-1.5 rounded-full bg-primary" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Arabic Font Size */}
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <label className="text-[10px] font-black text-foreground/40 uppercase tracking-[0.2em]">Arabic Size</label>
                <span className="text-xs font-bold text-primary font-display">{settings.arabicSize}px</span>
              </div>
              <input
                type="range"
                min="20"
                max="80"
                value={settings.arabicSize}
                onChange={e => onArabicSizeChange(parseInt(e.target.value))}
                className="w-full h-1 bg-muted rounded-full appearance-none cursor-pointer accent-primary"
              />
            </div>

            {/* Translation Font Size */}
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <label className="text-[10px] font-black text-foreground/40 uppercase tracking-[0.2em]">Translation Size</label>
                <span className="text-xs font-bold text-primary font-display">{settings.translationSize}px</span>
              </div>
              <input
                type="range"
                min="12"
                max="40"
                value={settings.translationSize}
                onChange={e => onTranslationSizeChange(parseInt(e.target.value))}
                className="w-full h-1 bg-muted rounded-full appearance-none cursor-pointer accent-primary"
              />
            </div>
          </>
        )}

        {activeTab === 'reading' && (
          <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <Settings size={32} />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-foreground">Reading Mode Active</h3>
              <p className="text-xs text-foreground/40 max-w-[200px]">
                Enjoy a pure Mushaf experience. Switch back to Translation tab for more settings.
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  )

  return (
    <div className={`relative h-full w-[320px] bg-card border-l border-border flex flex-col overflow-hidden transition-all duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full absolute right-0'}`}>
      {content}
    </div>
  )
}

