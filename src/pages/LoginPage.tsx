import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Sparkles, Loader2 } from 'lucide-react'
import { supabase } from '@/lib/supabase'

export function LoginPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError('이메일 또는 비밀번호를 확인해주세요.')
      setLoading(false)
    } else {
      navigate('/')
    }
  }

  return (
    <div className="min-h-screen bg-[#fdf8f4] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* 로고 */}
        <div className="flex flex-col items-center mb-10">
          <div className="w-12 h-12 rounded-2xl bg-[#00b1cd] flex items-center justify-center mb-4 shadow-sm">
            <Sparkles size={22} className="text-white" />
          </div>
          <h1 className="text-xl font-bold text-[#0B3558]">SMCC Growth Coach</h1>
          <p className="text-sm text-[#4D7F95] mt-1">오늘 아침의 콘텐츠 작업실</p>
        </div>

        {/* 폼 */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#0B3558] mb-1.5">
              이메일
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="hello@smcc.kr"
              required
              className="w-full px-3.5 py-2.5 rounded-lg border border-[#e5e7eb] bg-white text-sm text-[#0B3558] placeholder-[#9ca3af] outline-none focus:border-[#00b1cd] focus:ring-2 focus:ring-[#e6f7fa] transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#0B3558] mb-1.5">
              비밀번호
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full px-3.5 py-2.5 rounded-lg border border-[#e5e7eb] bg-white text-sm text-[#0B3558] placeholder-[#9ca3af] outline-none focus:border-[#00b1cd] focus:ring-2 focus:ring-[#e6f7fa] transition-colors"
            />
          </div>

          {error && (
            <p className="text-sm text-[#F43F55]">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-[#00b1cd] text-white text-sm font-medium hover:bg-[#008fa6] disabled:opacity-60 transition-colors"
          >
            {loading && <Loader2 size={16} className="animate-spin" />}
            로그인
          </button>
        </form>

        <p className="text-center text-xs text-[#9ca3af] mt-8">
          SMCC 팀 내부 전용 서비스입니다.
        </p>
      </div>
    </div>
  )
}
