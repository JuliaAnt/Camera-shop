import { usePagination } from './use-pagination';
import { act, renderHook } from '@testing-library/react';

const searchParams = { get: () => null };
jest.mock('react-router-dom', () => ({
  useSearchParams: () => [searchParams],
}));

describe('usePagination', () => {
  const mockProductsPerPage = 10;
  const mockProductsCount = 30;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should initialize with default values', () => {
    const { result } = renderHook(() =>
      usePagination({ productsPerPage: mockProductsPerPage, productsCount: mockProductsCount })
    );

    expect(result.current.totalPageCount).toBe(3);
    expect(result.current.page).toBe(1);
    expect(result.current.firstProductIndex).toBe(0);
    expect(result.current.lastProductIndex).toBe(10);
  });

  test('should increment page on nextPage call', () => {
    const { result } = renderHook(() =>
      usePagination({ productsPerPage: mockProductsPerPage, productsCount: mockProductsCount })
    );

    act(() => {
      result.current.nextPage();
    });

    expect(result.current.page).toBe(2);
    expect(result.current.firstProductIndex).toBe(10);
    expect(result.current.lastProductIndex).toBe(20);
  });

  test('should not increment page beyond totalPageCount', () => {
    const { result } = renderHook(() =>
      usePagination({ productsPerPage: mockProductsPerPage, productsCount: mockProductsCount })
    );

    act(() => {
      result.current.nextPage();
      result.current.nextPage();
      result.current.nextPage(); // Trying to go beyond totalPageCount
    });

    expect(result.current.page).toBe(3); // Page should remain at the maximum value
    expect(result.current.firstProductIndex).toBe(20);
    expect(result.current.lastProductIndex).toBe(30);
  });

  test('should decrement page on prevPage call', () => {
    const { result } = renderHook(() =>
      usePagination({ productsPerPage: mockProductsPerPage, productsCount: mockProductsCount })
    );

    act(() => {
      result.current.nextPage();
      result.current.prevPage();
    });

    expect(result.current.page).toBe(1);
    expect(result.current.firstProductIndex).toBe(0);
    expect(result.current.lastProductIndex).toBe(10);
  });

  test('should not decrement page below 1', () => {
    const { result } = renderHook(() =>
      usePagination({ productsPerPage: mockProductsPerPage, productsCount: mockProductsCount })
    );

    act(() => {
      result.current.prevPage(); // Trying to go below 1
    });

    expect(result.current.page).toBe(1); // Page should remain at the minimum value
    expect(result.current.firstProductIndex).toBe(0);
    expect(result.current.lastProductIndex).toBe(10);
  });

  test('should select page with selectPage call', () => {
    const { result } = renderHook(() =>
      usePagination({ productsPerPage: mockProductsPerPage, productsCount: mockProductsCount })
    );

    act(() => {
      result.current.setPage(2);
    });

    expect(result.current.page).toBe(2);
    expect(result.current.firstProductIndex).toBe(10);
    expect(result.current.lastProductIndex).toBe(20);
  });

  test('should not select page beyond totalPageCount', () => {
    const { result } = renderHook(() =>
      usePagination({ productsPerPage: mockProductsPerPage, productsCount: mockProductsCount })
    );

    act(() => {
      result.current.setPage(5); // Trying to select a page beyond totalPageCount
    });

    expect(result.current.page).toBe(3); // Page should remain at the maximum value
    expect(result.current.firstProductIndex).toBe(20);
    expect(result.current.lastProductIndex).toBe(30);
  });

  test('should not select page below 1', () => {
    const { result } = renderHook(() =>
      usePagination({ productsPerPage: mockProductsPerPage, productsCount: mockProductsCount })
    );

    act(() => {
      result.current.setPage(0); // Trying to select a page below 1
    });

    expect(result.current.page).toBe(1); // Page should remain at the minimum value
    expect(result.current.firstProductIndex).toBe(0);
    expect(result.current.lastProductIndex).toBe(10);
  });
});
