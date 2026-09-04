import styles from "./AboutSection.module.css";
import { motion } from "framer-motion";

function AboutSection() {
  return (
    <section className={styles.about}>
      <div className={styles.container}>
        
        {/* LEFT - VIDEO */}
        <motion.div 
          className={styles.image}
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <video
            src="/aboutus/aboutus_video.mp4"
            autoPlay
            loop
            muted
            playsInline
            className={styles.video}
          >
            Your browser does not support the video tag.
          </video>
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
            <strong>Aimpluss</strong> means <em>Positive Motivations of Life</em>. Based in the
            Gemstone World of <strong>Bangkok, Thailand</strong>, we have been in the gemstone
            business since <strong>2004</strong> — selling high-quality, natural earth-mined
            loose gemstones and colour stones worldwide.
          </p>

          <p>
            We source natural rough stones from <strong>Sri Lanka &amp; Thailand</strong>, cut and
            polish them to perfection. Most gems are certified by Bangkok and Sri Lanka laboratories.
            We also attend international Gem &amp; Jewellery Shows in Bangkok, Hong Kong, and the USA.
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