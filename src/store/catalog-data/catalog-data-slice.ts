import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ProductCard } from '../../types/product-card';
import { NameSpace } from '../../consts';
import { fetchProductsAction, fetchPromoProductAction, fetchReviewsByIdAction } from '../api-actions';
import { SelectedFilter } from '../../types/filters';
import { SortsType } from '../../types/sorts';
import { PromoProduct } from '../../types/promo';
import { Review } from '../../types/review';
import { getAverageRating } from '../../utils/utils';

type InitialState = {
  productCards: ProductCard[];
  selectedFilters: SelectedFilter[];
  filteredCards: ProductCard[];
  sorts: SortsType;
  promoProduct: PromoProduct | null;
  hasError: boolean;
  isLoading: boolean;
  allReviews: Record<number, Review[]>;
};

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
    sortType: '',
    sortOrder: '',
  },
  promoProduct: null,
  hasError: false,
  isLoading: false,
  allReviews: {},
};

export const sortProducts = (filteredProducts: ProductCard[], sorts: SortsType, allReviews: Record<number, Review[]>): ProductCard[] => {
  if (filteredProducts && sorts) {
    switch (sorts.sortType) {
      case 'sortPopular':
        if (sorts.sortOrder === 'up') {
          return filteredProducts.sort((cardA: ProductCard, cardB: ProductCard): number =>
            getAverageRating(allReviews[cardA.id], cardA.id) - getAverageRating(allReviews[cardB.id], cardB.id));
        }
        if (sorts.sortOrder === 'down') {
          return filteredProducts.sort((cardA: ProductCard, cardB: ProductCard): number =>
            getAverageRating(allReviews[cardB.id], cardB.id) - getAverageRating(allReviews[cardA.id], cardA.id));
        }
        break;

      case 'sortPrice':
        if (sorts.sortOrder === 'up') {
          return filteredProducts.sort((cardA: ProductCard, cardB: ProductCard): number => cardA.price - cardB.price);
        }
        if (sorts.sortOrder === 'down') {
          return filteredProducts.sort((cardA: ProductCard, cardB: ProductCard): number => cardB.price - cardA.price);
        }
        break;

      default:
        return filteredProducts;
    }
  }
  return filteredProducts;
};

export const filterProducts = (filters: SelectedFilter[], cards: ProductCard[]): ProductCard[] =>
  cards.filter((card) => filters.every((filter) => {
    switch (filter.filterType) {
      case 'price':
        if (filter.filterValue.from === null && filter.filterValue.to !== null) {
          return card.price <= filter.filterValue.to;
        }
        if (filter.filterValue.to === null && filter.filterValue.from !== null) {
          return card.price >= filter.filterValue.from;
        }
        if (filter.filterValue.from && filter.filterValue.to) {
          return card.price >= filter.filterValue.from && card.price <= filter.filterValue.to;
        }
        break;

      case 'category':
      case 'level':
      case 'type':
        if (filter.filterValue.length === 0) {
          return true;
        }
        if (filter.filterValue) {
          return filter.filterValue.includes(card[filter.filterType]);
        }
        return true;

      default:
        return true;
    }
    return true;
  }
  ));

export const catalogData = createSlice({
  name: NameSpace.CatalogData,
  initialState,
  reducers: {
    changeFiltersAction: (state, action: PayloadAction<SelectedFilter>) => {
      const filterIndex = state.selectedFilters.findIndex((filter) => filter.filterType === action.payload.filterType);
      state.selectedFilters[filterIndex] = action.payload;

      state.filteredCards = filterProducts(state.selectedFilters, state.productCards);
      state.filteredCards = sortProducts(state.filteredCards, state.sorts, state.allReviews);
    },
    resetFiltersAction: (state) => {
      state.selectedFilters = [
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
      ];
      state.filteredCards = state.productCards;
    },
    changeSortsAction: (state, action: PayloadAction<SortsType>) => {
      state.sorts = action.payload;

      if (action.payload.sortType !== '' && action.payload.sortOrder === '') {
        state.sorts.sortOrder = 'up';
      }

      if (action.payload.sortOrder !== '' && action.payload.sortType === '') {
        state.sorts.sortType = 'sortPrice';
      }

      const filteredProducts: ProductCard[] = filterProducts(state.selectedFilters, state.productCards);
      state.filteredCards = sortProducts(filteredProducts, action.payload, state.allReviews);
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchProductsAction.fulfilled, (state, action) => {
        state.productCards = action.payload;
        state.filteredCards = action.payload;
        state.hasError = false;
        state.isLoading = false;
      })
      .addCase(fetchProductsAction.rejected, (state) => {
        state.hasError = true;
        state.isLoading = false;
      })
      .addCase(fetchProductsAction.pending, (state) => {
        state.hasError = false;
        state.isLoading = true;
      })
      .addCase(fetchPromoProductAction.fulfilled, (state, action) => {
        state.promoProduct = action.payload;
      })
      .addCase(fetchReviewsByIdAction.fulfilled, (state, action) => {
        state.allReviews = action.payload;
      });
  },
});

export const { changeFiltersAction, resetFiltersAction, changeSortsAction } = catalogData.actions;
