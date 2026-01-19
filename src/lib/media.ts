/**
 * Construye una URL completa para una imagen basada en la ruta relativa.
 * Si no se pasa una ruta, devuelve un placeholder.
 */
export function getImageUrl(path?: string | null): string {
    if (!path) return "/images/placeholder.jpg";

    const base = process.env.NEXT_PUBLIC_MEDIA_URL;
    if (!base) {
        console.warn("NEXT_PUBLIC_MEDIA_URL is not configured");
        return path; // simple fallback
    }

    // Asegura que no haya doble barra al concatenar
    return `${base.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;
}
