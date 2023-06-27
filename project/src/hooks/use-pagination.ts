import { useState, useEffect, useCallback } from 'react';
import { UsePaginationReturn } from '../types/pagination';
import { useSearchParams } from 'react-router-dom';

type UsePaginationProps = {
  productsPerPage: number;
  productsCount: number;
}

export const usePagination = ({ productsPerPage, productsCount }: UsePaginationProps): UsePaginationReturn => {
  const [page, setPage] = useState(1);
  const totalPageCount: number = Math.ceil(productsCount / productsPerPage);
  const lastProductIndex = page * productsPerPage;
  const firstProductIndex = lastProductIndex - productsPerPage;
  const [params] = useSearchParams();

  const selectPage = useCallback((pageNumber: number) => {
    if (pageNumber > totalPageCount) {
      setPage(totalPageCount);
    } else if (pageNumber < 1) {
      setPage(1);
    } else {
      setPage(pageNumber);
    }
  }, [totalPageCount, setPage]);

  useEffect(() => {
    const tabParam = params.get('page');
    if (tabParam && tabParam !== page.toString()) {
      selectPage(+tabParam);
    }
  }, [params, page, selectPage]);

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


