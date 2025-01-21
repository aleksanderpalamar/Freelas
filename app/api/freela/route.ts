import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import prisma from '@/lib/prisma'
import { authOptions } from '@/lib/authOptions'

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json(
        { error: 'Você precisa estar logado para publicar um freela' },
        { status: 401 }
      )
    }

    const { title, description, category, duration } = await req.json()

    if (!title || !description || !category || !duration) {
      return NextResponse.json(
        { error: 'Todos os campos são obrigatórios' },
        { status: 400 }
      )
    }

    const freela = await prisma.freela.create({
      data: {
        title,
        description,
        category,
        duration,
        clientId: session.user.id,
      },
    })

    return NextResponse.json(freela)
  } catch (error) {
    console.error('Erro ao criar freela:', error)
    return NextResponse.json(
      { error: 'Erro ao criar freela' },
      { status: 500 }
    )
  }
} 