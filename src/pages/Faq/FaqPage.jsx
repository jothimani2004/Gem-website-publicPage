import FAQ from "../../Components/faq/FAQ";
import styles from "./FaqPage.module.css";
import faqData from "../../data/faq.js";


function FaqPage() {
  return (
    <div className={styles.page}>
      
      <div className={styles.container}>
        
        {/* 💎 HEADER */}
        <div className={styles.header}>
          <h1>Frequently Asked Questions</h1>
          <p>Everything you need to know about our gemstones.</p>
        </div>

        {/* FAQ */}
        <FAQ data={faqData} />

      </div>

    </div>
  );
}

export default FaqPage;