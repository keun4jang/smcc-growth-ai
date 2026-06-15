const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY

export interface YouTubeVideo {
  id: string
  title: string
  description: string
  thumbnail: string
  channelTitle: string
  publishedAt: string
  viewCount: number
  likeCount: number
  subscriberCount: number
  tags: string[]
  duration: string
}

const SMCC_KEYWORDS = ['아침', '루틴', '웰니스', '커뮤니티', '변화', '건강', '습관', '마음', '성장', '명상', '운동', '라이프스타일', 'morning', 'routine', 'wellness', 'community', 'healthy', 'mindful']
const CRINGE_KEYWORDS = ['살빠', '인생이바뀐', '충격', '대박', '미친', '꿀팁', '절대', '무조건', '100%', '안오면손해', '성공공식', '상위1%', '자극']

export function calcBrandFit(title: string, description: string, tags: string[]): number {
  const text = (title + ' ' + description + ' ' + tags.join(' ')).toLowerCase()
  const matches = SMCC_KEYWORDS.filter((k) => text.includes(k)).length
  return Math.min(100, Math.round((matches / 3) * 100))
}

export function calcCringeRisk(title: string, description: string): number {
  const text = (title + ' ' + description).replace(/\s/g, '').toLowerCase()
  const matches = CRINGE_KEYWORDS.filter((k) => text.includes(k.toLowerCase())).length
  return Math.min(100, matches * 25)
}

export function calcGrowthPotential(viewCount: number, subscriberCount: number, publishedAt: string): number {
  const ratio = subscriberCount > 0 ? viewCount / subscriberCount : 0
  const ratioScore = Math.min(60, Math.round(ratio * 30))

  const daysSince = (Date.now() - new Date(publishedAt).getTime()) / (1000 * 60 * 60 * 24)
  const recencyScore = daysSince < 7 ? 40 : daysSince < 30 ? 30 : daysSince < 90 ? 20 : 10

  return Math.min(100, ratioScore + recencyScore)
}

export async function searchYouTube(query: string, maxResults = 12): Promise<YouTubeVideo[]> {
  const searchRes = await fetch(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&type=video&maxResults=${maxResults}&key=${API_KEY}`
  )
  if (!searchRes.ok) throw new Error('YouTube 검색 실패')
  const searchData = await searchRes.json()

  const videoIds: string[] = searchData.items.map((item: any) => item.id.videoId).filter(Boolean)
  if (videoIds.length === 0) return []

  const statsRes = await fetch(
    `https://www.googleapis.com/youtube/v3/videos?part=statistics,contentDetails,snippet&id=${videoIds.join(',')}&key=${API_KEY}`
  )
  if (!statsRes.ok) throw new Error('영상 정보 조회 실패')
  const statsData = await statsRes.json()

  const channelIds: string[] = [...new Set(statsData.items.map((v: any) => v.snippet.channelId))] as string[]
  const channelRes = await fetch(
    `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${channelIds.join(',')}&key=${API_KEY}`
  )
  const channelData = await channelRes.json()
  const subMap: Record<string, number> = {}
  for (const ch of channelData.items ?? []) {
    subMap[ch.id] = Number(ch.statistics.subscriberCount ?? 0)
  }

  return statsData.items.map((v: any) => ({
    id: v.id,
    title: v.snippet.title,
    description: v.snippet.description,
    thumbnail: v.snippet.thumbnails?.medium?.url ?? '',
    channelTitle: v.snippet.channelTitle,
    publishedAt: v.snippet.publishedAt,
    viewCount: Number(v.statistics.viewCount ?? 0),
    likeCount: Number(v.statistics.likeCount ?? 0),
    subscriberCount: subMap[v.snippet.channelId] ?? 0,
    tags: v.snippet.tags ?? [],
    duration: v.contentDetails.duration,
  }))
}
