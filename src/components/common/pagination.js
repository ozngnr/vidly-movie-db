import React from 'react';
import PropTypes from 'prop-types';

const Pagination = ({ itemsCount, onPageChange, currentPage, pageSize }) => {
  const pagesCount = Math.ceil(itemsCount / pageSize);
  // Create page numbers for pagination depending
  // the amount of items in the DB and page size
  const pages = [...Array(pagesCount + 1).keys()].slice(1);

  return (
    <nav aria-label="Page navigation">
      <ul className="pagination">
        {pages.map((page) => (
          <li
            className={currentPage === page ? 'page-item active' : 'page-item'}
            key={page}
            style={{ cursor: 'pointer' }}
          >
            <a className="page-link" onClick={() => onPageChange(page)}>
              {page}
            </a>
          </li>
        ))}
      </ul>
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
