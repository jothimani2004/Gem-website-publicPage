import { FaWhatsapp } from "react-icons/fa";
import styles from "./WhatsAppButton.module.css";

function WhatsAppButton() {
  const phoneNumber = "66948210195"; // 🇹🇭 Thailand: 0066948210195 → 66948210195
  const message = "Hi! I'm interested in your gemstones.";

  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.whatsappContainer}
      aria-label="Contact us on WhatsApp"
      title="Chat with us on WhatsApp"
    >
      <span className={styles.pulseRing}></span>
      <span className={styles.whatsappButton}>
        <FaWhatsapp className={styles.whatsappIcon} />
      </span>
      <span className={styles.tooltip}>
        <span className={styles.onlineDot}></span>
        Chat with us
      </span>
    </a>
  );
}

export default WhatsAppButton;