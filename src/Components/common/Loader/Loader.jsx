import styles from "./Loader.module.css";

function Loader() {
  return (
    <div className={styles.container}>
      
      {/* ✨ PARTICLES */}
      <div className={styles.particles}></div>

      {/* 💎 GEM */}
      <div className={styles.gemWrapper}>
        <div className={styles.gem}>
          <div className={styles.face}></div>
          <div className={styles.face}></div>
          <div className={styles.face}></div>
          <div className={styles.face}></div>
        </div>
      </div>

      {/* TEXT */}
      <h2 className={styles.title}>AIMPLUSS</h2>
      <p className={styles.subtitle}>CRAFTING BRILLIANCE</p>

    </div>
  );
}

export default Loader;