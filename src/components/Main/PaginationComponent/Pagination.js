import { React, useState } from "react";
import { Pagination } from "react-bootstrap";
import "./Pagination.css";
function PaginationComponent({ currentPage, pages, setPage }) {
  let pageNumbers = [];
  for (let number = 1; number <= pages; number++) {
    pageNumbers.push(number);
  }
  const [pageNumbersLimit] = useState(5);
  const [maxPageToShow, setMaxPageToShow] = useState(5);
  const [minPageToShow, setMinPageToShow] = useState(0);

  const renderPageNumbers = pageNumbers.map((page) => {
    if (page < maxPageToShow + 1 && page > minPageToShow) {
      return (
        <Pagination.Item
          key={page}
          onClick={() => setPage(page)}
          active={page === currentPage}
        >
          {page}
        </Pagination.Item>
      );
    }
  });

  const handlePrevPage = () => {
    if (minPageToShow > 0) {
      setMinPageToShow(minPageToShow - pageNumbersLimit);
      setMaxPageToShow(maxPageToShow - pageNumbersLimit);
    }
  };
  const handlePrev = () => {
    if (currentPage > 1) {
      setPage(currentPage - 1);
      if ((currentPage - 1) % pageNumbersLimit === 0) {
        setMinPageToShow(minPageToShow - pageNumbersLimit);
        setMaxPageToShow(maxPageToShow - pageNumbersLimit);
      }
    }
  };

  const handleNext = () => {
    if (currentPage < pages) {
      setPage(currentPage + 1);
      if (currentPage + 1 > maxPageToShow) {
        setMinPageToShow(minPageToShow + pageNumbersLimit);
        setMaxPageToShow(maxPageToShow + pageNumbersLimit);
      }
    }
  };
  const handleNextPage = () => {
    if (maxPageToShow < pages) {
      setMinPageToShow(minPageToShow + pageNumbersLimit);
      setMaxPageToShow(maxPageToShow + pageNumbersLimit);
    }
  };

  return (
    <>
      <Pagination >
        <Pagination.First onClick={() => handlePrevPage()} />
        <Pagination.Prev onClick={() => handlePrev()} />
        {renderPageNumbers}
        <Pagination.Next onClick={() => handleNext()} />
        <Pagination.Last onClick={() => handleNextPage()} />
      </Pagination>
    </>
  );
}

export default PaginationComponent;
