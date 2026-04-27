import styles from "./TrustBanner.module.css";
import { FaGem, FaCertificate, FaLeaf, FaShippingFast } from "react-icons/fa";

function TrustBanner() {
  const items = [
    { icon: <FaGem />, text: "Guarantee of Purity" },
    { icon: <FaCertificate />, text: "100% Certified" },
    { icon: <FaLeaf />, text: "Ethically Sourced" },
    { icon: <FaShippingFast />, text: "Free Shipping" },
  ];

  return (
    <div className={styles.banner}>
      {items.map((item, index) => (
        <div key={index} className={styles.item}>
          <div className={styles.icon}>{item.icon}</div>
          <p>{item.text}</p>
        </div>
      ))}
    </div>
  );
}

export default TrustBanner;