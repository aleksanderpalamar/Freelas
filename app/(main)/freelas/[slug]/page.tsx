
import { getFreela } from '@/function/getFreela'
import { notFound } from 'next/navigation'
import { FreelaDetails } from '../_components/FreelaDetails'

interface PageProps {
  params: {
    slug: string
  }
}

export default async function FreelaPage({ params }: PageProps) {
  const freela = await getFreela(params.slug)

  if (!freela) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <FreelaDetails freela={freela}  />
      </div>
    </div>
  )
}
