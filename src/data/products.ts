import type { Product } from "@/types/product";

export const products: Product[] = [
  {
    id: 1,
    name: "Camiseta básica blanca",
    slug: "camiseta-basica-blanca",
    price: 49.90,
    image: "/images/products/camiseta-blanca.jpg",
    description: "Camiseta 100% algodón orgánico. Suave, fresca y cómoda para el día a día.",
    tags: ["ropa", "básico", "algodón"],
  },
  {
    id: 2,
    name: "Pantalón denim azul",
    slug: "pantalon-denim-azul",
    price: 139.90,
    image: "/images/products/pantalon-denim.jpg",
    description: "Pantalón de mezclilla clásico, corte regular, ideal para cualquier ocasión.",
    tags: ["ropa", "jeans", "casual"],
  },
  {
    id: 3,
    name: "Zapatillas urbanas negras",
    slug: "zapatillas-urbanas-negras",
    price: 199.90,
    image: "/images/products/zapatillas-negras.jpg",
    description: "Zapatillas de diseño urbano con suela antideslizante y plantilla acolchada.",
    tags: ["calzado", "urbano"],
  },
  {
    id: 4,
    name: "Chaqueta ligera beige",
    slug: "chaqueta-ligera-beige",
    price: 169.90,
    image: "/images/products/chaqueta-beige.jpg",
    description: "Chaqueta liviana para media estación, resistente al viento y al agua.",
    tags: ["ropa", "chaqueta", "unisex"],
  },
  {
    id: 5,
    name: "Bolso tote ecológico",
    slug: "bolso-tote-ecologico",
    price: 59.90,
    image: "/images/products/bolso-tote.jpg",
    description: "Bolso tote reutilizable hecho con materiales reciclados.",
    tags: ["accesorios", "eco", "bolso"],
  },
];
