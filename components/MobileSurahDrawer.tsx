'use client'

import { useState, useMemo } from 'react'
import { Search, X } from 'lucide-react'

interface Surah {
  number: number
  name: string
  englishName: string
  englishNameTranslation: string
  numberOfAyahs: number
  revelationType: 'Meccan' | 'Medinan'
}

interface MobileSurahDrawerProps {
  surahs: Surah[]
  selectedSurah: number
  onSurahSelect: (surahNumber: number) => void
  isOpen: boolean
  onClose: () => void
}

export function MobileSurahDrawer({
  surahs,
  selectedSurah,
  onSurahSelect,
  isOpen,
  onClose,
}: MobileSurahDrawerProps) {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredSurahs = useMemo(() => {
    if (!searchQuery) return surahs

    const query = searchQuery.toLowerCase()
    return surahs.filter(
      surah =>
        surah.name.includes(query) ||
        surah.englishName.toLowerCase().includes(query) ||
        surah.number.toString().includes(query)
    )
  }, [surahs, searchQuery])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] animate-in fade-in duration-300">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-background/60 backdrop-blur-sm" onClick={onClose} />

      {/* Drawer */}
      <div className="absolute left-0 top-0 h-full w-[85%] max-w-sm bg-card border-r border-border flex flex-col overflow-hidden animate-in slide-in-from-left duration-500 shadow-2xl">
        {/* Header */}
        <div className="p-6 border-b border-border flex items-center justify-between bg-card/80 backdrop-blur-md">
          <h2 className="text-xl font-bold text-foreground tracking-tight">Al-Quran</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-xl text-secondary transition-all"
          >
            <X size={22} />
          </button>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-border">
          <div className="relative group">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary group-focus-within:text-primary transition-colors" />
            <input
              type="text"
              placeholder="Search for a Surah..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-3 py-2.5 bg-background border border-border rounded-xl text-sm text-foreground placeholder:text-secondary/60 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all shadow-sm"
            />
          </div>
        </div>

        {/* Surahs List */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-2">
          {filteredSurahs.map(surah => (
            <button
              key={surah.number}
              onClick={() => {
                onSurahSelect(surah.number)
                onClose()
              }}
              className={`w-full text-left px-4 py-4 flex items-center gap-4 rounded-2xl transition-all ${
                selectedSurah === surah.number 
                  ? 'bg-primary/10 text-primary' 
                  : 'hover:bg-muted/40'
              }`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs transition-all ${
                selectedSurah === surah.number 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-muted text-secondary'
              }`}>
                {surah.number}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-0.5">
                  <h3 className="font-bold text-sm truncate">{surah.englishName}</h3>
                  <span className="font-arabic text-lg text-primary/80">{surah.name}</span>
                </div>
                <p className="text-[10px] text-secondary/70 uppercase tracking-wider font-semibold">
                  {surah.numberOfAyahs} Ayahs • {surah.revelationType}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
