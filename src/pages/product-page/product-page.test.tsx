import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import ProductPage from './product-page';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { NameSpace } from '../../consts';
import { look54Card, mockAllReviews, mockProductCards } from '../../mocks/mocks';

const mockStore = configureMockStore();

describe('Component: ProductPage', () => {
  it('should render correctly', () => {

    render(
      <React.StrictMode>
        <Provider store={
          mockStore({
            [NameSpace.ProductData]: {
              selectedProduct: look54Card,
              productReviews: [],
              similarProducts: [{
                name: 'Instaprinter P2',
                id: 546565686
              }],

            },
            [NameSpace.CatalogData]: {
              productCards: mockProductCards,
              allReviews: mockAllReviews,
              hasError: false,
            }
          })
        }
        >
          <MemoryRouter initialEntries={['/camera/7?tab=description']}>
            <ProductPage />
          </ MemoryRouter>
        </Provider>
      </ React.StrictMode >
    );

    expect(screen.getByTestId('productTitle').innerHTML).toMatch('Look 54');
    expect(screen.getByText('Характеристики')).toBeInTheDocument();
    expect(screen.getByText('Описание')).toBeInTheDocument();
    expect(screen.getByText('fakeDescription')).toBeInTheDocument();
    expect(screen.getByText(/Похожие товары/i)).toBeInTheDocument();
    expect(screen.getByText(/Отзывы/i)).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
    expect(screen.getByTestId('header')).toBeInTheDocument();
  });
});
