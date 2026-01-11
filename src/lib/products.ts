import type { ProductListItem, ProductDetail } from "@/types/product";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export async function fetchProducts(): Promise<ProductListItem[]> {
  const res = await fetch(`${baseUrl}/api/products`, {
    next: { revalidate: 300 }, // revalida cada 300s
  });

  if (!res.ok) {
    throw new Error(`Error al obtener productos (${res.status})`);
  }

  return res.json();
}

export async function fetchProductBySlug(slug: string): Promise<ProductDetail | null> {
  const res = await fetch(`${baseUrl}/api/products/${slug}`, {
    next: { revalidate: 300 }, // revalida cada 300s
  });

  if (res.status === 404) {
    return null;
  }

  if (!res.ok) {
    throw new Error(`Error al obtener producto (${res.status})`);
  }

  return res.json();
}
