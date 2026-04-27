import { useState } from "react";
import styles from "./FAQ.module.css";

function FAQ({ data }) {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className={styles.faq}>
      {data.map((item, index) => (
        <div
          key={index}
          className={`${styles.item} ${
            activeIndex === index ? styles.active : ""
          }`}
        >
          <button
            className={styles.question}
            onClick={() => toggle(index)}
          >
            <span>{item.question}</span>
            <span className={styles.icon}>
              {activeIndex === index ? "−" : "+"}
            </span>
          </button>

          <div className={styles.answer}>
            <p>{item.answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default FAQ;