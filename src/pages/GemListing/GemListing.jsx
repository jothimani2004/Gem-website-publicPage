import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchGems } from "../../features/gems/gemSlice";

import Filtersidebar from "../../components/filters/FilterSidebar/Filtersidebar";
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
    maxCarat: 10,
    page: 1,
  });

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
          <Filtersidebar onApply={handleApply} />
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
