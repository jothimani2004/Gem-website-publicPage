import styles from "./About.module.css";
import { Link } from "react-router-dom";
import aboutimg from "../../../public/aboutus/aboutus_image.jpg"
import { useEffect, useRef, useState } from "react";


/* 💎 COUNT UP COMPONENT */
function CountUp({ end, duration = 1500, start }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;

    let startTime = null;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;

      const progress = timestamp - startTime;
      const value = Math.min((progress / duration) * end, end);

      setCount(Math.floor(value));

      if (progress < duration) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [start, end, duration]);

  return <h2>{count}+</h2>;
}


function About() {

  const statsRef = useRef(null);
  const [startCount, setStartCount] = useState(false);

  /* 💎 OBSERVER */
useEffect(() => {
  const current = statsRef.current;
  if (!current) return;

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        setStartCount(true);
        observer.unobserve(current); // 🔥 run only once
      }
    },
    { threshold: 0.2 }
  );

  observer.observe(current);

  return () => observer.disconnect();
}, []);


  return (
    <div className={styles.page}>

      {/* 💎 HERO */}
      <section className={styles.hero}>
        <h1>About Aimpluss Gems</h1>
        <p>
          Discover the beauty, authenticity, and craftsmanship behind every gemstone we offer.
        </p>
      </section>

      {/* 💎 ABOUT CONTENT */}
      <section className={styles.aboutSection}>
        <div className={styles.text}>
          <h2>Our Story</h2>
          <p>
            At Aimpluss Gems, we specialize in sourcing and delivering high-quality,
            certified gemstones. Every stone is carefully selected to ensure
            authenticity, brilliance, and lasting value.
          </p>
          <p>
            Our mission is to bring nature’s finest treasures closer to you,
            with transparency and trust at every step.
          </p>
        </div>

        <div className={styles.image}>
          <img
            src={aboutimg}
            alt="Gemstones"
          />
        </div>
      </section>

    <section className={styles.stats} ref={statsRef}>
  <div>
    <CountUp end={500} start={startCount} />
    <p>Happy Customers</p>
  </div>

  <div>
    <CountUp end={1000} start={startCount} />
    <p>Gems Delivered</p>
  </div>

  <div>
    <CountUp end={100} start={startCount} />
    <p>Certified Stones</p>
  </div>
</section>


      {/* 💎 WHY CHOOSE US */}
      <section className={styles.features}>
        <h2>Why Choose Us</h2>

        <div className={styles.grid}>
          <div className={styles.card}>
            <h3>💎 Certified Gems</h3>
            <p>All gemstones are verified and authentic.</p>
          </div>

          <div className={styles.card}>
            <h3>🌱 Ethical Sourcing</h3>
            <p>Responsibly sourced with care and transparency.</p>
          </div>

          <div className={styles.card}>
            <h3>🚚 Safe Delivery</h3>
            <p>Secure packaging with reliable shipping.</p>
          </div>

          <div className={styles.card}>
            <h3>🤝 Trusted Service</h3>
            <p>Customer satisfaction is our priority.</p>
          </div>
        </div>
      </section>



      <section className={styles.values}>
  <h2>Our Values</h2>

  <div className={styles.grid}>
    <div className={styles.card}>
      <h3>Transparency</h3>
      <p>We believe in honest pricing and clear gemstone details.</p>
    </div>

    <div className={styles.card}>
      <h3>Quality First</h3>
      <p>Every gemstone is carefully inspected before delivery.</p>
    </div>

    <div className={styles.card}>
      <h3>Customer Trust</h3>
      <p>We build long-term relationships, not just sales.</p>
    </div>
  </div>
</section>


      {/* 💎 CTA */}
      <section className={styles.cta}>
        <h2>Explore Our Collection</h2>
        <Link to="/" className={styles.ctaBtn}>
          Browse Gems <i class="fa-solid fa-arrow-right"></i> 
        </Link>
      </section>

    </div>
  );
}

export default About;