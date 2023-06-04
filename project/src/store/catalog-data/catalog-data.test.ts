import { SelectedFilter } from '../../types/filters';
import { ProductCard } from '../../types/product-card';
import { PromoProduct } from '../../types/promo';
import { SortsType } from '../../types/sorts';
import { look54Card, mockProductCards, mockSelectedFilters, newMockSelectedFilters } from '../../utils/mocks';
import { catalogData, changeFiltersAction } from './catalog-data-slice';

type InitialState = {
  productCards: ProductCard[];
  selectedFilters: SelectedFilter[];
  filteredCards: ProductCard[];
  sorts: SortsType;
  promoProduct: PromoProduct | null;
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
      filterValue: [],
    },
  ],
  filteredCards: [],
  sorts: {
    sortType: 'sortPopular',
    sortOrder: 'up',
  },
  promoProduct: null,
};

describe('Reducer: catalog-data', () => {
  it('without additional parameters should return initial state', () => {
    expect(catalogData.reducer(void 0, { type: 'UNKNOWN_ACTION' }))
      .toEqual(initialState);
  });

  it('should change the selected filter', () => {
    const state = {
      productCards: mockProductCards,
      selectedFilters: mockSelectedFilters,
      filteredCards: [],
      sorts: {
        sortType: 'sortPopular',
        sortOrder: 'up',
      },
      promoProduct: null,
    };

    expect(catalogData.reducer(state, changeFiltersAction({
      filterType: 'level',
      filterValue: ['Профессиональный'],
    })))
      .toEqual({
        productCards: mockProductCards,
        selectedFilters: newMockSelectedFilters,
        filteredCards: [look54Card],
      });
  });
});
