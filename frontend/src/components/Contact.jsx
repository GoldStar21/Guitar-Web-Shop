import styles from "./Contact.module.scss";

export default function Contact() {
  return (
    <section id="contact" className={styles.contact}>
      <div className={styles.contact__title}>
        <h1>Contact information</h1>
      </div>
      <div className={styles.contact__container}>
        <div className={styles.contact__content}>
          <div className={styles.contact__text}>
            <p>
              Music Shop "Guitar Heaven"
              <br />
              Main St. 3045 New York, New York
            </p>
            <p>
              Working hours:
              <br />
              Mon - Fri: 08 AM - 05 PM
              <br />
              Sat: 08 AM - 02 PM
              <br />
              Sun: CLOSED
            </p>
            <p>
              Contact:
              <br />
              E-mail: music.heaven@gmail.com
              <br />
              Tel: +1 (555) 123-9483
              <br />
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
