import { useEffect, useState } from 'react';
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
  const [typeFilter, setTypeFilter] = useState<TypeFilterState>({
    filterType: 'type',
    filterValue: [],
  });

  const onFilterChange = (typeTitle: string) => {
    const newTypeFilterValues = [...typeFilter.filterValue];
    const newTypeFilterValueIndex = newTypeFilterValues.findIndex((value) => value === typeTitle);
    if (newTypeFilterValueIndex > -1) {
      newTypeFilterValues.splice(newTypeFilterValueIndex, 1);
    } else {
      newTypeFilterValues.push(typeTitle);
    }
    setTypeFilter({ ...typeFilter, filterValue: newTypeFilterValues });
  };

  const selectedTypeFilter = selectedFilters.find((filter) => filter.filterType === typeFilter.filterType);
  let selectedTypeFilterValue: string[];
  if (Array.isArray(selectedTypeFilter?.filterValue) && selectedTypeFilter?.filterValue) {
    selectedTypeFilterValue = selectedTypeFilter?.filterValue;
  }

  useEffect(() => {
    dispatch(changeFiltersAction(typeFilter));
  }, [dispatch, typeFilter]);

  return (
    <fieldset className="catalog-filter__block">
      <legend className="title title--h5">Тип камеры</legend>
      {TYPE_FILTER_MAP.map((currentType) =>
        <FilterItem key={currentType.name} currentItem={currentType} onFilterChange={onFilterChange} currentFilterValue={selectedTypeFilterValue} />)}
    </fieldset>
  );
}

export default TypeFilter;
