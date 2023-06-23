import { renderHook } from '@testing-library/react';
import { usePagination } from './use-pagination';
import { PRODUCTS_PER_PAGE } from '../consts';

describe('Hook: usePagination', () => {
  it('should return correct data', () => {
    const { result } = renderHook(() => {
      const usePaginationReturn = usePagination({ productsPerPage: PRODUCTS_PER_PAGE, productsCount: 50 });
      return usePaginationReturn;
    });
    expect(result.current).toEqual(expect.objectContaining({
      totalPageCount: 6,
      firstProductIndex: 0,
      lastProductIndex: 9,
      page: 1,
    }));
  });
});
