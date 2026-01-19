import type { Content } from "@/types/content";

export async function fetchSlider(): Promise<Content> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
  const res = await fetch(`${baseUrl}/api/slider`, { next: { revalidate: 300 } });

  if (!res.ok) {
    throw new Error("Failed to fetch About data");
  }

  return res.json();
}
