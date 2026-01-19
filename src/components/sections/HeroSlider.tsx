"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { fetchSlider } from "@/lib/slider";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Content } from "@/types/content";

export default function HeroSlider() {
  const [slider, setSlider] = useState<Content | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  // Fetch slider data
  useEffect(() => {
    async function loadSlider() {
      try {
        const data = await fetchSlider();
        setSlider(data);
      } catch (err) {
        console.error("Error fetching slider:", err);
      } finally {
        setLoading(false);
      }
    }
    loadSlider();
  }, []);

  // Extract active and sorted slides
  const slides =
    slider?.blocks
      .filter((b) => b.is_active && b.image_url)
      .sort((a, b) => a.order - b.order) || [];

  // Auto-slide
  useEffect(() => {
    if (slides.length === 0) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides]);

  // Loading state
  if (loading) {
    return (
      <section className="flex items-center justify-center h-[60vh] bg-gray-100">
        <p className="text-gray-500">Cargando slider...</p>
      </section>
    );
  }

  // Fallback: no slides
  if (!slider || slides.length === 0) {
    return (
      <section className="flex flex-col items-center justify-center text-center py-24 bg-gray-50">
        <h1 className="text-5xl font-bold mb-4">Bienvenido a My Landing</h1>
        <p className="text-lg text-gray-600 max-w-2xl">
          Descubre productos increíbles y ofertas especiales.
        </p>
      </section>
    );
  }

  // Render slider
  return (
    <section className="relative w-full h-[70vh] overflow-hidden">
      {/* Slides container */}
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slides.map((slide) => (
          <div key={slide.id} className="relative flex-shrink-0 w-full h-[70vh]">
            <Image
              src={slide.image_url!}
              alt={slide.title || "Banner"}
              fill
              className="object-cover"
              priority={true}
            />

            {/* Optional overlay text */}
            {(slide.title || slide.subtitle) && (
              <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-white text-center p-6">
                {slide.title && (
                  <h2 className="text-4xl font-bold mb-2">{slide.title}</h2>
                )}
                {slide.subtitle && (
                  <p className="text-lg max-w-xl">{slide.subtitle}</p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Controls */}
      <button
        onClick={() =>
          setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
        }
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow-md transition"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={() => setCurrentIndex((prev) => (prev + 1) % slides.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow-md transition"
      >
        <ChevronRight size={24} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-5 w-full flex justify-center gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition ${
              index === currentIndex
                ? "bg-blue-600 scale-110"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
