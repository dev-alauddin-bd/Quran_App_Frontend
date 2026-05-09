'use client'

import { useState, useRef, useEffect } from 'react'
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react'

interface AudioPlayerProps {
  surahNumber: number
  ayahNumber?: number | null
  totalAyahs?: number
  onAyahChange?: (ayahNumber: number) => void
  onEnded?: () => void
}

export function AudioPlayer({ surahNumber, ayahNumber: externalAyahNumber, totalAyahs = 0, onAyahChange, onEnded }: AudioPlayerProps) {
  const [internalAyahNumber, setInternalAyahNumber] = useState<number>(1)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const audioRef = useRef<HTMLAudioElement>(null)

  const pad = (num: number) => num.toString().padStart(3, '0')

  // Determine which ayah to play
  const currentAyah = externalAyahNumber || internalAyahNumber
  
  const audioUrl = `https://everyayah.com/data/Alafasy_64kbps/${pad(surahNumber)}${pad(currentAyah)}.mp3`

  useEffect(() => {
    if (externalAyahNumber) {
      setInternalAyahNumber(externalAyahNumber)
      setIsPlaying(true)
    }
  }, [externalAyahNumber])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      // Small timeout to ensure the src change has been processed by the browser
      const playTimeout = setTimeout(() => {
        audio.play().catch(err => {
          if (err.name !== 'AbortError') {
            console.error('Audio play error:', err)
          }
        })
      }, 50)
      return () => clearTimeout(playTimeout)
    } else {
      audio.pause()
    }
  }, [currentAyah, isPlaying])

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime)
    }
  }

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration)
    }
  }

  const handleEnded = () => {
    if (currentAyah < totalAyahs) {
      // Play next ayah
      const nextAyah = currentAyah + 1
      setInternalAyahNumber(nextAyah)
      onAyahChange?.(nextAyah)
      setIsPlaying(true)
    } else {
      setIsPlaying(false)
      onEnded?.()
    }
  }

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value)
    setCurrentTime(newTime)
    if (audioRef.current) {
      audioRef.current.currentTime = newTime
    }
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value)
    setVolume(newVolume)
    if (audioRef.current) {
      audioRef.current.volume = newVolume
    }
  }

  const formatTime = (time: number) => {
    if (!time || isNaN(time)) return '0:00'
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  return (
    <div className="bg-card border border-border p-6 rounded-2xl">
      <audio
        ref={audioRef}
        src={audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
        crossOrigin="anonymous"
      />

      <div className="flex flex-col md:flex-row items-center gap-6">
        <button
          onClick={handlePlayPause}
          className="w-14 h-14 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground flex items-center justify-center transition-all flex-shrink-0"
        >
          {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" className="ml-1" />}
        </button>

        <div className="flex-1 w-full space-y-2">
          <div className="flex justify-between text-[10px] font-black text-foreground/40 uppercase tracking-widest">
            <span>{currentAyah ? `Ayah ${currentAyah}` : 'Surah Recitation'}</span>
            <span>{formatTime(currentTime)} / {formatTime(duration)}</span>
          </div>
          <div className="relative h-1.5 w-full bg-muted rounded-full overflow-hidden">
            <input
              type="range"
              min="0"
              max={duration || 0}
              value={currentTime}
              onChange={handleProgressChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />
            <div 
              className="absolute left-0 top-0 h-full bg-primary transition-all duration-100" 
              style={{ width: `${(currentTime / (duration || 1)) * 100}%` }}
            />
          </div>
        </div>

        <div className="flex items-center gap-3 bg-muted px-4 py-2 rounded-xl border border-border">
          <Volume2 size={18} className="text-foreground/40" />
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={handleVolumeChange}
            className="w-20 h-1 bg-foreground/10 rounded-lg appearance-none cursor-pointer accent-foreground/40"
          />
        </div>
      </div>
    </div>
  )
}
