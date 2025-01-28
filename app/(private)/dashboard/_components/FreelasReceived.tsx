import { authOptions } from "@/lib/authOptions"
import prisma from "@/lib/prisma"
import { getServerSession } from "next-auth"

export const FreelasReceived = async () => {
  const session = await getServerSession(authOptions)

  const proposals = await prisma.proposal.findMany({
    where: {
      freelancerId: session?.user?.id
    },
    include: {
      freela: true
    },
    orderBy: {
      createdAt: 'desc'
    }
  })
  
  return (
    <div className="grid grid-cols-1 gap-4">
      {proposals.map((proposal) => (
        <div
          key={proposal.id}
          className="bg-white p-6 rounded-lg shadow-sm border border-gray-100"
        >
          <div className="flex justify-between items-start mb-4">
            <h3 className="font-medium text-lg">{proposal.freela.title}</h3>
            <span className={`px-3 py-1 rounded-full text-sm ${proposal.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
              proposal.status === 'accepted' ? 'bg-green-100 text-green-800' :
                'bg-red-100 text-red-800'
              }`}>
              {proposal.status}
            </span>
          </div>

          <p className="text-gray-600 mb-4">{proposal.content}</p>

          <div className="flex gap-4 text-sm text-gray-500">
            <span>Valor: R$ {proposal.price}</span>
            <span>Prazo: {proposal.deliveryTime} dias</span>
            <span>Enviado em: {new Date(proposal.createdAt).toLocaleDateString('pt-BR')}</span>
          </div>
        </div>
      ))}

      {proposals.length === 0 && (
        <p className="text-gray-500 text-center py-8">
          Você ainda não recebeu propostas.
        </p>
      )}
    </div>
  )
}