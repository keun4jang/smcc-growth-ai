import { PageHeader } from '@/components/common/PageHeader'
import { useAuth } from '@/hooks/useAuth'

export function SettingsPage() {
  const { user } = useAuth()

  return (
    <div className="p-8 max-w-xl">
      <PageHeader title="Settings" />

      {/* 계정 정보 */}
      <div className="bg-white rounded-xl border border-[#e5e7eb] p-6 mb-4">
        <h3 className="text-sm font-semibold text-[#0B3558] mb-4">계정 정보</h3>
        <div className="space-y-3">
          <div>
            <label className="block text-xs text-[#4D7F95] mb-1">이메일</label>
            <p className="text-sm text-[#0B3558]">{user?.email ?? '—'}</p>
          </div>
        </div>
      </div>

      {/* 팔로워 목표 */}
      <div className="bg-white rounded-xl border border-[#e5e7eb] p-6 mb-6">
        <h3 className="text-sm font-semibold text-[#0B3558] mb-4">팔로워 설정</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-[#0B3558] mb-1.5">현재 팔로워 수</label>
            <input
              type="number"
              placeholder="예: 1200"
              className="w-full px-3.5 py-2.5 rounded-lg border border-[#e5e7eb] bg-[#f9fafb] text-sm text-[#0B3558] outline-none focus:border-[#00b1cd] focus:ring-2 focus:ring-[#e6f7fa] transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-[#0B3558] mb-1.5">목표 팔로워 수</label>
            <input
              type="number"
              placeholder="예: 5000"
              className="w-full px-3.5 py-2.5 rounded-lg border border-[#e5e7eb] bg-[#f9fafb] text-sm text-[#0B3558] outline-none focus:border-[#00b1cd] focus:ring-2 focus:ring-[#e6f7fa] transition-colors"
            />
          </div>
          <button className="px-4 py-2 bg-[#00b1cd] text-white text-sm font-medium rounded-lg hover:bg-[#008fa6] transition-colors">
            저장
          </button>
        </div>
      </div>

      {/* Supabase 안내 */}
      <div className="bg-[#fdf8f4] rounded-xl border border-[#F8DEC2] p-4">
        <p className="text-xs text-[#4D7F95] leading-relaxed">
          💡 Supabase 연동 후 데이터가 저장됩니다. <code className="bg-[#F8DEC2] px-1 rounded">.env.example</code>을 참고해 환경변수를 설정해주세요.
        </p>
      </div>
    </div>
  )
}
