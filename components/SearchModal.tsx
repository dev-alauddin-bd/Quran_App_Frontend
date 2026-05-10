'use client'

import { useState, useEffect } from 'react'
import { Search, X, BookOpen, ChevronRight } from 'lucide-react'

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
  onSurahSelect: (surahNumber: number) => void
}

export function SearchModal({ isOpen, onClose, onSurahSelect }: SearchModalProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [results, setResults] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!searchQuery || searchQuery.length < 2) {
      setResults([])
      return
    }

    const timer = setTimeout(async () => {
      setLoading(true)
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'
        const response = await fetch(`${apiUrl}/api/search?q=${encodeURIComponent(searchQuery)}`)
        if (response.ok) {
          const data = await response.json()
          setResults(data)
        }
      } catch (err) {
        console.error('Search error:', err)
      } finally {
        setLoading(false)
      }
    }, 300)

    return () => clearTimeout(timer)
  }, [searchQuery])

  if (!isOpen) return null

  const handleSelect = (surahId: number) => {
    onSurahSelect(surahId)
    onClose()
    setSearchQuery('')
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[12vh] px-4">
      <div className="absolute inset-0 bg-background/80" onClick={onClose} />
      
      <div className="relative w-full max-w-3xl bg-card border border-border rounded-[24px] overflow-hidden flex flex-col max-h-[75vh]">
        {/* Search Header */}
        <div className="p-8 border-b border-border flex items-center gap-6 relative bg-background">
          <Search size={28} className="text-primary" />
          <input
            type="text"
            placeholder="Search the Noble Quran..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            autoFocus
            className="flex-1 bg-transparent text-2xl font-black text-foreground placeholder:text-foreground/20 outline-none"
          />
          <div className="flex items-center gap-3">
             {loading && <div className="w-6 h-6 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />}
             <button onClick={onClose} className="w-12 h-12 flex items-center justify-center hover:bg-muted rounded-xl text-foreground/40 hover:text-foreground transition-all">
                <X size={24} />
             </button>
          </div>
        </div>

        {/* Results Area */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-8 bg-card">
          {results.length > 0 ? (
            <div className="space-y-4">
              <div className="text-[10px] text-foreground/40 font-black uppercase tracking-[0.3em] px-4 mb-6 flex justify-between items-center">
                <span>FOUND {results.length} RESULTS</span>
                <div className="h-px flex-1 mx-6 bg-border" />
              </div>
              {results.map((result, idx) => (
                <button
                  key={`${result.surahId}-${result.verseNumber}-${idx}`}
                  onClick={() => handleSelect(result.surahId)}
                  className="w-full text-left p-8 bg-background hover:bg-muted rounded-2xl transition-all duration-300 border border-border hover:border-primary group flex flex-col gap-6"
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-xl bg-primary text-primary-foreground flex flex-col items-center justify-center transition-all duration-300 shadow-sm">
                        <span className="text-[9px] font-black uppercase opacity-80">Ayah</span>
                        <span className="text-xl font-black">{result.surahId}:{result.verseNumber}</span>
                      </div>
                      <div>
                        <h3 className="font-black text-lg text-foreground group-hover:text-primary transition-all duration-300">{result.transliteration}</h3>
                        <p className="text-[10px] text-foreground/40 font-bold uppercase tracking-widest mt-1">Surah {result.surahId}</p>
                      </div>
                    </div>
                    <span className="font-arabic text-3xl text-foreground/20 group-hover:text-foreground transition-all duration-300">{result.surahName}</span>
                  </div>
                  
                  <div className="text-right font-arabic text-3xl text-foreground leading-[2]" dir="rtl">
                    {result.text}
                  </div>
                  
                  <div className="text-sm text-foreground/70 leading-relaxed italic border-l-2 border-primary pl-6 py-1">
                    "{result.translation}"
                  </div>
                </button>
              ))}
            </div>
          ) : searchQuery.length >= 2 && !loading ? (
            <div className="py-24 text-center">
               <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-8">
                  <Search size={40} className="text-foreground/20" />
               </div>
               <h3 className="text-2xl font-black text-foreground tracking-tighter uppercase mb-2">No matches found</h3>
               <p className="text-foreground/40 text-sm font-bold tracking-tight">Try different keywords or surah numbers</p>
            </div>
          ) : !loading && (
            <div className="py-24 text-center">
               <div className="w-32 h-32 bg-primary/10 rounded-[32px] flex items-center justify-center mx-auto mb-10">
                  <BookOpen size={64} className="text-primary" />
               </div>
               <h3 className="text-3xl font-black text-foreground tracking-tighter uppercase mb-4">Search Quran</h3>
               <p className="text-foreground/40 text-sm font-bold tracking-tight max-w-xs mx-auto italic leading-loose">
                  "Read! And your Lord is the Most Generous. Who taught by the pen..."
               </p>
            </div>
          )}
        </div>
        
        {/* Footer info */}
        <div className="p-6 bg-muted border-t border-border flex justify-center gap-10">
           <div className="flex items-center gap-3 text-[10px] font-black text-foreground/40 uppercase tracking-widest">
              <span className="px-2 py-1 bg-background rounded-md text-[8px] text-foreground border border-border">ESC</span> TO CLOSE
           </div>
           <div className="flex items-center gap-3 text-[10px] font-black text-foreground/40 uppercase tracking-widest">
              <span className="px-2 py-1 bg-background rounded-md text-[8px] text-foreground border border-border">ENTER</span> TO OPEN
           </div>
        </div>
      </div>
    </div>
  )
}
