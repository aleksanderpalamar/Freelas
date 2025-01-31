import { authOptions } from "@/lib/authOptions"
import prisma from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"

interface NotificationMetadata {
  freelancerId?: string
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return new NextResponse("Não autorizado", { status: 401 })
    }

    const notifications = await prisma.notification.findMany({
      where: {
        userId: session.user.id
      },
      select: {
        id: true,
        title: true,
        message: true,
        read: true,
        type: true,
        createdAt: true,
        metadata: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    const formattedNotifications = notifications.map(notification => {
      const metadata = notification.metadata as NotificationMetadata | null
      return {
        ...notification,
        freelancerId: metadata?.freelancerId,
        metadata: undefined
      }
    })

    return NextResponse.json(formattedNotifications)
  } catch (error) {
    console.error("[NOTIFICATIONS_GET]", error)
    return new NextResponse("Erro interno", { status: 500 })
  }
}

export async function PATCH() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return new NextResponse("Não autorizado", { status: 401 })
    }

    await prisma.notification.updateMany({
      where: {
        userId: session.user.id,
        read: false
      },
      data: {
        read: true
      }
    })

    return new NextResponse("Notificações marcadas como lidas")
  } catch (error) {
    console.error("[NOTIFICATIONS_PATCH]", error)
    return new NextResponse("Erro interno", { status: 500 })
  }
} 