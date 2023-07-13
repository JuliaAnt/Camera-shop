import { LevelFilterState } from '../components/filters/level-filter/level-filter';
import { TypeFilterState } from '../components/filters/type-filter/type-filter';
import { PriceFilterState, SelectedFilter } from '../types/filters';
import { ProductCard } from '../types/product-card';
import { Review } from '../types/review';

export const getAverageRating = (reviews: Review[], id: number) => {
  const sum = reviews
    ?.filter((review) => review.cameraId === id)
    .map((review) => review.rating)
    .reduce((a, b) => a + b, 0);

  return Math.ceil(sum / reviews?.length);
};

export const getMaxMinPrice = (filteredProducts: ProductCard[]): { max: number; min: number } => {
  if (!filteredProducts?.length) {
    return {
      max: 0,
      min: 0,
    };
  }

  const initialPrice = filteredProducts[0].price;

  const priceRange = {
    max: initialPrice,
    min: initialPrice,
  };

  filteredProducts.forEach((product) => {
    const price = product.price;
    if (price > priceRange.max) {
      priceRange.max = price;
    }
    if (price < priceRange.min) {
      priceRange.min = price;
    }
  });

  return priceRange;
};

export const isSameArrays = (array1: string[], array2: string[]): boolean => {
  const sortedArray1 = array1.sort();
  const sortedArray2 = array2.sort();
  return Boolean(JSON.stringify(sortedArray1) === JSON.stringify(sortedArray2));
};

export const equalFilters = (selectedFiltersFromState: SelectedFilter[], selectedFiltersFromUrl: SelectedFilter[]) => {
  const typeFilterFromState = selectedFiltersFromState.find((filter) => filter.filterType === 'type');
  const typeFilterFromUrl = selectedFiltersFromUrl.find((filter) => filter.filterType === 'type');
  if (!isSameArrays(typeFilterFromState?.filterValue as string[], typeFilterFromUrl?.filterValue as string[])) {
    return false;
  }

  const levelFilterFromState = selectedFiltersFromState.find((filter) => filter.filterType === 'level');
  const levelFilterFromUrl = selectedFiltersFromUrl.find((filter) => filter.filterType === 'level');
  if (!isSameArrays(levelFilterFromState?.filterValue as string[], levelFilterFromUrl?.filterValue as string[])) {
    return false;
  }

  const categoryFilterFromState = selectedFiltersFromState.find((filter) => filter.filterType === 'category');
  const categoryFilterFromUrl = selectedFiltersFromUrl.find((filter) => filter.filterType === 'category');
  if (categoryFilterFromState?.filterValue as string !== categoryFilterFromUrl?.filterValue as string) {
    return false;
  }

  const priceFilterFromState = selectedFiltersFromState.find((filter) => filter.filterType === 'price') as PriceFilterState;
  const priceFilterFromUrl = selectedFiltersFromUrl.find((filter) => filter.filterType === 'price') as PriceFilterState;
  if (priceFilterFromState?.filterValue.from !== priceFilterFromUrl?.filterValue.from) {
    return false;
  }
  if (priceFilterFromState?.filterValue.to !== priceFilterFromUrl?.filterValue.to) {
    return false;
  }

  return true;
};

export const checkEmptyFilters = (selectedFiltersFromState: SelectedFilter[]) => {
  const typeFilterFromState = selectedFiltersFromState.find((filter) => filter.filterType === 'type') as TypeFilterState;
  if (typeFilterFromState?.filterValue.length) {
    return false;
  }

  const levelFilterFromState = selectedFiltersFromState.find((filter) => filter.filterType === 'level') as LevelFilterState;
  if (levelFilterFromState?.filterValue.length) {
    return false;
  }

  const categoryFilterFromState = selectedFiltersFromState.find((filter) => filter.filterType === 'category');
  if (categoryFilterFromState?.filterValue) {
    return false;
  }

  const priceFilterFromState = selectedFiltersFromState.find((filter) => filter.filterType === 'price') as PriceFilterState;
  if (priceFilterFromState?.filterValue.from) {
    return false;
  }
  if (priceFilterFromState?.filterValue.to) {
    return false;
  }

  return true;
};
