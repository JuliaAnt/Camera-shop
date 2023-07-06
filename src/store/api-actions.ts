import { createAsyncThunk } from '@reduxjs/toolkit';
import { ProductCard } from '../types/product-card';
import { AppDispatch, State } from '../types/state';
import { AxiosInstance, AxiosResponse } from 'axios';
import { APIRoute } from '../consts';
import { Review, ReviewRequest } from '../types/review';
import { PromoProduct } from '../types/promo';

export const fetchProductsAction = createAsyncThunk<ProductCard[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'fetchProducts',
  async (_arg, { dispatch, extra: api }) => {
    const { data } = await api.get<ProductCard[]>(APIRoute.Products);
    dispatch(fetchReviewsByIdAction(data.map((product) => product.id)));
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

export const fetchSimilarProductsAction = createAsyncThunk<ProductCard[], number, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'fetchSimilarProducts',
  async (cameraId, { extra: api }) => {
    const { data } = await api.get<ProductCard[]>(`/cameras/${cameraId}/similar`);
    return data;
  }
);

type SendReviewProps = ReviewRequest & { onSuccess(): void; onError(): void };

export const sendReviewAction = createAsyncThunk<void, SendReviewProps, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'sendReview',
  async ({ cameraId, userName, advantage, disadvantage, review, rating, onSuccess, onError }, { extra: api }) => {
    try {
      await api.post<ReviewRequest>(APIRoute.ReviewRequest, { cameraId, userName, advantage, disadvantage, review, rating });
      onSuccess();
    }
    catch (error) {
      onError();
    }
  }
);

type fetchReviewsByIdProps = Record<number, Review[]>;

export const fetchReviewsByIdAction = createAsyncThunk<fetchReviewsByIdProps, number[], {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'fetchReviewsById',
  async (cameraIdList, { extra: api }) => {
    const requests = cameraIdList.map((id) => api.get<Review[]>(`/cameras/${id}/reviews`));
    const data = await Promise.all(requests);
    const reviewMap: Record<number, Review[]> = {};
    data.forEach((response: AxiosResponse<Review[]>) => {
      reviewMap[response.data[0].cameraId] = response.data;
    });
    return reviewMap;
  }
);
