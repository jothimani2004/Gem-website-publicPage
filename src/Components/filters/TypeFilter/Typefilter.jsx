import styles from "./Typefilter.module.css"

function Typefilter({ value, onChange }){
    const options = [
        { label: "Single", value: "single" },
        { label: "Mixed", value: "mixed" },
      ];

    return(
            <div className={styles.block}>
      <h3 className={styles.title}>Type</h3>

      <div className={styles.wrapper}>
        {options.map((option) => {
          const isActive = value === option.value;

          return (
            <button
              key={option.value}
              type="button"
              className={`${styles.button} ${
                isActive ? styles.active : ""
              }`}
              aria-pressed={isActive}
              onClick={() => onChange(option.value)}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>

    )
}

export default Typefilter