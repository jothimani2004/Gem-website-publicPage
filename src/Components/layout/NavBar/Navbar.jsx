import styles from "./Navbar.module.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className={styles.navbar}>

      {/* 💎 LOGO */}
      <Link to="/" className={styles.logo}>
        Aimpluss Gems
      </Link>

      {/* 🔗 MENU */}
      <nav className={`${styles.nav} ${open ? styles.active : ""}`}>
        <ul className={styles.menu}>
          <li><Link to="/" onClick={() => setOpen(false)}>Home</Link></li>
          <li><Link to="/Precious" onClick={() => setOpen(false)}>Precious</Link></li>
          <li><Link to="/Semi-Precious" onClick={() => setOpen(false)}>Semi-Precious</Link></li>
          <li><Link to="/about" onClick={() => setOpen(false)}>About</Link></li>
          <li><Link to="/#faq" onClick={() => setOpen(false)}>FAQ</Link></li>
        </ul>
      </nav>

      {/* 💎 CTA */}
      <Link to="/Precious" className={styles.cta}>
        Explore
      </Link>

      {/* 🍔 HAMBURGER */}
      <div className={styles.hamburger} onClick={() => setOpen(!open)} style={{ color: open ? "white" : "black" }}>
        {open ? <FaTimes /> : <FaBars />}
      </div>

    </header>
  );
}

export default Navbar;