import { useAppSelector } from '../../hooks/redux-hooks';
import { getAllReviews } from '../../store/catalog-data/catalog-data-selectors';
import { ProductCard } from '../../types/product-card';
import ProductCardItem from '../product-card-item/product-card-item';

type ProductCardListProps = {
  productCards: ProductCard[];
  firstProductIndex: number;
  lastProductIndex: number;
}

function ProductCardList({ productCards, firstProductIndex, lastProductIndex }: ProductCardListProps): JSX.Element {
  const allReviews = useAppSelector(getAllReviews);

  return (
    <div className="cards catalog__cards">
      {productCards.slice(firstProductIndex, lastProductIndex).map((card) => {
        const reviewsById = allReviews[card.id];
        return (
          <ProductCardItem key={card.id} productCard={card} className={''} reviews={reviewsById} />
        );
      })}
    </div>
  );
}

export default ProductCardList;
