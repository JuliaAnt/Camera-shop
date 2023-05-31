import { createSlice } from '@reduxjs/toolkit';
import { ProductCard } from '../../types/product-card';
import { NameSpace } from '../../consts';
import { fetchProductsAction } from '../api-actions';

type InitialState = {
  productCards: ProductCard[];
}

const initialState: InitialState = {
  productCards: [],
};

export const catalogData = createSlice({
  name: NameSpace.CatalogData,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchProductsAction.fulfilled, (state, action) => {
        state.productCards = action.payload;
      });
  },
});
