import type { Content } from "@/types/content";

export const aboutData: Content = {
  id: 1,
  identifier: "about",
  title: "Sobre Nosotros",
  description:
    "En MyLanding nos especializamos en ofrecer productos de alta calidad con un enfoque sostenible. Creemos en la innovación, el diseño responsable y la satisfacción de nuestros clientes.",
  language: "es",
  is_active: true,
  last_updated: "2026-01-14T17:51:06.126436Z",
  blocks: [
    {
      id: 3,
      content: 1,
      identifier: "mission",
      title: "Misión",
      subtitle: "",
      content_text:
        "Brindar productos útiles, duraderos y respetuosos con el medio ambiente.",
      items: [],
      image: null,
      order: 1,
      is_active: true,
      type: "",
      language: "es",
    },
    {
      id: 4,
      content: 1,
      identifier: "vision",
      title: "Visión",
      subtitle: "",
      content_text:
        "Convertirnos en una marca líder en innovación sostenible a nivel regional.",
      items: [],
      image: null,
      order: 2,
      is_active: true,
      type: "",
      language: "es",
    },
    {
      id: 5,
      content: 1,
      identifier: "values",
      title: "Valores",
      subtitle: "",
      content_text: "",
      items: ["Calidad", "Sostenibilidad", "Transparencia", "Innovación"],
      image: null,
      order: 3,
      is_active: true,
      type: "",
      language: "es",
    },
  ],
};
