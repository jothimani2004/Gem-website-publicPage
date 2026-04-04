import styles from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={styles.container}>

      {/* ✨ Floating particles */}
      <div className={styles.particles}></div>

      {/* 💎 Main Gem */}
      <div className={styles.gemWrapper}>
        <div className={styles.gem}></div>
        <div className={styles.shine}></div>
      </div>

      {/* 🔤 Text */}
      <h2 className={styles.title}>GEM STORE</h2>
      <p className={styles.subtitle}>Crafting Brilliance...</p>

    </div>
  );
};

export default Loader;