import { NavLink, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  Library,
  Lightbulb,
  CalendarDays,
  Sparkles,
  Settings,
  LogOut,
  Telescope,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useAuth } from '@/hooks/useAuth'

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/discover', icon: Telescope, label: 'Discover' },
  { to: '/references', icon: Library, label: 'References' },
  { to: '/ideas', icon: Lightbulb, label: 'Content Ideas' },
  { to: '/calendar', icon: CalendarDays, label: 'Calendar' },
  { to: '/brand', icon: Sparkles, label: 'Brand Guide' },
]

export function Sidebar() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    await signOut()
    navigate('/login')
  }

  return (
    <aside className="fixed inset-y-0 left-0 w-60 flex flex-col border-r border-[#e5e7eb] bg-white z-10">
      {/* 로고 */}
      <div className="px-5 py-4 border-b border-[#e5e7eb]">
        <img src="/smcc-logo.svg" alt="SMCC" className="h-8 w-auto" />
        <p className="text-[14px] text-[#4D7F95] mt-1 leading-tight">Growth Coach</p>
      </div>

      {/* 네비게이션 */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors',
                isActive
                  ? 'bg-[#e6f7fa] text-[#00b1cd] font-medium'
                  : 'text-[#4D7F95] hover:bg-[#f9fafb] hover:text-[#0B3558]'
              )
            }
          >
            <Icon size={16} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      {/* 하단 유저 */}
      <div className="border-t border-[#e5e7eb] px-3 py-3 space-y-0.5">
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            cn(
              'flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors',
              isActive
                ? 'bg-[#e6f7fa] text-[#00b1cd] font-medium'
                : 'text-[#4D7F95] hover:bg-[#f9fafb] hover:text-[#0B3558]'
            )
          }
        >
          <Settings size={16} />
          <span>Settings</span>
        </NavLink>

        <button
          onClick={handleSignOut}
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-[#4D7F95] hover:bg-[#f9fafb] hover:text-[#F43F55] transition-colors"
        >
          <LogOut size={16} />
          <span>로그아웃</span>
        </button>

        {user && (
          <div className="px-3 pt-2">
            <p className="text-[17px] text-[#9ca3af] truncate">{user.email}</p>
          </div>
        )}
        <div className="px-3 pb-1">
          <p className="text-[13px] text-[#d1d5db]">v{__APP_VERSION__}</p>
        </div>
      </div>
    </aside>
  )
}
