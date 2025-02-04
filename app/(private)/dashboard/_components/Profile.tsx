'use client'

import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

interface UserData {
  name: string | null
  email: string | null
  image: string | null
  userType: string
  description: string | null
  whatsapp: string | null
  skills: string[]
}

export function Profile() {
  const { data: session } = useSession()
  const [userData, setUserData] = useState<UserData | null>(null)

  useEffect(() => {
    if (session?.user) {
      const fetchUserData = async () => {
        try {
          const response = await fetch(`/api/users/${session.user.id}`)
          const data = await response.json()
          
          setUserData({
            ...data,
            skills: Array.isArray(data.skills) ? data.skills : 
                    typeof data.skills === 'string' ? data.skills.split(',').filter(Boolean) : []
          })
        } catch (error) {
          console.error('Erro ao carregar dados do usuário:', error)
          toast.error('Erro ao carregar dados do usuário')
        }
      }

      fetchUserData()
    }
  }, [session])

  if (!session?.user || !userData) return null

  return (
    <div className="p-6">
      <div className="flex flex-col items-center bg-blue-50 p-2 rounded-lg">
        <div className="relative w-32 h-32 mb-4">
          <Image
            src={userData.image || '/assets/placeholder.svg?height=128&width=128'}
            alt={userData.name || 'Foto do perfil'}
            className="rounded-full"
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">{userData.name}</h2>
        <p className="text-gray-600">{userData.email}</p>
        <div className="mt-4 text-sm text-gray-500 capitalize">{userData.userType}</div>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-medium text-gray-900">Whatsapp</h3>
        <p className="mt-2 text-gray-600 whitespace-pre-wrap">
          {userData.whatsapp || 'Nenhum whatsapp fornecido.'}
        </p>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-medium text-gray-900">Sobre</h3>
        <p className="mt-2 text-gray-600 whitespace-pre-wrap">
          {userData.description || 'Nenhuma descrição fornecida.'}
        </p>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-medium text-gray-900">Habilidades</h3>
        <div className="mt-2 flex flex-wrap gap-2">
          {userData.skills.length > 0 ? (
            userData.skills.map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
              >
                {skill}
              </span>
            ))
          ) : (
            <p className="text-gray-500">Nenhuma habilidade listada.</p>
          )}
        </div>
      </div>
    </div>
  )
}