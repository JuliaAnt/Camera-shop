import { ChangeEvent, useState } from 'react';
import { useAppSelector } from '../../hooks/redux-hooks';
import { getProducts } from '../../store/catalog-data/catalog-data-selectors';
import SearchResultItem from './search-result-item/search-result-item';
import { ProductCard } from '../../types/product-card';
import FocusTrap from 'react-focus-trap';

// const useKeyPress = function (targetKey: string) {
//   const [keyPressed, setKeyPressed] = useState(false);

//   useEffect(() => {
//     function downHandler({ key }: { key: string }) {
//       if (key === targetKey) {
//         setKeyPressed(true);
//       }
//     }

//     const upHandler = ({ key }: { key: string }) => {
//       if (key === targetKey) {
//         setKeyPressed(false);
//       }
//     };

//     window.addEventListener('keydown', downHandler);
//     window.addEventListener('keyup', upHandler);

//     return () => {
//       window.removeEventListener('keydown', downHandler);
//       window.removeEventListener('keyup', upHandler);
//     };
//   }, [targetKey]);

//   return keyPressed;
// };

function Search(): JSX.Element {
  const products = useAppSelector(getProducts);
  const [searchString, setSearchString] = useState('');
  const [searchResultsList, setSearchResultsList] = useState<ProductCard[]>([]);
  // const downPress = useKeyPress('ArrowDown');
  // const upPress = useKeyPress('ArrowUp');
  // const enterPress = useKeyPress('Enter');
  // const [cursor, setCursor] = useState(0);
  // const [selected, setSelected] = useState(undefined);
  // const [hovered, setHovered] = useState(undefined);

  // useEffect(() => {
  //   if (searchResultsList.length && enterPress) {
  //     setSelected(searchResultsList[cursor]);
  //   }
  // }, [cursor, enterPress, searchResultsList]);
  // useEffect(() => {
  //   if (items.length && hovered) {
  //     setCursor(items.indexOf(hovered));
  //   }
  // }, [hovered]);
  // useEffect(() => {
  //   if (searchResultsList.length && downPress) {
  //     setCursor((prevState) =>
  //       prevState < searchResultsList.length - 1 ? prevState + 1 : prevState
  //     );
  //   }
  // }, [downPress, searchResultsList]);
  // useEffect(() => {
  //   if (searchResultsList.length && upPress) {
  //     setCursor((prevState) => (prevState > 0 ? prevState - 1 : prevState));
  //   }
  // }, [upPress, searchResultsList]);

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
            // tabIndex={0}
          >
            {searchResultsList.map((result, index) => <SearchResultItem key={result.id} product={result} searchString={searchString} index={index}/>)}
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
