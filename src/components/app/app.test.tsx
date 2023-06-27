import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import { AppRoute, NameSpace } from '../../consts';
import CatalogPage from '../../pages/catalog-page/catalog-page';
import ProductPage from '../../pages/product-page/product-page';
import BasketPage from '../../pages/basket-page/basket-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import { api } from '../../store';

const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore(middlewares);

describe('App component', () => {
  test('renders CatalogPage component when on the Catalog route', () => {
    render(
      <Provider store={mockStore({
        [NameSpace.CatalogData]: {
          filteredCards: [{
            name: 'Instaprinter P2',
            id: 1,
          },
          {
            name: 'Ретрокамера Dus Auge lV',
            id: 2,
          }],
          sorts: {
            sortType: 'sortPopular',
            sortOrder: 'up',
          },
          promoProduct: {
            name: 'Instaprinter P2',
            id: 1,
          },
          productCards: [{
            name: 'Instaprinter P2',
            id: 1,
          },
          {
            name: 'Ретрокамера Dus Auge lV',
            id: 2,
          }],
          selectedFilters: [
            {
              filterType: 'price',
              filterValue: {
                from: null,
                to: null,
              },
            },
            {
              filterType: 'level',
              filterValue: [],
            },
            {
              filterType: 'type',
              filterValue: [],
            },
            {
              filterType: 'category',
              filterValue: [],
            },
          ]
        }
      })}
      >
        <MemoryRouter initialEntries={[AppRoute.Catalog]}>
          <Routes>
            <Route path={AppRoute.Catalog} element={<CatalogPage />} />
            <Route path={AppRoute.Camera} element={<ProductPage />} />
            <Route path={AppRoute.Basket} element={<BasketPage />} />
            <Route path='*' element={<NotFoundPage />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Каталог фото- и видеотехники')).toBeInTheDocument();
  });

  test('renders ProductPage component when on the Camera route', () => {
    render(
      <Provider store={mockStore({
        [NameSpace.ProductData]: {
          selectedProduct: {
            name: 'Ретрокамера Dus Auge lV',
            vendorCode: 'DA4IU67AD5',
          },
          productReviews: [],
          similarProducts: [{
            name: 'Instaprinter P2',
            id: 546565686
          }],
        }
      })}
      >
        <MemoryRouter initialEntries={[AppRoute.Camera]}>
          <Routes>
            <Route path={AppRoute.Catalog} element={<CatalogPage />} />
            <Route path={AppRoute.Camera} element={<ProductPage />} />
            <Route path={AppRoute.Basket} element={<BasketPage />} />
            <Route path='*' element={<NotFoundPage />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('productTitle').innerHTML).toMatch('Ретрокамера Dus Auge lV');
  });

  test('renders BasketPage component when on the Basket route', () => {
    render(
      <Provider store={mockStore()}>
        <MemoryRouter initialEntries={[AppRoute.Basket]}>
          <Routes>
            <Route path={AppRoute.Catalog} element={<CatalogPage />} />
            <Route path={AppRoute.Camera} element={<ProductPage />} />
            <Route path={AppRoute.Basket} element={<BasketPage />} />
            <Route path='*' element={<NotFoundPage />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('!!!')).toBeInTheDocument();
  });

  test('renders NotFoundPage component when on an unknown route', () => {
    render(
      <Provider store={mockStore()}>
        <MemoryRouter initialEntries={['/unknown-route']}>
          <Routes >
            <Route path={AppRoute.Catalog} element={<CatalogPage />} />
            <Route path={AppRoute.Camera} element={<ProductPage />} />
            <Route path={AppRoute.Basket} element={<BasketPage />} />
            <Route path='*' element={<NotFoundPage />} />
          </Routes>
        </MemoryRouter >
      </Provider >
    );

    expect(screen.getByText('Страница не найдена')).toBeInTheDocument();
  });
});
