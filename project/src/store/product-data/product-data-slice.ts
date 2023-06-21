import { createSlice } from '@reduxjs/toolkit';
import { Review } from '../../types/review';
import { NameSpace } from '../../consts';
import { fetchReviewsAction, fetchSelectedProductAction, fetchSimilarProductsAction } from '../api-actions';
import { ProductCard } from '../../types/product-card';

type InitialState = {
  productReviews: Review[];
  selectedProduct: ProductCard | null;
  similarProducts: ProductCard[];
}

const initialState: InitialState = {
  productReviews: [],
  selectedProduct: null,
  similarProducts: [],
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
      })
      .addCase(fetchSimilarProductsAction.fulfilled, (state, action) => {
        state.similarProducts = action.payload;
      });
  },
});
