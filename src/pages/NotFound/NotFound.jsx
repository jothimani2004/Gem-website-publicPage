import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import styles from "./NotFound.module.css";

function NotFound() {
  return (
    <div className={styles.container}>

      {/* Background Glow */}
      <div className={styles.glow}></div>

      {/* Floating Circles */}
      <div className={styles.circle1}></div>
      <div className={styles.circle2}></div>

      <motion.div
        className={styles.content}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >

        {/* 404 */}
        <motion.h1
          className={styles.code}
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{
            duration: 0.6,
            type: "spring",
          }}
        >
          404
        </motion.h1>

        {/* TEXT */}
        <h2 className={styles.title}>
          Oops! Page Not Found
        </h2>

        <p className={styles.subtitle}>
          The page you are looking for may have been removed,
          renamed, or is temporarily unavailable.
        </p>

        {/* BUTTON */}
        <Link to="/" className={styles.homeBtn}>
          Back To Home
        </Link>

      </motion.div>
    </div>
  );
}

export default NotFound;