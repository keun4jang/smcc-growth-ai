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

export async function searchYouTube(query: string, maxResults = 12): Promise<YouTubeVideo[]> {
  const searchRes = await fetch(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&type=video&videoDuration=short&maxResults=${maxResults}&key=${API_KEY}`
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
