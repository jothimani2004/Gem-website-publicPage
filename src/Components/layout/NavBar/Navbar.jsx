import styles from "./Navbar.module.css";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header className={styles.navbar}>

      {/* 💎 LOGO */}
      <Link to="/" className={styles.logo}>
        Aimpluss Gems
      </Link>

      {/* 🔗 MENU */}
      <nav>
        <ul className={styles.menu}>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/Precious">Precious</Link></li>
          <li><Link to="/Semi-Precious">Semi-Precious</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/#faq">FAQ</Link></li>
        </ul>
      </nav>

      {/* 💎 CTA */}
      <Link to="/Precious" className={styles.cta}>
        Explore Gems
      </Link>

    </header>
  );
}

export default Navbar;