import { Users, Library, CalendarDays, TrendingUp } from 'lucide-react'
import { PageHeader } from '@/components/common/PageHeader'
import { useAuth } from '@/hooks/useAuth'

function StatCard({ label, value, sub, icon: Icon }: {
  label: string
  value: string
  sub?: string
  icon: typeof Users
}) {
  return (
    <div className="bg-white rounded-xl border border-[#e5e7eb] p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-[#4D7F95] mb-1">{label}</p>
          <p className="text-2xl font-bold text-[#0B3558]">{value}</p>
          {sub && <p className="text-xs text-[#9ca3af] mt-0.5">{sub}</p>}
        </div>
        <div className="w-9 h-9 rounded-lg bg-[#e6f7fa] flex items-center justify-center">
          <Icon size={16} className="text-[#00b1cd]" />
        </div>
      </div>
    </div>
  )
}

export function DashboardPage() {
  const { user } = useAuth()
  const hour = new Date().getHours()
  const greeting = hour < 12 ? '좋은 아침이에요' : hour < 18 ? '좋은 오후예요' : '좋은 저녁이에요'

  return (
    <div className="p-8">
      <PageHeader
        title={greeting + ' ☀️'}
        description="오늘의 콘텐츠 작업을 시작해볼까요?"
      />

      {/* 통계 카드 */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          label="현재 팔로워"
          value="—"
          sub="Settings에서 입력해주세요"
          icon={Users}
        />
        <StatCard
          label="저장된 레퍼런스"
          value="0"
          sub="이번 달"
          icon={Library}
        />
        <StatCard
          label="이번 주 콘텐츠"
          value="0"
          sub="예정된 콘텐츠"
          icon={CalendarDays}
        />
        <StatCard
          label="평균 Brand Fit"
          value="—"
          sub="최근 콘텐츠 기준"
          icon={TrendingUp}
        />
      </div>

      {/* 이번 주 캘린더 미리보기 */}
      <div className="bg-white rounded-xl border border-[#e5e7eb] p-5 mb-6">
        <h2 className="text-sm font-semibold text-[#0B3558] mb-4">이번 주 콘텐츠</h2>
        <div className="grid grid-cols-7 gap-2">
          {['월', '화', '수', '목', '금', '토', '일'].map((day) => (
            <div key={day} className="text-center">
              <p className="text-xs text-[#9ca3af] mb-2">{day}</p>
              <div className="h-16 rounded-lg border-2 border-dashed border-[#e5e7eb] flex items-center justify-center">
                <span className="text-[11px] text-[#9ca3af]">비어있음</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 최근 레퍼런스 */}
      <div className="bg-white rounded-xl border border-[#e5e7eb] p-5">
        <h2 className="text-sm font-semibold text-[#0B3558] mb-4">최근 저장된 레퍼런스</h2>
        <div className="text-center py-8">
          <p className="text-sm text-[#9ca3af]">아직 저장된 레퍼런스가 없어요.</p>
          <a
            href="/references"
            className="inline-block mt-3 text-sm text-[#00b1cd] font-medium hover:underline"
          >
            첫 레퍼런스 저장하기 →
          </a>
        </div>
      </div>

      {user && (
        <p className="text-xs text-[#9ca3af] mt-6 text-right">{user.email}</p>
      )}
    </div>
  )
}
