import { useState } from 'react'
import { Search, Star, Plus, Check, BookmarkPlus, ExternalLink } from 'lucide-react'
import { PageHeader } from '@/components/common/PageHeader'
import { ResourceCard } from '@/components/resource/ResourceCard'
import { AddResourceModal } from '@/components/resource/AddResourceModal'
import { useResources, useCreateResource } from '@/hooks/useResources'
import { getCatalogByCategory, type CatalogResource } from '@/lib/resourceCatalog'
import { RESOURCE_CATEGORY_LABELS, RESOURCE_CATEGORY_LIST, type ResourceCategory } from '@/types'
import { cn } from '@/lib/utils'

type Tab = 'catalog' | 'mine'

function CatalogCard({ item, saved, onSave }: { item: CatalogResource; saved: boolean; onSave: () => void }) {
  return (
    <div className="bg-white rounded-xl border border-[#e5e7eb] hover:border-[#9FC6C8] hover:shadow-md transition-all flex flex-col p-4">
      <div className="flex items-start justify-between gap-2 mb-2">
        <span className="px-2 py-0.5 rounded-full text-[11px] font-medium bg-[#e6f7fa] text-[#00899e]">
          {RESOURCE_CATEGORY_LABELS[item.category]}
        </span>
        <span className={cn('px-2 py-0.5 rounded-full text-[11px]', item.is_free ? 'bg-[#f0fdf4] text-[#166534]' : 'bg-[#fef3c7] text-[#92400e]')}>
          {item.is_free ? '무료' : '유료'}
        </span>
      </div>
      <a href={item.url} target="_blank" rel="noopener noreferrer" className="group">
        <p className="text-sm font-semibold text-[#0B3558] leading-snug mb-1 group-hover:text-[#00b1cd] flex items-center gap-1">
          {item.title}
          <ExternalLink size={12} className="opacity-50" />
        </p>
      </a>
      <p className="text-xs text-[#4D7F95] leading-relaxed mb-2 line-clamp-2">{item.description}</p>
      <p className="text-[10px] text-[#9ca3af] mb-3">라이선스: 사이트에서 최종 확인 필요</p>
      <div className="flex flex-wrap gap-1 mb-3">
        {item.tags.map((t) => (
          <span key={t} className="px-2 py-0.5 rounded-full bg-[#f9fafb] border border-[#e5e7eb] text-[10px] text-[#4D7F95]">#{t}</span>
        ))}
      </div>
      <button
        onClick={onSave}
        disabled={saved}
        className={cn('mt-auto w-full flex items-center justify-center gap-1.5 py-2 rounded-lg text-sm font-medium transition-colors',
          saved ? 'bg-[#e6f7fa] text-[#00899e] cursor-default' : 'bg-[#00b1cd] text-white hover:bg-[#008fa6]')}
      >
        {saved ? <Check size={14} /> : <BookmarkPlus size={14} />}
        {saved ? '내 리소스에 저장됨' : '내 리소스에 저장'}
      </button>
    </div>
  )
}

export function ResourceHubPage() {
  const [tab, setTab] = useState<Tab>('catalog')
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState<ResourceCategory | ''>('')
  const [favoriteOnly, setFavoriteOnly] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)

  const { data: myResources = [] } = useResources({})
  const { data: filteredMine = [], isLoading } = useResources({
    search: search.trim() || undefined,
    category: category || undefined,
    is_favorite: favoriteOnly || undefined,
  })
  const createResource = useCreateResource()

  const savedUrls = new Set(myResources.map((r) => r.url))

  const catalogItems = getCatalogByCategory(category).filter((item) => {
    if (!search.trim()) return true
    const q = search.trim().toLowerCase()
    return item.title.toLowerCase().includes(q) || item.description.toLowerCase().includes(q) || item.tags.some((t) => t.toLowerCase().includes(q))
  })

  const handleSaveCatalogItem = async (item: CatalogResource) => {
    await createResource.mutateAsync({
      title: item.title,
      url: item.url,
      category: item.category,
      description: item.description,
      is_free: item.is_free,
      tags: item.tags,
      license_note: '사이트에서 최종 확인 필요',
      verification_status: 'unchecked',
    })
  }

  return (
    <div className="p-8">
      <PageHeader
        title="Resource Hub"
        description="콘텐츠 제작에 필요한 효과음, BGM, 템플릿, 스톡, 폰트, 도구 등을 큐레이션해서 모아둔 제작 리소스 허브예요. (콘텐츠 레퍼런스는 References에서 관리해요)"
        action={
          <button
            onClick={() => setModalOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 bg-[#00b1cd] text-white text-sm font-medium rounded-lg hover:bg-[#008fa6] transition-colors"
          >
            <Plus size={15} />
            직접 리소스 저장
          </button>
        }
      />

      {/* 탭 */}
      <div className="flex rounded-xl bg-[#f3f4f6] p-1 mb-5 w-fit">
        {([
          { key: 'catalog', label: `추천 리소스 (${RESOURCE_CATALOG_COUNT})` },
          { key: 'mine', label: `내 리소스 (${myResources.length})` },
        ] as { key: Tab; label: string }[]).map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={cn('px-5 py-2 rounded-lg text-sm font-medium transition-colors',
              tab === t.key ? 'bg-white text-[#0B3558] shadow-sm' : 'text-[#4D7F95] hover:text-[#0B3558]')}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* 검색 + 즐겨찾기 필터 */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <div className="relative flex-1 min-w-[240px] max-w-sm">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9ca3af]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="리소스 검색..."
            className="w-full pl-9 pr-3.5 py-2.5 rounded-lg border border-[#e5e7eb] bg-white text-sm text-[#0B3558] placeholder-[#9ca3af] outline-none focus:border-[#00b1cd] focus:ring-2 focus:ring-[#e6f7fa] transition-colors"
          />
        </div>
        {tab === 'mine' && (
          <button
            onClick={() => setFavoriteOnly((v) => !v)}
            className={cn(
              'flex items-center gap-1.5 px-3 py-2 rounded-lg border text-sm font-medium transition-colors',
              favoriteOnly ? 'bg-[#fffbeb] border-[#FDB334] text-[#92400e]' : 'bg-white border-[#e5e7eb] text-[#4D7F95] hover:border-[#FDB334]'
            )}
          >
            <Star size={14} fill={favoriteOnly ? 'currentColor' : 'none'} />
            즐겨찾기만
          </button>
        )}
      </div>

      {/* 카테고리 필터 */}
      <div className="flex gap-2 mb-6 flex-wrap">
        <button
          onClick={() => setCategory('')}
          className={cn('px-3 py-1.5 rounded-full text-xs font-medium border transition-colors',
            category === '' ? 'bg-[#00b1cd] text-white border-[#00b1cd]' : 'bg-white border-[#e5e7eb] text-[#4D7F95] hover:border-[#00b1cd] hover:text-[#00b1cd]')}
        >
          전체
        </button>
        {RESOURCE_CATEGORY_LIST.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={cn('px-3 py-1.5 rounded-full text-xs font-medium border transition-colors',
              category === c ? 'bg-[#00b1cd] text-white border-[#00b1cd]' : 'bg-white border-[#e5e7eb] text-[#4D7F95] hover:border-[#00b1cd] hover:text-[#00b1cd]')}
          >
            {RESOURCE_CATEGORY_LABELS[c]}
          </button>
        ))}
      </div>

      {/* 추천 리소스 (카탈로그) */}
      {tab === 'catalog' && (
        <>
          {catalogItems.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-sm text-[#4D7F95]">조건에 맞는 추천 리소스가 없어요.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {catalogItems.map((item) => (
                <CatalogCard
                  key={item.url}
                  item={item}
                  saved={savedUrls.has(item.url)}
                  onSave={() => handleSaveCatalogItem(item)}
                />
              ))}
            </div>
          )}
        </>
      )}

      {/* 내 리소스 */}
      {tab === 'mine' && (
        <>
          {isLoading && (
            <div className="flex items-center justify-center py-20">
              <div className="w-7 h-7 rounded-full border-2 border-[#00b1cd] border-t-transparent animate-spin" />
            </div>
          )}

          {!isLoading && filteredMine.length === 0 && (
            <div className="text-center py-16">
              <p className="text-sm text-[#4D7F95] mb-3">저장된 리소스가 없어요. '추천 리소스' 탭에서 가져와보세요.</p>
              <button
                onClick={() => setTab('catalog')}
                className="px-4 py-2 bg-[#00b1cd] text-white text-sm font-medium rounded-lg hover:bg-[#008fa6] transition-colors"
              >
                추천 리소스 보러가기
              </button>
            </div>
          )}

          {!isLoading && filteredMine.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredMine.map((r) => (
                <ResourceCard key={r.id} resource={r} />
              ))}
            </div>
          )}
        </>
      )}

      {modalOpen && (
        <AddResourceModal
          onClose={() => setModalOpen(false)}
          defaultCategory={category || 'other'}
        />
      )}
    </div>
  )
}

const RESOURCE_CATALOG_COUNT = getCatalogByCategory('').length
