import type { Content } from "@/types/content";

export async function fetchContact(): Promise<Content>  {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/content/contact/`, {
        next: { revalidate: 300 },
    });

    if (!res.ok) {
        throw new Error(`Error al obtener datos de contacto (${res.status})`);
    }

    return res.json();
}
