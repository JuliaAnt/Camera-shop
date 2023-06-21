import { createApi } from '../services/api';
import MockAdapter from 'axios-mock-adapter';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { State } from '../types/state';
import { Action } from 'redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { APIRoute } from '../consts';
import { look54Card, mockProductCards, mockPromoProduct, mockReview, mockReviews } from '../utils/mocks';
import { fetchProductsAction, fetchPromoProductAction, fetchReviewsAction, fetchSelectedProductAction, fetchSimilarProductsAction, sendReviewAction } from './api-actions';

describe('Async actions', () => {
  const api = createApi();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
    State,
    Action<string>,
    ThunkDispatch<State, typeof api, Action>
  >(middlewares);

  it('should dispatch Load_Products when GET /cameras', async () => {
    mockAPI
      .onGet(APIRoute.Products)
      .reply(200, mockProductCards);

    const store = mockStore();

    await store.dispatch(fetchProductsAction());

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      fetchProductsAction.pending.type,
      fetchProductsAction.fulfilled.type
    ]);
  });

  it('should dispatch Load_Reviews when GET /cameras/{cameraId}/reviews', async () => {
    const cameraId = 1;
    mockAPI
      .onGet(`/cameras/${cameraId}/reviews`)
      .reply(200, mockReviews);

    const store = mockStore();

    await store.dispatch(fetchReviewsAction(cameraId));

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      fetchReviewsAction.pending.type,
      fetchReviewsAction.fulfilled.type
    ]);
  });


  it('should dispatch Load_Selected_Product when GET /cameras/{cameraId}', async () => {
    const cameraId = 7;
    mockAPI
      .onGet(`/cameras/${cameraId}`)
      .reply(200, look54Card);

    const store = mockStore();

    await store.dispatch(fetchSelectedProductAction(cameraId));

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      fetchSelectedProductAction.pending.type,
      fetchSelectedProductAction.fulfilled.type
    ]);
  });

  it('should dispatch Load_Promo_Product when GET /promo', async () => {
    mockAPI
      .onGet(APIRoute.PromoProduct)
      .reply(200, mockPromoProduct);

    const store = mockStore();

    await store.dispatch(fetchPromoProductAction());

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      fetchPromoProductAction.pending.type,
      fetchPromoProductAction.fulfilled.type
    ]);
  });

  it('should dispatch Load_Similar_Products when GET /cameras/{cameraId}/similar', async () => {
    const cameraId = 1;
    mockAPI
      .onGet(`/cameras/${cameraId}/similar`)
      .reply(200, mockProductCards);

    const store = mockStore();

    await store.dispatch(fetchSimilarProductsAction(cameraId));

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      fetchSimilarProductsAction.pending.type,
      fetchSimilarProductsAction.fulfilled.type
    ]);
  });

  it('should dispatch Send_Review when POST /reviews', async () => {
    const onSuccessMock = jest.fn();
    // eslint-disable-next-line no-console
    const onError = () => console.log('222');
    mockAPI
      .onPost('/reviews')
      .reply(200, mockReviews[0]);

    const store = mockStore();

    await store.dispatch(sendReviewAction({ ...mockReview, onSuccess: onSuccessMock, onError }));

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      sendReviewAction.pending.type,
      sendReviewAction.fulfilled.type
    ]);

    expect(onSuccessMock).toHaveBeenCalledWith();

  });
});
