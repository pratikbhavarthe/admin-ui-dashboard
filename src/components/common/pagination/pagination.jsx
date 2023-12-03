/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { range } from '../../../utils'

const Pagination = (props) => {
  const { itemsCount, pageSize, currentPage, onPageChange } = props;
  const pagesCount = Math.ceil(itemsCount / pageSize);
  if (pagesCount === 1) return null;
  const pages = range(1, pagesCount);

  return (
    <div className="float-end">
      <nav aria-label="Page navigation">
        <ul className="pagination">
          <li
            className={currentPage === 1 ? "page-item disabled" : "page-item"}
          >
            <a
              className="page-link"
              aria-label="first"
              onClick={() => onPageChange(1)}
            >
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          <li
            className={currentPage === 1 ? "page-item disabled" : "page-item"}
          >
            <a
              className="page-link"
              aria-label="Previous"
              onClick={() => onPageChange(currentPage - 1)}
            >
              <span aria-hidden="true">&lt;</span>
            </a>
          </li>
          {pages.map((page) => (
            <li
              key={page}
              className={
                page === currentPage ? "page-item active" : "page-item"
              }
            >
              <a onClick={() => onPageChange(page)} className="page-link">
                {page}
              </a>
            </li>
          ))}
          <li
            className={
              currentPage === pages.length ? "page-item disabled" : "page-item"
            }
          >
            <a
              className="page-link"
              aria-label="Next"
              onClick={() => onPageChange(currentPage + 1)}
            >
              <span aria-hidden="true">&gt;</span>
            </a>
          </li>
          <li
            className={
              currentPage === pages.length ? "page-item disabled" : "page-item"
            }
          >
            <a
              className="page-link"
              aria-label="last"
              onClick={() => onPageChange(pages.length)}
            >
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
