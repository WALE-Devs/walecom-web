import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { fetchProducts, fetchProductBySlug } from "@/lib/products";

export async function generateStaticParams() {
  const products = await fetchProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export default async function ProductPage({ params }: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await fetchProductBySlug(slug);

  if (!product) notFound();

  const products = await fetchProducts();
  const related = products.filter((p) => p.id !== product.id).slice(0, 3);

  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
      <Link href="/catalog" className="text-blue-600 hover:underline mb-8 inline-block">
        ← Volver al catálogo
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        <div className="relative w-full h-[450px]">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover rounded-xl shadow-sm"
          />
        </div>

        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-gray-600 mb-6 leading-relaxed">
            {product.description}
          </p>
          <p className="text-2xl font-semibold text-blue-600 mb-8">
            S/. {product.price.toFixed(2)}
          </p>

          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
            Añadir al carrito
          </button>
        </div>
      </div>

      <div className="mt-16">
        <h2 className="text-2xl font-semibold mb-6">También te puede interesar</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {related.map((r) => (
            <Link
              key={r.id}
              href={`/product/${r.slug}`}
              className="border rounded-xl p-4 hover:shadow-md transition bg-white"
            >
              <div className="relative w-full h-56 mb-4">
                <Image
                  src={r.image}
                  alt={r.name}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              <h3 className="font-medium">{r.name}</h3>
              <p className="text-blue-600 font-semibold mt-2">
                S/. {r.price.toFixed(2)}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
