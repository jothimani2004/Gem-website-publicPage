import { useRef, useState, useEffect } from "react";
import GemCard from "../GemCard/GemCard";
import styles from "./GemCategory.module.css";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { BsArrowRight } from "react-icons/bs";

function GemCategory({ title, gems = [], category, showExplore = true }) {
  const containerClass = showExplore ? styles.scrollContainer : styles.grid;

  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const hasGems = Array.isArray(gems) && gems.length > 0;
  const isPrecious = category?.toLowerCase() === "precious";
  const otherCategory = isPrecious ? "Semi-Precious" : "Precious";

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 50); // Use 5px threshold to avoid sub-pixel rendering bugs
      setCanScrollRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth - 50);
    }
  };

  useEffect(() => {
    if (!hasGems) return;

    checkScroll();

    const currentRef = scrollRef.current;
    if (!currentRef) return;
    requestAnimationFrame(() => {
      checkScroll();
    });

    // Use ResizeObserver to reliably detect when the container's width or contents change
    const resizeObserver = new ResizeObserver(() => {
      checkScroll();
    });

    resizeObserver.observe(currentRef);

    return () => {
      if (currentRef) resizeObserver.unobserve(currentRef);
    };
  }, [gems, showExplore, hasGems]);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -300 : 300;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className={styles.section}>
      <header className={styles.header}>
        <h2>{title}</h2>
        {showExplore && hasGems && (
          <Link to={`/${category}`} className={styles.viewMoreLink}>
            View All
          </Link>
        )}
      </header>

      {hasGems ? (
        <div className={styles.carouselWrapper}>
          {showExplore && canScrollLeft && (
            <button
              className={`${styles.navBtn} ${styles.navLeft}`}
              onClick={() => scroll("left")}
              aria-label="Scroll left"
            >
              <i className="fa-solid fa-chevron-left"></i>
            </button>
          )}

          <div
            className={containerClass}
            ref={showExplore ? scrollRef : null}
            onScroll={showExplore ? checkScroll : undefined}
          >
            {gems.map((gem, index) => (
              <motion.div
                key={gem.id || index}
                className={showExplore ? styles.cardWrapper : ""}
                initial={{ opacity: 0, x: 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.7, ease: "easeOut", delay: index * 0.12 }}
              >
                <GemCard
                  gem={{
                    ...gem,
                    link: `/${category}/${encodeURIComponent(gem.name)}`
                  }}
                  variant="category"
                />
              </motion.div>
            ))}

            {showExplore && gems.length >= 8 && (
              <motion.div
                className={styles.cardWrapper}
                initial={{ opacity: 0, x: 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.7, ease: "easeOut", delay: gems.length * 0.12 }}
                style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
              >
                <Link to={`/${category}`} className={styles.endArrowBtn}>
                  <span className={styles.viewAllText}>View More</span>
                  <span className={styles.arrow}><BsArrowRight /></span>
                </Link>
              </motion.div>
            )}
          </div>

          {showExplore && canScrollRight && (
            <button
              className={`${styles.navBtn} ${styles.navRight}`}
              onClick={() => scroll("right")}
              aria-label="Scroll right"
            >
              <i className="fa-solid fa-chevron-right"></i>
            </button>
          )}
        </div>
      ) : (
        <div className={styles.noGemsContainer}>
          <div className={styles.noGemsIconBox}>
            <i className="fa-regular fa-gem"></i>
          </div>
          <h3 className={styles.noGemsTitle}>No gems found</h3>
          <p className={styles.noGemsText}>
            Currently there are no gemstones available in this category.
          </p>
          {!showExplore && (
            <div className={styles.noGemsActions}>
              <Link to={`/${otherCategory}`} className={styles.noGemsPrimaryBtn}>
                Browse {otherCategory} Gems
              </Link>
              <Link to="/" className={styles.noGemsSecondaryBtn}>
                Back to Home
              </Link>
            </div>
          )}
        </div>
      )}
    </section>
  );
}

export default GemCategory;
