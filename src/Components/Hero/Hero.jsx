import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import api from "../../services/api";
import Loader from "../common/Loader/Loader";

import styles from "./Hero.module.css";

const fallbackSlides = [
  {
    id: "fallback-1",
    image_url: "/hero_section_imgs/slide1.jpg",
    title: "Exquisite Gemstones & Jewels",
    description: "Discover our rare, hand-selected gemstones crafted with unmatched precision and brilliance."
  },
  {
    id: "fallback-2",
    image_url: "/hero_section_imgs/slide2.jpg",
    title: "Timeless Craftsmanship",
    description: "Every cut, facet, and setting is designed to tell a story of elegance and durability."
  },
  {
    id: "fallback-3",
    image_url: "/hero_section_imgs/slide3.jpg",
    title: "Luxury Beyond Compare",
    description: "Experience the epitome of luxury with our curated selection of fine custom-made gemstone jewelry."
  }
];

function HeroSlider() {
  const [slides, setSlides] = useState(fallbackSlides);

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 4000, stopOnInteraction: false }),
  ]);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  useEffect(() => {
    const fetchHeroSlides = async () => {
      try {
        const response = await api.get("/public/hero-section");
        if (response.data && response.data.success && response.data.data && response.data.data.length > 0) {
          setSlides(response.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch hero section data, using fallback:", error);
      }
    };
    fetchHeroSlides();
  }, []);

  return (
    <section className={styles.hero}>
      <div className={styles.embla} ref={emblaRef}>
        <div className={styles.emblaContainer}>
          {slides.map((slide, index) => (
            <div key={slide.id || index} className={styles.emblaSlide}>
              <img 
                src={
                  slide.image_url.startsWith("http") || slide.image_url.startsWith("/")
                    ? slide.image_url
                    : `https://d1wugj5ru4kx2.cloudfront.net/${slide.image_url}`
                } 
                alt={slide.title || "Exquisite Gemstone Showcase"} 
                onError={(e) => { e.target.src = "/hero_section_imgs/slide1.jpg"; }}
                className={styles.slideImage} 
                loading={index === 0 ? "eager" : "lazy"}
                fetchpriority={index === 0 ? "high" : "low"}
                decoding="async"
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
      <button 
        className={`${styles.navButton} ${styles.leftBtn}`} 
        onClick={scrollPrev}
        aria-label="Previous slide"
      >
        ❮
      </button>
      <button 
        className={`${styles.navButton} ${styles.rightBtn}`} 
        onClick={scrollNext}
        aria-label="Next slide"
      >
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
