import { Coupon } from '../../types/coupon';
import { fetchDiscontAction } from '../api-actions';
import { addCoupon, addError, addProductsToBasket, basketData, changeProductAmount, decreaseProductAmount, increaseProductAmount, removeProductsFromBasket, resetBasket } from './basket-data-slice';

type InitialState = {
  productsInBasket: Record<number, number>;
  discont: number;
  submittedCoupon: Coupon;
  hasOrderError: boolean;
}

const initialState: InitialState = {
  productsInBasket: {},
  discont: 0,
  submittedCoupon: {
    coupon: '',
  },
  hasOrderError: false,
};

describe('Reducer: basket-data', () => {

  it('should add the product in Basket', () => {
    const state = initialState;

    expect(basketData.reducer(state, addProductsToBasket(1))).toEqual(
      expect.objectContaining({
        productsInBasket: { 1: 1 },
      }));
  });

  it('should remove the product from Basket', () => {
    const state = { ...initialState, productsInBasket: { 1: 2, 2: 2 } };

    expect(basketData.reducer(state, removeProductsFromBasket(2))).toEqual(
      expect.objectContaining({
        productsInBasket: { 1: 2, 2: 0 },
      }));
  });

  it('should increase amount of product in Basket', () => {
    const state = { ...initialState, productsInBasket: { 1: 2, 2: 2 } };

    expect(basketData.reducer(state, increaseProductAmount(2))).toEqual(
      expect.objectContaining({
        productsInBasket: { 1: 2, 2: 3 },
      }));
  });

  it('should decrease amount of product in Basket', () => {
    const state = { ...initialState, productsInBasket: { 1: 2, 2: 2 } };

    expect(basketData.reducer(state, decreaseProductAmount(2))).toEqual(
      expect.objectContaining({
        productsInBasket: { 1: 2, 2: 1 },
      }));
  });

  it('should change amount of product in Basket', () => {
    const state = { ...initialState, productsInBasket: { 1: 2, 2: 2 } };

    expect(basketData.reducer(state, changeProductAmount({ id: 1, amount: 10 }))).toEqual(
      expect.objectContaining({
        productsInBasket: { 1: 10, 2: 2 },
      }));
  });

  it('should add the coupon', () => {
    const state = initialState;

    expect(basketData.reducer(state, addCoupon({ coupon: 'camera-333' }))).toEqual(
      expect.objectContaining({
        submittedCoupon: {
          coupon: 'camera-333',
        },
      }));
  });

  it('should add error', () => {
    const state = initialState;

    expect(basketData.reducer(state, addError(true))).toEqual(
      expect.objectContaining({
        hasOrderError: true,
      }));
  });

  it('should reset the Basket', () => {
    const state = {
      productsInBasket: { 1: 1, 2: 1 },
      discont: 15,
      submittedCoupon: {
        coupon: 'camera-333',
      },
      hasOrderError: false,
    };

    expect(basketData.reducer(state, resetBasket())).toEqual(
      expect.objectContaining({
        productsInBasket: {},
        discont: 0,
        submittedCoupon: {
          coupon: '',
        },
      }));
  });

  it('should update discont', () => {
    const state = initialState;
    expect(basketData.reducer(state, { type: fetchDiscontAction.fulfilled.type, payload: 15 })).toEqual(
      expect.objectContaining({
        discont: 15,
      })
    );
  });
});
