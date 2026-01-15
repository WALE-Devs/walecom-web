// lib/products.ts
import { getImageUrl } from "./media";
import { productsList } from "@/data/products_list";
import { productsDetail } from "@/data/products_detail";
import type { ProductListItem, ProductDetail } from "@/types/product";

/**
 * Simula fetch de productos (lista)
 */
export async function fetchProducts(): Promise<ProductListItem[]> {
  // En un futuro, puedes reemplazar esto por un fetch real:
  // const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`);
  // const data = await res.json();

  return productsList.map((p) => ({
    ...p,
    image_url: getImageUrl(p.image_path),
  }));
}

/**
 * Simula fetch de detalle de producto
 */
export async function fetchProductBySlug(slug: string): Promise<ProductDetail | null> {
  const product = productsDetail.find((p) => p.slug === slug);
  if (!product) return null;

  return {
    ...product,
    main_image_url: getImageUrl(product.main_image_path),
    images: product.images.map((img) => ({
      ...img,
      image_url: getImageUrl(img.image_path),
    })),
    related_products: product.related_products.map((r) => ({
      ...r,
      image_path: getImageUrl(r.image_path),
    })),
  };
}
