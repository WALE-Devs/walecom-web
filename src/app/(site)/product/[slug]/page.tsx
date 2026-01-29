import { fetchProductBySlug } from "@/lib/products";
import type { ProductDetail } from "@/types/product";
import Image from "next/image";
import { notFound } from "next/navigation";
import RelatedProducts from "@/components/sections/RelatedProducts";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product: ProductDetail | null = await fetchProductBySlug(slug);
  if (!product) notFound();

  const mainImage = product.main_image || product.images[0]?.image || "/images/placeholder.jpg";
  const additionalImages = product.images.slice(1);

  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        {/* Galería de imágenes */}
        <div>
          <div className="relative w-full h-[450px]">
            <Image
              src={mainImage}
              alt={product.name}
              fill
              className="object-cover rounded-xl shadow-sm"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>

          {/* Miniaturas */}
          {additionalImages.length > 0 && (
            <div className="flex gap-4 mt-4 overflow-x-auto pb-2">
              {product.images.map((img) => (
                <div
                  key={img.id}
                  className="relative w-24 h-24 flex-shrink-0 border rounded-md overflow-hidden hover:opacity-80 transition"
                >
                  <Image
                    src={img.image}
                    alt={`${product.name} - imagen ${img.position}`}
                    fill
                    className="object-cover"
                    sizes="100px"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Información del producto */}
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-gray-600 mb-6">{product.description}</p>

          {product.variants.length > 1 && (
            <div>
              <label className="block text-sm font-medium mb-2">Talla / Variante:</label>
              <select className="border rounded-md p-2 w-full max-w-xs">
                {product.variants.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.name}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      </div>

      {/* Sección de productos relacionados */}
      <RelatedProducts related={product.related_products} />
    </section>
  );
}
