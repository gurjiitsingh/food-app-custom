import Hero from "@/components/Hero"
//import Slider from "@/components/Slider";
import HowOrder from "@/components/HowOrder"
import Footer from "@/components/Footer";
export default function Home() {
 
  return (
    <div className="overflow-hidden">
  
    <Hero />
    {/* <Slider /> */}
    <HowOrder />    
    <Footer />
    </div>
  );
}
