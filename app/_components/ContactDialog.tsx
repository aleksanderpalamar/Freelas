'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { WhatsappLogo } from "@phosphor-icons/react"

interface ContactDialogProps {
  isOpen: boolean
  onClose: () => void
  freelancer: {
    name: string
    email: string
    whatsapp: string
    description: string | null
  }
}

export function ContactDialog({ isOpen, onClose, freelancer }: ContactDialogProps) {
  const whatsappLink = `https://wa.me/${freelancer.whatsapp?.replace(/\D/g, '')}`

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Informações de Contato</DialogTitle>
          <DialogDescription>
            A proposta foi aceita! Aqui estão as informações de contato do freelancer.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div>
            <h4 className="font-medium">Nome</h4>
            <p className="text-sm text-gray-500">{freelancer.name}</p>
          </div>

          <div>
            <h4 className="font-medium">E-mail</h4>
            <p className="text-sm text-gray-500">{freelancer.email}</p>
          </div>

          {freelancer.description && (
            <div>
              <h4 className="font-medium">Sobre</h4>
              <p className="text-sm text-gray-500">{freelancer.description}</p>
            </div>
          )}

          <div className="pt-4">
            <Button
              className="w-full gap-2 bg-emerald-500 hover:bg-emerald-600 text-white"
              onClick={() => window.open(whatsappLink, '_blank')}
            >
              <WhatsappLogo weight="fill" className="w-5 h-5" />
              Conversar pelo WhatsApp
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 