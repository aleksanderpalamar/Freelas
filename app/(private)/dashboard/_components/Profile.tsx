'use client'

import { useSession } from 'next-auth/react'
import Image from 'next/image'

export function Profile() {
  const { data: session } = useSession()

  if (!session?.user) return null

  console.log('Session user:', session.user)

  const skills = session.user.skills || []

  return (
    <div className="p-6">
      <div className="flex flex-col items-center bg-blue-50 p-2 rounded-lg">
        <div className="relative w-32 h-32 mb-4">
          <Image
            src={session.user.image || '/assets/placeholder.svg?height=128&width=128'}
            alt={session.user.name || 'Foto do perfil'}
            className="rounded-full"
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">{session.user.name}</h2>
        <p className="text-gray-600">{session.user.email}</p>
        <div className="mt-4 text-sm text-gray-500 capitalize">{session.user.userType}</div>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-medium text-gray-900">Whatsapp</h3>
        <p className="mt-2 text-gray-600 whitespace-pre-wrap">
          {session.user.whatsapp || 'Nenhum whatsapp fornecido.'}
        </p>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-medium text-gray-900">Sobre</h3>
        <p className="mt-2 text-gray-600 whitespace-pre-wrap">
          {session.user.description || 'Nenhuma descrição fornecida.'}
        </p>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-medium text-gray-900">Habilidades</h3>
        <div className="mt-2 flex flex-wrap gap-2">
          {skills.length > 0 ? (
            skills.map((skill) => (
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