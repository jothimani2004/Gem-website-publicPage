import styles from "./GemCard.module.css";
import { Link } from "react-router-dom";

function GemCard({ gem, variant = "category" }) {
  return (
    <Link to={gem.link} className={styles.card}>
      <div className={styles.imageWrapper}>
        <img src={gem.image} alt={gem.name} loading="lazy" />
      </div>

      <div className={styles.content}>
        {variant === "category" && (
          <p className={styles.title}>{gem.name}</p>
        )}

        {variant === "listing" && (
          <>
            <h4 className={styles.lot}>Lot #{gem.lotNumber}</h4>
            <p className={styles.meta}>
              {gem.shape} • {gem.carat} ct • {gem.color}
            </p>
          </>
        )}
      </div>
    </Link>
  );
}

export default GemCard;
