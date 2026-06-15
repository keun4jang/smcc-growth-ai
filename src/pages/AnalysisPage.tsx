import { TrendingUp, Plus } from 'lucide-react'
import { PageHeader } from '@/components/common/PageHeader'
import { EmptyState } from '@/components/common/EmptyState'

export function AnalysisPage() {
  return (
    <div className="p-8">
      <PageHeader
        title="Content Analysis"
        description="콘텐츠 성과를 기록하고 팔로워 성장을 분석하세요."
        action={
          <button className="flex items-center gap-2 px-4 py-2 bg-[#00b1cd] text-white text-sm font-medium rounded-lg hover:bg-[#008fa6] transition-colors">
            <Plus size={16} />
            성과 입력
          </button>
        }
      />
      <EmptyState
        icon={TrendingUp}
        title="아직 기록된 성과가 없어요"
        description="Meta Business Suite에서 성과 데이터를 확인하고 수동으로 입력해보세요."
        action={
          <button className="flex items-center gap-2 px-4 py-2 bg-[#00b1cd] text-white text-sm font-medium rounded-lg hover:bg-[#008fa6] transition-colors">
            <Plus size={16} />
            첫 성과 입력
          </button>
        }
      />
    </div>
  )
}
