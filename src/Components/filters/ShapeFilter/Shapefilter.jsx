import { useSelector } from "react-redux";
import ShapeIcon from "../../common/ShapeIcon/ShapeIcon";
import styles from "./ShapeFilter.module.css";

function ShapeFilter({ value, onChange }) {
  const { items: shapes = [], status } = useSelector(
    (state) => state.shapes || {}
  );

  if (status === "loading") {
    return <div className={styles.block}>Loading shapes...</div>;
  }

  return (
    <div className={styles.block}>
      <h3 className={styles.title}>Shape</h3>

      <div
        className={`${styles.grid}`}
      >
        {shapes.map((shape) => {
          const isActive = value === shape.slug;

          return (
            <button
              key={shape.id}
              type="button"
              aria-pressed={isActive}
              className={`${styles.card} ${
                isActive ? styles.active : ""
              }`}
              onClick={() => onChange?.(shape.slug)}
              >
              <div className={styles.icon}>
                <ShapeIcon slug={shape.slug} />
              </div>

              <span className={styles.label}>
                {shape.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default ShapeFilter;
