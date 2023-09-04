import React from 'react';
import PropTypes from 'prop-types';
import usePagination from '../../hooks/usePagination';

const Pagination = ({ itemsCount, onPageChange, currentPage, pageSize }) => {
  const { paginationItems: pages, totalPageCount } = usePagination({
    currentPage,
    itemsCount,
    pageSize,
  });
  
  return (
    <nav aria-label="Page navigation">
      {pages.length > 0 && (
        <ul className="mb-0 pagination pagination-sm">
          <li
            className={currentPage === 1 ? 'page-item disabled' : 'page-item'}
          >
            <button
              className="page-link"
              aria-label="Previous"
              onClick={() => onPageChange((prevPage) => prevPage - 1)}
            >
              <span aria-hidden="true">&laquo;</span>
            </button>
          </li>
          {pages.map((page, idx) => (
            <li
              className={
                currentPage === page ? 'page-item active' : 'page-item'
              }
              key={`page-${idx}`}
              style={{ cursor: 'pointer' }}
            >
              <button
                className="page-link"
                onClick={() => page !== '...' && onPageChange(page)}
              >
                {page}
              </button>
            </li>
          ))}
          <li
            className={
              currentPage === totalPageCount
                ? 'page-item disabled'
                : 'page-item'
            }
          >
            <button
              className="page-link"
              aria-label="Next"
              onClick={() => onPageChange(currentPage + 1)}
            >
              <span aria-hidden="true">&raquo;</span>
            </button>
          </li>
        </ul>
      )}
    </nav>
  );
};

Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
