import { authOptions } from "@/lib/authOptions"
import { getServerSession } from "next-auth/next"
import { FreelasReceived } from "./_components/FreelasReceived"

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>
      <p className="text-gray-600">Welcome, {session?.user?.name || 'User'}!</p>
      <div className="w-full flex items-center border-t border-gray-200 mb-6 mt-6" />
      {/* Meus Freelas */}
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Propostas recebidas
      </h2>
      {/* Proposals list */}
      <FreelasReceived />
    </div>
  )
}