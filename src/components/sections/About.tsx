// components/sections/About.tsx
import { getAboutInfo } from "@/lib/about";

export default async function AboutSection() {
  const about = await getAboutInfo();

  return (
    <section id="nosotros" className="py-20 bg-white text-gray-800">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold mb-6">{about.titulo}</h2>
        <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto mb-8">
          {about.descripcion}
        </p>

        <div className="grid md:grid-cols-2 gap-8 text-left mt-12">
          <div>
            <h3 className="text-2xl font-semibold mb-2 text-blue-600">
              Nuestra Misión
            </h3>
            <p className="text-gray-700">{about.mision}</p>
          </div>
          <div>
            <h3 className="text-2xl font-semibold mb-2 text-blue-600">
              Nuestra Visión
            </h3>
            <p className="text-gray-700">{about.vision}</p>
          </div>
        </div>

        <div className="mt-12">
          <h3 className="text-xl font-semibold mb-3">Nuestros Valores</h3>
          <ul className="flex flex-wrap justify-center gap-3">
            {about.valores.map((valor: string) => (
              <li
                key={valor}
                className="bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium"
              >
                {valor}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
