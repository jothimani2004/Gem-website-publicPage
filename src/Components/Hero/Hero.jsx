import { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

import styles from "./Hero.module.css";



const slides = [
  {
    image: "/hero_section_imgs/slide1.jpg",
    title: "Rare Ruby Collection",
    description: "Discover the passion of crimson perfection",
  },
  {
    image: "/hero_section_imgs/slide2.jpg",
    title: "Sapphire Elegance",
    description: "Experience the depth of royal blue",
  },
  {
    image: "/hero_section_imgs/slide3.jpg",
    title: "Emerald Treasures",
    description: "Embrace the richness of nature's green",
  },
  {
    image: "/hero_section_imgs/slide4.jpg",
    title: "Diamond Brilliance",
    description: "Witness eternal sparkle and fire",
  },
  {
    image: "/hero_section_imgs/slide5.jpg",
    title: "Amethyst Mystique",
    description: "Unveil the magic of purple gemstones",
  },
];

function HeroSlider() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 4000, stopOnInteraction: false }),
  ]);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  return (
    <section className={styles.hero}>
      <div className={styles.embla} ref={emblaRef}>
        <div className={styles.emblaContainer}>
          {slides.map((slide, index) => (
            <div key={index} className={styles.emblaSlide}>
              <img src={slide.image} alt={slide.title} className={styles.slideImage} />

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
