import { useEffect, useState } from 'react';
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

  const [categoryFilter, setCategoryFilter] = useState<CategoryFilterState>({
    filterType: 'category',
    filterValue: [],
  });

  const selectedCategoryFilter = selectedFilters.find((filter) => filter.filterType === categoryFilter.filterType);
  let selectedCategoryFilterValue: string[];
  if (Array.isArray(selectedCategoryFilter?.filterValue) && selectedCategoryFilter?.filterValue) {
    selectedCategoryFilterValue = selectedCategoryFilter?.filterValue;
  }

  const onFilterChange = (categoryTitle: string) => {
    const newCategoryFilterValues = [...categoryFilter.filterValue];
    const newCategoryFilterValueIndex = newCategoryFilterValues.findIndex((value) => value === categoryTitle);
    if (newCategoryFilterValueIndex > -1) {
      newCategoryFilterValues.splice(newCategoryFilterValueIndex, 1);
    } else {
      newCategoryFilterValues.push(categoryTitle);
    }
    setCategoryFilter({ ...categoryFilter, filterValue: newCategoryFilterValues });
  };

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      dispatch(changeFiltersAction(categoryFilter));
    }

    return () => {
      isMounted = false;
    };
  }, [dispatch, categoryFilter]);

  return (
    <fieldset className="catalog-filter__block">
      <legend className="title title--h5">Категория</legend>
      {CATEGORY_FILTER_MAP.map((currentCategory) =>
        <FilterItem key={currentCategory.name} currentItem={currentCategory} onFilterChange={onFilterChange} currentFilterValue={selectedCategoryFilterValue} />)}
    </fieldset>
  );
}

export default CategoryFilter;
