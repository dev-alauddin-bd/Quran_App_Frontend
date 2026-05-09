'use client'

import { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight, Settings, Play, Menu } from 'lucide-react'
import { useQuranData, useSurahAyahs } from '@/hooks/useQuranData'
import { useFontSettings } from '@/hooks/useFontSettings'
import { AyahDisplay } from './AyahDisplay'
import { FontSettingsPanel } from './FontSettingsPanel'
import { AudioPlayer } from './AudioPlayer'
import { ReaderFooter } from './ReaderFooter'

interface QuranReaderProps {
  selectedSurah: number
  onSurahChange: (surahNumber: number) => void
  showFontSettings?: boolean
  onCloseFontSettings?: () => void
  isMobile?: boolean
  viewMode?: 'reading' | 'translation'
  onViewModeChange?: (mode: 'reading' | 'translation') => void
}

export function QuranReader({
  selectedSurah,
  onSurahChange,
  showFontSettings: externalShowSettings,
  onCloseFontSettings,
  isMobile = false,
  viewMode: externalViewMode,
  onViewModeChange: externalOnViewModeChange,
}: QuranReaderProps) {
  const [internalViewMode, setInternalViewMode] = useState<'reading' | 'translation'>('translation')
  const viewMode = externalViewMode ?? internalViewMode
  const setViewMode = externalOnViewModeChange ?? setInternalViewMode

  const { loading: surahsLoading } = useQuranData()
  const { ayahs, translationTexts, surahInfo, loading: ayahsLoading } = useSurahAyahs(selectedSurah)
  const { settings, updateFont, updateArabicSize, updateTranslationSize, mounted } = useFontSettings()
  const [showFontSettings, setShowFontSettings] = useState(externalShowSettings ?? false)
  const [currentPlayingAyah, setCurrentPlayingAyah] = useState<number | null>(null)

  // Sync external settings state
  const isOpen = externalShowSettings ?? showFontSettings

  // Track Last Read
  useEffect(() => {
    if (surahInfo) {
      const lastReads = JSON.parse(localStorage.getItem('quran-last-reads') || '[]')
      const newRead = {
        id: selectedSurah,
        name: surahInfo.transliteration,
        time: new Date().toISOString(),
        ayah: 1 // Default to 1 for now
      }

      // Filter out existing entries for the same surah and add new one at top
      const updated = [newRead, ...lastReads.filter((r: any) => r.id !== selectedSurah)].slice(0, 5)
      localStorage.setItem('quran-last-reads', JSON.stringify(updated))
    }
  }, [selectedSurah, surahInfo])

  const previousSurah = selectedSurah > 1 ? selectedSurah - 1 : null
  const nextSurah = selectedSurah < 114 ? selectedSurah + 1 : null

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const handleBookmark = (ayahNumber: number) => {
    console.log('Bookmarked ayah:', ayahNumber)
  }

  const handlePlayAyah = (ayahNumber: number) => {
    if (currentPlayingAyah === ayahNumber) {
      setCurrentPlayingAyah(null)
    } else {
      setCurrentPlayingAyah(ayahNumber)
    }
  }

  const handleCloseFontSettings = () => {
    onCloseFontSettings?.()
    setShowFontSettings(false)
  }

  if (!mounted) {
    return (
      <div className="flex-1 flex items-center justify-center bg-background">
        <div className="animate-pulse text-primary font-bold text-xl">QM</div>
      </div>
    )
  }


  return (
    <>
      <div className={`flex-1 min-h-screen transition-all duration-500 ${viewMode === 'reading' ? 'bg-card/5' : 'bg-background'
        }`}>
        {/* Sub-Header - Surah Info */}
        <div className="sticky top-0 z-20 bg-background/80 backdrop-blur-md border-b border-border px-4 md:px-12 py-4 flex items-center justify-between transition-all duration-500">
          <div className="flex items-center gap-4 md:gap-8 w-full">
            {surahInfo && (
              <div className={`flex items-center w-full ${viewMode === 'reading' ? 'justify-center' : 'justify-between'}`}>
                <div className={`flex flex-col ${viewMode === 'reading' ? 'items-center' : ''}`}>
                  <div className="flex items-center gap-3">
                    <h2 className={`font-display font-bold text-foreground leading-none tracking-tight transition-all duration-500 ${viewMode === 'reading' ? 'text-2xl md:text-3xl uppercase tracking-[0.2em]' : 'text-lg md:text-xl'
                      }`}>
                      {surahInfo.transliteration}
                    </h2>
                    {viewMode !== 'reading' && (
                      <div className="px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest bg-muted text-foreground/40 hidden sm:block">
                        Translation
                      </div>
                    )}
                  </div>
                  {viewMode !== 'reading' && (
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] text-primary font-bold uppercase tracking-[0.15em]">{surahInfo.type}</span>
                      <span className="w-1 h-1 rounded-full bg-border" />
                      <span className="text-[10px] text-foreground/40 font-semibold uppercase tracking-widest">{surahInfo.total_verses} Verses</span>
                    </div>
                  )}
                </div>

                {viewMode === 'reading' && (
                  <div className="absolute right-12 hidden lg:block">
                    <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em]">Reading Mode</span>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowFontSettings(true)}
              className="p-2.5 flex items-center justify-center bg-background hover:bg-muted rounded-xl text-foreground transition-all border border-border lg:hidden"
              title="Font Settings"
            >
              <Settings size={18} />
            </button>
          </div>
        </div>

        <div className={`mx-auto p-4 md:p-12 lg:p-20 pt-12 md:pt-24 transition-all duration-700 ${viewMode === 'reading' ? 'max-w-5xl' : 'max-w-3xl'
          }`}>
          {/* Surah Intro Section */}
          {surahInfo && (
            viewMode === 'reading' ? (
              <div className="mb-32 text-center animate-in fade-in slide-in-from-top-10 duration-1000">
                <div className="text-primary font-arabic text-6xl md:text-8xl mb-6 opacity-80">{surahInfo.name}</div>
                <h1 className="text-3xl md:text-5xl font-display font-black text-foreground mb-4 tracking-[0.2em] uppercase">{surahInfo.transliteration}</h1>
                <div className="flex items-center justify-center gap-4 mt-8">
                  <div className="h-px w-16 bg-border" />
                  <div className="text-[10px] font-black text-foreground/20 uppercase tracking-[0.4em]">The Holy Quran</div>
                  <div className="h-px w-16 bg-border" />
                </div>
              </div>
            ) : (
              <div className="mb-16 p-8 md:p-12 rounded-[32px] border bg-card border-border text-center relative overflow-hidden group">
                <div className="relative z-10">
                  <div className="text-primary font-arabic text-5xl mb-6">{surahInfo.name}</div>
                  <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4 tracking-tight uppercase leading-none">{surahInfo.transliteration}</h1>
                  <div className="text-foreground/40 text-xs font-serif italic mb-10 flex items-center justify-center gap-4">
                    <div className="h-px w-8 bg-border" />
                    {surahInfo.translation}
                    <div className="h-px w-8 bg-border" />
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 py-6 border-t border-border">
                    <div className="flex flex-col items-center p-3 bg-muted/50 rounded-xl">
                      <div className="text-[9px] text-foreground/40 uppercase font-bold tracking-widest mb-1">Surah No</div>
                      <div className="text-base font-display font-bold text-primary">{selectedSurah}</div>
                    </div>
                    <div className="flex flex-col items-center p-3 bg-muted/50 rounded-xl">
                      <div className="text-[9px] text-foreground/40 uppercase font-bold tracking-widest mb-1">Verses</div>
                      <div className="text-base font-display font-bold text-primary">{surahInfo.total_verses}</div>
                    </div>
                    <div className="flex flex-col items-center p-3 bg-muted/50 rounded-xl">
                      <div className="text-[9px] text-foreground/40 uppercase font-bold tracking-widest mb-1">Revelation</div>
                      <div className="text-base font-display font-bold text-primary capitalize">{surahInfo.type}</div>
                    </div>
                    <div className="flex flex-col items-center p-3 bg-primary text-primary-foreground rounded-xl cursor-pointer hover:bg-primary/90 transition-all group/play shadow-lg shadow-primary/20" onClick={() => setCurrentPlayingAyah(1)}>
                      <div className="text-[9px] uppercase font-bold tracking-widest mb-1">Listen</div>
                      <Play size={16} fill="currentColor" />
                    </div>
                  </div>
                </div>
              </div>
            )
          )}

          {/* Basmala */}
          {selectedSurah !== 1 && selectedSurah !== 9 && (
            <div className="text-center mb-16">
              <div className={`font-arabic mb-6 text-foreground transition-all duration-500 ${viewMode === 'reading' ? 'text-6xl' : 'text-4xl md:text-5xl'
                }`}>
                بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
              </div>
              <div className="flex items-center justify-center gap-3">
                <div className="h-px w-12 bg-border" />
                <div className="w-1.5 h-1.5 rounded-full bg-primary/40" />
                <div className="h-px w-12 bg-border" />
              </div>
            </div>
          )}

          {/* Top Quick Navigation (Reading Mode Only) */}
          {viewMode === 'reading' && (
            <div className="flex justify-between items-center mb-12 px-4">
              {previousSurah ? (
                <button
                  onClick={() => onSurahChange(previousSurah)}
                  className="group flex items-center gap-2 text-[9px] font-black text-foreground/40 hover:text-primary uppercase tracking-[0.2em] transition-all"
                >
                  <ChevronLeft size={14} />
                  Surah {previousSurah}
                </button>
              ) : <div />}

              <div className="text-[9px] font-black text-primary uppercase tracking-[0.3em] opacity-40">Section {Math.ceil(selectedSurah / 10)}</div>

              {nextSurah ? (
                <button
                  onClick={() => onSurahChange(nextSurah)}
                  className="group flex items-center gap-2 text-[9px] font-black text-foreground/40 hover:text-primary uppercase tracking-[0.2em] transition-all"
                >
                  Surah {nextSurah}
                  <ChevronRight size={14} />
                </button>
              ) : <div />}
            </div>
          )}

          {/* Ayahs Container */}
          {ayahsLoading ? (
            <div className="space-y-8 animate-pulse">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-32 bg-muted/40 rounded-3xl" />
              ))}
            </div>
          ) : (
            <div className={`transition-all duration-700 ${viewMode === 'reading'
              ? 'flex flex-wrap justify-center gap-x-4 gap-y-10 leading-[3.5] text-center px-4 md:px-0'
              : 'space-y-8 pb-24'
              }`}>
              {ayahs.map(ayah => (
                <AyahDisplay
                  key={ayah.number}
                  ayah={ayah}
                  translation={translationTexts[ayah.number]}
                  fontSettings={settings}
                  isPlaying={currentPlayingAyah === ayah.number}
                  hideTranslation={viewMode === 'reading'}
                  viewMode={viewMode}
                  onPlay={handlePlayAyah}
                  onCopy={handleCopy}
                  onBookmark={handleBookmark}
                />
              ))}
            </div>
          )}

          {/* Bottom Navigation */}
          <div className="mt-20 pt-12 border-t border-border flex flex-col md:flex-row gap-4 items-center justify-between pb-24">
            {previousSurah ? (
              <button
                onClick={() => onSurahChange(previousSurah)}
                className="w-full md:w-auto flex items-center gap-4 p-4 md:p-6 bg-card border border-border hover:border-primary rounded-2xl transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                  <ChevronLeft size={20} />
                </div>
                <div className="text-left">
                  <div className="text-[9px] text-foreground/40 font-black uppercase tracking-widest mb-0.5">Previous</div>
                  <div className="text-sm font-black text-foreground">Surah {previousSurah}</div>
                </div>
              </button>
            ) : <div className="hidden md:block w-48" />}

            <div className="bg-primary/10 text-primary px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em]">
              Surah {selectedSurah} of 114
            </div>

            {nextSurah ? (
              <button
                onClick={() => onSurahChange(nextSurah)}
                className="w-full md:w-auto flex items-center gap-4 p-4 md:p-6 bg-card border border-border hover:border-primary rounded-2xl transition-all group text-right"
              >
                <div className="text-right">
                  <div className="text-[9px] text-foreground/40 font-black uppercase tracking-widest mb-0.5">Next</div>
                  <div className="text-sm font-black text-foreground">Surah {nextSurah}</div>
                </div>
                <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                  <ChevronRight size={20} />
                </div>
              </button>
            ) : <div className="hidden md:block w-48" />}
          </div>
        </div>
      </div>

      {/* Sticky Audio Player */}
      <div className="fixed bottom-0 left-0 lg:left-[76px] right-0 z-50 p-4 pointer-events-none transition-all duration-500">
        <div className="max-w-4xl mx-auto pointer-events-auto">
          <AudioPlayer
            surahNumber={selectedSurah}
            ayahNumber={currentPlayingAyah}
            totalAyahs={surahInfo?.total_verses}
            onAyahChange={(ayah) => setCurrentPlayingAyah(ayah)}
            onEnded={() => setCurrentPlayingAyah(null)}
          />
        </div>
      </div>

    </>
  )
}
