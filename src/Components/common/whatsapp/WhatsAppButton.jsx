import { FaWhatsapp } from "react-icons/fa";
import styles from "./WhatsAppButton.module.css";

function WhatsAppButton() {
  const phoneNumber = "66948210195";
  const defaultMessage = "Hi! I'm interested in your gemstones.";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(defaultMessage)}`;

  return (
    <div className={styles.widgetWrapper}>
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.floatingPill}
        aria-label="Chat with Expert on WhatsApp"
      >
        <div className={styles.pillIconWrap}>
          <FaWhatsapp className={styles.pillIcon} />
          <span className={styles.pulseRing}></span>
        </div>
        <span className={styles.pillText}>Chat with Expert</span>
      </a>
    </div>
  );
}

export default WhatsAppButton;