import styles from "./Footer.module.css";
import { FaInstagram, FaGlobe, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";
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
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/#faq">FAQ</Link></li> {/* scroll to faq */}
            <li>Contact</li>
          </ul>
        </div>

     <div className={styles.gems}>
          <h4>Gems</h4>
          <ul>
            <li><Link to="/Precious">Precious</Link></li>
            <li><Link to="/Semi-Precious">Semi-Precious</Link></li>
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
            <FaInstagram />
            <FaGlobe />
            <FaLinkedin />
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