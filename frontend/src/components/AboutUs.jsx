import styles from "./AboutUs.module.scss";
import Image from "next/image";

export default function AboutUs() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.under_container_div}>
          <div className={styles.textWrapper}>
            <p className={styles.text}>
              At Guitar Heaven, we believe in the magic of music and the power
              of a well-crafted guitar. Our passion is to provide musicians,
              from beginners to professionals, with the finest instruments and
              accessories. With a wide selection of acoustic, electric, and bass
              guitars, we aim to be your ultimate destination.
            </p>
            <p className={styles.text}>
              Our team consists of experienced musicians who are always ready to
              share their knowledge and help you find the perfect instrument to
              match your style and needs. We pride ourselves on offering
              personalized service, quality products, and a welcoming atmosphere
              where every customer feels like a rockstar.
            </p>
            <p className={styles.text}>
              Join us at Guitar Heaven, where every strum tells a story and
              every note finds its home.
            </p>
            <p className={styles.textt}>Guitar Haven - Music shop</p>
          </div>

          <div className={styles.imageWrapper}>
            <Image
              src="/vitaly.webp"
              alt="Guitar"
              width={500}
              height={500}
              className={styles.image}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
