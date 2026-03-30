import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import api from "../../services/api";
import Loader from "../common/Loader/Loader";

import styles from "./Hero.module.css";

function HeroSlider() {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 4000, stopOnInteraction: false }),
  ]);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  useEffect(() => {
    const fetchHeroSlides = async () => {
      try {
        const response = await api.get("/public/hero-section");
        if (response.data && response.data.success) {
           // We might want to construct the full image URL if the backend only sends a hash/filename.
           // E.g. https://<s3/ip>/images/image_url
           // Wait, let's just use the image_url field. The document sample is: "4132ae862..." 
           // I will assume the image_url given by the backend is either complete or we just need the IP. 
           // To be safe and show *something* even if broken, we set it:
          setSlides(response.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch hero section data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchHeroSlides();
  }, []);

  if (loading) {
    return (
      <section className={styles.hero}>
        <Loader text="Curating Showcase" fullScreen={true} />
      </section>
    );
  }

  if (slides.length === 0) {
    return <section className={styles.hero}><div className={styles.embla}><h2 style={{color: "white", textAlign: "center", marginTop: "20%"}}>No Hero Slides Available</h2></div></section>;
  }

  return (
    <section className={styles.hero}>
      <div className={styles.embla} ref={emblaRef}>
        <div className={styles.emblaContainer}>
          {slides.map((slide) => (
            <div key={slide.id} className={styles.emblaSlide}>
              <img 
                src={`https://d1wugj5ru4kx2.cloudfront.net/${slide.image_url}`} 
                alt={slide.title} 
                onError={(e) => { e.target.src = "/hero_section_imgs/slide1.jpg"; }}
                className={styles.slideImage} 
              />

              <div className={styles.overlay}>
                <h1 className={styles.title}>{slide.title}</h1>
                <p className={styles.description}>{slide.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <button className={`${styles.navButton} ${styles.leftBtn}`} onClick={scrollPrev}>
        ❮
      </button>
      <button className={`${styles.navButton} ${styles.rightBtn}`} onClick={scrollNext}>
        ❯
      </button>

      {/* Scroll Indicator */}
<div className={styles.scrollIndicator}>
  <span>Scroll</span>
  <div className={styles.line}></div>
</div>


    </section>
  );
}

export default HeroSlider;
