// app/api/products/[slug]/route.ts
import { NextResponse } from "next/server";
import { products } from "@/data/products";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params; // 👈 Esperamos la promesa

  const product = products.find((p) => p.slug === slug);

  if (!product) {
    return NextResponse.json({ error: "Producto no encontrado" }, { status: 404 });
  }

  return NextResponse.json(product);
}
