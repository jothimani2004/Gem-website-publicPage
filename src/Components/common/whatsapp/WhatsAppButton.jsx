import { useState } from "react";
import { FaWhatsapp, FaTimes, FaShieldAlt } from "react-icons/fa";
import styles from "./WhatsAppButton.module.css";
import avatarImg from "../../../assets/images/expert-avatar.png";

function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(true);
  const phoneNumber = "66948210195"; // 🇹🇭 Thailand: 0066948210195 → 66948210195
  const message = "Hi! I'm interested in your gemstones.";

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <div className={styles.widgetWrapper}>
      {isOpen ? (
        <div className={styles.cardContainer}>
          {/* Card Header */}
          <div className={styles.cardHeader}>
            <div className={styles.expertInfo}>
              <div className={styles.avatarWrapper}>
                <img src={avatarImg} alt="Gemologist Expert" className={styles.avatarImg} />
                <span className={styles.onlineStatus} title="Online"></span>
              </div>
              <div className={styles.titleTextGroup}>
                <h4 className={styles.expertName}>Gem Advisory Expert</h4>
                <p className={styles.onlineText}>
                  <span className={styles.greenDot}></span> Online • Direct Support
                </p>
              </div>
            </div>

            <button 
              className={styles.closeBtn} 
              onClick={() => setIsOpen(false)}
              aria-label="Close message"
              title="Close"
            >
              <FaTimes />
            </button>
          </div>

          {/* Chat Message Bubble */}
          <div className={styles.chatMessageBubble}>
            <p>
              Hi there! 👋 Need help finding the perfect natural gem or verifying certificate details?
            </p>
            <span className={styles.messageTime}>Just now</span>
          </div>

          {/* Main Action Button */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.whatsappCtaButton}
            aria-label="Chat on WhatsApp"
          >
            <FaWhatsapp className={styles.whatsappIcon} />
            <span>Chat on WhatsApp</span>
          </a>

          {/* Trust Footer */}
          <div className={styles.trustFooter}>
            <FaShieldAlt className={styles.trustIcon} />
            <span>100% Certified Natural Gemstones</span>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className={styles.floatingTriggerBtn}
          aria-label="Open Chat with Gem Expert"
        >
          <span className={styles.pulseRing}></span>
          <FaWhatsapp className={styles.triggerIcon} />
          <span className={styles.triggerBadge}>1</span>
        </button>
      )}
    </div>
  );
}

export default WhatsAppButton;