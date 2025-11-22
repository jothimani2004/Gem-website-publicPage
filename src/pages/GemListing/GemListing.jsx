import styles from "./GemListing.module.css";
import { useState } from "react";
import { spinelGems } from "../../data/spinel-gems";

function GemListing() {
  const [selectedShape, setSelectedShape] = useState("All");
  const [carat, setCarat] = useState(10);

  const SHAPES = [
    "All",
    "Round",
    "Princess",
    "Radiant",
    "Emerald",
    "Cushion",
    "Trillion",
    "Oval",
    "Pear",
    "Marquise",
    "Heart",
    "Square",
    "Mixed",
  ];

  return (
    <div className={styles.page}>
      {/* Breadcrumb */}
      <nav className={styles.breadcrumbs}>
        Home › Semi Precious › Spinel
      </nav>

      {/* Page Title */}
      <h1 className={styles.pageTitle}>Natural Blue Sapphires</h1>

      <div className={styles.layout}>
        
        {/* LEFT FILTERS */}
        <aside className={styles.sidebar}>
          <div className={styles.filterBlock}>
            <h3>Shape</h3>

            <div className={styles.shapeGrid}>
              {SHAPES.map((shapeItem) => (
                <button
                  key={shapeItem}
                  className={`${styles.shapeButton} ${
                    selectedShape === shapeItem ? styles.activeShape : ""
                  }`}
                  onClick={() => setSelectedShape(shapeItem)}
                >
                  <div className={`${styles.icon} ${styles[shapeItem.toLowerCase()]}`} />
                  <span>{shapeItem}</span>
                </button>
              ))}
            </div>
          </div>

          <div className={styles.filterBlock}>
            <h3>Carat Weight</h3>

            <input
              type="range"
              min="0"
              max="10"
              step="0.1"
              value={carat}
              onChange={(e) => setCarat(e.target.value)}
              className={styles.slider}
            />

            <div className={styles.rangeLabels}>
              <span>0.0 ct</span>
              <span>{carat} ct</span>
            </div>
          </div>
        </aside>

        {/* RIGHT PRODUCT GRID */}
        <main className={styles.grid}>
          {spinelGems.slice(0, 12).map((g) => (
            <div key={g.id} className={styles.card}>
              <img src={g.image} alt={g.name} className={styles.image} />
              <h3>{g.name}</h3>
              <p>
                {Array.isArray(g.carat) ? g.carat.join(", ") : g.carat} ct •{" "}
                {Array.isArray(g.shape) ? "Mixed" : g.shape}
              </p>
            </div>
          ))}
        </main>
      </div>
    </div>
  );
}

export default GemListing;
