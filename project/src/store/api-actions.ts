import { createAsyncThunk } from '@reduxjs/toolkit';
import { ProductCard } from '../types/product-card';
import { AppDispatch, State } from '../types/state';
import { AxiosInstance } from 'axios';
import { APIRoute } from '../consts';

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
