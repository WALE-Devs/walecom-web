import { getContactInfo } from "@/lib/contact";

export default async function ContactSection() {
  const contact = await getContactInfo();
  return (
     <section id="contacto" className="py-16 bg-gray-100 text-center">
        <h2 className="text-3xl font-semibold mb-6">Contáctanos</h2>
        <p>{contact.direccion}</p>
        <p>{contact.telefono}</p>
        <p>{contact.email}</p>
      </section>
  );
}
