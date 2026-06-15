import { useState, useEffect } from 'react'
import { Loader2, BookmarkPlus, Check, ExternalLink, RefreshCw } from 'lucide-react'
import { PageHeader } from '@/components/common/PageHeader'
import { useCreateReference } from '@/hooks/useReferences'
import { searchYouTube, calcBrandFit, calcCringeRisk, calcGrowthPotential } from '@/lib/youtube'
import { searchPexels } from '@/lib/pexels'
import type { YouTubeVideo } from '@/lib/youtube'
import type { PexelsPhoto } from '@/lib/pexels'
import { cn } from '@/lib/utils'

const VIDEO_CATEGORIES = [
  { label: '아침 루틴', query: '아침 루틴 쇼츠 웰니스', emoji: '🌅' },
  { label: '웰니스', query: '웰니스 건강한 하루 쇼츠', emoji: '🌿' },
  { label: '마음챙김', query: '마음챙김 명상 멘탈 쇼츠', emoji: '🧘' },
  { label: '커뮤니티', query: '함께하는 루틴 커뮤니티 챌린지 쇼츠', emoji: '🤝' },
  { label: '라이프스타일', query: '미니멀 라이프스타일 일상 쇼츠', emoji: '✨' },
]

const IMAGE_CATEGORIES = ['아침 루틴', '웰니스', '마음챙김', '커뮤니티', '라이프스타일']

function parseDuration(iso: string): number {
  const m = iso.match(/PT(?:(\d+)M)?(?:(\d+)S)?/)
  if (!m) return 999
  return (Number(m[1] ?? 0) * 60) + Number(m[2] ?? 0)
}

function generateWhyFit(video: YouTubeVideo, brandFit: number, cringeRisk: number): string {
  if (brandFit >= 60 && cringeRisk <= 20) return '아침 루틴·커뮤니티 키워드가 SMCC 철학과 잘 맞아요.'
  if (brandFit >= 40 && cringeRisk <= 30) return '건강한 변화를 담은 콘텐츠로 참고 가치가 높아요.'
  if (cringeRisk >= 50) return '자극적 요소가 있어 참고는 되지만 톤은 조정 필요해요.'
  if (video.viewCount > 500000) return '높은 조회수로 포맷·편집 스타일 참고에 좋아요.'
  return '브랜드 무드와 유사한 감성의 콘텐츠예요.'
}

function ScoreChip({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="flex flex-col items-center gap-0.5">
      <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
        style={{ backgroundColor: color }}>
        {value}
      </div>
      <span className="text-[11px] text-[#9ca3af]">{label}</span>
    </div>
  )
}

interface EnrichedVideo extends YouTubeVideo {
  brandFit: number
  cringeRisk: number
  growthPotential: number
  whyFit: string
}

function VideoCard({ video, onSave, saved }: { video: EnrichedVideo; onSave: () => void; saved: boolean }) {
  const fmt = (n: number) => n >= 10000 ? `${(n / 10000).toFixed(1)}만` : n.toLocaleString()
  return (
    <div className="bg-white rounded-xl border border-[#e5e7eb] overflow-hidden hover:border-[#9FC6C8] hover:shadow-md transition-all flex flex-col">
      <div className="relative">
        <img src={video.thumbnail} alt={video.title} className="w-full h-40 object-cover" />
        <a href={`https://www.youtube.com/watch?v=${video.id}`} target="_blank" rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="absolute top-2 right-2 p-1.5 bg-white/80 rounded-lg text-[#9ca3af] hover:text-[#00b1cd] transition-colors">
          <ExternalLink size={13} />
        </a>
        <span className="absolute top-2 left-2 px-2 py-0.5 bg-black/60 text-white text-[11px] rounded-full">Shorts</span>
        {video.cringeRisk >= 50 && (
          <span className="absolute bottom-2 left-2 px-2 py-0.5 bg-[#FEE2E2] text-[#991B1B] text-[11px] rounded-full font-medium">주의</span>
        )}
      </div>
      <div className="p-3.5 flex flex-col flex-1">
        <p className="text-sm font-medium text-[#0B3558] leading-snug line-clamp-2 mb-1">{video.title}</p>
        <p className="text-xs text-[#9ca3af] mb-3">{video.channelTitle} · 조회 {fmt(video.viewCount)}</p>
        <div className="bg-[#f9fafb] rounded-lg px-3 py-2 mb-3">
          <p className="text-xs text-[#4D7F95] leading-relaxed">💡 {video.whyFit}</p>
        </div>
        <div className="flex justify-around mb-3">
          <ScoreChip label="Brand Fit" value={video.brandFit} color="#00b1cd" />
          <ScoreChip label="Cringe" value={video.cringeRisk} color="#F43F55" />
          <ScoreChip label="Growth" value={video.growthPotential} color="#FDB334" />
        </div>
        <button onClick={onSave} disabled={saved}
          className={cn('mt-auto w-full flex items-center justify-center gap-1.5 py-2 rounded-lg text-sm font-medium transition-colors',
            saved ? 'bg-[#e6f7fa] text-[#00899e] cursor-default' : 'bg-[#00b1cd] text-white hover:bg-[#008fa6]')}>
          {saved ? <Check size={14} /> : <BookmarkPlus size={14} />}
          {saved ? '저장됨' : '저장하기'}
        </button>
      </div>
    </div>
  )
}

function ImageCard({ photo, onSave, saved }: { photo: PexelsPhoto; onSave: () => void; saved: boolean }) {
  return (
    <div className="bg-white rounded-xl border border-[#e5e7eb] overflow-hidden hover:border-[#9FC6C8] hover:shadow-md transition-all flex flex-col">
      <div className="relative">
        <img src={photo.src.medium} alt={photo.alt} className="w-full h-48 object-cover" />
        <a href={photo.url} target="_blank" rel="noopener noreferrer"
          className="absolute top-2 right-2 p-1.5 bg-white/80 rounded-lg text-[#9ca3af] hover:text-[#00b1cd] transition-colors">
          <ExternalLink size={13} />
        </a>
      </div>
      <div className="p-3.5 flex flex-col flex-1">
        <p className="text-xs text-[#9ca3af] mb-3">📷 {photo.photographer} · Pexels</p>
        <button onClick={onSave} disabled={saved}
          className={cn('mt-auto w-full flex items-center justify-center gap-1.5 py-2 rounded-lg text-sm font-medium transition-colors',
            saved ? 'bg-[#e6f7fa] text-[#00899e] cursor-default' : 'bg-[#00b1cd] text-white hover:bg-[#008fa6]')}>
          {saved ? <Check size={14} /> : <BookmarkPlus size={14} />}
          {saved ? '저장됨' : '저장하기'}
        </button>
      </div>
    </div>
  )
}

export function DiscoverPage() {
  const createReference = useCreateReference()
  const [mode, setMode] = useState<'video' | 'image'>('video')
  const [activeCat, setActiveCat] = useState(0)
  const [videos, setVideos] = useState<EnrichedVideo[]>([])
  const [photos, setPhotos] = useState<PexelsPhoto[]>([])
  const [loading, setLoading] = useState(false)
  const [savedVideoIds, setSavedVideoIds] = useState<Set<string>>(new Set())
  const [savedPhotoIds, setSavedPhotoIds] = useState<Set<number>>(new Set())

  const fetchVideos = async (catIndex: number) => {
    setLoading(true)
    setVideos([])
    try {
      const raw = await searchYouTube(VIDEO_CATEGORIES[catIndex].query, 20)
      const enriched: EnrichedVideo[] = raw
        .filter((v) => parseDuration(v.duration) <= 90)
        .map((v) => {
          const brandFit = calcBrandFit(v.title, v.description, v.tags)
          const cringeRisk = calcCringeRisk(v.title, v.description)
          const growthPotential = calcGrowthPotential(v.viewCount, v.subscriberCount, v.publishedAt)
          return { ...v, brandFit, cringeRisk, growthPotential, whyFit: generateWhyFit(v, brandFit, cringeRisk) }
        })
      enriched.sort((a, b) => (b.brandFit - b.cringeRisk * 0.5) - (a.brandFit - a.cringeRisk * 0.5))
      setVideos(enriched)
    } catch { setVideos([]) }
    finally { setLoading(false) }
  }

  const fetchImages = async (catIndex: number) => {
    setLoading(true)
    setPhotos([])
    try {
      const results = await searchPexels(IMAGE_CATEGORIES[catIndex])
      setPhotos(results)
    } catch { setPhotos([]) }
    finally { setLoading(false) }
  }

  useEffect(() => {
    if (mode === 'video') fetchVideos(activeCat)
    else fetchImages(activeCat)
  }, [mode, activeCat])

  const handleSaveVideo = async (video: EnrichedVideo) => {
    await createReference.mutateAsync({
      url: `https://www.youtube.com/watch?v=${video.id}`,
      title: video.title,
      platform: 'youtube',
      content_format: 'video',
      thumbnail_url: video.thumbnail,
      tags: video.tags.slice(0, 5),
      brand_fit_score: video.brandFit,
      cringe_risk_score: video.cringeRisk,
      growth_potential_score: video.growthPotential,
    })
    setSavedVideoIds((prev) => new Set(prev).add(video.id))
  }

  const handleSavePhoto = async (photo: PexelsPhoto) => {
    await createReference.mutateAsync({
      url: photo.url,
      title: photo.alt || `Pexels 이미지 by ${photo.photographer}`,
      platform: 'website',
      content_format: 'feed_image',
      thumbnail_url: photo.src.medium,
      tags: [],
    })
    setSavedPhotoIds((prev) => new Set(prev).add(photo.id))
  }

  const categories = mode === 'video' ? VIDEO_CATEGORIES : IMAGE_CATEGORIES.map((l, i) => ({ label: l, emoji: ['🌅','🌿','🧘','🤝','✨'][i] }))

  return (
    <div className="p-8">
      <div className="flex items-start justify-between mb-6">
        <PageHeader title="Discover" description="AI가 SMCC 브랜드에 맞는 트렌딩 콘텐츠를 찾아드려요." />
        <button onClick={() => mode === 'video' ? fetchVideos(activeCat) : fetchImages(activeCat)}
          disabled={loading}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-[#e5e7eb] text-sm text-[#4D7F95] hover:border-[#00b1cd] hover:text-[#00b1cd] transition-colors disabled:opacity-40 mt-1">
          <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
          새로고침
        </button>
      </div>

      {/* 모드 전환 */}
      <div className="flex rounded-xl bg-[#f3f4f6] p-1 mb-5 w-fit">
        {(['video', 'image'] as const).map((m) => (
          <button key={m} onClick={() => { setMode(m); setActiveCat(0) }}
            className={cn('px-5 py-2 rounded-lg text-sm font-medium transition-colors',
              mode === m ? 'bg-white text-[#0B3558] shadow-sm' : 'text-[#4D7F95] hover:text-[#0B3558]')}>
            {m === 'video' ? '🎬 쇼츠' : '🖼️ 이미지'}
          </button>
        ))}
      </div>

      {/* 카테고리 탭 */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {categories.map((cat, i) => (
          <button key={cat.label} onClick={() => setActiveCat(i)}
            className={cn('flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-colors',
              activeCat === i ? 'bg-[#00b1cd] text-white' : 'bg-white border border-[#e5e7eb] text-[#4D7F95] hover:border-[#00b1cd] hover:text-[#00b1cd]')}>
            <span>{cat.emoji}</span>{cat.label}
          </button>
        ))}
      </div>

      {loading && (
        <div className="flex flex-col items-center justify-center py-24 gap-3">
          <Loader2 size={32} className="animate-spin text-[#00b1cd]" />
          <p className="text-sm text-[#4D7F95]">{mode === 'video' ? '트렌딩 쇼츠 분석 중...' : '이미지 레퍼런스 불러오는 중...'}</p>
        </div>
      )}

      {!loading && mode === 'video' && videos.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {videos.map((v) => <VideoCard key={v.id} video={v} onSave={() => handleSaveVideo(v)} saved={savedVideoIds.has(v.id)} />)}
        </div>
      )}

      {!loading && mode === 'image' && photos.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {photos.map((p) => <ImageCard key={p.id} photo={p} onSave={() => handleSavePhoto(p)} saved={savedPhotoIds.has(p.id)} />)}
        </div>
      )}

      {!loading && ((mode === 'video' && videos.length === 0) || (mode === 'image' && photos.length === 0)) && (
        <div className="text-center py-20">
          <p className="text-2xl mb-3">😅</p>
          <p className="text-sm text-[#4D7F95]">콘텐츠를 불러오지 못했어요. 새로고침을 눌러주세요.</p>
        </div>
      )}
    </div>
  )
}
