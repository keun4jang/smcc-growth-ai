import { useState } from 'react'
import { Plus, Library } from 'lucide-react'
import { PageHeader } from '@/components/common/PageHeader'
import { EmptyState } from '@/components/common/EmptyState'
import { ReferenceCard } from '@/components/reference/ReferenceCard'
import { ReferenceFiltersBar } from '@/components/reference/ReferenceFilters'
import { AddReferenceModal } from '@/components/reference/AddReferenceModal'
import { useReferences } from '@/hooks/useReferences'
import type { ReferenceFilters } from '@/types'

export function ReferencesPage() {
  const [showModal, setShowModal] = useState(false)
  const [filters, setFilters] = useState<ReferenceFilters>({ sort: 'newest' })

  const { data: references = [], isLoading, isError } = useReferences(filters)

  const hasActiveFilter = !!(filters.search || filters.platform || filters.status || filters.is_favorite)

  return (
    <div className="p-8">
      <PageHeader
        title="Reference Library"
        description="좋은 레퍼런스를 모으고, 분석하고, SMCC 아이디어로 전환하세요."
        action={
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#00b1cd] text-white text-sm font-medium rounded-lg hover:bg-[#008fa6] transition-colors"
          >
            <Plus size={16} />
            레퍼런스 추가
          </button>
        }
      />

      <ReferenceFiltersBar filters={filters} onChange={setFilters} />

      {/* 로딩 */}
      {isLoading && (
        <div className="grid grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-64 bg-[#f3f4f6] rounded-xl animate-pulse" />
          ))}
        </div>
      )}

      {/* 에러 */}
      {isError && (
        <div className="text-center py-16">
          <p className="text-sm text-[#F43F55]">불러오는 중 오류가 발생했어요.</p>
          <p className="text-xs text-[#9ca3af] mt-1">Supabase 환경변수를 확인해주세요.</p>
        </div>
      )}

      {/* 빈 상태 */}
      {!isLoading && !isError && references.length === 0 && (
        hasActiveFilter ? (
          <EmptyState
            icon={Library}
            title="조건에 맞는 레퍼런스가 없어요"
            description="다른 필터를 선택하거나 검색어를 바꿔보세요."
            action={
              <button
                onClick={() => setFilters({ sort: 'newest' })}
                className="text-sm text-[#00b1cd] font-medium hover:underline"
              >
                필터 초기화
              </button>
            }
          />
        ) : (
          <EmptyState
            icon={Library}
            title="첫 레퍼런스를 저장해보세요"
            description="Instagram Reels, TikTok, Carousel 등 좋은 콘텐츠 URL을 저장하고 분석할 수 있어요."
            action={
              <button
                onClick={() => setShowModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-[#00b1cd] text-white text-sm font-medium rounded-lg hover:bg-[#008fa6] transition-colors"
              >
                <Plus size={16} />
                첫 레퍼런스 추가
              </button>
            }
          />
        )
      )}

      {/* 카드 그리드 */}
      {!isLoading && !isError && references.length > 0 && (
        <>
          <p className="text-xs text-[#9ca3af] mb-4">{references.length}개의 레퍼런스</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {references.map((ref) => (
              <ReferenceCard key={ref.id} reference={ref} />
            ))}
          </div>
        </>
      )}

      {/* 추가 모달 */}
      {showModal && <AddReferenceModal onClose={() => setShowModal(false)} />}
    </div>
  )
}
