// import { usePagination } from './use-pagination';
// import { act, renderHook } from '@testing-library/react';

// const searchParams = { get: () => null };
// jest.mock('react-router-dom', () => ({
//   useSearchParams: () => [searchParams],
// }));

// describe('usePagination', () => {
//   const mockProductsPerPage = 10;
//   const mockProductsCount = 30;

//   beforeEach(() => {
//     jest.clearAllMocks();
//   });

//   test('should initialize with default values', () => {
//     const { result } = renderHook(() =>
//       usePagination({ productsPerPage: mockProductsPerPage, productsCount: mockProductsCount })
//     );

//     expect(result.current.totalPageCount).toBe(3);
//     expect(result.current.page).toBe(1);
//     expect(result.current.firstProductIndex).toBe(0);
//     expect(result.current.lastProductIndex).toBe(10);
//   });

//   test('should increment page on nextPage call', () => {
//     const { result } = renderHook(() =>
//       usePagination({ productsPerPage: mockProductsPerPage, productsCount: mockProductsCount })
//     );

//     act(() => {
//       result.current.nextPage();
//     });

//     expect(result.current.page).toBe(2);
//     expect(result.current.firstProductIndex).toBe(10);
//     expect(result.current.lastProductIndex).toBe(20);
//   });

//   test('should not increment page beyond totalPageCount', () => {
//     const { result } = renderHook(() =>
//       usePagination({ productsPerPage: mockProductsPerPage, productsCount: mockProductsCount })
//     );

//     act(() => {
//       result.current.nextPage();
//       result.current.nextPage();
//       result.current.nextPage(); // Trying to go beyond totalPageCount
//     });

//     expect(result.current.page).toBe(3); // Page should remain at the maximum value
//     expect(result.current.firstProductIndex).toBe(20);
//     expect(result.current.lastProductIndex).toBe(30);
//   });

//   test('should decrement page on prevPage call', () => {
//     const { result } = renderHook(() =>
//       usePagination({ productsPerPage: mockProductsPerPage, productsCount: mockProductsCount })
//     );

//     act(() => {
//       result.current.nextPage();
//       result.current.prevPage();
//     });

//     expect(result.current.page).toBe(1);
//     expect(result.current.firstProductIndex).toBe(0);
//     expect(result.current.lastProductIndex).toBe(10);
//   });

//   test('should not decrement page below 1', () => {
//     const { result } = renderHook(() =>
//       usePagination({ productsPerPage: mockProductsPerPage, productsCount: mockProductsCount })
//     );

//     act(() => {
//       result.current.prevPage(); // Trying to go below 1
//     });

//     expect(result.current.page).toBe(1); // Page should remain at the minimum value
//     expect(result.current.firstProductIndex).toBe(0);
//     expect(result.current.lastProductIndex).toBe(10);
//   });

//   test('should select page with selectPage call', () => {
//     const { result } = renderHook(() =>
//       usePagination({ productsPerPage: mockProductsPerPage, productsCount: mockProductsCount })
//     );

//     act(() => {
//       result.current.setPage(2);
//     });

//     expect(result.current.page).toBe(2);
//     expect(result.current.firstProductIndex).toBe(10);
//     expect(result.current.lastProductIndex).toBe(20);
//   });

//   test('should not select page beyond totalPageCount', () => {
//     const { result } = renderHook(() =>
//       usePagination({ productsPerPage: mockProductsPerPage, productsCount: mockProductsCount })
//     );

//     act(() => {
//       result.current.setPage(5); // Trying to select a page beyond totalPageCount
//     });

//     expect(result.current.page).toBe(3); // Page should remain at the maximum value
//     expect(result.current.firstProductIndex).toBe(20);
//     expect(result.current.lastProductIndex).toBe(30);
//   });

//   test('should not select page below 1', () => {
//     const { result } = renderHook(() =>
//       usePagination({ productsPerPage: mockProductsPerPage, productsCount: mockProductsCount })
//     );

//     act(() => {
//       result.current.setPage(0); // Trying to select a page below 1
//     });

//     expect(result.current.page).toBe(1); // Page should remain at the minimum value
//     expect(result.current.firstProductIndex).toBe(0);
//     expect(result.current.lastProductIndex).toBe(10);
//   });
// });

// import { renderHook, act } from '@testing-library/react-hooks';
import { useAppDispatch, useAppSelector } from './redux-hooks';
import { changePaginationPageAction } from '../store/catalog-data/catalog-data-slice';
import { getPaginationPage } from '../store/catalog-data/catalog-data-selectors';
import { usePagination } from './use-pagination';
import { act, renderHook } from '@testing-library/react';

jest.mock('./redux-hooks', () => ({
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
}));

jest.mock('../store/catalog-data/catalog-data-slice', () => ({
  changePaginationPageAction: jest.fn(),
}));

jest.mock('../store/catalog-data/catalog-data-selectors', () => ({
  getPaginationPage: jest.fn(),
}));

describe('usePagination', () => {
  const productsPerPage = 10;
  const productsCount = 25;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should calculate totalPageCount correctly', () => {
    const { result } = renderHook(() => usePagination({ productsPerPage, productsCount }));
    expect(result.current.totalPageCount).toBe(3);
  });

  test('should set firstProductIndex and lastProductIndex correctly', () => {
    useAppSelector.(2);
    const paginationPage = 2;

    const { result } = renderHook(() => usePagination({ productsPerPage, productsCount }));

    expect(result.current.firstProductIndex).toBe(11);
    expect(result.current.lastProductIndex).toBe(20);
  });

  test('should call changePaginationPageAction with correct pageNumber when selectPage is called', () => {
    // useAppSelector.mockReturnValueOnce(2); // Mock paginationPage

    const { result } = renderHook(() => usePagination({ productsPerPage, productsCount }));

    const dispatch = jest.fn();
    // useAppDispatch.mockReturnValue(dispatch);

    act(() => {
      result.current.setPage(5);
    });

    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith(changePaginationPageAction(5));
  });

  test('should call changePaginationPageAction with correct pageNumber when selectPage is called and pageNumber exceeds totalPageCount', () => {
    // useAppSelector.mockReturnValueOnce(2); // Mock paginationPage

    const { result } = renderHook(() => usePagination({ productsPerPage, productsCount }));

    const dispatch = jest.fn();
    // useAppDispatch.mockReturnValue(dispatch);

    act(() => {
      result.current.setPage(10);
    });

    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith(changePaginationPageAction(3)); // Maximum pageNumber should be set to totalPageCount
  });

  test('should call changePaginationPageAction with correct pageNumber when selectPage is called and pageNumber is less than 1', () => {
    // useAppSelector.mockReturnValueOnce(2); // Mock paginationPage

    const { result } = renderHook(() => usePagination({ productsPerPage, productsCount }));

    const dispatch = jest.fn();
    // useAppDispatch.mockReturnValue(dispatch);

    act(() => {
      result.current.setPage(-5);
    });

    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith(changePaginationPageAction(1)); // Minimum pageNumber should be set to 1
  });

  test('should call changePaginationPageAction with correct pageNumber when changePageWithDirection is called with true direction', () => {
    // useAppSelector.mockReturnValueOnce(2); // Mock paginationPage

    const { result } = renderHook(() => usePagination({ productsPerPage, productsCount }));

    const dispatch = jest.fn();
    // useAppDispatch.mockReturnValue(dispatch);

    act(() => {
      result.current.nextPage();
    });

    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith(changePaginationPageAction(3));
  });

  test('should call changePaginationPageAction with correct pageNumber when changePageWithDirection is called with false direction', () => {
    // useAppSelector.mockReturnValueOnce(2); // Mock paginationPage

    const { result } = renderHook(() => usePagination({ productsPerPage, productsCount }));

    const dispatch = jest.fn();
    // useAppDispatch.mockReturnValue(dispatch);

    act(() => {
      result.current.prevPage();
    });

    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith(changePaginationPageAction(1));
  });
});

