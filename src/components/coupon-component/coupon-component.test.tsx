import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import CouponComponent from './coupon-component';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { NameSpace } from '../../consts';
// import thunk from 'redux-thunk';
// import { api } from '../../store';

// const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore();

describe('CouponComponent', () => {
  it('should render the component correctly', () => {
    render(
      <Provider store={mockStore({
        [NameSpace.BasketData]: {
          submittedCoupon: {
            coupon: '',
          },
          productsInBasket: {},
        },
      })}
      >
        <CouponComponent />
      </Provider>
    );

    expect(screen.getByText('Если у вас есть промокод на скидку, примените его в этом поле')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Введите промокод')).toBeInTheDocument();
    expect(screen.getByText('Применить')).toBeInTheDocument();
  });

  it('should disable the input and button when a coupon is submitted', () => {
    render(
      <Provider store={mockStore({
        [NameSpace.BasketData]: {
          submittedCoupon: {
            coupon: 'camers-333',
          },
          productsInBasket: {},
          discont: 15,
        },
      })}
      >
        <CouponComponent />
      </Provider >
    );

    const couponInput = screen.getByTestId('basket-promo');
    const applyButton = screen.getByTestId('promo-button');

    expect(couponInput).toBeDisabled();
    expect(applyButton).toBeDisabled();
  });
});
