// app/api/products/route.ts
import { NextResponse } from "next/server";
import { productsList } from "@/data/products_list";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const tag = searchParams.get("tag");

  // Filtro opcional por tag (solo ejemplo)
  const filtered = tag
    ? productsList.filter((p) => p.tags.includes(tag))
    : productsList;

  return NextResponse.json(filtered);
}
