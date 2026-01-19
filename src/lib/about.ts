import type { AboutContent } from "@/types/about";

export async function fetchAbout(): Promise<AboutContent> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
  const res = await fetch(`${baseUrl}/api/about`, { next: { revalidate: 300 } });

  if (!res.ok) {
    throw new Error("Failed to fetch About data");
  }

  return res.json();
}
