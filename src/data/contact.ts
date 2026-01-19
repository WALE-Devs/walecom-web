import type { Content } from "@/types/content";

export const contactData: Content = {
  id: 2,
  identifier: "contact",
  title: "Contáctanos",
  description:
    "¿Tienes alguna pregunta o comentario? Estamos aquí para ayudarte.",
  language: "es",
  is_active: true,
  last_updated: "2026-01-14T19:19:49.215403Z",
  blocks: [
    {
      id: 6,
      content: 2,
      identifier: "information",
      title: "Información de Contacto",
      subtitle: "",
      content_text: "",
      items: {
        email: "contacto@mylanding.com",
        phone: "+51 999 888 777",
        address: "Av. Los Pinos 123, Lima, Perú",
      },
      image_path: null,
      image_url: null,
      order: 1,
      is_active: true,
      type: "",
      language: "es",
    },
    {
      id: 7,
      content: 2,
      identifier: "social",
      title: "Redes Sociales",
      subtitle: "",
      content_text: "",
      items: {
        instagram: "https://instagram.com/mylanding",
        facebook: "https://facebook.com/mylanding",
      },
      image_path: null,
      image_url: null,
      order: 2,
      is_active: true,
      type: "",
      language: "es",
    },
  ],
};
