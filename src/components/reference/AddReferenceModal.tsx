import { useState } from 'react'
import { X, Plus } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useCreateReference } from '@/hooks/useReferences'
import { useCollections } from '@/hooks/useCollections'
import {
  PLATFORM_LABELS,
  FORMAT_LABELS,
  PLATFORM_FORMATS,
  type PlatformType,
  type ContentFormatType,
} from '@/types'

interface AddReferenceModalProps {
  onClose: () => void
}

const PLATFORMS = Object.keys(PLATFORM_LABELS) as PlatformType[]

export function AddReferenceModal({ onClose }: AddReferenceModalProps) {
  const [url, setUrl] = useState('')
  const [title, setTitle] = useState('')
  const [platform, setPlatform] = useState<PlatformType>('instagram')
  const [contentFormat, setContentFormat] = useState<ContentFormatType>('reels')
  const [collectionId, setCollectionId] = useState<string>('')
  const [tagInput, setTagInput] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const [error, setError] = useState<string | null>(null)

  const { data: collections = [] } = useCollections()
  const createReference = useCreateReference()

  const availableFormats = PLATFORM_FORMATS[platform]

  const handlePlatformChange = (p: PlatformType) => {
    setPlatform(p)
    setContentFormat(PLATFORM_FORMATS[p][0])
  }

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === 'Enter' || e.key === ',') && tagInput.trim()) {
      e.preventDefault()
      const tag = tagInput.trim().toLowerCase()
      if (!tags.includes(tag)) setTags([...tags, tag])
      setTagInput('')
    }
  }

  const removeTag = (tag: string) => setTags(tags.filter((t) => t !== tag))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!url.trim() || !title.trim()) {
      setError('URL과 제목을 입력해주세요.')
      return
    }

    try {
      await createReference.mutateAsync({
        url: url.trim(),
        title: title.trim(),
        platform,
        content_format: contentFormat,
        collection_id: collectionId || null,
        tags,
      })
      onClose()
    } catch {
      setError('저장 중 오류가 발생했어요. 다시 시도해주세요.')
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl">
        {/* 헤더 */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#e5e7eb]">
          <h2 className="text-base font-semibold text-[#0B3558]">레퍼런스 추가</h2>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-[#f3f4f6] text-[#4D7F95] transition-colors">
            <X size={18} />
          </button>
        </div>

        {/* 폼 */}
        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          {/* URL */}
          <div>
            <label className="block text-xs font-medium text-[#0B3558] mb-1.5">URL *</label>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://www.instagram.com/reel/..."
              className={INPUT_CLASS}
              required
            />
          </div>

          {/* 제목 */}
          <div>
            <label className="block text-xs font-medium text-[#0B3558] mb-1.5">제목 *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="이 레퍼런스를 한 줄로 표현하면?"
              className={INPUT_CLASS}
              required
            />
          </div>

          {/* Platform + Format */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-[#0B3558] mb-1.5">플랫폼 *</label>
              <select
                value={platform}
                onChange={(e) => handlePlatformChange(e.target.value as PlatformType)}
                className={INPUT_CLASS}
              >
                {PLATFORMS.map((p) => (
                  <option key={p} value={p}>{PLATFORM_LABELS[p]}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-[#0B3558] mb-1.5">포맷 *</label>
              <select
                value={contentFormat}
                onChange={(e) => setContentFormat(e.target.value as ContentFormatType)}
                className={INPUT_CLASS}
              >
                {availableFormats.map((f) => (
                  <option key={f} value={f}>{FORMAT_LABELS[f]}</option>
                ))}
              </select>
            </div>
          </div>

          {/* 컬렉션 (선택사항) */}
          <div>
            <label className="block text-xs font-medium text-[#0B3558] mb-1.5">
              컬렉션 <span className="text-[#9ca3af] font-normal">(선택)</span>
            </label>
            <select
              value={collectionId}
              onChange={(e) => setCollectionId(e.target.value)}
              className={INPUT_CLASS}
            >
              <option value="">컬렉션 없음</option>
              {collections.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          {/* 태그 */}
          <div>
            <label className="block text-xs font-medium text-[#0B3558] mb-1.5">
              태그 <span className="text-[#9ca3af] font-normal">(엔터로 추가)</span>
            </label>
            <div className="flex flex-wrap gap-1.5 mb-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#e6f7fa] text-[#00899e] text-xs"
                >
                  {tag}
                  <button type="button" onClick={() => removeTag(tag)} className="hover:text-[#F43F55]">
                    <X size={10} />
                  </button>
                </span>
              ))}
            </div>
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleTagKeyDown}
              placeholder="아침루틴, 릴스, 커뮤니티..."
              className={INPUT_CLASS}
            />
          </div>

          {error && <p className="text-sm text-[#F43F55]">{error}</p>}

          {/* 버튼 */}
          <div className="flex justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm text-[#4D7F95] hover:bg-[#f3f4f6] rounded-lg transition-colors"
            >
              취소
            </button>
            <button
              type="submit"
              disabled={createReference.isPending}
              className="flex items-center gap-1.5 px-4 py-2 bg-[#00b1cd] text-white text-sm font-medium rounded-lg hover:bg-[#008fa6] disabled:opacity-60 transition-colors"
            >
              <Plus size={15} />
              {createReference.isPending ? '저장 중...' : '저장'}
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
