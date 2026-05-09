import { useState, useEffect } from 'react'

export interface Ayah {
  number: number
  text: string
  numberInSurah: number
  juz: number
  manzil: number
  page: number
  ruku: number
  hizbQuarter: number
  sajdah: boolean
}

export interface Surah {
  number: number
  name: string
  englishName: string
  englishNameTranslation: string
  numberOfAyahs: number
  revelationType: 'Meccan' | 'Medinan'
  ayahs: Ayah[]
}

export interface Translation {
  ayah: number
  text: string
}

const BACKEND_API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api'

export function useQuranData() {
  const [surahs, setSurahs] = useState<Surah[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchQuranData = async () => {
      try {
        setLoading(true)
        const response = await fetch(`${BACKEND_API}/surahs`)
        if (!response.ok) throw new Error('Failed to fetch surahs')
        const data = await response.json()
        
        // Map backend format to frontend format if needed
        const mappedSurahs = data.map((s: any) => ({
          number: s.number,
          name: s.name,
          englishName: s.transliteration,
          englishNameTranslation: s.translation,
          numberOfAyahs: s.total_verses,
          revelationType: s.type === 'meccan' ? 'Meccan' : 'Medinan'
        }))
        
        setSurahs(mappedSurahs)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load Quran data')
        console.error('Error loading Quran data:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchQuranData()
  }, [])

  return { surahs, loading, error }
}

export function useSurahAyahs(surahNumber: number) {
  const [ayahs, setAyahs] = useState<Ayah[]>([])
  const [translationTexts, setTranslationTexts] = useState<{ [key: number]: string }>({})
  const [surahInfo, setSurahInfo] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (surahNumber <= 0) return

    const fetchAyahs = async () => {
      try {
        setLoading(true)
        const response = await fetch(`${BACKEND_API}/surah/${surahNumber}`)
        if (!response.ok) throw new Error('Failed to fetch surah content')
        const data = await response.json()
        
        setSurahInfo({
          name: data.name,
          transliteration: data.transliteration,
          translation: data.translation,
          total_verses: data.total_verses,
          type: data.type
        })

        const mappedAyahs = data.verses.map((v: any) => ({
          number: v.id,
          text: v.text,
          numberInSurah: v.id
        }))
        
        setAyahs(mappedAyahs)

        const translationMap: { [key: number]: string } = {}
        data.verses.forEach((v: any) => {
          translationMap[v.id] = v.translation
        })
        setTranslationTexts(translationMap)
        
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load ayahs')
        console.error('Error loading ayahs:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchAyahs()
  }, [surahNumber])

  return { ayahs, translationTexts, surahInfo, loading, error }
}
