import { PROGRAM_CONFIGS } from '@/lib/smccScoring'

const PEXELS_KEY = import.meta.env.VITE_PEXELS_API_KEY

export interface PexelsPhoto {
  id: number
  url: string
  photographer: string
  src: {
    medium: string
    large: string
    original: string
  }
  alt: string
}

const PEXELS_QUERIES: Record<string, string> = {
  '아침 루틴': 'morning routine wellness lifestyle',
  '웰니스': 'wellness healthy lifestyle minimal',
  '마음챙김': 'meditation mindful calm peaceful',
  '커뮤니티': 'community people together lifestyle',
  '라이프스타일': 'lifestyle aesthetic minimal urban',
}

export async function searchPexels(category: string, perPage = 12): Promise<PexelsPhoto[]> {
  const query = PEXELS_QUERIES[category] ?? category
  const res = await fetch(
    `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=${perPage}&orientation=portrait`,
    { headers: { Authorization: PEXELS_KEY } }
  )
  if (!res.ok) throw new Error('Pexels 검색 실패')
  const data = await res.json()
  return data.photos as PexelsPhoto[]
}

export async function searchPexelsByProgram(programType: string, perPage = 12): Promise<PexelsPhoto[]> {
  const config = PROGRAM_CONFIGS[programType]
  const query = config?.pexelsQuery ?? 'morning wellness community lifestyle'
  const res = await fetch(
    `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=${perPage}&orientation=portrait`,
    { headers: { Authorization: PEXELS_KEY } }
  )
  if (!res.ok) throw new Error('Pexels 검색 실패')
  const data = await res.json()
  return data.photos as PexelsPhoto[]
}
