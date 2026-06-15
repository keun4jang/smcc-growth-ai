import type { LucideIcon } from 'lucide-react'

interface EmptyStateProps {
  icon: LucideIcon
  title: string
  description: string
  action?: React.ReactNode
}

export function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-14 h-14 rounded-2xl bg-[#e6f7fa] flex items-center justify-center mb-4">
        <Icon size={24} className="text-[#00b1cd]" />
      </div>
      <h3 className="text-base font-semibold text-[#0B3558] mb-1">{title}</h3>
      <p className="text-sm text-[#4D7F95] mb-6 max-w-xs">{description}</p>
      {action}
    </div>
  )
}
