import { ProductCard } from '../../types/product-card';
import ProductCardItem from '../product-card-item/product-card-item';

type ProductCardListProps = {
  productCards: ProductCard[];
}

function ProductCardList({ productCards }: ProductCardListProps): JSX.Element {
  return (
    <div className="cards catalog__cards">
      {productCards.map((card) => <ProductCardItem key={card.id} productCard={card} />)}
    </div>
  );
}

export default ProductCardList;
