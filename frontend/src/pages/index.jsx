import Hero from "../components/Hero";
import AboutUs from "@/components/AboutUs";
import Shop from "@/components/Shop";
import FAQ from "@/components/Faq";
import Contact from "@/components/Contact";
import Footer from "../components/Footer";

const HomePage = () => {
  return (
    <div>
      <Hero />
      <AboutUs />
      <Shop />
      <FAQ />
      <Contact />
      <Footer />
    </div>
  );
};

export default HomePage;
