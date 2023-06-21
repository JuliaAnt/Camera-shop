import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import ProductPage from './product-page';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { NameSpace } from '../../consts';

const mockStore = configureMockStore();

describe('Component: ProductPage', () => {
  it('should render correctly', () => {

    render(
      <React.StrictMode>
        <Provider store={mockStore({
          [NameSpace.ProductData]: {
            selectedProduct: {
              name: 'Ретрокамера Dus Auge lV',
              vendorCode: 'DA4IU67AD5',
            },
            productReviews: [],
            similarProducts: [{
              name: 'Instaprinter P2',
            }],
          }
        })}
        >
          <BrowserRouter>
            <ProductPage />
          </ BrowserRouter>
        </Provider>
      </ React.StrictMode >
    );

    expect(screen.getByTestId('productTitle').innerHTML).toMatch('Ретрокамера Dus Auge lV');
    expect(screen.getByText('Характеристики')).toBeInTheDocument();
    expect(screen.getByText('Описание')).toBeInTheDocument();
    expect(screen.getByText('DA4IU67AD5')).toBeInTheDocument();
    expect(screen.getByText(/Похожие товары/i)).toBeInTheDocument();
    expect(screen.getByText(/Отзывы/i)).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
    expect(screen.getByTestId('header')).toBeInTheDocument();
  });
});
