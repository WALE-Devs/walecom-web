import HeroSlider from "@/components/sections/HeroSlider";
import FeaturedProducts from "@/components/sections/FeaturedProducts";
import ContactSection from "@/components/sections/ContactSection";
import FAQ from "@/components/sections/FAQ";

export default function HomePage() {
  return (
    <>
      <HeroSlider />
      <FeaturedProducts />
      <FAQ />
      <ContactSection />
    </>
  );
}
