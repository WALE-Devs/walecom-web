// app/api/products/route.ts
import { NextResponse } from "next/server";
import { products } from "@/data/products";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q")?.toLowerCase() || "";
  const tag = searchParams.get("tag")?.toLowerCase() || "";

  let filtered = products;

  // Filtro por texto (nombre o descripción)
  if (query) {
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query)
    );
  }

  // Filtro por tag
  if (tag) {
    filtered = filtered.filter((p) =>
      p.tags?.some((t) => t.toLowerCase() === tag)
    );
  }

  return NextResponse.json(filtered);
}
