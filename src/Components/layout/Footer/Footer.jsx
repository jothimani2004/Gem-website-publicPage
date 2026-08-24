import styles from "./Footer.module.css";
import { FaInstagram, FaFacebook, FaEnvelope } from "react-icons/fa";
import { SiEtsy, SiEbay } from "react-icons/si";
import { Link } from "react-router-dom";
import logo from "../../../assets/images/logo.png";

function Footer() {
  return (
    <footer className={styles.footer}>

      <div className={styles.container}>

        {/* 💎 BRAND */}
        <div className={styles.brand}>
          <Link to="/" className={styles.brandLogo}>
            <img src={logo} alt="Aimpluss Gems" className={styles.logoImg} />
            <h2>Aimpluss Gems</h2>
          </Link>
          <p>Premium certified gemstones — crafted by nature, curated for you.</p>
        </div>

        {/* 🔗 QUICK LINKS */}
        <div className={styles.links}>
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/Precious">Precious</Link></li>
            <li><Link to="/Semi-Precious">Semi-Precious</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/faq">FAQ</Link></li>
          </ul>
        </div>

        {/* 🛍️ SHOP ON */}
        <div className={styles.gems}>
          <h4>Shop On</h4>
          <ul>
            <li>
              <a href="https://www.etsy.com/shop/aimpluss" target="_blank" rel="noopener noreferrer">
                <SiEtsy className={styles.shopIcon} /> Etsy
              </a>
            </li>
            <li>
              <a href="https://www.ebay.com/sh/ovw" target="_blank" rel="noopener noreferrer">
                <SiEbay className={styles.shopIcon} /> eBay
              </a>
            </li>
          </ul>
        </div>

        {/* 📞 CONTACT */}
        <div className={styles.contact}>
          <h4>Contact Us</h4>
          <a href="mailto:mahapluss@hotmail.com" className={styles.contactLink}>
            <FaEnvelope className={styles.contactIcon} />
            mahapluss@hotmail.com
          </a>
          <a href="mailto:mahapluss@gmail.com" className={styles.contactLink}>
            <FaEnvelope className={styles.contactIcon} />
            mahapluss@gmail.com
          </a>

          {/* 📱 SOCIAL */}
          <h4 style={{ marginTop: "20px" }}>Follow Us</h4>
          <div className={styles.icons}>
            <a
              href="https://www.instagram.com/aimpluss_gems/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.iconLink}
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.facebook.com/aimpluss.gems"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.iconLink}
              aria-label="Facebook"
            >
              <FaFacebook />
            </a>
            <a
              href="https://www.etsy.com/shop/aimpluss"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.iconLink}
              aria-label="Etsy"
            >
              <SiEtsy />
            </a>
            <a
              href="https://www.ebay.com/sh/ovw"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.iconLink}
              aria-label="eBay"
            >
              <SiEbay />
            </a>
          </div>
        </div>

      </div>

      {/* 🔻 BOTTOM BAR */}
      <div className={styles.bottom}>
        © {new Date().getFullYear()} Aimpluss Gems. All rights reserved.
        &nbsp;·&nbsp;
        <a href="mailto:mahapluss@gmail.com" className={styles.bottomLink}>mahapluss@gmail.com</a>
      </div>

    </footer>
  );
}

export default Footer;