import { useState } from 'react'
import { X, Plus, ChevronDown, ChevronUp } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useCreateResource } from '@/hooks/useResources'
import {
  RESOURCE_CATEGORY_LABELS,
  RESOURCE_CATEGORY_LIST,
  RESOURCE_VERIFICATION_LABELS,
  type ResourceCategory,
  type ResourceVerificationStatus,
} from '@/types'

interface AddResourceModalProps {
  onClose: () => void
  defaultCategory?: ResourceCategory
}

const VERIFICATION_LIST = Object.keys(RESOURCE_VERIFICATION_LABELS) as ResourceVerificationStatus[]

export function AddResourceModal({ onClose, defaultCategory = 'other' }: AddResourceModalProps) {
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [category, setCategory] = useState<ResourceCategory>(defaultCategory)
  const [expanded, setExpanded] = useState(false)
  const [description, setDescription] = useState('')
  const [platformOrTool, setPlatformOrTool] = useState('')
  const [useCase, setUseCase] = useState('')
  const [isFree, setIsFree] = useState(true)
  const [isCommercialUseAllowed, setIsCommercialUseAllowed] = useState<boolean | null>(null)
  const [attributionRequired, setAttributionRequired] = useState<boolean | null>(null)
  const [licenseNote, setLicenseNote] = useState('')
  const [tagInput, setTagInput] = useState('')
  const [memo, setMemo] = useState('')
  const [smccUseCase, setSmccUseCase] = useState('')
  const [verificationStatus, setVerificationStatus] = useState<ResourceVerificationStatus>('unchecked')
  const [error, setError] = useState<string | null>(null)

  const createResource = useCreateResource()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!title.trim() || !url.trim()) {
      setError('제목과 URL은 꼭 입력해주세요.')
      return
    }

    try {
      await createResource.mutateAsync({
        title: title.trim(),
        url: url.trim(),
        category,
        description: description.trim() || null,
        platform_or_tool: platformOrTool.trim() || null,
        use_case: useCase.trim() || null,
        is_free: isFree,
        is_commercial_use_allowed: isCommercialUseAllowed,
        attribution_required: attributionRequired,
        license_note: licenseNote.trim() || null,
        tags: tagInput.trim() ? tagInput.split(',').map((t) => t.trim()).filter(Boolean) : [],
        memo: memo.trim() || null,
        smcc_use_case: smccUseCase.trim() || null,
        verification_status: verificationStatus,
      })
      onClose()
    } catch {
      setError('저장 중 오류가 발생했어요. 다시 시도해주세요.')
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#e5e7eb] sticky top-0 bg-white">
          <h2 className="text-base font-semibold text-[#0B3558]">리소스 저장</h2>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-[#f3f4f6] text-[#4D7F95] transition-colors">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          <div>
            <label className="block text-xs font-medium text-[#0B3558] mb-1.5">제목 *</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="예: Pixabay Sound Effects" className={INPUT_CLASS} required />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#0B3558] mb-1.5">URL *</label>
            <input type="url" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://..." className={INPUT_CLASS} required />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#0B3558] mb-1.5">카테고리 *</label>
            <select value={category} onChange={(e) => setCategory(e.target.value as ResourceCategory)} className={INPUT_CLASS}>
              {RESOURCE_CATEGORY_LIST.map((c) => (
                <option key={c} value={c}>{RESOURCE_CATEGORY_LABELS[c]}</option>
              ))}
            </select>
          </div>

          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="flex items-center gap-1 text-xs text-[#00b1cd] font-medium hover:underline"
          >
            {expanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
            {expanded ? '간단히 접기' : '설명·라이선스·태그 추가 입력'}
          </button>

          {expanded && (
            <div className="space-y-4 pt-1">
              <div>
                <label className="block text-xs font-medium text-[#0B3558] mb-1.5">설명</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="이 리소스가 무엇인지 한두 줄로" rows={2} className={INPUT_CLASS} />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-[#0B3558] mb-1.5">플랫폼/툴</label>
                  <input type="text" value={platformOrTool} onChange={(e) => setPlatformOrTool(e.target.value)} placeholder="예: Premiere Pro 플러그인" className={INPUT_CLASS} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#0B3558] mb-1.5">활용 용도</label>
                  <input type="text" value={useCase} onChange={(e) => setUseCase(e.target.value)} placeholder="예: 릴스 자막 효과음" className={INPUT_CLASS} />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-medium text-[#0B3558] mb-1.5">무료 여부</label>
                  <select value={isFree ? 'free' : 'paid'} onChange={(e) => setIsFree(e.target.value === 'free')} className={INPUT_CLASS}>
                    <option value="free">무료</option>
                    <option value="paid">유료</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#0B3558] mb-1.5">상업적 사용</label>
                  <select
                    value={isCommercialUseAllowed === null ? 'unknown' : isCommercialUseAllowed ? 'yes' : 'no'}
                    onChange={(e) => setIsCommercialUseAllowed(e.target.value === 'unknown' ? null : e.target.value === 'yes')}
                    className={INPUT_CLASS}
                  >
                    <option value="unknown">미확인</option>
                    <option value="yes">가능</option>
                    <option value="no">불가</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#0B3558] mb-1.5">출처 표기</label>
                  <select
                    value={attributionRequired === null ? 'unknown' : attributionRequired ? 'yes' : 'no'}
                    onChange={(e) => setAttributionRequired(e.target.value === 'unknown' ? null : e.target.value === 'yes')}
                    className={INPUT_CLASS}
                  >
                    <option value="unknown">미확인</option>
                    <option value="yes">필요</option>
                    <option value="no">불필요</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#0B3558] mb-1.5">라이선스 메모</label>
                <input type="text" value={licenseNote} onChange={(e) => setLicenseNote(e.target.value)} placeholder="사이트에서 최종 확인 필요" className={INPUT_CLASS} />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#0B3558] mb-1.5">검증 상태</label>
                <select value={verificationStatus} onChange={(e) => setVerificationStatus(e.target.value as ResourceVerificationStatus)} className={INPUT_CLASS}>
                  {VERIFICATION_LIST.map((v) => (
                    <option key={v} value={v}>{RESOURCE_VERIFICATION_LABELS[v]}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#0B3558] mb-1.5">태그 (쉼표로 구분)</label>
                <input type="text" value={tagInput} onChange={(e) => setTagInput(e.target.value)} placeholder="무료, 상업가능, 효과음" className={INPUT_CLASS} />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#0B3558] mb-1.5">SMCC 활용 포인트</label>
                <textarea value={smccUseCase} onChange={(e) => setSmccUseCase(e.target.value)} placeholder="SMCC 콘텐츠에 어떻게 쓸 수 있을까요?" rows={2} className={INPUT_CLASS} />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#0B3558] mb-1.5">메모</label>
                <textarea value={memo} onChange={(e) => setMemo(e.target.value)} placeholder="기타 메모" rows={2} className={INPUT_CLASS} />
              </div>
            </div>
          )}

          {error && <p className="text-sm text-[#F43F55]">{error}</p>}

          <div className="flex justify-end gap-2 pt-1">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm text-[#4D7F95] hover:bg-[#f3f4f6] rounded-lg transition-colors">
              취소
            </button>
            <button
              type="submit"
              disabled={createResource.isPending}
              className="flex items-center gap-1.5 px-4 py-2 bg-[#00b1cd] text-white text-sm font-medium rounded-lg hover:bg-[#008fa6] disabled:opacity-60 transition-colors"
            >
              <Plus size={15} />
              {createResource.isPending ? '저장 중...' : '저장'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

const INPUT_CLASS = cn(
  'w-full px-3.5 py-2.5 rounded-lg border border-[#e5e7eb] bg-white',
  'text-sm text-[#0B3558] placeholder-[#9ca3af]',
  'outline-none focus:border-[#00b1cd] focus:ring-2 focus:ring-[#e6f7fa] transition-colors'
)
