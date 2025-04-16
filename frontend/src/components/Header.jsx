import styles from "./Header.module.scss";
import Navbar from "./Navbar";
import Image from "next/image";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.header_container}>
        <Navbar />

        <div className={styles.under_container_div}>
          <div className={styles.right_side_image}>
            <Image
              src="header_image.svg"
              alt="Slika"
              fill
              style={{ objectFit: "contain" }}
            />
          </div>
          <div className={styles.left_side_text}>
            <h1 className={styles.header_title}>Welcome to "Guitar Heaven"</h1>
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
