// data/products_list.ts
import type { ProductListItem } from "@/types/product";

export const productsList: ProductListItem[] = [
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
    image: "http://127.0.0.1:8000/media/bte_uC46f8B.jpg",
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
    image: "http://127.0.0.1:8000/media/zun_QUN2DQV.jpg",
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
    image: "http://127.0.0.1:8000/media/cbb_SoYFOZ8.png",
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
    image: "http://127.0.0.1:8000/media/clb_IqhHngd.jpg",
    tags: ["ropa", "chaqueta", "unisex"],
  },
];
