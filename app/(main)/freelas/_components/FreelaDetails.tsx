'use client'

import { FormEvent, useState } from 'react'
import { useSession } from 'next-auth/react'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'
import { FaWhatsapp } from "react-icons/fa";
import Image from 'next/image'

interface Freela {
  id: string
  title: string
  description: string
  category: string
  duration: string
  createdAt: string
  clientId: string
  user?: {
    id: string
    name: string | null
    email: string | null
    whatsapp: string | null
    image: string | null
  }
}

interface FreelaDetailsProps {
  freela: Freela
}

interface Proposal {
  id: string
  content: string
  price: number
  deliveryTime: number
  status: 'pending' | 'accepted' | 'rejected'
  createdAt: string
  updatedAt: string
  projectId: string
  freelancerId: string
  project?: Project  // campo relacional opcional
  freelancer?: User  // campo relacional opcional
}

interface Project {
  id: string
  title: string
  description: string
  category: string
  duration: string
}

interface User {
  id: string
  name: string | null
  email: string | null
}

export function FreelaDetails({ freela }: FreelaDetailsProps) {
  const { data: session } = useSession()
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [proposal, setProposal] = useState({
    description: '',
    price: 0,
    deliveryTime: 0
  })

  async function handleSubmitProposal(e: FormEvent) {
    e.preventDefault()

    if (!session?.user) {
      toast.error('Você precisa estar logado para enviar uma proposta')
      return
    }

    setIsSubmitting(true)

    try {
      const res = await fetch('/api/proposals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          freelaId: freela.id,
          content: proposal.description,
          price: proposal.price,
          deliveryTime: proposal.deliveryTime
        })
      })

      if (!res.ok) {
        throw new Error('Erro ao enviar proposta')
      }

      toast.success('Proposta enviada com sucesso!')
      setProposal({ description: '', price: 0, deliveryTime: 0 })
    } catch (error) {
      toast.error('Erro ao enviar proposta')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-6xl mx-auto space-y-4">
      {/* Card Principal */}
      <div className="bg-white shadow-2xl rounded-2xl overflow-hidden border border-gray-100">
        {/* Header */}
        <div className="relative px-8 py-16 bg-blue-500 text-white">
          <div className="absolute inset-0 bg-black opacity-5 pattern-grid-lg"></div>
          <div className="relative">
            {/* Informações do Cliente */}
            <div className="flex items-center mb-8">
              {freela.user?.image ? (
                <div className="relative w-20 h-20 mr-6">
                  <Image
                    src={freela.user.image}
                    alt={freela.user.name || 'Avatar do usuário'}
                    fill
                    className="rounded-full object-cover border-4 border-white/20"
                  />
                </div>
              ) : (
                <div className="w-20 h-20 bg-gradient-to-br from-white/20 to-white/10 rounded-full flex items-center justify-center text-white text-2xl font-bold mr-6 border-4 border-white/20">
                  {freela.user?.name?.[0]?.toUpperCase() || '?'}
                </div>
              )}
              <div>
                <h3 className="text-xl font-medium text-white/90 mb-1">
                  {freela.user?.name || 'Anônimo'}
                </h3>
                {freela.user?.whatsapp ? (
                  <a
                    href={`https://wa.me/${freela.user.whatsapp}?text=Olá, gostaria de saber mais sobre o projeto ${freela.title}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center font-bold text-sm text-emerald-500 hover:text-emerald-600 transition-colors"
                  >
                    <FaWhatsapp className='w-5 h-5 mr-2' />
                    Conversar no WhatsApp
                  </a>
                ) : (
                  <span className="text-sm text-white/60">{freela.user?.email}</span>
                )}
              </div>
            </div>

            {/* Categoria e Duração */}
            <div className="flex items-center space-x-4 text-sm text-white/75 mb-6">
              <span className="bg-white/10 rounded-full px-4 py-1.5 backdrop-blur-sm">
                {freela.category}
              </span>
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-2 opacity-75" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {freela.duration}
              </span>
            </div>

            {/* Título */}
            <h1 className="text-4xl font-bold mb-4">{freela.title}</h1>

            {/* Data de Publicação */}
            <div className="flex items-center text-sm text-white/60">
              <svg className="w-4 h-4 mr-2 opacity-75" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Publicado em {new Date(freela.createdAt).toLocaleDateString('pt-BR')}
            </div>
          </div>
        </div>

        {/* Conteúdo */}
        <div className="p-8">
          {/* Descrição */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Sobre o Freela</h3>
            <div className="prose prose-blue max-w-none">
              <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">{freela.description}</p>
            </div>
          </div>

          {/* Enviar Proposta */}
          {session?.user && freela.clientId === session.user.id && (
            <div className="space-y-6">
              <h3 className="font-semibold text-gray-900 mb-4 border-t border-gray-100 pt-6">Enviar Proposta</h3>
              <div className="flex justify-center pt-6 ">
                <form onSubmit={handleSubmitProposal} className="w-full max-w-2xl space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Descreva sua proposta
                    </label>
                    <textarea
                      className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm resize-none"
                      placeholder="Descreva sua proposta detalhadamente Ex: Gostaria de desenvolver um site para você..."
                      rows={4}
                      value={proposal.description}
                      onChange={(e) => setProposal(prev => ({ ...prev, description: e.target.value }))}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Valor (R$)
                      </label>
                      <input
                        type="text"
                        className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                        placeholder="Ex: 1000"
                        value={proposal.price}
                        onChange={(e) => setProposal(prev => ({ ...prev, price: Number(e.target.value) }))}
                        min="0"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Prazo de entrega (dias)
                      </label>
                      <input
                        type="text"
                        className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                        placeholder="Ex: 7"
                        value={proposal.deliveryTime}
                        onChange={(e) => setProposal(prev => ({ ...prev, deliveryTime: Number(e.target.value) }))}
                        min="1"
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-fit ml-auto bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    {isSubmitting ? (
                      <Loader2 className="w-5 h-5 animate-spin mx-auto" />
                    ) : (
                      'Enviar Proposta'
                    )}
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 