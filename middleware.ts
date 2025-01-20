import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    // If the user is not logged in and trying to access protected routes
    if (!req.nextauth.token && req.nextUrl.pathname.startsWith('/account')) {
      return NextResponse.redirect(new URL('/auth/signin', req.url))
    }
    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
)

export const config = {
  matcher: ['/account/:path*', '/dashboard/:path*']
}