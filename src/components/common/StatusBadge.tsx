import { cn } from '@/lib/utils'
import type { ReferenceStatus, ContentStatus } from '@/types'

type Status = ReferenceStatus | ContentStatus

const STATUS_STYLES: Record<string, string> = {
  // Reference Status
  Saved: 'bg-[#f3f4f6] text-[#4D7F95]',
  'Need Review': 'bg-[#FFF3D4] text-[#B07D00]',
  'Good Reference': 'bg-[#e6f7fa] text-[#00899e]',
  Adaptable: 'bg-[#EBF2F5] text-[#4D7F95]',
  Converted: 'bg-[#F0EAF5] text-[#51334F]',
  Used: 'bg-[#EDF3F0] text-[#3D7060]',
  // Content Status
  Draft: 'bg-[#f3f4f6] text-[#6b7280]',
  Review: 'bg-[#FFF3D4] text-[#B07D00]',
  Approved: 'bg-[#e6f7fa] text-[#00899e]',
  Scheduled: 'bg-[#EBF2F5] text-[#4D7F95]',
  Published: 'bg-[#D1FAE5] text-[#065F46]',
  'Need Metrics': 'bg-[#FEF3C7] text-[#92400E]',
  Analyzed: 'bg-[#F0EAF5] text-[#51334F]',
  // Shared
  Archived: 'bg-[#f3f4f6] text-[#9ca3af]',
  Rejected: 'bg-[#FEE2E2] text-[#991B1B]',
}

interface StatusBadgeProps {
  status: Status
  size?: 'sm' | 'md'
}

export function StatusBadge({ status, size = 'sm' }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full font-medium',
        size === 'sm' ? 'px-2 py-0.5 text-[11px]' : 'px-2.5 py-1 text-xs',
        STATUS_STYLES[status] ?? 'bg-gray-100 text-gray-600'
      )}
    >
      {status}
    </span>
  )
}
