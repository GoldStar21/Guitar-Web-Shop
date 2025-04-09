import styles from './Navbar.module.css';
import Link from "next/link";
import Image from 'next/image';

export default function Navbar() {
  return (
    
    <nav className={styles.navbar}>

     {/* Logo */}
     <div className={styles.logo}>
        <Image src="/logo.svg" alt="Logo" width={80} height={80} />
        <h1>Guitar Heaven</h1>
      </div>

      {/* Links */}
      <div className={styles.links}>
        <Link href="/">ABOUT US</Link>
        <Link href="/products">SHOP</Link>
        <Link href="/about">FAQ</Link>
        <Link href="/contact">CONTACT</Link>
        <Link href="/contact">Login</Link>
      </div>
    </nav>
  );
}
