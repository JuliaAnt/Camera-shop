import { ProductCard } from '../../types/product-card';
import ProductCardItem from '../product-card-item/product-card-item';

type ProductCardListProps = {
  productCards: ProductCard[];
  firstProductIndex: number;
  lastProductIndex: number;
}

function ProductCardList({ productCards, firstProductIndex, lastProductIndex }: ProductCardListProps): JSX.Element {
  return (
    <div className="cards catalog__cards">
      {productCards.slice(firstProductIndex, lastProductIndex).map((card) => <ProductCardItem key={card.id} productCard={card} className={''} />)}
    </div>
  );
}

export default ProductCardList;
