import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
      
      <div className={styles.container}>

        {/* 💎 BRAND */}
        <div className={styles.brand}>
          <h2>Aimpluss Gems</h2>
          <p>Crafting brilliance with precious stones.</p>
        </div>

        {/* 🔗 LINKS */}
        <div className={styles.links}>
          <h4>Quick Links</h4>
          <ul>
            <li>Home</li>
            <li>Shop</li>
            <li>About</li>
            <li>Contact</li>
          </ul>
        </div>

        {/* 📞 CONTACT */}
        <div className={styles.contact}>
          <h4>Contact</h4>
          <p>Email: support@gems.com</p>
          <p>Phone: +91 98765 43210</p>
        </div>

        {/* 📱 SOCIAL */}
        <div className={styles.social}>
          <h4>Follow Us</h4>
          <div className={styles.icons}>
            <span>🌐</span>
            <span>📸</span>
            <span>💼</span>
          </div>
        </div>

      </div>

      {/* 🔻 BOTTOM */}
      <div className={styles.bottom}>
        © {new Date().getFullYear()} Aimpluss Gems. All rights reserved.
      </div>

    </footer>
  );
}

export default Footer;