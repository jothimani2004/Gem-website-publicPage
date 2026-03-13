import styles from "./Footer.module.css";

function Footer() {
  return <footer className={styles.footer}>© { new Date().getFullYear()} Aimpluss Gems</footer>;
}

export default Footer;
