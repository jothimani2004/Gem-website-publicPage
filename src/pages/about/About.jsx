import styles from "./About.module.css";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import SEO from "../../Components/common/SEO/SEO";


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


  const aboutSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "AboutPage",
        "@id": "https://aimplussgems.com/about#webpage",
        "url": "https://aimplussgems.com/about",
        "name": "About Aimpluss Gems",
        "description": "Learn about Aimpluss Gems, founded in 2004 in Bangkok & Sri Lanka. Natural, unheated certified gemstones with global delivery."
      },
      {
        "@type": "LocalBusiness",
        "@id": "https://aimplussgems.com/#localbusiness",
        "name": "Aimpluss Gems",
        "url": "https://aimplussgems.com",
        "description": "Natural loose gemstones merchant in Bangkok, Thailand since 2004.",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Bangkok",
          "addressCountry": "Thailand"
        }
      }
    ]
  };

  return (
    <div className={styles.page}>
      <SEO
        title="About Us | 20+ Years Premium Gemstone Trader"
        description="Learn about Aimpluss Gems — founded in 2004 in Bangkok, Thailand. We source, cut, and polish natural earth-mined precious & semi-precious gemstones."
        keywords="about aimpluss gems, bangkok gemstone trader, natural unheated sapphires, gemstone certification, sri lanka gem cutting"
        canonical="https://aimplussgems.com/about"
        schema={aboutSchema}
      />

      {/* 💎 HERO */}
      <section className={styles.hero}>
        <h1>About Aimpluss Gems</h1>
        <p>
          "Aimpluss" means <em>Positive Motivations of Life</em> — based in the Gemstone World of Bangkok, Thailand.
        </p>
      </section>

      {/* 💎 ABOUT CONTENT */}
      <section className={styles.aboutSection}>
        <div className={styles.text}>
          <h2>Our Story</h2>
          <p>
            <strong>Aimpluss</strong> means <em>Positive Motivations of Life</em>. Based in the
            "Gemstone World Bangkok, Thailand", we started our business in Thailand in <strong>2004</strong>.
            We sell high-quality, natural earth-mined loose gemstones and colour stones.
          </p>
          <p>
            Our main head office is in <strong>Bangkok, Thailand</strong>. We mostly purchase
            natural rough stones, then cut and polish them in Sri Lanka and Thailand. We have a great collection
            of precious and semi-precious gemstones — including natural unheated Sapphires in Blue, Pink,
            Green, and more — ranging from Top Grade to Medium Quality.
          </p>
          <p>
            We offer genuine item descriptions in all our listings. Minor colour variation may occur due
            to different monitor brightness. Most of our gemstones are certified by laboratories
            in <strong>Bangkok</strong> and <strong>Sri Lanka</strong>.
          </p>
          <p>
            We also attend major <strong>Gem &amp; Jewellery Shows</strong> in Bangkok, Hong Kong, and the USA.
          </p>
        </div>

        <div className={styles.image}>
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
        </div>
      </section>

    <section className={styles.stats} ref={statsRef}>
  <div>
    <CountUp end={20} start={startCount} />
    <p>Years in Business</p>
  </div>

  <div>
    <CountUp end={1000} start={startCount} />
    <p>Gems Delivered</p>
  </div>

  <div>
    <CountUp end={500} start={startCount} />
    <p>Happy Customers</p>
  </div>

  <div>
    <CountUp end={3} start={startCount} />
    <p>Global Trade Shows</p>
  </div>
</section>


      {/* 💎 WHY CHOOSE US */}
      <section className={styles.features}>
        <h2>Why Choose Us</h2>

        <div className={styles.grid}>
          <div className={styles.card}>
            <h3>💎 Lab Certified</h3>
            <p>Certified by Bangkok &amp; Sri Lanka laboratories.</p>
          </div>

          <div className={styles.card}>
            <h3>🌿 Natural &amp; Unheated</h3>
            <p>Responsibly sourced rough stones, cut and polished by experts.</p>
          </div>

          <div className={styles.card}>
            <h3>🚚 Safe Delivery</h3>
            <p>Secure packaging with reliable worldwide shipping.</p>
          </div>

          <div className={styles.card}>
            <h3>🤝 Since 2004</h3>
            <p>20+ years of trusted experience in the gemstone trade.</p>
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
          Browse Gems <i className="fa-solid fa-arrow-right"></i> 
        </Link>
      </section>

    </div>
  );
}

export default About;