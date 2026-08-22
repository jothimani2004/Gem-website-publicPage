import styles from "./Testimonials.module.css";
import { FaQuoteLeft } from "react-icons/fa";
import { SiEtsy } from "react-icons/si";

function Testimonials() {
  const reviews = [
    {
      name: "Joshua",
      text: "Beautiful stone and seller was easy to communicate with! Item arrived safely and genuine!",
      rating: 5,
      item: "1.28ct Oval Color Change Sapphire",
      date: "May 2026",
    },
    {
      name: "Isabella",
      text: "Super helpful seller and really beautiful gem! Arrived much before I expected.",
      rating: 5,
      item: "1.27ct Unheated Teal Sapphire",
      date: "Mar 2026",
    },
    {
      name: "Etsy Buyer",
      text: "The stone was just like the descriptions. The seller's communication was excellent! Thank you!",
      rating: 5,
      item: "2.22ct Certified Unheated Teal Sapphire",
      date: "Jan 2026",
    },
  
    {
      name: "MIGUEL",
      text: "Highly recommended, I bought it without hesitation. A very honest and responsible person.",
      rating: 5,
      item: "1.59ct Octagon Color Change Sapphire",
      date: "Jan 2026",
    },
    {
      name: "MIGUEL",
      text: "I highly recommend him; he is very serious, honest, and a very good person.",
      rating: 5,
      item: "1.07ct Padparadscha Sapphire",
      date: "Jan 2026",
    },
    {
      name: "Marina",
      text: "Very nice stone with good color saturation. Arrived in time.",
      rating: 5,
      item: "1.94ct Certified Unheated Teal Sapphire",
      date: "Dec 2025",
    },
    {
      name: "Roger",
      text: "Great seller — beautiful stone — fast shipping.",
      rating: 5,
      item: "2.17ct GIA Certified Natural Alexandrite",
      date: "Dec 2025",
    },
    {
      name: "Hande",
      text: "Wonderful pair of sapphires and even with certificates. Thank you!!! 🙏🥰",
      rating: 5,
      item: "2.47ct Unheated Yellow Sapphire Pair",
      date: "Oct 2025",
    },
    {
      name: "Linda",
      text: "Yes, this is lovely... I had previously reviewed it and your service. Thank you.",
      rating: 5,
      item: "2.94ct Natural Purple Spinel",
      date: "May 2026",
    },
    {
      name: "Pedro",
      text: "All good 👍😊 happy with the stone and service.",
      rating: 5,
      item: "3.50ct Natural Blue Sapphire",
      date: "Jul 2026",
    },
  ];

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        
        {/* HEADER */}
        <div className={styles.header}>
          <h2>What Our Customers Say</h2>
          <p>Real reviews from verified buyers on&nbsp;
            <a
              href="https://www.etsy.com/shop/aimpluss#reviews"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.etsyLink}
            >
              <SiEtsy style={{ verticalAlign: "middle", marginRight: "3px" }} />
              Etsy
            </a>
          </p>
        </div>

        {/* CARDS MARQUEE */}
        <div className={styles.marquee}>
          <div className={styles.track}>
            {[...reviews, ...reviews].map((review, index) => (
              <div key={index} className={styles.card}>
                
                {/* ✨ Quote Icon */}
                <FaQuoteLeft className={styles.quoteIcon} />

                {/* ⭐ Rating */}
                <div className={styles.stars}>
                  {"★".repeat(review.rating)}
                  {"☆".repeat(5 - review.rating)}
                </div>

                {/* 💬 Text */}
                <p className={styles.text}>
                  {review.text}
                </p>

                {/* 💎 Item purchased */}
                {review.item && (
                  <p className={styles.itemLabel}>💎 {review.item}</p>
                )}

                {/* 👤 USER */}
                <div className={styles.user}>
                  <div className={styles.avatar}>
                    {review.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h4>{review.name}</h4>
                    {review.date && <span className={styles.date}>{review.date}</span>}
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

export default Testimonials;
