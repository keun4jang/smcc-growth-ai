import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AppLayout } from '@/components/layout/AppLayout'
import { LoginPage } from '@/pages/LoginPage'
import { DashboardPage } from '@/pages/DashboardPage'
import { ReferencesPage } from '@/pages/ReferencesPage'
import { ReferenceDetailPage } from '@/pages/ReferenceDetailPage'
import { IdeasPage } from '@/pages/IdeasPage'
import { CalendarPage } from '@/pages/CalendarPage'
import { AnalysisPage } from '@/pages/AnalysisPage'
import { BrandGuidePage } from '@/pages/BrandGuidePage'
import { SettingsPage } from '@/pages/SettingsPage'
import { DiscoverPage } from '@/pages/DiscoverPage'
import { ResourceHubPage } from '@/pages/ResourceHubPage'
import { useAuth } from '@/hooks/useAuth'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 1000 * 60 * 5 },
  },
})

function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fdf8f4] flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-[#00b1cd] border-t-transparent animate-spin" />
      </div>
    )
  }

  if (!user) return <Navigate to="/login" replace />
  return <>{children}</>
}

function AppRoutes() {
  useAuth()

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/"
        element={
          <AuthGuard>
            <AppLayout />
          </AuthGuard>
        }
      >
        <Route index element={<DashboardPage />} />
        <Route path="discover" element={<DiscoverPage />} />
        <Route path="resources" element={<ResourceHubPage />} />
        <Route path="references" element={<ReferencesPage />} />
        <Route path="references/:id" element={<ReferenceDetailPage />} />
        <Route path="analysis" element={<AnalysisPage />} />
        <Route path="ideas" element={<IdeasPage />} />
        <Route path="calendar" element={<CalendarPage />} />
        <Route path="brand" element={<BrandGuidePage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </QueryClientProvider>
  )
}
