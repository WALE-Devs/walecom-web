// src/lib/products.ts
import { apiUrl } from "@/lib/api";
import type { ProductListItem, ProductDetail } from "@/types/product";
import { getImageUrl } from "./media";

/**
 * Fetch list of products from the Django API
 */
export async function fetchProducts(): Promise<ProductListItem[]> {
    const res = await fetch(apiUrl("/products/"), {
        next: { revalidate: 300 },
    });

    if (!res.ok) {
        throw new Error(`Failed to fetch product list: ${res.status}`);
    }

    const data: ProductListItem[] = await res.json();

    // Normalize image URLs if backend sends relative paths
    return data.map((p) => ({
        ...p,
        image_url: getImageUrl(p.image_path),
    }));
}

/**
 * Fetch detailed product info by slug from the Django API
 */
export async function fetchProductBySlug(slug: string): Promise<ProductDetail | null> {
    const res = await fetch(apiUrl(`/products/${slug}/`), {
        next: { revalidate: 300 },
    });

    if (res.status === 404) return null;
    if (!res.ok) {
        throw new Error(`Failed to fetch product detail for slug "${slug}": ${res.status}`);
    }

    const product: ProductDetail = await res.json();

    // Normalize images
    return {
        ...product,
        main_image_url: getImageUrl(product.main_image_path),
        images: product.images.map((img) => ({
            ...img,
            image_url: getImageUrl(img.image_path),
        })),
        related_products: product.related_products.map((r) => ({
            ...r,
            image_url: getImageUrl(r.image_path),
        })),
    };
}
