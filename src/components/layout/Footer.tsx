import Link from "next/link";
import { Mail, Phone, MapPin, Instagram, Facebook } from "lucide-react";
import { fetchContact } from "@/lib/contact";


export default async function Footer() {
  const contact = await fetchContact();

  const info = contact.blocks.find((b) => b.identifier === "information");
  const social = contact.blocks.find((b) => b.identifier === "social");

  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-12">
      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6 text-gray-700">
        {/* Contact information */}
        {info && (
          <div className="space-y-3 mb-10">
            {info.items.address && (
              <p className="flex justify-center items-center gap-2 text-gray-700">
                <MapPin className="text-blue-600" size={18} />
                {info.items.address}
              </p>
            )}
            {info.items.phone && (
              <p className="flex justify-center items-center gap-2 text-gray-700">
                <Phone className="text-blue-600" size={18} />
                {info.items.phone}
              </p>
            )}
            {info.items.email && (
              <p className="flex justify-center items-center gap-2 text-gray-700">
                <Mail className="text-blue-600" size={18} />
                {info.items.email}
              </p>
            )}
          </div>
        )}

        {/* Social media */}
        {social && (
          <div className="flex justify-center gap-6 mt-6">
            {social.items.instagram && (
              <a
                href={social.items.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 transition"
              >
                <Instagram size={22} />
              </a>
            )}
            {social.items.facebook && (
              <a
                href={social.items.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 transition"
              >
                <Facebook size={22} />
              </a>
            )}
          </div>
        )}

        <p className="text-sm text-gray-500 text-center md:text-right w-full md:w-auto">
          © {new Date().getFullYear()} MyLanding. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
