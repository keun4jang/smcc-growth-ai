import { cn } from '@/lib/utils'
import type { PlatformType, ContentFormatType } from '@/types'
import { PLATFORM_LABELS, FORMAT_LABELS } from '@/types'

const PLATFORM_COLORS: Record<PlatformType, string> = {
  instagram: 'bg-[#FDEAEA] text-[#C2185B]',
  tiktok: 'bg-[#f3f4f6] text-[#0B3558]',
  youtube: 'bg-[#FEECEC] text-[#C62828]',
  pinterest: 'bg-[#FDE8F5] text-[#9C27B0]',
  website: 'bg-[#E3F2FD] text-[#1565C0]',
  other: 'bg-[#E8F5E9] text-[#2E7D32]',
}

const FORMAT_COLORS: Record<ContentFormatType, string> = {
  reels: 'bg-[#FDEAEA] text-[#C2185B]',
  shorts: 'bg-[#FEECEC] text-[#C62828]',
  carousel: 'bg-[#FDE8F5] text-[#9C27B0]',
  feed_image: 'bg-[#FFF0E6] text-[#E65100]',
  story: 'bg-[#F3E8FF] text-[#6D28D9]',
  video: 'bg-[#f3f4f6] text-[#0B3558]',
  article: 'bg-[#E3F2FD] text-[#1565C0]',
  design: 'bg-[#E8F5E9] text-[#2E7D32]',
}

interface PlatformBadgeProps {
  platform: PlatformType
  format?: ContentFormatType
  size?: 'sm' | 'md'
}

export function PlatformBadge({ platform, format, size = 'sm' }: PlatformBadgeProps) {
  const label = format ? FORMAT_LABELS[format] : PLATFORM_LABELS[platform]
  const colorClass = format ? FORMAT_COLORS[format] : PLATFORM_COLORS[platform]

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-md font-medium',
        size === 'sm' ? 'px-2 py-0.5 text-[17px]' : 'px-2.5 py-1 text-sm',
        colorClass
      )}
    >
      {label}
    </span>
  )
}
