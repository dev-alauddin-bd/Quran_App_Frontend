import { useQuery } from '@tanstack/react-query'

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

const BACKEND_API = process.env.NEXT_PUBLIC_API_URL;

export function useQuranData() {
  const { data: surahs = [], isLoading: loading, error } = useQuery<Surah[]>({
    queryKey: ['surahs'],
    queryFn: async () => {
      const response = await fetch(`${BACKEND_API}/surahs`)
      if (!response.ok) throw new Error('Failed to fetch surahs')
      const data = await response.json()

      // Map backend format to frontend format if needed
      return data.map((s: any) => ({
        number: s.number,
        name: s.name,
        englishName: s.transliteration,
        englishNameTranslation: s.translation,
        numberOfAyahs: s.total_verses,
        revelationType: s.type === 'meccan' ? 'Meccan' : 'Medinan'
      }))
    }
  })

  return { 
    surahs, 
    loading, 
    error: error instanceof Error ? error.message : null 
  }
}

export function useSurahAyahs(surahNumber: number) {
  const { data, isLoading: loading, error } = useQuery({
    queryKey: ['surah', surahNumber],
    queryFn: async () => {
      if (surahNumber <= 0) return null
      
      const response = await fetch(`${BACKEND_API}/surah/${surahNumber}`)
      if (!response.ok) throw new Error('Failed to fetch surah content')
      const data = await response.json()

      const surahInfo = {
        name: data.name,
        transliteration: data.transliteration,
        translation: data.translation,
        total_verses: data.total_verses,
        type: data.type
      }

      const ayahs = data.verses.map((v: any) => ({
        number: v.id,
        text: v.text,
        numberInSurah: v.id
      }))

      const translationTexts: { [key: number]: string } = {}
      data.verses.forEach((v: any) => {
        translationTexts[v.id] = v.translation
      })

      return { ayahs, translationTexts, surahInfo }
    },
    enabled: surahNumber > 0
  })

  return {
    ayahs: data?.ayahs ?? [],
    translationTexts: data?.translationTexts ?? {},
    surahInfo: data?.surahInfo ?? null,
    loading,
    error: error instanceof Error ? error.message : null
  }
}
