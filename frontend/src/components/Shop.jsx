import styles from "./Shop.module.scss";
import Image from "next/image";
import Link from "next/link";

export default function Shop() {
  return (
    <section id="shop" className={styles.shop}>
      <div className={styles.shop__container}>
        <h2 className={styles.shop__title}>Take a look of what we have</h2>

        <div className={styles.shop__content}>
          <div className={styles.shop__images}>
            <Link href="/products" className="">
              <Image
                src="/acoustic_guitar.webp"
                alt="Acoustic guitar"
                fill
                style={{ objectFit: "cover" }}
              />
            </Link>

            <Link href="/products" className="">
              <Image
                src="/electric_guitar.webp"
                alt="E"
                fill
                style={{ objectFit: "cover" }}
              />
            </Link>

            <Link href="/products" className="">
              <Image
                src="/bass_guitar.webp"
                alt="Gitara 3"
                fill
                style={{ objectFit: "cover" }}
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
