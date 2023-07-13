import { useCallback } from 'react';
import { UsePaginationReturn } from '../types/pagination';
import { useAppDispatch, useAppSelector } from './redux-hooks';
import { changePaginationPageAction } from '../store/catalog-data/catalog-data-slice';
import { getPaginationPage } from '../store/catalog-data/catalog-data-selectors';

type UsePaginationProps = {
  productsPerPage: number;
  productsCount: number;
}

export const usePagination = ({ productsPerPage, productsCount }: UsePaginationProps): UsePaginationReturn => {
  const dispatch = useAppDispatch();
  const paginationPage = useAppSelector(getPaginationPage);
  const totalPageCount: number = Math.ceil(productsCount / productsPerPage);
  const lastProductIndex = paginationPage * productsPerPage;
  const firstProductIndex = lastProductIndex - productsPerPage;

  const selectPage = useCallback((pageNumber: number) => {
    if (pageNumber > totalPageCount) {
      dispatch(changePaginationPageAction(totalPageCount));
    } else if (pageNumber < 1) {
      dispatch(changePaginationPageAction(1));
    } else {
      dispatch(changePaginationPageAction(pageNumber));
    }
  }, [totalPageCount, dispatch]);

  const changePageWithDirection = (direction: boolean) => {
    if (direction) {
      if (paginationPage === totalPageCount) {
        dispatch(changePaginationPageAction(paginationPage));
      }
      dispatch(changePaginationPageAction(paginationPage + 1));
    } else {
      if (paginationPage === 1) {
        dispatch(changePaginationPageAction(paginationPage));
      }
      dispatch(changePaginationPageAction(paginationPage - 1));
    }
  };

  return {
    totalPageCount,
    nextPage: () => changePageWithDirection(true),
    prevPage: () => changePageWithDirection(false),
    setPage: selectPage,
    firstProductIndex,
    lastProductIndex,
    page: paginationPage,
  };
};


