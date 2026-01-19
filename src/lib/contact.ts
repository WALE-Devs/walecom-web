import type { ContactContent } from "@/types/contact";

export async function fetchContact(): Promise<ContactContent>  {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  const res = await fetch(`${baseUrl}/api/contact`, {
    next: { revalidate: 300 }, // revalida cada 5min (300s)
  });

  if (!res.ok) {
    throw new Error(`Error al obtener datos de contacto (${res.status})`);
  }

  return res.json();
}
