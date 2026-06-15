import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ChevronLeft, ExternalLink, Trash2, Star, Loader2 } from 'lucide-react'
import { useReference, useUpdateReference, useDeleteReference, useToggleFavorite } from '@/hooks/useReferences'
import { useCollections } from '@/hooks/useCollections'
import { cn } from '@/lib/utils'
import {
  PLATFORM_LABELS, FORMAT_LABELS, PLATFORM_FORMATS,
  REFERENCE_STATUS_LIST,
  type ReferenceStatus, type PlatformType, type ContentFormatType,
} from '@/types'

function ScoreSlider({ label, value, onChange, color }: {
  label: string
  value: number
  onChange: (v: number) => void
  color: string
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <label className="text-xs font-medium text-[#0B3558]">{label}</label>
        <span className="text-sm font-bold" style={{ color }}>{value}</span>
      </div>
      <input
        type="range"
        min={0}
        max={100}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
        style={{ accentColor: color }}
      />
      <div className="flex justify-between text-[10px] text-[#9ca3af] mt-0.5">
        <span>0</span>
        <span>100</span>
      </div>
    </div>
  )
}

const INPUT_CLASS = 'w-full px-3 py-2 rounded-lg border border-[#e5e7eb] bg-[#f9fafb] text-sm text-[#0B3558] outline-none focus:border-[#00b1cd] focus:ring-2 focus:ring-[#e6f7fa] transition-colors'
const TEXTAREA_CLASS = cn(INPUT_CLASS, 'resize-none')

export function ReferenceDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const { data: reference, isLoading } = useReference(id)
  const { data: collections = [] } = useCollections()
  const updateRef = useUpdateReference()
  const deleteRef = useDeleteReference()
  const toggleFav = useToggleFavorite()

  const [title, setTitle] = useState('')
  const [platform, setPlatform] = useState<PlatformType>('instagram')
  const [contentFormat, setContentFormat] = useState<ContentFormatType>('reels')
  const [status, setStatus] = useState<ReferenceStatus>('Saved')
  const [collectionId, setCollectionId] = useState<string>('')
  const [tagInput, setTagInput] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const [memo, setMemo] = useState('')
  const [whySaved, setWhySaved] = useState('')
  const [goodPoints, setGoodPoints] = useState('')
  const [smccApply, setSmccApply] = useState('')
  const [brandFit, setBrandFit] = useState(70)
  const [cringeRisk, setCringeRisk] = useState(20)
  const [growthPotential, setGrowthPotential] = useState(60)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (!reference) return
    setTitle(reference.title)
    setPlatform(reference.platform)
    setContentFormat(reference.content_format)
    setStatus(reference.status)
    setCollectionId(reference.collection_id ?? '')
    setTags(reference.tags ?? [])
    setMemo(reference.memo ?? '')
    setWhySaved(reference.why_saved ?? '')
    setGoodPoints(reference.good_points ?? '')
    setSmccApply(reference.smcc_apply ?? '')
    setBrandFit(reference.brand_fit_score)
    setCringeRisk(reference.cringe_risk_score)
    setGrowthPotential(reference.growth_potential_score)
  }, [reference])

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

  const handleSave = async () => {
    if (!id) return
    await updateRef.mutateAsync({
      id,
      input: {
        title, platform, content_format: contentFormat,
        status, collection_id: collectionId || null, tags,
        memo: memo || null, why_saved: whySaved || null,
        good_points: goodPoints || null, smcc_apply: smccApply || null,
        brand_fit_score: brandFit, cringe_risk_score: cringeRisk,
        growth_potential_score: growthPotential,
      },
    })
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const handleDelete = async () => {
    if (!id || !confirm('이 레퍼런스를 삭제할까요?')) return
    await deleteRef.mutateAsync(id)
    navigate('/references')
  }

  if (isLoading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-96">
        <Loader2 size={24} className="animate-spin text-[#00b1cd]" />
      </div>
    )
  }

  if (!reference) {
    return (
      <div className="p-8">
        <button onClick={() => navigate('/references')} className="flex items-center gap-1.5 text-sm text-[#4D7F95] mb-6">
          <ChevronLeft size={16} /> Reference Library
        </button>
        <p className="text-sm text-[#9ca3af]">레퍼런스를 찾을 수 없어요.</p>
      </div>
    )
  }

  return (
    <div className="p-8">
      {/* 상단 네비 */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => navigate('/references')}
          className="flex items-center gap-1.5 text-sm text-[#4D7F95] hover:text-[#0B3558] transition-colors"
        >
          <ChevronLeft size={16} /> Reference Library
        </button>
        <div className="flex items-center gap-2">
          <button
            onClick={() => toggleFav.mutate({ id: reference.id, current: reference.is_favorite })}
            className={cn(
              'p-2 rounded-lg border transition-colors',
              reference.is_favorite
                ? 'border-[#FDB334] bg-[#FFF8E6] text-[#B07D00]'
                : 'border-[#e5e7eb] text-[#9ca3af] hover:border-[#9FC6C8]'
            )}
          >
            <Star size={15} fill={reference.is_favorite ? 'currentColor' : 'none'} />
          </button>
          <a
            href={reference.url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg border border-[#e5e7eb] text-[#4D7F95] hover:border-[#9FC6C8] transition-colors"
          >
            <ExternalLink size={15} />
          </a>
          <button
            onClick={handleDelete}
            className="p-2 rounded-lg border border-[#e5e7eb] text-[#9ca3af] hover:border-[#F43F55] hover:text-[#F43F55] transition-colors"
          >
            <Trash2 size={15} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-[1fr_320px] gap-6">
        {/* 좌: 기본 정보 + 메모 */}
        <div className="space-y-4">
          {/* URL */}
          <div className="bg-white rounded-xl border border-[#e5e7eb] px-4 py-3">
            <p className="text-xs text-[#9ca3af] mb-1">URL</p>
            <a href={reference.url} target="_blank" rel="noopener noreferrer"
              className="text-sm text-[#00b1cd] hover:underline break-all">
              {reference.url}
            </a>
          </div>

          {/* 기본 정보 */}
          <div className="bg-white rounded-xl border border-[#e5e7eb] p-5 space-y-4">
            <div>
              <label className="block text-xs font-medium text-[#0B3558] mb-1.5">제목</label>
              <input value={title} onChange={(e) => setTitle(e.target.value)} className={INPUT_CLASS} />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-[#0B3558] mb-1.5">플랫폼</label>
                <select value={platform} onChange={(e) => handlePlatformChange(e.target.value as PlatformType)} className={INPUT_CLASS}>
                  {(Object.keys(PLATFORM_LABELS) as PlatformType[]).map((p) => (
                    <option key={p} value={p}>{PLATFORM_LABELS[p]}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-[#0B3558] mb-1.5">포맷</label>
                <select value={contentFormat} onChange={(e) => setContentFormat(e.target.value as ContentFormatType)} className={INPUT_CLASS}>
                  {PLATFORM_FORMATS[platform].map((f) => (
                    <option key={f} value={f}>{FORMAT_LABELS[f]}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-[#0B3558] mb-1.5">상태</label>
                <select value={status} onChange={(e) => setStatus(e.target.value as ReferenceStatus)} className={INPUT_CLASS}>
                  {REFERENCE_STATUS_LIST.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-[#0B3558] mb-1.5">컬렉션</label>
                <select value={collectionId} onChange={(e) => setCollectionId(e.target.value)} className={INPUT_CLASS}>
                  <option value="">컬렉션 없음</option>
                  {collections.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* 태그 */}
            <div>
              <label className="block text-xs font-medium text-[#0B3558] mb-1.5">태그</label>
              <div className="flex flex-wrap gap-1.5 mb-2">
                {tags.map((tag) => (
                  <span key={tag} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#e6f7fa] text-[#00899e] text-xs">
                    {tag}
                    <button type="button" onClick={() => setTags(tags.filter(t => t !== tag))} className="hover:text-[#F43F55]">×</button>
                  </span>
                ))}
              </div>
              <input
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleTagKeyDown}
                placeholder="태그 입력 후 엔터"
                className={INPUT_CLASS}
              />
            </div>
          </div>

          {/* 분석 메모 */}
          <div className="bg-white rounded-xl border border-[#e5e7eb] p-5 space-y-4">
            <h3 className="text-sm font-semibold text-[#0B3558]">분석 메모</h3>
            {[
              { label: '왜 저장했나요?', value: whySaved, set: setWhySaved },
              { label: '좋았던 포인트', value: goodPoints, set: setGoodPoints },
              { label: 'SMCC에 적용할 점', value: smccApply, set: setSmccApply },
            ].map(({ label, value, set }) => (
              <div key={label}>
                <label className="block text-xs font-medium text-[#0B3558] mb-1.5">{label}</label>
                <textarea rows={2} value={value} onChange={(e) => set(e.target.value)} className={TEXTAREA_CLASS} />
              </div>
            ))}
            <div>
              <label className="block text-xs font-medium text-[#0B3558] mb-1.5">기타 메모</label>
              <textarea rows={3} value={memo} onChange={(e) => setMemo(e.target.value)} className={TEXTAREA_CLASS} />
            </div>
          </div>
        </div>

        {/* 우: 점수 패널 */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-[#e5e7eb] p-5 space-y-5">
            <h3 className="text-sm font-semibold text-[#0B3558]">점수</h3>
            <ScoreSlider label="Brand Fit Score" value={brandFit} onChange={setBrandFit} color="#00b1cd" />
            <div className="text-xs text-[#9ca3af] -mt-2">SMCC 브랜드 철학과의 일치도</div>
            <ScoreSlider label="Cringe Risk Score" value={cringeRisk} onChange={setCringeRisk} color="#F43F55" />
            <div className="text-xs text-[#9ca3af] -mt-2">낮을수록 안전 (짜침 위험도)</div>
            <ScoreSlider label="Growth Potential" value={growthPotential} onChange={setGrowthPotential} color="#FDB334" />
            <div className="text-xs text-[#9ca3af] -mt-2">팔로워 증가 기여 가능성</div>
          </div>

          {/* 저장 버튼 */}
          <button
            onClick={handleSave}
            disabled={updateRef.isPending}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-[#00b1cd] text-white text-sm font-medium hover:bg-[#008fa6] disabled:opacity-60 transition-colors"
          >
            {updateRef.isPending
              ? <><Loader2 size={15} className="animate-spin" /> 저장 중...</>
              : saved ? '✓ 저장됐습니다' : '저장'}
          </button>

          {/* 메타 정보 */}
          <div className="bg-white rounded-xl border border-[#e5e7eb] p-4 space-y-2">
            <p className="text-xs text-[#9ca3af]">
              저장일: {new Date(reference.created_at).toLocaleDateString('ko-KR')}
            </p>
            <p className="text-xs text-[#9ca3af]">
              수정일: {new Date(reference.updated_at).toLocaleDateString('ko-KR')}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
