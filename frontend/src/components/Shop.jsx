import styles from './Shop.module.css';
import Image from "next/image";
import Link from "next/link";

export default function Shop() {
    return (
        <section className={styles.section}>
      <h2 className={styles.h2}>Take a look into our world</h2>
      
      <div className={styles.imageDiv}>
        
        <Link href="/products" className="">
          <Image
            src="/acc.webp"
            alt="Gitara 1"
            width={300}
            height={300}
            className={styles.image}
            
          />
        </Link>

        
        <Link href="/about" className="">
          <Image
            src="/ele.webp"
            alt="Gitara 2"
            width={300}
            height={300}
            className={styles.image}
          />
        </Link>

        
        <Link href="/contact" className="">
          <Image
            src="/bass.webp"
            alt="Gitara 3"
            width={300}
            height={300}
            className={styles.image}
          />
        </Link>
      </div>
    </section>
    );
}