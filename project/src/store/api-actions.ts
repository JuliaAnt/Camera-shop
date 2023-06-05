import { createAsyncThunk } from '@reduxjs/toolkit';
import { ProductCard } from '../types/product-card';
import { AppDispatch, State } from '../types/state';
import { AxiosInstance } from 'axios';
import { APIRoute } from '../consts';
import { Review } from '../types/review';
import { PromoProduct } from '../types/promo';

export const fetchProductsAction = createAsyncThunk<ProductCard[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'fetchProducts',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<ProductCard[]>(APIRoute.Products);
    return data;
  }
);

export const fetchReviewsAction = createAsyncThunk<Review[], number, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'fetchReviews',
  async (cameraId, { extra: api }) => {
    const { data } = await api.get<Review[]>(`/cameras/${cameraId}/reviews`);
    return data;
  }
);

export const fetchPromoProductAction = createAsyncThunk<PromoProduct, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'fetchPromoProduct',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<PromoProduct>(APIRoute.PromoProduct);
    return data;
  }
);

export const fetchSelectedProductAction = createAsyncThunk<ProductCard, number, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'fetchSelectedProduct',
  async (cameraId, { extra: api }) => {
    const { data } = await api.get<ProductCard>(`/cameras/${cameraId}`);
    return data;
  }
);
