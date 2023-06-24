import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux-hooks';
import { changeFiltersAction } from '../../../store/catalog-data/catalog-data-slice';
import { LEVEL_FILTER_MAP } from '../../../consts';
import FilterItem from '../filter-item';
import { getSelectedFilters } from '../../../store/catalog-data/catalog-data-selectors';

type LevelFilterState = {
  filterType: 'level';
  filterValue: string[];
}

function LevelFilter(): JSX.Element {
  const dispatch = useAppDispatch();
  const selectedFilters = useAppSelector(getSelectedFilters);
  const [levelFilter, setLevelFilter] = useState<LevelFilterState>({
    filterType: 'level',
    filterValue: [],
  });

  const onFilterChange = (levelTitle: string) => {
    const newLevelFilterValues = [...levelFilter.filterValue];
    const newLevelFilterValueIndex = newLevelFilterValues.findIndex((value) => value === levelTitle);
    if (newLevelFilterValueIndex > -1) {
      newLevelFilterValues.splice(newLevelFilterValueIndex, 1);
    } else {
      newLevelFilterValues.push(levelTitle);
    }
    setLevelFilter({ ...levelFilter, filterValue: newLevelFilterValues });
  };

  const selectedLevelFilter = selectedFilters.find((filter) => filter.filterType === levelFilter.filterType);
  let selectedLevelFilterValue: string[];
  if (Array.isArray(selectedLevelFilter?.filterValue) && selectedLevelFilter?.filterValue) {
    selectedLevelFilterValue = selectedLevelFilter?.filterValue;
  }

  useEffect(() => {
    dispatch(changeFiltersAction(levelFilter));
  }, [dispatch, levelFilter]);

  return (
    <fieldset className="catalog-filter__block">
      <legend className="title title--h5">Уровень</legend>
      {LEVEL_FILTER_MAP.map((currentLevel) =>
        <FilterItem key={currentLevel.name} currentItem={currentLevel} onFilterChange={onFilterChange} currentFilterValue={selectedLevelFilterValue} />)}
    </fieldset>
  );
}

export default LevelFilter;
