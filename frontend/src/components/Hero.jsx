import Navbar from "./Navbar";
import Image from "next/image";

const Hero = () => {
  return (
    <section className="hero">
      <div className="c-container">
        <div className="hero__container">
          <Navbar />
          <div className="hero__content">
            <img
              src="/header_imageee.svg"
              alt="Hero image"
              className="hero__content__image"
            />
            <div className="hero__content__right">
              <h1 className="hero__content__right__title">
                Welcome to "Guitar Heaven"
              </h1>
              <p className="hero__content__right__description">
                Your search for best guitar shop ends here, but your search for
                perfect guitar is about to start.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
