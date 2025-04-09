import Navbar from "@/components/Navbar";
import Header from "../components/Header";
import AboutUs from "@/components/AboutUs";
import Shop from "@/components/Shop";
import FAQ from "@/components/Faq";

export default function HomePage() {
  return (
    <div>
       <Navbar />
       <Header />
       <AboutUs />
       <Shop />
       <FAQ />
    </div>
  );
}
