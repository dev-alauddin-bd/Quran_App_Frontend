'use client'

import { LandingPage } from '@/components/LandingPage'
import { useQuranData } from '@/hooks/useQuranData'
import { useRouter } from 'next/navigation'

export default function Home() {
  const { surahs } = useQuranData()
  const router = useRouter()

  const handleSurahSelect = (id: number) => {
    router.push(`/surah/${id}`)
  }

  return (
    <LandingPage
      surahs={surahs}
      onSurahSelect={handleSurahSelect}
    />
  )
}
