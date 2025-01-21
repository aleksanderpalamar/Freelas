import prisma from '@/lib/prisma'

export async function getFreela(id: string) {
  try {
    const freela = await prisma.freela.findUnique({
      where: { id },
      include: {
        client: {
          select: {
            id: true,
            name: true,
            email: true,
            whatsapp: true,
            image: true
          }
        }
      }
    })

    if (!freela) return null

    return {
      ...freela,
      createdAt: freela.createdAt.toISOString(),
      user: freela.client
    }
  } catch (error) {
    console.error('Error fetching freela:', error)
    return null
  }
} 