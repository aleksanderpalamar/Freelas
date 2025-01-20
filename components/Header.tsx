'use client'

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Logo } from './logo'

export const Header = () => {
  const { data: session } = useSession()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  const handleSignOut = () => {
    signOut()
  }

  return (
    <header className="bg-white shadow-md">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Logo />
          <div className="hidden md:flex items-center space-x-4">
            {session ? (
              <>
                <Link href="/freelas" className="text-zinc-600 hover:text-zinc-800">
                  Freelas
                </Link>
                <Link href="/dashboard" className="text-zinc-600 hover:text-zinc-800">
                  Dashboard
                </Link>
                <button
                  onClick={handleSignOut}
                  className="bg-sky-500 hover:bg-sky-600 duration-300 easing-in-out text-white px-4 py-2 rounded"
                >
                  Logout
                </button>
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
            <button onClick={toggleMenu} className="text-zinc-600 hover:text-zinc-800">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {session ? (
                <>
                  <Link href="/freelas" className="block text-zinc-600 hover:text-zinc-800 py-2">
                    Freelas
                  </Link>
                  <Link href="/dashboard" className="block text-zinc-600 hover:text-zinc-800 py-2">
                    Dashboard
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="block text-zinc-600 hover:text-zinc-800 py-2 w-full text-left"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link href="/auth/signin" className="block w-fit bg-sky-500 hover:bg-sky-600 duration-300 easing-in-out text-white px-4 py-2 rounded">
                    Sign In
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