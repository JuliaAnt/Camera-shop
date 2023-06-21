import { ProductCard } from '../../../types/product-card';
import ProductCardItem from '../../product-card-item/product-card-item';

type SliderContentProps = {
  firstProductIndex: number;
  lastProductIndex: number;
  similarProducts: ProductCard[];
}

function SliderContent({ firstProductIndex, lastProductIndex, similarProducts }: SliderContentProps): JSX.Element {
  return (
    <div className="product-similar__slider-list">
      {similarProducts.slice(firstProductIndex, lastProductIndex).map((similarProduct) => {
        const currentIndex = similarProducts.findIndex((product) => product.id === similarProduct.id);
        const className = currentIndex >= firstProductIndex && currentIndex < lastProductIndex ? 'is-active' : '';
        return <ProductCardItem key={similarProduct.id} productCard={similarProduct} className={className} />;
      }
      )}
    </div>
  );
}

export default SliderContent;
