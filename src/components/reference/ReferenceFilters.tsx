import { Search, Star, SlidersHorizontal } from 'lucide-react'
import { cn } from '@/lib/utils'
import { PLATFORM_LABELS, REFERENCE_STATUS_LIST, type ReferenceFilters, type PlatformType, type ReferenceStatus } from '@/types'

const PLATFORMS = Object.keys(PLATFORM_LABELS) as PlatformType[]

interface ReferenceFiltersProps {
  filters: ReferenceFilters
  onChange: (filters: ReferenceFilters) => void
}

export function ReferenceFiltersBar({ filters, onChange }: ReferenceFiltersProps) {
  const set = (patch: Partial<ReferenceFilters>) => onChange({ ...filters, ...patch })

  return (
    <div className="space-y-3 mb-6">
      {/* 검색 + 즐겨찾기 */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9ca3af]" />
          <input
            type="text"
            value={filters.search ?? ''}
            onChange={(e) => set({ search: e.target.value })}
            placeholder="제목, 메모로 검색..."
            className="w-full pl-9 pr-3.5 py-2.5 rounded-lg border border-[#e5e7eb] bg-white text-sm text-[#0B3558] placeholder-[#9ca3af] outline-none focus:border-[#00b1cd] focus:ring-2 focus:ring-[#e6f7fa] transition-colors"
          />
        </div>

        <button
          onClick={() => set({ is_favorite: filters.is_favorite ? undefined : true })}
          className={cn(
            'flex items-center gap-1.5 px-3 py-2.5 rounded-lg border text-sm transition-colors',
            filters.is_favorite
              ? 'border-[#FDB334] bg-[#FFF8E6] text-[#B07D00]'
              : 'border-[#e5e7eb] bg-white text-[#4D7F95] hover:border-[#9FC6C8]'
          )}
        >
          <Star size={14} fill={filters.is_favorite ? 'currentColor' : 'none'} />
          즐겨찾기
        </button>
      </div>

      {/* 필터 + 정렬 */}
      <div className="flex gap-2 flex-wrap">
        <div className="flex items-center gap-1.5 text-xs text-[#9ca3af]">
          <SlidersHorizontal size={13} />
          필터:
        </div>

        {/* 플랫폼 */}
        <select
          value={filters.platform ?? ''}
          onChange={(e) => set({ platform: (e.target.value as PlatformType) || undefined })}
          className={SELECT_CLASS}
        >
          <option value="">전체 플랫폼</option>
          {PLATFORMS.map((p) => (
            <option key={p} value={p}>{PLATFORM_LABELS[p]}</option>
          ))}
        </select>

        {/* 상태 */}
        <select
          value={filters.status ?? ''}
          onChange={(e) => set({ status: (e.target.value as ReferenceStatus) || undefined })}
          className={SELECT_CLASS}
        >
          <option value="">전체 상태</option>
          {REFERENCE_STATUS_LIST.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>

        {/* 정렬 */}
        <select
          value={filters.sort ?? 'newest'}
          onChange={(e) => set({ sort: e.target.value as ReferenceFilters['sort'] })}
          className={SELECT_CLASS}
        >
          <option value="newest">최신순</option>
          <option value="oldest">오래된 순</option>
          <option value="brand_fit">Brand Fit 높은 순</option>
          <option value="growth">Growth 높은 순</option>
        </select>

        {/* 필터 초기화 */}
        {(filters.search || filters.platform || filters.status || filters.is_favorite) && (
          <button
            onClick={() => onChange({ sort: filters.sort })}
            className="text-xs text-[#F43F55] hover:underline px-1"
          >
            초기화
          </button>
        )}
      </div>
    </div>
  )
}

const SELECT_CLASS = cn(
  'px-3 py-2 rounded-lg border border-[#e5e7eb] bg-white',
  'text-xs text-[#0B3558] outline-none focus:border-[#00b1cd] transition-colors'
)
