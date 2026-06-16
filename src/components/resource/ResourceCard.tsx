import { Star, ExternalLink, AlertTriangle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useToggleResourceFavorite } from '@/hooks/useResources'
import { RESOURCE_CATEGORY_LABELS, RESOURCE_VERIFICATION_LABELS, type CreatorResource } from '@/types'

export function ResourceCard({ resource }: { resource: CreatorResource }) {
  const toggleFavorite = useToggleResourceFavorite()

  const licenseCaution = resource.verification_status === 'license_caution' || resource.verification_status === 'not_recommended'

  return (
    <div
      className={cn(
        'bg-white rounded-xl border overflow-hidden hover:shadow-md transition-all flex flex-col p-4',
        licenseCaution ? 'border-[#FDB334] ring-1 ring-[#FDB334]/30' : 'border-[#e5e7eb] hover:border-[#9FC6C8]'
      )}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <span className="px-2 py-0.5 rounded-full text-[11px] font-medium bg-[#e6f7fa] text-[#00899e]">
          {RESOURCE_CATEGORY_LABELS[resource.category]}
        </span>
        <button
          onClick={() => toggleFavorite.mutate({ id: resource.id, current: resource.is_favorite })}
          className={cn('flex-shrink-0', resource.is_favorite ? 'text-[#FDB334]' : 'text-[#d1d5db] hover:text-[#FDB334]')}
        >
          <Star size={16} fill={resource.is_favorite ? 'currentColor' : 'none'} />
        </button>
      </div>

      <a href={resource.url} target="_blank" rel="noopener noreferrer" className="group">
        <p className="text-sm font-semibold text-[#0B3558] leading-snug mb-1 group-hover:text-[#00b1cd] flex items-center gap-1">
          {resource.title}
          <ExternalLink size={12} className="opacity-50" />
        </p>
      </a>

      {resource.description && (
        <p className="text-xs text-[#4D7F95] leading-relaxed mb-2 line-clamp-2">{resource.description}</p>
      )}

      <div className="flex flex-wrap gap-1.5 mb-2">
        <span className={cn('px-2 py-0.5 rounded-full text-[11px]', resource.is_free ? 'bg-[#f0fdf4] text-[#166534]' : 'bg-[#fef3c7] text-[#92400e]')}>
          {resource.is_free ? '무료' : '유료'}
        </span>
        {resource.is_commercial_use_allowed !== null && (
          <span className={cn('px-2 py-0.5 rounded-full text-[11px]', resource.is_commercial_use_allowed ? 'bg-[#f0fdf4] text-[#166534]' : 'bg-[#fef2f2] text-[#991B1B]')}>
            상업적 사용 {resource.is_commercial_use_allowed ? '가능' : '불가'}
          </span>
        )}
        {resource.attribution_required !== null && (
          <span className="px-2 py-0.5 rounded-full text-[11px] bg-[#f3f4f6] text-[#4D7F95]">
            출처 표기 {resource.attribution_required ? '필요' : '불필요'}
          </span>
        )}
      </div>

      {licenseCaution && (
        <div className="flex items-start gap-1.5 px-2.5 py-2 rounded-lg bg-[#fffbeb] border border-[#fde68a] mb-2">
          <AlertTriangle size={13} className="text-[#B07D00] flex-shrink-0 mt-0.5" />
          <p className="text-[11px] text-[#92400e] leading-relaxed">
            {RESOURCE_VERIFICATION_LABELS[resource.verification_status]}
            {resource.license_note ? ` · ${resource.license_note}` : ' · 사이트에서 최종 확인 필요'}
          </p>
        </div>
      )}

      {resource.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-auto">
          {resource.tags.slice(0, 5).map((t) => (
            <span key={t} className="px-2 py-0.5 rounded-full bg-[#f9fafb] border border-[#e5e7eb] text-[10px] text-[#4D7F95]">
              #{t}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
