import styles from "./GemCard.module.css";

function GemCard({ name, image }) {
  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <img src={image} alt={name} loading="lazy" />
      </div>
      <p className={styles.title}>{name}</p>
    </div>
  );
}

export default GemCard;
