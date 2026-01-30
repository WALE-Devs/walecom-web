"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X, User } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <nav className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/foco.svg"
            alt="Logo"
            width={32}
            height={32}
          />
          <span className="text-xl font-semibold">MyLanding</span>
        </Link>

        {/* NAV LINKS */}
        <div className="hidden md:flex items-center gap-8">
          <ul className="flex gap-6 text-gray-700 font-medium">
            <li>
              <Link href="/" className="hover:text-blue-600 transition">
                Inicio
              </Link>
            </li>
            <li>
              <Link href="/catalog" className="hover:text-blue-600 transition">
                Catálogo
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-blue-600 transition">
                Nosotros
              </Link>
            </li>
          </ul>

          <div className="flex items-center gap-4 border-l pl-8">
            <Link href={user ? "/profile" : "/login"} className="text-gray-700 hover:text-blue-600 transition flex items-center gap-1">
              <User size={20} />
              <span className="text-sm">{user ? user.first_name : "Entrar"}</span>
            </Link>
          </div>
        </div>

        {/* MENU HAMBURGER (MOBILE) */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 text-gray-700 hover:text-blue-600"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* MENU MOBILE */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t shadow-sm">
          <ul className="flex flex-col p-4 gap-3 text-gray-700 font-medium">
            <li>
              <Link href="/" onClick={() => setMenuOpen(false)}>
                Inicio
              </Link>
            </li>
            <li>
              <Link href="/catalog" onClick={() => setMenuOpen(false)}>
                Catálogo
              </Link>
            </li>
            <li>
              <Link href="#contacto" onClick={() => setMenuOpen(false)}>
                Contacto
              </Link>
            </li>
            <li>
              <Link href="/about" onClick={() => setMenuOpen(false)}>
                Nosotros
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
