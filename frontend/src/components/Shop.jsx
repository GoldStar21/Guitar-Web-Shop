import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const Shop = () => {
  const imageRefs = useRef([]);

  useEffect(() => {
    gsap.utils.toArray(".shop__card__image").forEach((image, index) => {
      gsap.fromTo(
        image,
        { opacity: 0, y: 100 },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: "power3.out",
          delay: index * 0.3,
          scrollTrigger: {
            trigger: image,
            start: "top 80%",
            end: "bottom 90%",
            scrub: true,
          },
        }
      );
    });
  }, []);
  return (
    <section id="shop" className="shop">
      <div className="c-container">
        <h1 className="shop__heading">Take a look of what we have</h1>

        <div className="shop__content">
          <a href="/category/electric" className="shop__card">
            <img
              src="/acoustic_guitar.jpg"
              alt="Electric Guitars"
              className="shop__card__image"
            />
            <h3 className="shop__card__title">Electric Guitars</h3>
          </a>

          <a href="/category/acoustic" className="shop__card">
            <img
              src="/electric_guitar.jpg"
              alt="Acoustic Guitars"
              className="shop__card__image"
            />
            <h3 className="shop__card__title">Acoustic Guitars</h3>
          </a>

          <a href="/category/bass" className="shop__card">
            <img
              src="/bass_guitar.jpg"
              alt="Bass Guitars"
              className="shop__card__image"
            />
            <h3 className="shop__card__title">Bass Guitars</h3>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Shop;
