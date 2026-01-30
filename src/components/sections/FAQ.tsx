import { fetchFAQ } from "@/lib/faq";

export default async function FAQ() {
  const content = await fetchFAQ();

  // FAQ blocks have content_text with questions and answers
  const faqBlocks = content.blocks.sort((a, b) => a.order - b.order);

  if (faqBlocks.length === 0) {
    return null;
  }

  return (
    <section className="max-w-4xl mx-auto px-6 py-16">
      <h2 className="text-3xl font-bold text-center mb-12 text-blue-900">
        Preguntas Frecuentes
      </h2>

      <div className="space-y-4">
        {faqBlocks.map((block) => (
          <details
            key={block.id}
            className="group bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition"
          >
            <summary className="flex justify-between items-center cursor-pointer p-6 font-medium text-lg text-gray-800 hover:text-blue-600 transition select-none">
              {block.title}
              <span className="transition group-open:rotate-180">
                <svg
                  fill="none"
                  height="24"
                  shapeRendering="geometricPrecision"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  width="24"
                >
                  <path d="M6 9l6 6 6-6"></path>
                </svg>
              </span>
            </summary>
            <div className="px-6 pb-6 text-gray-600 leading-relaxed">
              {block.content_text}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
