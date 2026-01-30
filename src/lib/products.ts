// src/lib/products.ts
import { apiUrl } from "@/lib/api";
import type { ProductListItem, ProductDetail } from "@/types/product";

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

    const data = await res.json();
    // Handle paginated response
    if (data && typeof data === 'object' && 'results' in data) {
        return data.results as ProductListItem[];
    }
    return data as ProductListItem[];
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
    return product;
}
