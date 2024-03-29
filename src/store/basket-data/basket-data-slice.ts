import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../consts';
import { fetchDiscontAction } from '../api-actions';
import { Coupon } from '../../types/coupon';

type InitialState = {
  productsInBasket: Record<number, number>;
  discont: number | undefined;
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

export const basketData = createSlice({
  name: NameSpace.BasketData,
  initialState,
  reducers: {
    addProductsToBasket: (state, action: PayloadAction<number>) => {
      if (state.productsInBasket[action.payload]) {
        state.productsInBasket[action.payload] += 1;
      } else {
        state.productsInBasket[action.payload] = 1;
      }
    },
    removeProductsFromBasket: (state, action: PayloadAction<number>) => {
      state.productsInBasket[action.payload] = 0;
      const totalAmount = Object.values(state.productsInBasket).reduce((sum, amount) => sum + +amount, 0);
      if (totalAmount === 0) {
        state.discont = 0;
        state.submittedCoupon = { coupon: '' };
      }
    },
    increaseProductAmount: (state, action: PayloadAction<number>) => {
      state.productsInBasket[action.payload] += 1;
    },
    decreaseProductAmount: (state, action: PayloadAction<number>) => {
      state.productsInBasket[action.payload] -= 1;
    },
    changeProductAmount: (state, action: PayloadAction<{ id: number; amount: number }>) => {
      state.productsInBasket[action.payload.id] = action.payload.amount;
    },
    addCoupon: (state, action: PayloadAction<Coupon>) => {
      state.submittedCoupon = action.payload;
    },
    resetBasket: (state) => {
      state.productsInBasket = {};
      state.submittedCoupon = { coupon: '' };
      state.discont = 0;
    },
    addError: (state, action: PayloadAction<boolean>) => {
      state.hasOrderError = action.payload;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchDiscontAction.fulfilled, (state, action) => {
        state.discont = action.payload;
      });
  },
});

export const { addProductsToBasket, removeProductsFromBasket, increaseProductAmount, decreaseProductAmount, changeProductAmount, addCoupon, resetBasket, addError } = basketData.actions;
