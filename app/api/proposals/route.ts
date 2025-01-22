import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'
import prisma from '@/lib/prisma'

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    const { freelaId, content, price, deliveryTime } = await req.json()

    // Log para debug
    console.log('Dados recebidos:', { freelaId, content, price, deliveryTime })

    // Validação dos dados
    if (!freelaId || !content || typeof price !== 'number' || typeof deliveryTime !== 'number') {
      return NextResponse.json({
        error: 'Dados inválidos',
        received: { freelaId, content, price, deliveryTime }
      }, { status: 400 })
    }

    const proposal = await prisma.proposal.create({
      data: {
        content,
        price,
        deliveryTime,
        status: 'pending',
        freelaId,
        freelancerId: session.user.id
      }
    })

    return NextResponse.json(proposal, { status: 201 })

  } catch (error) {
    console.error('Erro detalhado:', error)
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 })
  }
}