import { DefaultSession, DefaultUser } from "next-auth"
import { JWT, DefaultJWT } from "next-auth/jwt"
import NextAuth from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      email: string | null
      name: string | null
      userType: string
      description: string | null
      skills: string[]
      image: string | null
      whatsapp: string | null
    }
  }

  interface User extends DefaultUser {
    userType: string
    description: string | null
    skills: string[] | string
    image?: string | null
    whatsapp: string | null
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    email: string | null
    name: string | null
    userType: string
    description: string | null
    skills: string[]
    image: string | null
    whatsapp: string | null
  }
}
