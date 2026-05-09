import { Copy, Bookmark, Play, Pause } from 'lucide-react'
import { FontSettings } from '@/hooks/useFontSettings'

interface Ayah {
  number: number
  text: string
  numberInSurah: number
}

interface AyahDisplayProps {
  ayah: Ayah
  translation?: string
  fontSettings: FontSettings
  isPlaying?: boolean
  hideTranslation?: boolean
  viewMode?: 'reading' | 'translation'
  onPlay?: (ayahNumber: number) => void
  onCopy?: (text: string) => void
  onBookmark?: (ayahNumber: number) => void
}

export function AyahDisplay({
  ayah,
  translation,
  fontSettings,
  isPlaying,
  hideTranslation,
  viewMode,
  onPlay,
  onCopy,
  onBookmark,
}: AyahDisplayProps) {
  // Map font settings to font family
  const fontFamilyMap = {
    kfgq: 'KFGQ',
    amiri: 'Amiri',
    scheherazade: 'Scheherazade',
  }

  const AyahFrame = ({ number }: { number: number }) => (
    <div className="relative w-12 h-12 flex items-center justify-center flex-shrink-0">
      <div className="absolute inset-0 bg-primary/20 rotate-45 rounded-sm" />
      <div className="absolute inset-0 bg-primary/20 rotate-0 rounded-sm" />
      <span className="relative z-10 font-bold text-xs text-primary">{number}</span>
    </div>
  )

  if (viewMode === 'reading') {
    return (
      <div className={`relative inline-block transition-all duration-700 cursor-pointer p-4 rounded-2xl hover:bg-primary/5 group ${
        isPlaying ? 'bg-primary/10 ring-1 ring-primary/20 scale-105' : ''
      }`}
      onClick={() => onPlay?.(ayah.number)}>
        <div 
          className="font-arabic antialiased text-foreground transition-all duration-700"
          style={{
            fontFamily: `${fontFamilyMap[fontSettings.arabicFont]}, serif`,
            fontSize: `${fontSettings.arabicSize + 12}px`,
            direction: 'rtl',
            lineHeight: '2.5'
          }}
        >
          {ayah.text}
          <span className="inline-flex items-center justify-center w-10 h-10 mx-4 border-2 border-primary/30 rounded-full text-[14px] font-bold text-primary align-middle font-display">
            {ayah.numberInSurah}
          </span>
        </div>
      </div>
    )
  }

  return (
    <div className={`p-6 md:p-8 mb-6 transition-all duration-700 rounded-3xl group relative border ${
      isPlaying ? 'bg-primary/5 border-primary/50' : 'bg-card border-border hover:border-primary/30'
    }`}>
      {/* Active Indicator Bar */}
      {isPlaying && (
        <div className="absolute left-4 top-8 bottom-8 w-1 bg-primary rounded-full" />
      )}

      {/* Ayah Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <AyahFrame number={ayah.numberInSurah} />
          <div className="h-px w-12 bg-border" />
        </div>

        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <button
            onClick={() => onPlay?.(ayah.number)}
            className={`w-10 h-10 flex items-center justify-center rounded-lg transition-all duration-300 ${
              isPlaying ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-primary text-foreground hover:text-primary-foreground'
            }`}
          >
            {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" className="ml-0.5" />}
          </button>
          <button
            onClick={() => onCopy?.(ayah.text)}
            className="w-10 h-10 flex items-center justify-center bg-muted hover:bg-primary/20 rounded-lg transition-all duration-300 text-foreground"
          >
            <Copy size={18} />
          </button>
          <button
            onClick={() => onBookmark?.(ayah.number)}
            className="w-10 h-10 flex items-center justify-center bg-muted hover:bg-primary/20 rounded-lg transition-all duration-300 text-foreground"
          >
            <Bookmark size={18} />
          </button>
        </div>
      </div>

      {/* Arabic Text */}
      <div
        className="text-right leading-[2.5] mb-8 font-arabic antialiased text-foreground"
        style={{
          fontFamily: `${fontFamilyMap[fontSettings.arabicFont]}, serif`,
          fontSize: `${fontSettings.arabicSize}px`,
          direction: 'rtl'
        }}
      >
        {ayah.text}
      </div>

      {/* Translation */}
      {translation && (
        <div
          className="text-foreground/80 leading-relaxed max-w-4xl border-l-2 border-primary/40 pl-6 py-1 font-serif italic"
          style={{ fontSize: `${fontSettings.translationSize}px` }}
        >
          {translation}
        </div>
      )}
    </div>
  )
}
