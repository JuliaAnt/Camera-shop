import { MouseEvent, useEffect, useState } from 'react';
import { SortsType } from '../../types/sorts';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { changeSortsAction } from '../../store/catalog-data/catalog-data-slice';
import { getSorts } from '../../store/catalog-data/catalog-data-selectors';

function Sort(): JSX.Element {
  const dispatch = useAppDispatch();
  const selectedSorts = useAppSelector(getSorts);
  const [sorts, setSorts] = useState<SortsType>({
    sortType: 'sortPopular',
    sortOrder: 'up',
  });

  const sortChangeHandler = (evt: MouseEvent) => {
    evt.preventDefault();
    const target = evt.currentTarget;

    if (target.className === 'sortType') {
      setSorts({ ...sorts, sortType: target.id });
    }
    if (target.className === 'sortOrder') {
      setSorts({ ...sorts, sortOrder: target.id });
    }
  };

  useEffect(() => {
    dispatch(changeSortsAction(sorts));
  }, [dispatch, sorts]);

  return (
    <form action="#">
      <div className="catalog-sort__inner">
        <p className="title title--h5">Сортировать:</p>
        <div className="catalog-sort__type">
          <div className="catalog-sort__btn-text">
            <input
              data-testid={'sortPrice'}
              className='sortType'
              type="radio"
              id="sortPrice"
              name="sort"
              defaultChecked={Boolean(selectedSorts.sortType === 'sortPrice')}
              onClick={sortChangeHandler}
            />
            <label htmlFor="sortPrice">по цене</label>
          </div>
          <div className="catalog-sort__btn-text">
            <input
              data-testid={'sortPopular'}
              className='sortType'
              type="radio"
              id="sortPopular"
              name="sort"
              defaultChecked={Boolean(selectedSorts.sortType === 'sortPopular')}
              onClick={sortChangeHandler}
            />
            <label htmlFor="sortPopular">по популярности</label>
          </div>
        </div>
        <div className="catalog-sort__order">
          <div className="catalog-sort__btn catalog-sort__btn--up">
            <input
              className='sortOrder'
              type="radio"
              id="up"
              name="sort-icon"
              aria-label="По возрастанию"
              defaultChecked={Boolean(selectedSorts.sortOrder === 'up')}
              onClick={sortChangeHandler}
            />
            <label htmlFor="up">
              <svg width="16" height="14" aria-hidden="true">
                <use xlinkHref="#icon-sort"></use>
              </svg>
            </label>
          </div>
          <div className="catalog-sort__btn catalog-sort__btn--down">
            <input
              className='sortOrder'
              type="radio"
              id="down"
              name="sort-icon"
              aria-label="По убыванию"
              defaultChecked={Boolean(selectedSorts.sortOrder === 'down')}
              onClick={sortChangeHandler}
            />
            <label htmlFor="down">
              <svg width="16" height="14" aria-hidden="true">
                <use xlinkHref="#icon-sort"></use>
              </svg>
            </label>
          </div>
        </div>
      </div>
    </form>
  );
}

export default Sort;
