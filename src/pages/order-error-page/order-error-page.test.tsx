import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import OrderErrorPage from './order-error-page';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { NameSpace } from '../../consts';

const mockStore = configureMockStore();

describe('Component: OrderErrorPage', () => {
  it('should render correctly', () => {
    render(
      <React.StrictMode>
        <Provider store={mockStore({
          [NameSpace.BasketData]: {
            productsInBasket: {},
          },
        })}
        >
          <BrowserRouter>
            <OrderErrorPage />
          </ BrowserRouter>
        </Provider>
      </ React.StrictMode>
    );

    const headerElement = screen.getByText('Не удалось оформить заказ!');
    const linkElement = screen.getByText('Вернуться в корзину');

    expect(headerElement).toBeInTheDocument();
    expect(linkElement).toBeInTheDocument();
  });
});
