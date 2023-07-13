import { useAppDispatch } from '../../hooks/redux-hooks';
import { resetFiltersAction } from '../../store/catalog-data/catalog-data-slice';
import CategoryFilter from './category-filter/category-filter';
import LevelFilter from './level-filter/level-filter';
import PriceFilter from './price-filter/price-filter';
import TypeFilter from './type-filter/type-filter';

function Filters(): JSX.Element {
  const dispatch = useAppDispatch();

  return (
    <form action="#" method="post">
      <h2 className="visually-hidden">Фильтр</h2>
      <PriceFilter />
      <CategoryFilter />
      <TypeFilter />
      <LevelFilter />
      <button className="btn catalog-filter__reset-btn"
        type="button"
        onClick={(evt) => {
          evt.preventDefault();
          dispatch(resetFiltersAction());
        }}
      >Сбросить фильтры
      </button>
    </form >
  );
}

export default Filters;
