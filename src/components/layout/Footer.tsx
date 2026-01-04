// components/layout/Footer.tsx
import Link from "next/link";
import Image from "next/image";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-12">
      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6 text-gray-700">
        {/* LOGO */}
        <div className="flex items-center gap-2">
          <Image
            src="/icons/logo.svg"
            alt="Logo"
            width={28}
            height={28}
          />
          <span className="font-semibold text-lg">MyLanding</span>
        </div>

        {/* ENLACES */}
        <nav className="flex flex-wrap justify-center gap-6 text-sm">
          <Link href="/" className="hover:text-blue-600 transition">
            Inicio
          </Link>
          <Link href="/catalog" className="hover:text-blue-600 transition">
            Catálogo
          </Link>
          <Link href="#contacto" className="hover:text-blue-600 transition">
            Contacto
          </Link>
          <Link href="#nosotros" className="hover:text-blue-600 transition">
            Nosotros
          </Link>
        </nav>

        {/* COPYRIGHT */}
        <p className="text-sm text-gray-500 text-center md:text-right w-full md:w-auto">
          © {year} MyLanding. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
