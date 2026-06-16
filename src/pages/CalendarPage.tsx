import { ChevronLeft, ChevronRight, Plus } from 'lucide-react'
import { useState } from 'react'
import { PageHeader } from '@/components/common/PageHeader'

function getWeekDates(baseDate: Date) {
  const day = baseDate.getDay()
  const monday = new Date(baseDate)
  monday.setDate(baseDate.getDate() - ((day + 6) % 7))
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday)
    d.setDate(monday.getDate() + i)
    return d
  })
}

const DAY_LABELS = ['월', '화', '수', '목', '금', '토', '일']

export function CalendarPage() {
  const [baseDate, setBaseDate] = useState(new Date())
  const week = getWeekDates(baseDate)

  const moveWeek = (dir: number) => {
    const next = new Date(baseDate)
    next.setDate(baseDate.getDate() + dir * 7)
    setBaseDate(next)
  }

  const weekLabel = `${week[0].getMonth() + 1}월 ${Math.ceil(week[0].getDate() / 7)}주차`

  return (
    <div className="p-8">
      <PageHeader
        title="Content Calendar"
        description="주간 콘텐츠를 계획하고 관리하세요."
      />

      {/* 주간 네비게이션 */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => moveWeek(-1)}
          className="p-1.5 rounded-lg hover:bg-[#f3f4f6] text-[#4D7F95] transition-colors"
        >
          <ChevronLeft size={18} />
        </button>
        <span className="text-sm font-semibold text-[#0B3558] min-w-[100px] text-center">
          {weekLabel}
        </span>
        <button
          onClick={() => moveWeek(1)}
          className="p-1.5 rounded-lg hover:bg-[#f3f4f6] text-[#4D7F95] transition-colors"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      {/* 캘린더 그리드 */}
      <div className="grid grid-cols-7 gap-3">
        {week.map((date, i) => {
          const isToday = date.toDateString() === new Date().toDateString()
          return (
            <div key={i} className="min-h-[180px]">
              <div className="text-center mb-2">
                <p className="text-xs text-[#9ca3af]">{DAY_LABELS[i]}</p>
                <p className={`text-sm font-medium mt-0.5 w-7 h-7 mx-auto flex items-center justify-center rounded-full ${
                  isToday ? 'bg-[#00b1cd] text-white' : 'text-[#0B3558]'
                }`}>
                  {date.getDate()}
                </p>
              </div>
              <div className="bg-white rounded-xl border-2 border-dashed border-[#e5e7eb] h-36 flex flex-col items-center justify-center gap-1 hover:border-[#9FC6C8] transition-colors group cursor-pointer">
                <Plus size={14} className="text-[#9ca3af] group-hover:text-[#00b1cd] transition-colors" />
                <span className="text-[15px] text-[#9ca3af] group-hover:text-[#00b1cd] transition-colors">추가</span>
              </div>
            </div>
          )
        })}
      </div>

      {/* 상태 범례 */}
      <div className="flex items-center gap-4 mt-6">
        {[
          { label: 'Draft', color: 'bg-[#f3f4f6]' },
          { label: 'Scheduled', color: 'bg-[#e6f7fa]' },
          { label: 'Published', color: 'bg-[#D1FAE5]' },
          { label: 'Need Metrics', color: 'bg-[#FEF3C7]' },
        ].map(({ label, color }) => (
          <div key={label} className="flex items-center gap-1.5">
            <div className={`w-3 h-3 rounded-sm ${color}`} />
            <span className="text-xs text-[#4D7F95]">{label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
