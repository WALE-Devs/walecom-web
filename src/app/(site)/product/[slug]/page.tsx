import { fetchProductBySlug } from "@/lib/products";
import type { ProductDetail } from "@/types/product";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product: ProductDetail | null = await fetchProductBySlug(slug);
  if (!product) notFound();

  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        <div className="relative w-full h-[450px]">
          <Image
            src={product.images[0]?.image || "/images/placeholder.jpg"}
            alt={product.name}
            fill
            className="object-cover rounded-xl shadow-sm"
          />
        </div>

        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-gray-600 mb-6">{product.description}</p>
          <p className="text-2xl font-semibold text-blue-600 mb-8">
            S/. {parseFloat(product.default_price).toFixed(2)}
          </p>

          <select className="border rounded-md p-2 mb-4">
            {product.variants.map((v) => (
              <option key={v.id} value={v.id}>
                {v.name} — S/. {parseFloat(v.price).toFixed(2)}
              </option>
            ))}
          </select>

          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
            Añadir al carrito
          </button>
        </div>
      </div>
    </section>
  );
}
