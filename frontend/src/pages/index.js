import Navbar from "@/components/Navbar";
import Header from "../components/Header";
import AboutUs from "@/components/AboutUs";
import Shop from "@/components/Shop";
import FAQ from "@/components/Faq";
import Contact from "@/components/Contact";

export default function HomePage() {
  return (
    <div>
       
       <Header />
       <AboutUs />
       <Shop />
       <FAQ />
    </div>
  );
}
