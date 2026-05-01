import styles from "./Loader.module.css";

function Loader() {
  return (
    <div className={styles.container}>
      <div className={styles.gemWrapper}>
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={styles.diamond}
        >
          {/* Main Diamond Outline */}
          <path
            d="M25 35 L50 15 L75 35 L50 85 L25 35 Z"
            className={styles.outline}
          />
          {/* Internal Facet Lines */}
          <path d="M25 35 L75 35" className={styles.line} />
          <path d="M50 15 L50 85" className={styles.line} />
          <path d="M50 35 L25 35" className={styles.line} />
          <path d="M50 35 L75 35" className={styles.line} />
          <path d="M50 35 L50 15" className={styles.line} />
        </svg>
        <div className={styles.sparkle}></div>
      </div>

      <div className={styles.textContainer}>
        <h2 className={styles.title}>AIMPLUSS</h2>
        <div className={styles.loaderBar}></div>
        <p className={styles.subtitle}>CRAFTING BRILLIANCE</p>
      </div>
    </div>
  );
}

export default Loader;