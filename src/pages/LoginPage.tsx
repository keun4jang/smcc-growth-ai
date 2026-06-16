import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Sparkles, Loader2, Eye, EyeOff } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { useAuthStore } from '@/store/authStore'
import { cn } from '@/lib/utils'

type Mode = 'login' | 'signup'

function translateError(message: string): string {
  if (message.includes('Invalid login credentials')) return '이메일 또는 비밀번호가 올바르지 않아요.'
  if (message.includes('Email not confirmed')) return '이메일 인증이 필요해요. 받은 인증 메일을 확인해주세요.'
  if (message.includes('User already registered')) return '이미 가입된 이메일이에요. 로그인해주세요.'
  if (message.includes('Password should be at least')) return '비밀번호는 6자 이상이어야 해요.'
  if (message.includes('Unable to validate email')) return '유효하지 않은 이메일 형식이에요.'
  if (message.includes('rate limit')) return '잠시 후 다시 시도해주세요.'
  return `오류가 발생했어요. 다시 시도해주세요. (${message})`
}

const INPUT_CLASS = 'w-full px-3.5 py-2.5 rounded-lg border border-[#e5e7eb] bg-white text-sm text-[#0B3558] placeholder-[#9ca3af] outline-none focus:border-[#00b1cd] focus:ring-2 focus:ring-[#e6f7fa] transition-colors'

export function LoginPage() {
  const navigate = useNavigate()
  const { user } = useAuthStore()

  // 이미 로그인된 경우 대시보드로
  if (user) {
    navigate('/', { replace: true })
    return null
  }

  const [mode, setMode] = useState<Mode>('login')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [signupDone, setSignupDone] = useState(false)

  const resetForm = () => {
    setName('')
    setEmail('')
    setPassword('')
    setPasswordConfirm('')
    setError(null)
    setSignupDone(false)
  }

  const switchMode = (m: Mode) => {
    setMode(m)
    resetForm()
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError(translateError(error.message))
      setLoading(false)
    } else {
      navigate('/')
    }
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!name.trim()) {
      setError('이름을 입력해주세요.')
      return
    }
    if (password !== passwordConfirm) {
      setError('비밀번호가 일치하지 않아요.')
      return
    }
    if (password.length < 6) {
      setError('비밀번호는 6자 이상이어야 해요.')
      return
    }

    setLoading(true)

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name: name.trim() },
      },
    })

    if (error) {
      setError(translateError(error.message))
      setLoading(false)
      return
    }

    // 이메일 인증이 꺼져 있으면 session이 바로 생성됨
    if (data.session) {
      navigate('/')
    } else {
      // 이메일 인증 필요
      setSignupDone(true)
      setLoading(false)
    }
  }

  // 회원가입 완료 (이메일 인증 대기) 화면
  if (signupDone) {
    return (
      <div className="min-h-screen bg-[#fdf8f4] flex items-center justify-center px-4">
        <div className="w-full max-w-sm text-center">
          <div className="w-14 h-14 rounded-2xl bg-[#e6f7fa] flex items-center justify-center mx-auto mb-5">
            <Sparkles size={24} className="text-[#00b1cd]" />
          </div>
          <h2 className="text-lg font-bold text-[#0B3558] mb-2">이메일을 확인해주세요</h2>
          <p className="text-sm text-[#4D7F95] leading-relaxed mb-6">
            <span className="font-medium text-[#0B3558]">{email}</span>로<br />
            인증 링크를 발송했어요.<br />
            메일함을 확인하고 인증 후 로그인해주세요.
          </p>
          <button
            onClick={() => switchMode('login')}
            className="text-sm text-[#00b1cd] font-medium hover:underline"
          >
            로그인 화면으로 돌아가기
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#fdf8f4] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* 로고 */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-[#00b1cd] flex items-center justify-center mb-4 shadow-sm">
            <Sparkles size={22} className="text-white" />
          </div>
          <h1 className="text-xl font-bold text-[#0B3558]">SMCC Growth Coach</h1>
          <p className="text-sm text-[#4D7F95] mt-1">오늘 아침의 콘텐츠 작업실</p>
        </div>

        {/* 탭 */}
        <div className="flex rounded-xl bg-[#f3f4f6] p-1 mb-6">
          {(['login', 'signup'] as Mode[]).map((m) => (
            <button
              key={m}
              onClick={() => switchMode(m)}
              className={cn(
                'flex-1 py-2 rounded-lg text-sm font-medium transition-colors',
                mode === m
                  ? 'bg-white text-[#0B3558] shadow-sm'
                  : 'text-[#4D7F95] hover:text-[#0B3558]'
              )}
            >
              {m === 'login' ? '로그인' : '회원가입'}
            </button>
          ))}
        </div>

        {/* 로그인 폼 */}
        {mode === 'login' && (
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-[#0B3558] mb-1.5">이메일</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="hello@smcc.kr"
                required
                className={INPUT_CLASS}
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#0B3558] mb-1.5">비밀번호</label>
              <div className="relative">
                <input
                  type={showPw ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className={cn(INPUT_CLASS, 'pr-10')}
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9ca3af] hover:text-[#4D7F95]"
                >
                  {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {error && <p className="text-sm text-[#F43F55]">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-[#00b1cd] text-white text-sm font-medium hover:bg-[#008fa6] disabled:opacity-60 transition-colors"
            >
              {loading && <Loader2 size={15} className="animate-spin" />}
              로그인
            </button>
          </form>
        )}

        {/* 회원가입 폼 */}
        {mode === 'signup' && (
          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-[#0B3558] mb-1.5">이름</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="홍길동"
                required
                className={INPUT_CLASS}
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#0B3558] mb-1.5">이메일</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="hello@smcc.kr"
                required
                className={INPUT_CLASS}
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#0B3558] mb-1.5">비밀번호</label>
              <div className="relative">
                <input
                  type={showPw ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="6자 이상"
                  required
                  className={cn(INPUT_CLASS, 'pr-10')}
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9ca3af] hover:text-[#4D7F95]"
                >
                  {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#0B3558] mb-1.5">비밀번호 확인</label>
              <input
                type={showPw ? 'text' : 'password'}
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                placeholder="비밀번호 재입력"
                required
                className={cn(
                  INPUT_CLASS,
                  passwordConfirm && password !== passwordConfirm
                    ? 'border-[#F43F55] focus:border-[#F43F55] focus:ring-[#FEE2E2]'
                    : ''
                )}
              />
              {passwordConfirm && password !== passwordConfirm && (
                <p className="text-xs text-[#F43F55] mt-1">비밀번호가 일치하지 않아요.</p>
              )}
            </div>

            {error && <p className="text-sm text-[#F43F55]">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-[#00b1cd] text-white text-sm font-medium hover:bg-[#008fa6] disabled:opacity-60 transition-colors"
            >
              {loading && <Loader2 size={15} className="animate-spin" />}
              회원가입
            </button>
          </form>
        )}

        <p className="text-center text-xs text-[#9ca3af] mt-8">
          SMCC 팀 내부 전용 서비스입니다.
        </p>
      </div>
    </div>
  )
}
