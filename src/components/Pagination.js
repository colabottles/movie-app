import { useState } from 'react';

// Pagination — kept the original prev/next + "Page X of Y" structure.
// Improvements:
//   - aria-current="page" concept applied to the status text
//   - Prev button label improved for screen readers
//   - Returns null when there's only one page (no point rendering it)
const Pagination = ({ handlePagination, totalPages }) => {
  const [pageNumber, setPageNumber] = useState(1);

  // No pagination needed for a single page
  if (totalPages <= 1) return null;

  const goTo = (page) => {
    setPageNumber(page);
    handlePagination(page);
  };

  return (
    <nav aria-label="Movie results pagination" className="pagination">
      <button
        className="pagination__button"
        disabled={pageNumber <= 1}
        aria-label="Go to previous page"
        onClick={() => goTo(pageNumber - 1)}
      >
        &laquo; Previous
      </button>

      {/* "Page X of Y" — acts as a live region via the parent aria-live on result count */}
      <ul className="pagination__list">
        <li aria-current="page">
          Page {pageNumber} of {totalPages}
        </li>
      </ul>

      <button
        className="pagination__button"
        disabled={pageNumber === totalPages}
        aria-label="Go to next page"
        onClick={() => goTo(pageNumber + 1)}
      >
        Next &raquo;
      </button>
    </nav>
  );
};

export default Pagination;