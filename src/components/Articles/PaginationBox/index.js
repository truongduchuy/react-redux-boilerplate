import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

function PaginationBox({ onPageIndexChanged, pageIndexs, currentPageIndex, hasNext, hasPrev, totalPages }) {
  const handleChange = (event, pageIndex, isClickedNumberButton = false) => {
    if (pageIndex === currentPageIndex) return;

    event.preventDefault();
    onPageIndexChanged(pageIndex, isClickedNumberButton);
  };

  const handleNext = event => {
    handleChange(event, currentPageIndex + 1);
  };

  const handlePrev = event => {
    handleChange(event, currentPageIndex - 1);
  };

  const isDisablePrev = useMemo(() => !hasPrev || pageIndexs[0] === 1, [hasPrev, pageIndexs]);
  const isDisableNext = useMemo(() => !hasNext || pageIndexs[2] === totalPages, [hasNext, pageIndexs]);

  const activeNumberClass = pageIndex => (pageIndex === currentPageIndex ? 'active' : '');
  const disabledNumberClass = pageIndex => (pageIndex > totalPages ? 'disabled' : '');

  return (
    <nav aria-label="navigation">
      <ul className="pagination">
        <li className={`page-item ${isDisablePrev && 'disabled'}`}>
          <a className="page-link" href="##" onClick={handlePrev}>
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        {pageIndexs.map(pageIndex => (
          <li
            className={`page-item ${activeNumberClass(pageIndex)}
             ${disabledNumberClass(pageIndex)}`}
            key={pageIndex}
          >
            <a className="page-link" href="##" onClick={event => handleChange(event, pageIndex, true)}>
              {pageIndex}
            </a>
          </li>
        ))}
        <li className={`page-item ${isDisableNext && 'disabled'}`}>
          <a className="page-link" href="##" onClick={handleNext}>
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  );
}

PaginationBox.propTypes = {
  currentPageIndex: PropTypes.number.isRequired,
  pageIndexs: PropTypes.arrayOf(PropTypes.string).isRequired,
  hasNext: PropTypes.bool.isRequired,
  hasPrev: PropTypes.bool.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageIndexChanged: PropTypes.func.isRequired,
};

export default PaginationBox;
