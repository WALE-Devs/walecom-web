export interface BaseProduct {
  id: number;
  name: string;
  slug: string;
  description: string;
  base_sku: string;
  category: string | null;
  currency: string;
  default_price: string;
  default_stock: number;
  tags: string[];
}

export interface ProductListItem extends BaseProduct {
  image: string;
}

export interface ProductImage {
  id: number;
  product: number;
  image: string;
  is_main: boolean;
}

export interface ProductVariant {
  id: number;
  name: string;
  sku: string;
  price: string;
  stock: number;
}

export interface ProductDetail extends BaseProduct {
  images: ProductImage[];
  variants: ProductVariant[];
}
