import { useState, useEffect } from 'react'
import { Loader2, CheckCircle } from 'lucide-react'
import { PageHeader } from '@/components/common/PageHeader'
import { useAuth } from '@/hooks/useAuth'
import { supabase } from '@/lib/supabase'

export function SettingsPage() {
  const { user } = useAuth()
  const [currentFollowers, setCurrentFollowers] = useState('')
  const [targetFollowers, setTargetFollowers] = useState('')
  const [loading, setLoading] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!user) return
    supabase
      .from('profiles')
      .select('current_followers, target_followers')
      .eq('id', user.id)
      .single()
      .then(({ data }) => {
        if (data) {
          setCurrentFollowers(data.current_followers ? String(data.current_followers) : '')
          setTargetFollowers(data.target_followers ? String(data.target_followers) : '')
        }
      })
  }, [user])

  const handleSave = async () => {
    if (!user) return
    setLoading(true)
    setError(null)
    setSaved(false)

    const { error } = await supabase
      .from('profiles')
      .update({
        current_followers: Number(currentFollowers) || 0,
        target_followers: Number(targetFollowers) || 0,
      })
      .eq('id', user.id)

    setLoading(false)
    if (error) {
      setError(`저장 중 오류가 발생했어요. (${error.message})`)
    } else {
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    }
  }

  return (
    <div className="p-8 max-w-xl">
      <PageHeader title="Settings" />

      {/* 계정 정보 */}
      <div className="bg-white rounded-xl border border-[#e5e7eb] p-6 mb-4">
        <h3 className="text-sm font-semibold text-[#0B3558] mb-4">계정 정보</h3>
        <div>
          <label className="block text-xs text-[#4D7F95] mb-1">이메일</label>
          <p className="text-sm text-[#0B3558]">{user?.email ?? '—'}</p>
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
              value={currentFollowers}
              onChange={(e) => setCurrentFollowers(e.target.value)}
              placeholder="예: 1200"
              className="w-full px-3.5 py-2.5 rounded-lg border border-[#e5e7eb] bg-[#f9fafb] text-sm text-[#0B3558] outline-none focus:border-[#00b1cd] focus:ring-2 focus:ring-[#e6f7fa] transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-[#0B3558] mb-1.5">목표 팔로워 수</label>
            <input
              type="number"
              value={targetFollowers}
              onChange={(e) => setTargetFollowers(e.target.value)}
              placeholder="예: 5000"
              className="w-full px-3.5 py-2.5 rounded-lg border border-[#e5e7eb] bg-[#f9fafb] text-sm text-[#0B3558] outline-none focus:border-[#00b1cd] focus:ring-2 focus:ring-[#e6f7fa] transition-colors"
            />
          </div>

          {error && <p className="text-sm text-[#F43F55]">{error}</p>}

          <button
            onClick={handleSave}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 bg-[#00b1cd] text-white text-sm font-medium rounded-lg hover:bg-[#008fa6] disabled:opacity-60 transition-colors"
          >
            {loading && <Loader2 size={14} className="animate-spin" />}
            {saved && <CheckCircle size={14} />}
            {saved ? '저장됨' : '저장'}
          </button>
        </div>
      </div>
    </div>
  )
}
