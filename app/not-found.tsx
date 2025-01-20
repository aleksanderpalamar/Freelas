export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-8 space-y-4">
      <p className="text-lg text-zinc-700 mb-8 text-wrap max-w-xs">
        <span className="font-bold text-zinc-900 text-3xl mr-2">Desculpe!</span> 
        A menos que você tenha uma máquina do tempo, esse conteúdo está indisponível.
      </p>
      <p className="text-lg text-zinc-700 mb-8 text-wrap max-w-xs flex items-center">
        <span className="font-bold text-zinc-900 text-3xl mr-2">404</span> 
        Nenhuma pagina encontrada.
      </p>
    </div>
  )
}