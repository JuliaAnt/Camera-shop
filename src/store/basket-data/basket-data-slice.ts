import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../consts';
import { fetchDiscontAction } from '../api-actions';

type InitialState = {
  productsInBasket: Record<number, number>;
  discont: number;
}

const initialState: InitialState = {
  productsInBasket: {},
  discont: 0,
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
    },
    increaseAmountProduct: (state, action: PayloadAction<number>) => {
      state.productsInBasket[action.payload] += 1;
    },
    decreaseAmountProduct: (state, action: PayloadAction<number>) => {
      state.productsInBasket[action.payload] -= 1;
    },
    changeAmountProduct: (state, action: PayloadAction<{ id: number; amount: number }>) => {
      state.productsInBasket[action.payload.id] = action.payload.amount;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchDiscontAction.fulfilled, (state, action) => {
        state.discont = action.payload;
      });
  },
});

export const { addProductsToBasket, removeProductsFromBasket, increaseAmountProduct, decreaseAmountProduct, changeAmountProduct } = basketData.actions;
