import styles from "./Faq.module.scss";

export default function FAQ() {
  return (
    <section id="faq" className={styles.faq}>
      <div className={styles.faq__container}>
        <h2 className={styles.faq__title}>Frequently Asked Questions</h2>

        <div className={styles.faq__content}>
          <div className={styles.faq__item}>
            <h3 className={styles.faq__question}>
              Do you offer beginner-friendly guitars?
            </h3>
            <p className={styles.faq__answer}>
              Yes! We have a wide range of beginner guitars, both acoustic and
              electric, that are easy to play and budget-friendly. Our staff is
              happy to help you find the perfect match.
            </p>
          </div>

          <div className={styles.faq__item}>
            <h3 className={styles.faq__question}>
              Can I try the guitars before buying?
            </h3>
            <p className={styles.faq__answer}>
              Absolutely. You’re welcome to test any guitar in-store. We want
              you to feel the sound and comfort before making a decision.
            </p>
          </div>

          <div className={styles.faq__item}>
            <h3 className={styles.faq__question}>What brands do you carry?</h3>
            <p className={styles.faq__answer}>
              We carry top brands including Fender, Gibson, Yamaha, Ibanez,
              Taylor, and more.
            </p>
          </div>

          <div className={styles.faq__item}>
            <h3 className={styles.faq__question}>
              Do you ship internationally?
            </h3>
            <p className={styles.faq__answer}>
              Currently, we ship within the country. For international orders,
              please contact us directly and we’ll try to accommodate you.
            </p>
          </div>

          <div className={styles.faq__item}>
            <h3 className={styles.faq__question}>
              What is your return policy?
            </h3>
            <p className={styles.faq__answer}>
              Unused items can be returned within 14 days with the original
              receipt. Guitars must be in the same condition as purchased.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
