import { authOptions } from "@/lib/authOptions"
import prisma from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { NextRequest, NextResponse } from "next/server"

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  try {
    const { id } = await params
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return new NextResponse("Não autorizado", { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        name: true,
        email: true,
        whatsapp: true,
        description: true
      }
    })

    if (!user) {
      return new NextResponse("Usuário não encontrado", { status: 404 })
    }

    return NextResponse.json(user)
  } catch (error) {
    console.error("[USER_GET]", error)
    return new NextResponse("Erro interno", { status: 500 })
  }
} 