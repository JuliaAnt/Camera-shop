import { changePageAction } from '../store/catalog-data/catalog-data-slice';
import { usePagination } from './use-pagination';
import { act, renderHook } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { PropsWithChildren } from 'react';
import { NameSpace } from '../consts';

jest.mock('../store/catalog-data/catalog-data-slice', () => ({
  changePageAction: jest.fn()
}));

const mockStore = configureMockStore();

describe('usePagination', () => {
  const productsPerPage = 9;
  const productsCount = 25;

  beforeEach(() => {
    jest.clearAllMocks();
  });


  test('should calculate totalPageCount correctly', () => {
    const wrapper = ({ children }: PropsWithChildren) => (
      <Provider store={mockStore({
        [NameSpace.CatalogData]: {
          page: 2,
        }
      })}
      > {children}
      </Provider>
    );

    const { result } = renderHook(() => usePagination({ productsPerPage, productsCount }), { wrapper });
    expect(result.current.totalPageCount).toBe(3);
  });

  test('should set firstProductIndex and lastProductIndex correctly', () => {
    const wrapper = ({ children }: PropsWithChildren) => (
      <Provider store={mockStore({
        [NameSpace.CatalogData]: {
          page: 2,
        }
      })}
      > {children}
      </Provider>
    );

    const { result } = renderHook(() => usePagination({ productsPerPage, productsCount }), { wrapper });

    expect(result.current.firstProductIndex).toBe(9);
    expect(result.current.lastProductIndex).toBe(18);
  });

  test('should call changePageAction with correct pageNumber when selectPage is called', () => {
    (changePageAction as unknown as jest.Mock).mockImplementation(() => ({ type: 'TEST' }));

    const wrapper = ({ children }: PropsWithChildren) => (
      <Provider store={mockStore({
        [NameSpace.CatalogData]: {
          page: 2,
        }
      })}
      > {children}
      </Provider>
    );

    const { result } = renderHook(() => usePagination({ productsPerPage, productsCount }), { wrapper });

    act(() => {
      result.current.setPage(2);
    });

    expect(changePageAction).toHaveBeenCalledWith(2);
  });

  test('should call changePageAction with correct pageNumber when selectPage is called and pageNumber exceeds totalPageCount', () => {
    (changePageAction as unknown as jest.Mock).mockImplementation(() => ({ type: 'TEST' }));

    const wrapper = ({ children }: PropsWithChildren) => (
      <Provider store={mockStore({
        [NameSpace.CatalogData]: {
          page: 2,
        }
      })}
      > {children}
      </Provider>
    );

    const { result } = renderHook(() => usePagination({ productsPerPage, productsCount }), { wrapper });

    act(() => {
      result.current.setPage(10);
    });

    expect(changePageAction).toHaveBeenCalledWith(3);
  });

  test('should call changePageAction with correct pageNumber when selectPage is called and pageNumber is less than 1', () => {
    (changePageAction as unknown as jest.Mock).mockImplementation(() => ({ type: 'TEST' }));

    const wrapper = ({ children }: PropsWithChildren) => (
      <Provider store={mockStore({
        [NameSpace.CatalogData]: {
          page: 2,
        }
      })}
      > {children}
      </Provider>
    );

    const { result } = renderHook(() => usePagination({ productsPerPage, productsCount }), { wrapper });

    act(() => {
      result.current.setPage(-5);
    });

    expect(changePageAction).toHaveBeenCalledTimes(1);
    expect(changePageAction).toHaveBeenCalledWith(1);
  });

  test('should call changePageAction with correct pageNumber when changePageWithDirection is called with true direction', () => {
    (changePageAction as unknown as jest.Mock).mockImplementation(() => ({ type: 'TEST' }));

    const wrapper = ({ children }: PropsWithChildren) => (
      <Provider store={mockStore({
        [NameSpace.CatalogData]: {
          page: 2,
        }
      })}
      > {children}
      </Provider>
    );

    const { result } = renderHook(() => usePagination({ productsPerPage, productsCount }), { wrapper });

    act(() => {
      result.current.nextPage();
    });

    expect(changePageAction).toHaveBeenCalledTimes(1);
    expect(changePageAction).toHaveBeenCalledWith(3);
  });

  test('should call changePageAction with correct pageNumber when changePageWithDirection is called with false direction', () => {
    (changePageAction as unknown as jest.Mock).mockImplementation(() => ({ type: 'TEST' }));

    const wrapper = ({ children }: PropsWithChildren) => (
      <Provider store={mockStore({
        [NameSpace.CatalogData]: {
          page: 2,
        }
      })}
      > {children}
      </Provider>
    );

    const { result } = renderHook(() => usePagination({ productsPerPage, productsCount }), { wrapper });

    act(() => {
      result.current.prevPage();
    });

    expect(changePageAction).toHaveBeenCalledTimes(1);
    expect(changePageAction).toHaveBeenCalledWith(1);
  });
});

