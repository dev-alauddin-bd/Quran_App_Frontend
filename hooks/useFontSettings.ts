'use client'

import { useState, useEffect } from 'react'

export type ArabicFont = 'kfgq' | 'amiri' | 'scheherazade'

export interface FontSettings {
  arabicFont: ArabicFont
  arabicSize: number
  translationSize: number
}

const DEFAULT_SETTINGS: FontSettings = {
  arabicFont: 'kfgq',
  arabicSize: 46,
  translationSize: 16,
}

export function useFontSettings() {
  const [settings, setSettings] = useState<FontSettings>(DEFAULT_SETTINGS)
  const [mounted, setMounted] = useState(false)

  // Load from localStorage on mount
  useEffect(() => {
    setMounted(true)
    const stored = localStorage.getItem('quran-font-settings')
    if (stored) {
      try {
        setSettings(JSON.parse(stored))
      } catch (err) {
        console.error('[v0] Failed to parse font settings:', err)
      }
    }
  }, [])

  // Save to localStorage whenever settings change
  useEffect(() => {
    if (mounted) {
      localStorage.setItem('quran-font-settings', JSON.stringify(settings))
    }
  }, [settings, mounted])

  const updateFont = (font: ArabicFont) => {
    setSettings(prev => ({ ...prev, arabicFont: font }))
  }

  const updateArabicSize = (size: number) => {
    setSettings(prev => ({ ...prev, arabicSize: Math.max(20, Math.min(80, size)) }))
  }

  const updateTranslationSize = (size: number) => {
    setSettings(prev => ({ ...prev, translationSize: Math.max(12, Math.min(40, size)) }))
  }

  return {
    settings,
    updateFont,
    updateArabicSize,
    updateTranslationSize,
    mounted,
  }
}
