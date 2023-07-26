import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../consts';

type InitialState = {
  productsInBasket: Record<number, number>;
}

const initialState: InitialState = {
  productsInBasket: {},
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
    }
  }
});

export const { addProductsToBasket, removeProductsFromBasket } = basketData.actions;
