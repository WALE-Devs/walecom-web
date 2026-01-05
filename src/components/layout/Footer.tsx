import Link from "next/link";
import { getContactInfo } from "@/lib/contact";


export default async function Footer() {
  const contact = await getContactInfo();

  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-12">
      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6 text-gray-700">
        {/* INFO */}
        <div>
          <h3 className="font-semibold text-lg mb-2">Contacto</h3>
          <p>{contact.direccion}</p>
          <p>{contact.telefono}</p>
          <p>{contact.email}</p>
        </div>

        {/* REDES */}
        <div className="flex gap-4">
          <Link href={contact.redes.facebook} target="_blank">Facebook</Link>
          <Link href={contact.redes.instagram} target="_blank">Instagram</Link>
        </div>

        <p className="text-sm text-gray-500 text-center md:text-right w-full md:w-auto">
          © {new Date().getFullYear()} MyLanding. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
