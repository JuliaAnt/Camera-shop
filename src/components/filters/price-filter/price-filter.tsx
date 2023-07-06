import { ChangeEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux-hooks';
import { changeFiltersAction } from '../../../store/catalog-data/catalog-data-slice';
import { getSelectedFilters } from '../../../store/catalog-data/catalog-data-selectors';

type PriceFilterState = {
  filterType: 'price';
  filterValue: {
    from: number | null;
    to: number | null;
  };
}

function PriceFilter(): JSX.Element {
  const dispatch = useAppDispatch();
  const selectedFilters = useAppSelector(getSelectedFilters);

  const selectedPriceFilter = selectedFilters.find((filter) => filter.filterType === 'price') as PriceFilterState;

  const onPriceFromChange = (evt: ChangeEvent<HTMLInputElement>) => {
    dispatch(changeFiltersAction({ ...selectedPriceFilter, filterValue: { from: +evt.target?.value, to: selectedPriceFilter.filterValue.to } }));
  };

  const onPriceToChange = (evt: ChangeEvent<HTMLInputElement>) => {
    dispatch(changeFiltersAction({ ...selectedPriceFilter, filterValue: { from: selectedPriceFilter.filterValue.from, to: +evt.target.value } }));
  };

  return (
    <fieldset key={`${selectedPriceFilter.filterType}-priceRange`} className="catalog-filter__block">
      <legend className="title title--h5">Цена, ₽</legend>
      <div className="catalog-filter__price-range" data-testid={'priceRange'}>
        <div className="custom-input">
          <label>
            <input
              type="number"
              name="price"
              placeholder="от"
              value={selectedPriceFilter?.filterValue.from || ''}
              onChange={onPriceFromChange}
            />
          </label>
        </div>
        <div className="custom-input">
          <label>
            <input
              type="number"
              name="priceUp"
              placeholder="до"
              value={selectedPriceFilter?.filterValue.to || ''}
              onChange={onPriceToChange}
            />
          </label>
        </div>
      </div>
    </fieldset>
  );
}

export default PriceFilter;
