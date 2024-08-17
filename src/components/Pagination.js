import React from 'react';
import ReactPaginate from 'react-paginate';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageClick = (page) => {
    if (page !== currentPage) {
      onPageChange(page);
    }
  };

  const renderPageNumbers = () => {
    let pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          className={`pagination__button ${i === currentPage ? 'pagination__button--active' : ''
            }`}
          onClick={() => handlePageClick(i)}
          aria-current={i === currentPage ? 'page' : undefined}
          aria-label={`Page ${i}`}
          aria-disabled={i === currentPage}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel="next >"
      onPageChange={handlePageClick}
      pageRangeDisplayed={5}
      previousLabel="< previous"
      renderOnZeroPageCount={null}
    />
    // <nav
    //   aria-label="Pagination Navigation"
    //   className="pagination"
    //   role="navigation"
    // >
    //   <button
    //     className="pagination__button"
    //     onClick={() => handlePageClick(currentPage - 1)}
    //     aria-label="Previous page"
    //     disabled={currentPage === 1}
    //   >
    //     &laquo; Previous
    //   </button>
    //   <div role="list" className="pagination__list">
    //     {renderPageNumbers()}
    //   </div>
    //   <button
    //     className="pagination__button"
    //     onClick={() => handlePageClick(currentPage + 1)}
    //     aria-label="Next page"
    //     disabled={currentPage === totalPages}
    //   >
    //     Next &raquo;
    //   </button>
    // </nav>
  );
};

export default Pagination;
