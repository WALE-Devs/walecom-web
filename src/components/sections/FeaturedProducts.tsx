import Image from "next/image";
import { fetchProducts } from "@/lib/products";

export default async function FeaturedProducts() {
  const products = await fetchProducts();
  return (
    <section className="py-16 px-6">
      <h2 className="text-3xl font-semibold mb-8 text-center">Productos Destacados</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.slice(0, 3).map((product) => (
          <div
            key={product.id}
            className="border rounded-xl p-4 shadow-sm hover:shadow-md transition"
          >
            <Image
              src={product.image}
              alt={product.name}
              width={400}
              height={224}
              className="w-full h-56 object-cover rounded-lg mb-4"
            />
            <h3 className="font-medium text-lg">{product.name}</h3>
            <p className="text-gray-600 mt-2 text-sm">{product.description}</p>
            <p className="font-semibold mt-4 text-blue-600">
              S/. {parseFloat(product.default_price).toFixed(2)}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
