import { Search } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-8 space-y-4">
      <h1 className="text-4xl font-bold mb-4">Bem vindos ao Freelas</h1>
      <p className="text-xl mb-8">
        Conecte-se com os top freelancers do Brasil.
      </p>
      <p className="text-lg mb-8">
        Encontre freelas de alta qualidade e contratar freelas de forma fácil e rápida.
      </p>
      <p className="text-lg text-gray-500">
        Plataforma de Freelas 100% brasileira e gratuita.
      </p>
      <div className="flex items-center justify-between w-full max-w-sm space-x-4">
        <Link
          href="/freelas"
          className="flex items-center bg-sky-500 hover:bg-sky-600 duration-300 ease-in-out text-white font-bold py-2 px-4 rounded"
        >
          <Search className="mr-2 w-5 h-5" />
          Freelas
        </Link>
        <Link
          href="/auth/signup"
          className="bg-emerald-500 hover:bg-emerald-600 duration-300 ease-in-out text-white font-bold py-2 px-4 rounded"
        >
          Cadastre-se
        </Link>
      </div>
    </div>
  );
}
