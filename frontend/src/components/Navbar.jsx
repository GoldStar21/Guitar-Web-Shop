import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./Navbar.module.scss";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className={styles.navigationbar}>
      <div className={styles.navigationbar__logo}>
        <div className={styles.navigationbar__image}>
          <Image src="/logo_image.svg" alt="Logo" fill />
        </div>
        <h1>Guitar Heaven</h1>
      </div>

      <button
        className={`${styles.navigationbar__hamburger} ${
          isOpen ? styles.open : ""
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={styles.navigationbar__bar}></span>
        <span className={styles.navigationbar__bar}></span>
        <span className={styles.navigationbar__bar}></span>
      </button>

      <div
        className={`${styles.navigationbar_links} ${isOpen ? styles.open : ""}`}
      >
        <Link href="#about" onClick={() => setIsOpen(false)}>
          ABOUT US
        </Link>
        <Link href="#shop" onClick={() => setIsOpen(false)}>
          SHOP
        </Link>
        <Link href="#faq" onClick={() => setIsOpen(false)}>
          FAQ
        </Link>
        <Link href="#contact" onClick={() => setIsOpen(false)}>
          CONTACT
        </Link>
        <Link href="/login" onClick={() => setIsOpen(false)}>
          LOGIN
        </Link>
      </div>
    </nav>
  );
}
