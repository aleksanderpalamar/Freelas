import { getServerSession } from "next-auth/next"

export default async function DashboardPage() {
  const session = await getServerSession()

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>
      <p className="text-gray-600">Welcome back, {session?.user?.name || 'User'}!</p>
    </div>
  )
}