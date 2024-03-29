import { ChangeEvent, MutableRefObject, createRef, useEffect, useRef, useState } from 'react';
import { useAppSelector } from '../../hooks/redux-hooks';
import { getProducts } from '../../store/catalog-data/catalog-data-selectors';
import SearchResultItem from './search-result-item/search-result-item';
import { ProductCard } from '../../types/product-card';
import { useNavigate } from 'react-router-dom';

const useKeyPress = function (targetKey: string, cursor: number, results: ProductCard[]) {
  const [keyPressed, setKeyPressed] = useState(false);

  useEffect(() => {
    function downHandler(evt: KeyboardEvent) {
      if (evt.key === targetKey) {
        if (cursor === results.length - 1) {
          evt.preventDefault();
        }
        setKeyPressed(true);
      }
    }

    const upHandler = (evt: KeyboardEvent) => {
      if (evt.key === targetKey) {
        if (cursor === results.length - 1) {
          evt.preventDefault();
        }
        setKeyPressed(false);
      }
    };

    window.addEventListener('keydown', downHandler);
    window.addEventListener('keyup', upHandler);

    return () => {
      window.removeEventListener('keydown', downHandler);
      window.removeEventListener('keyup', upHandler);
    };
  }, [targetKey, cursor, results]);

  return keyPressed;
};

function Search(): JSX.Element {
  const products = useAppSelector(getProducts);
  const [searchString, setSearchString] = useState('');
  const [searchResultsList, setSearchResultsList] = useState<ProductCard[]>([]);
  const navigate = useNavigate();

  const [cursor, setCursor] = useState(0);
  const [selected, setSelected] = useState<ProductCard>();
  const [hovered, setHovered] = useState<ProductCard | null>();
  const downPress = useKeyPress('ArrowDown', cursor, products);
  const upPress = useKeyPress('ArrowUp', cursor, products);
  const enterPress = useKeyPress('Enter', cursor, products);

  const resultCount = searchResultsList.length;
  const resultRefs = useRef<MutableRefObject<HTMLLIElement | null>[]>([]);

  if (resultRefs.current.length !== resultCount) {
    resultRefs.current = Array(resultCount)
      .fill(0)
      .map((_, i) => resultRefs.current[i] || createRef());
  }

  useEffect(() => {
    if (searchResultsList.length && enterPress) {
      setSelected(searchResultsList[cursor]);
      if (selected) {
        navigate(`/camera/${selected?.id}?tab=description`);
      }
    }
  }, [cursor, enterPress, searchResultsList, navigate, selected]);
  useEffect(() => {
    if (searchResultsList.length && hovered) {
      setCursor(searchResultsList.indexOf(hovered));
    }
  }, [hovered, searchResultsList]);
  useEffect(() => {
    if (searchResultsList.length && downPress) {
      setCursor((prevState) =>
        prevState < searchResultsList.length - 1 ? prevState + 1 : prevState
      );
    }
  }, [downPress, searchResultsList]);
  useEffect(() => {
    if (searchResultsList.length && upPress) {
      setCursor((prevState) => (prevState > 0 ? prevState - 1 : prevState));
    }
  }, [upPress, searchResultsList]);

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
    <div
      className="form-search"
      data-testid={'form-search'}
    >
      <form>
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
        <ul
          className="form-search__select-list scroller"
          style={{
            visibility: `${searchResultsList.length !== 0 && searchString ? 'visible' : 'hidden'}`,
            opacity: `${searchResultsList.length !== 0 && searchString ? 1 : 0}`
          }}
        >
          {searchResultsList.map((result, index) => (
            <SearchResultItem
              key={result.id}
              product={result}
              searchString={searchString}
              activeClass={index === cursor ? 'active-result' : ''}
              tabIndex={index === cursor ? 1 : 0}
              ref={resultRefs.current[index]}
              setSelected={setSelected}
              setHovered={setHovered}
            />))}
        </ul>
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
