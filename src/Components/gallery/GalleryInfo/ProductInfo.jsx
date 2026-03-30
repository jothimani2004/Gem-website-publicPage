import styles from "./ProductInfo.module.css";

const ProductInfo = ({ product }) => {
  return (
    <div className={styles.info}>
      <h1 className={styles.title}>{product.name}</h1>
      
      <div className={styles.divider}></div>

      <div className={styles.specsGrid}>
        <div className={styles.specCard}>
          <span className={styles.specLabel}>Shape</span>
          <span className={styles.specValue}>{product.shape}</span>
        </div>
        <div className={styles.specCard}>
          <span className={styles.specLabel}>Weight</span>
          <span className={styles.specValue}>{product.weight}</span>
        </div>
        <div className={styles.specCard}>
          <span className={styles.specLabel}>Color</span>
          <span className={styles.specValue}>{product.color}</span>
        </div>
        <div className={styles.specCard}>
          <span className={styles.specLabel}>Origin</span>
          <span className={styles.specValue}>{product.origin}</span>
        </div>
      </div>

      <div className={styles.divider}></div>

      <div className={styles.descriptionBox}>
        <h4 className={styles.descTitle}>Description</h4>
        <p className={styles.descriptionText}>
          {product.description}
        </p>
      </div>
    </div>
  );
};

export default ProductInfo;
