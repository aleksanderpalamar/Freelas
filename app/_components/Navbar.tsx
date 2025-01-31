'use client'

import { NotificationDropdown } from "./NotificationDropdown"
import { signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import Link from "next/link"

export function Navbar() {
  return (
    <nav className="border-b bg-white">
      <div className="flex items-center justify-between max-w-7xl mx-auto px-4 h-16">
        <Link href="/" className="font-semibold text-xl">
          Freelas.com.br
        </Link>

        <div className="flex items-center gap-6">
          <Link href="/freelas" className="text-gray-600 hover:text-gray-900">
            Freelas
          </Link>
          <Link href="/dashboard" className="text-gray-600 hover:text-gray-900">
            Dashboard
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <NotificationDropdown />
          <Button variant="ghost" size="icon" onClick={() => signOut()}>
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </nav>
  )
} 