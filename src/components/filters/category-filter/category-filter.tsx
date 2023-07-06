// import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux-hooks';
import { changeFiltersAction } from '../../../store/catalog-data/catalog-data-slice';
import { CATEGORY_FILTER_MAP } from '../../../consts';
import FilterItem from '../filter-item';
import { getSelectedFilters } from '../../../store/catalog-data/catalog-data-selectors';

type CategoryFilterState = {
  filterType: 'category';
  filterValue: string[];
}

function CategoryFilter(): JSX.Element {
  const dispatch = useAppDispatch();
  const selectedFilters = useAppSelector(getSelectedFilters);

  const selectedCategoryFilter = selectedFilters.find((filter) => filter.filterType === 'category') as CategoryFilterState;
  const selectedCategoryFilterValue = [...selectedCategoryFilter.filterValue];

  const onFilterChange = (categoryTitle: string) => {
    const newCategoryFilterValueIndex = selectedCategoryFilterValue.findIndex((value) => value === categoryTitle);
    if (newCategoryFilterValueIndex > -1) {
      selectedCategoryFilterValue.splice(newCategoryFilterValueIndex, 1);
    } else {
      selectedCategoryFilterValue.push(categoryTitle);
    }
    dispatch(changeFiltersAction({ ...selectedCategoryFilter, filterValue: selectedCategoryFilterValue }));
  };

  return (
    <fieldset className="catalog-filter__block">
      <legend className="title title--h5">Категория</legend>
      {CATEGORY_FILTER_MAP.map((currentCategory) =>
        <FilterItem key={currentCategory.name} currentItem={currentCategory} onFilterChange={onFilterChange} currentFilterValue={selectedCategoryFilterValue} />)}
    </fieldset>
  );
}

export default CategoryFilter;
