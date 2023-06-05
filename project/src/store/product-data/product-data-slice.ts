import { createSlice } from '@reduxjs/toolkit';
import { Review } from '../../types/review';
import { NameSpace } from '../../consts';
import { fetchReviewsAction, fetchSelectedProductAction } from '../api-actions';
import { ProductCard } from '../../types/product-card';

type InitialState = {
  productReviews: Review[];
  selectedProduct: ProductCard | null;
}

const initialState: InitialState = {
  productReviews: [],
  selectedProduct: null,
};

export const productData = createSlice({
  name: NameSpace.ProductData,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchReviewsAction.fulfilled, (state, action) => {
        state.productReviews = action.payload;
      })
      .addCase(fetchSelectedProductAction.fulfilled, (state, action) => {
        state.selectedProduct = action.payload;
      });
  },
});
