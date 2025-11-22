import GemCard from "../GemCard/GemCard";
import styles from "./GemCategory.module.css";

function GemCategory({ title, gems }) {
  return (
    <section className={styles.section}>
      <h2>{title}</h2>

      <div className={styles.grid}>
        {gems.map((gem, index) => (
          <GemCard key={index} name={gem.name} image={gem.image} />
        ))}
      </div>
    </section>
  );
}

export default GemCategory;
