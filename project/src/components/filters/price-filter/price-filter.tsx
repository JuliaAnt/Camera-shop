import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../../hooks/redux-hooks';
import { changeFiltersAction } from '../../../store/catalog-data/catalog-data-slice';

type PriceFilterState = {
  filterType: 'price';
  filterValue: {
    from: number | null;
    to: number | null;
  };
}

function PriceFilter(): JSX.Element {
  const dispatch = useAppDispatch();
  const [priceFilter, setPriceFilter] = useState<PriceFilterState>({
    filterType: 'price',
    filterValue: {
      from: null,
      to: null,
    }
  });

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      dispatch(changeFiltersAction(priceFilter));
    }

    return () => {
      isMounted = false;
    };
  }, [priceFilter, dispatch]);

  return (
    <fieldset className="catalog-filter__block">
      <legend className="title title--h5">Цена, ₽</legend>
      <div className="catalog-filter__price-range">
        <div className="custom-input">
          <label>
            <input
              type="number"
              name="price"
              placeholder="от"
              onChange={(evt) => {
                setPriceFilter({ ...priceFilter, filterValue: { from: +evt.target.value, to: priceFilter.filterValue.to } });
              }}
            />
          </label>
        </div>
        <div className="custom-input">
          <label>
            <input
              type="number"
              name="priceUp"
              placeholder="до"
              onChange={(evt) => {
                setPriceFilter({ ...priceFilter, filterValue: { from: priceFilter.filterValue.from, to: +evt.target.value } });
              }}
            />
          </label>
        </div>
      </div>
    </fieldset>
  );
}

export default PriceFilter;
