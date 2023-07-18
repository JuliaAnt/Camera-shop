import { useNavigate } from 'react-router-dom';
import { ProductCard } from '../../../types/product-card';
import { KeyboardEvent, useRef } from 'react';

type SearchResultItemProps = {
  product: ProductCard;
  searchString: string;
  // activeClass: string;
  index: number;
}

function SearchResultItem({ product, searchString, index }: SearchResultItemProps): JSX.Element {
  const navigate = useNavigate();
  const listItemRef = useRef<HTMLLIElement>(null);

  const handleKeyDown = (event: KeyboardEvent<HTMLLIElement>) => {
    if (event.code === 'Enter' || event.key === 'Enter' || event.keyCode === 13) {
      navigate(`/camera/${product.id}?tab=description`);
    }
  };

  return (
    <li
      ref={listItemRef}
      // className={`form-search__select-item ${activeClass}`}
      className="form-search__select-item"
      id={'search'}
      data-testid={'search-item'}
      tabIndex={0}
      style={{ visibility: `${searchString ? 'visible' : 'hidden'}` }}
      onClick={() => navigate(`/camera/${product.id}?tab=description`)}
      onKeyDown={handleKeyDown}
    > {product.name}
    </li >
  );
}

export default SearchResultItem;
