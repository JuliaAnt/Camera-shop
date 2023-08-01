import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import CouponComponent from './coupon-component';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { NameSpace } from '../../consts';

const mockStore = configureMockStore();

describe('CouponComponent', () => {
  it('should render the component correctly', async () => {
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

    const couponInput = await screen.findByTestId('basket-promo');
    const applyButton = await screen.findByTestId('promo-button');
    const title = await screen.findByText('Если у вас есть промокод на скидку, примените его в этом поле');

    expect(title).toBeInTheDocument();
    expect(couponInput).toBeInTheDocument();
    expect(applyButton).toBeInTheDocument();
  });

  it('should disable the input and button when a coupon is submitted', async () => {
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

    const couponInput = await screen.findByTestId('basket-promo');
    const applyButton = await screen.findByTestId('promo-button');

    expect(couponInput).toBeDisabled();
    expect(applyButton).toBeDisabled();
  });
});
