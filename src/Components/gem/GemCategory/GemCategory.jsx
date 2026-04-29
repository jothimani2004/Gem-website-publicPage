import { useRef, useState, useEffect } from "react";
import GemCard from "../GemCard/GemCard";
import styles from "./GemCategory.module.css";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { BsArrowRight } from "react-icons/bs";

function GemCategory({ title, gems, category, showExplore = true }) {
  const containerClass = showExplore ? styles.scrollContainer : styles.grid;

  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 50); // Use 5px threshold to avoid sub-pixel rendering bugs
      setCanScrollRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth - 50);
    }
  };

  useEffect(() => {
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
  }, [gems, showExplore]);

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
      </header>

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
              key={gem.id}
              className={showExplore ? styles.cardWrapper : ""}
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: index * 0.12 }}
            >
              <GemCard
                gem={{
                  ...gem,
                  link: `/${category}/${gem.name}`
                }}
                variant="category"
              />
            </motion.div>
          ))}

          {/* Small impressive arrow button at the end of the scroll */}
          {showExplore && (
            <motion.div
              style={{ flex: "0 0 auto", scrollSnapAlign: "center", display: "flex" }}
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: gems.length * 0.12 }}
            >
              <Link
                to={`/${category}`}
                className={styles.endArrowBtn}
                aria-label="View all gems"
              >
                 {/* <span>View All</span> */}
                  <div className={styles.arrow}><i class="fa-solid fa-arrow-right"></i></div>
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

      {/* 💎 EXPLORE BUTTON */}
      {/* {showExplore && (
        <div className={styles.footer}>
          <Link to={`/${category}`} className={styles.moreBtn}>
            Explore More →
          </Link>
        </div>
      )} */}
    </section>
  );
}

export default GemCategory;
