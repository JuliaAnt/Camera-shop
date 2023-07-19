import { forwardRef, useEffect } from 'react';
import { ProductCard } from '../../../types/product-card';

type SearchResultItemProps = {
  product: ProductCard;
  searchString: string;
  activeClass: string;
  tabIndex: number;
  setSelected: (value: ProductCard) => void;
  setHovered: (value: ProductCard | null) => void;
}

const SearchResultItem = forwardRef<HTMLLIElement | null, SearchResultItemProps>(({ product, searchString, tabIndex, activeClass, setSelected, setHovered }, ref) => {
  useEffect(() => {
    if (activeClass === 'active-result' && ref && typeof ref !== 'function') {
      ref.current?.focus();
    }
  }, [activeClass, ref]);

  return (
    <li
      ref={ref}
      className={`form-search__select-item ${activeClass}`}
      id={'search'}
      data-testid={'search-item'}
      tabIndex={tabIndex}
      style={{ visibility: `${searchString ? 'visible' : 'hidden'}` }}
      onClick={() => setSelected(product)}
      onMouseEnter={() => setHovered(product)}
      onMouseLeave={() => setHovered(null)}
    > {product.name}
    </li >
  );
});

SearchResultItem.displayName = 'SearchResultItem';
export default SearchResultItem;
