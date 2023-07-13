import { MouseEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { changeSortsAction } from '../../store/catalog-data/catalog-data-slice';
import { getSorts } from '../../store/catalog-data/catalog-data-selectors';

function Sort(): JSX.Element {
  const dispatch = useAppDispatch();
  const selectedSorts = useAppSelector(getSorts);

  const sortChangeHandler = (evt: MouseEvent) => {
    evt.preventDefault();
    const target = evt.currentTarget;

    if (target.className === 'sortType') {
      dispatch(changeSortsAction({ ...selectedSorts, sortType: target.id }));
    }
    if (target.className === 'sortOrder') {
      dispatch(changeSortsAction({ ...selectedSorts, sortOrder: target.id }));
    }
  };

  return (
    <form action="#">
      <div className="catalog-sort__inner">
        <p className="title title--h5">Сортировать:</p>
        <div className="catalog-sort__type">
          <div key={`${selectedSorts.sortType}-sortPrice`} className="catalog-sort__btn-text">
            <input
              data-testid={'sortPrice'}
              className='sortType'
              type="radio"
              id="sortPrice"
              name="sort"
              checked={Boolean(selectedSorts.sortType === 'sortPrice')}
              onClick={sortChangeHandler}
            />
            <label htmlFor="sortPrice">по цене</label>
          </div>
          <div key={`${selectedSorts.sortType}-sortPopular`} className="catalog-sort__btn-text">
            <input
              data-testid={'sortPopular'}
              className='sortType'
              type="radio"
              id="sortPopular"
              name="sort"
              checked={Boolean(selectedSorts.sortType === 'sortPopular')}
              onClick={sortChangeHandler}
            />
            <label htmlFor="sortPopular">по популярности</label>
          </div>
        </div>
        <div className="catalog-sort__order">
          <div key={`${selectedSorts.sortOrder}-up`} className="catalog-sort__btn catalog-sort__btn--up">
            <input
              className='sortOrder'
              type="radio"
              id="up"
              name="sort-icon"
              aria-label="По возрастанию"
              checked={Boolean(selectedSorts.sortOrder === 'up')}
              onClick={sortChangeHandler}
            />
            <label htmlFor="up">
              <svg width="16" height="14" aria-hidden="true">
                <use xlinkHref="#icon-sort"></use>
              </svg>
            </label>
          </div>
          <div key={`${selectedSorts.sortOrder}-down`} className="catalog-sort__btn catalog-sort__btn--down">
            <input
              className='sortOrder'
              type="radio"
              id="down"
              name="sort-icon"
              aria-label="По убыванию"
              checked={Boolean(selectedSorts.sortOrder === 'down')}
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
