import { getFreela } from '@/function/getFreela'
import { notFound } from 'next/navigation'
import { FreelaDetails } from '../_components/FreelaDetails'

export const revalidate = 0

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function FreelaPage({ params }: PageProps) {
  const { slug } = await params
  const freela = await getFreela(slug)

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
