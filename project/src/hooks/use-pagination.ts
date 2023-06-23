import { useState } from 'react';
import { UsePaginationReturn } from '../types/pagination';

type UsePaginationProps = {
  productsPerPage: number;
  productsCount: number;
}

export const usePagination = ({ productsPerPage, productsCount }: UsePaginationProps): UsePaginationReturn => {
  const [page, setPage] = useState(1);
  const totalPageCount: number = Math.ceil(productsCount / productsPerPage);
  const lastProductIndex = page * productsPerPage;
  const firstProductIndex = lastProductIndex - productsPerPage;

  const changePageWithDirection = (direction: boolean) => {
    setPage((currentPage) => {
      if (direction) {
        if (currentPage === totalPageCount) {
          return currentPage;
        }
        return currentPage + 1;
      } else {
        if (currentPage === 1) {
          return currentPage;
        }
        return currentPage - 1;
      }
    });
  };

  const selectPage = (pageNumber: number) => {
    if (pageNumber > totalPageCount) {
      setPage(totalPageCount);
    }
    if (pageNumber < 1) {
      setPage(1);
    }
    setPage(pageNumber);
  };

  return {
    totalPageCount,
    nextPage: () => changePageWithDirection(true),
    prevPage: () => changePageWithDirection(false),
    setPage: selectPage,
    firstProductIndex,
    lastProductIndex,
    page,
  };
};


