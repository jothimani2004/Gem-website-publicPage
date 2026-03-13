import styles from "./Applyresetbutton.module.css"

function Applyresetbutton({ onApply, onReset }){
    return(
        <div className={styles.wrapper}>
        <button
          type="button"
          className={styles.apply}
          onClick={onApply}
        >
          Apply Filters
        </button>
  
        <button
          type="button"
          className={styles.reset}
          onClick={onReset}
        >
          Reset
        </button>
      </div>
    )
}

export default Applyresetbutton;