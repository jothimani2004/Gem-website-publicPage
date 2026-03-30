import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { fetchGems } from "../../features/gems/gemSlice";
import { fetchShapes } from "../../features/shapes/shapeSlice";
import { fetchColors } from "../../features/colors/colorSlice";
import Filtersidebar from "../../components/filters/FilterSidebar/FilterSidebar";
import Gemgrid from "../../Components/gem/GemGrid/Gemgrid";
import Pagination from "../../Components/common/Pagination/Pagination";

import styles from "./GemListing.module.css";

function GemListing() {
  const dispatch = useDispatch();
  const { category, gemName } = useParams();

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const [appliedFilters, setAppliedFilters] = useState({
    type: "single",
    shape: "",
    color: "",
    maxCarat: "",
    page: 1,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(fetchShapes());
    dispatch(fetchColors());
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      fetchGems({
        category,
        gemName,
        ...appliedFilters,
      })
    );
  }, [category, gemName]);

  const handleApply = (filters) => {
    const updatedFilters = {
      ...filters,
      page: 1,
    };

    setAppliedFilters(updatedFilters);

    dispatch(
      fetchGems({
        category,
        gemName,
        ...updatedFilters,
      })
    );

    setIsFilterOpen(false); // close on apply
  };

  return (
    <div className={styles.page}>

      {/* Breadcrumb */}
      <div className={styles.breadcrumb}>
        <Link to="/" style={{ textTransform: "capitalize" }}>
          {category === "precious" || category === "semiprecious" ? category : "Home"}
        </Link> / <span>{gemName}</span>
      </div>

      {/* Header */}
      <div className={styles.header}>
        <h1>{gemName}</h1>

        {/* Mobile Filter Button */}
        <button
          className={styles.filterBtn}
          onClick={() => setIsFilterOpen(true)}
        >
          Filter
        </button>
      </div>

      <div className={styles.layout}>

        {/* Desktop Sidebar */}
        <aside className={styles.sidebar}>
          <FilterSidebar onApply={handleApply} />
        </aside>

        {/* Mobile Drawer */}
        {isFilterOpen && (
          <>
            <div
              className={styles.overlay}
              onClick={() => setIsFilterOpen(false)}
            />

            <div className={styles.mobileSidebar}>
              <div className={styles.mobileHeader}>
                <h3>Filters</h3>

                <button
                  onClick={() => setIsFilterOpen(false)}
                  className={styles.closeBtn}
                >
                  ✕
                </button>
              </div>

              <Filtersidebar onApply={handleApply} />
            </div>
          </>
        )}

        {/* Content */}
        <main className={styles.content}>
          <Gemgrid />

          <Pagination
            category={category}
            gemName={gemName}
          />
        </main>

      </div>
    </div>
  );
}

export default GemListing;
