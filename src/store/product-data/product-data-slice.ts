import { createSlice } from '@reduxjs/toolkit';
import { Review } from '../../types/review';
import { NameSpace } from '../../consts';
import { fetchReviewsAction, fetchSelectedProductAction, fetchSimilarProductsAction } from '../api-actions';
import { ProductCard } from '../../types/product-card';

type InitialState = {
  productReviews: Review[];
  selectedProduct: ProductCard | null;
  similarProducts: ProductCard[];
  hasProductPageError: boolean;
}

const initialState: InitialState = {
  productReviews: [],
  selectedProduct: null,
  similarProducts: [],
  hasProductPageError: false,
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
      .addCase(fetchSelectedProductAction.rejected, (state) => {
        state.hasProductPageError = true;
      })
      .addCase(fetchSelectedProductAction.fulfilled, (state, action) => {
        state.selectedProduct = action.payload;
        state.hasProductPageError = false;
      })
      .addCase(fetchSimilarProductsAction.fulfilled, (state, action) => {
        state.similarProducts = action.payload;
      });
  },
});
