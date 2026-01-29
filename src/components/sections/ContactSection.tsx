import { fetchContact } from "@/lib/contact";
import { Mail, Phone, MapPin, Instagram, Facebook } from "lucide-react";

// Type guard to check if items is a record of strings
function isStringRecord(value: unknown): value is Record<string, string> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export default async function ContactSection() {
  const contact = await fetchContact();

  const info = contact.blocks.find((b) => b.identifier === "information");
  const social = contact.blocks.find((b) => b.identifier === "social");

  // Use type guard to narrow the type
  const infoItems = isStringRecord(info?.items) ? info!.items : {};
  const socialItems = isStringRecord(social?.items) ? social!.items : {};

  return (
    <section id="contacto" className="py-16 bg-gray-100 text-center">
      <h2 className="text-3xl font-semibold mb-6 text-blue-900">
        {contact.title}
      </h2>
      <p className="text-gray-700 mb-10 max-w-2xl mx-auto">
        {contact.description}
      </p>

      {/* Contact information */}
      {info && (
        <div className="space-y-3 mb-10">
          {infoItems.address && (
            <p className="flex justify-center items-center gap-2 text-gray-700">
              <MapPin className="text-blue-600" size={18} />
              {infoItems.address}
            </p>
          )}
          {infoItems.phone && (
            <p className="flex justify-center items-center gap-2 text-gray-700">
              <Phone className="text-blue-600" size={18} />
              {infoItems.phone}
            </p>
          )}
          {infoItems.email && (
            <p className="flex justify-center items-center gap-2 text-gray-700">
              <Mail className="text-blue-600" size={18} />
              {infoItems.email}
            </p>
          )}
        </div>
      )}

      {/* Social media */}
      {social && (
        <div className="flex justify-center gap-6 mt-6">
          {socialItems.instagram && (
            <a
              href={socialItems.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 transition"
            >
              <Instagram size={22} />
            </a>
          )}
          {socialItems.facebook && (
            <a
              href={socialItems.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 transition"
            >
              <Facebook size={22} />
            </a>
          )}
        </div>
      )}
    </section>
  );
}
