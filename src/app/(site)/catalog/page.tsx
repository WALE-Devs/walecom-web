import { products } from "@/data/products";
import Image from "next/image";
import Link from "next/link";

export default function CatalogPage() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold text-center mb-12">
        Catálogo de Productos
      </h1>

      {/* GRID DE PRODUCTOS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {products.map((product) => (
          <Link
            href={`/product/${product.slug}`}
            key={product.id}
            className="border rounded-xl p-4 hover:shadow-md transition bg-white"
          >
            <div className="w-full h-64 relative mb-4">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <p className="text-gray-600 text-sm mt-2 line-clamp-2">
              {product.description}
            </p>
            <p className="text-blue-600 font-bold mt-4">
              S/. {product.price.toFixed(2)}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
