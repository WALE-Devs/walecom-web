import type { RelatedProduct } from "@/types/product";
import Link from "next/link";
import Image from "next/image";

interface Props {
  related: RelatedProduct[];
}

export default function RelatedProducts({ related }: Props) {
  if (!related || related.length === 0) return null;

  return (
    <section className="mt-20">
      <h2 className="text-2xl font-semibold mb-8">Productos relacionados</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {related.map((p) => (
          <Link
            key={p.id}
            href={`/product/${p.slug}`}
            className="border rounded-xl p-4 bg-white hover:shadow-md transition"
          >
            <div className="relative w-full h-64 mb-4">
              <Image
                src={p.image}
                alt={p.name}
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <h3 className="text-lg font-semibold">{p.name}</h3>
          </Link>
        ))}
      </div>
    </section>
  );
}
