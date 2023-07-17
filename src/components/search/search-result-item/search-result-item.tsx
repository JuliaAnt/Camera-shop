import { Link, useNavigate } from 'react-router-dom';
import { ProductCard } from '../../../types/product-card';
import { KeyboardEvent, useRef } from 'react';

type SearchResultItemProps = {
  product: ProductCard;
  searchString: string;
}

function SearchResultItem({ product, searchString }: SearchResultItemProps): JSX.Element {
  const navigate = useNavigate();
  const listItemRef = useRef<HTMLLIElement>(null);

  const handleKeyDown = (event: KeyboardEvent<HTMLAnchorElement>) => {
    if (event.code === 'Enter' || event.key === 'Enter' || event.keyCode === 13) {
      navigate(`/camera/${product.id}?tab=description`);
    }
  };

  return (
    <Link to={`/camera/${product.id}?tab=description`} tabIndex={0} onKeyDown={handleKeyDown}>
      <li
        ref={listItemRef}
        className="form-search__select-item"
        id={'search'}
        data-testid={'search-item'}
        tabIndex={0}
        style={{ visibility: `${searchString ? 'visible' : 'hidden'}` }}

      >{product.name}
      </li>
    </Link>
  );
}

export default SearchResultItem;
