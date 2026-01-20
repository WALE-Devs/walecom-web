import { apiUrl } from "@/lib/api";
import type { Content } from "@/types/content";


export async function fetchAbout(): Promise<Content> {
    const res = await fetch(apiUrl("/content/about/"), {
        next: { revalidate: 300 },
    });

    if (!res.ok) {
        throw new Error("Failed to fetch About data");
    }

    return res.json();
}
