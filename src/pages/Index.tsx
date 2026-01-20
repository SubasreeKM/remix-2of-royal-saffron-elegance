import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/home/HeroSection";
import ProductShowcase from "@/components/home/ProductShowcase";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import JourneySection from "@/components/home/JourneySection";
import GiftingSection from "@/components/home/GiftingSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <ProductShowcase />
      <WhyChooseUs />
      <JourneySection />
      <GiftingSection />
      <TestimonialsSection />
    </Layout>
  );
};

export default Index;
