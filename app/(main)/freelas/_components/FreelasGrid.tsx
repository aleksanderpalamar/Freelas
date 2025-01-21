'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'

interface Freela {
  id: string
  title: string
  description: string
  category: string
  duration: string
  status: string
  createdAt: Date
  client: {
    name: string | null
    image: string | null
  }
}

interface FreelasGridProps {
  freelas: Freela[]
}

export function FreelasGrid({ freelas }: FreelasGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('')

  const categories = [
    { id: 'desenvolvimento', name: 'Desenvolvimento & Programação' },
    { id: 'design', name: 'Design & Criativo' },
    { id: 'marketing', name: 'Marketing & Vendas' },
    { id: 'escrita', name: 'Escrita & Conteúdo' },
  ]

  const filteredFreelas = selectedCategory
    ? freelas.filter((freela) => freela.category === selectedCategory)
    : freelas

  return (
    <div>
      {/* Filtro por categoria */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory('')}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              selectedCategory === ''
                ? 'bg-blue-600 text-white'
                : 'bg-blue-100 text-gray-700 hover:bg-blue-200 duration-300 transition-all ease-in-out'
            }`}
          >
            Todos
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                selectedCategory === category.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-blue-100 text-gray-700 hover:bg-blue-200 duration-300 transition-all ease-in-out'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Grid de Freelas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFreelas.map((freela) => (
          <Link
            href={`/freelas/${freela.id}`}
            key={freela.id}
            className="block bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="relative w-10 h-10 mr-3">
                  <Image
                    src={freela.client.image || '/assets/placeholder.svg'}
                    alt={freela.client.name || 'Cliente'}
                    className="rounded-full object-cover"
                    fill
                    sizes="40px"
                  />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900">
                    {freela.client.name}
                  </h3>
                  <p className="text-xs text-gray-500">
                    {formatDistanceToNow(new Date(freela.createdAt), {
                      addSuffix: true,
                      locale: ptBR,
                    })}
                  </p>
                </div>
              </div>

              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                {freela.title}
              </h2>
              
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {freela.description}
              </p>

              <div className="flex items-center justify-between space-x-2">
                <span className="flex items-center justify-center text-center text-xs text-blue-500 bg-blue-50 rounded-full px-2 py-1">
                  {categories.find((c) => c.id === freela.category)?.name}
                </span>
                <span className="text-sm text-gray-500">
                  Propostas: {freela.duration}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Mensagem quando não há freelas */}
      {filteredFreelas.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            Nenhum freela encontrado {selectedCategory && 'nesta categoria'}.
          </p>
        </div>
      )}
    </div>
  )
} 