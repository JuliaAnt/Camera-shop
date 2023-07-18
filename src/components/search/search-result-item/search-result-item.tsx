import { ProductCard } from '../../../types/product-card';

type SearchResultItemProps = {
  product: ProductCard;
  searchString: string;
  activeClass: string;
  tabIndex: number;
  setSelected: (value: ProductCard) => void;
  setHovered: (value: ProductCard | null) => void;
}

function SearchResultItem({ product, searchString, tabIndex, activeClass, setSelected, setHovered }: SearchResultItemProps): JSX.Element {

  return (
    <li
      className={`form-search__select-item ${activeClass}`}
      id={'search'}
      data-testid={'search-item'}
      // tabIndex={tabIndex}
      style={{ visibility: `${searchString ? 'visible' : 'hidden'}` }}
      onClick={() => setSelected(product)}
      onMouseEnter={() => setHovered(product)}
      onMouseLeave={() => setHovered(null)}
    > {product.name}
    </li >
  );
}

export default SearchResultItem;
