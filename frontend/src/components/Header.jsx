import styles from "./Header.module.scss";
import Navbar from "./Navbar";
import Image from "next/image";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <Navbar />

        <div className={styles.header__content}>
          <div className={styles.header__content__image}>
            <Image
              src="header_image.svg"
              alt="Slika"
              fill
              style={{ objectFit: "contain" }}
            />
          </div>
          <div className={styles.header__content__text}>
            <h1 className={styles.header__title}>Welcome to "Guitar Heaven"</h1>
            <p className={styles.text}>
              Your search for best guitar shop ends here, but your search for
              perfect guitar is about to start.
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
