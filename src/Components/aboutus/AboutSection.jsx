import styles from "./AboutSection.module.css";
import aboutUsImage from "../../../public/aboutus/aboutus_image.jpg";
import { motion } from "framer-motion";

function AboutSection() {
  return (
    <section className={styles.about}>
      <div className={styles.container}>
        
        {/* LEFT - IMAGE */}
        <motion.div 
          className={styles.image}
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <img
            src={aboutUsImage}
            alt="Gemstone"
          />
        </motion.div>

        {/* RIGHT - TEXT */}
        <motion.div 
          className={styles.content}
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
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
        </motion.div>

      </div>
    </section>
  );
}

export default AboutSection;