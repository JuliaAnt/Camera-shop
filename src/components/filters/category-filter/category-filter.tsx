import { useAppDispatch, useAppSelector } from '../../../hooks/redux-hooks';
import { changeFiltersAction } from '../../../store/catalog-data/catalog-data-slice';
import { CATEGORY_FILTER_MAP, FilterTypeList } from '../../../consts';
import FilterItem from '../filter-item';
import { getSelectedFilters } from '../../../store/catalog-data/catalog-data-selectors';

type CategoryFilterState = {
  filterType: FilterTypeList.Category;
  filterValue: string;
}

function CategoryFilter(): JSX.Element {
  const dispatch = useAppDispatch();
  const selectedFilters = useAppSelector(getSelectedFilters);

  const selectedCategoryFilter = selectedFilters.find((filter) => filter.filterType === FilterTypeList.Category) as CategoryFilterState;
  const selectedCategoryFilterValue = selectedCategoryFilter.filterValue;

  const onFilterChange = (categoryTitle: string) => {
    if (selectedCategoryFilterValue !== categoryTitle) {
      dispatch(changeFiltersAction({ ...selectedCategoryFilter, filterValue: categoryTitle }));
    }
    if (selectedCategoryFilterValue === categoryTitle) {
      dispatch(changeFiltersAction({ ...selectedCategoryFilter, filterValue: '' }));
    }
  };

  return (
    <fieldset className="catalog-filter__block">
      <legend className="title title--h5">Категория</legend>
      {CATEGORY_FILTER_MAP.map((currentCategory) =>
        <FilterItem key={currentCategory.name} currentItem={currentCategory} onFilterChange={onFilterChange} currentFilterValue={selectedCategoryFilterValue} disabled={false} />)}
    </fieldset>
  );
}

export default CategoryFilter;
