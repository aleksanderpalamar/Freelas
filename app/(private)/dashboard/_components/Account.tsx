'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import Image from 'next/image'

export function Account() {
  const { data: session, status, update } = useSession()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    description: '',
    skills: [] as string[],
    whatsapp: '',
    newSkill: '',
    image: ''
  })

  useEffect(() => {
    if (session?.user) {
      setFormData(prev => ({
        ...prev,
        name: session.user.name || '',
        email: session.user.email || '',
        description: session.user.description || '',
        skills: session.user.skills || [],
        whatsapp: session.user.whatsapp || '',
        image: session.user.image || ''
      }))
    }
  }, [session])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
      toast.error('As senhas não coincidem')
      return
    }
    
    setIsLoading(true)

    try {
      const response = await fetch('/api/user/update', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          currentPassword: formData.currentPassword || undefined,
          newPassword: formData.newPassword || undefined,
          description: formData.description,
          skills: formData.skills,
          whatsapp: formData.whatsapp,
          image: formData.image
        })
      })

      const data = await response.json()

      if (response.ok) {
        // Atualiza a sessão com os novos dados
        await update({
          ...session,
          user: {
            ...session?.user,
            name: data.user.name,
            email: data.user.email,
            description: data.user.description,
            skills: data.user.skills,
            whatsapp: data.user.whatsapp,
            image: data.user.image,
          }
        })
        
        toast.success('Perfil atualizado com sucesso')
        
        // Limpa as senhas do formulário
        setFormData(prev => ({
          ...prev,
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        }))
      } else {
        toast.error(data.error || 'Falha ao atualizar perfil')
      }
    } catch (error) {
      toast.error('Erro ao atualizar perfil')
    } finally {
      setIsLoading(false)
    }
  }

  const addSkill = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.newSkill.trim() && !formData.skills.includes(formData.newSkill.trim())) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, prev.newSkill.trim()],
        newSkill: ''
      }))
    }
  }

  const removeSkill = (skillToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }))
  }

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    )
  }

  return (
    <div className="min-h-full">
      <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl mx-auto">
        {/* Profile Image */}
        <div className="space-y-4">
          <h2 className="text-lg font-medium text-gray-900">Imagem do Perfil</h2>
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="relative w-24 h-24 mx-auto md:mx-0">
              <Image
                src={formData.image || '/assets/placeholder.svg?height=96&width=96'}
                alt="Profile"
                className="rounded-full object-cover"
                fill
                priority
              />
            </div>
            <div className="flex-1">
              <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                URL da Imagem
              </label>
              <input
                type="url"
                id="image"
                value={formData.image}
                onChange={e => setFormData(prev => ({ ...prev, image: e.target.value }))}
                placeholder="https://exemplo.com/sua-imagem.jpg"
                className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
              />
            </div>
          </div>
        </div>

        {/* Basic Information */}
        <div className="space-y-4">
          <h2 className="text-lg font-medium text-gray-900">Informações Básicas</h2>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Nome
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
              className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="whatsapp" className="block text-sm font-medium text-gray-700">
              Whatsapp
            </label>
            <input
              type="text"
              id="whatsapp"
              value={formData.whatsapp}
              onChange={e => setFormData(prev => ({ ...prev, whatsapp: e.target.value }))}
              placeholder="(11) 99999-9999"
              className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Descrição
            </label>
            <textarea
              id="description"
              rows={4}
              value={formData.description}
              onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
            />
          </div>
        </div>

        {/* Skills */}
        <div className="space-y-4">
          <h2 className="text-lg font-medium text-gray-900">Habilidades</h2>
          <div className="flex flex-wrap gap-2">
            {formData.skills.map(skill => (
              <span
                key={skill}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
              >
                {skill}
                <button
                  type="button"
                  onClick={() => removeSkill(skill)}
                  className="ml-2 inline-flex items-center p-0.5 rounded-full text-blue-400 hover:bg-blue-200 hover:text-blue-500 focus:outline-none"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={formData.newSkill}
              onChange={e => setFormData(prev => ({ ...prev, newSkill: e.target.value }))}
              placeholder="Adicionar habilidade"
              className="flex-1 rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
            />
            <button
              type="button"
              onClick={addSkill}
              className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Adicionar
            </button>
          </div>
        </div>

        {/* Password Change */}
        <div className="space-y-4">
          <h2 className="text-lg font-medium text-gray-900">Alterar Senha</h2>
          <div>
            <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">
              Senha Atual
            </label>
            <input
              type="password"
              id="currentPassword"
              value={formData.currentPassword}
              onChange={e => setFormData(prev => ({ ...prev, currentPassword: e.target.value }))}
              className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
              Nova Senha
            </label>
            <input
              type="password"
              id="newPassword"
              value={formData.newPassword}
              onChange={e => setFormData(prev => ({ ...prev, newPassword: e.target.value }))}
              className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Confirmar Nova Senha
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={e => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
              className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading && <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />}
            Salvar Alterações
          </button>
        </div>
      </form>
    </div>
  )
}