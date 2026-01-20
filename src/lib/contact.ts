import { apiUrl } from "@/lib/api";
import type { Content } from "@/types/content";

export async function fetchContact(): Promise<Content>  {
    const res = await fetch(apiUrl("/content/contact/"), {
            next: { revalidate: 300 },
        });

    if (!res.ok) {
        throw new Error(`Error al obtener datos de contacto (${res.status})`);
    }

    return res.json();
}
