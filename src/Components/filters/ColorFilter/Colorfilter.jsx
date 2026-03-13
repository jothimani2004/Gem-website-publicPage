import styles from "./Colorfilter.module.css"
import { useSelector } from "react-redux";

function Colorfilter({ value, onChange }){
    const { items: colors = [] } = useSelector(
        (state) => state.colors || {}
      );

    return(
        <div className={styles.block}>
      <h3 className={styles.title}>Color</h3>

      <div className={styles.grid}>
        {colors.map((color) => {
          const isActive = value === color.slug;

          return (
            <button
              key={color.id}
              type="button"
              aria-pressed={isActive}
              className={`${styles.swatchWrapper} ${
                isActive ? styles.active : ""
              }`}
              onClick={() => onChange?.(color.slug)}
            >
              <div
                className={styles.swatch}
                style={{ backgroundColor: color.hex }}
              />

              <span className={styles.label}>
                {color.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
    )
}

export default Colorfilter