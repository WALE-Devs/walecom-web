import { NextResponse } from "next/server";

export async function GET() {
  const contactData = {
    email: "contacto@mylanding.com",
    telefono: "+51 999 888 777",
    direccion: "Av. Los Pinos 123, Lima, Perú",
    redes: {
      instagram: "https://instagram.com/mylanding",
      facebook: "https://facebook.com/mylanding",
    },
  };

  return NextResponse.json(contactData);
}
