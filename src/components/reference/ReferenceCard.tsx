import { Star, ExternalLink } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { useToggleFavorite } from '@/hooks/useReferences'
import { PLATFORM_LABELS, FORMAT_LABELS } from '@/types'
import type { SavedReference } from '@/types'

const STATUS_STYLES: Record<string, string> = {
  Saved: 'bg-[#f3f4f6] text-[#4D7F95]',
  'Need Review': 'bg-[#FFF3D4] text-[#B07D00]',
  'Good Reference': 'bg-[#e6f7fa] text-[#00899e]',
  Adaptable: 'bg-[#EBF2F5] text-[#4D7F95]',
  Converted: 'bg-[#F0EAF5] text-[#51334F]',
  Used: 'bg-[#EDF3F0] text-[#3D7060]',
  Archived: 'bg-[#f3f4f6] text-[#9ca3af]',
  Rejected: 'bg-[#FEE2E2] text-[#991B1B]',
}

function ScoreDot({ value, color }: { value: number; color: string }) {
  return (
    <div className="flex items-center gap-1">
      <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }} />
      <span className="text-[11px] text-[#4D7F95]">{value}</span>
    </div>
  )
}

interface ReferenceCardProps {
  reference: SavedReference
}

export function ReferenceCard({ reference: ref }: ReferenceCardProps) {
  const navigate = useNavigate()
  const toggleFavorite = useToggleFavorite()

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation()
    toggleFavorite.mutate({ id: ref.id, current: ref.is_favorite })
  }

  return (
    <div
      onClick={() => navigate(`/references/${ref.id}`)}
      className="group bg-white rounded-xl border border-[#e5e7eb] overflow-hidden cursor-pointer hover:border-[#9FC6C8] hover:shadow-md transition-all"
    >
      {/* 썸네일 */}
      <div className="h-36 bg-[#f9fafb] flex items-center justify-center relative overflow-hidden">
        {ref.thumbnail_url ? (
          <img
            src={ref.thumbnail_url}
            alt={ref.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex flex-col items-center gap-1.5">
            <span className="text-2xl">
              {PLATFORM_EMOJI[ref.platform] ?? '🔗'}
            </span>
            <span className="text-xs text-[#9ca3af]">{PLATFORM_LABELS[ref.platform]}</span>
          </div>
        )}

        {/* 즐겨찾기 버튼 */}
        <button
          onClick={handleFavorite}
          className={cn(
            'absolute top-2 right-2 p-1.5 rounded-lg transition-colors',
            ref.is_favorite
              ? 'bg-[#FDB334] text-white'
              : 'bg-white/80 text-[#9ca3af] opacity-0 group-hover:opacity-100'
          )}
        >
          <Star size={13} fill={ref.is_favorite ? 'currentColor' : 'none'} />
        </button>
      </div>

      {/* 콘텐츠 */}
      <div className="px-3.5 py-3">
        {/* 배지 */}
        <div className="flex items-center gap-1.5 mb-2 flex-wrap">
          <span className="px-1.5 py-0.5 rounded text-[10px] bg-[#f3f4f6] text-[#4D7F95]">
            {PLATFORM_LABELS[ref.platform]}
          </span>
          <span className="px-1.5 py-0.5 rounded text-[10px] bg-[#f3f4f6] text-[#4D7F95]">
            {FORMAT_LABELS[ref.content_format]}
          </span>
          <span className={cn('px-1.5 py-0.5 rounded text-[10px]', STATUS_STYLES[ref.status])}>
            {ref.status}
          </span>
        </div>

        {/* 제목 */}
        <p className="text-sm font-medium text-[#0B3558] leading-snug line-clamp-2 mb-2.5">
          {ref.title}
        </p>

        {/* 태그 */}
        {ref.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-2.5">
            {ref.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="px-1.5 py-0.5 rounded-full text-[10px] bg-[#e6f7fa] text-[#00899e]">
                {tag}
              </span>
            ))}
            {ref.tags.length > 3 && (
              <span className="text-[10px] text-[#9ca3af]">+{ref.tags.length - 3}</span>
            )}
          </div>
        )}

        {/* 점수 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ScoreDot value={ref.brand_fit_score} color="#00b1cd" />
            <ScoreDot value={ref.cringe_risk_score} color="#F43F55" />
            <ScoreDot value={ref.growth_potential_score} color="#FDB334" />
          </div>
          <a
            href={ref.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="p-1 rounded text-[#9ca3af] hover:text-[#00b1cd] transition-colors"
          >
            <ExternalLink size={13} />
          </a>
        </div>
      </div>
    </div>
  )
}

const PLATFORM_EMOJI: Record<string, string> = {
  instagram: '📸',
  tiktok: '🎵',
  youtube: '▶️',
  pinterest: '📌',
  website: '🌐',
  other: '🔗',
}

// 미사용 import 방지
export type { ReferenceCardProps }
