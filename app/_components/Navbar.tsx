'use client'

import { NotificationDropdown } from "./NotificationDropdown"
import { signIn, signOut, useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { LogIn, LogOut, Menu, X } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { Logo } from "@/components/logo"

export function Navbar() {
  const { data: session } = useSession()
  const [isMenuOpen, setIsMenuOpen ] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleSignOut = () => {
    signOut()
  }

  const handleSignIn = () => {
    signIn()
  }

  return (
    <header className="border-b bg-white">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Logo />
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/freelas" className="text-gray-600 hover:text-gray-900">
              Freelas
            </Link>
            {session ? (
              <>
                <Link href="/dashboard" className="text-gray-600 hover:text-gray-900">
                  Dashboard
                </Link>
                <NotificationDropdown />
                <Button variant="ghost" size="icon" onClick={handleSignOut}>
                  <LogOut className="h-5 w-5" />
                </Button>
              </>
            ) : (
              <>
                <Link href="/auth/signin" className="bg-sky-500 hover:bg-sky-600 duration-300 easing-in-out text-white px-4 py-2 rounded">
                  Login
                </Link>
              </>
            )}
          </div>
          <div className="md:hidden">
            <Button variant="ghost" onClick={toggleMenu}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="flex flex-col py-2 pt-2 pb-3 space-y-1 sm:py-3">
              <Link href="/freelas" className="text-gray-600 hover:text-gray-900">
                Freelas
              </Link>
              {session ? (
                <>
                  <Link href="/dashboard" className="text-gray-600 hover:text-gray-900">
                    Dashboard
                  </Link>
                  <NotificationDropdown />
                  <Button variant="ghost" size="icon" onClick={handleSignOut}>
                    <LogOut className="h-5 w-5" />
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/auth/signin" className="bg-sky-500 hover:bg-sky-600 duration-300 easing-in-out text-white px-4 py-2 rounded">
                    Login
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  )
} 