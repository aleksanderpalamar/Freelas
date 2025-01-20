import Link from "next/link"

export const Logo = () => {
  return (
    <div className="flex justify-center md:justify-start">
      <Link href="/" className="flex items-center space-x-2">
        <p className="text-lg font-bold">Freelas.com.br</p>
      </Link>
    </div>
  )
}