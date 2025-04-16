import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./Navbar.module.scss";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className={styles.navigationbar}>
      <div className={styles.logo}>
        <div className={styles.logoImage}>
          <Image src="/logo_image.svg" alt="Logo" fill />
        </div>
        <h1>Guitar Heaven</h1>
      </div>

      <button
        className={`${styles.hamburger} ${isOpen ? styles.open : ""}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={styles.bar}></span>
        <span className={styles.bar}></span>
        <span className={styles.bar}></span>
      </button>

      <div
        className={`${styles.navigationbar_links} ${isOpen ? styles.open : ""}`}
      >
        <Link href="/" onClick={() => setIsOpen(false)}>
          ABOUT US
        </Link>
        <Link href="/products" onClick={() => setIsOpen(false)}>
          SHOP
        </Link>
        <Link href="/about" onClick={() => setIsOpen(false)}>
          FAQ
        </Link>
        <Link href="/contact" onClick={() => setIsOpen(false)}>
          CONTACT
        </Link>
        <Link href="/login" onClick={() => setIsOpen(false)}>
          LOGIN
        </Link>
      </div>
    </nav>
  );
}
