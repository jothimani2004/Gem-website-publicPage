import styles from "./Weightfilter.module.css"

function weightfilter({ value, onChange }){
    const safeValue = value === "" || value === null || value === undefined ? 10 : Number(value);
    const percentage = ((safeValue - 0.1) / (150 - 0.1)) * 100;

    return(
  <div className={styles.block}>
      <h3 className={styles.title}>Carat Weight</h3>

      <div className={styles.value}>
         <strong>{safeValue.toFixed(1)} ct</strong>
      </div>

      <div className={styles.sliderWrapper}>
  <div className={styles.track}></div>

  <div
    className={styles.progress}
    style={{ width: `${percentage}%` }}
  ></div>

  <input
    type="range"
    min="0.1"
    max="150"
    step="0.1"
    value={safeValue}
    onChange={(e) => onChange(Number(e.target.value))}
    className={styles.slider}
  />
</div>

    </div>
    
)
}

export default weightfilter;