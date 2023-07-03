import { ProductCard } from '../../types/product-card';
import { Review } from '../../types/review';
import { look54Card, mockProductCards, mockReviews } from '../../mocks/mocks';
import { fetchReviewsAction, fetchSelectedProductAction, fetchSimilarProductsAction } from '../api-actions';
import { productData } from './product-data-slice';

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

describe('Reducer: product-data', () => {
  it('without additional parameters should return initial state', () => {
    expect(productData.reducer(void 0, { type: 'UNKNOWN_ACTION' }))
      .toEqual(initialState);
  });

  it('should update review list by load reviews', () => {
    const state = initialState;
    expect(productData.reducer(state, { type: fetchReviewsAction.fulfilled.type, payload: mockReviews }))
      .toEqual({
        productReviews: mockReviews,
        selectedProduct: initialState.selectedProduct,
        similarProducts: initialState.similarProducts,
        hasProductPageError: false,
      });
  });

  it('should update selected product by load selected product', () => {
    const state = initialState;
    expect(productData.reducer(state, { type: fetchSelectedProductAction.fulfilled.type, payload: look54Card }))
      .toEqual({
        productReviews: initialState.productReviews,
        selectedProduct: look54Card,
        similarProducts: initialState.similarProducts,
        hasProductPageError: false,
      });
  });

  it('should update similar products by load similar products', () => {
    const state = initialState;
    expect(productData.reducer(state, { type: fetchSimilarProductsAction.fulfilled.type, payload: mockProductCards }))
      .toEqual({
        productReviews: initialState.productReviews,
        selectedProduct: initialState.selectedProduct,
        similarProducts: mockProductCards,
        hasProductPageError: false,
      });
  });
});
