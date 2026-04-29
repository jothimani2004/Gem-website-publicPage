import styles from "./Testimonials.module.css";
import { FaQuoteLeft } from "react-icons/fa";

function Testimonials() {
  const reviews = [
    {
      name: "Rahul Sharma",
      text: "The gemstone quality is amazing and truly authentic. Highly recommended!",
      rating: 5,
    },
    {
      name: "Priya Mehta",
      text: "Beautiful collection and excellent service. I loved the experience.",
      rating: 5,
    },
    {
      name: "Arjun Kumar",
      text: "Genuine certification and fast delivery. Very trustworthy brand.",
      rating: 4,
    },
  ];

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        
        {/* HEADER */}
        <div className={styles.header}>
          <h2>What Our Customers Say</h2>
          <p>Trusted by gemstone lovers across the country</p>
        </div>

        {/* CARDS */}
        <div className={styles.grid}>
          {reviews.map((review, index) => (
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

              {/* 👤 USER */}
              <div className={styles.user}>
                <div className={styles.avatar}>
                  {review.name.charAt(0)}
                </div>
                <h4>{review.name}</h4>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Testimonials;