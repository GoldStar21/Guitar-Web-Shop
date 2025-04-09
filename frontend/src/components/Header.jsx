import styles from './Header.module.css';
import Navbar from "./Navbar";

export default function Header() {
  return (
    <div>
      <Navbar />
      <header
        className={styles.header}
        style={{ backgroundImage: "url('/london.webp')" }}
      >
        <div className={styles.overlay}></div>
        
      </header>
    </div>
  );
}