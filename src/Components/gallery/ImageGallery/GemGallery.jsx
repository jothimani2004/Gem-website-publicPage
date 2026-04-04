import { useState, useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import styles from "./GemGallery.module.css";
import GemVideo from "../GemVideo/GemVideo";

const GemGallery = ({ media }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  const isVideo = (file) => {
    return file?.toLowerCase().includes(".mp4") || file?.toLowerCase().includes("#video");
  };

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  const scrollTo = useCallback((index) => {
    if (emblaApi) emblaApi.scrollTo(index);
  }, [emblaApi]);

  if (!media || media.length === 0) {
    return <p>No media available</p>;
  }

  return (
    <div className={styles.gallery}>

      {/* Main Preview Carousel (Swipeable) */}
      <div className={styles.mainPreview} ref={emblaRef}>
        <div className={styles.emblaContainer}>
          {media.map((item, index) => (
            <div className={styles.emblaSlide} key={index}>
              {isVideo(item) ? (
                  <GemVideo src={item} />
              ) : (
                <img src={item} alt="product slide" className={styles['main-media']} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Thumbnails */}
      <div className={styles.thumbnailcontainer}>
        {media.map((item, index) => (
          <div
            key={index}
            className={`${styles.thumbnail} ${
              selectedIndex === index ? styles.active : ""
            }`}
            onClick={() => scrollTo(index)}
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
