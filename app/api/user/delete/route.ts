import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import prisma from '@/lib/prisma'
import { authOptions } from '@/lib/authOptions'

export async function DELETE() {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json(
        { error: 'Você precisa estar autenticado' },
        { status: 401 }
      )
    }

    const userId = session.user.id

    // Excluir todas as propostas do usuário
    await prisma.proposal.deleteMany({
      where: {
        freelancerId: userId
      }
    })

    // Excluir todos os freelas do usuário
    await prisma.freela.deleteMany({
      where: {
        clientId: userId
      }
    })

    // Excluir todas as notificações do usuário
    await prisma.notification.deleteMany({
      where: {
        userId: userId
      }
    })

    // Finalmente, excluir o usuário
    await prisma.user.delete({
      where: {
        id: userId
      }
    })

    return NextResponse.json({ message: 'Conta excluída com sucesso' })
  } catch (error) {
    console.error('Erro ao excluir conta:', error)
    return NextResponse.json(
      { error: 'Erro ao excluir conta' },
      { status: 500 }
    )
  }
} 