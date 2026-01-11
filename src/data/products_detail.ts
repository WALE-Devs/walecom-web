// data/products_detail.ts
import type { ProductDetail } from "@/types/product";

export const productsDetail: ProductDetail[] = [
  {
    id: 1,
    name: "Bolso tote ecológico",
    slug: "bolso-tote-ecologico",
    description: "Bolso tote reutilizable hecho con materiales reciclados.",
    base_sku: "BTE",
    category: null,
    currency: "PEN",
    default_price: "59.90",
    default_stock: 0,
    images: [
      {
        id: 4,
        product: 1,
        image: "http://127.0.0.1:8000/media/bte_uC46f8B.jpg",
        is_main: true,
      },
    ],
    variants: [
      {
        id: 1,
        name: "Default",
        sku: "BTE-DEF",
        price: "59.90",
        stock: 50,
      },
    ],
    tags: ["accesorios", "eco", "bolso"],
  },
  {
    id: 2,
    name: "Zapatilla Urbana Negra",
    slug: "zapatilla-urbana-negra",
    description:
      "Zapatillas de diseño urbano con suela antideslizante y plantilla acolchada.",
    base_sku: "ZUN",
    category: null,
    currency: "PEN",
    default_price: "199.90",
    default_stock: 0,
    images: [
      {
        id: 3,
        product: 2,
        image: "http://127.0.0.1:8000/media/zun_QUN2DQV.jpg",
        is_main: true,
      },
    ],
    variants: [
      { id: 2, name: "42", sku: "ZUN-42", price: "199.90", stock: 20 },
      { id: 3, name: "43", sku: "ZUN-43", price: "199.90", stock: 30 },
      { id: 4, name: "44", sku: "ZUN-44", price: "199.90", stock: 40 },
    ],
    tags: ["calzado", "urbano"],
  },
  {
    id: 4,
    name: "Camiseta básica blanca",
    slug: "camiseta-basica-blanca",
    description:
      "Camiseta 100% algodón orgánico. Suave, fresca y cómoda para el día a día.",
    base_sku: "CBB",
    category: null,
    currency: "PEN",
    default_price: "49.90",
    default_stock: 0,
    images: [
      {
        id: 2,
        product: 4,
        image: "http://127.0.0.1:8000/media/cbb_SoYFOZ8.png",
        is_main: true,
      },
    ],
    variants: [
      { id: 6, name: "XS", sku: "CBB-XS", price: "49.90", stock: 20 },
      { id: 7, name: "S", sku: "CBB-S", price: "49.90", stock: 30 },
      { id: 8, name: "M", sku: "CBB-M", price: "49.90", stock: 40 },
      { id: 9, name: "L", sku: "CBB-L", price: "49.90", stock: 40 },
      { id: 10, name: "XL", sku: "CBB-XL", price: "49.90", stock: 40 },
    ],
    tags: ["ropa", "básico", "algodón"],
  },
  {
    id: 5,
    name: "Chaqueta ligera beige",
    slug: "chaqueta-ligera-beige",
    description:
      "Chaqueta liviana para media estación, resistente al viento y al agua.",
    base_sku: "CLB",
    category: null,
    currency: "PEN",
    default_price: "169.90",
    default_stock: 0,
    images: [
      {
        id: 1,
        product: 5,
        image: "http://127.0.0.1:8000/media/clb_IqhHngd.jpg",
        is_main: true,
      },
    ],
    variants: [
      { id: 12, name: "S", sku: "CLB-S", price: "169.90", stock: 20 },
      { id: 13, name: "M", sku: "CLB-M", price: "169.90", stock: 30 },
      { id: 14, name: "L", sku: "CLB-L", price: "169.90", stock: 40 },
      { id: 15, name: "XL", sku: "CLB-XL", price: "169.90", stock: 40 },
    ],
    tags: ["ropa", "chaqueta", "unisex"],
  },
];
