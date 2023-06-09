import { useAppDispatch, useAppSelector } from '../../../hooks/redux-hooks';
import { changeFiltersAction } from '../../../store/catalog-data/catalog-data-slice';
import { FilterTypeList, LEVEL_FILTER_MAP } from '../../../consts';
import FilterItem from '../filter-item';
import { getSelectedFilters } from '../../../store/catalog-data/catalog-data-selectors';

export type LevelFilterState = {
  filterType: FilterTypeList.Level;
  filterValue: string[];
}

function LevelFilter(): JSX.Element {
  const dispatch = useAppDispatch();
  const selectedFilters = useAppSelector(getSelectedFilters);

  const selectedLevelFilter = selectedFilters.find((filter) => filter.filterType === FilterTypeList.Level) as LevelFilterState;
  const selectedLevelFilterValue = [...selectedLevelFilter.filterValue];

  const onFilterChange = (levelTitle: string) => {
    const newLevelFilterValueIndex = selectedLevelFilterValue.findIndex((value) => value === levelTitle);
    if (newLevelFilterValueIndex > -1) {
      selectedLevelFilterValue.splice(newLevelFilterValueIndex, 1);
    } else {
      selectedLevelFilterValue.push(levelTitle);
    }
    dispatch(changeFiltersAction({ ...selectedLevelFilter, filterValue: selectedLevelFilterValue }));
  };

  return (
    <fieldset className="catalog-filter__block">
      <legend className="title title--h5">Уровень</legend>
      {LEVEL_FILTER_MAP.map((currentLevel) =>
        <FilterItem key={currentLevel.name} currentItem={currentLevel} onFilterChange={onFilterChange} currentFilterValue={selectedLevelFilterValue} disabled={false} />)}
    </fieldset>
  );
}

export default LevelFilter;
