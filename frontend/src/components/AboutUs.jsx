import { Licorice } from "next/font/google";
import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
const licorice = Licorice({ subsets: ["latin"], weight: "400" });

const AboutUs = () => {
  const imageRef = useRef(null);

  useEffect(() => {
    // Animation create
    gsap.fromTo(
      imageRef.current,
      { opacity: 0, y: 100 },
      {
        opacity: 1,
        y: 0,
        duration: 4.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: imageRef.current,
          start: "top 100%",
          end: "bottom 90%",
          scrub: true,
        },
      }
    );
  }, []);

  return (
    <section id="about" className="about">
      <div className="c-container">
        <div className="about__container">
          <h1 className="about__container__heading">
            FOR THOSE ABOUT TO ROCK, WE SALUTE YOU
          </h1>
          <div className="about__content">
            <div className="about__content__left">
              <p className="about__content__left__description">
                At Guitar Heaven, we believe in the magic of music and the power
                of a well-crafted guitar. Our passion is to provide musicians,
                from beginners to professionals, with the finest instruments and
                accessories. With a wide selection of acoustic, electric, and
                bass guitars, we aim to be your ultimate destination.Our team
                consists of experienced musicians who are always ready to share
                their knowledge and help you find the perfect instrument to
                match your style and needs. We pride ourselves on offering
                personalized service, quality products, and a welcoming
                atmosphere where every customer feels like a rockstar.Join us at
                Guitar Heaven, where every strum tells a story and every note
                finds its home.
              </p>
              <p className="about__content__left__signature">
                Guitar Haven - Music shop
              </p>
            </div>

            <img
              ref={imageRef}
              src="/aboutUs.webp"
              alt="Store"
              className="about__content__image"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
