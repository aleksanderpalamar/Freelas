import { Metadata } from 'next'
import prisma from '@/lib/prisma'
import { FreelasGrid } from './_components/FreelasGrid'


export const metadata: Metadata = {
  title: 'Freelas Disponíveis',
  description: 'Encontre os melhores freelas disponíveis para você',
}

async function getFreelas() {
  try {
    const freelas = await prisma.freela.findMany({
      where: {
        status: 'open',
      },
      include: {
        client: {
          select: {
            name: true,
            image: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })
    return freelas
  } catch (error) {
    console.error('Erro ao buscar freelas:', error)
    return []
  }
}

export default async function FreelasPage() {
  const freelas = await getFreelas()

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Freelas Disponíveis</h1>
        <p className="mt-2 text-gray-600">
          Encontre as melhores oportunidades de trabalho freelancer
        </p>
      </div>

      <FreelasGrid freelas={freelas} />
    </div>
  )
}