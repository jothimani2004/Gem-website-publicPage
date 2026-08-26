import { useState, useEffect } from "react";
import styles from "./Weightfilter.module.css"

function Weightfilter({ value, onChange, isActive, onToggle }){
    const [isOpen, setIsOpen] = useState(true);
    const safeValue = value === "" || value === null || value === undefined ? 10 : Number(value);
    const [localValue, setLocalValue] = useState(safeValue);
    
    useEffect(() => {
      const safeVal = value === "" || value === null || value === undefined ? 10 : Number(value);
      setLocalValue(safeVal);
    }, [value]);

    const percentage = ((localValue - 0.1) / (150 - 0.1)) * 100;

    const displayCaratRange = (val) => {
      const num = Number(val);
      const lower = Math.floor(num);
      const upper = lower + 1;
      if (num % 1 === 0) {
        return `${lower} to ${upper}`;
      } else {
        return `${lower} to ${upper} carat`;
      }
    };

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
          <h3 className={styles.title} style={{ margin: 0 }}>Carat Weight</h3>
        </label>
        {isActive && (
          <span className={styles.toggleIcon} onClick={() => setIsOpen(!isOpen)}>
            <i className={`fa-solid fa-chevron-${isOpen ? 'up' : 'down'}`}></i>
          </span>
        )}
      </div>

      {isActive && value !== "" && (
        <div className={styles.appliedTag}>
          {displayCaratRange(value)}
        </div>
      )}

      {isActive && isOpen && (
        <>
          <div className={styles.value} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
             <strong>{localValue.toFixed(1)} ct</strong>
             <button 
               type="button" 
               className={styles.applyBtn}
               onClick={() => onChange(localValue)}
             >
               Apply
             </button>
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
              value={localValue}
              onChange={(e) => setLocalValue(Number(e.target.value))}
              className={styles.slider}
            />
          </div>
        </>
      )}
    </div>
    
)
}

export default Weightfilter;