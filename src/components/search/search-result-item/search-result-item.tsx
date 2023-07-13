import { Link, useNavigate } from 'react-router-dom';
import { ProductCard } from '../../../types/product-card';
import { KeyboardEvent } from 'react';

type SearchResultItemProps = {
  product: ProductCard;
  searchString: string;
}

function SearchResultItem({ product, searchString }: SearchResultItemProps): JSX.Element {
  const navigate = useNavigate();

  const handleKeyDown = (event: KeyboardEvent<HTMLLIElement>) => {
    if (event.key === 'Enter') {
      navigate(`/camera/${product.id}?tab=description`);
    }
  };

  return (
    <Link to={`/camera/${product.id}?tab=description`}>
      <li
        className="form-search__select-item"
        id={'search'}
        data-testid={'search-item'}
        tabIndex={1}
        style={{ visibility: `${searchString ? 'visible' : 'hidden'}` }}
        onKeyDown={handleKeyDown}
      >{product.name}
      </li>
    </Link>
  );
}

export default SearchResultItem;
