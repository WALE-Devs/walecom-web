// app/page.tsx
import HeroSection from "@/components/sections/HeroSection";
import FeaturedProducts from "@/components/sections/FeaturedProducts";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedProducts />
    </>
  );
}
