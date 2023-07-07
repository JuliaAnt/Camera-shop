import { SelectedFilter } from '../../types/filters';
import { ProductCard } from '../../types/product-card';
import { PromoProduct } from '../../types/promo';
import { SortsType } from '../../types/sorts';
import { look54Card, mockProductCards, mockPromoProduct, mockSelectedSorts, newMockSelectedFilters } from '../../mocks/mocks';
import { fetchProductsAction, fetchPromoProductAction } from '../api-actions';
import { catalogData, changeFiltersAction, changeSortsAction, resetFiltersAction } from './catalog-data-slice';
import { Review } from '../../types/review';

type InitialState = {
  productCards: ProductCard[];
  selectedFilters: SelectedFilter[];
  filteredCards: ProductCard[];
  sorts: SortsType;
  promoProduct: PromoProduct | null;
  hasError: boolean;
  isLoading: boolean;
  allReviews: Record<number, Review[]>;
}

const initialState: InitialState = {
  productCards: [],
  selectedFilters: [
    {
      filterType: 'price',
      filterValue: {
        from: null,
        to: null,
      },
    },
    {
      filterType: 'level',
      filterValue: [],
    },
    {
      filterType: 'type',
      filterValue: [],
    },
    {
      filterType: 'category',
      filterValue: '',
    },
  ],
  filteredCards: [],
  sorts: {
    sortType: 'sortPopular',
    sortOrder: 'up',
  },
  promoProduct: null,
  hasError: false,
  isLoading: false,
  allReviews: {},
};

describe('Reducer: catalog-data', () => {
  it('without additional parameters should return initial state', () => {
    expect(catalogData.reducer(void 0, { type: 'UNKNOWN_ACTION' }))
      .toEqual(initialState);
  });

  it('should change the selected filter', () => {
    const state = {
      productCards: mockProductCards,
      selectedFilters: initialState.selectedFilters,
      filteredCards: mockProductCards,
      sorts: initialState.sorts,
      promoProduct: null,
      hasError: false,
      isLoading: false,
      allReviews: {},
    };

    expect(catalogData.reducer(state, changeFiltersAction({
      filterType: 'level',
      filterValue: ['Профессиональный'],
    })))
      .toEqual({
        productCards: mockProductCards,
        selectedFilters: newMockSelectedFilters,
        filteredCards: [look54Card],
        sorts: initialState.sorts,
        promoProduct: null,
        hasError: false,
        isLoading: false,
        allReviews: {},
      });
  });

  it('should reset the selected filters', () => {
    const state = {
      productCards: mockProductCards,
      selectedFilters: newMockSelectedFilters,
      filteredCards: [look54Card],
      sorts: initialState.sorts,
      promoProduct: null,
      hasError: false,
      isLoading: false,
      allReviews: {},
    };

    expect(catalogData.reducer(state, resetFiltersAction()))
      .toEqual({
        productCards: mockProductCards,
        selectedFilters: initialState.selectedFilters,
        filteredCards: mockProductCards,
        sorts: initialState.sorts,
        promoProduct: null,
        hasError: false,
        isLoading: false,
        allReviews: {},
      });
  });

  it('should change the selected sorts', () => {
    const state = {
      productCards: mockProductCards,
      selectedFilters: initialState.selectedFilters,
      filteredCards: mockProductCards,
      sorts: initialState.sorts,
      promoProduct: null,
      hasError: false,
      isLoading: false,
      allReviews: {},
    };

    const sortedProducts = [...mockProductCards];

    expect(catalogData.reducer(state, changeSortsAction(mockSelectedSorts)))
      .toEqual({
        productCards: mockProductCards,
        selectedFilters: initialState.selectedFilters,
        filteredCards: sortedProducts.sort((cardA: ProductCard, cardB: ProductCard): number => cardB.price - cardA.price),
        sorts: mockSelectedSorts,
        promoProduct: null,
        hasError: false,
        isLoading: false,
        allReviews: {},
      });
  });

  it('should update products list by load products', () => {
    const state = initialState;
    expect(catalogData.reducer(state, { type: fetchProductsAction.fulfilled.type, payload: mockProductCards }))
      .toEqual({
        productCards: mockProductCards,
        selectedFilters: initialState.selectedFilters,
        filteredCards: mockProductCards,
        sorts: initialState.sorts,
        promoProduct: initialState.promoProduct,
        hasError: false,
        isLoading: false,
        allReviews: {},
      });
  });

  it('should update promo products by load promo product', () => {
    const state = initialState;
    expect(catalogData.reducer(state, { type: fetchPromoProductAction.fulfilled.type, payload: mockPromoProduct }))
      .toEqual({
        productCards: initialState.productCards,
        selectedFilters: initialState.selectedFilters,
        filteredCards: initialState.filteredCards,
        sorts: initialState.sorts,
        promoProduct: mockPromoProduct,
        hasError: false,
        isLoading: false,
        allReviews: {},
      });
  });
});
