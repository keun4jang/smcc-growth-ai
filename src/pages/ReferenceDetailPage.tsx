import { useNavigate } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'

export function ReferenceDetailPage() {
  const navigate = useNavigate()

  return (
    <div className="p-8">
      <button
        onClick={() => navigate('/references')}
        className="flex items-center gap-1.5 text-sm text-[#4D7F95] hover:text-[#0B3558] mb-6 transition-colors"
      >
        <ChevronLeft size={16} />
        Reference Library
      </button>

      <div className="text-center py-20">
        <p className="text-[#9ca3af] text-sm">레퍼런스 상세 페이지 (Phase 2에서 구현)</p>
      </div>
    </div>
  )
}
