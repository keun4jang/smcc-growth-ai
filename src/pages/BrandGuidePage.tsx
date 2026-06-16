import { PageHeader } from '@/components/common/PageHeader'

const PALETTE = [
  { name: 'SMCC Blue', hex: '#00b1cd', label: 'Primary' },
  { name: 'Morning Peach', hex: '#F8DEC2', label: 'Warm Surface' },
  { name: 'Warm Sand', hex: '#FFC982', label: 'Secondary' },
  { name: 'Golden Hour', hex: '#FDB334', label: 'Highlight' },
  { name: 'Sunrise', hex: '#FF7048', label: 'Warning' },
  { name: 'Deep Rose', hex: '#F43F55', label: 'Danger' },
  { name: 'Deep Plum', hex: '#51334F', label: 'Accent' },
  { name: 'Navy', hex: '#0B3558', label: 'Text Primary' },
  { name: 'Steel Blue', hex: '#4D7F95', label: 'Text Secondary' },
  { name: 'Mist', hex: '#9FC6C8', label: 'Border' },
  { name: 'Sage', hex: '#C7D8D2', label: 'Subtle' },
]

const GOOD_KEYWORDS = [
  '아침 루틴', '건강한 변화', '자기 주도적', '부담 없는 시작',
  '꾸준함', '커뮤니티', '도시적 웰니스', '조용한 참여',
]

const BAD_KEYWORDS = [
  '상위 1% 습관', '인생이 바뀐다', '안 오면 손해',
  '성공 공식', '인싸 강요', '불안감 조장',
]

export function BrandGuidePage() {
  return (
    <div className="p-8 max-w-4xl">
      <PageHeader title="Brand Guide" description="SMCC 콘텐츠의 방향과 기준을 확인하세요." />

      {/* 핵심 문장 */}
      <div className="bg-[#0B3558] rounded-2xl p-10 mb-8 text-white">
        <p className="text-xs text-[#9FC6C8] uppercase tracking-widest mb-4">Brand Philosophy</p>
        <h2 className="text-2xl font-bold leading-relaxed">
          SMCC는 커피를 파는 곳이 아니다.<br />
          아침을 시작하는 사람들이 모이는 곳이다.
        </h2>
        <p className="text-[#9FC6C8] mt-4 text-sm leading-relaxed">
          변화는 거창하지 않아도 된다.<br />
          오늘 아침, 여기서, 한 걸음.
        </p>
      </div>

      {/* 컬러 팔레트 */}
      <div className="bg-white rounded-xl border border-[#e5e7eb] p-6 mb-6">
        <h3 className="text-sm font-semibold text-[#0B3558] mb-4">Brand Color Palette</h3>
        <div className="flex flex-wrap gap-3">
          {PALETTE.map(({ name, hex, label }) => (
            <div key={hex} className="flex flex-col items-center gap-1.5">
              <div
                className="w-12 h-12 rounded-xl shadow-sm border border-black/5"
                style={{ backgroundColor: hex }}
              />
              <p className="text-[15px] text-[#0B3558] font-medium text-center">{name}</p>
              <p className="text-[14px] text-[#9ca3af] text-center">{hex}</p>
              <p className="text-[14px] text-[#4D7F95] text-center">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 표현 가이드 */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-[#e5e7eb] p-5">
          <h3 className="text-sm font-semibold text-[#0B3558] mb-3 flex items-center gap-1.5">
            <span className="text-[#10b981]">✓</span> 권장 표현
          </h3>
          <div className="flex flex-wrap gap-2">
            {GOOD_KEYWORDS.map((kw) => (
              <span key={kw} className="px-2.5 py-1 rounded-full text-xs bg-[#e6f7fa] text-[#00899e] font-medium">
                {kw}
              </span>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-xl border border-[#e5e7eb] p-5">
          <h3 className="text-sm font-semibold text-[#0B3558] mb-3 flex items-center gap-1.5">
            <span className="text-[#F43F55]">✕</span> 금지 표현
          </h3>
          <div className="flex flex-wrap gap-2">
            {BAD_KEYWORDS.map((kw) => (
              <span key={kw} className="px-2.5 py-1 rounded-full text-xs bg-[#FEE2E2] text-[#991B1B] font-medium">
                {kw}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 점수 기준 */}
      <div className="bg-white rounded-xl border border-[#e5e7eb] p-6">
        <h3 className="text-sm font-semibold text-[#0B3558] mb-4">점수 기준</h3>
        <div className="grid grid-cols-3 gap-4">
          {[
            {
              title: 'Brand Fit Score',
              color: '#00b1cd',
              desc: 'SMCC 브랜드 철학과 얼마나 일치하는지. 건강한 변화, 아침 루틴, 커뮤니티 중심일수록 높아요.',
            },
            {
              title: 'Cringe Risk Score',
              color: '#F43F55',
              desc: '짜침 위험도. 낮을수록 안전해요. 자극적 성공팔이, 불안감 조장, 인싸 강요가 있으면 높아져요.',
            },
            {
              title: 'Growth Potential',
              color: '#FDB334',
              desc: '팔로워 증가 가능성. 저장 가치, 공유 유발, 프로필 방문 유도, 댓글 유도가 높으면 높아요.',
            },
          ].map(({ title, color, desc }) => (
            <div key={title} className="p-4 rounded-lg border border-[#e5e7eb]">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
                <p className="text-xs font-semibold text-[#0B3558]">{title}</p>
              </div>
              <p className="text-xs text-[#4D7F95] leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
