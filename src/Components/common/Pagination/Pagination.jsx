import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { fetchGems } from "../../../features/gems/gemSlice";
import styles from "./Pagination.module.css";

function Pagination({ category, gemName }) {
  const dispatch = useDispatch();
  const { total, limit, filters, page } = useSelector((state) => state.gems);

  const pageCount = Math.ceil(total / limit);

  const handlePageClick = (event) => {
    const selectedPage = event.selected + 1;

    dispatch(
      fetchGems({
        ...filters,
        category,
        gemName,
        page: selectedPage,
      })
    );
  };

  if (pageCount <= 1) return null;

  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel="Next ›"
      previousLabel="‹ Prev"
      pageCount={pageCount}
      forcePage={page - 1}
      marginPagesDisplayed={1}
      pageRangeDisplayed={3}
      onPageChange={handlePageClick}
      containerClassName={styles.wrapper}
      pageClassName={styles.page}
      activeClassName={styles.active}
      previousClassName={styles.nav}
      nextClassName={styles.nav}
      disabledClassName={styles.disabled}
    />
  );
}

export default Pagination;
