
export interface ProductListItem {
  id: number;
  name: string;
  slug: string;
  description: string;
  base_sku: string;
  category: string | null;
  currency: string;
  default_price: string;
  default_stock: number;
  image_path: string;
  image_url: string;
  tags: string[];
}

export interface ProductImage {
  id: number;
  product: number;
  image_path: string;
  image_url: string;
  position: number;
}

export interface ProductVariant {
  id: number;
  name: string;
  sku: string;
  price: string;
  stock: number;
}

export interface RelatedProduct {
  id: number;
  name: string;
  slug: string;
  price: string;
  currency: string;
  image_path: string;
  image_url: string;
}

export interface ProductDetail {
  id: number;
  name: string;
  slug: string;
  description: string;
  base_sku: string;
  category: string | null;
  currency: string;
  default_price: string;
  default_stock: number;
  main_image_path: string;
  main_image_url: string;
  images: ProductImage[];
  variants: ProductVariant[];
  related_products: RelatedProduct[];
  tags: string[];
}
