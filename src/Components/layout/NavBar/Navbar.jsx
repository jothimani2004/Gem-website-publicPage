import styles from "./Navbar.module.css";
import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import logo from "../../../assets/images/logo.png";

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className={styles.navbar}>

      {/* 💎 LOGO */}
      <Link to="/" className={styles.logo}>
        <img src={logo} alt="Aimpluss Gems Logo" className={styles.logoImg} />
        <span className={styles.logoText}>Aimpluss Gems</span>
      </Link>

      {/* 🔗 MENU */}
      <nav className={`${styles.nav} ${open ? styles.active : ""}`}>
        <ul className={styles.menu}>
          <li>
            <NavLink
              to="/"
              end
              className={({ isActive }) => (isActive ? styles.activeLink : "")}
              onClick={() => setOpen(false)}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/Precious"
              className={({ isActive }) => (isActive ? styles.activeLink : "")}
              onClick={() => setOpen(false)}
            >
              Precious
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/Semi-Precious"
              className={({ isActive }) => (isActive ? styles.activeLink : "")}
              onClick={() => setOpen(false)}
            >
              Semi-Precious
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) => (isActive ? styles.activeLink : "")}
              onClick={() => setOpen(false)}
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/faq"
              className={({ isActive }) => (isActive ? styles.activeLink : "")}
              onClick={() => setOpen(false)}
            >
              FAQ
            </NavLink>
          </li>
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