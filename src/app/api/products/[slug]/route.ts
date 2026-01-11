// app/api/products/[slug]/route.ts
import { NextResponse } from "next/server";
import { productsDetail } from "@/data/products_detail";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  const product = productsDetail.find((p) => p.slug === slug);

  if (!product) {
    return NextResponse.json({ error: "Producto no encontrado" }, { status: 404 });
  }

  return NextResponse.json(product);
}
