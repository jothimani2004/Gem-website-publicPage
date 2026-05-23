import { useState } from "react";
import { useSelector } from "react-redux";
import ShapeIcon from "../../common/ShapeIcon/ShapeIcon";
import styles from "./Shapefilter.module.css";

function ShapeFilter({ value, onChange, isActive, onToggle }) {
  const [isOpen, setIsOpen] = useState(true);
  const { items: shapes = [], status } = useSelector(
    (state) => state.shapes || {}
  );

  if (status === "loading") {
    return <div className={styles.block}>Loading shapes...</div>;
  }

  return (
    <div className={styles.block} style={{ opacity: isActive ? 1 : 0.6 }}>
      <div className={styles.header}>
        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', margin: 0 }} onClick={(e) => e.stopPropagation()}>
          <label className="globalSwitch">
            <input 
              type="checkbox" 
              checked={isActive} 
              onChange={onToggle} 
            />
            <span className="globalSwitchSlider"></span>
          </label>
          <h3 className={styles.title} style={{ margin: 0 }}>Shape</h3>
        </label>
        {isActive && (
          <span className={styles.toggleIcon} onClick={() => setIsOpen(!isOpen)}>
            <i className={`fa-solid fa-chevron-${isOpen ? 'up' : 'down'}`}></i>
          </span>
        )}
      </div>

      {isActive && isOpen && (
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
                onClick={() => onChange?.(isActive ? "" : shape.slug)}
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
      )}
    </div>
  );
}

export default ShapeFilter;
