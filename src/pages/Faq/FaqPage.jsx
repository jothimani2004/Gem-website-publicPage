import FAQ from "../../Components/faq/FAQ";
import styles from "./FaqPage.module.css";
import faqData from "../../data/faq.js";
import SEO from "../../Components/common/SEO/SEO";


function FaqPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.map((item) => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };

  return (
    <div className={styles.page}>
      <SEO
        title="Frequently Asked Questions (FAQ) — Gemstone Certification & Shipping"
        description="Find answers to common questions about natural gemstone certification, return policies, worldwide shipping, and stone authenticity at Aimpluss Gems."
        keywords="gemstone faq, certified gems questions, gemstone shipping, gem lab certificates, aimpluss gems help"
        canonical="https://aimplussgems.com/faq"
        schema={faqSchema}
      />
      
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