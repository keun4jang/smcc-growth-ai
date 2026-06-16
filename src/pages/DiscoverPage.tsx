import { useState, useEffect } from 'react'
import { Loader2, BookmarkPlus, Check, RefreshCw, X, ExternalLink, ChevronDown, ChevronUp, Sparkles } from 'lucide-react'
import { PageHeader } from '@/components/common/PageHeader'
import { useCreateReference } from '@/hooks/useReferences'
import { searchYouTube } from '@/lib/youtube'
import { searchPexelsByProgram } from '@/lib/pexels'
import {
  PROGRAM_CONFIGS,
  PROGRAM_LABEL_KO,
  PROGRAM_GUIDES,
  calcProgramFitScore,
  calcSmccMoodScore,
  calcContentStructureScore,
  calcGrowthPotentialNew,
  calcCringeRiskNew,
  calcFinalScore,
  isHardRejected,
  classifyStatus,
  cringeLevel,
  CRINGE_LABELS,
  STATUS_LABELS,
  STATUS_COLORS,
  generateLowScoreReason,
  generateReasonTexts,
} from '@/lib/smccScoring'
import type { ResultStatus } from '@/lib/smccScoring'
import type { YouTubeVideo } from '@/lib/youtube'
import type { PexelsPhoto } from '@/lib/pexels'
import {
  PLATFORM_LABELS,
  FORMAT_LABELS,
  PLATFORM_FORMATS,
  type PlatformType,
  type ContentFormatType,
} from '@/types'
import { cn } from '@/lib/utils'
import { useNavigate } from 'react-router-dom'

// ─── Types ────────────────────────────────────────────────────────

interface EnrichedVideo extends YouTubeVideo {
  programFitScore: number
  smccMoodScore: number
  contentStructureScore: number
  growthPotentialScore: number
  cringeRiskScore: number
  finalScore: number
  whyRecommended: string
  smccApplyPoint: string
  lowScoreReason: string
  sourceQuery: string
  status: ResultStatus
}

type ViewMode = 'recommended' | 'broad' | 'strict'

const VIEW_MODE_LABELS: Record<ViewMode, string> = {
  recommended: '추천순',
  broad: '넓게 보기',
  strict: '엄격하게 보기',
}

// ─── Program Categories ───────────────────────────────────────────

const PROGRAM_CATEGORIES = [
  { label: 'Coffee Chat',        key: 'daily_coffee_chat',    emoji: '☕' },
  { label: 'Espresso Run',       key: 'espresso_run',         emoji: '🏃' },
  { label: 'Book Dive',          key: 'book_dive',            emoji: '📚' },
  { label: 'Morning Rave',       key: 'morning_rave',         emoji: '🌟' },
  { label: 'SMCC Talk',          key: 'smcc_talk',            emoji: '🎙️' },
  { label: 'SMCC Cinema',        key: 'smcc_cinema',          emoji: '🎬' },
  { label: 'Breakfast',          key: 'breakfast',            emoji: '🍳' },
  { label: 'Sunrise Meetup',     key: 'sunrise_meetup',       emoji: '🌄' },
  { label: 'Travel Trip',        key: 'travel_trip',          emoji: '✈️' },
  { label: 'Wellness Class',     key: 'wellness_class',       emoji: '🧘' },
  { label: 'Global Meetup',      key: 'global_meetup',        emoji: '🌍' },
  { label: 'Brand Collab',       key: 'brand_collaboration',  emoji: '🤝' },
  { label: 'Community',          key: 'community_event',      emoji: '🎉' },
  { label: 'Corp Wellness',      key: 'corporate_wellness',   emoji: '🏢' },
  { label: 'Wellness Life',      key: 'other',                emoji: '🌿' },
]

// ─── Helpers ──────────────────────────────────────────────────────

function parseDuration(iso: string): number {
  const m = iso.match(/PT(?:(\d+)M)?(?:(\d+)S)?/)
  if (!m) return 999
  return (Number(m[1] ?? 0) * 60) + Number(m[2] ?? 0)
}

function fmtViews(n: number): string {
  return n >= 10000 ? `${(n / 10000).toFixed(1)}만` : n.toLocaleString()
}

// ─── ScoreBar ─────────────────────────────────────────────────────

function ScoreBar({ label, value, color }: { label: string; value: number; color: string }) {
  const pct = Math.max(0, Math.min(100, Math.round(value)))
  return (
    <div className="flex items-center gap-2">
      <span className="text-[11px] text-[#9ca3af] w-16 flex-shrink-0">{label}</span>
      <div className="flex-1 h-1.5 bg-[#f3f4f6] rounded-full overflow-hidden">
        <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, backgroundColor: color }} />
      </div>
      <span className="text-[11px] font-medium w-6 text-right" style={{ color }}>{pct}</span>
    </div>
  )
}

// ─── StatusBadge ──────────────────────────────────────────────────

function StatusBadge({ status }: { status: ResultStatus }) {
  const color = STATUS_COLORS[status]
  return (
    <span
      className="px-2 py-0.5 rounded-full text-[11px] font-medium"
      style={{ backgroundColor: `${color}1A`, color }}
    >
      {STATUS_LABELS[status]}
    </span>
  )
}

function CringeTag({ score }: { score: number }) {
  const level = cringeLevel(score)
  const colors = { safe: '#3D7060', caution: '#B07D00', danger: '#991B1B' }
  return (
    <span className="text-[11px] font-medium" style={{ color: colors[level] }}>
      자극 {CRINGE_LABELS[level]} ({score})
    </span>
  )
}

// ─── ExternalSearch ───────────────────────────────────────────────

function buildExternalLinks(query: string) {
  const enc = encodeURIComponent(query)
  return [
    { label: 'YouTube에서 검색', href: `https://www.youtube.com/results?search_query=${enc}` },
    { label: 'TikTok에서 검색', href: `https://www.tiktok.com/search?q=${enc}` },
    { label: 'Instagram Reels 검색', href: `https://www.google.com/search?q=site%3Ainstagram.com%2Freel+${enc}` },
    { label: 'Pinterest에서 검색', href: `https://www.pinterest.com/search/pins/?q=${enc}` },
    { label: 'Google에서 검색', href: `https://www.google.com/search?q=${enc}` },
  ]
}

function ExternalSearch({ query }: { query: string }) {
  const links = buildExternalLinks(query)
  return (
    <div className="flex flex-wrap gap-2">
      {links.map((l) => (
        <a
          key={l.label}
          href={l.href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-[#e5e7eb] text-xs text-[#4D7F95] hover:border-[#00b1cd] hover:text-[#00b1cd] transition-colors"
        >
          {l.label}
          <ExternalLink size={10} />
        </a>
      ))}
    </div>
  )
}

// ─── SearchChips (with per-chip external search) ───────────────────

function SearchChips({
  programKey,
  activeChip,
  onChipClick,
}: {
  programKey: string
  activeChip: string | null
  onChipClick: (query: string | null) => void
}) {
  const config = PROGRAM_CONFIGS[programKey]
  if (!config) return null
  return (
    <div className="space-y-2.5">
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onChipClick(null)}
          className={cn(
            'px-3 py-1.5 rounded-full text-xs font-medium border transition-colors',
            activeChip === null
              ? 'bg-[#00b1cd] text-white border-[#00b1cd]'
              : 'bg-white border-[#e5e7eb] text-[#4D7F95] hover:border-[#00b1cd] hover:text-[#00b1cd]'
          )}
        >
          전체
        </button>
        {config.searchChips.map((chip) => (
          <button
            key={chip.query}
            onClick={() => onChipClick(chip.query)}
            className={cn(
              'px-3 py-1.5 rounded-full text-xs font-medium border transition-colors',
              activeChip === chip.query
                ? 'bg-[#00b1cd] text-white border-[#00b1cd]'
                : 'bg-white border-[#e5e7eb] text-[#4D7F95] hover:border-[#00b1cd] hover:text-[#00b1cd]'
            )}
          >
            {chip.label}
          </button>
        ))}
      </div>
    </div>
  )
}

// ─── Program Guide Panel ────────────────────────────────────────────

function ProgramGuidePanel({ programKey }: { programKey: string }) {
  const guide = PROGRAM_GUIDES[programKey] ?? PROGRAM_GUIDES['other']
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-5">
      <div className="rounded-xl border border-[#bbf7d0] bg-[#f0fdf4] p-4">
        <p className="text-xs font-semibold text-[#166534] mb-2">✅ 찾아야 할 레퍼런스</p>
        <ul className="space-y-1">
          {guide.goodReferences.map((g) => (
            <li key={g} className="text-xs text-[#166534] leading-relaxed">· {g}</li>
          ))}
        </ul>
      </div>
      <div className="rounded-xl border border-[#fecaca] bg-[#fef2f2] p-4">
        <p className="text-xs font-semibold text-[#991B1B] mb-2">🚫 피해야 할 레퍼런스</p>
        <ul className="space-y-1">
          {guide.badReferences.map((b) => (
            <li key={b} className="text-xs text-[#991B1B] leading-relaxed">· {b}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

// ─── Quick Save Form ─────────────────────────────────────────────

const INPUT_CLASS = cn(
  'w-full px-3.5 py-2.5 rounded-lg border border-[#e5e7eb] bg-white',
  'text-sm text-[#0B3558] placeholder-[#9ca3af]',
  'outline-none focus:border-[#00b1cd] focus:ring-2 focus:ring-[#e6f7fa] transition-colors'
)

const PLATFORMS = Object.keys(PLATFORM_LABELS) as PlatformType[]

function QuickSaveForm({ programKey, onSaved }: { programKey: string; onSaved: (id: string) => void }) {
  const createReference = useCreateReference()
  const guide = PROGRAM_GUIDES[programKey] ?? PROGRAM_GUIDES['other']

  const [url, setUrl] = useState('')
  const [title, setTitle] = useState('')
  const [expanded, setExpanded] = useState(false)
  const [platform, setPlatform] = useState<PlatformType>('instagram')
  const [contentFormat, setContentFormat] = useState<ContentFormatType>('reels')
  const [tagInput, setTagInput] = useState('')
  const [memo, setMemo] = useState('')
  const [whySaved, setWhySaved] = useState('')
  const [goodPoints, setGoodPoints] = useState('')
  const [smccApply, setSmccApply] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [savedState, setSavedState] = useState<{ id: string } | null>(null)

  const availableFormats = PLATFORM_FORMATS[platform]

  const handlePlatformChange = (p: PlatformType) => {
    setPlatform(p)
    setContentFormat(PLATFORM_FORMATS[p][0])
  }

  const resetForm = () => {
    setUrl('')
    setTitle('')
    setTagInput('')
    setMemo('')
    setWhySaved('')
    setGoodPoints('')
    setSmccApply('')
    setSavedState(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!url.trim() || !title.trim()) {
      setError('URL과 제목은 꼭 입력해주세요.')
      return
    }

    const tags = tagInput.trim()
      ? tagInput.split(',').map((t) => t.trim()).filter(Boolean)
      : guide.recommendedTags.slice(0, 5)

    try {
      const saved = await createReference.mutateAsync({
        url: url.trim(),
        title: title.trim(),
        platform,
        content_format: contentFormat,
        program_type: programKey as any,
        tags,
        memo: memo.trim() || null,
        why_saved: whySaved.trim() || null,
        good_points: goodPoints.trim() || null,
        smcc_apply: smccApply.trim() || null,
        brand_fit_score: 70,
        cringe_risk_score: 20,
        growth_potential_score: 60,
      })
      setSavedState({ id: saved.id })
      onSaved(saved.id)
    } catch {
      setError('저장 중 오류가 발생했어요. 다시 시도해주세요.')
    }
  }

  if (savedState) {
    return (
      <SavedToast
        referenceId={savedState.id}
        onContinue={resetForm}
      />
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="레퍼런스 URL (Instagram/TikTok/Pinterest 등)"
          className={INPUT_CLASS}
        />
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="제목 (한 줄 요약)"
          className={INPUT_CLASS}
        />
      </div>

      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="flex items-center gap-1 text-xs text-[#00b1cd] font-medium hover:underline"
      >
        {expanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
        {expanded ? '간단히 접기' : '플랫폼·태그·메모 추가 입력'}
      </button>

      {expanded && (
        <div className="space-y-3 pt-1">
          <div className="grid grid-cols-2 gap-3">
            <select value={platform} onChange={(e) => handlePlatformChange(e.target.value as PlatformType)} className={INPUT_CLASS}>
              {PLATFORMS.map((p) => <option key={p} value={p}>{PLATFORM_LABELS[p]}</option>)}
            </select>
            <select value={contentFormat} onChange={(e) => setContentFormat(e.target.value as ContentFormatType)} className={INPUT_CLASS}>
              {availableFormats.map((f) => <option key={f} value={f}>{FORMAT_LABELS[f]}</option>)}
            </select>
          </div>
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            placeholder={`태그 (쉼표로 구분, 비워두면 추천 태그 자동 적용: ${guide.recommendedTags.slice(0, 3).join(', ')})`}
            className={INPUT_CLASS}
          />
          <textarea
            value={whySaved}
            onChange={(e) => setWhySaved(e.target.value)}
            placeholder="왜 저장했나요?"
            rows={2}
            className={INPUT_CLASS}
          />
          <textarea
            value={goodPoints}
            onChange={(e) => setGoodPoints(e.target.value)}
            placeholder="좋은 포인트는 무엇인가요?"
            rows={2}
            className={INPUT_CLASS}
          />
          <textarea
            value={smccApply}
            onChange={(e) => setSmccApply(e.target.value)}
            placeholder="SMCC에 어떻게 적용할 수 있을까요?"
            rows={2}
            className={INPUT_CLASS}
          />
          <textarea
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
            placeholder="기타 메모"
            rows={2}
            className={INPUT_CLASS}
          />
        </div>
      )}

      {error && <p className="text-sm text-[#F43F55]">{error}</p>}

      <button
        type="submit"
        disabled={createReference.isPending}
        className="flex items-center gap-1.5 px-4 py-2 bg-[#00b1cd] text-white text-sm font-medium rounded-lg hover:bg-[#008fa6] disabled:opacity-60 transition-colors"
      >
        <BookmarkPlus size={15} />
        {createReference.isPending ? '저장 중...' : '레퍼런스로 저장'}
      </button>
    </form>
  )
}

function SavedToast({ referenceId, onContinue }: { referenceId: string; onContinue: () => void }) {
  const navigate = useNavigate()
  return (
    <div className="flex items-center justify-between gap-3 px-4 py-3.5 rounded-xl bg-[#e6f7fa] border border-[#9FC6C8]">
      <div className="flex items-center gap-2">
        <Check size={16} className="text-[#00899e]" />
        <p className="text-sm text-[#00899e] font-medium">레퍼런스에 저장됐어요</p>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => navigate(`/references/${referenceId}`)}
          className="px-3 py-1.5 rounded-lg bg-white border border-[#9FC6C8] text-xs font-medium text-[#00899e] hover:bg-[#f0fdfd]"
        >
          상세 보기
        </button>
        <button
          onClick={onContinue}
          className="px-3 py-1.5 rounded-lg bg-[#00b1cd] text-xs font-medium text-white hover:bg-[#008fa6]"
        >
          계속 찾기
        </button>
      </div>
    </div>
  )
}

// ─── VideoModal ───────────────────────────────────────────────────

function VideoModal({ video, onClose, onPrev, onNext, hasPrev, hasNext, onSave, saved }: {
  video: EnrichedVideo
  onClose: () => void
  onPrev: () => void
  onNext: () => void
  hasPrev: boolean
  hasNext: boolean
  onSave: () => void
  saved: boolean
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4" onClick={onClose}>
      <div className="w-full max-w-2xl bg-black rounded-2xl overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
        {/* 헤더 */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#111]">
          <div className="flex items-center gap-2 flex-1 min-w-0 mr-3">
            <button onClick={onPrev} disabled={!hasPrev}
              className="flex-shrink-0 w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:bg-white/20 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6"/></svg>
            </button>
            <button onClick={onNext} disabled={!hasNext}
              className="flex-shrink-0 w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:bg-white/20 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6"/></svg>
            </button>
            <p className="text-white text-sm font-medium line-clamp-1">{video.title}</p>
          </div>
          <button onClick={onClose} className="text-white/60 hover:text-white transition-colors flex-shrink-0">
            <X size={20} />
          </button>
        </div>

        <div className="flex items-center gap-2 px-4 pt-3 bg-[#111]">
          <StatusBadge status={video.status} />
          <CringeTag score={video.cringeRiskScore} />
        </div>

        {/* 영상 */}
        <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
          <iframe
            key={video.id}
            className="absolute inset-0 w-full h-full"
            src={`https://www.youtube.com/embed/${video.id}?autoplay=1`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        {/* 하단: 점수 + 이유 + 저장 */}
        <div className="px-4 py-3 bg-[#111] space-y-2">
          <div className="grid grid-cols-2 gap-x-4 gap-y-1">
            <ScoreBar label="프로그램 적합" value={video.programFitScore} color="#00b1cd" />
            <ScoreBar label="SMCC 무드" value={video.smccMoodScore} color="#7C3AED" />
            <ScoreBar label="성장 가능성" value={video.growthPotentialScore} color="#FDB334" />
            <ScoreBar label="자극 위험" value={video.cringeRiskScore} color="#F43F55" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-[#9ca3af] w-16 flex-shrink-0">최종 점수</span>
            <span className="text-sm font-bold text-[#00b1cd]">{Math.round(video.finalScore)}</span>
          </div>
          {video.whyRecommended && (
            <p className="text-xs text-white/70 bg-white/5 rounded-lg px-3 py-2">
              💡 {video.whyRecommended}
            </p>
          )}
          {video.smccApplyPoint && (
            <p className="text-xs text-[#00b1cd]/80 bg-[#00b1cd]/10 rounded-lg px-3 py-2">
              ✨ {video.smccApplyPoint}
            </p>
          )}
          {video.lowScoreReason && (
            <p className="text-xs text-[#F43F55]/80 bg-[#F43F55]/10 rounded-lg px-3 py-2">
              ⚠️ 낮은 점수 이유: {video.lowScoreReason}
            </p>
          )}
          {video.sourceQuery && (
            <p className="text-[10px] text-white/30">검색: {video.sourceQuery}</p>
          )}
          <div className="flex justify-end pt-1">
            <button onClick={onSave} disabled={saved}
              className={cn('flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-sm font-medium transition-colors',
                saved ? 'bg-[#00899e] text-white cursor-default' : 'bg-[#00b1cd] text-white hover:bg-[#008fa6]')}>
              {saved ? <Check size={13} /> : <BookmarkPlus size={13} />}
              {saved ? '저장됨' : '레퍼런스로 저장'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── VideoCard ────────────────────────────────────────────────────

function VideoCard({ video, onSave, onSaveAsMood, saved, onPlay }: {
  video: EnrichedVideo; onSave: () => void; onSaveAsMood: () => void; saved: boolean; onPlay: () => void
}) {
  return (
    <div className="bg-white rounded-xl border border-[#e5e7eb] overflow-hidden hover:border-[#9FC6C8] hover:shadow-md transition-all flex flex-col">
      <div className="relative cursor-pointer group" onClick={onPlay}>
        <img src={video.thumbnail} alt={video.title} className="w-full h-40 object-cover" />
        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center">
            <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-[#0B3558] border-b-[10px] border-b-transparent ml-1" />
          </div>
        </div>
        <span className="absolute top-2 left-2 px-2 py-0.5 bg-black/60 text-white text-[11px] rounded-full">Shorts</span>
      </div>

      <div className="p-3.5 flex flex-col flex-1">
        <div className="flex items-center gap-1.5 mb-1.5 flex-wrap">
          <StatusBadge status={video.status} />
          <CringeTag score={video.cringeRiskScore} />
        </div>
        <p className="text-sm font-medium text-[#0B3558] leading-snug line-clamp-2 mb-1 cursor-pointer hover:text-[#00b1cd]" onClick={onPlay}>
          {video.title}
        </p>
        <p className="text-xs text-[#9ca3af] mb-3">
          {video.channelTitle} · 조회 {fmtViews(video.viewCount)}
        </p>

        {/* Score bars */}
        <div className="space-y-1.5 mb-3">
          <ScoreBar label="프로그램 적합" value={video.programFitScore} color="#00b1cd" />
          <ScoreBar label="SMCC 무드" value={video.smccMoodScore} color="#7C3AED" />
          <ScoreBar label="최종 점수" value={video.finalScore} color="#059669" />
        </div>

        {/* Why recommended */}
        <div className="bg-[#f9fafb] rounded-lg px-3 py-2 mb-3">
          <p className="text-xs text-[#4D7F95] leading-relaxed">💡 {video.whyRecommended}</p>
          {video.lowScoreReason && (
            <p className="text-xs text-[#F43F55] leading-relaxed mt-1">⚠️ {video.lowScoreReason}</p>
          )}
        </div>

        <div className="mt-auto grid grid-cols-2 gap-1.5">
          <button onClick={onSave} disabled={saved}
            className={cn('flex items-center justify-center gap-1 py-2 rounded-lg text-xs font-medium transition-colors',
              saved ? 'bg-[#e6f7fa] text-[#00899e] cursor-default' : 'bg-[#00b1cd] text-white hover:bg-[#008fa6]')}>
            {saved ? <Check size={13} /> : <BookmarkPlus size={13} />}
            {saved ? '저장됨' : '레퍼런스로 저장'}
          </button>
          <button onClick={onSaveAsMood} disabled={saved}
            className="flex items-center justify-center gap-1 py-2 rounded-lg text-xs font-medium border border-[#e5e7eb] text-[#4D7F95] hover:border-[#00b1cd] hover:text-[#00b1cd] disabled:opacity-50 transition-colors">
            무드 참고로 저장
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── ImageCard ────────────────────────────────────────────────────

function ImageCard({ photo, onSave, saved }: { photo: PexelsPhoto; onSave: () => void; saved: boolean }) {
  return (
    <div className="bg-white rounded-xl border border-[#e5e7eb] overflow-hidden hover:border-[#9FC6C8] hover:shadow-md transition-all flex flex-col">
      <a href={photo.url} target="_blank" rel="noopener noreferrer" className="relative block group">
        <img src={photo.src.medium} alt={photo.alt} className="w-full h-52 object-cover" />
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <span className="text-white text-xs bg-black/50 px-3 py-1 rounded-full">원본 보기</span>
        </div>
      </a>
      <div className="p-3.5 flex flex-col flex-1">
        <div className="mb-1.5">
          <StatusBadge status="visual_mood_reference" />
        </div>
        <p className="text-xs text-[#9ca3af] mb-3">📷 {photo.photographer} · Pexels</p>
        <button onClick={onSave} disabled={saved}
          className={cn('mt-auto w-full flex items-center justify-center gap-1.5 py-2 rounded-lg text-sm font-medium transition-colors',
            saved ? 'bg-[#e6f7fa] text-[#00899e] cursor-default' : 'bg-[#00b1cd] text-white hover:bg-[#008fa6]')}>
          {saved ? <Check size={14} /> : <BookmarkPlus size={14} />}
          {saved ? '저장됨' : '무드 참고로 저장'}
        </button>
      </div>
    </div>
  )
}

// ─── DiscoverPage ─────────────────────────────────────────────────

export function DiscoverPage() {
  const createReference = useCreateReference()
  const [mode, setMode] = useState<'video' | 'image'>('image')
  const [activeCat, setActiveCat] = useState(0)
  const [activeChip, setActiveChip] = useState<string | null>(null)
  const [videos, setVideos] = useState<EnrichedVideo[]>([])
  const [photos, setPhotos] = useState<PexelsPhoto[]>([])
  const [loading, setLoading] = useState(false)
  const [savedVideoIds, setSavedVideoIds] = useState<Set<string>>(new Set())
  const [savedPhotoIds, setSavedPhotoIds] = useState<Set<number>>(new Set())
  const [playingVideo, setPlayingVideo] = useState<EnrichedVideo | null>(null)
  const [playingIndex, setPlayingIndex] = useState<number>(-1)
  const [, setCurrentSearchQuery] = useState<string>('')
  const [viewMode, setViewMode] = useState<ViewMode>('recommended')
  const [includeRejected, setIncludeRejected] = useState(false)
  const [autoResultsOpen, setAutoResultsOpen] = useState(true)

  const currentCat = PROGRAM_CATEGORIES[activeCat]

  const filterByViewMode = (list: EnrichedVideo[]): EnrichedVideo[] => {
    let result = includeRejected ? list : list.filter((v) => v.status !== 'rejected')
    if (viewMode === 'strict') {
      result = result.filter((v) => v.status === 'good_reference')
    } else if (viewMode === 'recommended') {
      const strong = result.filter((v) => v.status === 'good_reference' || v.status === 'adaptable')
      result = strong.length > 0 ? strong : result
    }
    return result
  }

  const filteredVideos = filterByViewMode(videos)
  const isFallback = filteredVideos.length === 0 && videos.length > 0
  const displayVideos = isFallback ? videos.slice(0, 5) : filteredVideos

  const fetchVideos = async (catIndex: number, chipQuery: string | null) => {
    setLoading(true)
    setVideos([])
    const cat = PROGRAM_CATEGORIES[catIndex]
    const config = PROGRAM_CONFIGS[cat.key]
    const query = chipQuery ?? config?.searchQueries[0] ?? cat.label
    setCurrentSearchQuery(query)
    try {
      const raw = await searchYouTube(query, 20)
      const enriched: EnrichedVideo[] = raw
        .filter((v) => parseDuration(v.duration) <= 90)
        .map((v) => {
          const programFitScore = calcProgramFitScore(v.title, v.description, v.tags, cat.key)
          const smccMoodScore = calcSmccMoodScore(v.title, v.description, v.tags)
          const contentStructureScore = calcContentStructureScore(v.title, v.description, v.likeCount, v.viewCount)
          const growthPotentialScore = calcGrowthPotentialNew(v.viewCount, v.subscriberCount, v.publishedAt)
          const cringeRiskScore = calcCringeRiskNew(v.title, v.description, cat.key)
          const finalScore = calcFinalScore({ programFitScore, smccMoodScore, contentStructureScore, growthPotentialScore, cringeRiskScore })
          const hardRejected = isHardRejected(v.title, v.description)
          const status = classifyStatus({ finalScore, cringeRiskScore }, hardRejected)
          const { whyRecommended, smccApplyPoint } = generateReasonTexts(v, cat.key, { programFitScore, smccMoodScore })
          const lowScoreReason = status === 'weak_match' || status === 'rejected'
            ? generateLowScoreReason({ programFitScore, smccMoodScore, cringeRiskScore })
            : ''
          return { ...v, programFitScore, smccMoodScore, contentStructureScore, growthPotentialScore, cringeRiskScore, finalScore, whyRecommended, smccApplyPoint, lowScoreReason, sourceQuery: query, status }
        })

      enriched.sort((a, b) => b.finalScore - a.finalScore)
      setVideos(enriched)
    } catch {
      setVideos([])
    } finally {
      setLoading(false)
    }
  }

  const fetchImages = async (catIndex: number) => {
    setLoading(true)
    setPhotos([])
    const cat = PROGRAM_CATEGORIES[catIndex]
    const config = PROGRAM_CONFIGS[cat.key]
    setCurrentSearchQuery(config?.pexelsQuery ?? cat.label)
    try {
      const results = await searchPexelsByProgram(cat.key)
      setPhotos(results)
    } catch {
      setPhotos([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!autoResultsOpen) return
    if (mode === 'video') fetchVideos(activeCat, activeChip)
    else fetchImages(activeCat)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, activeCat, activeChip, autoResultsOpen])

  const handleChipClick = (query: string | null) => {
    setActiveChip(query)
  }

  const handleCatChange = (i: number) => {
    setActiveCat(i)
    setActiveChip(null)
  }

  const handleSaveVideo = async (video: EnrichedVideo, programKey: string) => {
    await createReference.mutateAsync({
      url: `https://www.youtube.com/watch?v=${video.id}`,
      title: video.title,
      platform: 'youtube',
      content_format: 'video',
      program_type: programKey as any,
      thumbnail_url: video.thumbnail,
      tags: video.tags.slice(0, 5),
      brand_fit_score: video.programFitScore,
      cringe_risk_score: video.cringeRiskScore,
      growth_potential_score: video.growthPotentialScore,
    })
    setSavedVideoIds((prev) => new Set(prev).add(video.id))
  }

  const handleSaveVideoAsMood = async (video: EnrichedVideo) => {
    await createReference.mutateAsync({
      url: `https://www.youtube.com/watch?v=${video.id}`,
      title: video.title,
      platform: 'youtube',
      content_format: 'video',
      thumbnail_url: video.thumbnail,
      tags: ['visual_mood_reference'],
    })
    setSavedVideoIds((prev) => new Set(prev).add(video.id))
  }

  const handleSavePhoto = async (photo: PexelsPhoto) => {
    await createReference.mutateAsync({
      url: photo.url,
      title: photo.alt || `Pexels 이미지 by ${photo.photographer}`,
      platform: 'website',
      content_format: 'feed_image',
      thumbnail_url: photo.src.medium,
      tags: ['visual_mood_reference'],
    })
    setSavedPhotoIds((prev) => new Set(prev).add(photo.id))
  }

  return (
    <div className="p-8">
      <div className="flex items-start justify-between mb-2">
        <PageHeader
          title="Discover"
          description="SMCC에 맞는 레퍼런스를 직접 찾고 저장하세요."
        />
      </div>
      <p className="text-xs text-[#9ca3af] mb-6">
        자동 결과는 참고용입니다. 좋은 레퍼런스는 직접 고르고, 앱은 정리와 판단을 도와줍니다. Instagram/TikTok/Pinterest에서 찾은 링크를 붙여넣어 저장할 수 있어요.
      </p>

      {/* 카테고리 탭 */}
      <div className="flex gap-2 mb-4 flex-wrap">
        {PROGRAM_CATEGORIES.map((cat, i) => (
          <button
            key={cat.key}
            onClick={() => handleCatChange(i)}
            className={cn('flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-colors',
              activeCat === i
                ? 'bg-[#00b1cd] text-white'
                : 'bg-white border border-[#e5e7eb] text-[#4D7F95] hover:border-[#00b1cd] hover:text-[#00b1cd]')}
          >
            <span>{cat.emoji}</span>{cat.label}
          </button>
        ))}
      </div>

      {/* 프로그램 설명 */}
      <p className="text-sm text-[#4D7F95] mb-4">
        {PROGRAM_GUIDES[currentCat.key]?.description}
      </p>

      {/* 찾아야 할 / 피해야 할 레퍼런스 */}
      <ProgramGuidePanel programKey={currentCat.key} />

      {/* 검색어 Chip + 외부 검색 */}
      <div className="rounded-xl border border-[#e5e7eb] bg-white p-5 mb-5 space-y-4">
        <div>
          <p className="text-xs font-semibold text-[#0B3558] mb-2">검색어로 빠르게 찾기</p>
          <SearchChips
            programKey={currentCat.key}
            activeChip={activeChip}
            onChipClick={handleChipClick}
          />
        </div>
        <div>
          <p className="text-xs font-semibold text-[#0B3558] mb-2">외부에서 검색하기</p>
          <ExternalSearch query={activeChip ?? PROGRAM_CONFIGS[currentCat.key]?.searchQueries[0] ?? currentCat.label} />
        </div>
      </div>

      {/* 직접 URL 저장 */}
      <div className="rounded-xl border-2 border-[#00b1cd]/30 bg-[#e6f7fa]/40 p-5 mb-6">
        <div className="flex items-center gap-1.5 mb-3">
          <Sparkles size={15} className="text-[#00b1cd]" />
          <p className="text-sm font-semibold text-[#0B3558]">직접 찾은 레퍼런스 저장하기</p>
        </div>
        <QuickSaveForm programKey={currentCat.key} onSaved={() => {}} />
      </div>

      {/* 보조 자동 검색 결과 */}
      <div className="rounded-xl border border-[#e5e7eb] bg-white">
        <button
          onClick={() => setAutoResultsOpen((v) => !v)}
          className="w-full flex items-center justify-between px-5 py-4"
        >
          <div className="text-left">
            <p className="text-sm font-semibold text-[#0B3558]">자동 후보 결과</p>
            <p className="text-xs text-[#9ca3af] mt-0.5">
              자동 검색 결과는 참고용입니다. 실제 저장할 레퍼런스는 Instagram/TikTok/Pinterest/웹에서 직접 찾는 것을 권장합니다.
            </p>
          </div>
          {autoResultsOpen ? <ChevronUp size={18} className="text-[#4D7F95]" /> : <ChevronDown size={18} className="text-[#4D7F95]" />}
        </button>

        {autoResultsOpen && (
          <div className="px-5 pb-5 border-t border-[#e5e7eb] pt-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex rounded-xl bg-[#f3f4f6] p-1 w-fit">
                {(['video', 'image'] as const).map((m) => (
                  <button
                    key={m}
                    onClick={() => { setMode(m); setActiveChip(null) }}
                    className={cn('px-5 py-2 rounded-lg text-sm font-medium transition-colors',
                      mode === m ? 'bg-white text-[#0B3558] shadow-sm' : 'text-[#4D7F95] hover:text-[#0B3558]')}
                  >
                    {m === 'video' ? '🎬 쇼츠' : '🖼️ 이미지'}
                  </button>
                ))}
              </div>
              <button
                onClick={() => mode === 'video' ? fetchVideos(activeCat, activeChip) : fetchImages(activeCat)}
                disabled={loading}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-[#e5e7eb] text-sm text-[#4D7F95] hover:border-[#00b1cd] hover:text-[#00b1cd] transition-colors disabled:opacity-40"
              >
                <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
                새로고침
              </button>
            </div>

            {/* View Mode + Rejected 토글 (video mode only) */}
            {mode === 'video' && (
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <div className="flex rounded-lg bg-[#f3f4f6] p-1">
                  {(['recommended', 'broad', 'strict'] as ViewMode[]).map((vm) => (
                    <button
                      key={vm}
                      onClick={() => setViewMode(vm)}
                      className={cn('px-3 py-1.5 rounded-md text-xs font-medium transition-colors',
                        viewMode === vm ? 'bg-white text-[#0B3558] shadow-sm' : 'text-[#4D7F95] hover:text-[#0B3558]')}
                    >
                      {VIEW_MODE_LABELS[vm]}
                    </button>
                  ))}
                </div>
                <label className="flex items-center gap-1.5 text-xs text-[#4D7F95] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeRejected}
                    onChange={(e) => setIncludeRejected(e.target.checked)}
                    className="rounded border-[#e5e7eb] text-[#00b1cd] focus:ring-[#00b1cd]"
                  />
                  Rejected 포함
                </label>
              </div>
            )}

            {/* Pexels notice (image mode) */}
            {mode === 'image' && (
              <div className="mb-5 px-4 py-3 bg-[#f0fdf4] border border-[#bbf7d0] rounded-xl">
                <p className="text-xs text-[#166534]">
                  🖼️ 이미지는 비주얼 무드 참고용이에요. 저장 시 'visual_mood_reference' 태그가 자동 추가됩니다.
                </p>
              </div>
            )}

            {/* Loading */}
            {loading && (
              <div className="flex flex-col items-center justify-center py-24 gap-3">
                <Loader2 size={32} className="animate-spin text-[#00b1cd]" />
                <p className="text-sm text-[#4D7F95]">
                  {mode === 'video'
                    ? `${PROGRAM_LABEL_KO[currentCat.key] ?? currentCat.label} 관련 콘텐츠를 SMCC 기준으로 분석 중...`
                    : '이미지 레퍼런스 불러오는 중...'}
                </p>
              </div>
            )}

            {/* Video grid */}
            {!loading && mode === 'video' && displayVideos.length > 0 && (
              <>
                {isFallback && (
                  <p className="text-sm text-[#4D7F95] mb-4">
                    엄격한 기준에 딱 맞는 결과는 적지만, 아래 후보를 검토해볼 수 있어요.
                  </p>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {displayVideos.map((v, idx) => (
                    <VideoCard
                      key={v.id}
                      video={v}
                      onPlay={() => { setPlayingVideo(v); setPlayingIndex(idx) }}
                      onSave={() => handleSaveVideo(v, currentCat.key)}
                      onSaveAsMood={() => handleSaveVideoAsMood(v)}
                      saved={savedVideoIds.has(v.id)}
                    />
                  ))}
                </div>
              </>
            )}

            {/* Image grid */}
            {!loading && mode === 'image' && photos.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {photos.map((p) => (
                  <ImageCard key={p.id} photo={p} onSave={() => handleSavePhoto(p)} saved={savedPhotoIds.has(p.id)} />
                ))}
              </div>
            )}

            {/* Empty state */}
            {!loading && mode === 'video' && displayVideos.length === 0 && (
              <div className="text-center py-20">
                <p className="text-2xl mb-3">🔍</p>
                <p className="text-sm text-[#4D7F95] whitespace-pre-line">
                  {`검색 결과가 없어요.\n검색어 Chip을 바꾸거나 외부 검색을 이용해보세요.`}
                </p>
              </div>
            )}

            {!loading && mode === 'image' && photos.length === 0 && (
              <div className="text-center py-20">
                <p className="text-2xl mb-3">😅</p>
                <p className="text-sm text-[#4D7F95]">이미지를 불러오지 못했어요. 새로고침을 눌러주세요.</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Video Modal */}
      {playingVideo && (
        <VideoModal
          video={playingVideo}
          onClose={() => setPlayingVideo(null)}
          hasPrev={playingIndex > 0}
          hasNext={playingIndex < displayVideos.length - 1}
          onPrev={() => {
            const idx = playingIndex - 1
            setPlayingIndex(idx)
            setPlayingVideo(displayVideos[idx])
          }}
          onNext={() => {
            const idx = playingIndex + 1
            setPlayingIndex(idx)
            setPlayingVideo(displayVideos[idx])
          }}
          onSave={() => handleSaveVideo(playingVideo, currentCat.key)}
          saved={savedVideoIds.has(playingVideo.id)}
        />
      )}
    </div>
  )
}
