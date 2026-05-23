import styles from "./ProductInfo.module.css";

const ProductInfo = ({ product }) => {
  const isValidSpec = (value) => {
    if (!value) return false;
    const lowerValue = String(value).toLowerCase();
    return !lowerValue.includes("null") && lowerValue !== "n/a";
  };

  return (
    <div className={styles.info}>
      <h1 className={styles.title}>{product.name}</h1>
      
      <div className={styles.divider}></div>

      <div className={styles.specsGrid}>
        {isValidSpec(product.shape) && (
          <div className={styles.specCard}>
            <span className={styles.specLabel}>Shape</span>
            <span className={styles.specValue}>{product.shape}</span>
          </div>
        )}
        {isValidSpec(product.weight) && (
          <div className={styles.specCard}>
            <span className={styles.specLabel}>Weight</span>
            <span className={styles.specValue}>{product.weight}</span>
          </div>
        )}
        {isValidSpec(product.color) && (
          <div className={styles.specCard}>
            <span className={styles.specLabel}>Color</span>
            <span className={styles.specValue}>{product.color}</span>
          </div>
        )}
        {isValidSpec(product.origin) && (
          <div className={styles.specCard}>
            <span className={styles.specLabel}>Origin</span>
            <span className={styles.specValue}>{product.origin}</span>
          </div>
        )}
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
