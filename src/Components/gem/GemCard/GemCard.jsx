import styles from "./GemCard.module.css";
import { Link } from "react-router-dom";
import fallbackGem from "../../../assets/images/gem2.png";

function GemCard({ gem, variant = "category" }) {
  return (
    <Link to={gem.link} className={`${styles.card} ${variant === "category" ? styles.categoryVariant : ""}`}>
      <div className={styles.imageWrapper}>
        <img
          src={gem.image || fallbackGem}
          alt={gem.name}
          loading="lazy"
          onError={(e) => { e.target.src = fallbackGem; }}
        />
      </div>

      <div className={styles.content}>
        {variant === "category" && (
          <p className={styles.catTitleAlt}>{gem.name}</p>
        )}

        {variant === "listing" && (
          <div className={styles.data}>
            <span className={styles.pill}>LOT #{gem.lotNumber || 'N/A'}</span>
            <span className={styles.pill}>{gem.carat} CT</span>
          </div>
        )}
      </div>
    </Link>
  );
}

export default GemCard;
