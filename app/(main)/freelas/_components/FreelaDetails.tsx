'use client'

import { useState } from 'react'
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

export function FreelaDetails({ freela }: FreelaDetailsProps) {
  const { data: session } = useSession()
  const [isLoading, setIsLoading] = useState(false)

  const handleApply = async () => {
    if (!session) {
      toast.error('Você precisa estar logado para se candidatar')
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch('/api/proposals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          freelaId: freela.id
        })
      })

      if (response.ok) {
        toast.success('Candidatura enviada com sucesso!')
      } else {
        const data = await response.json()
        toast.error(data.error || 'Erro ao enviar candidatura')
      }
    } catch {
      toast.error('Erro ao enviar candidatura')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Card Principal */}
      <div className="bg-white shadow-2xl rounded-2xl overflow-hidden border border-gray-100">
        {/* Header com Gradiente */}
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
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Sobre o Projeto</h3>
            <div className="prose prose-blue max-w-none">
              <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">{freela.description}</p>
            </div>
          </div>

          {/* Botão de Candidatura */}
          {session && session.user.id !== freela.user?.id && (
            <div className="flex justify-center pt-6 border-t border-gray-100">
              <button
                onClick={handleApply}
                disabled={isLoading}
                className="group relative inline-flex items-center px-8 py-4 border border-transparent text-base font-medium rounded-xl text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <span className="flex items-center">
                  {!isLoading && (
                    <svg className="w-5 h-5 mr-2 transform group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                    </svg>
                  )}
                  {isLoading ? (
                    <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" />
                  ) : null}
                  <span className="group-hover:translate-x-1 transition-transform">
                    Candidatar-se ao Projeto
                  </span>
                </span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 