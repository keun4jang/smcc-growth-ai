import { useState } from 'react'
import { Search, Loader2, BookmarkPlus, Check, ExternalLink } from 'lucide-react'
import { PageHeader } from '@/components/common/PageHeader'
import { useAuthStore } from '@/store/authStore'
import { useCreateReference } from '@/hooks/useReferences'
import { searchYouTube, calcBrandFit, calcCringeRisk, calcGrowthPotential } from '@/lib/youtube'
import type { YouTubeVideo } from '@/lib/youtube'
import { cn } from '@/lib/utils'

const PRESET_QUERIES = ['아침 루틴 브이로그', '웰니스 라이프스타일', '마음챙김 명상', '건강한 하루 시작', 'morning routine wellness']

function ScoreBar({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div>
      <div className="flex justify-between text-xs text-[#4D7F95] mb-1">
        <span>{label}</span>
        <span className="font-medium">{value}</span>
      </div>
      <div className="h-1.5 bg-[#f3f4f6] rounded-full overflow-hidden">
        <div className="h-full rounded-full transition-all" style={{ width: `${value}%`, backgroundColor: color }} />
      </div>
    </div>
  )
}

function VideoCard({ video, onSave, saved }: { video: YouTubeVideo; onSave: () => void; saved: boolean }) {
  const brandFit = calcBrandFit(video.title, video.description, video.tags)
  const cringeRisk = calcCringeRisk(video.title, video.description)
  const growthPotential = calcGrowthPotential(video.viewCount, video.subscriberCount, video.publishedAt)

  const fmt = (n: number) => n >= 10000 ? `${(n / 10000).toFixed(1)}만` : n.toLocaleString()

  return (
    <div className="bg-white rounded-xl border border-[#e5e7eb] overflow-hidden hover:border-[#9FC6C8] hover:shadow-md transition-all">
      <div className="relative">
        <img src={video.thumbnail} alt={video.title} className="w-full h-40 object-cover" />
        <a
          href={`https://www.youtube.com/watch?v=${video.id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute top-2 right-2 p-1.5 bg-white/80 rounded-lg text-[#9ca3af] hover:text-[#00b1cd] transition-colors"
        >
          <ExternalLink size={13} />
        </a>
      </div>

      <div className="p-3.5">
        <p className="text-sm font-medium text-[#0B3558] leading-snug line-clamp-2 mb-1">{video.title}</p>
        <p className="text-xs text-[#9ca3af] mb-3">{video.channelTitle} · 조회 {fmt(video.viewCount)}</p>

        <div className="space-y-2 mb-3">
          <ScoreBar label="Brand Fit" value={brandFit} color="#00b1cd" />
          <ScoreBar label="Cringe Risk" value={cringeRisk} color="#F43F55" />
          <ScoreBar label="Growth Potential" value={growthPotential} color="#FDB334" />
        </div>

        <button
          onClick={onSave}
          disabled={saved}
          className={cn(
            'w-full flex items-center justify-center gap-1.5 py-2 rounded-lg text-sm font-medium transition-colors',
            saved
              ? 'bg-[#e6f7fa] text-[#00899e] cursor-default'
              : 'bg-[#00b1cd] text-white hover:bg-[#008fa6]'
          )}
        >
          {saved ? <Check size={14} /> : <BookmarkPlus size={14} />}
          {saved ? '저장됨' : '레퍼런스로 저장'}
        </button>
      </div>
    </div>
  )
}

export function DiscoverPage() {
  const userId = useAuthStore((s) => s.user?.id)
  const createReference = useCreateReference()

  const [query, setQuery] = useState('')
  const [videos, setVideos] = useState<YouTubeVideo[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set())

  const handleSearch = async (q: string) => {
    const searchQuery = q || query
    if (!searchQuery.trim()) return
    setQuery(searchQuery)
    setLoading(true)
    setError(null)
    try {
      const results = await searchYouTube(searchQuery)
      setVideos(results)
    } catch {
      setError('검색 중 오류가 발생했어요. YouTube API 키를 확인해주세요.')
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async (video: YouTubeVideo) => {
    if (!userId) return
    const brandFit = calcBrandFit(video.title, video.description, video.tags)
    const cringeRisk = calcCringeRisk(video.title, video.description)
    const growthPotential = calcGrowthPotential(video.viewCount, video.subscriberCount, video.publishedAt)

    await createReference.mutateAsync({
      url: `https://www.youtube.com/watch?v=${video.id}`,
      title: video.title,
      platform: 'youtube',
      content_format: 'video',
      thumbnail_url: video.thumbnail,
      tags: video.tags.slice(0, 5),
      brand_fit_score: brandFit,
      cringe_risk_score: cringeRisk,
      growth_potential_score: growthPotential,
    })
    setSavedIds((prev) => new Set(prev).add(video.id))
  }

  return (
    <div className="p-8">
      <PageHeader
        title="Discover"
        description="AI가 YouTube에서 레퍼런스를 찾아드려요. 마음에 드는 것을 저장하세요."
      />

      {/* 검색창 */}
      <div className="flex gap-3 mb-5">
        <div className="flex-1 relative">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9ca3af]" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch(query)}
            placeholder="검색어 입력... (예: 아침 루틴, 웰니스)"
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-[#e5e7eb] bg-white text-sm text-[#0B3558] outline-none focus:border-[#00b1cd] focus:ring-2 focus:ring-[#e6f7fa] transition-colors"
          />
        </div>
        <button
          onClick={() => handleSearch(query)}
          disabled={loading}
          className="px-5 py-2.5 bg-[#00b1cd] text-white text-sm font-medium rounded-lg hover:bg-[#008fa6] disabled:opacity-60 transition-colors flex items-center gap-2"
        >
          {loading && <Loader2 size={14} className="animate-spin" />}
          검색
        </button>
      </div>

      {/* 프리셋 태그 */}
      {videos.length === 0 && !loading && (
        <div className="flex flex-wrap gap-2 mb-8">
          {PRESET_QUERIES.map((q) => (
            <button
              key={q}
              onClick={() => handleSearch(q)}
              className="px-3 py-1.5 rounded-full text-sm bg-[#e6f7fa] text-[#00899e] hover:bg-[#00b1cd] hover:text-white transition-colors"
            >
              {q}
            </button>
          ))}
        </div>
      )}

      {/* 에러 */}
      {error && <p className="text-sm text-[#F43F55] mb-4">{error}</p>}

      {/* 로딩 */}
      {loading && (
        <div className="flex items-center justify-center py-20">
          <Loader2 size={28} className="animate-spin text-[#00b1cd]" />
        </div>
      )}

      {/* 결과 */}
      {!loading && videos.length > 0 && (
        <>
          <p className="text-sm text-[#4D7F95] mb-4">"{query}" 검색 결과 {videos.length}개</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {videos.map((video) => (
              <VideoCard
                key={video.id}
                video={video}
                onSave={() => handleSave(video)}
                saved={savedIds.has(video.id)}
              />
            ))}
          </div>
        </>
      )}

      {/* 빈 상태 */}
      {!loading && videos.length === 0 && !error && (
        <div className="text-center py-20">
          <p className="text-2xl mb-3">🔍</p>
          <p className="text-sm text-[#4D7F95]">키워드를 입력하거나 위 태그를 눌러 검색해보세요.</p>
        </div>
      )}
    </div>
  )
}
