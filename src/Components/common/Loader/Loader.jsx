import styles from './Loader.module.css';

const Loader = ({ text = "Curating Collection", fullScreen = false }) => {
  return (
    <div className={`${styles.loaderContainer} ${fullScreen ? styles.fullScreen : ''}`}>
      <div className={styles.spinner}></div>
      <p className={styles.text}>{text}</p>
    </div>
  );
};

export default Loader;
