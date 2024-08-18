import React, { useState } from 'react';

const Pagination = ({ handlePagination, totalPages }) => {

  const [pageNumbers, setPageNumber] = useState(1);

  return (
    <nav
      aria-label="Pagination Navigation"
      className="pagination"
      role="navigation"
    >
      <button
        className="pagination__button"
        disabled={pageNumbers <= 1}
        onClick={() => {
          handlePagination(pageNumbers - 1)
          setPageNumber(pageNumbers - 1);
        }
        }
        aria-label="Previous page"
      >
        &laquo; Previous
      </button>
      <ul className="pagination__list">
        <li>Page {pageNumbers} of {totalPages}</li>
      </ul>
      <button
        className="pagination__button"
        disabled={pageNumbers === totalPages}
        onClick={() => {
          handlePagination(pageNumbers + 1)
          setPageNumber(pageNumbers + 1);
        }
        }
        aria-label="Next page"
      >
        Next &raquo;
      </button>
    </nav>
  );
};

export default Pagination;
