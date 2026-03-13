import { useState } from "react";
import styles from "./GemGallery.module.css";

const GemGallery = ({ media }) => {
  const [selected, setSelected] = useState(media?.[0]);

  const isVideo = (file) => {
    return file?.toLowerCase().endsWith(".mp4");
  };

  if (!media || media.length === 0) {
    return <p>No media available</p>;
  }

  return (
    <div className={styles.gallery}>

      {/* Main Preview */}
      <div className={ styles.mainPreview }>
        {isVideo(selected) ? (
          <video controls className={styles.main-media}>
            <source src={selected} type="video/mp4" />
          </video>
        ) : (
          <img src={selected} alt="product" className={styles.main-media }/>
        )}
      </div>

      {/* Thumbnails */}
      <div className={styles.thumbnailcontainer} >
        {media.map((item, index) => (
          <div
            key={index}
            className={`${styles.thumbnail} ${
              selected === item ? styles.active : ""
            }`}
            onClick={() => setSelected(item)}
          >
            {isVideo(item) ? (
              <div className={styles.videothumb}>🎥</div>
            ) : (
              <img src={item} alt="thumb" />
            )}
          </div>
        ))}
      </div>

    </div>
  );
};

export default GemGallery;
