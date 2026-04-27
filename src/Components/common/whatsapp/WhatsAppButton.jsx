import styles from "./WhatsAppButton.module.css";

function WhatsAppButton() {
  const phoneNumber = "917448523223"; // 👉 your number (no +, no spaces)
  const message = "Hi, I'm interested in your gemstones.";

  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.whatsapp}
    >
      <i className="fa-brands fa-whatsapp"></i>
    </a>
  );
}

export default WhatsAppButton;