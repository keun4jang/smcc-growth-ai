import { Lightbulb } from 'lucide-react'
import { PageHeader } from '@/components/common/PageHeader'
import { EmptyState } from '@/components/common/EmptyState'

export function IdeasPage() {
  return (
    <div className="p-8">
      <PageHeader
        title="Content Ideas"
        description="레퍼런스를 SMCC다운 콘텐츠 아이디어로 전환하세요."
      />
      <EmptyState
        icon={Lightbulb}
        title="아직 콘텐츠 아이디어가 없어요"
        description="Reference Library에서 레퍼런스를 저장하고 '아이디어로 전환' 버튼을 눌러보세요."
      />
    </div>
  )
}
