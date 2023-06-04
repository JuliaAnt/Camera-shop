import { createSlice } from '@reduxjs/toolkit';
import { Review } from '../../types/review';
import { NameSpace } from '../../consts';
import { fetchReviewsAction } from '../api-actions';

type InitialState = {
  productReviews: Review[];
}

const initialState: InitialState = {
  productReviews: [],
};

export const reviewData = createSlice({
  name: NameSpace.ReviewData,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchReviewsAction.fulfilled, (state, action) => {
        state.productReviews = action.payload;
      });
  },
});
