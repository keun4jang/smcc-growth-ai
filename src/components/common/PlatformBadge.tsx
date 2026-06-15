import { cn } from '@/lib/utils'
import type { ContentFormat } from '@/types'
import { CONTENT_FORMAT_LABELS } from '@/types'

const FORMAT_COLORS: Record<ContentFormat, string> = {
  instagram_reels: 'bg-[#FDEAEA] text-[#C2185B]',
  tiktok: 'bg-[#f3f4f6] text-[#0B3558]',
  instagram_carousel: 'bg-[#FDE8F5] text-[#9C27B0]',
  instagram_feed: 'bg-[#FFF0E6] text-[#E65100]',
  instagram_story: 'bg-[#F3E8FF] text-[#6D28D9]',
  youtube_shorts: 'bg-[#FEECEC] text-[#C62828]',
  article: 'bg-[#E3F2FD] text-[#1565C0]',
  design_reference: 'bg-[#E8F5E9] text-[#2E7D32]',
}

interface PlatformBadgeProps {
  platform: ContentFormat
  size?: 'sm' | 'md'
}

export function PlatformBadge({ platform, size = 'sm' }: PlatformBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-md font-medium',
        size === 'sm' ? 'px-2 py-0.5 text-[11px]' : 'px-2.5 py-1 text-xs',
        FORMAT_COLORS[platform] ?? 'bg-gray-100 text-gray-600'
      )}
    >
      {CONTENT_FORMAT_LABELS[platform]}
    </span>
  )
}
