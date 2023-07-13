import { ChangeEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux-hooks';
import { changePriceFilterAction, validatePriceFilterAction } from '../../../store/catalog-data/catalog-data-slice';
import { getPriceRange, getSelectedFilters } from '../../../store/catalog-data/catalog-data-selectors';
import { PriceFilterState } from '../../../types/filters';
import { FilterTypeList } from '../../../consts';


function PriceFilter(): JSX.Element {
  const dispatch = useAppDispatch();
  const selectedFilters = useAppSelector(getSelectedFilters);
  const priceRange = useAppSelector(getPriceRange);

  const selectedPriceFilter = selectedFilters.find((filter) => filter.filterType === FilterTypeList.Price) as PriceFilterState;

  const onPriceFromChange = (evt: ChangeEvent<HTMLInputElement>) => {
    dispatch(changePriceFilterAction({ ...selectedPriceFilter, filterValue: { from: +evt.target?.value, to: selectedPriceFilter.filterValue.to } }));
  };

  const onPriceToChange = (evt: ChangeEvent<HTMLInputElement>) => {
    dispatch(changePriceFilterAction({ ...selectedPriceFilter, filterValue: { from: selectedPriceFilter.filterValue.from, to: +evt.target.value } }));
  };

  const onBlurInput = () => {
    dispatch(validatePriceFilterAction());
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
              min={priceRange.min || undefined}
              max={priceRange.max || undefined}
              placeholder={priceRange.min?.toString()}
              value={selectedPriceFilter?.filterValue.from || ''}
              onChange={onPriceFromChange}
              onBlur={onBlurInput}
            />
          </label>
        </div>
        <div className="custom-input">
          <label>
            <input
              type="number"
              name="priceUp"
              min={priceRange.min || undefined}
              max={priceRange.max || undefined}
              placeholder={priceRange.max?.toString()}
              value={selectedPriceFilter?.filterValue.to || ''}
              onChange={onPriceToChange}
              onBlur={onBlurInput}
            />
          </label>
        </div>
      </div>
    </fieldset>
  );
}

export default PriceFilter;
