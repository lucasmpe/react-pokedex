import { ClassNames } from "@emotion/react";
import styled from "@emotion/styled";
import React, { useState } from "react";

const PaginationWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 2rem;
  align-items: center;
  justify-content: space-between;
`;

const Pager = styled.nav`
  display: flex;
  flex-direction: row;
  margin: auto 2rem;
`;

const PaginationInfo = styled.span`
  margin: auto 2rem;
  color: #808080;
  font-size: 0.9rem;
  margin-inline-end: 4.5rem;
`;

const PaginationItem = styled.button`
  visibility: ${props => props.hidden && 'hidden'};
  background: ${props => props.active ? '#902929b5' : 'none'};
  color: ${props => props.active && 'white'};
  padding: 0.25rem;
  margin: 1.5px;
  border: 0.5px solid #ddd;
  border-radius: 2px;
  min-width: 1.5rem;
  text-align: center;
  cursor: default;
  font-weight: 400;
  font-size: 0.75rem;
  :hover {
    background-color: #ddd;
  }
  :disabled {
    color: #808080;
} 
`;

const PAGE_NEIGHBOURS = 2;
const FIRST_PAGE = 1;
const LAST_PAGE = 57;

const generateItemsPagination = (currentPage, pageNeighbours = PAGE_NEIGHBOURS) => {
  let numericItems = [];
  let start = Math.max(FIRST_PAGE, currentPage - pageNeighbours)
  let end = Math.min(LAST_PAGE, currentPage + pageNeighbours)

  for (let i = start; i <= end; i++) numericItems[i] = i;

  return numericItems;
}

const Pagination = ({ totalItems, currentPage, setPage }) => {
  const totalPages = Math.ceil(totalItems / 20);
  const [numericItems, setNumericItems] = useState(generateItemsPagination(currentPage));

  const handlePageChange = (item) => {
    if (typeof item !== Number) {
      if (item === '-') item = currentPage - 1;
      if (item === '+') item = currentPage + 1;
    }
    setPage(item);
    setNumericItems(generateItemsPagination(item));
  };

  return (
    <PaginationWrapper>
      <PaginationInfo><strong>{totalItems}</strong> Pokemons | Page {currentPage} of {LAST_PAGE}</PaginationInfo>
      <Pager>
        <PaginationItem
          hidden={(currentPage - PAGE_NEIGHBOURS) <= FIRST_PAGE}
          onClick={() => handlePageChange(FIRST_PAGE)}>
          {FIRST_PAGE}
        </PaginationItem>
        <PaginationItem onClick={() => handlePageChange('-')} disabled={currentPage === FIRST_PAGE}>Previous</PaginationItem>
        {numericItems.map(item => (
          <PaginationItem
            key={item}
            active={item === currentPage}
            onClick={() => handlePageChange(Number(item))}>
            {item}
          </PaginationItem>
        ))}
        <PaginationItem onClick={() => handlePageChange('+')} disabled={currentPage === LAST_PAGE}>Next</PaginationItem>
        <PaginationItem
          hidden={(currentPage + PAGE_NEIGHBOURS) >= LAST_PAGE}
          onClick={() => handlePageChange(LAST_PAGE)}>
          {LAST_PAGE}
        </PaginationItem>
      </Pager>
    </PaginationWrapper>
  );
};

export default Pagination;
