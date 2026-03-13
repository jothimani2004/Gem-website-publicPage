import GemCard from "../GemCard/GemCard";
import styles from "./GemCategory.module.css";

function GemCategory({ title, gems, category }) {
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
    </section>
  );
}

export default GemCategory;
