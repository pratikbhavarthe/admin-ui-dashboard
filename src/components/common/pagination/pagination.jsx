import React from "react";
import { range } from '../../../utils';

const Pagination = ({ itemsCount, pageSize, currentPage, onPageChange }) => {
  const pagesCount = Math.ceil(itemsCount / pageSize);

  if (pagesCount === 1) {
    return null;
  }

  let pages = range(1, pagesCount);
  const disabledClass = "page-item disabled";

  return (
    <div className="float-end">
      <nav aria-label="Page navigation">
        <ul className="pagination">
          <PaginationButton
            className={currentPage === 1 ? disabledClass : "page-item"}
            onClick={() => onPageChange(1)}
            label="&laquo;"
          />
          <PaginationButton
            className={currentPage === 1 ? disabledClass : "page-item"}
            onClick={() => onPageChange(currentPage - 1)}
            label="&lt;"
          />
          {pages.map((page) => (
            <PaginationButton
              key={page}
              className={page === currentPage ? "page-item active" : "page-item"}
              onClick={() => onPageChange(page)}
              label={page.toString()}
            />
          ))}
          <PaginationButton
            className={currentPage === pages.length ? disabledClass : "page-item"}
            onClick={() => onPageChange(currentPage + 1)}
            label="&gt;"
          />
          <PaginationButton
            className={currentPage === pages.length ? disabledClass : "page-item"}
            onClick={() => onPageChange(pages.length)}
            label="&raquo;"
          />
        </ul>
      </nav>
    </div>
  );
};

const PaginationButton = ({ className, onClick, label }) => (
  <li className={className}>
    <button
      className="page-link"
      onClick={onClick}
      role="button"
    >
      <span aria-hidden="true">{label}</span>
    </button>
  </li>
);

export default Pagination;
