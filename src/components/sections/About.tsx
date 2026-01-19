import { fetchAbout } from "@/lib/about";

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((v) => typeof v === "string");
}

export default async function AboutPage() {
  const about = await fetchAbout();

  const mission = about.blocks.find((b) => b.identifier === "mission");
  const vision = about.blocks.find((b) => b.identifier === "vision");
  const values = about.blocks.find((b) => b.identifier === "values");

  const valuesItems = isStringArray(values?.items) ? values!.items : [];

  return (
    <section className="max-w-6xl mx-auto px-6 py-16 space-y-24">
      {/* Page header */}
      <header className="text-center">
        <h1 className="text-4xl font-bold mb-6">{about.title}</h1>
        <p className="text-gray-600 text-lg leading-relaxed max-w-3xl mx-auto">
          {about.description}
        </p>
      </header>

      {/* Values Section */}
      {values && (
        <div className="text-center bg-blue-50/30 py-12 px-6 rounded-2xl shadow-sm">
          <h2 className="text-3xl font-semibold mb-6 text-blue-900">
            {values.title}
          </h2>

          {values.subtitle && (
            <p className="text-blue-600 text-sm uppercase tracking-wide mb-2">
              {values.subtitle}
            </p>
          )}

          {values.content_text && (
            <p className="text-gray-700 leading-relaxed max-w-2xl mx-auto mb-8">
              {values.content_text}
            </p>
          )}

          {/* Value chips */}
          <div className="flex flex-wrap justify-center gap-4">
            {valuesItems.map((item, index) => (
              <span
                key={index}
                className="px-5 py-2 bg-blue-600 text-white rounded-full text-sm font-medium shadow-md hover:bg-blue-700 transition"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Mission & Vision */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {[mission, vision].map(
          (block) =>
            block && (
              <div
                key={block.id}
                className="bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 p-10 text-center"
              >
                <h2 className="text-2xl font-semibold mb-4 text-blue-900">
                  {block.title}
                </h2>

                {block.content_text && (
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {block.content_text}
                  </p>
                )}
              </div>
            )
        )}
      </div>
    </section>
  );
}
