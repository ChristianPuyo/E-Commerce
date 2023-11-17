import { useSelector } from "react-redux";
import styles from "./Pagination.module.css";

const Pagination = () => {
  const { currentPage, itemsPerPage, totalItems, paginate } = useSelector(
    (state) => state.pagination
  );

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <nav className={styles.pagCont}>
      <div className={styles.pagButtons}>
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          &#8592;
        </button>
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => paginate(page)}
            className={currentPage === page ? styles.active : ""}
          >
            {page}
          </button>
        ))}
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          &#8594;
        </button>
      </div>
    </nav>
  );
};

export default Pagination;
