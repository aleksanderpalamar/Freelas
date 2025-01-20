import { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from "@/lib/prisma"
import bcrypt from "bcrypt"

export const authOptions: NextAuthOptions = {
  debug: process.env.NODE_ENV === "development",
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials): Promise<any> {
        try {
          if (!credentials?.email || !credentials?.password) {
            return null
          }

          const user = await prisma.user.findUnique({
            where: {
              email: credentials.email
            },
            select: {
              id: true,
              email: true,
              name: true,
              password: true,
              userType: true,
              description: true,
              skills: true,
              image: true,
              whatsapp: true,
            }
          })

          if (!user || !user.password) {
            return null
          }

          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.password
          )

          if (!isPasswordValid) {
            return null
          }

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            userType: user.userType,
            description: user.description || '',
            skills: user.skills ? user.skills.split(',').filter(Boolean) : [],
            image: user.image || '',
            whatsapp: user.whatsapp || null
          }
        } catch (error) {
          console.error('Auth error:', error)
          return null
        }
      }
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === 'credentials') {
        return true
      }

      if (account?.provider === 'google') {
        try {
          const existingUser = await prisma.user.findUnique({
            where: { email: user.email! },
          })

          if (existingUser) {
            // Se o usuário existe, atualize os dados da sessão
            user.id = existingUser.id
            user.userType = existingUser.userType
            user.description = existingUser.description || ''
            user.skills = existingUser.skills ? existingUser.skills.split(',').filter(Boolean) : []
            user.whatsapp = existingUser.whatsapp || null
            return true
          }

          // Se é um novo usuário do Google, crie com dados padrão
          const newUser = await prisma.user.create({
            data: {
              email: user.email!,
              name: user.name!,
              image: user.image!,
              userType: 'freelancer',
              skills: '',
              description: '',
              whatsapp: null
            }
          })

          user.id = newUser.id
          user.userType = newUser.userType
          user.description = newUser.description || ''
          user.skills = []
          user.whatsapp = null
          return true
        } catch (error) {
          console.error("Erro no signIn:", error)
          return false
        }
      }

      return !!user.email
    },
    async jwt({ token, user, trigger, session }) {
      if (trigger === "update" && session?.user) {
        // Atualiza o token quando a sessão é atualizada
        return {
          ...token,
          name: session.user.name,
          email: session.user.email,
          userType: session.user.userType,
          description: session.user.description || null,
          skills: typeof session.user.skills === 'string' ? session.user.skills.split(',').filter(Boolean) : (session.user.skills || []),
          image: session.user.image || null,
          whatsapp: session.user.whatsapp || null
        }
      }
      
      if (user) {
        // Garante que todos os campos estejam presentes no token
        token.id = user.id
        token.email = user.email || null
        token.name = user.name || null
        token.userType = user.userType
        token.description = user.description || null
        token.skills = typeof user.skills === 'string' ? user.skills.split(',').filter(Boolean) : (user.skills || [])
        token.image = user.image || null
        token.whatsapp = user.whatsapp || null
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        // Garante que todos os campos estejam presentes na sessão
        session.user.id = token.id as string
        session.user.email = token.email as string
        session.user.name = token.name as string
        session.user.userType = token.userType as string
        session.user.description = token.description as string
        session.user.skills = token.skills as string[]
        session.user.image = token.image as string
        session.user.whatsapp = token.whatsapp as string | null
      }
      return session
    }
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/signin',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 dias
  },
}