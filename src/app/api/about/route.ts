import { NextResponse } from "next/server";

export async function GET() {
    const about = {
        titulo: "Sobre Nosotros",
        descripcion: "En MyLanding nos especializamos en ofrecer productos de alta calidad con un enfoque sostenible. Creemos en la innovación, el diseño responsable y la satisfacción de nuestros clientes.",
        mision: "Brindar productos útiles, duraderos y respetuosos con el medio ambiente.",
        vision: "Convertirnos en una marca líder en innovación sostenible a nivel regional.",
        valores: [
            "Calidad",
            "Sostenibilidad",
            "Transparencia",
            "Innovación"
        ],
    };

  return NextResponse.json(about);
}
