import Hero from "../components/home_components/Hero";
import AboutUs from "@/components/home_components/AboutUs";
import Shop from "@/components/home_components/Shop";
import FAQ from "@/components/home_components/Faq";
import Contact from "@/components/home_components/Contact";
import Footer from "../components/home_components/Footer";

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
