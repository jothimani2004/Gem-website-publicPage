import { useState } from "react";
import styles from "./Colorfilter.module.css"
import { useSelector } from "react-redux";

function Colorfilter({ value, onChange, isActive, onToggle }){
    const [isOpen, setIsOpen] = useState(true);
    const { items: colors = [] } = useSelector(
        (state) => state.colors || {}
      );

    return(
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
          <h3 className={styles.title} style={{ margin: 0 }}>Color</h3>
        </label>
        {isActive && (
          <span className={styles.toggleIcon} onClick={() => setIsOpen(!isOpen)}>
            <i className={`fa-solid fa-chevron-${isOpen ? 'up' : 'down'}`}></i>
          </span>
        )}
      </div>

      {isActive && isOpen && (
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
                onClick={() => onChange?.(isActive ? "" : color.slug)}
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
      )}
    </div>
    )
}

export default Colorfilter