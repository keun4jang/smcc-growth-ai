import { Plus, Library } from 'lucide-react'
import { PageHeader } from '@/components/common/PageHeader'
import { EmptyState } from '@/components/common/EmptyState'

export function ReferencesPage() {
  return (
    <div className="p-8">
      <PageHeader
        title="Reference Library"
        description="좋은 레퍼런스를 모으고, 분석하고, SMCC 아이디어로 전환하세요."
        action={
          <button className="flex items-center gap-2 px-4 py-2 bg-[#00b1cd] text-white text-sm font-medium rounded-lg hover:bg-[#008fa6] transition-colors">
            <Plus size={16} />
            레퍼런스 추가
          </button>
        }
      />

      <EmptyState
        icon={Library}
        title="첫 레퍼런스를 저장해보세요"
        description="Instagram Reels, TikTok, Carousel 등 좋은 콘텐츠 URL을 저장하고 분석할 수 있어요."
        action={
          <button className="flex items-center gap-2 px-4 py-2 bg-[#00b1cd] text-white text-sm font-medium rounded-lg hover:bg-[#008fa6] transition-colors">
            <Plus size={16} />
            첫 레퍼런스 추가
          </button>
        }
      />
    </div>
  )
}
