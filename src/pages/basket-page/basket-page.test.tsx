import { BrowserRouter } from 'react-router-dom';
import BasketPage from './basket-page';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { NameSpace } from '../../consts';
import { render, screen } from '@testing-library/react';
import { mockProductCards } from '../../mocks/mocks';

const mockStore = configureMockStore();

describe('Component: CatalogPage', () => {
  it('should render correctly', () => {
    render(
      <Provider store={mockStore({
        [NameSpace.BasketData]: {
          productsInBasket: { 6: 1 },
          discont: 0,
          submittedCoupon: {
            coupon: 'camera-333',
          },
          hasOrderError: false,
        },
        [NameSpace.CatalogData]: {
          productCards: mockProductCards,
        }
      })}
      >
        <BrowserRouter>
          <BasketPage />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByTestId('cardTitle-6').innerHTML).toMatch('Click Sap');
    expect(screen.getByText(/Всего/i)).toBeInTheDocument();
    expect(screen.getByTestId('promo-form')).toBeInTheDocument();
    expect(screen.getByTestId('promo-button')).toBeInTheDocument();
    expect(screen.getByTestId('basket-promo')).toBeInTheDocument();
  });
});
