import styles from "./AboutSection.module.css";

import aboutUsImage from "../../../public/aboutus/aboutus_image.jpg";

function AboutSection() {
  return (
    <section className={styles.about}>
      <div className={styles.container}>
        
        {/* LEFT - IMAGE */}
        <div className={styles.image}>
          <img
            src={aboutUsImage}
            alt="Gemstone"
          />
        </div>

        {/* RIGHT - TEXT */}
        <div className={styles.content}>
          <h2>About Aimpluss Gems</h2>

          <p>
            At Aimpluss Gems, we specialize in sourcing premium, certified gemstones
            with complete transparency and trust. Each gem is carefully selected
            to ensure authenticity, brilliance, and unmatched quality.
          </p>

          <p>
            Our mission is to deliver not just gemstones, but confidence and value
            to every customer.
          </p>

          <a href="/about" className={styles.btn}>
            Learn More
          </a>
        </div>

      </div>
    </section>
  );
}

export default AboutSection;