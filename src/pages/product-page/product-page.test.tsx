import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import ProductPage from './product-page';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { NameSpace } from '../../consts';
import { mockAllReviews, mockProductCards } from '../../mocks/mocks';

const mockStore = configureMockStore();

describe('Component: ProductPage', () => {
  it('should render correctly', () => {

    render(
      <React.StrictMode>
        <Provider store={
          mockStore({
            [NameSpace.ProductData]: {
              productCards: [],
              selectedProduct: {
                id: 7,
                name: 'Look 54',
                vendorCode: 'NB54Y',
              },
              productReviews: [],
              similarProducts: [{
                name: 'Instaprinter P2',
                id: 546565686
              }],
              allReviews: mockAllReviews,
              hasError: false,
            },
            [NameSpace.CatalogData]: {
              productCards: mockProductCards,
            }
          })
        }
        >
          <BrowserRouter>
            <ProductPage />
          </ BrowserRouter>
        </Provider>
      </ React.StrictMode >
    );

    expect(screen.getByTestId('productTitle').innerHTML).toMatch('Look 54');
    expect(screen.getByText('Характеристики')).toBeInTheDocument();
    expect(screen.getByText('Описание')).toBeInTheDocument();
    expect(screen.getByText('NB54Y')).toBeInTheDocument();
    expect(screen.getByText(/Похожие товары/i)).toBeInTheDocument();
    expect(screen.getByText(/Отзывы/i)).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
    expect(screen.getByTestId('header')).toBeInTheDocument();
  });
});
