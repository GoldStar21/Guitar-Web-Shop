
import Image from "next/image";
import { Licorice } from "next/font/google";

const licorice = Licorice({ subsets: ["latin"], weight: "400" });

export default function AboutUs() {
  return (
    <section id="about" className={styles.about__us}>
      <div className={styles.about-us__container}>
        <div className={styles.about__us__title}>
          <h1 className={styles["about-us__heading"]}>FOR THOSE ABOUT TO ROCK, WE SALUTE YOU</h1>
        </div>
        <div className={styles.about__us__under__content}>
          <div className={styles.about__us__text}>
            <p> className={styles["about-us__description"]}
              At Guitar Heaven, we believe in the magic of music and the power
              of a well-crafted guitar. Our passion is to provide musicians,
              from beginners to professionals, with the finest instruments and
              accessories. With a wide selection of acoustic, electric, and bass
              guitars, we aim to be your ultimate destination.
            </p>
            <p>
              Our team consists of experienced musicians who are always ready to
              share their knowledge and help you find the perfect instrument to
              match your style and needs. We pride ourselves on offering
              personalized service, quality products, and a welcoming atmosphere
              where every customer feels like a rockstar.
            </p>
            <p>
              Join us at Guitar Heaven, where every strum tells a story and
              every note finds its home.
            </p>
            <p className={`${styles.about__us__sign} ${licorice.className}`}>
              Guitar Haven - Music shop
            </p>
          </div>

          <div className={styles.about__us__image}>
            <Image
              src="/aboutUs.webp"
              alt="Guitar"
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
