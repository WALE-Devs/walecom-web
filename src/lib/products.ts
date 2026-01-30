// src/lib/products.ts
import { apiUrl } from "@/lib/api";
import type { ProductListItem, ProductDetail, Category } from "@/types/product";

/**
 * Fetch list of products from the Django API with optional search and filters.
 */
export async function fetchProducts(params: { search?: string; category?: string; tags?: string } = {}): Promise<ProductListItem[]> {
    const query = new URLSearchParams();
    if (params.search) query.append("search", params.search);
    if (params.category) query.append("category", params.category);
    if (params.tags) query.append("tags", params.tags);

    const queryString = query.toString();
    const url = apiUrl(`/products/${queryString ? `?${queryString}` : ""}`);

    const res = await fetch(url, {
        next: { revalidate: 300 },
    });

    if (!res.ok) {
        throw new Error(`Failed to fetch product list: ${res.status}`);
    }

    const data = await res.json();
    if (data && typeof data === 'object' && 'results' in data) {
        return data.results as ProductListItem[];
    }
    return data as ProductListItem[];
}

/**
 * Fetch all categories.
 */
export async function fetchCategories(): Promise<Category[]> {
    const res = await fetch(apiUrl("/products/categories/"), {
        next: { revalidate: 3600 },
    });

    if (!res.ok) {
        throw new Error(`Failed to fetch categories: ${res.status}`);
    }

    const data = await res.json();
    if (data && typeof data === 'object' && 'results' in data) {
        return data.results as Category[];
    }
    return data as Category[];
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
