'use client'

import { useState, useMemo } from 'react'
import { Search } from 'lucide-react'

interface Surah {
  number: number
  name: string
  englishName: string
  englishNameTranslation: string
  numberOfAyahs: number
  revelationType: 'Meccan' | 'Medinan'
}

interface SurahSidebarProps {
  surahs: Surah[]
  selectedSurah: number
  onSurahSelect: (surahNumber: number) => void
}

export function SurahSidebar({ surahs, selectedSurah, onSurahSelect }: SurahSidebarProps) {
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

  return (
    <div className="relative h-full w-[340px] bg-card border-r border-border flex flex-col overflow-hidden transition-all duration-300">
      {/* Header */}
      <div className="p-8 border-b border-border bg-background">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-display font-bold text-foreground tracking-tight">SURAH</h1>
          <div className="bg-primary text-primary-foreground px-3 py-1 rounded-lg text-[9px] font-bold tracking-widest uppercase">
            {surahs.length} TOTAL
          </div>
        </div>
        <div className="relative group">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/40 group-focus-within:text-primary transition-all duration-300" />
          <input
            type="text"
            placeholder="Search by name or number..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-muted border-none rounded-xl text-sm font-bold text-foreground placeholder:text-foreground/40 focus:outline-none focus:bg-background focus:ring-0 transition-all duration-300"
          />
        </div>
      </div>

      {/* Surahs List */}
      <div className="flex-1 overflow-y-auto custom-scrollbar px-4 py-6 space-y-2 bg-background" data-lenis-prevent>
        {filteredSurahs.map(surah => (
          <button
            key={surah.number}
            onClick={() => onSurahSelect(surah.number)}
            className={`w-full text-left px-5 py-5 flex items-center gap-5 rounded-xl transition-all duration-300 group relative border ${
              selectedSurah === surah.number 
                ? 'bg-primary/5 border-primary/50' 
                : 'bg-card border-border/50 hover:border-border'
            }`}
          >
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center font-bold text-xs transition-all duration-300 ${
              selectedSurah === surah.number 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-muted text-foreground/40 group-hover:text-foreground'
            }`}>
              {surah.number}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-baseline mb-1">
                <h3 className={`font-display font-bold text-[15px] transition-all duration-300 truncate ${
                  selectedSurah === surah.number ? 'text-primary' : 'text-foreground/90 group-hover:text-foreground'
                }`}>
                  {surah.englishName}
                </h3>
                <span className={`font-arabic text-2xl leading-none transition-all duration-300 ${
                  selectedSurah === surah.number ? 'text-primary' : 'text-foreground/20 group-hover:text-foreground/50'
                }`}>
                  {surah.name}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <p className={`text-[9px] font-bold uppercase tracking-[0.2em] transition-all duration-300 ${
                  selectedSurah === surah.number ? 'text-primary/70' : 'text-foreground/40'
                }`}>
                  {surah.englishNameTranslation}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
