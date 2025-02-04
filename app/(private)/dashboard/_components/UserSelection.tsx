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
    userType: string
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
    userType: string
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
          onClick={() => setFormData(prev => ({ ...prev, userType: 'freelancer' }))}
          className={`px-4 py-2 rounded-md ${formData.userType === 'freelancer'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700'
            }`}
        >
          Freelancer
        </button>
        <button
          type="button"
          onClick={() => setFormData(prev => ({ ...prev, userType: 'cliente' }))}
          className={`px-4 py-2 rounded-md ${formData.userType === 'cliente'
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