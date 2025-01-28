"use client"

import { Loader2 } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

export const PublishFreelaForm = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    freelaTitle: '',
    freelaDescription: '',
    freelaCategory: '',
    freelaDuration: ''
  })

  const handlePublishFreela = async () => {
    if (!formData.freelaTitle || !formData.freelaDescription || !formData.freelaCategory || !formData.freelaDuration) {
      toast.error('Todos os campos são obrigatórios')
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch('/api/freela', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: formData.freelaTitle,
          description: formData.freelaDescription,
          category: formData.freelaCategory,
          duration: formData.freelaDuration
        })
      })

      const data = await response.json()

      if (response.ok) {
        toast.success('Freela publicado com sucesso')
        // Limpa os campos do formulário de freela
        setFormData(prev => ({
          ...prev,
          freelaTitle: '',
          freelaDescription: '',
          freelaCategory: '',
          freelaDuration: '30 dias'
        }))
      } else {
        toast.error(data.error || 'Falha ao publicar freela')
      }
    } catch {
      toast.error('Erro ao publicar freela')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-4 border-t pt-6">
      <h2 className="text-lg font-medium text-gray-900">Publique um Freela</h2>

      <div>
        <label htmlFor="freelaCategory" className="block text-sm font-medium text-gray-700">
          Escolha uma categoria
        </label>
        <select
          id="freelaCategory"
          value={formData.freelaCategory}
          onChange={e => setFormData(prev => ({ ...prev, freelaCategory: e.target.value }))}
          className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
        >
          <option value="">Selecione uma categoria</option>
          <option value="desenvolvimento">Desenvolvimento & Programação</option>
          <option value="design">Design & Criativo</option>
          <option value="marketing">Marketing & Vendas</option>
          <option value="escrita">Escrita & Conteúdo</option>
        </select>
      </div>

      <div>
        <label htmlFor="freelaTitle" className="block text-sm font-medium text-gray-700">
          Dê um nome para o Freela
        </label>
        <input
          type="text"
          id="freelaTitle"
          value={formData.freelaTitle}
          onChange={e => setFormData(prev => ({ ...prev, freelaTitle: e.target.value }))}
          placeholder="Ex: Desenvolvimento de site em wordpress"
          className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
        />
      </div>

      <div>
        <label htmlFor="freelaDescription" className="block text-sm font-medium text-gray-700">
          Descreva o Trabalho a ser feito
        </label>
        <textarea
          id="freelaDescription"
          value={formData.freelaDescription}
          onChange={e => setFormData(prev => ({ ...prev, freelaDescription: e.target.value }))}
          rows={4}
          className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
        />
      </div>

      <div>
        <label htmlFor="freelaDuration" className="block text-sm font-medium text-gray-700">
          Durante quantos dias você quer receber propostas?
        </label>
        <select
          id="freelaDuration"
          value={formData.freelaDuration}
          onChange={e => setFormData(prev => ({ ...prev, freelaDuration: e.target.value }))}
          className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
        >
          <option value="30 dias">30 dias</option>
          <option value="15 dias">15 dias</option>
          <option value="7 dias">7 dias</option>
        </select>
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={handlePublishFreela}
          disabled={isLoading}
          className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading && <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />}
          Publicar Freela
        </button>
      </div>
    </div>
  )
}