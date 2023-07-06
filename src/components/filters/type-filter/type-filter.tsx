import { useAppDispatch, useAppSelector } from '../../../hooks/redux-hooks';
import { changeFiltersAction } from '../../../store/catalog-data/catalog-data-slice';
import { TYPE_FILTER_MAP } from '../../../consts';
import FilterItem from '../filter-item';
import { getSelectedFilters } from '../../../store/catalog-data/catalog-data-selectors';

type TypeFilterState = {
  filterType: 'type';
  filterValue: string[];
}

function TypeFilter(): JSX.Element {
  const dispatch = useAppDispatch();
  const selectedFilters = useAppSelector(getSelectedFilters);

  const selectedTypeFilter = selectedFilters.find((filter) => filter.filterType === 'type') as TypeFilterState;
  const selectedTypeFilterValue = [...selectedTypeFilter.filterValue];

  const onFilterChange = (typeTitle: string) => {
    const newTypeFilterValueIndex = selectedTypeFilterValue.findIndex((value) => value === typeTitle);
    if (newTypeFilterValueIndex > -1) {
      selectedTypeFilterValue.splice(newTypeFilterValueIndex, 1);
    } else {
      selectedTypeFilterValue.push(typeTitle);
    }
    dispatch(changeFiltersAction({ ...selectedTypeFilter, filterValue: selectedTypeFilterValue }));
  };

  return (
    <fieldset className="catalog-filter__block">
      <legend className="title title--h5">Тип камеры</legend>
      {TYPE_FILTER_MAP.map((currentType) =>
        <FilterItem key={currentType.name} currentItem={currentType} onFilterChange={onFilterChange} currentFilterValue={selectedTypeFilterValue} />)}
    </fieldset>
  );
}

export default TypeFilter;
