import { Link } from 'react-router-dom';
import { ProductCard } from '../../../types/product-card';

type SearchResultItemProps = {
  product: ProductCard;
  searchString: string;
}

function SearchResultItem({ product, searchString }: SearchResultItemProps): JSX.Element {
  return (
    <Link to={`/camera/${product.id}?tab=description`}>
      <li className="form-search__select-item" tabIndex={0} style={{ visibility: `${searchString ? 'visible' : 'hidden'}` }}>{product.name}</li>
    </Link>
  );
}

export default SearchResultItem;
