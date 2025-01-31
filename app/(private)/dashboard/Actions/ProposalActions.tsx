'use client'

import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { useState } from "react"
import { ContactDialog } from "@/app/_components/ContactDialog"

interface ProposalActionsProps {
  proposalId: string
  status: string
  freelancer: {
    name: string
    email: string
    whatsapp: string
    description: string | null
  }
}

export function ProposalActions({ proposalId, status, freelancer }: ProposalActionsProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleUpdateStatus = async (newStatus: string) => {
    try {
      const response = await fetch(`/api/proposals/${proposalId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      })

      if (!response.ok) {
        throw new Error('Erro ao atualizar proposta')
      }

      if (newStatus === 'accepted') {
        setIsDialogOpen(true)
      }

      toast.success(
        newStatus === 'accepted' 
          ? 'Proposta aceita com sucesso!' 
          : 'Proposta rejeitada com sucesso!'
      )
    } catch (error) {
      toast.error('Erro ao atualizar proposta')
    }
  }

  if (status !== 'pending') return null

  return (
    <>
      <div className="flex gap-2">
        <Button
          onClick={() => handleUpdateStatus('accepted')}
          className="bg-emerald-500 hover:bg-emerald-600 text-white"
          size="sm"
        >
          Aprovar
        </Button>
        <Button
          onClick={() => handleUpdateStatus('rejected')}
          className="bg-rose-500 hover:bg-rose-600 text-white"
          size="sm"
        >
          Rejeitar
        </Button>
      </div>

      <ContactDialog 
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        freelancer={freelancer}
      />
    </>
  )
} 