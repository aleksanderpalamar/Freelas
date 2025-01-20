import { ReactNode } from 'react'
import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { LayoutDashboard, User, Settings } from 'lucide-react'

interface DashboardLayoutProps {
  children: ReactNode
}

export default async function DashboardLayout({ children }: DashboardLayoutProps) {
  const session = await getServerSession()

  if (!session) {
    redirect('/signin')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-8">
          {/* Sidebar Navigation */}
          <aside className="bg-white shadow rounded-lg h-fit">
            <nav className="p-4 space-y-2">
              <Link
                href="/dashboard"
                className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              >
                <LayoutDashboard size={20} />
                <span>Overview</span>
              </Link>
              <Link
                href="/dashboard/profile"
                className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              >
                <User size={20} />
                <span>Profile</span>
              </Link>
              <Link
                href="/dashboard/account"
                className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              >
                <Settings size={20} />
                <span>Account Settings</span>
              </Link>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="bg-white shadow rounded-lg p-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}