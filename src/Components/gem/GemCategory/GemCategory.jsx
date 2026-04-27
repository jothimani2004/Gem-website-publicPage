import GemCard from "../GemCard/GemCard";
import styles from "./GemCategory.module.css";
import { Link } from "react-router-dom";


function GemCategory({ title, gems, category,showExplore = true }) {
  return (
    <section className={styles.section}>
      <header className={styles.header}>
        <h2>{title}</h2>
      </header>


      <div className={styles.grid}>
        {gems.map((gem, index) => (
          <GemCard
          key={gem.id}
          gem={{
            ...gem,
            link: `/${category}/${gem.name}`
          }}
          variant="category"
        />
        
        ))}
      </div>

       {/* 💎 EXPLORE BUTTON */}
       {showExplore && (
  <div className={styles.footer}>
    <Link to={`/${category}`} className={styles.moreBtn}>
      Explore More →
    </Link>
  </div>
       )}
    </section>
  );
}

export default GemCategory;
