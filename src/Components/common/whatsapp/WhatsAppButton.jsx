import styles from "./WhatsAppButton.module.css";

function WhatsAppButton() {
  const phoneNumber = "66948210195"; // 🇹🇭 Thailand: 0066948210195 → 66948210195
  const message = "Hi, I'm interested in your gemstones.";

  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.whatsapp}
      aria-label="Contact us on WhatsApp"
    >
      <i className="fa-brands fa-whatsapp"></i>
    </a>
  );
}

export default WhatsAppButton;