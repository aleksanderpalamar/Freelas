import Link from "next/link";
import { Logo } from "./logo";

export const Footer = () => {
  return (
    <footer className="bg-sky-900 text-zinc-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo */}
          <Logo />      

          {/* Navigation */}
          <nav className="space-y-4 md:text-center">
            <h3 className="text-sm font-semibold">Links Úteis</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/sobre" className="text-sm text-zinc-300 hover:text-white transition-colors">
                  Sobre
                </Link>
              </li>
              <li>
                <Link href="/contato" className="text-sm text-zinc-300 hover:text-white transition-colors">
                  Contato
                </Link>
              </li>
            </ul>
          </nav>

          {/* Legal */}
          <div className="space-y-4 md:text-right">
            <h3 className="text-sm font-semibold">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacidade" className="text-sm text-zinc-300 hover:text-white transition-colors">
                  Política de Privacidade
                </Link>
              </li>
              <li>
                <Link href="/termos" className="text-sm text-zinc-300 hover:text-white transition-colors">
                  Termos de Uso
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Mobile Footer */}
        <div className="mt-8 pt-8 border-t border-sky-950 text-center">
          <p className="text-sm text-zinc-300">
            © {new Date().getFullYear()} Freelas.com.br. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};