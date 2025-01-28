import { useState } from "react"

interface UserSelectionProps {

  formData: {

    name: string
    email: string
    currentPassword: string
    newPassword: string
    confirmPassword: string
    description: string
    skills: string[]
    whatsapp: string
    newSkill: string
    image: string
    typeUser: string
    freelaTitle: string
    freelaDescription: string
    freelaCategory: string
    freelaDuration: string
  }

  setFormData: React.Dispatch<React.SetStateAction<{
    name: string
    email: string
    currentPassword: string
    newPassword: string
    confirmPassword: string
    description: string
    skills: string[]
    whatsapp: string
    newSkill: string
    image: string
    typeUser: string
    freelaTitle: string
    freelaDescription: string
    freelaCategory: string
    freelaDuration: string
  }>>
}

export const UserSelection = ({ formData, setFormData }: UserSelectionProps) => {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-medium text-gray-900">Tipo de Usuário</h2>
      <div className="flex gap-4">
        <button
          type="button"
          onClick={() => setFormData(prev => ({ ...prev, typeUser: 'freelancer' }))}
          className={`px-4 py-2 rounded-md ${formData.typeUser === 'freelancer'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700'
            }`}
        >
          Freelancer
        </button>
        <button
          type="button"
          onClick={() => setFormData(prev => ({ ...prev, typeUser: 'cliente' }))}
          className={`px-4 py-2 rounded-md ${formData.typeUser === 'cliente'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700'
            }`}
        >
          Cliente
        </button>
      </div>
    </div>
  )
}