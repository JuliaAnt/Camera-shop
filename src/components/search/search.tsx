import { ChangeEvent, useState } from 'react';
import { useAppSelector } from '../../hooks/redux-hooks';
import { getProducts } from '../../store/catalog-data/catalog-data-selectors';
import SearchResultItem from './search-result-item/search-result-item';
import { ProductCard } from '../../types/product-card';
import FocusTrap from 'react-focus-trap';

function Search(): JSX.Element {
  const products = useAppSelector(getProducts);
  const [searchString, setSearchString] = useState('');
  const [searchResultsList, setSearchResultsList] = useState<ProductCard[]>([]);

  const onChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setSearchString(evt.target.value.toLowerCase());
    if (evt.target.value === '') {
      return setSearchResultsList([]);
    }
    setSearchResultsList(products.filter((product) => product.name.toLowerCase().includes(evt.target.value.toLowerCase())));
  };

  const onResetClick = () => {
    setSearchString('');
    setSearchResultsList([]);
  };

  return (
    <div className="form-search" data-testid={'form-search'}>
      <form tabIndex={-1}>
        <label>
          <svg className="form-search__icon" width="16" height="16" aria-hidden="true">
            <use xlinkHref="#icon-lens"></use>
          </svg>
          <input
            className="form-search__input"
            type="text"
            autoComplete="off"
            placeholder="Поиск по сайту"
            data-testid={'search-bar'}
            value={searchString}
            onChange={onChange}
          />
        </label>
        {/* @ts-expect-error children */}
        <FocusTrap
          // active={Boolean(searchResultsList.length)}
          focusTrapOptions={{
            initialFocus: '#search',
            isKeyForward: (event: KeyboardEvent) => event.code === 'ArrowDown',
            isKeyBackward: (event: KeyboardEvent) => event.code === 'ArrowUp',
            clickOutsideDeactivates: true,
          }}
        >
          <ul
            className="form-search__select-list scroller"
            style={{
              visibility: `${searchResultsList.length !== 0 && searchString ? 'visible' : 'hidden'}`,
              opacity: `${searchResultsList.length !== 0 && searchString ? 1 : 0}`
            }}
            tabIndex={0}
          >
            {searchResultsList.map((result) => <SearchResultItem key={result.id} product={result} searchString={searchString} />)}
          </ul>
        </FocusTrap>
      </form>
      <button
        className="form-search__reset"
        data-testid={'search-reset-btn'}
        type="button"
        style={{ display: `${searchString ? 'flex' : 'none'}` }}
        onClick={onResetClick}
      >
        <svg width="10" height="10" aria-hidden="true">
          <use xlinkHref="#icon-close"></use>
        </svg><span className="visually-hidden">Сбросить поиск</span>
      </button>
    </div >
  );
}

export default Search;
