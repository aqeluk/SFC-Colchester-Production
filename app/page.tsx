import Featured from "@/components/FeaturedItems";
import HomeContent from "@/components/HomeContent";
import HomeTestimonials from "@/components/HomeTestimonials";
import Offer from "@/components/Offer";
import Slider from "@/components/Slider";

export default function Home() {
  return (
    <main className="bg-blue-50">
      <Offer />
      <Slider />
      <Featured />
      <HomeContent />
      <HomeTestimonials />
    </main>
  );
}
