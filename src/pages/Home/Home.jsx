import Hero from "../../Components/Hero/Hero";
import {preciousGems} from "../../data/precious-gems";
import {semiPreciousGems} from "../../data/semiprecious-gems";
import GemCategory from "../../Components/GemCategory/GemCategory";

import styles from "./Home.module.css";

function Home() {
  return (
    <>
  
      <Hero />
      <section className={styles.sectionHeading}>
        <h1>Our Exquisite Gemstone Collections</h1>
        <p>Premium, certified gemstones — crafted by nature, curated for you.</p>
      </section>
      <GemCategory title="Precious Gemstones" gems={preciousGems} />
      <GemCategory title="Semi-Precious Gemstones" gems={semiPreciousGems} />

    </>
  );
}

export default Home;
