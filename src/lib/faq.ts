import { apiUrl } from "@/lib/api";
import type { Content } from "@/types/content";

export async function fetchFAQ(): Promise<Content> {
  const res = await fetch(apiUrl("/content/faq/"), {
    next: { revalidate: 300 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch FAQ content");
  }

  return res.json();
}
